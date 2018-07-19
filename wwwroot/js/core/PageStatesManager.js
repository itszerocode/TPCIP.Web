/// <reference path="tools/receivecall.js" />
/// <reference path="asyncwebpartloader.js" />
/// <reference path="TranslationsJs.js" />

// Define TdcAsyncWebPartLoader namespace.
if (TdcPageStatesManager == null || typeof (TdcPageStatesManager) != 'object') {
    var TdcPageStatesManager = new Object();
}

(function ($) {

    (function (context) {

        var currentState = undefined;

        //this only specifies which placeholders are visible in which state. It doesn't load the webparts.
        context.states = {
            sessionOverview: {
                name: 'sessionOverview',
                webParts: [
                    'SearchCustomer', 'ReceiveCall', 'PortalUserGuides', 'ActiveUserGuides',
                    'CompletedGuidesForPortalUser', 'InfoCenter', 'TPLinkPortalControl', 'MyOrder', 'ToolMyCompletedOrders', 'ToolCoaxSearch'
                ]
            },
            newSession: {
                name: 'newSession',
                webParts: [
                    'GoToDashboardLink', 'Tabs', 'GAASelector', 'GAASelectorNote', 
                    'CustomerInformation', 'CustomerInformationDetails', 
                    'CustomerHistoryInformation', "ToolOperationInfo", "FeedBack", "CSAM"
                ]
            },
            noCustomerSession: {
                name: 'noCustomerSession',
                webParts: [
                   'GoToDashboardLink', 
                   'CustomerInformation', 'CustomerInformationDetails', 'CustomerHistoryInformation', 
                ]
            },

            noCustomerSessionWithAddress: {
                name: 'noCustomerSessionWithAddress',
                webParts: [
                    'GoToDashboardLink',
                    'CustomerInformation',
                ]
            },
        };

        context.goToSessionOverview = function () {
            TdcLogin.ValidateAndShowBatchUserLogOutButton();
            $("#GoToDashboardIcon_placeholder").hide();
            $("#GoToDashboardLink_placeholder").hide();
            var subscriptionId = $('.CustomerInformationDetailsWp').find('.CurrentCustomerId').text();
            TdcSearchCustomer.Clearcacheonrefresh(subscriptionId);
            TdcCustomerInformation.unloadCustomer();

            TdcMain.removeMenuSpecificGuideTools();


            $('.TPLinkPortalControlWP').show();
            
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'InfoCenter'
                });
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {

                //TdcReceiveCall.endCall();

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'ActiveUserGuides',
                    context: {
                        title: TranslationsJs.My_active_sessions,
                        guideSessionStatus: 'Active'
                    }
                });

                //TdcAsyncWebPartLoader.ShowTool({
                //    toolname: 'PortalUserGuides',
                //    context: {
                //        title: TranslationsJs.My_parked_sessions,
                //        guideSessionStatus: 'Parked'
                //    }
                //});

                //TdcAsyncWebPartLoader.ShowTool({
                //    toolname: 'CompletedGuidesForPortalUser',
                //    context: {
                //        pageNumber: 1
                //    }
                //});
            }
            else if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {          //TP portal
                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'PortalUserGuides',
                    context: {
                        title: TranslationsJs.My_active_sessions,
                        guideSessionStatus: 'Active'
                    }
                });


                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'TPLinkPortalControl'
                });
            }

            else if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'MyOrder',
                    context: {
                        title: 'Mine Aktive Ordre',
                        guideSessionStatus: 'Active'
                    }
                });

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'ToolMyCompletedOrders',
                    context: {
                        title: 'My Work Historik',
                        guideSessionStatus: 'Active'
                    }
                });

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'TPLinkPortalControl'
                });

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'ToolCoaxSearch'
                });
            }

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC) {

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'ActiveUserGuides',
                    context: {
                        title: TranslationsJs.My_active_sessions,
                        guideSessionStatus: 'Active'
                    }
                });

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'TPLinkPortalControl'
                });

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: 'ToolCoaxSearch'
                });

            }

            TdcUtils.setPageClass('pageOverview');
            setCurrentState(context.states.sessionOverview);
            $("#Emergencymodewarning").html("");

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP)
            {
                context.OnloadofPortal();
            }
                 
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC) {
                $("#topNavBar2").removeClass("navbar-default").addClass("cip-navbar-default");
                $("#TDCLogo").hide();
            }
          
            TdcPageStatesManager.compareFixedTopHeight();
           
        };

        // Method replicated and customised only For MyTP- Lookup from MyOrdersGuideTool.
        context.goToSessionOverview_MyTP = function () {
            var subscriptionId = $('.CustomerInformationDetailsWp').find('.CurrentCustomerId').text();
            TdcSearchCustomer.Clearcacheonrefresh(subscriptionId);
            TdcCustomerInformation.unloadCustomer();

            TdcMain.removeMenuSpecificGuideTools();

            setCurrentState(context.states.sessionOverview);
            $("#Emergencymodewarning").html("");

            TdcPageStatesManager.compareFixedTopHeight();
        };

        context.compareFixedTopHeight = function () {
            var greyBarHeight = $('#topNavBar1').height() + 10;
            $('#topNavBar2').css('paddingTop', greyBarHeight);
            var blackBarHeight = $('#topNavBar2').height();
            var fixedBarHeight = greyBarHeight + blackBarHeight + 10;
            $('#cip_content').css('paddingTop', fixedBarHeight);
        };

        context.OnLoadPortalMenues = {
            CIP: [
                'ch_kundeservice', 'ch_salg', 'ch_regning', 'ch_support', 'ch_save', 'ch_butik', 'ch_back', 'ch_scale'
            ],
            TP: [
            ],
            MyTP: [
               'onsite_Ordredetaljer', 'onsite_Produkter', 'onsite_Fremforing'
            ],
            CIP_InActiveLid: ['ch_kundeservice', 'ch_salg', 'ch_regning', 'ch_save', 'ch_butik', 'ch_back', ],
        };

        context.OnloadofPortal = function () {
            var $navBar = $('.navbar-collapse');
            var menuitem = context.OnLoadPortalMenues[TdcAsyncWebPartLoader.portalId];
            if (TdcCustomerInformation.isInActiveLid == true) { //TdcAsyncWebPartLoader.portalId == 'CIP' &&
                menuitem = context.OnLoadPortalMenues['CIP_InActiveLid'];
            }
            for (var i = 0; i < menuitem.length; i++) {
                var $newMenuItem = $navBar.find("[data-portalsectionname='" + menuitem[i] + "']");
                $newMenuItem.hide();
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {
                $navBar.find("[data-portalsectionname='ch_homePage']").show().addClass("aktiveTabCustom");
                $navBar.find("#portalmenubar").addClass("topMenuBarWidthHomePage");
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                $navBar.find("#portalmenubar").addClass("width71");
            }
        };


        context.OnCustomerloadofPortal = function () {
            var $navBar = $('.navbar-collapse');
            var menuitem = context.OnLoadPortalMenues[TdcAsyncWebPartLoader.portalId];
            if (TdcCustomerInformation.isInActiveLid == true) { //TdcAsyncWebPartLoader.portalId == 'CIP' &&
                menuitem = context.OnLoadPortalMenues['CIP_InActiveLid'];
            }
            for (var i = 0; i < menuitem.length; i++) {
                var $newMenuItem = $navBar.find("[data-portalsectionname='" + menuitem[i] + "']");
                $newMenuItem.show();
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP) {
                $navBar.find("[data-portalsectionname='ch_homePage']").hide().removeClass("aktiveTabCustom");
                $navBar.find("#portalmenubar").removeClass("topMenuBarWidthHomePage");
                if (TdcMain.portalSection == undefined) {
                    $navBar.find("[data-portalsectionname='ch_kundeservice']").addClass("aktiveTabCustom");
                    TdcMain.portalSection = 'ch_kundeservice';
                }
                TdcMain.CallHotJarTriggers(TdcMain.portalSection);
                //else if ($navBar.find(".aktiveTabCustom").data('portalsectionname') != TdcMain.portalSection)
                //{
                //    $navBar.find(".aktiveTabCustom").removeClass(".aktiveTabCustom");
                //    $navBar.find("[data-portalsectionname='" + TdcMain.portalSection + "']").addClass("aktiveTabCustom");
                //}
            }
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                $navBar.find("#portalmenubar").removeClass("width71");
        }
        }


        context.goToNewSession = function () {
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.WSP) {
                context.states = {
                    sessionOverview: {
                        name: 'sessionOverview',
                        webParts: [
                                'SearchCustomer', 'ReceiveCall', 'PortalUserGuides', 'ActiveUserGuides',
                                'CompletedGuidesForPortalUser', 'InfoCenter', 'TPLinkPortalControl', 'ToolCoaxSearch'
                        ]
                    },

                    newSession: {
                        name: 'newSession',
                        webParts: [
                                'GoToDashboardLink', 'Tabs', 'GAASelector',
                                'CustomerInformation', 'CustomerInformationDetails', 'FeedBack',
                                'CustomerHistoryInformation', 'CSAM'
                        ]
                    }
                };
            }
            TdcGuideManager.$guideSessionReplacableZones.show();
            TdcUtils.setPageClass('pageSession');
            //Resolved QC defect 13741
            $("#SearchCustomer_placeholder #customerSearchBox").val("").blur();;
            //$("#ToolCoaxSearch_placeholder #searchMACId").val("").blur();;
            
            setCurrentState(context.states.newSession);

            TdcGuideSelector.trimSetionTitleOverflow($('.GAASelector'));
          
            if (TdcAsyncWebPartLoader.portalId == "TP")
            {
                $(".logoutBatchUser").hide();
            }
          
            if (TdcAsyncWebPartLoader.portalId == "CIP") {
                $("#FeedBack_placeholder").hide();
                $(".logoutBatchUser").hide();
                $("#GoToDashboardIcon_placeholder").show();
                $("#GoToDashboardLink_placeholder").hide();
                $("#CSAM_placeholder").hide(); 

            }

            if (TdcAsyncWebPartLoader.portalId == "TSC") {
                $("#FeedBack_placeholder").hide();
                $("#CSAM_placeholder").hide();
                $("#GoToDashboardIcon_placeholder").show();
                $("#GoToDashboardLink_placeholder").hide();

            }

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) {
                context.OnloadofPortal();
            }
        };

        context.goToNoCustomerSession = function () {            
            TdcUtils.setPageClass('pageSession');
            $("#SearchCustomer_placeholder #customerSearchBox").val("").blur();;
            // $("#ToolCoaxSearch_placeholder #searchMACId").val("").blur();;

            setCurrentState(context.states.noCustomerSession);
        };

        context.goToNoCustomerSessionWithAddress = function () {
            TdcUtils.setPageClass('pageSession');
            $("#SearchCustomer_placeholder #UcAddressLookUp").val("").blur();;
            setCurrentState(context.states.noCustomerSessionWithAddress);
        };

        context.goToNewLinkSession = function () {
            context.states = {
                sessionOverview: {
                    name: 'sessionOverview',
                    webParts: [
                        'SearchCustomer', 'ReceiveCall', 'PortalUserGuides', 'ActiveUserGuides',
                        'CompletedGuidesForPortalUser', 'InfoCenter', 'TPLinkPortalControl', 'MyOrder', 'ToolMyCompletedOrders', 'ToolCoaxSearch'
                    ]
                },

                newSession: {
                    name: 'newSession',
                    webParts: [
                        'GoToDashboardLink', 'Tabs', 'GAASelector', 'ToolProducts',
                        'CustomerInformation', 'CustomerInformationDetails', 'ParkedGuides',
                        'CustomerHistoryInformation', 'CustomerOpenCases', "CustomerClosedCases", "ToolOperationInfo", "FeedBack", "CSAM"
                    ]
                }
            };;
            TdcGuideManager.$guideSessionReplacableZones.show();
            TdcUtils.setPageClass('pageSession');
            //Resolved QC defect 13741
            $("#SearchCustomer_placeholder #customerSearchBox").val("").blur();;
            // $("#ToolCoaxSearch_placeholder #searchMACId").val("").blur();;

            setCurrentState(context.states.newSession);

            TdcGuideSelector.trimSetionTitleOverflow($('.GAASelector'));
        };
        
        //handler: function(newState, oldstate)
        context.stateChanged = function (handler) {
            TdcAsyncWebPartLoader.$rootElement.on('TdcPageStatesManager.stateChaged', handler);
        };

        context.getCurrentState = function () {
            return currentState;
        };

        context.getPageUrl = function () {
            var currentUrl = window.location.href.split('?')[0];
            currentUrl += ('?portalId=' + TdcAsyncWebPartLoader.portalId);
            return currentUrl;
        };
        
        function setCurrentState(newState) {
            refreshWebpartsVisibility(newState);
            
            var oldState = currentState;
            currentState = newState;
            TdcAsyncWebPartLoader.$rootElement.triggerHandler('TdcPageStatesManager.stateChaged', [newState, oldState]);
        }
        
        function refreshWebpartsVisibility(newState) {
            //show webparts in new state, hide all other webparts
            for (var stateKey in context.states) {
                var state = context.states[stateKey];

                for (var i = 0; i < state.webParts.length; i++) {
                    var webpartName = state.webParts[i];
                    var $placeholder = $('#' + webpartName + '_placeholder');

                    if ($.inArray(webpartName, newState.webParts) >= 0) {
                        if (webpartName == 'SearchCustomer') {
                            $('#txtPostalCode').attr('disabled', false);
                        }
                            $placeholder.show();
                        }
                     else {
                        $placeholder.hide();
                    }
                }
            }
        }
        
    })(TdcPageStatesManager);

})(jQuery);
