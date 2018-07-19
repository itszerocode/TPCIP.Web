/// <reference path="customerhistoryinformation.js" />
/// <reference path="../asyncwebpartloader.js" />
/// <reference path="../TranslationsJs.js" />
/// <reference path="../guidemanager.js" />

if (TdcSearchCustomer == null || typeof (TdcSearchCustomer) != "object") {
    var TdcSearchCustomer = new Object();
}


(function ($) {
    (function (context) {
        //TREFOR_1.5_DROP_2::xxxxx::Added variable addressDataCache -Ajinkya
        window.addressDataCache = [];
        window.ZipCodeDataCache = [];
        window.firstThreeLetters = "";
        context.previousHouseNumber = "";
        context.previousFloorAndSuiteId = "";
        context.filteredData = [];
        context.filteredHouses = [];
        context.filteredFloorsAndSuites = [];
        context.AddressesUndefinedflag = true;

        context.customerSearchBoxCache = {};

        context.$customerSearchBox = null;
        context.$orderSearchBox = null;
        context.searchLidIndex = 0;
        context.focusTextBox = "";
        context.IsEmergencymode = false;
        context.Lid = "";
        context.accountno = "";
        context.custname = "";
        context.postal = "";
        context.address = "";
        context.madID = "";
        context.emergencyfilterddata = "";



        context.init = function () {
            //TREFOR_1.5_DROP_2::xxxxx::Clear Address Filter -Ajinkya 

            context.$customerSearchBox = $("#customerSearchBox");
            context.$orderSearchBox = $('#orderSearchBox');

            context.$webpart = context.$customerSearchBox.closest('.webpart');
            context.$messageArea = context.$webpart.find('.message');

            context.$customerSearchBox.keydown(function (e) {
                var code = e.keyCode || e.which;
                if (code == 10 || code == 13) {  // If Enter pressed.
                    if (context.$customerSearchBox.val() == "") {
                        e.preventDefault();
                        return false;
                    }
                    return false;
                    //context.customerSearchBoxButtonClicked(context.$customerSearchBox, e);
                }
                else if (e.keyCode == 8 && context.$customerSearchBox.val() != "") {
                    context.$webpart.find("#addressLookUpError").css('display', 'none');
                    context.$customerSearchBox.removeClass("invalidInput");
                }
            });

            context.$customerSearchBox.keyup(function (e) {

                var placeholderText = context.$customerSearchBox.attr('placeholder');
                var texttBoxValue = context.$customerSearchBox.val().trim();
                if (e.keyCode == 10 || e.keyCode == 13) {  // If Enter pressed.
                    if (context.$customerSearchBox.val() == "") {
                        e.preventDefault();
                        return false;
                    }
                    context.customerSearchBoxButtonClicked(context.$customerSearchBox, e);
                }
                else if ((context.$customerSearchBox.val() != placeholderText) && texttBoxValue != "") {
                    context.$webpart.find('#txtPostalCode').attr('disabled', true);
                    context.$webpart.find('#txtPostalCode').val('');
                    context.$webpart.find('#txtStreetName').attr('disabled', true);
                    context.$webpart.find('#txtStreetName').val('');
                    context.$webpart.find('#txtHouseNumber').attr('disabled', true);
                    context.$webpart.find('#txtHouseNumber').val('');
                    context.$webpart.find('#ddlFloorNo').attr('disabled', true);
                    context.$webpart.find('#ddlFloorNo').val('');
                    context.$webpart.find("#streetSuggestionBox").hide();
                    context.$webpart.find("#houseSuggestionBox").hide();
                    context.$webpart.find("#postalCodeCitySuggestionBox").hide();
                    context.$webpart.find('#floorSuiteIdSuggestionBox').hide();
                }
                else if (e.which == 8 && context.$customerSearchBox.val() == placeholderText || texttBoxValue == "") {
                    context.$webpart.find("#addressLookUpError").css('display', 'none');
                    context.$customerSearchBox.removeClass("invalidInput");
                    context.$webpart.find('#txtPostalCode').attr('disabled', false);
                }
                else if (texttBoxValue == "") {
                    context.$webpart.find('#txtPostalCode').attr('disabled', false);
                }
                else {
                    var regex = new RegExp("^[a-zA-Z0-9]+$");
                    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
                    if (regex.test(str)) {
                        return true;
                    }
                }

                e.preventDefault();
                return false;

            });

            context.$orderSearchBox.keypress(function (e) {

                if (e.which == 10 || e.which == 13) {  // If Enter pressed.
                    context.orderSearchBoxButtonClicked(context.$orderSearchBox);
                }
            });
        };

        context.customerSearchBoxButtonClicked = function (sender, e) {
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            TdcCustomerInformation.installationSeqNo = "";
            TdcCustomerInformation.ToolCustomerTaskIDFSM = "";
            TdcCustomerInformation.foundInWholesale = "";
            TdcCustomerInformation.parentSegment = "";
            TdcCustomerInformation.AmsId = "";
            TdcCustomerInformation.AreaId = "";
            TdcCustomerInformation.AnleagId = "";
            TdcCustomerInformation.AddLookupInstallationSeqNo = "";

            if (context.$customerSearchBox.hasClass("invalidInput"))
                context.$customerSearchBox.removeClass("invalidInput");

            var lidCheckList = TdcReceiveCall.CheckAndReturnValidLid(context.$customerSearchBox.val());
            var term = lidCheckList.Lid;
            if (lidCheckList.IsValidLid) {

                var placeholderText = context.$customerSearchBox.attr('placeholder');

                if (term && term != placeholderText) {
                    if ($(sender).is('button') && $(sender).attr('type') == 'button') {
                        sender = $(sender).closest('.input-group').find('.form-control');
                    }
                    context.searchCustomerTerm(term, sender, context.searchCustomerCallback);
                }
            }
            else {
                $webpart.find("#addressLookUpError").css('display', 'block');
                context.$customerSearchBox.addClass("invalidInput");
                e.preventDefault();
                return false;
            }
        };

        context.SearchBoxButtonClicked = function (sender, e) {
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            if ($('.searchCustomerOrOrderWP').find("#customerSearchBox").val() == "Indtast LID/Kontonr." && $('.addressLookUp').find("#txtHouseNumber").val() != "Husnummer" && (!$('.addressLookUp').find("#ddlFloorNo").prop('disabled') && $('.addressLookUp').find("#ddlFloorNo").val() != "Etage") && (!$("#floorSuiteIdSuggestionBox").is(':visible'))) {
                var madIdNew = $webpart.find('#ddlFloorNo').attr('data-madId');
                $webpart.find("#txtHouseNumber").attr("madId", madIdNew);
                context.ShowCustomerInfoPopup($webpart.find('#txtHouseNumber').attr('madId'), e, sender);
            }
            else if ($('.searchCustomerOrOrderWP').find("#customerSearchBox").val() == "Indtast LID/Kontonr." && $('.addressLookUp').find("#txtHouseNumber").val() != "Husnummer" && ($('.addressLookUp').find("#ddlFloorNo").prop('disabled')) && (!$("#lsthouseSuggestionBox").is(':visible'))) {
                var madIdNew = $webpart.find("#txtHouseNumber").attr("madId");
                context.ShowCustomerInfoPopup(madIdNew, e, sender);
            }
            else {
                context.customerSearchBoxButtonClicked(sender, e);
            }

        };
        // START CLEAR A CACHE ON RELODE FOR EMERGENCY CUSTOMER LOOKUP
        context.Clearcacheonrefresh = function (subscriptionId) {
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'SearchCustomer',
                action: 'RemoveCache',
                context: {
                    subscriptionId: subscriptionId,
                },
                callback: function () {
                },
                errorcallback: function () {
                },
            });
        };
        //END THE CLEAR CACHE FUNCTION

        context.searchCustomerTerm = function (term, sender, callback, IfHoptofakt) {
            TdcUI.createMessage(TranslationsJs.Searching, TdcUI.messageOptions.info, null, true, sender);
            context.searchLidIndex = 0;
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'SearchCustomer',
                action: 'SearchCustomers',
                context: {
                    customerSearchString: term
                },
                //messageProcess: TranslationsJs.Searching,
                //messageSuccess: "    ",
                callback: function (data) {
                    //Cancelled Customer Mode Check
                    if (TdcMain.CancelledCustomerEnabledInPortals.indexOf(TdcAsyncWebPartLoader.portalId.toLowerCase()) >= 0 && (data == undefined || data == null || data.length <= 0) && !context.isValidLID(term) && term.length != 6 && term.length != 7) {
                        context.cancelledCustomerSearchByAccount(term, sender);
                    }
                    else { //Normal Lookup
                        if (callback) {
                            callback(data, term, sender, IfHoptofakt);
                        }
                    }
                },
                errorcallback: function () {
                    if (IfHoptofakt != undefined) {
                        loadCustomer(term, null, "onsite_kobber", IfHoptofakt);
                    }
                    else {
                        if (TdcMain.CancelledCustomerEnabledInPortals.indexOf(TdcAsyncWebPartLoader.portalId.toLowerCase()) >= 0 && !context.isValidLID(term) && term.length != 6 && term.length != 7) {
                            context.cancelledCustomerSearchByAccount(term, sender);
                        }
                        else { //Normal Lookup
                            $("#messageAlertsBox").children().remove();
                            var htmlLink = undefined;
                            //var htmlLink = '<br><a id="EmergencyState" href="#" onclick="TdcSearchCustomer.Emergencycustomerlookup(this,\'' + term + '\');" >Brug nødprocedure</a>';
                            TdcUI.createMessage(TranslationsJs.No_customer_found, TdcUI.messageOptions.error, null, false, sender, term, htmlLink);
                            return false;
                        }
                    }
                }
            });
        }

        // Cancelled customers mode - Search by account number
        context.cancelledCustomerSearchByAccount = function (accountNo, sender) {
            CustomerAddressLookupPopup.cancelledProducts = [];
            //var $PopupCustomerAddressLookup = $("#PopupCustomerAddressLookup");
            //$PopupCustomerAddressLookup.modal();
            TdcAsyncWebPartLoader.ShowTool({
                toolname: 'CustomerAddressLookupPopup',
                action: 'GetCancelledCustomerInfoByAccount',
                context: {
                    accountNo: accountNo
                },
                callback: function (data) {
                    $("#messageAlertsBox").children().remove();
                    var noCancelledLidList = $(data).find("#CustomerAddressLookupPopup_noCancelledLidList").val();
                    if (noCancelledLidList.toLowerCase() == "true") {
                        TdcUI.createMessage(TranslationsJs.No_customer_found, TdcUI.messageOptions.error, null, false, sender);
                    }
                    else {
                        var $PopupCustomerAddressLookup = $("#PopupCustomerAddressLookup");
                        var $txtBox = $(data).find("#CustomerAddressLookupPopup_noCancelledLidList");
                        var address = $txtBox.data("streetname") + " " + $txtBox.data("streetnumber") + ", " + $txtBox.data("zipcode") + " " + $txtBox.data("city");
                        var $inactiveAddress = $PopupCustomerAddressLookup.find(".inactiveCustomerAddress");
                        $inactiveAddress.text(address);
                        $inactiveAddress.data('streetname', $txtBox.data("streetname"));
                        $inactiveAddress.data('streetnumber', $txtBox.data("streetnumber"));
                        $inactiveAddress.data('zipcode', $txtBox.data("zipcode"));
                        $inactiveAddress.data('city', $txtBox.data("city"));
                        CustomerAddressLookupPopup.cancelledCustomerInfo = $(data).find('.activeInactiveTabs').data("cancelledcustomerinfobyaccount");
                        //$PopupCustomerAddressLookup.find(".inactiveCustomerAddress").show();
                        $PopupCustomerAddressLookup.find(".activeInactiveTabs").data("cancelledsearchbyaccount", true);
                        $PopupCustomerAddressLookup.find(".lidTypeDetails .inActiveLid").hide();
                        $PopupCustomerAddressLookup.find("#LIDList").hide();
                        $PopupCustomerAddressLookup.find(".activeLid .paginator").replaceWith("<br/><div style='margin-left:16px;'>Ingen aktiv kunde fundet</div><br/><br/><br/>");
                        $PopupCustomerAddressLookup.modal();
                    }
                },
                errorcallback: function () {
                    $("#messageAlertsBox").children().remove();
                    TdcUI.createMessage(TranslationsJs.No_customer_found, TdcUI.messageOptions.error, null, false, sender);
                }
            }, sender);
        }

        context.isValidLID = function (term) {
            var lidAccDigitsRange = /^[0-9]{9,12}$/;
            if (term.length == 8 || (term.indexOf("12") == 0 && lidAccDigitsRange.test(term)))
                return true;
            else
                return false;
        }

        context.Emergencycustomerlookup = function (sender, term) {
            $("#continue").addClass("disabled");
            var $webpart = TdcAsyncWebPartLoader.getTool("#PopUpEmergencyProcedure");
            $("#PopUpEmergencyProcedure").modal();

            TdcAsyncWebPartLoader.DoAction({
                toolname: 'SearchCustomer',
                action: 'GetEmergencyCustomerInformation',
                context: {
                    customerSearchString: term,

                },
                callback: function (data) {
                    context.emergencyfilterddata = data;

                    if (data.length > 0) {
                        var Emergencycustomerlookpdetails = $("#EmergencycustTemplate");
                        $(".EmergencycustomerTemplateContainer").html(Emergencycustomerlookpdetails.render(data));

                        if (data.length == 1) {
                            $("input:radio[name=Emergencycustomerradio]").eq(0).prop('checked', true).trigger("click");
                            $("#continue").removeClass("disabled");
                        }
                    }
                    else {
                        $("#PopUpEmergencyProcedure .modal-body").html('No data found for this customeragent');
                    }
                    //start the filter code
                    if (data.length > 10) {
                        $("#PopUpEmergencyProcedure #EmergencyCusttable").dataTable();
                    }
                    //end the filter code

                },
                errorcallback: function () {
                },
            }, sender);

        }

        Emergencycust = function () {
            this.lid = "";
            this.accountNo = "";
            this.customerName = "";
            this.postalNumber = "";
            this.address = "";
            this.madId = "";

        };

        context.emergencycusts = function (sender) {
            $sender = $(sender);
            context.Lid = $sender.data("lid");
            context.accountno = $sender.data("accountno");
            context.custname = $sender.data("custname");
            context.postal = $sender.data("postal");
            context.address = $sender.data("address");
            context.madID = $sender.data("madid");
            if ($("input:radio[name=Emergencycustomerradio]").is(":checked")) {
                $("#continue").removeClass("disabled");
            }

        }

        context.OnClickContinue = function (sender) {
            var $webpart = $("#PopUpEmergencyProcedure");
            var emergencyprocedurecustDetails = new Emergencycust();

            emergencyprocedurecustDetails.lid = context.Lid.toString();
            emergencyprocedurecustDetails.accountNo = context.accountno.toString();
            emergencyprocedurecustDetails.customerName = context.custname;
            emergencyprocedurecustDetails.postalNumber = context.postal;
            emergencyprocedurecustDetails.address = context.address;
            emergencyprocedurecustDetails.madId = context.madID;



            TdcAsyncWebPartLoader.DoAction({
                toolname: 'SearchCustomer',
                action: 'AddSelectedDataToCache',
                context: {
                    emergencySubscription: emergencyprocedurecustDetails,

                },
                callback: function (data) {
                    context.IsEmergencymode = true;
                    TdcAsyncWebPartLoader.checkEmergencymode = context.IsEmergencymode;
                    $('#PopUpEmergencyProcedure').modal("hide");
                    loadCustomer(emergencyprocedurecustDetails.lid, false, null);
                    if (context.IsEmergencymode) {
                        $(".navbar-inverse").css("border", "none");
                        $("#topNavBar1").append('<div id="Emergencymodewarning" class="row 1 col-md-14 text-center" style="text:bold;color: red;background-color: #eeeeee;border-style:unset;font-size: 16px;border-color: #e7e7e7;font-size: 19px;font-weight: bold;"><b>CIP KØRER I NØDTILSTAND<b></b></div>')
                    }

                },
                errorcallback: function () {
                },

            }, sender);
        }

        context.continueNoCustomerFound = function (sender, term) {
            $("#mainSearchBox").attr("disabled", true);
            var $sender = $(sender);
            $sender.parent(".msgDiv").remove();
            TdcPageStatesManager.goToNoCustomerSession();
            TdcCustomerInformation.loadEmptyCustomer(term);
        }

        context.continueNoCustomerFoundWithAddress = function (sender, postalCode, postalDistrict, streetName, houseNo, floorNo) {
            //$("#mainSearchBox").attr("disabled", true);
            $('#PopupCustomerAddressLookup').modal("hide");
            var $sender = $(sender);
            $sender.parent(".msgDiv").remove();
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
            postalCode = $("#txtPostalCode").val().substring(0, 4);
            postalDistrict = $("#txtPostalCode").val().substring(5, ($("#txtPostalCode").val().trim().length))
            streetName = $("#txtStreetName").val();
            houseNo = $("#txtHouseNumber").val();
            floor = $('#ddlFloorNo').attr('data-floorid');
            side = $('#ddlFloorNo').attr('data-suiteid');
            streetCode = $("#btnSearchCustomer").attr('streetcode');
            municipalityCode = $("#btnSearchCustomer").attr('municipalitycode');
            var toolName = "ToolPriorityProductDetails";
            var CustHisDetTabTitle = "Toolme";
            var showSaveAndCancel = false;
            var directLoad = true;
            var toolContext = {
                directLoad: directLoad,
                postalCode: postalCode,
                municipalityCode: municipalityCode,
                streetCode: streetCode,
                streetName: streetName,
                houseNo: houseNo,
                floor: floor,
                side: side,
                noteId: toolName,
            };

            TdcPageStatesManager.goToNoCustomerSessionWithAddress();
            TdcCustomerInformation.loadEmptyCustomerWithAddress(postalCode, postalDistrict, streetName, houseNo, floor, side, municipalityCode, streetCode);

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {
                $('.navbar-collapse').find("#GoToDashboardLink_placeholder").show();
            } else {
                $('.navbar-collapse').find("#GoToDashboardLink_placeholder").hide();
            }
            $('.navbar-collapse').find("#GoToDashboardIcon_placeholder").show().addClass("margin-right-18-imp");
            $('.navbar-collapse').find("#cip_menu").hide();
            $('.navbar-collapse').find("[data-portalsectionname='ch_homePage']").hide();
            if (!$('#tdc_rightPanelHandle').hasClass("no-right-panel")) {
                TdcUI.hideRightPanel($('#tdc_rightPanelHandle'));
            }
            TdcTabManager.addSearchToolSessionTab(event, toolName, CustHisDetTabTitle, showSaveAndCancel, false, function () {
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "ToolPriorityProductDetails",
                    context: toolContext,
                    noteId: toolName,
                });
            });
        }

        context.searchCustomerCallback = function (data, term, sender, IfHoptofakt) {
            $("#messageAlertsBox").children().remove();
            if (data.length == 0) {
                if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.WSP) {
                    loadCustomer('');
                }
                else if (IfHoptofakt != undefined) {
                    loadCustomer(term, null, "onsite_kobber", IfHoptofakt);
                }
                else {
                    //var htmlLink = '<br><a id="a_NoCustFound" onclick="TdcSearchCustomer.continueNoCustomerFound(this,\'' + term + '\')" class="noCustFound">Fortsæt uden kunde</a>';
                    var htmlLink = undefined;
                    TdcUI.createMessage(TranslationsJs.No_customer_found, TdcUI.messageOptions.error, null, false, sender, term, htmlLink);
                }
            } else {
                if (data.length == 1 || isSearchedLidPresentInResponse(data, term)) {
                    //var portalSectionName = "ch_kundeservice"; //$('.aktiveTabCustom').attr('data-portalsectionname');
                    TdcCustomerInformation.foundInWholesale = data[context.searchLidIndex].foundInWholesale;// Added for New FAS SMS tool
                    TdcCustomerInformation.parentSegment = data[context.searchLidIndex].parentSegment;// Added for New FAS SMS tool
                    TdcCustomerInformation.installationSeqNo = data[context.searchLidIndex].youseeSequence;// Added for New FAS SMS tool
                    TdcCustomerInformation.AmsId = data[context.searchLidIndex].AMSID;
                    TdcCustomerInformation.AreaId = data[context.searchLidIndex].NodeID;
                    TdcCustomerInformation.AnleagId = data[context.searchLidIndex].AnelagId;

                    loadCustomer(data[context.searchLidIndex].entityId, false, data[context.searchLidIndex].portalSection, IfHoptofakt);                   

                    if (data[context.searchLidIndex].portalSection) {
                        //vaibhav : driftsInfo : Calling loadPortalSectionTool() passing with LID parameters when TP portal loads with onsite_kobber
                        if (data[context.searchLidIndex].portalSection == "onsite_kobber") {
                            TdcMain.loadPortalSectionTool(term, "");
                        }
                    }
                    else {
                        //vaibhav : driftsInfo : Calling loadPortalSectionTool() passing with LID parameters
                        //TdcMain.portalSection = $('.aktiveTabCustom').attr('data-portalsectionname');
                        //TdcMain.loadPortalSectionTool(term, "");
                    }
                }
                else {
                    showModalSelect(TranslationsJs.Select_customer, data, loadCustomer);
                }
                context.$customerSearchBox.val('');
            }
            return false; //disable default messaage
        }

        var isSearchedLidPresentInResponse = function (searchResult, term) {
            for (var i = 0; i < searchResult.length; i++) {
                if (searchResult[i].entityId == term) {
                    context.searchLidIndex = i;
                    return true;
                }
            }
            return false;
        }

        context.LoadHouseHoldCustomer = function (sender) {
            var term = ToolHouseholdDetails.HouseHoldAccountId;

            TdcAsyncWebPartLoader.DoAction({
                toolname: 'SearchCustomer',
                action: 'SearchCustomers',
                context: {
                    customerSearchString: term
                },
                messageProcess: TranslationsJs.Searching,
                callback: function (data) {
                    if (data.length == 0) {
                        if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.WSP) {
                            loadCustomer('');
                        }
                        else {
                            TdcUI.createMessage(TranslationsJs.No_customer_found, TdcUI.messageOptions.error, null, false, sender);
                        }
                    } else {
                        window.scrollTo(0, 0);     //scroll window to top 
                        if (data.length == 1) {
                            loadCustomer(data[0].entityId, false);
                            if (data[0].portalSection) {
                                //vaibhav : driftsInfo : Calling loadPortalSectionTool() passing with LID parameters when TP portal loads with onsite_kobber
                                if (data[0].portalSection == "onsite_kobber") {
                                    TdcMain.loadPortalSectionTool(term, "");
                                }
                                TdcMain.changePortalSection(data[0].portalSection, function () {
                                    return false;
                                });
                            }
                            else {
                                //vaibhav : driftsInfo : Calling loadPortalSectionTool() passing with LID parameters
                                TdcMain.portalSection = $('.aktiveTabCustom').attr('data-portalsectionname');
                                TdcMain.loadPortalSectionTool(term, "");
                            }
                        } else {
                            //window.scrollTo(0, 0);     // scroll to top 
                            showModalSelect(TranslationsJs.Select_customer, data, loadCustomer);
                        }
                        context.$customerSearchBox.val('');
                    }
                    return false; //disable default messaage
                }
            }, sender);

        };


        //Function to remove spaces when customerSearchBox leaves focus.
        context.LoseFocus = function (sender) {
            $(sender).blur(function () {
                var lidText = $('#customerSearchBox').val();
                lidText = lidText.replace(/\s/g, "");
                if (lidText != "IndtastLID/Kontonr.")
                    $('#customerSearchBox').val(lidText);
            });
        };

        context.orderSearchBoxButtonClicked = function (sender) {
            TdcCustomerInformation.installationSeqNo = "";
            TdcCustomerInformation.AddLookupInstallationSeqNo = "";
            TdcCustomerInformation.foundInWholesale = "";
            TdcCustomerInformation.parentSegment = "";
            TdcCustomerInformation.AmsId = "";
            TdcCustomerInformation.AreaId = "";
            TdcCustomerInformation.AnleagId = "";

            var term = context.$orderSearchBox.val();
            var placeholderText = context.$orderSearchBox.attr('placeholder');

            if (term && term != placeholderText) {
                if ($(sender).is('button') && $(sender).attr('type') == 'button') {
                    sender = $(sender).closest('.input-group').find('.form-control');
                }

                TdcAsyncWebPartLoader.DoAction({
                    toolname: 'SearchCustomer',
                    action: 'SearchOrder',
                    context: {
                        orderSearchString: term
                    },
                    messageProcess: TranslationsJs.Searching,
                    callback: function (data) {
                        if (data.NoteId) {
                            TdcCustomerInformation.loadCustomer(data.CustomerId, null, true);
                            TdcPageStatesManager.goToNewSession();
                            if (data.Status == 'Parked' || data.Status == 'Active') {
                                TdcGuideManager.resumeGuideOrShowHistoryInformation(data.NoteId, data.EntityId, data.EntityTitle, data.PortalId, TdcParkedGuides.refresh);
                            } else {
                                TdcGuideManager.openGuideHistoryTab(data.NoteId, data.EntityId, data.EntityTitle);
                            }
                            context.$orderSearchBox.val('');
                        } else {
                            TdcUI.createMessage(TranslationsJs.No_order_found, TdcUI.messageOptions.error, null, false, sender);
                        }
                        return false; //disable default messaage
                    }
                }, sender);
            }
        };


        function loadCustomer(customerId, makeAsyncCall, portalSection, IfHoptofakt) {
            if (typeof makeAsyncCall === 'undefined') {
                makeAsyncCall = false;
            };
            if (IfHoptofakt != undefined) {

                Hop2faktIdentifyCustomerType(IfHoptofakt, customerId);

                if (IfHoptofakt[11] == '1') {
                    TdcGuideManager.startGuideFromHop2fakt(customerId, IfHoptofakt[1], IfHoptofakt[2], IfHoptofakt[3], IfHoptofakt[4], IfHoptofakt[5]);
                    return false;
                }
                else if (IfHoptofakt[11] == '2') {
                    TdcGuideManager.resumeGuideOrShowHistoryInformation(IfHoptofakt[7], IfHoptofakt[8], IfHoptofakt[9], IfHoptofakt[10], TdcParkedGuides.refresh);
                }

            }
            TdcCustomerInformation.loadCustomer(customerId, null, makeAsyncCall, portalSection);
            TdcPageStatesManager.goToNewSession();
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP && TdcMyOrder.userType == "COAX") {
            TdcMyOrder.ShowCSAMTab();
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
            }
            else {
                $('#GAASelectorNote_placeholder textarea').trigger("click");
                $('#GAASelectorNote_placeholder textarea').focus();
            }
            TdcGuideSelector.activate();
            //if (!(typeof portalSection === 'undefined') && portalSection != "") {
            //    TdcMain.changePortalSection(portalSection);
            //};

        };

        function Hop2faktIdentifyCustomerType(IfHoptofakt, customerId) {

            if (customerId.trim().charAt(0) == "Y" && customerId.trim().charAt(1) == "M") {

                TdcCustomerInformation.AnleagId = IfHoptofakt[6];
                TdcCustomerInformation.AmsId = IfHoptofakt[13];
                TdcCustomerInformation.AreaId = IfHoptofakt[14];
            }
        };

        function showModalSelect(message, searchResult, callback /* function(customerId) */) {
            var htmlSelect = '<select style="padding-left: 10px;padding-right: 10px; border: none;" size="' + searchResult.length + '">';
            for (var i = 0; i < searchResult.length; i++) {
                htmlSelect += '<option value="' + searchResult[i].entityId + "-" + searchResult[i].portalSection + "-" + searchResult[i].youseeSequence + "-" + searchResult[i].parentSegment + "-" + searchResult[i].foundInWholesale + "-" + searchResult[i].AMSID + "-" + searchResult[i].NodeID + "-" + searchResult[i].AnelagId + '">' + searchResult[i].entityId + "-" + searchResult[i].address + '</option>';
            }
            htmlSelect += '</select>';

            var content = '<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' +
                '<h4 class="modal-title">' + message + '</h4></div><div class="modal-body">' + htmlSelect +
            '</div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">Close</button><button type="button" class="btn btn-primary">Ok</button></div></div></div></div>';

            var $dlg = $(content);
            $dlg.find('button.btn-primary').click(function (e) {
                var selectedValue = $dlg.find('select').val().split('-')[0];
                var selectedSection = $dlg.find('select').val().split('-')[1];
                var Yousee = $dlg.find('select').val().split('-')[2];
                var parentsegment = $dlg.find('select').val().split('-')[3];
                var iswholesale = $dlg.find('select').val().split('-')[4];
                var ams = $dlg.find('select').val().split('-')[5];
                var nodeid = $dlg.find('select').val().split('-')[6];
                var anelegid = $dlg.find('select').val().split('-')[7];
                if (selectedValue == '') {
                    e.preventDefault();
                    return;
                }
                TdcCustomerInformation.foundInWholesale = iswholesale;// Added for New FAS SMS tool
                TdcCustomerInformation.parentSegment = parentsegment;// Added for New FAS SMS tool
                TdcCustomerInformation.installationSeqNo = Yousee;
                TdcCustomerInformation.AmsId = ams;
                TdcCustomerInformation.AreaId = nodeid;
                TdcCustomerInformation.AnleagId = anelegid;

                $dlg.modal('hide');
                callback(selectedValue, true, selectedSection);
                //vaibhav : driftsInfo : calling loadPortalSectionTool() with madid parameter on load address lookup popup
                var madId = $("#txtHouseNumber").attr("madId");
                if (madId == undefined) {
                    madId = $('#ddlFloorNo').attr('data-madId');
                }
                //TdcMain.loadPortalSectionTool(selectedValue, madId,undefined,true);
            });
            $dlg.modal();
            return $dlg;
        };

        /** 
        * @Description: Allow Numbers only in the input 
        * @Type : OnKeyPressEvent 
        * @Parameters : { e: event passed } 
        * @Returns : 
        * @Author : Ajinkya Korade @Date : 08052015 
        * @Project : TREFOR_1.5_REQ_2 @TFS : 1501 
        * @History : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes} 
        **/
        context.AllowNumbersOnly = function (e) {
            var unicode = e.which ? e.which : e.keyCode
            var keyPressed = String.fromCharCode(unicode)
            var re = /^[\d]+/
            return (re.test(keyPressed));
        };

        /** 
        * @Description: Allow Letters,'.',' ' and diatcritics only in the input 
        * @Type : OnKeyPress Event 
        * @Parameters : { e: event passed } 
        * @Returns : 
        * @Author : Ajinkya Korade @Date : 08052015 
        * @Project : TREFOR_1.5_REQ_2 @TFS : 1501 
        * @History : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes} 
        **/
        context.AllowLettersNumberSpecialCharAndDiacritics = function (e) {
            var unicode = e.which ? e.which : e.keyCode
            var keyPressed = String.fromCharCode(unicode)
            var re = /^[a-zA-Z0-9\u00C0-\u017F\u0020-\u002F]+/
            return (re.test(keyPressed));
        };

        /**
        * @Description: Get Postal Info  when User enters 4 digits of postal code else keep other controls disabled
        * @Type       : OnKeyPress Event
        * @Parameters : { sender: txtPostalCode, e: OnKeyUp event }
        * @Returns    :
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501    
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.OnKeyUpPostalCode = function (sender, e) {
            var zipCodeChangedDisabledControlsList = ["#txtStreetName", "#txtHouseNumber", "#btnSearchCustomer", "#ddlFloorNo"];
            var $webpart = $(sender).closest("[id$='_placeholder']");

            var searchTerm = sender.value.toLowerCase().trim();
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 46) || (e.keyCode >= 65 && e.keyCode <= 90) || ((e.keyCode == 8) && searchTerm.length >= 1)) {
                $webpart.find("#addressLookUpError").css('display', 'none');
                context.ClearAndDisableControls(zipCodeChangedDisabledControlsList, sender);
                var filterString = sender.value.toLowerCase().replace(/[ ]/g, "");
                var suggestionList = "<ul id='lstSuggestions' class='lstSuggestions' ><li><img  src='/_Layouts/Images/TPCIP.Web/GAASelector/loading.gif' alt='loading' /></li></ul>";
                $webpart.find("#postalCodeCitySuggestionBox").html(suggestionList);
                $webpart.find("#postalCodeCitySuggestionBox").show();
                window.firstLetter = searchTerm;
                RefreshMADCityAddresses(window.firstLetter, sender, searchTerm, e);
            }

            else if ((e.keyCode == 8) && searchTerm.length < 1) {
                $webpart.find("#addressLookUpError").css('display', 'none');
                context.ClearAndDisableControls(zipCodeChangedDisabledControlsList, sender);
                $(sender).removeClass('invalidInput');
            }

            else if ((e.keyCode == 40) || (e.keyCode == 38)) {
                //Keyup and down functions
                var $input = $webpart.find('#txtPostalCode'),
                        current_index = -1,
                        $number_list = $webpart.find('#postalCodeCitySuggestionBox'),
                        index = $number_list.find('.lstSuggestions li.selected').index(),
                        $options = $number_list.find('.lstSuggestions li'),
                        items_total = $options.length;

                if (e.keyCode == 38) {
                    index--;

                    // Check that we've not tried to select before the first item
                    if (index < 0) {
                        index = items_total - 1;
                    }
                    change_selection();

                    $webpart.find('#postalCodeCitySuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#postalCodeCitySuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#postalCodeCitySuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#postalCodeCitySuggestionBox ul').scrollTop(scrollHeight - height);

                } else if (e.keyCode == 40) {

                    index++;
                    // Check that index is not beyond the last item
                    if (index > items_total - 1) {
                        index = 0;
                    }

                    change_selection();

                    $webpart.find('#postalCodeCitySuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#postalCodeCitySuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#postalCodeCitySuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#postalCodeCitySuggestionBox ul').scrollTop(scrollHeight - height);
                }
                    //else if (e.keyCode == 13) {
                    //    if ($options.hasClass('selected')) {
                    //        $number_list.find('.selected').click();
                    //    }
                    //}

                else {
                    $(this).val('');
                };

                function change_selection() {
                    $options.removeClass('selected');
                    $options.eq(index).addClass('selected');
                    var a = $options.eq(index).text();
                    $webpart.find("#txtPostalCode").val(a);
                }

                $webpart.find('#txtPostalCode').keydown(function (e) {
                    var code = e.keyCode || e.which;
                    if (code == '9' && !e.shiftkey) {
                        if ($options.hasClass('selected')) {
                            $number_list.find('.selected').click();
                        }
                        return false;
                    }

                    else if (code == '13') {
                        if ($options.hasClass('selected')) {
                            $number_list.find('.selected').click();
                        }
                        return false;
                    }
                });
            }

        };


        /**
        * @Description: Get Postal Info  from service
        * @Type       : OnKeyPress Event
        * @Parameters : { sender: txtPostalCode }
        * @Returns    :
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/

        // as per the new merging change we have disabled it.

        //context.GetPostalInformation = function (sender) {
        //    TdcAsyncWebPartLoader.DoAction({
        //        toolname: 'AddressLookUp',
        //        action: 'IsValidZipCode',
        //        context: {
        //            zipCode: sender.value
        //        },
        //        callback: function (data) {
        //            ShowPostalDistrict(data,sender);
        //            return false;
        //        }
        //    }, sender);
        //};
        /**
        * @Description: Updates txtPostalDistrict field on ZipCode validation
        * @Type       : function
        * @Parameters : { data: IsValidZipCode Service Response, sender: txtStreetName }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/

        // as per the new merging change we have disabled it.

        //function ShowPostalDistrict(data, sender) {
        //    var $webpart = $(sender).closest("[id$='_placeholder']");

        //    var postalInfo = data;
        //    /*TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015 :: If service data cannot be parsed into JSON then throw exception 
        //                                                                  else update txtPostalDistrict*/
        //    try {
        //        var postalDataJSON = JSON.parse(postalInfo);
        //        $(sender).removeClass('invalidInput');
        //        $webpart.find("#txtStreetName").attr('disabled', false);
        //        $webpart.find("#txtStreetName").removeClass('watermark')
        //        $webpart.find("#txtPostalDistrict").val(postalDataJSON.PostalDistrict);
        //        window.firstThreeLetters = "";
        //    } catch (err) {
        //        //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015 :: The ZipCode is Invalid then show errror message
        //        $(sender).addClass('invalidInput');
        //        TdcUI.createMessage(TranslationsJs.InvalidZipCode, TdcUI.messageOptions.error, null, false, sender);
        //    }
        //}
        /**
        * @Description: Refreshes Autocomplete for txtStreetName whenever user inputs any key
        * @Type       : onkeyup Event
        * @Parameters : { sender: txtStreetName }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.OnKeyUpRefreshAutoComplete = function (sender, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            var streetNameChangedDisabledControlsList = ["#txtHouseNumber", "#btnSearchCustomer", "#ddlFloorNo"];
            var searchTerm = sender.value.toLowerCase().trim();
            if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 46) || (e.keyCode >= 65 && e.keyCode <= 90) || ((e.keyCode == 8) && searchTerm.length >= 1)) {
                $webpart.find("#addressLookUpError").css('display', 'none');
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015 :: Disable the controls in the array streetNameChangedDisabledControlsList
                context.ClearAndDisableControls(streetNameChangedDisabledControlsList, sender);
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015 :: get the string to filter address which will be space irrespective comparison
                var searchTerm = sender.value.toLowerCase().trim();
                var filterString = sender.value.toLowerCase().replace(/[ ]/g, "");
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Show loading icon in the autocomplete list while the data is loading
                var suggestionList = "<ul id='lstSuggestions' class='lstSuggestions'><li><img  src='/_Layouts/Images/TPCIP.Web/GAASelector/loading.gif' alt='loading' /></li></ul>";
                $webpart.find("#streetSuggestionBox").html(suggestionList);
                $webpart.find("#streetSuggestionBox").show();
                if (filterString.length >= 3) {
                    //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: When error in service or changed first three letters refresh addressDataCache 
                    if (window.firstThreeLetters != searchTerm.substring(0, 3) || context.AddressesUndefinedflag == true) {
                        context.AddressesUndefinedflag = true;
                        window.firstThreeLetters = searchTerm.substring(0, 3);//filterString.substring(0, 3);
                        var postCodeCity = $webpart.find("#txtPostalCode").val();
                        var postalCode = postCodeCity.substring(0, 4);
                        RefreshMADAddresses(postalCode, window.firstThreeLetters, sender, searchTerm);
                    }
                    else {
                        GetAndUpdateSuggestionBox(sender, filterString, "txtStreetName");
                    }
                } else {
                    $webpart.find("#streetSuggestionBox").hide();
                    $(sender).removeClass('invalidInput');
                }
            }
            else if ((e.keyCode == 40) || (e.keyCode == 38) || (e.keyCode == 13)) {
                //Keyup and down functions
                var $input = $webpart.find('#txtStreetName'),
                        current_index = -1,
                        $number_list = $webpart.find('#streetSuggestionBox'),
                        index = $number_list.find('.lstSuggestions li.selected').index(),
                        $options = $number_list.find('.lstSuggestions li'),
                        items_total = $options.length;

                if (e.keyCode == 38) {
                    index--;

                    // Check that we've not tried to select before the first item
                    if (index < 0) {
                        index = items_total - 1;
                    }
                    change_selection();

                    $webpart.find('#streetSuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#streetSuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#streetSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#streetSuggestionBox ul').scrollTop(scrollHeight - height);

                } else if (e.keyCode == 40) {
                    index++;

                    // Check that index is not beyond the last item
                    if (index > items_total - 1) {
                        index = 0;
                    }
                    change_selection();

                    $webpart.find('#streetSuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#streetSuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#streetSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#streetSuggestionBox ul').scrollTop(scrollHeight - height);

                }
                else if (e.keyCode == 13) {
                    if ($options.hasClass('selected')) {
                        $number_list.find('.selected').click();
                    }
                }

                else {
                    $(this).val('');
                };


                function change_selection() {
                    $options.removeClass('selected');
                    $options.eq(index).addClass('selected');
                    var a = $options.eq(index).text();
                    $webpart.find("#txtStreetName").val(a);
                }


                $webpart.find('#txtStreetName').keydown(function (e) {
                    var code = e.keyCode || e.which;
                    if (code == '9' && !e.shiftkey) {
                        if ($options.hasClass('selected')) {
                            $number_list.find('.selected').click();
                        }
                        return false;
                    }
                });
            }
            else if ((e.keyCode == 8) && searchTerm.length < 1) {
                $webpart.find("#addressLookUpError").css('display', 'none');
                context.ClearAndDisableControls(streetNameChangedDisabledControlsList, sender);
                $(sender).removeClass('invalidInput');
            }
        };
        /**
        * @Description: on click on autocomplete suggestion list update txtStreetName
        * @Type       : OnClick Event
        * @Parameters : { streetName: Street name to be shown in txtStreetName }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.SelectStreetName = function (streetName, sender) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            $webpart.find("#txtStreetName").val(streetName);
            context.ClearAndDisableControls(["#txtHouseNumber"], sender);
            $webpart.find("#streetSuggestionBox").hide();
            $webpart.find("#txtHouseNumber").attr('disabled', false);
            $webpart.find("#txtHouseNumber").removeClass('watermark');
            $webpart.find("#txtHouseNumber").focus();
            context.filteredData = window.addressDataCache.filter(function (address) {
                return address.StreetName.toLowerCase().replace(/[ \.]/g, "") === streetName.toLowerCase().replace(/[ \.]/g, "");
            });
        };

        context.SelectPostAreasName = function (postArea, sender) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            $webpart.find("#txtPostalCode").val(postArea);
            context.ClearAndDisableControls(["#txtStreetName"], sender);
            $webpart.find("#postalCodeCitySuggestionBox").hide();
            $webpart.find("#txtStreetName").attr('disabled', false);
            $webpart.find("#txtStreetName").removeClass('watermark');
            $webpart.find("#txtStreetName").focus();
            context.filteredData = window.ZipCodeDataCache.filter(function (postalCodeDetails) {
                return postalCodeDetails.ZipDistrict.toLowerCase().replace(/[ \.]/g, "") === postArea.toLowerCase().replace(/[ \.]/g, "");
            });
        };

        /**
        * @Description: on click on autocomplete suggestion list update txtStreetName
        * @Type       : onkeyup Event
        * @Parameters : { sender: txtHouseNumber, e: OnKeyUp event }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.OnKeyUpValidateHouseNumber = function (sender, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            if ($("#customerSearchBox").hasClass("invalidInput") && $("#addressLookUpError").is(':visible')) {
                $("#customerSearchBox").removeClass("invalidInput");
                $("#addressLookUpError").css('display', 'none');
            }

            if ((e.keyCode == 13 || e.keyCode == 10) && $webpart.find("#btnSearchCustomer").prop('disabled') == false && $webpart.find("#ddlFloorNo").prop('disabled') == true) {

                context.ShowCustomerInfoPopup($webpart.find("#txtHouseNumber").attr("madId"), e, sender);
            }
            else {
                var houseNumberChangedDisabledControlsList = ["#btnSearchCustomer", "#ddlFloorNo"];
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Clear and siable controls in the list houseNumberChangedDisabledControlsList
                var houseNumberPattern = /^\d{1,10}[a-zA-Z]{0,1}$/g
                var filterString = sender.value.toLowerCase();
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 46) || (e.keyCode >= 65 && e.keyCode <= 90) || ((e.keyCode == 8) && filterString.length >= 1)) {
                    if (houseNumberPattern.test(filterString)) {
                        context.previousHouseNumber = filterString;
                        context.ClearAndDisableControls(houseNumberChangedDisabledControlsList, sender);
                        //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Filter houses
                        context.filteredHouses = context.filteredData.filter(function (address) {
                            return address.StreetNumber.toLowerCase().indexOf(filterString) == 0;
                        });
                        var uniqueStreetNumbers = GetUniqueValues(context.filteredHouses, "StreetNumber");
                        if (uniqueStreetNumbers.length == 1 && uniqueStreetNumbers[0].toLowerCase().replace(/[ \.]/g, "") == filterString) {
                            context.focusTextBox = "txtHouseNumber";
                            context.SelectStreetNumber(uniqueStreetNumbers[0], sender, e);
                            $(sender).removeClass('invalidInput');
                        }
                        else if (uniqueStreetNumbers.length > 1) {
                            $(sender).removeClass('invalidInput');
                            ShowAutoCompleteBox(sender, uniqueStreetNumbers, "houseSuggestionBox", "TdcSearchCustomer.SelectStreetNumber", "txtHouseNumber");
                        }
                        else if (uniqueStreetNumbers.length == 0) {
                            $(sender).addClass('invalidInput');
                        }
                    }
                    else if (filterString == "") {
                        context.previousHouseNumber = "";
                    }
                    else {
                        sender.value = context.previousHouseNumber;
                    }
                }
                else if ((e.keyCode == 40) || (e.keyCode == 38)) {
                    //Keyup and down functions
                    var $input = $webpart.find('#txtHouseNumber'),
                                 current_index = -1,
                                 $number_list = $webpart.find('#houseSuggestionBox'),
                                 index = $number_list.find('.lstSuggestions li.selected').index(),
                                 $options = $number_list.find('.lstSuggestions li'),
                                 items_total = $options.length;

                    if (e.keyCode == 38) {
                        index--;

                        // Check that we've not tried to select before the first item
                        if (index < 0) {
                            index = items_total - 1;
                        }
                        change_selection();

                        $webpart.find('#houseSuggestionBox ul').scrollTop(0);
                        var height = $webpart.find('#houseSuggestionBox ul').height();
                        var scrollHeight = $webpart.find('#houseSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                        $webpart.find('#houseSuggestionBox ul').scrollTop(scrollHeight - height);

                    } else if (e.keyCode == 40) {
                        index++;

                        // Check that index is not beyond the last item
                        if (index > items_total - 1) {
                            index = 0;
                        }
                        change_selection();

                        $webpart.find('#houseSuggestionBox ul').scrollTop(0);
                        var height = $webpart.find('#houseSuggestionBox ul').height();
                        var scrollHeight = $webpart.find('#houseSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                        $webpart.find('#houseSuggestionBox ul').scrollTop(scrollHeight - height);
                    }
                        //else if (e.keyCode == 13) {
                        //    if ($options.hasClass('selected')) {
                        //        $number_list.find('.selected').click();
                        //    }
                        //}

                    else {
                        $(this).val('');
                    };


                    function change_selection() {
                        $options.removeClass('selected');
                        $options.eq(index).addClass('selected');
                        var a = $options.eq(index).text();
                        $webpart.find("#txtHouseNumber").val(a);
                    }

                    $webpart.find('#txtHouseNumber').keydown(function (e) {
                        var code = e.keyCode || e.which;
                        if (code == '9' && !e.shiftkey) {
                            if ($options.hasClass('selected')) {
                                $number_list.find('.selected').click();
                            }
                            return false;
                        }
                        else if (code == '13') {
                            if ($options.hasClass('selected')) {
                                $number_list.find('.selected').click();
                            }
                            return false;
                        }
                    });
                }
                else if ((e.keyCode == 8) && filterString.length <= 1) {
                    context.ClearAndDisableControls(houseNumberChangedDisabledControlsList, sender);
                    $(sender).removeClass('invalidInput');
                }
            }
        };
        /**
       * @Description: on click on autocomplete suggestion list update txtStreetNumber
       * @Type       : OnClick Event
       * @Parameters : { StreetNumber: Street name to be shown in txtStreetName }
       * @Returns    : 
       * @Author     : Ajinkya Korade    @Date : 08052015   
       * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
       * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
       **/
        context.SelectStreetNumber = function (streetNumber, sender, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            $webpart.find("#txtHouseNumber").val(streetNumber);
            $webpart.find("#houseSuggestionBox").hide();
            context.filteredHouses = context.filteredData.filter(function (address) {
                return address.StreetNumber.toLowerCase().replace(/ /g, "") === streetNumber.toLowerCase().replace(/ /g, "");
            });
            //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: For Single Storey enable house icon btnSearchCustomer
            if (context.filteredHouses.length == 1 && (context.filteredHouses[0].FloorId == null || context.filteredHouses[0].FloorId == "") && (context.filteredHouses[0].SuiteId == null || context.filteredHouses[0].SuiteId == "")) {
                $webpart.find("#txtHouseNumber").removeClass('invalidInput');
                $webpart.find("#btnSearchCustomer").attr('disabled', false);
                $webpart.find("#ddlFloorNo").attr('disabled', 'true');
                $webpart.find("#btnSearchCustomer").attr('madId', context.filteredHouses[0].MadId);
                $webpart.find("#txtHouseNumber").attr('madId', context.filteredHouses[0].MadId);
                $webpart.find("#btnSearchCustomer").attr('MunicipalityCode', context.filteredHouses[0].MunicipalityCode);
                $webpart.find("#btnSearchCustomer").attr('StreetCode', context.filteredHouses[0].StreetCode);
                context.ShowCustomerInfoPopup($webpart.find('#txtHouseNumber').attr('madid'), e, sender);
                CleanDropDown('ddlFloorNo', sender);
            }
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: For Multi Storey building show ddlFloorNo dropdown
            else if (context.filteredHouses.length >= 1) {
                $webpart.find("#txtHouseNumber").removeClass('invalidInput');
                $webpart.find("#ddlFloorNo").attr('disabled', false);
                $webpart.find("#ddlFloorNo").removeClass('watermark');
                $webpart.find("#ddlFloorNo").focus();
                $webpart.find("#btnSearchCustomer").attr('disabled', 'true');
                $webpart.find("#btnSearchCustomer").attr('MunicipalityCode', context.filteredHouses[0].MunicipalityCode);
                $webpart.find("#btnSearchCustomer").attr('StreetCode', context.filteredHouses[0].StreetCode);

                context.filteredHouses = context.filteredData.filter(function (address) {
                    return address.StreetNumber.toLowerCase().replace(/ /g, "") === streetNumber.toLowerCase().replace(/ /g, "");
                });
                //var uniqueFloorSuiteId = GetUniqueValues(context.filteredHouses, "FloorSuiteId");
                ShowAutoCompleteBox(sender, context.filteredHouses, "floorSuiteIdSuggestionBox", "TdcSearchCustomer.ddlFloorSuiteChanged", "ddlFloorNo");
            }

            else if (context.filteredHouses.length == 0) {
                $webpart.find("#txtHouseNumber").addClass('invalidInput');
            }
        };


        context.OnKeyUpFloorAndSuiteID = function (sender, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            if ($("#customerSearchBox").hasClass("invalidInput") && $("#addressLookUpError").is(':visible')) {
                $("#customerSearchBox").removeClass("invalidInput");
                $("#addressLookUpError").css('display', 'none');
            }
            var filterString = sender.value.toLowerCase().trim();

            context.filteredFloorsAndSuites = context.filteredHouses.filter(function (address) {
                var floorAndSuiteId = address.FloorId + " " + address.SuiteId;
                return floorAndSuiteId.toLowerCase().indexOf(filterString) == 0;
            });
            if ((e.keyCode == 40) || (e.keyCode == 38)) {
                //Keyup and down functions
                var $input = $webpart.find('#ddlFloorNo'),
                             current_index = -1,
                             $number_list = $webpart.find('#floorSuiteIdSuggestionBox'),
                             index = $number_list.find('.lstSuggestions li.selected').index(),
                             $options = $number_list.find('.lstSuggestions li'),
                             items_total = $options.length;

                if (e.keyCode == 38) {
                    index--;

                    // Check that we've not tried to select before the first item
                    if (index < 0) {
                        index = items_total - 1;
                    }
                    change_selection();

                    $webpart.find('#floorSuiteIdSuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#floorSuiteIdSuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#floorSuiteIdSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#floorSuiteIdSuggestionBox ul').scrollTop(scrollHeight - height);

                } else if (e.keyCode == 40) {
                    index++;

                    // Check that index is not beyond the last item
                    if (index > items_total - 1) {
                        index = 0;
                    }
                    change_selection();


                    $webpart.find('#floorSuiteIdSuggestionBox ul').scrollTop(0);
                    var height = $webpart.find('#floorSuiteIdSuggestionBox ul').height();
                    var scrollHeight = $webpart.find('#floorSuiteIdSuggestionBox').find('.lstSuggestions li.selected').offset().top;
                    $webpart.find('#floorSuiteIdSuggestionBox ul').scrollTop(scrollHeight - height);
                }
                    //else if (e.keyCode == 13) {
                    //    if ($options.hasClass('selected')) {
                    //        $number_list.find('.selected').click();
                    //        $webpart.find('#combinedopensearch').focus();
                    //    }
                    //}

                else {
                    $(this).val('');
                };


                function change_selection() {
                    $options.removeClass('selected');
                    $options.eq(index).addClass('selected');
                    var a = $options.eq(index).text();
                    $webpart.find("#ddlFloorNo").val(a);
                }

                $webpart.find('#ddlFloorNo').keydown(function (e) {
                    var code = e.keyCode || e.which;
                    if (code == '9' && !e.shiftkey) {
                        if ($options.hasClass('selected')) {
                            $number_list.find('.selected').click();
                        }
                        return false;
                    }
                    else if (code == '13') {
                        if ($options.hasClass('selected')) {
                            $number_list.find('.selected').click();
                        }
                        return false;
                    }

                });
            }
            else if ((e.keyCode == 8) && filterString.length < 1) {
                $(sender).removeClass('invalidInput');
                context.SelectStreetNumber($webpart.find('#txtHouseNumber').val(), sender, e);
            }
            else {
                if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105) || (e.keyCode == 46) || (e.keyCode >= 65 && e.keyCode <= 90) || ((e.keyCode == 8) && filterString.length >= 1)) {
                    context.previousFloorAndSuiteId = filterString;
                    context.filteredFloorsAndSuites = context.filteredHouses.filter(function (address) {
                        var floorAndSuiteId = address.FloorId + " " + address.SuiteId;
                        return floorAndSuiteId.toLowerCase().indexOf(filterString) == 0;
                    });
                    var uniqueFloorAndSuiteIds = GetUniqueValues(context.filteredFloorsAndSuites, "FloorandSuiteId");
                    if (uniqueFloorAndSuiteIds.length == 1 && uniqueFloorAndSuiteIds[0].FloorandSuiteId.toLowerCase() == filterString.trim()) {
                        context.focusTextBox = "ddlFloorNo";
                        var FloorSuiteID = uniqueFloorAndSuiteIds[0].FloorandSuiteId;
                        context.ddlFloorSuiteChanged(uniqueFloorAndSuiteIds[0].FloorandSuiteId, $webpart.find("[data-floorandsuiteid='" + FloorSuiteID + "']"), e);
                        $(sender).removeClass('invalidInput');
                    }
                    else if (uniqueFloorAndSuiteIds.length > 1) {
                        $(sender).removeClass('invalidInput');
                        ShowAutoCompleteBox(sender, uniqueFloorAndSuiteIds, "floorSuiteIdSuggestionBox", "TdcSearchCustomer.ddlFloorSuiteChanged", "ddlFloorNo");
                    }
                    else if (uniqueFloorAndSuiteIds.length == 0) {
                        $(sender).addClass('invalidInput');
                    }
                }
            }
        };

        context.FocusTextBoxClicked = function (sender) {
            $('#PopupCustomerAddressLookup').modal("hide");
            $("#SearchCustomer_placeholder").find("#" + context.focusTextBox).focus();
        }

        /**
        * @Description: Clears Address Filter 
        * @Type       : Function
        * @Parameters : { sender: btnSearchCustomer }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.InitializedAddressFilter = function () {
            $('#PopupCustomerAddressLookup').modal("hide");
            var zipCodeChangedDisabledControlsList = ["#txtStreetName", "#txtHouseNumber", "#btnSearchCustomer", "#ddlFloorNo"];
            document.getElementById("txtPostalCode").value = "";
            $(document.getElementById("txtPostalCode")).removeClass('invalidInput');
            context.ClearAndDisableControls(zipCodeChangedDisabledControlsList, $('#SearchCustomer_placeholder').children());
        }
        /**
        * @Description: Calls function to display customer info popup
        * @Type       : Function
        * @Parameters : { sender: btnSearchCustomer }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.btnSearchCustomerClicked = function (sender, e) {
            context.ShowCustomerInfoPopup(sender.getAttribute("madId"), e, sender);
        };

        /**
        * @Description: Refresh on click of TryAgain
        * @Type       : Function        
        * @Author     : Radhika Pokale      @Date : 03062016           
        **/
        context.refreshTryAgain = function (sender, e) {
            var $sender = $(sender);
            if ($sender.parent('div').parent().parent().hasClass('indexTemplateContainer')) {
                TdcAsyncWebPartLoader.RefreshWP(sender);
            }
            else if ($sender.parent('div').parent().parent().parent().find('.searchTemplateContainer').hasClass('searchTemplateContainer')) {
                context.ShowCustomerInfoPopup(sender.getAttribute("madId"), e, sender);
            }
        };

        /**
        * @Description: Shows Customer Popup Dialog
        * @Type       : onCjhange event
        * @Parameters : { e: onChange Event of ddlFloorId }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.ddlFloorSuiteChanged = function (s, sender, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            $webpart.find('#ddlFloorNo').val(s);
            $webpart.find('#floorSuiteIdSuggestionBox').hide();
            //Vaibhav : DriftsInfo : set madId attribute to ddlFloorNo control because madId needed in DriftsInfo webpart
            $webpart.find("#ddlFloorNo").attr('data-floorid', $(sender).data('floorid'));
            $webpart.find("#ddlFloorNo").attr('data-suiteid', $(sender).data('suiteid'));
            $(sender).attr('data-madId', $(sender).data('madid'));
            $webpart.find("#ddlFloorNo").attr('data-madId', $(sender).data('madid'));
            $webpart.find("#txtHouseNumber").attr("madId", $(sender).data('madid'));
            $webpart.find("#btnSearchCustomer").attr('municipalitycode', $(sender).data('municipalitycode'));
            $webpart.find("#btnSearchCustomer").attr('streetcode', $(sender).data('streetcode'));
            $webpart.find('#combinedopensearch').focus();
            context.ShowCustomerInfoPopup($(sender).data('madid'), e, sender);
            //$(s).each(function () { this.selectedIndex = e.target.selectedIndex });
        };
        /**
        * @Description: Displays Customer Information popup
        * @Type       : Function
        * @Parameters : { madId: Mad ID of the address }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.ShowCustomerInfoPopup = function (madId, e, s) {
            //var filteredHouse = context.filteredData.filter(function (address) {
            //    return address.StreetNumber.toLowerCase() == txtHouseNumber.value.toLowerCase();
            //});

            //Chetan: MIO 17561-Feb 2016 Release : Added if loop
            CustomerAddressLookupPopup.inactiveFirstTimeLoad = true;
            var $webpart = $(s).closest("[id$='_placeholder']");
            if ($webpart.find('.divAddressLookUp').data('speedlookup') == false && $webpart.find('.divAddressLookUp').data('priorityproductlookup') == false) {
                $('#PopupCustomerAddressLookup').modal();
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'CustomerAddressLookupPopup',
                    context: {
                        madID: madId
                    },
                    callback: function (data) {
                        if (!(TdcMain.CancelledCustomerEnabledInPortals.indexOf(TdcAsyncWebPartLoader.portalId.toLowerCase()) >= 0)) {
                            $('#PopupCustomerAddressLookup').find(".activeInactiveTabs").hide();
                            $('#PopupCustomerAddressLookup').find(".activeTab").show();
                        }
                        //vaibhav : driftsInfo : if no lid in addresslookup popup then mad id should be null,because of without selection of lid portal will not load.
                        if ($("#LIDList tr").last().attr("data-lid") == '' ||
                           $("#LIDList tr").last().attr("data-lid") == null ||
                           $("#LIDList tr").last().attr("data-lid") == undefined) {
                            //$("#txtHouseNumber").attr("madId", "");
                            //$('#ddlFloorNo').removeAttr('data-madId'); //Diksha : new search button functionality requires madId,which was getting removed here.
                        }
                        e.preventDefault();
                        var noLidList = $("#divModalCustomerAddressLookup").find("#CustomerAddressLookupPopup_noLidList").val();
                        if (noLidList == "True") {
                            $('#PopupCustomerAddressLookup').find("#LIDList").hide();
                            $('#PopupCustomerAddressLookup').find(".lidTypeDetails.activeLid").find(".paginator").replaceWith("<br/><div style='margin-left:16px;'>Ingen Kunde på adressen</div><br/><br/><br/>");
                        }
                        else {
                            $('#PopupCustomerAddressLookup').modal();
                        }
                    },
                    errorcallback: function () {
                        $('#LIDList tbody tr').remove();
                        $('#divModalCustomerAddressLookup form').children('.row').children('.paginator').remove();
                        $('#CustomerAddressLookupPopup_placeholder').children('.toolOverlay').attr('style', "height: 110px; width: 460px;");
                        e.preventDefault();
                        // context.Emergencycustomerlookup(s, madId);
                    }
                });
            }
            else {
                var floor = "";
                var side = "";
                if (!$webpart.find('#ddlFloorNo').is(':disabled')) {
                    floor = $(s).attr("data-floorid");
                    side = $(s).attr('data-suiteid');
                    //floor = $webpart.find('#ddlFloorNo :selected').attr("data-floorid");
                    //side = $webpart.find('#ddlFloorNo :selected').attr('data-suiteid');
                }

                var streetcode = $webpart.find("#btnSearchCustomer").attr('streetcode');
                var municipalitycode = $webpart.find("#btnSearchCustomer").attr('municipalitycode');
                if ($webpart.find('.divAddressLookUp').data('speedlookup') == true)
                    SpeedCalculatorControl.SpeedLookUpUsingAddress($webpart.find('#txtPostalCode').val(), $webpart.find('#txtStreetName').val(), $webpart.find('#txtHouseNumber').val(), floor, side, s);

                else if ($webpart.find('.divAddressLookUp').data('priorityproductlookup') == true) {

                    ToolPriorityProductDetails.GetPriorityProductsUsingAddress($webpart.find('#txtPostalCode').val(), municipalitycode, streetcode, $webpart.find('#txtStreetName').val(), $webpart.find('#txtHouseNumber').val(), floor, side, s);
                }
            }
            e.preventDefault();
        }


        /**
        * @Description: Makes call to MAD service and retrieves addreses based on the filters
        * @Type       : Function
        * @Parameters : { postCode: postal code, firstThreeLetters: first three letters to do wildcard search
                          sender: txtStreetName, filterString: txtStreetName.value}
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        function RefreshMADAddresses(postCode, firstThreeLetters, sender, filterString) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'AddressLookUp',
                action: 'SearchAddress',
                context: {
                    AddressSearchEntity: GetAddressSearchEntity(postCode, firstThreeLetters)
                },
                messageProcess: "Adressesøgning er i gang",
                callback: function (data) {
                    try {
                        window.addressDataCache = JSON.parse(data).Addresses;
                        context.AddressesUndefinedflag = false;
                    }
                    catch (err) {
                        window.addressDataCache = [];
                        context.AddressesUndefinedflag = true;
                    }
                    $webpart.find("#streetSuggestionBox").hide();
                    GetAndUpdateSuggestionBox(sender, filterString, "txtStreetName")
                    return false;
                },
                errorcallback: function () {
                    //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Enable UndefinedFlag which stores true when error in service  
                    $webpart.find("#streetSuggestionBox").hide();
                    context.AddressesUndefinedflag = true;
                    var errorTitle = "Søgningen fejlede";
                    TdcUI.createMessage(errorTitle, TdcUI.messageOptions.error, null, false, sender, "", "");
                    return false;
                },
            }, sender);

        };

        function RefreshMADCityAddresses(firstLetter, sender, filterString, e) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'AddressLookUp',
                action: 'IsValidZipCode',
                callback: function (data) {
                    try {
                        window.ZipCodeDataCache = JSON.parse(data);
                        context.AddressesUndefinedflag = false;
                    }
                    catch (err) {
                        window.addressDataCache = [];
                        context.AddressesUndefinedflag = true;
                    }
                    $webpart.find("#postalCodeCitySuggestionBox").hide();
                    GetAndUpdateCitySuggestionBox(sender, filterString, e, "txtPostalCode");
                    return false;
                },
                errorcallback: function () {
                    $webpart.find("#addressLookUpError").css('display', 'block');
                    //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Enable UndefinedFlag which stores true when error in service  
                    $webpart.find("#postalCodeCitySuggestionBox").hide();
                    context.AddressesUndefinedflag = true;
                },
                messageProcess: "Søger efter resultater",
            }, sender);

        };

        /**
        * @Description: This is used as callback function to show or hide suggestion box based on the conditions
        * @Type       : Function
        * @Parameters : { sender: txtStreetName, filterString: txtStreetName.value}
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        function GetAndUpdateSuggestionBox(sender, filterString, textBoxId) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            context.filteredData = window.addressDataCache.filter(function (address) {
                return address.StreetName.toLowerCase().replace(/[ ]/g, "").indexOf(sender.value.toLowerCase().replace(/[ ]/g, "")) == 0;
            });
            var uniqueStreetNames = GetUniqueValues(context.filteredData, "StreetName");
            //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: For valid streetName select the streetname into txtStreetName
            if (uniqueStreetNames.length == 1 && uniqueStreetNames[0].toLowerCase().replace(/[ ]/g, "") == filterString) {
                context.SelectStreetName(uniqueStreetNames[0], sender);
                $(sender).removeClass('invalidInput');
            }
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: For inValid streetName show invalid input error
            else if (uniqueStreetNames.length == 0 && context.AddressesUndefinedflag == false) {
                $(sender).addClass('invalidInput');
                $webpart.find("#addressLookUpError").css('display', 'block');
                $webpart.find("#streetSuggestionBox").hide();
            }
            else {
                ShowAutoCompleteBox(sender, uniqueStreetNames, "streetSuggestionBox", "TdcSearchCustomer.SelectStreetName", textBoxId);
            }
        }

        function GetAndUpdateCitySuggestionBox(sender, filterString, e, textBoxId) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            var re = /^[\d]+/;
            context.filteredData = window.ZipCodeDataCache.filter(function (postalCodeDetails) {
                var filterStringSub = filterString.charAt(0);
                if ($.isNumeric(filterStringSub)) {
                    return (postalCodeDetails.ZipDistrict.toLowerCase().replace(/[ ]/g, "").indexOf(sender.value.toLowerCase().replace(/[ ]/g, "")) == 0);
                }
                else {
                    return (postalCodeDetails.ZipDistrict.toLowerCase().replace(/[ ]/g, "").indexOf(sender.value.toLowerCase().replace(/[ ]/g, "")) == 4);
                }
            });
            var uniquePostAreas = GetUniqueValues(context.filteredData, "ZipDistrict");
            //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: For valid streetName select the streetname into txtStreetName
            if (uniquePostAreas.length == 1 && uniquePostAreas[0].toLowerCase().replace(/[ ]/g, "") == filterString) {
                context.SelectPostAreasName(uniquePostAreas[0], sender);
                $(sender).removeClass('invalidInput');
            }
                //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 08052015:: Fsssor inValid streetName show invalid input error
            else if (uniquePostAreas.length == 0 && context.AddressesUndefinedflag == false) {
                $(sender).addClass('invalidInput');
                $webpart.find("#addressLookUpError").css('display', 'block');
                //TdcUI.createMessage(TranslationsJs.InvalidZipCode, TdcUI.messageOptions.error, null, false, sendernew,"postalCodeCity");
                $webpart.find("#postalCodeCitySuggestionBox").hide();
            }
            else {
                ShowAutoCompleteBox(sender, uniquePostAreas, "postalCodeCitySuggestionBox", "TdcSearchCustomer.SelectPostAreasName", textBoxId);
            }
        }
        /**
        * @Description: creates entity to be passed over to MAD address service to retrieve addresses
        * @Type       : Function
        * @Parameters : { postCode: postal code, firstThreeLetters: first three letters to do wildcard search }
        * @Returns    : Entity Object
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        function GetAddressSearchEntity(postCode, firstThreeLetters) {
            return {
                AddressType: "SPECIFIC",
                Max: 6000,
                UserName: "",
                Parameters: [
                    { "key": "postCode", "value": postCode },
                    { "key": "streetName", "value": firstThreeLetters }
                ]
            }
        }

        /**
        * @Description: write list of street names to #streetSuggestionBox div and show the list below txtStreetName
        * @Type       : Function
        * @Parameters : { streetNames: list of streetNames }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        function ShowAutoCompleteBox(sender, uniqueValues, divID, embedFunctionName, textBoxId) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            suggestionList = "<ul id='lst" + divID + "' class='lstSuggestions'>";
            if (uniqueValues.length > 0) {
                $(sender).removeClass('invalidInput');
            }
            if (divID == "floorSuiteIdSuggestionBox") {

                //below code is for customm sorting order like: -, KL, KL1, KL2, ST, ST TV, ST TH, 1 TH, 2 TV etc. 
                var alphaNumVal = [];
                var alphaBetVal = [];
                var spclVal = [];
                var numeVal = [];
                var KLVal = [];
                var KL_AlpnaNumeric = [];
                var STVal = [];
                var ST_AlphaNumeric = [];

                var alphaNum = /^[A-Za-z0-9\s]+$/;
                var alphaBet = /^[a-zA-Z\s]+$/;
                var spcl = /^[-\s]*$/;
                var nume = /^[0-9\s]*$/;


                $.each(uniqueValues, function (i, value) {

                    var FloorandSuiteId = value["FloorandSuiteId"];

                    if (spcl.test(FloorandSuiteId)) {
                        spclVal = spclVal +
                         "<li data-floorandsuiteid = '" + FloorandSuiteId +
                         "' data-floorid = '" + value["FloorId"] +
                         "' data-suiteid = '" + value["SuiteId"] +
                         "' data-madid='" + value["MadId"] +
                         "' data-municipalitycode= '" + value["MunicipalityCode"] +
                         "' data-streetcode= '" + value["StreetCode"] +
                         "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                         "</li>";
                        return true;
                    }
                    else if ((FloorandSuiteId.toLowerCase().trim() == "kl")) {
                        KLVal = KLVal +
                           "<li data-floorandsuiteid = '" + FloorandSuiteId +
                           "' data-floorid = '" + value["FloorId"] +
                           "' data-suiteid = '" + value["SuiteId"] +
                           "' data-madid='" + value["MadId"] +
                           "' data-municipalitycode= '" + value["MunicipalityCode"] +
                           "' data-streetcode= '" + value["StreetCode"] +
                           "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                           "</li>";
                        return true;
                    }
                    else if ((FloorandSuiteId.toLowerCase()).indexOf("kl") >= 0) {
                        KL_AlpnaNumeric = KL_AlpnaNumeric +
                           "<li data-floorandsuiteid = '" + FloorandSuiteId +
                           "' data-floorid = '" + value["FloorId"] +
                           "' data-suiteid = '" + value["SuiteId"] +
                           "' data-madid='" + value["MadId"] +
                           "' data-municipalitycode= '" + value["MunicipalityCode"] +
                           "' data-streetcode= '" + value["StreetCode"] +
                           "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                           "</li>";
                        return true;
                    }
                    else if ((FloorandSuiteId.toLowerCase().trim() == "st")) {
                        STVal = STVal +
                           "<li data-floorandsuiteid = '" + FloorandSuiteId +
                           "' data-floorid = '" + value["FloorId"] +
                           "' data-suiteid = '" + value["SuiteId"] +
                           "' data-madid='" + value["MadId"] +
                           "' data-municipalitycode= '" + value["MunicipalityCode"] +
                           "' data-streetcode= '" + value["StreetCode"] +
                           "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                           "</li>";
                        return true;
                    }
                    else if ((FloorandSuiteId.toLowerCase()).indexOf("st") >= 0) {
                        ST_AlphaNumeric = ST_AlphaNumeric +
                           "<li data-floorandsuiteid = '" + FloorandSuiteId +
                           "' data-floorid = '" + value["FloorId"] +
                           "' data-suiteid = '" + value["SuiteId"] +
                           "' data-madid='" + value["MadId"] +
                           "' data-municipalitycode= '" + value["MunicipalityCode"] +
                           "' data-streetcode= '" + value["StreetCode"] +
                           "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                           "</li>";
                        return true;
                    }
                    else if (alphaBet.test(FloorandSuiteId)) {
                        alphaBetVal = alphaBetVal +
                           "<li data-floorandsuiteid = '" + FloorandSuiteId +
                           "' data-floorid = '" + value["FloorId"] +
                           "' data-suiteid = '" + value["SuiteId"] +
                           "' data-madid='" + value["MadId"] +
                           "' data-municipalitycode= '" + value["MunicipalityCode"] +
                           "' data-streetcode= '" + value["StreetCode"] +
                           "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                           "</li>";
                        return true;
                    }
                    else if (nume.test(FloorandSuiteId)) {
                        numeVal = numeVal +
                            "<li data-floorandsuiteid = '" + FloorandSuiteId +
                            "' data-floorid = '" + value["FloorId"] +
                            "' data-suiteid = '" + value["SuiteId"] +
                            "' data-madid='" + value["MadId"] +
                            "' data-municipalitycode= '" + value["MunicipalityCode"] +
                            "' data-streetcode= '" + value["StreetCode"] +
                            "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                            "</li>";
                        return true;
                    }
                    else if (alphaNum.test(FloorandSuiteId)) {
                        alphaNumVal = alphaNumVal +
                            "<li data-floorandsuiteid = '" + FloorandSuiteId +
                            "' data-floorid = '" + value["FloorId"] +
                            "' data-suiteid = '" + value["SuiteId"] +
                            "' data-madid='" + value["MadId"] +
                            "' data-municipalitycode= '" + value["MunicipalityCode"] +
                            "' data-streetcode= '" + value["StreetCode"] +
                            "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + FloorandSuiteId +
                            "</li>";
                        return true;
                    }
                    //suggestionList = suggestionList +
                    //    "<li data-floorandsuiteid = '" + FloorandSuiteId + "' data-floorid = '" + value["FloorId"] + "'  data-suiteid = '" + value["SuiteId"] + "' data-madid='" + value["MadId"] + "' data-municipalitycode= '" + value["MunicipalityCode"] + "' data-streetcode= '" + value["StreetCode"] + "' onClick=\"" + embedFunctionName + "('" + value["FloorId"] + " " + value["SuiteId"] + "', $(this) , event );\">" + value["FloorId"] + " " + value["SuiteId"] + "</li>";
                });
                suggestionList = suggestionList + spclVal + KLVal + KL_AlpnaNumeric + STVal + ST_AlphaNumeric + alphaBetVal + alphaNumVal + numeVal;
            }
            else if (divID == "houseSuggestionBox") {
                $.each(uniqueValues, function (i, value) {
                    suggestionList = suggestionList +
                        "<li onClick=\"" + embedFunctionName + "('" + value + "', $(this), event );\">" + value + "</li>";
                });
            }
            else {
                $.each(uniqueValues, function (i, value) {
                    suggestionList = suggestionList +
                        "<li onClick=\"" + embedFunctionName + "('" + value + "', $(this) );\">" + value + "</li>";
                });
            }
            suggestionList = suggestionList + "</ul>";
            $webpart.find("#" + divID).show();
            $webpart.find("#" + divID).html(suggestionList);

            $(".lstSuggestions li").each(function () {
                var filter = $webpart.find("#" + textBoxId).val();
                var m = $(this).text();
                var reg = new RegExp(filter, "i");
                var n = m.match(reg);
                var p = m.replace(reg, "<b>" + n + "</b>");
                $(this).html(p);
                $webpart.show();
            });

            if (uniqueValues.length > 8) {
                $('.lstSuggestions').addClass('addresslookupscroll');
            }
        };

        /**
        * @Description: Filter's unique street names from the list of addresses
        * @Type       : Function
        * @Parameters : { filteredData: list of addresses }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        function GetUniqueValues(filteredData, property) {
            var uniqueValues = [];
            $.each(filteredData, function () {
                if ($.inArray(this[property], uniqueValues) === -1) {
                    if (property == "FloorandSuiteId") {
                        uniqueValues.push(this);
                    }
                    else {
                        uniqueValues.push(this[property]);
                    }
                }
            });
            return uniqueValues;
        };
        /**
        * @Description: clear and disable controls passed in array
        * @Type       : Function
        * @Parameters : { controlsArray: list of control IDs to be disabled and cleared }
        * @Returns    : 
        * @Author     : Ajinkya Korade    @Date : 08052015   
        * @Project    : TREFOR_1.5_REQ_2  @TFS  : 1501     
        * @History    : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes}
        **/
        context.ClearAndDisableControls = function (controlsArray, sender) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            $webpart.find("#streetSuggestionBox").hide();
            $webpart.find("#houseSuggestionBox").hide();
            $webpart.find("#postalCodeCitySuggestionBox").hide();
            $webpart.find('#floorSuiteIdSuggestionBox').hide();
            $.each(controlsArray, function (i, controlID) {
                var control = $webpart.find(controlID);
                control.attr('disabled', true);
                if (control.attr('id').indexOf('txt') == 0 || control.attr('id').indexOf('ddl') == 0)//|| control.attr('id').indexOf('btn') == 0) 
                {
                    control.val("");
                    $(control).removeClass('invalidInput');
                    if (controlID == "#txtHouseNumber") {
                        context.previousHouseNumber = "";
                    }
                }
                else if (control.attr('id').indexOf('ddl') == 0) {
                    CleanDropDown(controlID, sender);
                }

            });
        };
        function CleanDropDown(controlID, sender) {
            var $webpart = $(sender).closest("[id$='_placeholder']");
            var control = $webpart.find(controlID);
            $(control).empty();
            $webpart.find('#ddlFloorNo').append($('<option>', {
                value: "",
                text: TranslationsJs.Select_Floor,
                style: "display:none",
                selected: "true"
            })).attr("data-floorid", "").attr("data-suiteid", "");
        };



    })(TdcSearchCustomer);

    $(document).ready(TdcSearchCustomer.init);

})(jQuery);