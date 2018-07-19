if (ServiceDashboard == null || typeof (ServiceDashboard) != "object") {
    var ServiceDashboard = new Object();
};

(function ($) {

    (function (context) {
        context.ToolDetails = [];
        context.ToolDetailMap = {};
        context.OnChangeEntityTypeDropdown = function (sender, event) {
            DashboardPieChartTool.loadTool();
            DashboardBarGraphTool.drawServiceOverviewGraph("", "divResponseOverviewGraph");
            var entityType = sender.selectedOptions[0].value;
            if (entityType.toLowerCase() === "SERVICE".toLowerCase()) {
                document.getElementById('pServiceName').innerHTML = "No Service Selected";
                DashboardServiceDetailsTool.ShowServicesDetailsTool();
                DashboardPartitionGraphTool.ShowServicePartitionGraph(0);
                DashboardGuideDetailsTool.HideGuideDetailsTool();
            }
            else if (entityType.toLowerCase() === "GUIDE".toLowerCase()) {
                document.getElementById('pServiceName').innerHTML = "No Guide Selected";
                DashboardServiceDetailsTool.HideServicesDetailsTool();
                DashboardPartitionGraphTool.ShowGuidePartitionGraph(0);
                DashboardGuideDetailsTool.ShowGuideDetailsTool();
            }
        }
        context.UploadToolCSS= function (e) {
            var files = e.target.files;
            //var myID = 3; //uncomment this to make sure the ajax URL works
            if (files.length > 0) {
                if (window.FormData !== undefined) {
                    var data = new FormData();
                    for (var x = 0; x < files.length; x++) {
                        data.append("file" + x, files[x]);
                    }

                    $.ajax({
                        type: "POST",
                        url: '/MyController/UploadFile?id=' + myID,
                        contentType: false,
                        processData: false,
                        data: data,
                        success: function (result) {
                            console.log(result);
                        },
                        error: function (xhr, status, p3, p4) {
                            var err = "Error " + " " + status + " " + p3 + " " + p4;
                            if (xhr.responseText && xhr.responseText[0] == "{")
                                err = JSON.parse(xhr.responseText).Message;
                            console.log(err);
                        }
                    });
                } else {
                    alert("This browser doesn't support HTML5 file uploads!");
                }
            }
        };

        
        context.PopulateToolMap = function () {
            if (context.ToolDetails.length === 0) {
                $.ajax({
                    type: "POST",
                    url: "ServiceDashboard.aspx/GetToolsFromCache",
                    data: {},
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    error: function (msg) {
                        CreateToolMap();
                        context.ToolDetails = [];
                    },
                    success: function (msg) {
                        // Do something interesting here.
                        try {
                            context.ToolDetails = JSON.parse(msg.d);
                            CreateToolMap();
                        }
                        catch (e) {
                            CreateToolMap();
                            context.ToolDetails = [];
                        }
                    }
                });
            }
        };
        function CreateToolMap() {
            for (i = 0; i < context.ToolDetails.length; i++) {
                context.ToolDetailMap[context.ToolDetails[i].ToolName + context.ToolDetails[i].ToolAction] = context.ToolDetails[i];
            }
        }
        context.GetToolDetails = function (toolName, toolAction) {
            context.PopulateToolMap();
            if (context.ToolDetailMap[toolName + toolAction]) {
                return context.ToolDetailMap[toolName + toolAction];
            }
            else {
                return {
                    ToolID: null,
                    ToolName: toolName,
                    ToolAction: toolAction,
                    ToolCategory: null,
                    ToolServiceIDs: null,
                    ToolServices: null,
                    AverageResponseTime: 0,
                    BestResponseTime: 0,
                    WorstResponseTime: 0
                }
            }
        }
        context.UpdateToolStatistics = function (sender) {
            TdcAsyncWebPartLoader.DoAction({
                toolname: "ServiceDashboard",
                action: 'UpdateToolStatistics',
                context: {
                },
                callback: function () {
                    
                },
                errorcallback: function () {
                   
                },
                messageProcess: "Updating Tool Statistics",
                messageSuccess: "Tool statistics updated Successfully",
                messageError: "Error updating Tool statistics",
            }, sender);
        }
       // context.PopulateToolMap();
    })(ServiceDashboard);
})(jQuery);