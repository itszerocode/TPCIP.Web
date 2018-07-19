/// <reference path="asyncwebpartloader.js" />


// Define TdcAsyncWebPartLoader namespace.
if (TdcValidation == null || typeof (TdcValidation) != "object") {
    var TdcValidation = new Object();
}

// Workaround for IE.
if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = { log: function () { }, error: function () { } };
}

(function($) {

    (function (context) {

        context.errorInputType = {
            ipAddress: 'IpAddress',
            macAddress: 'MacAddress',
            fraPort: 'FraPort',
            tilPort: 'TilPort',
            omdirPort: 'OmdirPort',
            ssid: 'Ssid',
            name: 'Name',
            mobileNumber: 'MobileNumber',
            contactMobileNumber: 'ContactMobileNumber',
            email: 'Email',
            pin: 'Pin',
            missingData: 'MissingData',
            operationFailed: 'OperationFailed'
        };

        context.init = function () {

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                $(".check-ip-input").on("keyup", function () {
                    if (this.value.length == this.maxLength) {
                        var inputs = $(this).parent().parent().find(".check-ip-input").get().reverse();
                        $.each(inputs, function (index, value) {
                            if (value.value.length == 0) {
                                $(this).focus();
                            }
                        });
                    }
                });
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                $(".check-mac-input").on("keyup", function () {
                    if (this.value.length == this.maxLength) {
                        var inputs = $(this).parent().parent().find(".check-mac-input").get().reverse();
                        $.each(inputs, function (index, value) {
                            if (value.value.length == 0) {
                                $(this).focus();
                            }
                        });
                    }
                });
            });       

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.ipAddressInputValidationPart1');
                if ($inputs.length > 0) {
                    $inputs.ipAddressInput('part 1');
                }
                
                $inputs = $html.find('.ipAddressInputValidationPart2');
                if ($inputs.length > 0) {
                    $inputs.ipAddressInput('part 2');
                }
                
                $inputs = $html.find('.ipAddressInputValidationPart3');
                if ($inputs.length > 0) {
                    $inputs.ipAddressInput('part 3');
                }
                
                $inputs = $html.find('.ipAddressInputValidationPart4');
                if ($inputs.length > 0) {
                    $inputs.ipAddressInput('part 4');
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.ssidInputValidation');
                if ($inputs.length > 0) {
                    $inputs.ssidInput();
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.macAddressInputValidationPart1');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 1');
                }
                $inputs = $html.find('.macAddressInputValidationPart2');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 2');
                }

                $inputs = $html.find('.macAddressInputValidationPart3');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 3');
                }

                $inputs = $html.find('.macAddressInputValidationPart4');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 4');
                }
                $inputs = $html.find('.macAddressInputValidationPart5');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 5');
                }
                $inputs = $html.find('.macAddressInputValidationPart6');
                if ($inputs.length > 0) {
                    $inputs.macAddressInput('part 6');
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.fromPortInputValidation');
                if ($inputs.length > 0) {
                    $inputs.portInput(context.errorInputType.fraPort);
                }

                $inputs = $html.find('.toPortInputValidation');
                if ($inputs.length > 0) {
                    $inputs.portInput(context.errorInputType.tilPort);
                }

                $inputs = $html.find('.redirecPortInputValidation');
                if ($inputs.length > 0) {
                    $inputs.portInput(context.errorInputType.omdirPort);
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.nameInputValidation');
                if ($inputs.length > 0) {
                    $inputs.nameInput();
                }
            });
            
            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.pinkodeInputValidation');
                if ($inputs.length > 0) {
                    $inputs.pinInput();
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.mobileNumberInputValidation');
                if ($inputs.length > 0) {
                    $inputs.mobileNumberInput(context.errorInputType.mobileNumber);
                }

                $inputs = $html.find('.mobileContactNumberInputValidation');
                if ($inputs.length > 0) {
                    $inputs.mobileNumberInput(context.errorInputType.contactMobileNumber);
                }
            });

            TdcAsyncWebPartLoader.$rootElement.on('GuideToolLoaded', function (event, $html, noteId, $explanation) {
                var $inputs = $html.find('.emailInputValidation');
                if ($inputs.length > 0) {
                    $inputs.emailInput();
                }
            });
        };

        context.validateEmptyAliasInput = function ($row) {
            var $aliasInput = $row.find('.aliasInput');
            var isError = false;
            if ($aliasInput.val() == null || $aliasInput.val() == '') { $aliasInput.addClass('invalidInput'); isError = true; }
            return isError ? '' : $aliasInput.val();
        };

        context.validateEmptyIpInput = function ($row) {
            var $ipPart1 = $row.find('.ipAddressInputValidationPart1');
            var $ipPart2 = $row.find('.ipAddressInputValidationPart2');
            var $ipPart3 = $row.find('.ipAddressInputValidationPart3');
            var $ipPart4 = $row.find('.ipAddressInputValidationPart4');

            var isError = false;

            if ($ipPart1.val() == null || $ipPart1.val() == '') { $ipPart1.addClass('invalidInput'); isError = true; }
            if ($ipPart2.val() == null || $ipPart2.val() == '') { $ipPart2.addClass('invalidInput'); isError = true; }
            if ($ipPart3.val() == null || $ipPart3.val() == '') { $ipPart3.addClass('invalidInput'); isError = true; }
            if ($ipPart4.val() == null || $ipPart4.val() == '') { $ipPart4.addClass('invalidInput'); isError = true; }

            return isError ? '' : $ipPart1.val() + '.' + $ipPart2.val() + '.' + $ipPart3.val() + '.' + $ipPart4.val();
        };
        
        context.validateEmptyMacInput = function ($row) {
            var $macPart1 = $row.find('.macAddressInputValidationPart1');
            var $macPart2 = $row.find('.macAddressInputValidationPart2');
            var $macPart3 = $row.find('.macAddressInputValidationPart3');
            var $macPart4 = $row.find('.macAddressInputValidationPart4');
            var $macPart5 = $row.find('.macAddressInputValidationPart5');
            var $macPart6 = $row.find('.macAddressInputValidationPart6');

            var isError = false;

            if ($macPart1.val() == null || $macPart1.val() == '') { $macPart1.addClass('invalidInput'); isError = true; } else { $macPart1.removeClass('invalidInput'); }
            if ($macPart2.val() == null || $macPart2.val() == '') { $macPart2.addClass('invalidInput'); isError = true; } else { $macPart2.removeClass('invalidInput'); }
            if ($macPart3.val() == null || $macPart3.val() == '') { $macPart3.addClass('invalidInput'); isError = true; } else { $macPart3.removeClass('invalidInput'); }
            if ($macPart4.val() == null || $macPart4.val() == '') { $macPart4.addClass('invalidInput'); isError = true; } else { $macPart4.removeClass('invalidInput'); }
            if ($macPart5.val() == null || $macPart5.val() == '') { $macPart5.addClass('invalidInput'); isError = true; } else { $macPart5.removeClass('invalidInput'); }
            if ($macPart6.val() == null || $macPart6.val() == '') { $macPart6.addClass('invalidInput'); isError = true; } else { $macPart6.removeClass('invalidInput'); }

            return isError ? '' : $macPart1.val() + ':' + $macPart2.val() + ':' + $macPart3.val() + ':' + $macPart4.val() + ':' + $macPart5.val() + ':' + $macPart6.val();
        };

        context.addStatusMessage = function ($sender, msg, override) {
            var $messageArea = $sender.closest('div[data-subwebpart]').find('.messageArea');

            if (override) {
                $messageArea.find('.status').text('');
            }
            
            $messageArea.find('.status').append(msg);
            $messageArea.find('.successArea').show();
        };

        context.addErrorMessage = function ($sender, type, msg, override) {
            var $messageArea = $sender.closest('div[data-subwebpart]').find('.messageArea');

            if (override) {
                $messageArea.find('.error').text('');
            }
            var p = $('<p data-error="' + type + '">').text(msg);
            $messageArea.find('.error').append(p);
            $messageArea.find('.errorArea').show();
        };

        context.addErrorMessage = function ($sender, msg, override) {
            var $messageArea = $sender.closest('div[data-subwebpart]').find('.messageArea');

            if (override) {
                $messageArea.find('.error').text('');
            }

            $messageArea.find('.error').append(msg);
            $messageArea.find('.errorArea').show();
        };

        context.setIpInput = function($row, ip) {
            var ipParts = ip.split('.');
            $row.find('.ipAddressInputValidationPart1').val(ipParts[0]);
            $row.find('.ipAddressInputValidationPart2').val(ipParts[1]);
            $row.find('.ipAddressInputValidationPart3').val(ipParts[2]);
            $row.find('.ipAddressInputValidationPart4').val(ipParts[3]);
        };

    })(TdcValidation);

    $(document).ready(
        function() {
            TdcValidation.init();
        });    

    $.fn.ipAddressInput = function (part) {
        var $this = this;

        $this.blur(function () {

            var value = this.value;
            if (value == "") return;

            if (!value.match(/^25[0-5]$|^2[0-4][0-9]$|^[01]?[0-9]?[0-9]$/))
            {
                errorMessage($(this), TdcValidation.errorInputType.ipAddress + part, 'IP ' + TranslationsJs.Address + ' ' + part + ' ' + TranslationsJs.Is_not_valid + '.');
            }
        });

        $this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.ipAddress + part);
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.ipAddress);
        });
    };

    $.fn.ssidInput = function () {
        var $this = this;

        $this.attr('maxlength', '31');

        $this.blur(function () {
            if (this.value == "") return;
            var text = this.value;
            if (!text.match(/^[\w-]{0,32}$/)) {
                errorMessage($(this), TdcValidation.errorInputType.ssid, TranslationsJs.Invalid + ' SSID ' + TranslationsJs.Address + '.');
            }
        });

        $this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.ssid);
        });
    };

    $.fn.macAddressInput = function (part) { // 00-1D-D8-B8-31-47

        this.blur(function () {
            if (this.value == '') return;
            var text = this.value;
            if (!text.match(/^[0-9A-Fa-f]{2}$/)) {
                errorMessage($(this), TdcValidation.errorInputType.macAddress + part, TranslationsJs.Invalid + ' MAC ' + TranslationsJs.Address + ' ' + part + '.');
            }
        });

        this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.macAddress + part);
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.macAddress);
        });
        
    };

    $.fn.portInput = function (type) { // 1 - 65535
        this.attr('maxlength', '5');

        this.blur(function () {
            if (this.value == "") return;

            if (this.value.match(/^[1-9][0-9]{0,4}$/)) {
                var port = parseInt(this.value, 10);
                if (port <= 0 || port > 65535) {
                    errorMessage($(this), type, type + ' ' + TranslationsJs.Must_be_a_number_between_1_65535 + ' .');
                }
            } else {
                errorMessage($(this), type, type + ' ' + TranslationsJs.Must_be_a_number_between_1_65535 + ' .');
            }
        });

        this.focus(function () {
            removeMessagesOnFocus($(this), type);
        });
    };

    $.fn.nameInput = function () {

        this.blur(function () {
            if (this.value == "") return;
            var name = this.value;
            var $globalThis = $(this);
            $(this).closest(".table").find(".existingRule .name").each(function () {
                if (this.innerText == name) {
                    errorMessage($globalThis, TdcValidation.errorInputType.name, TranslationsJs.Entered_alias_already_exists);
                    return false;
                }
            });
        });


        this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.name);
        });
    };

    $.fn.mobileNumberInput = function (type) {
        var $this = this;
        $this.attr('maxlength', '8');

        this.blur(function () {
            if (this.value == '' || $this.val() == $this.attr('placeholder')) return;
            if (!this.value.match(/^[0-9]{8}$/)) {
                errorMessage($this, type, TranslationsJs.Invalid + ' ' + TranslationsJs.Mobile_number + '.');
            }
        });

        this.focus(function () {
            removeMessagesOnFocus($(this), type);
        });
    };

    $.fn.emailInput = function () {

        this.blur(function () {
            if (this.value == "") return;
            if (!this.value.match(/^[0-9a-zA-Z]([\+\-_\.][0-9a-zA-Z]+)*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]*\.)+[a-zA-Z0-9]{2,17}$/)) {
                errorMessage($(this), TdcValidation.errorInputType.email, TranslationsJs.Invalid + ' email.');
            }
        });

        this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.email);
        });
    };
    
    $.fn.pinInput = function () {
        var $this = this;

        $this.attr('maxlength', '4');
        var $set = $this.closest('.tool').find('.set_to_hide');
        $set.hide();


        $this.keyup(function () {
            if (this.value == "") {
                $this.addClass('invalidInput');
                $set.hide();
                return;
            }
            var text = this.value;
            if (!text.match(/^[0-9]{4}$/) ) {
                errorMessage($(this), TdcValidation.errorInputType.pin, TranslationsJs.Invalid + ' pin.');
                $set.hide();

            } else if ("0123456789".indexOf(text) > -1 || "9876543210".indexOf(text) > -1) {
                errorMessage($(this), TdcValidation.errorInputType.pin, TranslationsJs.Invalid + ' pin.');
                $set.hide();

            } else {
                $this.removeClass('invalidInput');
                $set.show();
            }
        });

        $this.blur(function () {
            if (this.value == "") {
                $this.addClass('invalidInput');
                $set.hide();
                return;
            }
        });

        $this.focus(function () {
            removeMessagesOnFocus($(this), TdcValidation.errorInputType.pin);
        });
    };

    function removeMessagesOnFocus ($this, data) {
        var $messageArea = $this.closest("div[data-subwebpart]").find('.messageArea');
        
        $messageArea.find('.status').text('');
        $messageArea.find('.successArea').hide();
        $messageArea.find('.error [data-error="' + TdcValidation.errorInputType.missingData + '"]').remove();
        $messageArea.find('.error [data-error="' + TdcValidation.errorInputType.operationFailed + '"]').remove();
        $messageArea.find('.error [data-error="' + data + '"]').remove();
        $this.removeClass('invalidInput');
        if ($messageArea.find('.error [data-error]').length == 0) $messageArea.find('.errorArea').hide();
    }
    
    function errorMessage ($this, data, message) {
        $this.addClass('invalidInput');
        var msg = $('<p data-error="' + data + '">').text(message);
        $this.closest('div[data-subwebpart]').find('.messageArea .error').append(msg);
        $this.closest('div[data-subwebpart]').find('.errorArea').show();
    }
    
})(jQuery);