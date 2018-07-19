// Define TdcUserToolBox namespace.
if (TdcUserToolBox == null || typeof (TdcUserToolBox) != "object") {
    var TdcUserToolBox = new Object();
}
(function ($) {

    (function (context) {
        
        context.userId = "";
        context.userName = "";
        context.userDepartment = "";

        context.getUserId = function() {
            var userId = $('#cip_content_container #cip_content').data("userid");
            return userId;
        }
        context.getUserName = function() {
            var userName = $('#cip_content_container #cip_content').data("username");
            return userName;
        }
        context.getUserDepartment = function () {
            var userDepartment = $('#cip_content_container #cip_content').data("departmentname");
            return userDepartment;
            };   

    })(TdcUserToolBox); 

})(jQuery);