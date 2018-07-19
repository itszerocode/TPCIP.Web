if (DashboardGuideDetailsTool == null || typeof (DashboardGuideDetailsTool) != "object") {
    var DashboardGuideDetailsTool = new Object();
};

(function ($) {

    (function (context) {
        context.itemsPerPage = '10';
        context.loadTool = function () {
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardGuideDetailsTool",
                context:
                    {
                    },
                callback: function (data) {
                    context.paginateTable();
                }
            });
        };
        context.ResetGuideStatistics = function () {

            var checkedGuides = []
            $(".guideCheckClass:checked").each(function () { checkedGuides.push($(this).attr("data-guideid")); });
            GetGuideResponseTime(checkedGuides.join(","), "ResetGuideStatistics");
        };
        context.RefreshGuides = function () {
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardGuideDetailsTool",
                action: "RefreshGuides",
                context:
                    {
                    },
                callback: function (data) {
                    context.paginateTable();
                    var result = data[0].getElementsByClassName("hiddenExecutionStatus")[0].value
                    DashboardPieChartTool.DrawServiceExecutionPieChart(result, "pieExecutionResult");
                    DashboardBarGraphTool.drawServiceOverviewGraph("", "divResponseOverviewGraph");
                    DashboardPartitionGraphTool.ShowServicePartitionGraph(dFlag);
                }
            });
        }
        context.TrackGuidePerformance = function () {
            var checkedGuides = []
            $(".guideCheckClass:checked").each(function () { checkedGuides.push($(this).attr("data-guide")); });
            GetGuideResponseTime(checkedGuides.join("|"), "TrackGuidePerformance");
        };
        context.ShowGuideErrorDetailPopup = function (sender, e) {
            var guideId = sender.closest("tr").getAttribute("data-guideId")
            if (context.StringCompare(sender.closest("td").getAttribute("data-value"), "ERROR")) {
                DashboardErrorDetailPopup.ShowGuideErrorDetails(guideId, e);
            }
        };

        //Region Internal Functions
        function ClearFilters() {
            document.getElementById('txtSearch').value = "";
        }
        context.StringCompare = function (string1, string2) {
            regex = new RegExp('^' + string1 + '$', 'i');

            if (regex.test(string2)) {
                return true;
            }
            return false;
        };
        function comparer(index) {
            return function (a, b) {
                var valA = getCellValue(a, index),
                    valB = getCellValue(b, index);
                return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.localeCompare(valB);
            };
        }
        function getCellValue(row, index) {
            return $(row).children('td').eq(index).attr('data-value');
        }
        function GetGuideResponseTime(mergedGuideIds, actionName) {
            var dFlag = 0;
            if (mergedGuideIds == "" || mergedGuideIds == undefined) {
                mergedGuideIds = "";
            }
            if (mergedGuideIds != "") {
                $("#overlayServiceDashboardTop").css("z-index", "1");
                if (actionName.toLowerCase() == ("TrackGuidePerformance").toLowerCase()) {
                    dFlag = 1;
                }
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "DashboardGuideDetailsTool",
                    action: actionName,
                    context:
                        {
                            mergedGuideIds: mergedGuideIds,

                        },
                    callback: function (data) {
                        $("#overlayServiceDashboardTop").css("z-index", "-1");
                        context.paginateTable();
                        var result = data[0].getElementsByClassName("hiddenExecutionStatus")[0].value
                        DashboardPieChartTool.DrawGuideExecutionPieChart(result, "pieExecutionResult");
                        DashboardBarGraphTool.drawServiceOverviewGraph("", "divResponseOverviewGraph");
                        DashboardPartitionGraphTool.ShowGuidePartitionGraph(dFlag);
                    },
                    errorcallback: function (error) {
                        $("#overlayServiceDashboardTop").css("z-index", "-1");
                    }
                });
            }


        };

        //Region Table Filters And Search
        context.ShowFilteredGuides = function (mergedGuideIds) {
            if (mergedGuideIds != "" && mergedGuideIds != null) {
                ClearFilters();
                var array1 = mergedGuideIds.split(",")
                if (mergedGuideIds.toLowerCase() == "NOVA".toLowerCase()) {
                    $(".trGuideDetails").slideDown();
                    $(".trGuideDetails").each(function () {
                        $(this).addClass("filtered");/*temp ajinkya*/
                    });
                }
                else {
                    $(".trGuideDetails").hide();
                    $(".trGuideDetails").each(function () {

                        if ($.inArray($(this).attr("data-guideId"), array1) >= 0) {
                            $(this).slideDown();
                            $(this).addClass("filtered");/*temp ajinkya*/
                        }
                        else {
                            $(this).removeClass("filtered");/*temp ajinkya*/
                        }
                    });
                }
                context.paginateTable();
            }
        };
        context.ddlSelectServicesByAgentChanged = function (sender, event) {
            document.getElementById('txtSearch').value = "";
            var ServiceAgent = sender.selectedOptions[0].value;
            if (ServiceAgent === "ALL") {
                $(".trGuideDetails").slideDown();
                $(".trGuideDetails").each(function () {
                    $(this).addClass("filtered");/*temp ajinkya*/
                });
            }
            else if (ServiceAgent === "SELECTED") {
                $(".trGuideDetails").hide();
                $(".trGuideDetails").each(function () {
                    if ($(this).find('#chkGuide')[0].checked) {
                        $(this).slideDown();
                        $(this).addClass("filtered");/*temp ajinkya*/
                    }
                    else {
                        $(this).removeClass("filtered");/*temp ajinkya*/
                    }
                });


            }
            else {
                $(".trGuideDetails").hide();
                $(".trGuideDetails").each(function () {

                    if ($(this).attr("data-agent") === ServiceAgent) {
                        $(this).slideDown();
                        $(this).addClass("filtered");/*temp ajinkya*/
                    }
                    else {
                        $(this).removeClass("filtered");/*temp ajinkya*/
                    }
                });
            }
            context.paginateTable();
        }
        context.txtSearchFilterChanged = function () {
            var table = $('#tblGuideDetails')
            var tbody = table.find('tbody');
            tbody.find('tr').each(function () {
                var searchString = document.getElementById("txtSearch").value;
                var aText = $(this).find('#tdGuideName').attr('data-value');

                if (aText.toString().toLowerCase().indexOf(searchString.toLowerCase()) >= 0) {
                    $(this).show();
                    $(this).addClass("filtered");/*temp ajinkya*/
                }
                else {
                    $(this).removeClass("filtered");/*temp ajinkya*/
                    $(this).hide();
                }
            }).appendTo(tbody);
            context.paginateTable();
        };
        context.SortGuideDetails = function (sender, index) {
            var table = $('#tblGuideDetails');
            var headers = table.find('thead th');
            var tbody = table.find('tbody');
            var rows = tbody.find('tr.trGuideDetails').toArray().sort(comparer(index));
            sender.asc = !sender.asc;
            headers.removeClass('header-sort-up header-sort-down');
            if (!sender.asc) {
                rows = rows.reverse();
                $(sender).addClass('header-sort-down');
            }
            else {
                $(sender).addClass('header-sort-up');
            }
            for (var i = 0; i < rows.length; i++) {
                table.append(rows[i]);
            }
            context.paginateTable();
        };
        context.onGuideCheckChanged = function () {
            var serviceCountBadges = document.getElementsByClassName('GuideCountBadge');
            var totaGuides = $(".guideCheckClass").length;
            var selectedGuides = $(".guideCheckClass:checked").length;
            if (selectedGuides < totaGuides) {
                document.getElementById("chkAllGuides").checked = false;
            }
            else if (selectedGuides == totaGuides) {
                document.getElementById("chkAllGuides").checked = true;
            }
            $.each(serviceCountBadges, function (index) { this.innerHTML = $(".guideCheckClass:checked").length });
        };
        context.CheckAllGuides = function (chkHeader) {
            if ($(chkHeader).prop("checked")) { // check select status
                $('.guideCheckClass').each(function () { //loop through each checkbox
                    this.checked = true;  //select all checkboxes with class "guideCheckClass"               
                });
            } else {
                $('.guideCheckClass').each(function () { //loop through each checkbox
                    this.checked = false; //deselect all checkboxes with class "guideCheckClass"                       
                });
            }
            context.onGuideCheckChanged();

        };
        context.ddlItemsPerPageChanged = function (sender, event) {

            context.itemsPerPage = sender.selectedOptions[0].value;
            context.paginateTable();
        }
        context.paginateTable = function () {
            $('#tblGuideDetails').each(function () {
                var currentPage = 0;
                var $table = $(this);
                var numPerPage = context.itemsPerPage === 'ALL' ? $table.find('tbody tr.filtered').length : parseInt(context.itemsPerPage);
                $("#pgrGuideDetails").remove();
                $table.bind('repaginate', function () {
                    $table.find('tbody tr.filtered').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                });
                $table.trigger('repaginate');
                var numRows = $table.find('tbody tr.filtered').length;
                var numPages = Math.ceil(numRows / numPerPage);
                var $pager = $('<div id="pgrGuideDetails" class="pager"></div>');
                for (var page = 0; page < numPages; page++) {
                    $('<span class="page-number page-button"></span>').text(page + 1).bind('click', {
                        newPage: page
                    }, function (event) {
                        currentPage = event.data['newPage'];
                        $table.trigger('repaginate');
                        $(this).addClass('active').siblings().removeClass('active');
                    }).appendTo($pager).addClass('clickable');
                }
                $pager.insertBefore($table).find('span.page-number:first').addClass('active');
            });
        };
        context.HideGuideDetailsTool = function () {
            $("#DashboardGuideDetailsTool_placeholder").html("");
        }
        context.ShowGuideDetailsTool = function () {
            DashboardGuideDetailsTool.loadTool();
        }
    })(DashboardGuideDetailsTool);
})(jQuery);