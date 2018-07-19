if (DashboardServiceDetailsTool == null || typeof (DashboardServiceDetailsTool) != "object") {
    var DashboardServiceDetailsTool = new Object();
};

(function ($) {

    (function (context) {
        context.itemsPerPage = '10';
        context.loadTool = function () {
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "DashboardServiceDetailsTool",
                context:
                    {
                    },
                callback: function (data) {
                    context.paginateTable();
                }
            });
        };
        context.ResetSelectedServicePerf = function () {

            var checkedServices = []
            $(".serviceCheckClass:checked").each(function () { checkedServices.push($(this).attr("data-serviceId")); });
            GetServiceResponseTime(checkedServices.join(","), "ResetServicePerformance");
        };
        context.TrackSelectedServicePerf = function () {
            var checkedServices = []
            $(".serviceCheckClass:checked").each(function () { checkedServices.push($(this).attr("data-serviceId")); });
            GetServiceResponseTime(checkedServices.join(","), "TrackServiceResponseTime");
        };
        context.ShowServiceErrorDetailPopup = function (sender, e) {
            var serviceId = sender.closest("tr").getAttribute("data-serviceid")
            if (context.StringCompare(sender.closest("td").getAttribute("data-value"), "ERROR")) {
                DashboardErrorDetailPopup.ShowServiceErrorDetails(serviceId, e);
            }
        };
        //Region Internal Functions
        function ClearFilters() {
            document.getElementById('ddlSelectServicesByAgent').selectedIndex = 0;
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
        function GetServiceResponseTime(mergedServiceIds, actionName) {
            var dFlag = 0;
            if (mergedServiceIds == "" || mergedServiceIds == undefined) {
                mergedServiceIds = "";
            }
            
            if (mergedServiceIds != "") {
                $("#overlayServiceDashboardTop").css("z-index", "1");
                if (actionName.toLowerCase() == ("TrackServiceResponseTime").toLowerCase()) {
                    dFlag = 1;
                }
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "DashboardServiceDetailsTool",
                    action: actionName,
                    context:
                        {
                            mergedServiceIds: mergedServiceIds,

                        },
                    callback: function (data) {
                        $("#overlayServiceDashboardTop").css("z-index", "-1");
                        context.paginateTable();
                        var result = data[0].getElementsByClassName("hiddenExecutionStatus")[0].value
                        DashboardPieChartTool.DrawServiceExecutionPieChart(result, "pieExecutionResult");
                        DashboardBarGraphTool.drawServiceOverviewGraph("", "divResponseOverviewGraph");
                        DashboardPartitionGraphTool.ShowServicePartitionGraph(dFlag);
                    },
                    errorcallback: function (error) {
                        $("#overlayServiceDashboardTop").css("z-index", "-1");
                }
                });
            }


        };
        //Region Table Filters And Search
        context.ShowFilteredServices = function (mergedServiceIds) {
            if (mergedServiceIds != "" && mergedServiceIds != null) {
                ClearFilters();
                var array1 = mergedServiceIds.split(",")
                if (mergedServiceIds.toLowerCase() == "NOVA".toLowerCase()) {
                    $(".trServiceDetails").slideDown();
                    $(".trServiceDetails").each(function () {
                        $(this).addClass("filtered");/*temp ajinkya*/
                    });
                }
                else {
                    $(".trServiceDetails").hide();
                    $(".trServiceDetails").each(function () {

                        if ($.inArray($(this).attr("data-serviceid"), array1) >= 0) {
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
                $(".trServiceDetails").slideDown();
                $(".trServiceDetails").each(function () {
                    $(this).addClass("filtered");/*temp ajinkya*/
                });
            }
            else if (ServiceAgent === "SELECTED") {
                $(".trServiceDetails").hide();
                $(".trServiceDetails").each(function () {
                    if ($(this).find('#chkService')[0].checked) {
                        $(this).slideDown();
                        $(this).addClass("filtered");/*temp ajinkya*/
                    }
                    else {
                        $(this).removeClass("filtered");/*temp ajinkya*/
                    }
                });
            }
            else {
                $(".trServiceDetails").hide();
                $(".trServiceDetails").each(function () {
                    if ($(this).attr("data-agent") === ServiceAgent) {
                        $(this).slideDown();
                        $(this).addClass("filtered");/*temp ajinkya*/
                    }
                    else if ($(this).attr("data-type") === ServiceAgent) {
                        $(this).slideDown();
                        $(this).addClass("filtered");
                    }
                    else {
                        $(this).removeClass("filtered");/*temp ajinkya*/
                    }
                });
            }
            context.paginateTable();
        }
        context.txtSearchFilterChanged = function () {
            var table = $('#tblserviceDetails')
            var tbody = table.find('tbody');
            document.getElementById('ddlSelectServicesByAgent').selectedIndex = 0;
            tbody.find('tr').each(function () {
                var searchString = document.getElementById("txtSearch").value;
                var aText = $(this).find('#tdServiceName').attr('data-value');

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
        context.SortServiceDetails = function (sender, index) {
            var table = $('#tblserviceDetails');
            var headers = table.find('thead th');
            var tbody = table.find('tbody');
            var rows = tbody.find('tr.trServiceDetails').toArray().sort(comparer(index));
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
        context.onServiceCheckChanged = function () {
            var serviceCountBadges = document.getElementsByClassName('ServiceCountBadge');
            var totalServices = $(".serviceCheckClass").length;
            var selectedServices = $(".serviceCheckClass:checked").length;
            if (selectedServices < totalServices) {
                document.getElementById("chkAllServices").checked = false;
            }
            else if (selectedServices == totalServices) {
                document.getElementById("chkAllServices").checked = true;
            }
            $.each(serviceCountBadges, function (index) { this.innerHTML = $(".serviceCheckClass:checked").length });
        };
        context.CheckUnCheckAllServices = function (chkHeader) {
            if ($(chkHeader).prop("checked")) { // check select status
                $('.serviceCheckClass').each(function () { //loop through each checkbox
                    this.checked = true;  //select all checkboxes with class "serviceCheckClass"               
                });
            } else {
                $('.serviceCheckClass').each(function () { //loop through each checkbox
                    this.checked = false; //deselect all checkboxes with class "serviceCheckClass"                       
                });
            }
            context.onServiceCheckChanged();

        };
        context.ddlItemsPerPageChanged = function (sender, event) {

            context.itemsPerPage = sender.selectedOptions[0].value;
            context.paginateTable();
        }
        context.paginateTable = function () {
            $('#tblserviceDetails').each(function () {
                var currentPage = 0;
                var $table = $(this);
                var numPerPage = context.itemsPerPage === 'ALL' ? $table.find('tbody tr.filtered').length : parseInt(context.itemsPerPage);
                $("#pgrServiceDetails").remove();
                $table.bind('repaginate', function () {
                    $table.find('tbody tr.filtered').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
                });
                $table.trigger('repaginate');
                var numRows = $table.find('tbody tr.filtered').length;
                var numPages = Math.ceil(numRows / numPerPage);
                var $pager = $('<div id="pgrServiceDetails" class="pager"></div>');
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
        context.HideServicesDetailsTool = function () {
            $("#DashboardServiceDetailsTool_placeholder").html("");
        }
        context.ShowServicesDetailsTool = function () {
            DashboardServiceDetailsTool.loadTool();
        }

    })(DashboardServiceDetailsTool);
})(jQuery);