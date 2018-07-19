/// <reference path="~/Layouts/TPCIP.Web/Scripts/_references.js" />


// Define TdcAsyncWebPartLoader namespace.
if (TdcLogin == null || typeof (TdcLogin) != "object") {
    var TdcLogin = new Object();
}

// Workaround for IE.
//if (typeof console == "undefined" || typeof console.log == "undefined") {
//    var console = { log: function () { }, error: function () { } };
//}

(function ($) {

    (function (context) {

        context.ValidateAndShowBatchUserLogOutButton = function()
        {
            if (TdcMain.isBatchUser.toLowerCase() == "true") {
                $(document).find(".logoutBatchUser").show();
                if (window.location.href.indexOf("Default") >= 1 || window.location.href.indexOf("default") >= 1) {
                    TdcPopupBatchUserLogin.setup();
                }
            }
            else {
                $(document).find(".logoutBatchUser").hide();
            }
        };

        context.init = function () {
            
            //context.ValidateAndShowBatchUserLogOutButton();

            //context.$rootElement = $("#cip_content_container");

            //context.$rootElement.on(context.toolLoadedEventName, function (event, $html) {
            //    $html.find('input[placeholder]').inputWatermark();
            //});
            //$(document).find("form").removeAttr('onsubmit')
            //$(document).find("form").submit(function (e) {
            //    alert('c');
            //    e.preventDefault();
            //});
        };

        context.onKeyupOfUsername =  function (sender, event) {
            $(sender).removeClass("invalidInput");

            if ($(sender).val().trim() != "") {
                if (event.keyCode == 13) {
                    $(".BatchUserLoginScreen .passWord").focus();
                }

                if ($(".BatchUserLoginScreen .passWord").val().trim() == "") {
                    $(".BatchUserLoginScreen .btnLogin").attr("disabled", true);
                }
                else {
                    $(".BatchUserLoginScreen .btnLogin").attr("disabled", false);
                }
            }
            else {
                if (event.keyCode == 13) {
                    $(sender).addClass("invalidInput");
                }
                $(".BatchUserLoginScreen .btnLogin").attr("disabled", true);
            }

        };

      

        context.onKeyupOfPassword = function (sender, event) {
            $(sender).removeClass("invalidInput");

            if ($(sender).val().trim() != "") {
                if (event.keyCode == 13) {
                    if ($(".BatchUserLoginScreen .userName").val().trim() == "") {
                        $(".BatchUserLoginScreen .userName").addClass("invalidInput");
                        $(".BatchUserLoginScreen .userName").focus();
                    }
                    else {
                        if (context.ValidUserNameAndPassword($(sender))) {
                            context.ValidateAndCreateUserSession($(sender))
                        }
                    }
                }

                if ($(".BatchUserLoginScreen .userName").val().trim() == "") {
                    $(".BatchUserLoginScreen .btnLogin").attr("disabled", true);
                }
                else {
                    $(".BatchUserLoginScreen .btnLogin").attr("disabled", false);
                }
            }
            else {
                if (event.keyCode == 13) {
                    $(sender).addClass("invalidInput");
                }
                $(".BatchUserLoginScreen .btnLogin").attr("disabled", true);
            }

        };

        context.LogOutBatchUserAndClearSession = function (sender)
        {
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'PopupBatchUserLogin',
                action: 'logOutBatchUser',
                context: {                   
                },
                callback: function (data) {
                window.location.replace(window.location.href.replace("Default", "Login").replace("default", "Login"));
                },
            }, $(sender));
        };

        context.ValidUserNameAndPassword = function (sender)
        {
            var $sender = $(sender);
            var $webpart = TdcAsyncWebPartLoader.getTool($sender);
            $webpart.find(".userName").removeClass("invalidInput");
            $webpart.find(".passWord").removeClass("invalidInput");
            var res = true;
            if ($webpart.find(".passWord").val().trim() == "") {
                $webpart.find(".passWord").focus();
                $webpart.find(".passWord").addClass("invalidInput");
                res = false;
            }

            if ($webpart.find(".userName").val().trim() == "") {
                $webpart.find(".userName").focus();
                $webpart.find(".userName").addClass("invalidInput");
                res = false;
            }
            return res;
        }

       


        context.ValidateAndCreateUserSession = function (sender) {           
            var $sender = $(sender);
            var $webpart = TdcAsyncWebPartLoader.getTool($sender);
            if (!context.ValidUserNameAndPassword($sender ))
            {
                return false;
            }
            var isLoginPage = window.location.href.toLowerCase().indexOf('login') > 0;
            
            //var $webpart = $(".loginMainDiv");
            $webpart.find(".errorMsgDiv").hide();
            $webpart.find("#lblUserLogin").val("");
            var username = $webpart.find(".userName").val();
            var password = $webpart.find(".passWord").val();
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'Login',
                action: 'ValidateAndCreateUserSession',
                messageProcess: 'Validerer Bruger...',
                //messageSuccess: 'Valideret Bruger',
                context: {
                    userName: username,
                    passWord: password,                    
                    isLoginPage: isLoginPage,
                },
                callback: function (data) {
                
                    if (data.loggedInSuccessfully == false) {
                        $webpart.find("#lblUserLogin").text(data.ErrorText);
                        $webpart.find(".errorMsgDiv").show();
                        return false;
                    }
                    else {
                        if(window.location.href.toLowerCase().indexOf('login') > 0 )//if call from Login page
                        {
                            var groupname = data.userGroups;
                            var ddUserGroupNames = $webpart.find("#ddUserGroupNames");
                            if( ddUserGroupNames )
                            {
                                ddUserGroupNames.html("");
                                if (groupname != undefined) {
                                    $.each(groupname, function (index, value) {
                                        ddUserGroupNames.append($("<option></option>").val(value).html(value));
                                    });
                                }
                            }
                            var hrefUrl = window.location.href.replace("Login", "Default").replace("login", "Default");
                            //hrefUrl = encodeURI(hrefUrl + "&userId=" + data.LoggedUserId + "&userName=" + data.LoggedUserName);
                            window.location.assign(hrefUrl);
                        }
                        else //call from Popup
                        {
                            $("#PopupBatchUserLogin").modal("hide");
                        }
                    }

                    
                },
            },  $webpart.find(".btnLogin"));          
           
        }

        context.SignOffUser = function (sender) {
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'Login',
                action: 'signOffUser',
            });
        }

    })(TdcLogin);

    $(document).ready(TdcLogin.init);

})(jQuery);
