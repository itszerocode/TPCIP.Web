/// <reference path="../guidemanager.js" />
/// <reference path="../utils.js" />
/// <reference path="~/Layouts/TPCIP.Web/Scripts/_references.js" />
/// <reference path="../ui.js" />


if (TdcCustomerInformation == null || typeof (TdcCustomerInformation) != "object") {
    var TdcCustomerInformation = new Object();
}

(function ($) {
    (function (context) {
        var toolname = "CustomerInformation";
        var $placeholder;
        var $ddlCustomers;
        var $ddlCustomersFakeContainer;
        var $ddlCustomersFakeFakeList;
        var $selectedCustomerFakeField;
        var $ddlToggleButton;
        context.BierInstallationId = "";
        context.BierOrderId = "";
        context.OrderType = "";
        context.JobKode = "";
        context.OrdreTypeID = "";
        context.installationSeqNo = "";
        context.subCustomersDetails = undefined;
        context.customerTvSik = undefined;
        context.AmsId = "";
        context.AreaId = "";
        context.AnleagId = "";
        context.UserId = "";
        context.ToolLinkCustomerId = "";
        context.NoCustomerFound = false;
        context.NoCustomerFoundWithAddress = false;
        context.foundInWholesale = "False";// Added for New FAS SMS tool
        context.parentSegment = ""; // Added for New FAS SMS tool
        context.PortalSection_CustomerType = ""; // added for tool links
        context.ToolCustomerIDFSM = "";
        context.ToolCustomerTaskIDFSM = "";
        context.AddLookupInstallationSeqNo = "";
        context.ColumbusCustomerNumber = "";
        context.Permission = "";
        context.showDriftsPermissions = false;
        context.isInActiveLid = false;
        context.PermissionName = "";

        context.getSelectedCustomerId = function () {
            var customerId = $placeholder.attr('data-customerid');
            return customerId;
        };
        function setCustomerId(value) {
            if (value) $placeholder.attr('data-customerid', value);
            else $placeholder.removeAttr('data-customerid');
        }
        context.escBtnClicked = false;
        context.deleteNoteTextBtnClicked = false;


        context.init = function () {

            $placeholder = TdcAsyncWebPartLoader.getToolPlaceholder(toolname);

            TdcAsyncWebPartLoader.$rootElement.on('click.customerInfoDropdown', function () {
                if ($ddlCustomersFakeContainer && $ddlCustomersFakeContainer.hasClass('open')) {
                    $ddlToggleButton.dropdown('toggle');
                }
            });

            $placeholder.on('mousedown', '.deleteIcon', function (e) {
                context.deleteNoteTextBtnClicked = true;
                var obsNoteTextValue = $placeholder.find("#obsNoteTextBox").val();
                if (obsNoteTextValue.trim().length > 0) {
                    $placeholder.find("#obsNoteTextBox").val("");
                }
                $placeholder.find("#obsNoteText").focus();
            });
        };

        context.obsNoteBlur = function (sender, e) {
            if (context.escBtnClicked == true || context.deleteNoteTextBtnClicked == true) {
                context.escBtnClicked = false;
                context.deleteNoteTextBtnClicked = false;
                $placeholder.find('#obsNoteTextBox').focus();
                return false;
            }
            else {
                $placeholder.find('#obsNoteLabel').attr('disabled', 'disabled');
                $placeholder.find('#obsNoteText').attr('disabled', 'disabled');
                var sender = $placeholder.find('#obsNoteText');
                context.saveOBSNote(sender);
            }
        };

        context.enterKeyPressed = function (sender, e) {
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var obsNoteLabel = $webpart.find('#obsNoteLabel');
            var obsNoteTextBox = $webpart.find('#obsNoteTextBox');
            var deleteIcon = $webpart.find('#trashIcon');
            if (e.keyCode == 13) {
                $(obsNoteLabel).attr('disabled', 'disabled');
                $(obsNoteTextBox).attr('disabled', 'disabled');
                $(deleteIcon).attr('disabled', 'disabled');
                context.saveOBSNote(sender);
            }
        }

        context.escapeKeyPressed = function (sender, e) {
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var obsNoteLabel = $webpart.find('#obsNoteLabel');
            var obsNoteTextDiv = $webpart.find('#obsNoteText');
            if (e.keyCode == 27) {
                context.escBtnClicked = true;
                $(obsNoteLabel).css('display', 'block');
                $(obsNoteTextDiv).css('display', 'none');
            }
        }

        context.saveOBSNote = function (sender) {
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var obsNoteTextDiv = $webpart.find('#obsNoteText');
            var obsNoteTextField = $webpart.find('#obsNoteTextBox');
            var deleteIcon = $webpart.find('#trashIcon');
            var obsNoteTextValue = $(obsNoteTextField).val();
            var obsNotelabel = $webpart.find('#obsNoteLabel');
            var obsNoteDetails = $webpart.find('#obsNoteLastUpdatedDetails');
            var obsOldNote = $(obsNotelabel).attr("data-oldNote");
            $(obsNoteDetails).css('display', 'block');
            var obsHeading = $webpart.find('.obsNotes .obsHeading');

            if (($(obsNotelabel).text() == "Brug dette felt til at beskrive forhold om kunden som dine kollegaer bør kende til." && obsNoteTextValue.trim().length == 0) || $(obsNoteTextField).val().trim() == $(obsNotelabel).attr('data-oldNote').trim()) {
                if (obsNoteTextValue.trim().length == 0) { $(obsNoteDetails).text(''); }
                //else { $(obsNoteDetails).css('display', 'block'); }

                $(obsNotelabel).css('display', 'block');
                $(obsNoteTextDiv).css('display', 'none');
                $(obsNotelabel).removeAttr("disabled");
                $(obsNoteTextField).removeAttr("disabled");
                $(deleteIcon).removeAttr("disabled");
            }
            else {
                TdcAsyncWebPartLoader.DoAction({
                    toolname: 'Note',
                    action: 'SaveOBSNote',
                    context: {
                        customerId: TdcCustomerInformation.getSelectedCustomerId(),
                        noteText: obsNoteTextValue,
                        parentAccountNo: TdcCustomerInformation.getSelectedCustomerAccountNo(),
                        svarsted: TdcReceiveCall.svarsted,
                        contextId: TdcReceiveCall.contextId,
                        selectedSectionName: $('.navbar-collapse').find("[data-portalsectionname='" + TdcMain.portalSection + "']")[0].innerText,
                        additionalValues: $(TdcTabManager.$getTabs()).filter(".active").data('tab-additionalvalues'),
                        departmentName: TdcMain.UserDepartment,
                        noteType: "ObsRemark",
                    },
                    callback: function (data) {
                        if (obsNoteTextValue.trim().length > 0 && obsNoteText != ' ') {
                            $(obsNotelabel).text(obsNoteTextValue);
                            $(obsNotelabel).attr('data-oldNote', $(obsNotelabel).text());
                            $(obsNoteDetails).text(data.DisplayDate + ' ' + data.UserName + ', ' + data.UserId);
                            $(obsHeading).css('font-weight', 'bold');
                            $(obsNotelabel).css('font-style', 'normal');
                            $(obsNotelabel).css('font-size', '0.8em');
                        } else {
                            $(obsNotelabel).text("Brug dette felt til at beskrive forhold om kunden som dine kollegaer bør kende til.");
                            $(obsNotelabel).attr('data-oldNote', "Brug dette felt til at beskrive forhold om kunden som dine kollegaer bør kende til.");
                            //$(obsNoteDetails).css('display', 'none');
                            $(obsNoteDetails).text('');
                            $(obsHeading).css('font-weight', 'normal');
                            $(obsNotelabel).css('font-style', 'italic');
                            $(obsNotelabel).css('font-size', '0.7em');
                        }
                        $(obsNotelabel).css('display', 'block');
                        $(obsNoteTextDiv).css('display', 'none');
                        $(obsNotelabel).removeAttr("disabled");
                        $(obsNoteTextField).removeAttr("disabled");
                        $(deleteIcon).removeAttr("disabled");
                    },
                    errorcallback: function () {
                        var noteText = $(obsNoteDetails).attr('data-oldNote');
                        $(obsNotelabel).text(noteText);
                        $(obsNotelabel).css('display', 'block');
                        $(obsNoteTextDiv).css('display', 'none');
                        $(obsNotelabel).removeAttr("disabled");
                        $(obsNoteTextField).removeAttr("disabled");
                        $(deleteIcon).removeAttr("disabled");
                    },
                    messageError: TranslationsJs.Save_note_failed,
                    messageProcess: TranslationsJs.SavingNote,
                    messageSuccess: TranslationsJs.SaveNoteSuccess,
                }, sender);
            }
        }

        context.editObsNote = function (sender) {
            if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.CIP)
                return;

            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            if ($(sender).hasClass('obsNoteLabel')) {
                $webpart.find('#obsNoteTextBox').val($webpart.find('#obsNoteLabel').text());
            }
            if ($(sender).text().toLowerCase() == "brug dette felt til at beskrive forhold om kunden som dine kollegaer bør kende til.") {
                $webpart.find('#obsNoteTextBox').val("");
            }
            $webpart.find('#obsNoteText').css('display', 'block');
            $webpart.find('#obsNoteText').removeAttr("disabled");
            $webpart.find('#obsNoteTextBox').focus();
            $webpart.find('#obsNoteTextBox').select();
            $webpart.find('#obsNoteLabel').css('display', 'none');
        }

        context.getSelectedCustomerAccountNo = function () {
            return $('#CustomerInformationDetails_AccountId').text();
        };

        context.setSelectedCustomerAccountNo = function (accountNo) {
            return $('#CustomerInformationDetails_AccountId').text(accountNo);
        };

        context.getSubCustomerIds = function () {
            return TdcAsyncWebPartLoader.getToolByName(toolname).attr('data-subcustomerid');
        };

        context.hasCustomer = function () {
            return (context.getSelectedCustomerId() != '' && context.getSelectedCustomerId() != null);
        };

        context.loadCustomer = function (customerId, callback, makeAsyncCall, receivedCallPortalSection, activateGAASelector) {
           
            var updateValidCILid = TdcReceiveCall.ReceivedInValidLid;//Initially receive next call returned invlaid lid, so update the lid that was searched 
            TdcReceiveCall.ReceivedInValidLid = false;//Reset the variable to avoid update of any future customer lookups

            if (customerId != "00011000") {
            TdcCustomerInformation.ToolLinkCustomerId = customerId;
            }

            var curPortalSection = receivedCallPortalSection == undefined || receivedCallPortalSection == "" ? $('.navbar-collapse').find('.aktiveTabCustom').data('portalsectionname') : receivedCallPortalSection;
            TdcMain.portalSection = curPortalSection;
            

            TdcMyOrder.IdentifyCustomerType(customerId);// added for toollinks
           
            if (typeof makeAsyncCall === 'undefined') {
                makeAsyncCall = false;
            };
            var deferred = $.Deferred();

            setCustomerId(customerId);
            if (callback) callback();

            TdcAsyncWebPartLoader.ShowTool({
                toolname: toolname,
                context: {
                    customerId: customerId,
                    makeAsyncCall: makeAsyncCall,
                    updateCILid: updateValidCILid,
                },
                callback: function () {
                   
                    TdcAsyncWebPartLoader.getToolByName(toolname).data('firstrequestdata').context.makeAsyncCall = false;
                    initComboboxWithCustomers();

                    if (context.hasCustomer()) {
                        loadRelatedWebparts(customerId);
                        $('.navbar-collapse').find('.aktiveTabCustom').removeClass('aktiveTabCustom');
                        $('.navbar-collapse').find("[data-portalsectionname='" + TdcMain.portalSection + "']").addClass('aktiveTabCustom');

                        if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP && TdcCustomerInformation.ToolCustomerTaskIDFSM != "") {
                            TdcMyOrder.CheckAdditionalparameters();
                        }

                        TdcMain.loadPortalSectionTool(customerId, undefined, undefined, activateGAASelector);

                        TdcCustomerInformation.UserId = TdcAsyncWebPartLoader.getToolByName(toolname).attr('data-userid');
                        refreshBrowserShowConfirmationPopup();

                        var receiveCallLid = TdcReceiveCall.receivedCallCustomerId;

                        var retailUserId = $('#cip_content_container #cip_content').attr("data-retailUserId");
                        if (retailUserId != undefined && retailUserId != "") {
                            saveReatilCustomerNote();
                        }
                        TdcMain.UserDepartment = $('#cip_content_container #cip_content').attr("data-departmentName");
                    }

                    $('#CustomerInformationDetails_BierInstallationID').html(TdcCustomerInformation.BierInstallationId);
                    $('#CustomerInformationDetails_BierOrderID').html(TdcCustomerInformation.BierOrderId);

                    if (typeof (TdcCustomerInformation.OrderType) != "undefined") {

                        if ((TdcCustomerInformation.OrderType).indexOf("BIERPO") >= 0 || (TdcCustomerInformation.OrderType).indexOf("BIERTT") >= 0) {
                            $('#tr_CustomerInformationDetails_BierOrderID').show();
                            $('#tr_CustomerInformationDetails_BierInstallationID').show();
                        }
                        else {
                            $('#tr_CustomerInformationDetails_BierOrderID').hide();
                            $('#tr_CustomerInformationDetails_BierInstallationID').hide();
                        }
                    }

                    if (TdcAsyncWebPartLoader.getToolByName(toolname).attr('data-lookupaccountsubscriptions').toLowerCase() == 'true') {
                        $ddlCustomersFakeContainer.show();
                        context.LoadCustomerDropDown();
                    } else {
                        $ddlCustomersFakeContainer.hide();
                    }
                    deferred.resolve(true);
                },
                errorcallback: function () {
                   
                    if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP)// && TdcCustomerInformation.ToolCustomerTaskIDFSM != "" 
                    {
                        $('.navbar-collapse').find('.aktiveTabCustom').removeClass('aktiveTabCustom');
                        $('.navbar-collapse').find("[data-portalsectionname='" + curPortalSection + "']").addClass('aktiveTabCustom');
                        TdcMyOrder.CheckAdditionalparameters();
                        TdcMain.loadPortalSectionTool(customerId, undefined, undefined, activateGAASelector);
                        deferred.resolve(true);
                    }
                    else {
                        deferred.reject();
                    }
                }
            });
            return deferred.promise();
        }

        context.loadEmptyCustomer = function (customerId) {
            TdcCustomerInformation.NoCustomerFound = true;
            TdcAsyncWebPartLoader.ShowTool({
                toolname: toolname,
                action: "LoadEmptyCustomer",
                context: {
                    customerId: customerId,

                },
                callback: function () {
                    initComboboxWithCustomers();
                    setCustomerId(customerId);
                    loadRelatedWebparts(customerId);
                    TdcMain.loadPortalSectionTool(customerId, undefined, undefined, true);
                },
            });
        }

        context.loadEmptyCustomerWithAddress = function (postalCode, postalDistrict, streetName, houseNo, floor, side, municipalityCode, streetCode) {
            TdcCustomerInformation.NoCustomerFoundWithAddress = true;
            TdcAsyncWebPartLoader.ShowTool({
                toolname: toolname,
                action: "LoadEmptyCustomerWithAddress",
                context: {
                    postalCode: postalCode,
                    postalDistrict: postalDistrict,
                    streetName: streetName,
                    houseNo: houseNo,
                    floor: floor,
                    side: side,
                    municipalityCode: municipalityCode,
                    streetCode: streetCode
                },
                callback: function () {
                    initComboboxWithCustomers();
                    $("#CustomerInformation_placeholder").find(".customerInformationDetailsTable").find('tr').not("#tr_address").hide();
                    //setCustomerId(customerId);
                    //loadRelatedWebparts(customerId);
                },
            });
        }

        context.unloadCustomer = function () {
            $("ul.navbar-nav-global .Filmkredittering").remove();
            setCustomerId(null);
            $placeholder.children().remove();
            TdcCustomerInformation.NoCustomerFound = false;
            TdcMain.atleastOneNoteSaved = false;
            TdcMain.goToDashboard = false;
            //we need to unbind this event when dashboard clicked or user comes to dashboard, other wise there will be popup on Dashboard aswell.
            window.onbeforeunload = null;
            TdcCustomerInformation.isInActiveLid = false;
        }

        function loadRelatedWebparts(customerId) {

            if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.WSP) {

                TdcAsyncWebPartLoader.$rootElement.on(TdcAsyncWebPartLoader.toolLoadedEventName, function (event, $html) {
                    if (TdcCustomerInformation.NoCustomerFound == true) {
                        if ($html.find("#parkedList").length > 0) {
                            TdcAsyncWebPartLoader.getToolPlaceholder('ParkedGuides').find("#parkedList #resumeGuide").css("disable", "disable").addClass("disabled");
                            TdcAsyncWebPartLoader.getToolPlaceholder('ParkedGuides').find(".OwnerMessage #resumeGuide").css("disable", "disable").addClass("disabled");
                        }
                        else if ($html.find(".CustomerHistoryInformationGuideName").length > 0) {
                            $("#CustomerHistoryInformation_placeholder").find(".CustomerHistoryInformationGuideName").css("disable", "disable").addClass("disabled");//.removeAttr("onclick")
                        }
                    }
                });

                TdcAsyncWebPartLoader.$rootElement.on(TdcAsyncWebPartLoader.PageChangedEventName, function (event, $html) {
                    if (TdcCustomerInformation.NoCustomerFound == true) {
                        TdcAsyncWebPartLoader.getToolPlaceholder('CustomerClosedCases').off('click');
                        TdcAsyncWebPartLoader.getToolPlaceholder('CustomerOpenCases').off('click');
                    }
                });

            }
        };

        context.LoadCustomerDropDown = function () {
            $ddlCustomersFakeFakeList.append('<li><img src="/_Layouts/Images/TPCIP.Web/GAASelector/loading.gif" alt="loading" />' + TranslationsJs.LoadingAdditionalCustomers + '</li>');

            TdcAsyncWebPartLoader.DoAction({
                toolname: 'CustomerInformation',
                action: 'GetListOfCustomerAccounts',
                context: {
                    customerId: context.getSelectedCustomerId()
                },
                callback: function (response) {
                    var $dllCustomer = $(".ddlCustomers");
                    var selected = $dllCustomer.find('option:selected');
                    $dllCustomer.empty();
                    $.each(response, function (index, value) {
                        if (selected.val() == value.Value) {
                            $dllCustomer.append('<option selected=\'selected\' value=' + value.Value + '>' + value.Text + '</option>');
                        } else {
                            $dllCustomer.append('<option value=' + value.Value + '>' + value.Text + '</option>');
                        }
                    });
                    initComboboxWithCustomers();
                },
                errorcallback: function (jqXhr) {
                    initComboboxWithCustomers();
                    TdcUI.createMessage(TranslationsJs.Customer_Search_For_Accounts_Failed, TdcUI.messageOptions.error, jqXhr.responseText, false, $(".custInfo"));
                },
            });
        };

        context.parkGuidesOnCustomerChange = function (sender) {
            var customerId = $(sender).closest('.modal').data('customerid');
            TdcGuideManager.parkOpenedGuides();
            context.changeCustomer(customerId);
        };

        context.changeCustomer = function (customerId) {
            setCustomerId(customerId);

            TdcAsyncWebPartLoader.DoAction({
                toolname: 'CustomerInformation',
                action: 'ListOfMobileNumbers',
                context: {
                    customerId: customerId
                },
                callback: function (response) {
                    var customerInformationDetails = $(".CustomerInformationDetailsWp");
                    customerInformationDetails.attr('data-subcustomerid', response);
                },
            });

            TdcAsyncWebPartLoader.ShowTool({
                toolname: 'CustomerInformationDetails',
                action: 'SelectCustomer',
                context: {
                    customerId: customerId
                }
                , callback: function () {                                  // Added for restance MIO 66740: add/remove class invalidinput on drop down change.
                    if ($('.custInfoDetails .statustext').hasClass('color-danger')) {
                        $('.CustomerInformationDetailsWp').addClass('invalidInput');
                    }
                    else {
                        $('.CustomerInformationDetailsWp').removeClass('invalidInput');
                    }
                },
            });

            loadRelatedWebparts(customerId);
            //vaibhav : driftsInfo : calling loadPortalSectionTool() when changing customer(means lid) in customer Information webpart.
            TdcMain.loadPortalSectionTool(customerId, '');


            $ddlCustomers.find('option').removeAttr('selected');
            var $optionWithCustomer = $ddlCustomers.find('option[value="' + customerId + '"]');
            $optionWithCustomer.attr('selected', 'selected');

            var customerName = $optionWithCustomer.text();
            $selectedCustomerFakeField.val(customerName);

            $ddlCustomersFakeContainer.find('li').removeClass('active');
            $ddlCustomersFakeContainer.find('li[data-value=' + customerId + ']').addClass('active');
        };

        function initComboboxWithCustomers() {

            $ddlCustomers = $placeholder.find('.ddlCustomers');
            $ddlCustomersFakeContainer = $placeholder.find('.dropdown');
            $ddlCustomersFakeFakeList = $ddlCustomersFakeContainer.children('.dropdown-menu');
            $ddlToggleButton = $ddlCustomersFakeContainer.children('.dropdown-toggle');
            $selectedCustomerFakeField = $ddlCustomersFakeContainer.children('input');

            $ddlCustomersFakeFakeList.children('li').remove();

            transformSelectToCombobox();
            $ddlToggleButton.dropdown();
        }

        function transformSelectToCombobox() {

            $ddlCustomers.hide();

            $selectedCustomerFakeField
                .val($ddlCustomers.children(':selected').text())
                .keyup(function (e) {
                    $ddlCustomersFakeContainer.addClass('open');
                    if (e.keyCode == 40) {
                        $ddlCustomersFakeFakeList.children('li:not(.hidden)').first().find('a').focus();
                        return false;
                    }
                    if (e.keyCode == 38) {
                        $ddlCustomersFakeFakeList.children('li:not(.hidden)').last().find('a').focus();
                        return false;
                    }

                    var term = TdcUtils.removeAccents($(this).val());
                    var matcher = new RegExp(term, "i");

                    $ddlCustomersFakeFakeList.children('li').each(function () {
                        var v = TdcUtils.removeAccents($(this).children('a').text());
                        if (!matcher.test(v)) {
                            $(this).addClass('hidden');
                        } else {
                            $(this).removeClass('hidden');
                        }
                    });
                });

            $ddlCustomers.find('option').each(function () {
                var $this = $(this);

                var $fakeOption = $('<li data-value="' + $this.val() + '"><a href="#">' + $this.text() + '</a></li>');
                $fakeOption.data('value', $this.val());

                if (context.getSelectedCustomerId() == $this.val()) {
                    $fakeOption.addClass('active');
                }

                $ddlCustomersFakeFakeList.append($fakeOption);

                $fakeOption.click(function (e) {
                    var $selectedFakeOption = $(this);

                    if (!$selectedFakeOption.hasClass('active')) {
                        var customerId = $selectedFakeOption.data('value');

                        if (TdcGuideManager.$getActiveGuideTabs().length == 0) {
                            context.changeCustomer(customerId);
                        } else {
                            $('#PopupOpenedGuidesWillBeParked').data('customerid', customerId).modal();
                        }
                    }
                });
            });

            $selectedCustomerFakeField.closest('form').submit(function (e) {
                e.preventDefault();
            });
        }

        context.getLinkParameters = function (customerId) {
            TdcCustomerInformation.UserId = TdcAsyncWebPartLoader.getToolByName(toolname).attr('data-userid');
            //TdcCustomerInformation.ToolLinkCustomerId = context.getSelectedCustomerId();
            //TdcAsyncWebPartLoader.DoAction({
            //    toolname: 'CustomerInformation',
            //    action: 'GetLinkParameters',
            //    context: {
            //        customerId: customerId,
            //        accountNumber: TdcCustomerInformation.getSelectedCustomerAccountNo()
            //    },
            //    callback: function (data) {
            //        //TdcCustomerInformation.AmsId = data.AmsId;
            //        //TdcCustomerInformation.AnleagId = data.AnalagNumber;
            //        //TdcCustomerInformation.AreaId = data.HFId;
            //    }
            //});
        }

        function refreshBrowserShowConfirmationPopup() {
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {
                TdcCustomerInformation.UserId = TdcAsyncWebPartLoader.getToolByName(toolname).attr('data-userid');
                if (TdcCustomerInformation.UserId == "r24187" || TdcCustomerInformation.UserId.toUpperCase().trim() == "HPOMOPERATOR") {
                    return ' ';//25Jan17 : Don't register notes on closing and refresh when its a HPOMoperator as User, this was requested by Christan
                }
                else {
                    window.onbeforeunload = function () {
                        var customerId = TdcCustomerInformation.getSelectedCustomerId();
                        var parentAccountNo = TdcCustomerInformation.getSelectedCustomerAccountNo();
                        var svarsted = TdcReceiveCall.svarsted;
                        var contextId = TdcReceiveCall.contextId;
                        var selectedSectionName = $('.navbar-collapse').find("[data-portalsectionname='" + TdcMain.portalSection + "']")[0].innerText;
                        var noteContext = customerId + "@@@" + parentAccountNo + "@@@" + svarsted + "@@@" + contextId + "@@@" + selectedSectionName;

                        TdcMain.setCookie("IsRefresh", "true", 1);
                        TdcMain.setCookie("NoteContext", noteContext, 1);

                        console.log("Window onbeforeunload binded");
                        return ' ';
                    };
                }

            }
        };

        function saveReatilCustomerNote() {
            var date = new Date();
            var year = date.getFullYear().toString().substring(2, 4);
            var currentdate = date.getDate() + "-" + (date.getMonth() + 1) + "-" + year + ", " + date.getHours() + ":" + date.getMinutes();
            var retailUserId = $('#cip_content_container #cip_content').attr("data-retailUserId");
            var departmentName = TdcMain.UserDepartment;
            var retailUserName = $('#cip_content_container #cip_content').attr("data-retailUserName");
            var retailStoreName = $('#cip_content_container #cip_content').attr("data-retailStoreName");
            var customerId = TdcCustomerInformation.getSelectedCustomerId();
            var parentAccountNo = TdcCustomerInformation.getSelectedCustomerAccountNo();
            var svarsted = TdcReceiveCall.svarsted;
            var contextId = TdcReceiveCall.contextId;
            var selectedSectionName = $('.navbar-collapse').find("[data-portalsectionname='" + TdcMain.portalSection + "']")[0].innerText;
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'Note',
                action: 'SaveNote',
                context: {
                    customerId: customerId,
                    noteText: currentdate + "," + retailUserName + "," + retailStoreName,
                    parentAccountNo: parentAccountNo,
                    svarsted: svarsted,
                    contextId: contextId,
                    selectedSectionName: selectedSectionName,
                    entityTitle: "",
                    noteType: "RetailCustomerLog",
                    departmentName: TdcMain.UserDepartment,
                },
                callback: function () {
                },
                errorcallback: function () {
                },
            });
        };


        context.OnClickChange = function (sender) {

            var $webpart = $("#PermissionPopup");
            if (context.PermissionName == "Driftsinfo") {
                TdcMain.CallHotJarVPVForEvents("editDriftsinfo");
            }
            else {
                TdcMain.CallHotJarVPVForEvents("editPermission");
            }
            $webpart.find('.updatePermission').show();

            $webpart.find('.readPermission').hide();

        }

        context.showPermissionModal = function (permissionType, modalTitle) {
            if (permissionType === "driftPermission") {
                $(".GDPRPermissionText").hide();
                $("#PermissionPopup").find("#btnChangePermission").data('buttonname', 'changeDriftPermission');
                $("#PermissionPopup").find("#btnSave").data('buttonname', 'saveDriftPermission');
                TdcMain.CallHotJarVPVForEvents("showDriftsinfo");
                context.PermissionName = "Driftsinfo";
            }
            else {
                $(".GDPRPermissionText").show();
                $("#PermissionPopup").find("#btnChangePermission").data('buttonname', 'changePermission');
                $("#PermissionPopup").find("#btnSave").data('buttonname', 'savePermission');
                TdcMain.CallHotJarVPVForEvents("showPermission");
                context.PermissionName = "Permission";
            }
           
            context.DisplayReadPermission(permissionType, modalTitle);
            $("#PermissionPopup").modal();
        };

        context.DisplayReadPermission = function (permissionType, modalTitle) {
            context.renderPermissionDetails();


            var $webpart = $("#PermissionPopup");
            if (modalTitle)
                $webpart.find(".modal-title").html(modalTitle);
            $("#PermissionPopup").find("." + permissionType).show();

            if (permissionType === "permission") {

                $("#PermissionPopup").find(".driftPermission").hide();
            }
            else {
                $("#PermissionPopup").find(".permission").hide();
            }

            $("#PermissionPopup").find("#btnSave").data("permissiontype", permissionType);

            $webpart.find('.updatePermission').hide();

            $webpart.find('.readPermission').show();

            if (TdcCustomerInformation.ColumbusCustomerNumber == "") {
                $webpart.find("#btnChangePermission").addClass("disabled");
                $webpart.find('#columbscustomermessage').show();
            }
            else {
                $webpart.find("#btnChangePermission").removeClass("disabled");
            }
        }

        context.renderPermissionDetails = function () {
            var $webpart = TdcAsyncWebPartLoader.getTool("#PermissionPopup");
            $(".templatePermissionsContainer").html($("#PermissionsTemplate").render(TdcCustomerInformation.Permission));
            if (TdcCustomerInformation.showDriftsPermissions)
                $(".templateDriftPermissionsContainer").html($("#DriftPermissionsTemplate").render(TdcCustomerInformation.Permission));
            else {
                $webpart.find(".driftPermissionHeader").hide();
                $webpart.find(".templateDriftPermissionsContainer").hide();
                $webpart.find(".permissionHeader").removeClass("col-xs-6 col-sm-6 col-md-6 col-lg-6").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
                $webpart.find(".templatePermissionsContainer").removeClass("col-xs-6 col-sm-6 col-md-6 col-lg-6").addClass("col-xs-12 col-sm-12 col-md-12 col-lg-12");
            }

            $(".templatePermissionPopupContainer").html($("#PermissionsPopupTemplate").render(TdcCustomerInformation.Permission));

        }

        context.OnClickGem = function (sender) {

            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var $sender = $(sender);
            var newEmail = "";
            var newSms = "";
            var newTelephone = "";
            var FormData = {};
            var deleteArr = "";
            var customerId = TdcCustomerInformation.getSelectedCustomerId();
            var permissionType = $sender.data('permissiontype');

            if (permissionType == 'permission') {
                //Email
                var emailValueNew = $webpart.find("#txtEmail").val();
                var emailValueOld = $webpart.find("#txtEmail").data("oldvalue");

                if (emailValueNew != emailValueOld && emailValueNew != "" && emailValueNew != null && !$webpart.find('#checboxEmail').is(':checked')) {
                    FormData["TE"] = emailValueNew;
                }

                //SMS
                var smsValueNew = $webpart.find("#txtSms").val();
                var smsValueOld = $webpart.find("#txtSms").data("oldvalue");

                if (smsValueNew != smsValueOld && smsValueNew != "" && smsValueNew != null && !$webpart.find('#checboxSms').is(':checked')) {
                    FormData["SMS"] = smsValueNew;
                }

                //Telephone
                var telephoneValueNew = $webpart.find("#txtTelephone").val();
                var telephoneValueOld = $webpart.find("#txtTelephone").data("oldvalue");

                var _emailservice = emailValueNew == emailValueOld && !$webpart.find('#checkboxEmail').is(':checked') ? false : true;
                var _smsservice = smsValueNew == smsValueOld && !$webpart.find('#chechboxSms').is(':checked') ? false : true;
                var _telephoneservice = telephoneValueNew == telephoneValueOld && !$webpart.find('#checboxTelephone').is(':checked') ? false : true;
                if (!_emailservice && !_smsservice && !_telephoneservice) {
                    context.DisplayReadPermission(permissionType);
                    return false;
                }

                if (telephoneValueNew != telephoneValueOld && telephoneValueNew != "" && telephoneValueNew != null && !$webpart.find('#checboxTelephone').is(':checked')) {
                    FormData["TT"] = telephoneValueNew;
                }

                if ($webpart.find('#checkboxEmail').is(':checked')) {
                    deleteArr = "TE";
                    TdcMain.CallHotJarVPVForEvents("removePermission");
                }

                if ($webpart.find('#chechboxSms').is(':checked')) {
                    deleteArr = deleteArr + ",SMS";
                    TdcMain.CallHotJarVPVForEvents("removePermission");
                }

                if ($webpart.find('#checboxTelephone').is(':checked')) {
                    deleteArr = deleteArr + ",TT";
                    TdcMain.CallHotJarVPVForEvents("removePermission");
                }

                if (deleteArr != "") {
                    FormData["DeleteItem"] = deleteArr;
                }
                TdcMain.CallHotJarVPVForEvents("savePermission");
            }
            else//driftPermission
            {
                var emailDriftValueNew = $webpart.find("#txtEmailDrift").val().trim();
                var emailDriftValueOld = $webpart.find("#txtEmailDrift").data("oldvalue");
                
                if (emailDriftValueNew != emailDriftValueOld && emailDriftValueNew != "" && emailDriftValueNew != null) {
                    FormData["E-MAIL DRIFT"] = emailDriftValueNew;
                }

                //SMS
                var smsDriftValueNew = $webpart.find("#txtSmsDrift").val().trim();
                var smsDriftValueOld = $webpart.find("#txtSmsDrift").data("oldvalue");

                if (smsDriftValueNew != smsDriftValueOld && smsDriftValueNew != "" && smsDriftValueNew != null) {
                    FormData["SMS DRIFT"] = smsDriftValueNew;
                }

                if ($webpart.find('#checkboxEmailDrift').is(':checked')) {
                    deleteArr = "E-MAIL DRIFT";
                    TdcMain.CallHotJarVPVForEvents("removeDriftsinfo");
                }

                if ($webpart.find('#checkboxSmsDrift').is(':checked')) {
                    deleteArr = deleteArr + ",SMS DRIFT";
                    TdcMain.CallHotJarVPVForEvents("removeDriftsinfo");
                }
                if (deleteArr != "") {
                    FormData["DeleteItem"] = deleteArr;
                }
                TdcMain.CallHotJarVPVForEvents("saveDriftsinfo");
            }


            TdcAsyncWebPartLoader.DoAction({
                toolname: 'CustomerInformationDetails',
                action: 'ModifyPermissions',
                context: {
                    customerId: customerId,
                    ColumbusCustomerNumber: TdcCustomerInformation.ColumbusCustomerNumber,
                    data: FormData,

                },
                callback: function (data) {
                    TdcCustomerInformation.Permission = data;

                    context.DisplayReadPermission(permissionType);

                },
                errorcallback: function () {
                },
                messageSuccess: TranslationsJs.updatedeleteSuccess,
            }, sender);

        }

        context.ValidationpermissionRemove = function (sender) {           
            var $sender = $(sender);
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var teleerror = $sender.data("errorcontrol");
            var textcontrol = $sender.data("textcontrol");
            var errortxt = $sender.data("errortxt");
            var txtvalue = $('#' + textcontrol).val();
            
            if ($sender.is(':checked')) {
                $webpart.find('#' + teleerror).html("");
                $webpart.find('#' + textcontrol).attr("disabled", true);
                $('#' + textcontrol).removeClass("invalidInput");
                $webpart.find(".bindMobileValidationError").length === 1 ? $webpart.find(".bindMobileValidationError").html('') : '';
                $webpart.find(".phoneNumberValidated").length === 1 ? $webpart.find(".phoneNumberValidated").removeClass("glyphicon glyphicon-ok") : '';
                $webpart.find(".phoneNumberValidated").length === 1 ? $webpart.find(".phoneNumberValidated").html('') : '';
                $webpart.find(".msgUpdateError").length === 1 ? $webpart.find(".msgUpdateError").hide() : '';
                $webpart.find(".emailIDValidated").length === 1 ? $webpart.find(".emailIDValidated").removeClass("glyphicon glyphicon-ok") : '';
                $webpart.find(".emailIDValidated").length === 1 ? $webpart.find(".emailIDValidated").html('') : '';
              

            }
            else {
                if (txtvalue == "") {
                    $webpart.find('#' + teleerror).html(errortxt);
                    $('#' + textcontrol).addClass("invalidInput");
                    $webpart.find('#' + textcontrol).attr("disabled", false);

                }
                else {
                    $webpart.find('#' + textcontrol).attr("disabled", false);
                    context.Validationpermission($webpart.find('#' + textcontrol));
                    $webpart.find(".phoneNumberValidated").length === 1 ? $webpart.find(".phoneNumberValidated").html('<label class="glyphicon glyphicon-ok" style="color: #0b8e5f;  font-size: x-small; display:inline-flex; width:15px"></label> <label id="validatedMessage" style="color: #0b8e5f; font-size: x-small; display:inline-flex; width: 181px;">Nummer registreret i kundens navn</label>') : '';
                    $webpart.find(".emailIDValidated").length === 1 ? $webpart.find(".emailIDValidated").html('<label class="glyphicon glyphicon-ok" style="color: #0b8e5f;  font-size: x-small; display:inline-flex; width:15px"></label> <label id="validatedMessage" style="color: #0b8e5f; font-size: x-small; display:inline-flex; width:170px">E-mail registreret i kundens navn</label>') : '';
                  }
            }
            if ($webpart.find('.invalidInput').length > 0) {
                $webpart.find('#btnSave').attr("disabled", true);
            }
            else {
                $webpart.find('#btnSave').attr("disabled", false);
            }
        }

        context.Validationpermission = function (sender) {
            var $sender = $(sender);
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            var OldValue = $sender.data("oldvalue");
            var regex = new RegExp($sender.data("rex"));
            var ValueNew = $sender.val();
            var errorid = $sender.data("errorid");
            var errortext = $sender.data("errortext");
            var checkboxid = $sender.data("checkbox");
            var icon = $sender.data("icon");

            if (OldValue == "") {
                $sender.removeClass("invalidInput");
                $webpart.find("#" + errorid).html("");
            }

            if (!(regex.test(ValueNew))) {
                $sender.addClass("invalidInput");
                var label = $webpart.find("#" + errorid).prev();
                if (label.length > 0 && label.is('label'))
                {
                    label.remove();
                }
                $webpart.find("#" + errorid).html(errortext).show();
                $webpart.find(".msgUpdateError").length === 1 ? $webpart.find(".msgUpdateError").hide(): '';
                $webpart.find(".bindMobileValidationError").length === 1 ? $webpart.find(".bindMobileValidationError").html('') : '';

            }
            else {
                $sender.removeClass("invalidInput");
                $webpart.find("#" + errorid).html("");
                $webpart.find(".msgUpdateError").length === 1 ? $webpart.find(".msgUpdateError").show() : '';

            }

            var tele_ = ValueNew == "" && !$webpart.find("#" + checkboxid).is(':checked') ? true : false;


            if (tele_) {
                $sender.removeClass("invalidInput");
                if (icon.indexOf("grey") >= 0) {
                    $webpart.find("#" + errorid).html("");

                }
                else {
                    $sender.addClass("invalidInput");
                    $webpart.find("#" + errorid).html("Du har valgt at fjerne kontaktinfo. Du skal sætte flueben i 'afmeld', før du kan gemme ændringen.");
                }
            }
            if ($webpart.find('.invalidInput').length > 0) {
                $webpart.find('#btnSave').attr("disabled", true);
            }
            else {
                $webpart.find('#btnSave').attr("disabled", false);
            }
        }


    })(TdcCustomerInformation);

    $(TdcCustomerInformation.init);
    

})(jQuery);