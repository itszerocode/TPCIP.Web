/// <reference path="../asyncwebpartloader.js" />


if (ToolSendError == null || typeof (ToolSendError) != "object") {
    var ToolSendError = new Object();
}



(function ($) {

    (function (context) {


        context.toolname = 'ToolSendError';
        context.load = function (sender) {

            $("#Emailreqtxt").hide();
            var RequestData = JSON.parse($("[id$='hdnMaildetails']").val());
            var UserId = $("[id$='hdnUserID']").val();
            //$("label[for='LblLID']").text(RequestData.context.customerId);
            $("#Lidtxt").val(RequestData.context.customerId);
            $("#UNametxt").val(UserId);
            $("#ToolNametxt").val(RequestData.toolname);
            $("#PortalIdtxt").val("Service portal");
            $('#AreaDropdown').html("");
            $('#urgencyDropDown').html("");
            $('#impactDropDown').html("");

            var date = new Date();
            var GetHours = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours());
            var GetMinutes = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
            var GetSeconds = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
            var currentdate = date.getDate() + '/' + (date.getMonth() + 1) + "/" + date.getFullYear();
            var CurrentDateTime = currentdate + ' ' + GetHours + ':' + GetMinutes +':'+ GetSeconds
            $("#Datetimetxt").val(CurrentDateTime);

            var Imapct = { "1": "User", "2": "Multiple User", "3": "Site/Dept", "4": "Enterprise", }
            $.each(Imapct, function (key, value) {
                $('#impactDropDown').append($('<option>', { value: key }).text(value));
            });


            //var Area = { "1": "Vælg", "2": "Technical", "3": "Application", "4": "EUC-technical", "5": "EUC - User Administration", "6": "EUC-Application", "7": "EUC-Infrastructure" }
            //$.each(Area, function (key, value) {
            //    $('#AreaDropdown').append($('<option>', { value: key }).text(value));
            //});

            //$("#AreaDropdown").change(function () {
            //    $("#SubAreaDropdown").html("");
            //    if ($(this).val != "Vaelg") {
            //        $("#SubAreaDropdown").prop("disabled", false);
            //        var n = $(this).val();
            //        switch (n) {
            //            case '2':
            //                $("#SubAreaDropdown").html("");
            //                technical = {
            //                    "1": "capacity issue",
            //                    "2": "DEFAULT",
            //                    "3": "data or file missing",
            //                    "4": "error message",
            //                    "5": "function or feature not working",
            //                    "6": "hardware failure (laptop, desktop)",
            //                    "7": "hardware failure (Server)",
            //                    "8": "job failed",
            //                    "9": "Local admin rights",
            //                    "10": "login failure",
            //                    "11": "meeting room",
            //                    "12": "DEFAULT",
            //                    "13": "miscellaneous",
            //                    "14": "missing or stolen",
            //                    "15": "performance degradation",
            //                    "16": "security breach",
            //                    "17": "security event/message",
            //                    "18": "supplies",
            //                    "19": "system down",
            //                    "20": "system or application hangs",
            //                    "21": "virus alert",
            //                }
            //                $.each(technical, function (key, value) {
            //                    $('#SubAreaDropdown').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            case '3':
            //                $("#SubAreaDropdown").html("");
            //                Application = {
            //                    "1": "complex usage",
            //                    "2": "error message",
            //                    "3": "function or feature not working",
            //                    "4": "job failed",
            //                    "5": "login failure",
            //                    "6": "miscellaneous",
            //                    "7": "performance degradation",
            //                    "8": "system or application hangs",
            //                }
            //                $.each(Application, function (key, value) {
            //                    $('#SubAreaDropdown').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            case '4':
            //                $("#SubAreaDropdown").html("");
            //                EUC_technical = {

            //                    "1": "Technical",
            //                }
            //                $.each(EUC_technical, function (key, value) {
            //                    $('#SubAreaDropdown').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            case '5':
            //                $("#SubAreaDropdown").html("");
            //                EUC_Application = {
            //                    "1": "CCF",
            //                    "2": "Citrix Reciever",
            //                    "3": "CnPC",
            //                    "4": "eOrdre",
            //                    "5": "FAS",
            //                    "6": "Globus",
            //                    "7": "Java",
            //                    "8": "Livemeeting",
            //                    "9": "McAfee Anti-Virus",
            //                    "10": "Microsoft Office",
            //                    "11": "Miscellaneous",
            //                    "12": "PointSec",
            //                    "13": "QuickPlus2",
            //                    "14": "QuickXtern",
            //                    "15": "Reflection",
            //                    "16": "SAS",
            //                    "17": "Softphone",
            //                    "18": "SQL",

            //                }
            //                $.each(EUC_Application, function (key, value) {
            //                    $('#SubAreaDropdown').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            case '6':
            //                $("#SubAreaDropdown").html("");
            //                EUC_Infrastructure = {

            //                    "1": "Break-fix",
            //                    "2": "Communicator",
            //                    "3": "Drive increase",
            //                    "4": "Drive restore",
            //                    "5": "Mail Restore",
            //                    "6": "Miscellaneous",
            //                    "7": "Network Printer Error",
            //                    "8": "Network Printer Hardware",
            //                    "9": "Network problems",
            //                    "10": "Outlook Enterprise Vault",
            //                    "11": "Outlook Mail",
            //                    "12": "S-Drive Increase",
            //                    "13": "S-Drive Restore",
            //                    "14": "Webmail",
            //                    "15": "Windows 7",
            //                    "16": "Windows XP",

            //                }
            //                $.each(EUC_Infrastructure, function (key, value) {
            //                    $('#SubAreaDropdown').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            case '7':
            //                $("#SubAreaDropdown").html("");
            //                EUC_User_Administration = {
            //                    "1": "Activate Computer Account",
            //                    "2": "Disabled User",
            //                    "3": "Miscellaneous",
            //                    "4": "Password Reset",
            //                    "5": "Unlock Account",
            //                    "6": "User Administration",

            //                }
            //                $.each(EUC_User_Administration, function (key, value) {
            //                    $('#SubAreaDropdown ').append($('<option>', { value: key }).text(value));
            //                });
            //                break;
            //            default:

            //                break;



            //        }


            //    }
            //    else {
            //        $("#SubAreaDropdown").append($("<option></option>").val("-").html("Vælg"));
            //        $("#SubAreaDropdown").prop("disabled", true);
            //    }
            //});

        }





        context.emailccheck = (function (sender) {
            if ($("#EmailrequireChk").prop('checked')) {
                $("#Emailreqtxt").show();
            }
            else {
                $("#Emailreqtxt").hide();
            }
        });


        //$("#Btn1").on("click", function (event) {
        //    event.stopPropagation();
        //});

        //$(".ErrorFrom").on("submit", function (event) {
        //    alert("aa");
        //    event.preventDefault();
        //});
        context.validate = function () {
            var result = true;
            $("#EmailData .value , .Dropvalue").filter(":visible").each(function (a) {

                if ($(this).val() == "") {
                    result = false;
                    $(this).addClass("invalidInput");
                    //` $(this).focus().addClass; 
                }

                else {

                    $(this).removeClass("invalidInput");

                    return true;
                }

            });
            return result;
        }
        context.Validatemail = function () {
           if( $("#Emailreqtxt").is(':visible'))
            {
            var result = true;
            var array = $("#Emailreqtxt").val().trim().replace(';', ',').split(",");

            var filter = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            //if it's valid email
            $.each(array, function (i) {
                if ((array[i]).trim() != '')
                    
                    if ( filter.test(array[i])) {
                        $("#Emailreqtxt").removeClass("invalidInput");
                        return true;

                    }
               
                    //if it's NOT valid
                else {
                    // alert("Enten er felt ikke udfyldt med korrekt værdi\n Eller også er obligatorisk felt ikke udfyldt\n Ret de(t) fremhævde Felt(er) og prøv igen !");
                    $("#Emailreqtxt").addClass("invalidInput");
                    $("#Emailreqtxt").focus().addClass;
                    result = false;
                }

            });
            return result;
            }
        else
        {
               result = true;
               return result;
            }
        }

        $(document).on("click", "#Btn1", function (event) {
            var validationresult = context.validate();
            var emailresult = context.Validatemail();
            if (validationresult && emailresult) {
                //var formData = new FormData();

                //var files = $("#attachmentText").get(0).files;
                //if (files.length > 0) {
                //    data.append("UploadedImage", files[0]);
                //}

                var StackTrace = $(".error").parent().html().replace(/(<([^>]+)>)/ig, "");

                var arrFormData = {};

                //var files = $("#attachmentText").get(0).files;
                $("#EmailData .value,.val").filter(":visible").each(function (a) {

                    var key = $(this).attr('name');
                    var value = $(this).val();
                    arrFormData[key] = value;
                });
                $("#EmailData .Dropvalue").filter(":visible").each(function (a) {

                    var key = $(this).attr('name');
                    var value = $(this).find('option:selected').text();
                    arrFormData[key] = value;
                });


                var data = {
                    customerId: '',
                    dicEmailSend: arrFormData,
                    Stacktrace: StackTrace,

                };

                TdcAsyncWebPartLoader.DoAction({
                    type: "POST",
                    toolname: "ToolSendMail",
                    action: 'Mail_send',
                    context: data,
                    callback: function () {
                        
                        alert("Email afsendt");
                        window.close();
                    },
                    errorcallback: function (result) {
                        alert("Email ikke afsendt, opret derfor fejlen manuelt.");
                        window.close();
                    },
                });





                //TdcAsyncWebPartLoader.DoAction({
                //    toolname: "ToolSendMail",
                //    action: 'Mail_send',
                //    context: data,
                //    messageSuccess: "Message send",
                //}); window.close();



                //event.preventDefault ? event.preventDefault() : event.returnValue = false;

            }
        });

        $(document).on("click", "#CancelBtn", function (event) {
            window.close();
        });

    })(ToolSendError);

})(jQuery);