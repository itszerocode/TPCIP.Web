if (TdcValidationToolBox == null || typeof (TdcValidationToolBox) != "object") {
    var TdcValidationToolBox = new Object();
}

(function ($) {

    (function (context) {
        context.init = function () {
            // ToolBox Validation to check for email
            $(document).on('keyup keydown keypress change', ".EmailValidator", function () {

                var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;

                var email = $(this).val();
                if (!pattern.test(email) && email != "") {     // Checks whether valid Email ID is in the textbox
                    $(this).addClass("invalidInput");
                    if ($(this).next(".bindEmailValidationError").length == 0) // only add if not added
                    {
                        $(this).after("<label id='emailUpdateError' class='row emailErrorClass emailUpdateError bindEmailValidationError' style='width: 275%; color: red; font-size: x-small; padding-left: 15px;'>Brug gyldig e-mail adresse (fx. xx@xx.xx)</label>");
                    }
                }
                else if (email == "") {
                    $(this).val("");
                    $(this).removeClass("invalidInput");
                    $(this).attr('placeholder', 'E-mailadresse');
                    $(this).next(".bindEmailValidationError").remove();
                }
                else {
                    $(this).removeClass("invalidInput");
                    $(this).next(".bindEmailValidationError").remove();
                }
            });

        
            // ToolBox Validation to check for only numbers
            $(document).on('keyup keydown keypress change', ".BindNumericValidator", function () {

                var regex = new RegExp();
                regex = /^[0-9]+$/;

                var txtNo = $(this).val();

                if (txtNo != '' && !regex.test(txtNo)) {
                    $(this).addClass('invalidInput');
                }

                else {
                    $(this).removeClass('invalidInput');
                }
            });


            // ToolBox Validation to check for only alphabets
            $(document).on('keyup keydown keypress change', ".BindAlphabetValidator", function () {

                var regex = new RegExp();
                regex = /^[a-zA-Z]+$/;

                var txtAlphabet = $(this).val();

                if (txtAlphabet != '' && !regex.test(txtAlphabet)) {
                    $(this).addClass('invalidInput');
                }

                else {
                    $(this).removeClass('invalidInput');
                }
            });


            // ToolBox Validation to check for alphanumeric
            $(document).on('keyup keydown keypress change', ".BindAlphanumericValidator", function () {

                var regex = new RegExp();
                regex = /^[a-zA-Z0-9]+$/;

                var txtAlphanumeric = $(this).val();

                if (txtAlphanumeric != '' && !regex.test(txtAlphanumeric)) {
                    $(this).addClass('invalidInput');
                }

                else {
                    $(this).removeClass('invalidInput');
                }
            });

            // ToolBox Validation to check for mobileNo.
            $(document).on('keyup keydown keypress click change', ".MobileNoValidator", function () {

                var pattern = /(^\+{0,1})(\d{8,12}$)/;

                var mobileNo = $(this).val();
                if (!pattern.test(mobileNo) && mobileNo != "") {     // Checks whether valid Mobile number is in the textbox
                    $(this).addClass("invalidInput");
                    if ($(this).next(".mobileValidationError").length == 0) // only add if not added
                    {
                        $(this).after(" <label id='msgUpdateError' class='row emailErrorClass msgUpdateError mobileValidationError' style='width: 275%; color: red; font-size: x-small; padding-left: 15px;'>Brug gyldigt mobilnummer (min. 8 cifre)</label>");
                    }
                }
                else if (mobileNo == "") {
                    $(this).val("");
                    $(this).removeClass("invalidInput");
                    $(this).attr('placeholder', 'Mobilenummer');
                    $(this).next(".mobileValidationError").remove();
                }
                else {
                    $(this).removeClass("invalidInput");
                    $(this).next(".mobileValidationError").remove();
                }
            });

        }

    })(TdcValidationToolBox);

    $(document).ready(
        function () {
            TdcValidationToolBox.init();
        });

})(jQuery);