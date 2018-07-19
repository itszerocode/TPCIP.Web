/// <reference path="guidemanager.js" />
/// <reference path="asyncwebpartloader.js" />
if (TdcMain == null || typeof (TdcMain) != "object") {
    var TdcMain = new Object();
}

(function ($) {

    (function (context) {
        context.MenuSpecificGuideToolsForInActiveLid = {
            ch_kundeservice: [

            ],
            ch_salg: [

            ],
            ch_regning: [

            ],
            ch_save: [

            ],
            ch_butik: [

            ],
            ch_back: [

            ],
        };

        context.MenuSpecificGuideTools = {//// CIP-384 to CIP-388
            ch_kundeservice: [

            ],
            ch_salg: [

            ],
            ch_regning: [

            ],
            ch_save: [

            ],
            ch_butik: [
                'ToolDkpCustomerAdmin',
            ],
            ch_back: [

            ],
            ch_scale: [
                'ToolHouseholdDetails',
            ],
            ch_support: [

            ],
            onsite_kobber: [
            ],
            onsite_coax: [
                 'ToolOperationInfo'

            ],
            onsite_fiber: [

            ],
            //onsite_Mineordre: [
            //   'ToolMyOrderGuideTool'
            //],
            onsite_Ordredetaljer: [                
               
            ],
            onsite_Produkter: [

            ],
            onsite_Fremforing: [

            ],
            onsite_bygning: [
                
            ],
            onsite_scale: [
                
            ],
            onsite_mobil: [
                 
            ],
            onsite_stationsdrift: [
                 
            ],

        };

        context.MenuSpecificGAAGuideToolsForInActiveLid = {
            ch_kundeservice: [
                 'ToolCancelledProducts', //'ToolCustomerContactLog', 'ToolConsolidatedNote'
            ],
            ch_salg: [
                'GAASelector'
            ],
            ch_regning: [
                'GAASelector'
            ],
            ch_save: [
                'GAASelector'
            ],
            ch_butik: [
                'GAASelector'
            ],
            ch_back: [
               'GAASelector'
            ],
        };

        context.MenuSpecificGAAGuideTools = {
            ch_kundeservice: [
                'ToolCustomerOverview', 'ToolPriorityProduct', 'ToolVASOverview'
            ],
            ch_salg: [
                'GAASelector'
            ],
            ch_regning: [
                'GAASelector'
            ],
            ch_save: [
                'GAASelector'
            ],
            ch_butik: [
                'GAASelector'
            ],
            ch_back: [
               'GAASelector'
            ],
            ch_scale: [
                'GAASelector',
            ],
            ch_support: [
                'GAASelector'
            ],
            onsite_kobber: [
               'GAASelector',
            ],
            onsite_coax: [
                'GAASelector'
            ],
            onsite_fiber: [
                'GAASelector'
            ],
            //onsite_Mineordre: [
           
            //],
            onsite_Ordredetaljer: [
                 'GAASelector'
            ],
            onsite_Produkter: [
                 'GAASelector'
            ],
            onsite_Fremforing: [
                 'GAASelector'
            ],
            onsite_bygning: [
                 'GAASelector'
             ],
            onsite_scale: [
                 'GAASelector'
             ],
            onsite_mobil: [
                 'GAASelector'
             ],
            onsite_stationsdrift: [
                 'GAASelector'
             ],
            csam_tsc: [
               'ToolTsc'
                ],
        };

        context.MenuSpecificToolsForInActiveLid = {
            ch_kundeservice: [
               'ToolTimeline'//'ToolPriorityProduct', 
            ],
            ch_salg: [

            ],
            ch_regning: [
                
            ],
            ch_save: [

            ],
            ch_butik: [
                
            ],
            ch_back: [

            ],
        };

        context.MenuSpecificTools = {//// CIP-384 to CIP-388
            ch_kundeservice: [
                'CustomerOpenCases', 'CustomerClosedCases', 'ToolCustomerOrderDetails', 'ToolTimeline'
            ],
            ch_salg: [
                     'ParkedGuides', 'CustomerOpenCases', 'ToolProducts',
            ],
            ch_regning: [
                      'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolBillingDetails', 'ToolConsumption',
            ],
            ch_save: [
                  'ParkedGuides', 'CustomerOpenCases', 'ToolProducts',
            ],
            ch_butik: [
                   'ToolConsumption', 'ToolBillingDetails', 'ToolSendPassword',
            ],
            ch_back: [
                    'ParkedGuides', 'CustomerOpenCases', 'ToolProducts',
            ],
            ch_scale: [
                  'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts',
            ],
            ch_support: [
                'ParkedGuides', 'CustomerOpenCases', 'ToolProducts',
            ],
            onsite_coax: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_fiber: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_kobber: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            //onsite_Mineordre: [
            //    'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            //],
            onsite_Ordredetaljer: [
               'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolCustomerOrderDetails', 'ToolOVfasDetails', 'ToolLinks'
            ],
            onsite_Produkter: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_Fremforing: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_bygning: [
               'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_scale: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_mobil: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            onsite_stationsdrift: [
                 'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolCustomerOrderDetails', 'ToolLinks'
            ],
            csam_tsc: [
                 'CustomerOpenCases', 'CustomerClosedCases', 'CustomerHistoryInformation'
                ],
            all_Tools: [
                'CustomerHistoryInformation', 'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'ToolProducts', 'ToolBillingDetails', 'ToolCustomerOrderDetails', 'ToolConsumption', 'ToolSendPassword', 'ToolHomeNetworkDiagnostic', 'ToolOVfasDetails', 'ToolLinks', 'ToolTimeline'
            ],
        };
        context.MenuSpecificTabbedSession = {

            //onsite_Mineordre: [
            //  'ToolMyOrderGuideTool'
            //],
            onsite_Produkter: [
                'ToolProductDetails'
            ],
            onsite_Fremforing: [
                'ToolConnectionPath', 'ToolGalvanicMeasurement'
            ],
            onsite_Ordredetaljer: ['ToolCustomerOrderText', 'ToolCuCommentsDetails', 'ToolPreviousTickets', 'ToolSmartGuides'],
        };
        
        context.PortalSpecificCollapseToolList = {

            CIP: [
            ],

            TP: [
            ],

            MyTP: [
                'CustomerClosedCases', 'ParkedGuides', 'CustomerOpenCases', 'CustomerHistoryInformation'
            ],
        };

        context.goToDashboard = false;
        context.atleastOneNoteSaved = false;
        context.UserDepartment = "";             
        context.etrayCIPTagsValues = [];
        context.isBatchUser = "";        
        context.LoggedUserId = "";
        context.LoggedUserName = "";
        context.CancelledCustomerEnabledInPortals = [];

        context.init = function () {
            window.onunload = function () {
                if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {
                    TdcGuideManager.parkOpenedGuides(true);
                }
            };

            context.UserDepartment = $('#cip_content_container #cip_content').data("departmentname");

            $(window).load(function () {

                $('script.TpCipJS').each(function () {
                    var filePath = $(this).attr('src');
                    var fileName = filePath.substr(filePath.lastIndexOf("\\"));// /toolJs.js?rev=1212
                    var fileRefCount =$(this).nextAll('script[src$="' + fileName + '"]').length;
                    if (fileRefCount > 0)// > 0 since nextAll get next siblings in order
                    {
                        fileRefCount++;
                        console.log(fileName.substr(1,fileName.lastIndexOf("?")) + ' was found '+ fileRefCount +' times.');
                    }
                });

                //if IsRefresh cookie exists
                var IsRefresh = context.getCookie("IsRefresh");
                if (IsRefresh != null && IsRefresh != "") {
                    //cookie exists then you refreshed this page(F5, reload button or right click and reload)
                    var NoteContext = context.getCookie("NoteContext");
                    var temp = NoteContext.split("@@@");
                    var customerId = temp[0];
                    var parentAccountNo = temp[1];
                    var svarsted = temp[2];
                    var contextId = temp[3];
                    var selectedSectionName = temp[4];
                    context.DeleteCookie("IsRefresh");
                    context.DeleteCookie("NoteContext");
                    //console.log("Cookie found and deleted");
                    TdcSearchCustomer.Clearcacheonrefresh(customerId);
                    TdcGuideSelector.saveNoteOnRefreshClick(customerId, parentAccountNo, svarsted, contextId, selectedSectionName);
                }
            })

            fixLeftPanelHandlePositionVertically();
            fixRightPanelHandlePositionVertically();

            $("#Explanation_placeholder").on("click", ".articleHeader", function () {
                $(this).next().toggle();
            });

            $(document).on("click", ".clickRatesButton", function () {
                var $sender = $(this);
                var buttonName = $sender.data("buttonname");
                var buttonToolName = $sender.data("toolname");
                var userId = $("#cip_content").data("userid");
                var departmentName = $("#cip_content").data("departmentname");

                TdcAsyncWebPartLoader.DoAction({
                    toolname: 'CustomerInformation',
                    action: 'ButtonClickedEvent',
                    context: {
                        buttonName: buttonName,
                        userId: userId,
                        departmentName: departmentName,
                        toolName: buttonToolName
                    },
                    callback: function (data) {
                    },
                    errorcallback: function (data) {
                    },
                });
            });
        };

        context.setCookie = function (c_name, value, exdays) {
            var exdate = new Date();
            exdate.setDate(exdate.getDate() + exdays);
            var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
            document.cookie = c_name + "=" + c_value;
        };

        context.getCookie = function (c_name) {
            var i, x, y, ARRcookies = document.cookie.split(";");
            for (i = 0; i < ARRcookies.length; i++) {
                x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
                y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
                x = x.replace(/^\s+|\s+$/g, "");
                if (x == c_name) {
                    return unescape(y);
                }
            }
        };

        context.DeleteCookie = function (name) {
            document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT;';
        };

        context.portalSection = undefined;

        context.changePortalSection = function (portalSection, callback, isHop2fakt, customerId) {
           
            var CurrentCustomerId = TdcMain.goToDashboard != true ? TdcCustomerInformation.getSelectedCustomerId() : "";
            if (isHop2fakt != undefined && isHop2fakt.toLowerCase() == "true") {
                CurrentCustomerId = customerId;
            }

            if (portalSection != context.portalSection) {
                var $navBar = $('.navbar-collapse');
                var $newMenuItem = $navBar.find("[data-portalsectionname='" + portalSection + "']");
                if ($newMenuItem.length > 0) {
                    $navBar.find('.aktiveTabCustom').removeClass('aktiveTabCustom');
                    $newMenuItem.addClass('aktiveTabCustom');

                    context.portalSection = portalSection;

                    if (TdcCustomerInformation.NoCustomerFound == true) {
                        return;
                    }

                    if (TdcCustomerInformation.NoCustomerFoundWithAddress == true) {
                        return;
                    }

                    if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP && portalSection == "csam_tsc" && CurrentCustomerId != undefined) {
                        TdcUI.hideRightPanel($('#tdc_rightPanelHandle'));
                    }
                    else {
                        TdcUI.showRightPanel($('#tdc_rightPanelHandle'));
                    }



                    //vaibhav : driftsInfo : calling this function only on changing portal tab section 
                    //                       and driftsInfo webpart load only support(CIP)/kobber(TP)/fiber(TP) menu tab
                    var madId = $("#txtHouseNumber").attr("madId");
                    if (madId == undefined) {
                        madId = $('#ddlFloorNo').attr('data-madId');
                    }

                    //if (madId != undefined && madId != '') {
                    //    CurrentCustomerId = "";
                    //}
                    if ((CurrentCustomerId != undefined && CurrentCustomerId != "") || (madId != undefined && madId != '')) {
                        TdcMain.loadPortalSectionTool(CurrentCustomerId, madId, callback);
                    }

                }
            } else {
                if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                }
                else {
                $('#GAASelectorNote_placeholder textarea').trigger("click");
                $('#GAASelectorNote_placeholder textarea').focus();
                }


                if (CurrentCustomerId != undefined && CurrentCustomerId != "") {
                    TdcMain.loadPortalSectionTool(CurrentCustomerId, undefined);
                }
                if (callback != null && callback != undefined) {
                    callback();
                }
            }
        };

        //vaibhav : driftsInfo : add loadPortalSectionTool() for 
        context.loadPortalSectionTool = function (customerId, madId, callback, activateGAASelector) {

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP || TdcCustomerInformation.ToolCustomerTaskIDFSM != "" || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                TdcPageStatesManager.OnCustomerloadofPortal();
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC) {
                TdcUI.hideRightPanel($('#tdc_rightPanelHandle'));
            }
            if(TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP && TdcMyOrder.userType != "COAX"){
             $("#CSAM_placeholder").hide();
            }


            //For MyTP noter loading - start
            TdcMyOrder.MyTPNoterLoad();
            //For MyTP noter loading - end

            var tools = context.MenuSpecificGAAGuideTools[context.portalSection];
            if(TdcCustomerInformation.isInActiveLid == true)//TdcAsyncWebPartLoader.portalId == 'CIP' && 
            {
                tools = context.MenuSpecificGAAGuideToolsForInActiveLid[context.portalSection];
            }

            if (tools != undefined) {

                //impemented for MyTP- start
                var GAAportalSection = TdcMain.portalSection;
                if ((GAAportalSection == "onsite_Ordredetaljer" || GAAportalSection == "onsite_Produkter" || GAAportalSection == "onsite_Fremforing") && TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {
                    GAAportalSection = TdcMyOrder.CustomerportalSectionName;
                }
                //impemented for MyTP- end

                for (var i = 0; i < tools.length; i++) {
                    var webpartName = tools[i];
                    var $placeholder = $('#' + webpartName + '_placeholder');
                    var tab = $(TdcTabManager.$getTabs()).filter(".pinnedToEnd").first();
                    $placeholder.show();
                    if ($("." + webpartName + "[data-noteid='" + TdcGuideSelector.tabType + "']").length == 0 || webpartName == TdcGuideSelector.tabType) {//load tool only for first time
                        TdcAsyncWebPartLoader.ShowTool({
                            toolname: webpartName,
                            toolType: "GAATool",
                            action: "Index",
                            portalSection: TdcMain.portalSection,
                            noteId: TdcGuideSelector.tabType,
                            context: {
                                customerId: TdcCustomerInformation.getSelectedCustomerId(),
                                accountNumber: TdcCustomerInformation.getSelectedCustomerAccountNo(),
                                noteId: TdcGuideSelector.tabType,
                                toolType: "GAATool",
                                portalSection: GAAportalSection,
                                deviceType: TdcGuideSelector.findBootstrapEnvironment()
                            },
                        });
                    }
                }
            }

            var tools = context.MenuSpecificGuideTools[context.portalSection];
            if (TdcCustomerInformation.isInActiveLid == true)//TdcAsyncWebPartLoader.portalId == 'CIP' && 
            {
                tools = context.MenuSpecificGuideToolsForInActiveLid[context.portalSection];
            }
            if (tools != undefined) {
                for (var i = 0; i < tools.length; i++) {
                    var webpartName = tools[i];
                    var $placeholder = $('#' + webpartName + '_placeholder');
                    $placeholder.show();
                    if ($("." + webpartName + "[data-noteid='" + context.portalSection + "']").length == 0) {//load tool only for first time
                        TdcAsyncWebPartLoader.ShowTool({
                            toolname: webpartName,
                            toolType: "MenuTool",
                            action: "Index",
                            noteId: context.portalSection,
                            context: {
                                customerId: TdcCustomerInformation.getSelectedCustomerId(),
                                accountNumber: TdcCustomerInformation.getSelectedCustomerAccountNo(),
                                noteId: context.portalSection,
                                toolType: "MenuTool",
                                portalSection: TdcMain.portalSection,
                                deviceType: TdcGuideSelector.findBootstrapEnvironment()
                            },
                        });
                    }
                    if (webpartName == "ToolOperationInfo" && ((customerId.charAt(0) != "6" || customerId.length != 9) && customerId.charAt(0) != "Y")) {
                        $placeholder.hide();
                    }
                }
            }

            var tools = context.MenuSpecificTools['all_Tools'];
            if (tools != undefined) {
                for (var i = 0; i < tools.length; i++) {
                    var webpartName = tools[i];
                    var $placeholder = $('#' + webpartName + '_placeholder');
                    $placeholder.hide();
                }
            }

            var tools = context.MenuSpecificTools[context.portalSection];
            if (TdcCustomerInformation.isInActiveLid == true)//TdcAsyncWebPartLoader.portalId == 'CIP' && 
            {
                tools = context.MenuSpecificToolsForInActiveLid[context.portalSection];
            }
            if (tools != undefined) {

                var toolContext = {
                    customerId: customerId,
                    BierInstallationId: TdcCustomerInformation.BierInstallationId,
                    OrderType: TdcCustomerInformation.OrderType,
                    accountNo: $('#CustomerInformationDetails_AccountId').text(),
                    taskId: TdcCustomerInformation.ToolCustomerTaskIDFSM,
                    isCancelledCustomer: TdcCustomerInformation.isInActiveLid == true ? true : false,
                };
                for (var i = 0; i < tools.length; i++) {
                    var webpartName = tools[i];
                    if (webpartName != "ToolCustomerOrderDetails" && webpartName != "ToolOVfasDetails") {
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.show();
                        if ($.trim($placeholder.html()) == "") {
                            if (webpartName == "ToolProducts") {
                                ToolProducts.LoadTool(toolContext);
                            }
                            else {
                                TdcAsyncWebPartLoader.ShowTool({
                                    toolname: webpartName,
                                    context: toolContext,
                                    callback: function (html) {
                                        context.CollapsetoolbyDefault(TdcAsyncWebPartLoader.portalId, html);
                                    }
                                });
                            }
                        }
                    }
                    else if (webpartName == "ToolOVfasDetails" && TdcMyOrder.FSMOrderType == "OVFASO") {
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.show();
                        TdcAsyncWebPartLoader.ShowTool({
                            toolname: webpartName,
                            context: toolContext,
                            callback: function (html) {
                                context.CollapsetoolbyDefault(TdcAsyncWebPartLoader.portalId, html);
                            }
                        });

                    }
                    else if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP && webpartName == "ToolCustomerOrderDetails" && TdcCustomerInformation.ToolCustomerTaskIDFSM != "") {
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.show();
                        if ($.trim($placeholder.html()) == "") {

                            TdcAsyncWebPartLoader.ShowTool({
                                toolname: webpartName,
                                context: toolContext,
                                callback: function (html) {
                                    context.CollapsetoolbyDefault(TdcAsyncWebPartLoader.portalId, html);
                                }
                            });
                        }
                    }

                }

                TdcCustomerInformation.ToolCustomerIDFSM = customerId;
            }

            if (TdcCustomerInformation.ToolCustomerTaskIDFSM != "" && TdcCustomerInformation.ToolCustomerTaskIDFSM != undefined) {
               
            var tools = context.MenuSpecificTabbedSession[context.portalSection];
            if (tools != undefined) {
                activateGAASelector = false;
                var portalSection = context.portalSection;
                var title = context.portalSection.split('_')[1].toLowerCase() == 'fremforing' ? decodeURI('Fremf%C3%B8ring') : context.portalSection.split('_')[1];
                $("#placeholder_actionbuttons").insertBefore($('#' + tools[0] + '_placeholder'));
                var $existingTab = TdcTabManager.$findTab({ noteId: portalSection });
                if ($existingTab.length != 0) {
                    
                   // event.preventDefault();
                    TdcTabManager.activateTab($existingTab);
                }
                else {
                    var dataContext = {
                        customerId: TdcCustomerInformation.ToolCustomerIDFSM,
                        tabType: TdcGuideSelector.linkTabType,
                        noteId: portalSection,
                        //placeholder: toolNewPlaceholder,
                        taskId: TdcCustomerInformation.ToolCustomerTaskIDFSM,
                        accountNo: $('#CustomerInformationDetails_AccountId').text(),
                    };
                    var $tab = TdcTabManager.addNewTab(title, dataContext, false, false, true);
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];

                        if (webpartName != 'ToolCustomerOrderText' || (webpartName == 'ToolCustomerOrderText' && TdcMyOrder.FSMOrderType != 'INSTALL')) {
                        if (webpartName != 'ToolPreviousTickets' || (webpartName == 'ToolPreviousTickets' && TdcMyOrder.FSMOrderType == 'FMFASO')) {
                            if (webpartName != 'ToolCuCommentsDetails' || (webpartName == 'ToolCuCommentsDetails' && TdcMyOrder.FSMOrderType == 'INSTALL')) {
                                var $placeholder = $('#' + webpartName + '_placeholder');
                                $placeholder.show();
                                var tab = $(TdcTabManager.$getTabs()).filter(".pinnedToEnd").first();

                                TdcAsyncWebPartLoader.ShowTool({
                                    toolname: webpartName,
                                    toolType: "GuideTools",
                                    action: "Index",
                                    noteId: context.portalSection,
                                    taskId: TdcCustomerInformation.ToolCustomerTaskIDFSM,
                                    orderType: TdcMyOrder.OrderType,
                                    userType: TdcMyOrder.userType,
                                    context: {
                                        customerId: TdcCustomerInformation.getSelectedCustomerId(),
                                        accountNumber: TdcCustomerInformation.getSelectedCustomerAccountNo(),
                                        noteId: context.portalSection,
                                        toolType: "GuideTools",
                                        portalSection: TdcMain.portalSection,
                                        deviceType: TdcGuideSelector.findBootstrapEnvironment(),
                                        taskId: TdcCustomerInformation.ToolCustomerTaskIDFSM,
                                        orderType: TdcMyOrder.OrderType,
                                        userType: TdcMyOrder.userType,
                                    },
                                });
                              }
                           }
                        }
                    }
                }
            }
        }
            

            if (activateGAASelector != false) {
                TdcGuideSelector.activate();
            }
            TdcTabManager.activateGAATools(context.portalSection);
            TdcTabManager.activateMainMenuGuideTools(context.portalSection);

            if (!(TdcTabManager.$getTabs().not(".pinnedToEnd").length > 0)) {
                $("#Tabs_placeholder").find(".pinnedToEnd").hide();
             if (TdcMain.portalSection == "csam_tsc") {
                    $("#Tabs_placeholder").hide();
                }
            }
           
            else {
                if (TdcMain.portalSection == "ch_kundeservice") {// || TdcMain.portalSection == "onsite_Mineordre") {
                    $("#Tabs_placeholder").find(".pinnedToEnd").hide();
                }
                else if (TdcMain.portalSection == "csam_tsc") {
                    $("#Tabs_placeholder").hide();
                }
                else {
                    $("#Tabs_placeholder").find(".pinnedToEnd").show();
                }
            }

        };

        context.portalSectionMenuItemClicked = function (sender) {
            var portalSection = $(sender).attr('data-portalsectionname');
            
            if (portalSection && portalSection != "ch_homePage") {
                TdcMain.changePortalSection(portalSection);
            }
        };

        context.goToCsamClicked = function (sender) {
            window.open('http://serviceportal.tdk.dk/_layouts/TPCIP.Web/tsc.aspx?portalId=TSC');
         };

        context.CallHotJarTimelineTriggers = function (eventType) {
            if (typeof (hj) != "undefined") {
                var hotJarTiggerMenuItems = ["Inbound", "Outbound", "OrderConfirmation", "Usernotes", "CustomerAction"];
                var hotJarTiggerKey = { Inbound: "ContactLog ", Outbound: "ContactLog", OrderConfirmation: "ContactLog", Usernotes: "NoteLog", CustomerAction: "NoteLog" };
                if ($.inArray(eventType, hotJarTiggerMenuItems) > -1) {
                    //hj('trigger', hotJarTiggerKey[eventType]);
                    hj('tagRecording', [hotJarTiggerKey[eventType]]);
                }
            }
            else {
                console.log("HotJar not enabled.");
            }
        }

        context.CallHotJarTriggers = function (portalSection) {
            if (typeof (hj) != "undefined") {
                var hotJarTiggerMenuItems = ["ch_kundeservice", "ch_salg", "ch_regning", "ch_support", "ch_save", "ch_butik", "ch_back"];
                var hotJarTiggerKey = { ch_kundeservice: "kundeoverblik ", ch_salg: "salg_og_kunde", ch_butik: "butik", ch_save: "save", ch_support: "support", ch_regning: "regning", ch_back: "sarlige_opgaver" };
                var hotJarVPVMenuItems = ["ch_regning"];
                if ($.inArray(portalSection, hotJarTiggerMenuItems) > -1) {
                    hj('trigger', hotJarTiggerKey[portalSection]);
                    if ($.inArray(portalSection, hotJarVPVMenuItems) > -1) {
                         context.CallHotJarVPVForEvents(hotJarTiggerKey[portalSection])                  
                    }
                    hj('tagRecording', [hotJarTiggerKey[portalSection]]);
                }
            }
            else {
                console.log("HotJar not enabled.");
            }
        }

        context.CallHotJarTriggersForEvents = function (eventName) {
            if (typeof (hj) != "undefined")
            {
                hj('trigger', eventName);

            }
            else {
                console.log("HotJar not enabled.");
            }
        }

        context.CallHotJarVPVForEvents = function (eventName) {
            if (typeof (hj) != "undefined")
            {                
                hj('vpv', eventName);
            }
            else {
                console.log("HotJar not enabled.");
            }
        }

        context.$findPortalSectionMenuItem = function (portalSection) {
            var $navBar = $('.navbar-collapse');
            return $navBar.find("[data-portalsectionname='" + portalSection + "']");
        };

        context.goToDasboardClicked = function (sender) {
            if (TdcCustomerInformation.NoCustomerFoundWithAddress) {
                TdcPageStatesManager.goToSessionOverview();
                $('.navbar-collapse').find("#cip_menu").show();
                TdcSearchCustomer.InitializedAddressFilter();
                TdcCustomerInformation.NoCustomerFoundWithAddress = false;
                TdcTabManager.$getTabs().not(".pinnedToEnd").remove();
                $("#ToolPriorityProductDetails_placeholder").html("");
                if ($('#tdc_rightPanelHandle').hasClass("no-right-panel")) {
                    TdcUI.showRightPanel($('#tdc_rightPanelHandle'));
                }
                $('.navbar-collapse').find("#GoToDashboardIcon_placeholder").removeClass("margin-right-18-imp");
                return false;
            }

             //This function is only for MyTP Specific functionality- Start
            TdcMyOrder.MyTPDashboardClicked(sender);
            //This function is only for MyTP Specific functionality- End


            //search is disabled when continue for  No customer found clicked
            $("#mainSearchBox").attr("disabled", false);



            //Get all history Tabs to Close it.
            var $historyTabs = TdcTabManager.$findTabs({ tabType: TdcGuideSelector.historyTabType });
            if ($historyTabs.length > 0) {
                $historyTabs.each(function (index, tab) {
                    TdcTabManager.removeTab($(tab));
                });
            }
            context.goToDashboard = true;
            if (TdcGuideManager.$getActiveGuideTabs().length > 0 || TdcGuideManager.$getActiveFasoTabs().length > 0 || TdcGuideManager.$getActiveLinkTabs().length > 0) {
                if (confirm(TranslationsJs.Confirm_ParkOpenedGuides)) {
                    //set none tab as active, to avoid selectore getting activated when tab removed on successull parking of guide
                    $(TdcTabManager.$getTabs()).filter(".active").removeClass("active")
                    $(TdcTabManager.$getTabs()).filter(".inValidNoteText").removeClass("inValidNoteText");

                    TdcGuideManager.parkOpenedGuides(sender, true);//Article and Guide will be closed here

                    //Get all link Tabs to Save and Close the Note if Note is available or close if note is empty
                    var $linkTabs = TdcTabManager.$findTabs({ tabType: TdcGuideSelector.linkTabType });
                    if ($linkTabs.length > 0) {
                        $linkTabs.each(function (index, tab) {
                            var dataContext = TdcTabManager.getDataContext($(tab));
                            var noteText = $('[data-noteid=' + dataContext.noteId + '] textarea', $('#GuideNote_placeholder')).val();
                            var noteField = $('[data-noteid=' + dataContext.noteId + '] textarea', $('#GuideNote_placeholder'));
                            if (!TdcGuideSelector.isValidNoteText(noteField)) {
                                TdcGuideSelector.errorOutNoteField(noteField);
                                $(tab).addClass("inValidNoteText");
                                context.goToDashboard = false;
                                return;
                            }
                            else {
                                TdcGuideSelector.SaveAndCloseToolTab($(tab), noteText);
                            }

                        });
                    }

                    //Get all Faso Tabs to Save and Close the Note.
                    var $fasoTabs = TdcGuideManager.$getActiveFasoTabs();
                    if ($fasoTabs.length > 0) {
                        $fasoTabs.each(function (index, item) {
                            var callBack = undefined;
                            if (index == $fasoTabs.length - 1)
                                callBack = TdcMain.showDashboard;

                            var $tab = $(item);
                            if (TdcTabManager.$getTabContent($tab).find(".completeGuideButton").length == 1) {
                                ToolDkpFasUpdate.saveCustomerNoteButtonClicked(TdcTabManager.$getTabContent($tab).find(".completeGuideButton"), callBack);
                            }
                            else {
                                TdcTabManager.removeTab($tab);
                                if (callBack)
                                    callBack();
                            }
                        });
                    }
                    else {
                        if (context.goToDashboard) {
                            TdcMain.showDashboard(sender);
                        }
                        else {
                            if ($(TdcTabManager.$getTabs()).filter(".inValidNoteText") != undefined)
                                TdcTabManager.activateTab($(TdcTabManager.$getTabs()).filter(".inValidNoteText").first());
                            else
                                TdcTabManager.activateTab(TdcTabManager.$getTabs().first());
                        }
                    }
                }
                else return;
            }
            else {
                if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP && (!TdcCustomerInformation.NoCustomerFound) && $(TdcTabManager.$getTabs()).length == 1) {//only selector is present          
                    if (TdcMain.atleastOneNoteSaved == false)//check if user has saved any note in the current session
                        TdcGuideSelector.SaveNoteButtonClicked(sender);
                    else
                        TdcMain.showDashboard(sender);
                }
                else {
                    TdcMain.showDashboard(sender);
                    if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC)
                    {
                        TdcUI.showRightPanel($('#tdc_rightPanelHandle'));
                    }
                }
            }
        }

        context.checkIfValidNotesOnAllTab = function () {
            var tabs = $(TdcGuideManager.$getActiveGuideTabs()).add($(TdcGuideManager.$getActiveFasoTabs())).add($(TdcGuideManager.$getActiveLinkTabs()));
            var allNotesAreValid = true;
            $.each(tabs, function (index, tab) {
                var $notefield = TdcTabManager.$getTabContent($(tab)).find(".notes-textarea");
                var retVal = TdcGuideSelector.isValidNoteText($notefield);
                allNotesAreValid = allNotesAreValid == false ? allNotesAreValid : retVal;
            });
            return allNotesAreValid;
        }

        context.showDashboard = function (sender) {
            if (!context.goToDashboard) {//for Fas when only one open call back is set to this function
                if ($(TdcTabManager.$getTabs()).filter(".inValidNoteText") != undefined)
                    TdcTabManager.activateTab($(TdcTabManager.$getTabs()).find(".inValidNoteText")[0]);
                else
                    TdcTabManager.activateTab(TdcTabManager.$getTabs().first());

                return false;
            }

            TdcTabManager.activateTab($(TdcTabManager.$getTabs()).filter(".pinnedToEnd").first());
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {
                $('#GAASelectorNote_placeholder .completeGuideButton').addClass("btn-disabled");
                $('#GAASelectorNote_placeholder .completeGuideButton').attr("disabled", "disabled");
                $('#GAASelectorNote_placeholder textarea.invalidInput').removeClass("invalidInput");
                $('#GAASelectorNote_placeholder .errorMessage').css("display", "none");
            }


            $("#txtHouseNumber").attr("madId", "");
            $('#ddlFloorNo').removeAttr('data-madId');

            TdcCustomerInformation.isInActiveLid = false;
            TdcCustomerInformation.AmsId = "";
            TdcCustomerInformation.AreaId = "";
            TdcCustomerInformation.AnleagId = "";
            TdcCustomerInformation.ToolLinkCustomerId = "";
            TdcCustomerInformation.AddLookupInstallationSeqNo = "";
            TdcCustomerInformation.installationSeqNo = "";
            TdcCustomerInformation.ToolCustomerTaskIDFSM = "";

   
            //TREFOR_1.5_DROP_2 :: 1501 :: Ajinkya Korade :: 10072015 :: Cleared Address filter form on click of dashboard link.
            TdcSearchCustomer.InitializedAddressFilter();

            TdcTabManager.$getTabs().each(function (index, item) {
                var $tab = $(item);
                if (TdcTabManager.getDataContext($tab).tabType != TdcGuideSelector.tabType) {
                    TdcTabManager.removeTab($tab);
                }
            });

            if (sender != undefined)
                var $sender = $(sender);
            context.removeMenuSpecificGuideTools();

            TdcGuideSelector.setNoteText('');
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                TdcMain.changePortalSection('onsite_kobber');
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {
                TdcMain.changePortalSection("onsite_kobber");//('onsite_Mineordre');
            }
            TdcCustomerInformation.subCustomersDetails = undefined;
            TdcTabManager.removeMainMenuGuideTools();           

            var subscriptionId = $('.CustomerInformationDetailsWp').find('.CurrentCustomerId').text();
            TdcSearchCustomer.Clearcacheonrefresh(subscriptionId);
          

            if ($sender != undefined && $sender.hasClass('categoryProductDetails')) {             //check if sender is div from HouseholdDetails
                //TdcCustomerInformation.unloadCustomer();                                        //unloadCustomer 
                //TdcPageStatesManager.goToNewSession();                                          //start new session 
                //TdcSearchCustomer.LoadHouseHoldCustomer(sender, ToolHouseholdDetails.HouseHoldAccountId);
                TdcSearchCustomer.searchCustomerCallback(ToolHouseholdDetails.HouseHoldSubscriptions, ToolHouseholdDetails.HouseHoldSubscriptionId);
            }
            else {
                TdcPageStatesManager.goToSessionOverview();
            }
        }

        context.removeMenuSpecificGuideTools = function () {
            for (var menu in context.MenuSpecificGuideTools) {
                var tools = context.MenuSpecificGuideTools[menu];
                if (tools != undefined) {
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.html("");

                    }
                }
            }

            for (var menu in context.MenuSpecificGAAGuideTools) {
                var tools = context.MenuSpecificGAAGuideTools[menu];
                if (tools != undefined) {
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.html("");

                    }
                }
            }

            for (var menu in context.MenuSpecificGAAGuideToolsForInActiveLid) {
                var tools = context.MenuSpecificGAAGuideToolsForInActiveLid[menu];
                if (tools != undefined) {
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.html("");

                    }
                }
            }

            for (var menu in context.MenuSpecificTools) {
                var tools = context.MenuSpecificTools[menu];
                if (tools != undefined) {
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.html("");
                    }
                }
            }

            for (var menu in context.MenuSpecificToolsForInActiveLid) {
                var tools = context.MenuSpecificToolsForInActiveLid[menu];
                if (tools != undefined) {
                    for (var i = 0; i < tools.length; i++) {
                        var webpartName = tools[i];
                        var $placeholder = $('#' + webpartName + '_placeholder');
                        $placeholder.html("");
                    }
                }
            }
        };


        function fixLeftPanelHandlePositionVertically() {
            var $leftPanelHandle = $('#tdc_leftPanelHandle');
            var verticalPos = parseInt($leftPanelHandle.css('top'), 10);
            $(window).scroll(function () {
                $leftPanelHandle.css({
                    'top': $(this).scrollTop() + verticalPos //Always 15px from left
                });
            });
        }


        // functionality to fix the position of right panel handle vertically
        function fixRightPanelHandlePositionVertically() {
            var $rightPanelHandle = $('#tdc_rightPanelHandle');
            var verticalPos = parseInt($rightPanelHandle.css('top'), 10);
            $(window).scroll(function () {
                $rightPanelHandle.css({
                    'top': $(this).scrollTop() + verticalPos //Always 15px from right
                });
            });
        }

        context.SetPortalSection = function ($tab) {
            if ($tab.hasClass(".pinnedToEnd")) {
                return;
            }

            var mainMenu = $tab.data("tab-mainMenu");
            if (mainMenu != undefined && TdcMain.portalSection != mainMenu) {
                TdcMain.portalSection = mainMenu;
                TdcMain.loadPortalSectionTool(TdcCustomerInformation.getSelectedCustomerId(), undefined, undefined, false)
                $navBar = $(".navbar-collapse");
                $navBar.find(".aktiveTabCustom").removeClass("aktiveTabCustom");
                $navBar.find("[data-portalsectionname='" + mainMenu + "']").addClass("aktiveTabCustom");
            }
        }

        context.ShowMessagePopUp = function ShowMessagePopUp(HeaderText, BodyHtml, NeedButtons, ButtonEvent, ButtonName) {

            if (NeedButtons != true) {
                $('#PopupWithButtons').hide();
            }
            else {
                $('#PopupWithButtons').show();
                var r = $('<input/>', { type: "button", id: "field", value: "Click me", onclick: ButtonEvent, class: "btn btn-primary", value: ButtonName });
                $("#DivForButton").html(r);
            }
            var showmessagepopup = $('#showmessagepopup');
            $("#bodytext").html(BodyHtml);
            $('#showmessagepopup h4').text(HeaderText);
            showmessagepopup.modal();
        }

        context.CollapsetoolbyDefault = function (PortalID, Placeholder) {

            var Collapsetools = context.PortalSpecificCollapseToolList[PortalID];
            if (TdcAsyncWebPartLoader.portalId == PortalID) {

                if (Placeholder != undefined) {
                    var $tool = TdcAsyncWebPartLoader.getTool(Placeholder);
                    var webpartName = $tool.parent('div').prop('id');
                    var webpartName_Tool = webpartName.split('_')[0];
                    for (var i = 0; i < Collapsetools.length; i++) {
                        if (webpartName_Tool == Collapsetools[i]) {
                            $tool.find('.panel-heading  .ion-chevron-up').trigger('click');
                        }
                    }
                }
                else {
                    for (var i = 0; i < Collapsetools.length; i++) {
                        var $placeholder = $('#' + Collapsetools[i] + '_placeholder');
                        $placeholder.find('.panel-heading  .ion-chevron-up').trigger('click');
                    }
                }
            }
        }

    })(TdcMain);

    $(TdcMain.init);
})(jQuery);

