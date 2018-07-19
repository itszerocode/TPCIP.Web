if (DashboardErrorDetailPopup == null || typeof (DashboardErrorDetailPopup) != "object") {
    var DashboardErrorDetailPopup = new Object();
};

(function ($) {

    (function (context) {
        context.loadTool = function () {
            $('#DashboardErrorDetailPopup').modal();
            TdcAsyncWebPartLoader.ShowTool({
                toolname: 'DashboardErrorDetailPopup',
                context: {
                },
                callback: function (data) {
                    e.preventDefault();
                },
                errorcallback: function () {
                    e.preventDefault();
                }
            });
            e.preventDefault();
        }
        context.ShowServiceErrorDetails = function (serviceId, e) {
            $('#DashboardErrorDetailPopup_placeholder').empty();
            $('#DashboardErrorDetailPopup').modal();
            TdcAsyncWebPartLoader.ShowTool({
                toolname: 'DashboardErrorDetailPopup',
                action: "ShowServiceErrorDetailPopup",
                context: {
                    serviceId: serviceId
                },
                callback: function (data) {
                    e.preventDefault();
                },
                errorcallback: function () {
                    e.preventDefault();
                }
            });
            e.preventDefault();
        }
        context.ShowGuideErrorDetails = function (guideId, e) {
            $('#DashboardErrorDetailPopup_placeholder').empty();
            $('#DashboardErrorDetailPopup').modal();
            TdcAsyncWebPartLoader.ShowTool({
                toolname: 'DashboardErrorDetailPopup',
                action: "ShowGuideErrorDetailPopup",
                context: {
                    guideID: guideId
                },
                callback: function (data) {
                    e.preventDefault();
                },
                errorcallback: function () {
                    e.preventDefault();
                }
            });
            e.preventDefault();
        }
    })(DashboardErrorDetailPopup);
})(jQuery);