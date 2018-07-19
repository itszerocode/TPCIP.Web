if (TdcEmailIdValidator == null || typeof (TdcEmailIdValidator) != "object") {
    var TdcEmailIdValidator = new Object();
}

(function ($) {

    (function (context) {



        context.init = function () {

            $(document).on('keyup', ".BindEmailValidator", function () {

                context.PermissionsList = [];
                context.PermissionsNumbersList = [];
                var validatemailcallback = "";
                var $emailIdValidTextBox = $(this);
                var errorid = $emailIdValidTextBox.data("errorid");
                var toolJsObjRef = "";
                var toolJsFunction = "";

                $emailIdValidTextBox.next(".bindEmailValidationError").remove();
                $emailIdValidTextBox.next(".emailIDValidated").remove();
                $emailIdValidTextBox.next(".emailValidationError").remove();

                var $webpart = TdcAsyncWebPartLoader.getTool($emailIdValidTextBox);

                if ($webpart.length == 0) {
                    var $webpart = $emailIdValidTextBox.parents(".modal-body");
                }

              

                if ($emailIdValidTextBox.data('emailvalidationcallback') != undefined) {
                    toolJsObjRef = $emailIdValidTextBox.data('emailvalidationcallback').substring(0, $emailIdValidTextBox.data('emailvalidationcallback').indexOf("."));
                    toolJsFunction = $emailIdValidTextBox.data('emailvalidationcallback').substring($emailIdValidTextBox.data('emailvalidationcallback').indexOf(".") + 1);
                    validatemailcallback = window[toolJsObjRef][toolJsFunction];
                }

                context.PermissionsList = TdcCustomerInformation.Permission;
                if (context.PermissionsList == null || context.PermissionsList == undefined) {
                    context.PermissionsList = [];
                    context.PermissionsList.push("");
                }
                else {
                    $(context.PermissionsList).each(function (index, value) {
                        context.PermissionsNumbersList.push($(this).attr('Value'));
                    });
                }
               

                var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
                var email = $(this).val();


                if (email == "") {
                    $(this).val("");
                    $(this).removeClass("invalidInput");
                    $(this).next(".bindEmailValidationError").remove();
                    $(this).next(".emailIDValidated").remove();
                    $(this).next(".emailValidationError").remove();
                    $webpart.find(".sendAfterEmailIDValidation").attr('disabled', false);

                    if (validatemailcallback != undefined && validatemailcallback != null && validatemailcallback != "") {
                        window[toolJsObjRef][toolJsFunction]($emailIdValidTextBox);
                    }
                }
                else if (email != "" && !pattern.test(email)) {     // Checks whether valid Mobile number is in the textbox
                    $(this).addClass("invalidInput");
                    $(this).next(".emailIDValidated").remove();
                    $(this).next(".emailValidationError").remove();
                    $webpart.find(".sendAfterEmailIDValidation").attr('disabled', true);

                    if (errorid != null && errorid != undefined && errorid != "") {
                        $webpart.find("#" + errorid).length === 1 ? $webpart.find("#" + errorid).html('') : '';
                    }

                    if ($(this).next(".bindEmailValidationError").length == 0) // only add if not added
                    {
                        $(this).after("<label id='msgUpdateError' class='row emailErrorClass msgUpdateError bindEmailValidationError' style='color: red; font-size: x-small; padding-left: 15px;width:145%'>Brug gyldig e-mail adresse (fx. xx@xx.xx)</label>");
                    }
                    else if ($webpart.find(".msgUpdateError").html() === '') {
                        $webpart.find(".msgUpdateError").html('Brug gyldig e-mail adresse (fx. xx@xx.xx)');
                    }


                }

                else {
                    setTimeout(function () {

                        if (email != $emailIdValidTextBox.val())
                            return;

                        $emailIdValidTextBox.removeClass("invalidInput");
                        $emailIdValidTextBox.next(".bindEmailValidationError").remove();
                        $emailIdValidTextBox.attr('disabled', true);
                        $webpart.find(".sendAfterEmailIDValidation").attr('disabled', true);

                        if (context.PermissionsNumbersList.indexOf(email) != "-1") {
                            $emailIdValidTextBox.next(".emailValidationError").remove();
                            if ($emailIdValidTextBox.next(".emailIDValidated").length == 0) {
                                $emailIdValidTextBox.after("<span class='emailIDValidated' style='display: inline-flex;'> <label class='glyphicon glyphicon-ok' style='color: #0b8e5f;  font-size: x-small; display:inline-flex; width:23px'></label> <label id='validatedMessage' style='color: #0b8e5f; font-size: x-small; display:inline-flex; width:145%'>E-mail registreret i kundens navn</label></span>");
                            }
                            if ($webpart.find(".emailIDValidated").length === 1) {
                                if (errorid != null && errorid != undefined && errorid != "")
                                    $webpart.find("#" + errorid).html('');
                            }
                            $emailIdValidTextBox.attr('disabled', false);
                             $webpart.find(".bindMobileValidationError").length == 0 ? $webpart.find(".sendAfterEmailIDValidation").attr('disabled', false) : '';
                            if (validatemailcallback != undefined && validatemailcallback != null && validatemailcallback != "") {
                                validatemailcallback();
                            }
                            $emailIdValidTextBox.focus();
                        }
                        else {
                            TdcAsyncWebPartLoader.DoAction({
                                toolname: 'EmailIdValidator',
                                action: 'EmailIdValidation',
                                messageProcess: 'Tjekker e-mailen',
                                messageSuccess: "",
                                messageError: "",
                                isloadingIcon: true,
                                customClass: "validateProcessMessage",
                                context: {
                                    customerId: TdcCustomerInformation.getSelectedCustomerId(),
                                    emailid: email,
                                },
                                callback: function (response) {
                                    var resultObtained = response;
                                    if (resultObtained == "True") {
                                        $emailIdValidTextBox.next(".emailValidationError").remove();
                                        if ($emailIdValidTextBox.next(".emailIDValidated").length == 0) {
                                            $emailIdValidTextBox.after("<span class='emailIDValidated' style='display: inline-flex; width:203px;'> <label class='glyphicon glyphicon-ok' style='color: #0b8e5f;  font-size: x-small; display:inline-flex; width:23px'></label> <label id='validatedMessage' style='color: #0b8e5f; font-size: x-small; display:inline-flex; width:145%'>E-mail registreret i kundens navn</label></span>");
                                        }
                                        if ($webpart.find(".emailIDValidated").length === 1) {
                                            if (errorid != null && errorid != undefined && errorid != "")
                                                $webpart.find("#" + errorid).html('');
                                        }
                                        if (validatemailcallback != undefined && validatemailcallback != null && validatemailcallback != "") {
                                            window[toolJsObjRef][toolJsFunction]($emailIdValidTextBox);
                                        }
                                    }
                                    else {
                                        $emailIdValidTextBox.next(".emailIDValidated").remove();
                                        if ($emailIdValidTextBox.next(".emailValidationError").length == 0) // only add if not added
                                        {
                                            $webpart.find("#" + errorid).length === 1 ? $webpart.find("#" + errorid).hide() : '';
                                            $emailIdValidTextBox.after("<span class='msgUpdateError emailValidationError emailValidationFailure' style='display: inline-flex;width:224px'> <label class='glyphicon glyphicon-remove' style='color: red; font-size: x-small; display:inline-flex; width:15px'></label> <label id='msgUpdateError' style='color: red; font-size: x-small; width:145%; display:inline-flex;'>E-mail ikke registreret i kundens navn. Dobbelttjek om e-mailen er korrekt</label></span>");
                                        }

                                    }

                                    $emailIdValidTextBox.attr('disabled', false);
                                    $webpart.find(".bindMobileValidationError").length == 0 ? $webpart.find(".sendAfterEmailIDValidation").attr('disabled', false) : '';
                                    $emailIdValidTextBox.focus();
                                },
                                errorcallback: function () {

                                    $emailIdValidTextBox.next(".emailIDValidated").remove();
                                    $emailIdValidTextBox.next(".emailValidationFailure").remove();

                                    if ($emailIdValidTextBox.next(".msgUpdateError").length == 0) // only add if not added
                                    {
                                        $emailIdValidTextBox.after("<span id='msgUpdateError' class='msgUpdateError emailValidationError' style='display:inline-flex;width:224px'><label style='width: 145%; color: red; font-size: x-small; display: inline-flex;'>Fejl under tjek af e-mail. Dobbelttjek om e-mailen er korrekt</label></span>");
                                    }
                                    $emailIdValidTextBox.attr('disabled', false);
                                    $webpart.find(".bindMobileValidationError").length == 0 ? $webpart.find(".sendAfterEmailIDValidation").attr('disabled', false) : '';
                                    $emailIdValidTextBox.focus();
                                    return false;
                                }

                            }, $emailIdValidTextBox);
                        }
                    }, 500);
                }

            });
        };

        context.clearAllEmailValidationMessage = function () {
            $('.bindEmailValidationError').remove();
            $('.emailIDValidated').remove();
            $('.emailValidationError').remove();
            $('.emailValidationFailure').remove();
        };

    })(TdcEmailIdValidator);

    $(document).ready(
        function () {
            TdcEmailIdValidator.init();
        });

})(jQuery);