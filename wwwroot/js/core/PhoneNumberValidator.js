if (TdcPhoneNumberValidator == null || typeof (TdcPhoneNumberValidator) != "object") {
    var TdcPhoneNumberValidator = new Object();
}

(function ($) {

    (function (context) {

        

        context.init = function () {

            $(document).on('keyup', ".BindMobileNoValidator", function () {

                context.PermissionsList = [];
                context.MobileNumbersOverVw = [];
                context.PermissionsNumbersList = [];
                var validateCallBack="";
                var $phoneNumberValidTextBox = $(this);
                var errorid=$phoneNumberValidTextBox.data("errorid");
                var toolJsObjRef="";
                var toolJsFunction = "";
                $('.bindMobileValidationError').remove();
                $('.phoneNumberValidated').remove();
                $('.validationError').remove();

                var $webpart = TdcAsyncWebPartLoader.getTool($phoneNumberValidTextBox);

                if ($webpart.length == 0) {
                    var $webpart = $phoneNumberValidTextBox.parents(".modal-body");
                }

                var customerName = $("#Customer_Name").text();

                if ($phoneNumberValidTextBox.data('validationcallback') != undefined) {
                    toolJsObjRef = $phoneNumberValidTextBox.data('validationcallback').substring(0, $phoneNumberValidTextBox.data('validationcallback').indexOf("."));
                    toolJsFunction = $phoneNumberValidTextBox.data('validationcallback').substring($phoneNumberValidTextBox.data('validationcallback').indexOf(".") + 1);
                    validateCallBack = window[toolJsObjRef][toolJsFunction];
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
                context.MobileNumbersOverVw = ToolCustomerOverview.MobileNumberListCustOvrVw;
                if (context.MobileNumbersOverVw == null || context.MobileNumbersOverVw == undefined) {
                    context.MobileNumbersOverVw = [];
                    context.MobileNumbersOverVw.push("");
                }

                var pattern = /(^\+{0,1})(\d{8,12}$)/;
                var mobileNo = $(this).val();

                
                if (mobileNo == "") {
                    $(this).val("");
                    $(this).removeClass("invalidInput");
                    $(this).next(".bindMobileValidationError").remove();
                    $(this).next(".phoneNumberValidated").remove();
                    $(this).next(".validationError").remove();
                    $webpart.find(".sendAfterValidation").attr('disabled', false);

                    if (validateCallBack != undefined && validateCallBack != null && validateCallBack != "") {
                        window[toolJsObjRef][toolJsFunction]($phoneNumberValidTextBox);
                    }
                }
                else if (mobileNo != ""  && !pattern.test(mobileNo) ) {     // Checks whether valid Mobile number is in the textbox
                    $(this).addClass("invalidInput");
                    $(this).next(".phoneNumberValidated").remove();
                    $(this).next(".validationError").remove();
                    $webpart.find(".sendAfterValidation").attr('disabled', true);

                    if (errorid != null && errorid != undefined && errorid != "") {
                        $webpart.find("#" + errorid).length === 1 ? $webpart.find("#" + errorid).html('') : '';
                    }

                    if($(this).next(".bindMobileValidationError").length == 0) // only add if not added
                    {
                        $(this).after(" <label id='msgUpdateError' class='row emailErrorClass msgUpdateError bindMobileValidationError' style='color: red; font-size: x-small; padding-left: 15px; width:145%'>Brug gyldigt telefonnummer (min. 8 cifre)</label>");
                    }
                    else if ($webpart.find(".msgUpdateError").html() === '') {
                        $webpart.find(".msgUpdateError").html('Brug gyldigt telefonnummer (min. 8 cifre)');
                    }


                }

                else {
                    $(this).removeClass("invalidInput");
                    $(this).next(".bindMobileValidationError").remove();
                    $(this).attr('disabled', true);
                    $webpart.find(".sendAfterValidation").attr('disabled', true);

                    if (context.MobileNumbersOverVw.indexOf(mobileNo) != "-1" || context.PermissionsNumbersList.indexOf(mobileNo) != "-1") {
                        $phoneNumberValidTextBox.next(".validationError").remove();
                        if ($(this).next(".phoneNumberValidated").length == 0) {
                            $(this).after("<span class='phoneNumberValidated' style='display:inline-flex; width:203px;'> <label class='glyphicon glyphicon-ok' style='color: #0b8e5f;  font-size: x-small; display:inline-flex; width:15px;'></label> <label id='validatedMessage' style='color: #0b8e5f; font-size: x-small; display:inline-flex; width:181px'>Nummer registreret i kundens navn</label></span>");
                        }
                        if ($webpart.find(".phoneNumberValidated").length === 1) {
                            if (errorid != null && errorid != undefined && errorid != "")
                            $webpart.find("#" + errorid).html('');
                        }
                        $(this).attr('disabled', false);
                        $webpart.find(".bindEmailValidationError").length == 0 ? $webpart.find(".sendAfterValidation").attr('disabled', false) : '';
                        if (validateCallBack != undefined && validateCallBack != null && validateCallBack != "") {
                            validateCallBack();
                        }
                        $(this).focus();
                    }
                    else {
                        TdcAsyncWebPartLoader.DoAction({
                            toolname: 'PhoneNumberValidator',
                            action: 'phoneNumberValidation',
                            messageProcess: 'Tjekker nummeret',
                            messageSuccess: "",
                            messageError: "",
                            isloadingIcon: true,
                            customClass: "validateProcessMessage",
                            context: {
                                customerId: TdcCustomerInformation.getSelectedCustomerId(),
                                mobileNumber: mobileNo,
                                customerName: customerName,
                            },
                            callback: function (response) {
                                var resultObtained = response;
                                if (resultObtained == "True") {
                                    $phoneNumberValidTextBox.next(".validationError").remove();
                                    if ($phoneNumberValidTextBox.next(".phoneNumberValidated").length == 0) {
                                        $phoneNumberValidTextBox.after("<span class='phoneNumberValidated' style='display:inline-flex; width:203px'> <label class='glyphicon glyphicon-ok' style='color: #0b8e5f;  font-size: x-small; display:inline-flex; width:15px'></label> <label id='validatedMessage' style='color: #0b8e5f; font-size: x-small; display:inline-flex; width:181px'>Nummer registreret i kundens navn</label></span>");
                                    }

                                    if ($webpart.find(".phoneNumberValidated").length === 1) {
                                        if (errorid != null && errorid != undefined && errorid != "")
                                        $webpart.find("#" + errorid).html('');
                                    }
                                    if (validateCallBack != undefined && validateCallBack != null && validateCallBack != "") {
                                        window[toolJsObjRef][toolJsFunction]($phoneNumberValidTextBox);
                                    }
                                }
                                else {
                                    $phoneNumberValidTextBox.next(".phoneNumberValidated").remove();
                                    if ($phoneNumberValidTextBox.next(".validationError").length == 0) // only add if not added
                                    {
                                        $webpart.find("#" + errorid).length === 1 ? $webpart.find("#" + errorid).hide() : '';
                                        $phoneNumberValidTextBox.after("<span class='msgUpdateError validationError validationFailure' style='display:inline-flex;width:224px'> <label class='glyphicon glyphicon-remove' style='color: red; font-size: x-small; display:inline-flex; width:15px;'></label> <label id='msgUpdateError' style='color: red; font-size: x-small; display:inline-flex; width:145%'>Nummer ikke registreret i kundens navn. Dobbelttjek om nummeret er korrekt</label></span>");
                                    }
                                    
                                }

                                $phoneNumberValidTextBox.attr('disabled', false);
                                $webpart.find(".bindEmailValidationError").length == 0 ? $webpart.find(".sendAfterValidation").attr('disabled', false) : '';
                                $phoneNumberValidTextBox.focus();
                            },
                            errorcallback: function () {

                                $phoneNumberValidTextBox.next(".phoneNumberValidated").remove();
                                $phoneNumberValidTextBox.next(".validationFailure").remove();

                                if ($phoneNumberValidTextBox.next(".msgUpdateError").length == 0) // only add if not added
                                {
                                    $phoneNumberValidTextBox.after(" <span id='msgUpdateError' class='msgUpdateError validationError' style='display:inline-flex;width:224px'><label style='color: red; font-size: x-small; display:inline-flex;width: 145%'>Fejl under tjek af nummer. Dobbelttjek om nummeret er korrekt</label></span>");
                                }
                                $phoneNumberValidTextBox.attr('disabled', false);
                                $webpart.find(".bindEmailValidationError").length == 0 ? $webpart.find(".sendAfterValidation").attr('disabled', false) : '';
                                $phoneNumberValidTextBox.focus();
                                return false;
                            }

                        }, $phoneNumberValidTextBox);
                    }

                }

            });
        };

        context.clearAllPhoneValidationMessage = function () {
            $('.bindMobileValidationError').remove();
            $('.phoneNumberValidated').remove();
            $('.validationError').remove();
            $('.validationFailure').remove();
        };

    })(TdcPhoneNumberValidator);

    $(document).ready(
        function () {
            TdcPhoneNumberValidator.init();
        });

})(jQuery);