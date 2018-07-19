/// <reference path="~/Layouts/TPCIP.Web/Scripts/_references.js" />


// Define TdcAsyncWebPartLoader namespace.
if (TdcAsyncWebPartLoader == null || typeof (TdcAsyncWebPartLoader) != "object") {
    var TdcAsyncWebPartLoader = new Object();
}

// Workaround for IE.
if (typeof console == "undefined" || typeof console.log == "undefined") {
    var console = { log: function () { }, error: function () { } };
}

(function ($) {

    (function (context) {

        // Cached selectors.
        context.$rootElement = undefined;

        // Shared variables
        context.rightPanelcollapsedByUser = false;
        context.toolLoadedEventName = "ToolLoaded";
        context.PageChangedEventName = "PageChanged";
        context.portalId = document.URL.toLowerCase().indexOf("portalid=cip") > -1 ? "CIP" : undefined;
        context.checkEmergencymode = false;
        context.customerContext = {};
        context.showToolUrl = undefined;
        context.doActionUrl = undefined;
        context.portalIds = {
            CIP: "CIP",
            TP: "TP",
            WSP: "WSP",
            MyTP: "MyTP",
            TSC: "TSC"
        };


        context.init = function () {
            context.$rootElement = $("#cip_content_container");

            context.$rootElement.on(context.toolLoadedEventName, function (event, $html) {
                if (TdcCustomerInformation.isInActiveLid == true)
                {
                    $html.addClass("inActiveLid");
                }
                $html.find('input[placeholder]').inputWatermark();
            });
        };

        context.RegisterNote = function (requestData)
        {
            if (requestData.action != "Index")
            {
                var noteList = $('#cip_content').data('autonotelist');
                //var noteMessage= noteList[requestData.toolname]
                if (noteList !=null && noteList[requestData.toolname] != undefined && noteList[requestData.toolname].length > 0)
                {
                    //if(noteList[requestData.toolname].ActionName == requestData.action)
                    var noteElements = noteList[requestData.toolname].length;
                    for (i = 0; i < noteElements; i++) {
                        var actionName = noteList[requestData.toolname][i].ActionName;
                        if (actionName == requestData.action)
                        {
                            var noteMessage = noteList[requestData.toolname][i].NoterMessage;

                            var $activatedTab = $(TdcTabManager.$getTabs()).filter(".active");
                            if ($activatedTab.data('tab-additionalvalues') == undefined) {
                                $activatedTab.data('tab-additionalvalues', []);
                            }

                            $activatedTab.data('tab-additionalvalues').push(noteMessage);

                        }
                    }
                }
            }


        };


        var toolname_appdynamic = [
            "ActiveUserGuides", "CustomerInformation", "ToolFasCreate", "ToolDkpFasUpdate",
            "CustomerOpenCases", "ToolCustomerOverview", "ToolCustomerContactLog", "ToolConsolidatedNote",
            "ToolPriorityProduct", "GuideStep", "ToolMyOrder", "ToolLineStateTestDsl",
            "ToolNetworkAnalyzer", "ToolOVfasDetails", "ToolMyCompletedOrders", "SearchCustomer",
            "ToolSmartGuides", "GAASelector", "Note"];
        var eventObj;

        context.addToAppDynamics = function(requestData,toolname) {

            if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {



                if (toolname_appdynamic.indexOf(toolname) >= 0) {
                    if (requestData.action == undefined) {
                        eventObj = logEventStart(toolname + "_Index");
                    } else {
                        eventObj = logEventStart(toolname + "_" + requestData.action);

                    }
                    ClearAndReInitializeArray();

                    addToMap("Lid", requestData.context.customerId);

                    addToMap("userId", TdcUserToolBox.getUserId());

                }

            }

        }
        context.DoAction = function (requestData, sender) {
            context.RegisterNote(requestData);
            var viewModel = {};
            if (!requestData.isloadingIcon) requestData.isloadingIcon = false;

            var $persistentMessage;
            var $loadingMessage;

            if (requestData.isloadingIcon == true) {
                var message = requestData.messageProcess;
                if (!message) message = requestData.action + ' ' + TranslationsJs.isInProgress;
                $loadingMessage = TdcUI.createMessage(message, TdcUI.messageOptions.loading, null, true, sender);

                if (requestData.customClass != undefined || requestData.customClass != null) {
                    $loadingMessage.addClass(requestData.customClass);
                }
            }
            else if (sender) {
                var message = requestData.messageProcess;
                if (!(message) && message != "") message = requestData.action + ' ' + TranslationsJs.isInProgress;
               
                if (message != "") {
                    $persistentMessage = TdcUI.createMessage(message, TdcUI.messageOptions.info, null, true, sender);
                }
            }

            //keep parameters from previous request
            var existingFirstRequestData = context.getFirstRequestData(sender);
            if (existingFirstRequestData) {
                if (!requestData.parameters) requestData.parameters = existingFirstRequestData.parameters;
            }


            function onError(jqXhr) {
                if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                    if (toolname_appdynamic.indexOf(requestData.toolname) >= 0) {
                        logEventEnd(eventObj);
                    }
                }
                if (requestData.errorcallback) {
                    var result = requestData.errorcallback(jqXhr);
                    var resultbool = new Boolean(result);// added by swetha because "result instanceof Boolean" will always return false, so cast "result" into boolean before checking

                    if (resultbool instanceof Boolean && result == false) {//if errorcallback returns false, do not show default error message.
                        if ($persistentMessage) $persistentMessage.remove();// added by swetha
                        if ($loadingMessage) $loadingMessage.remove();
                        return;
                    }
                }

                var message = requestData.messageError;
                if (!(message) && message != "") message = requestData.action + ' ' + TranslationsJs.failed;

                var errorTitle = jqXhr.getResponseHeader('ErrorTitle');
                errorTitle = browserDisplayIssue(errorTitle);

                if (errorTitle) {
                    message += "<br />" + errorTitle;
                }


                /* Radhika Pokale : Error handling Part 3*/

                var errorTitleCheck = errorTitle != undefined && errorTitle != "" && errorTitle.split(',').length >= 2 && errorTitle.split(',')[1] == TranslationsJs.Generic_Error.split(',')[1];

                if (errorTitleCheck) // it compares the errorTitle with Generic error 
                {
                    context.logErrorDetails(requestData);  //gets ErrorDetails
                }

                if ($persistentMessage) {                  

                    if (message != "") {
                        $persistentMessage.updateMessage(TdcUI.createErrorLink(getToolTitle(requestData), message), TdcUI.messageOptions.error, jqXhr.responseText);
                    }
                    else {
                        $persistentMessage.remove();
                    }
                   
                }
                else {

                    if (message != "") {
                        $persistentMessage = TdcUI.createMessage(TdcUI.createErrorLink(getToolTitle(requestData), message), TdcUI.messageOptions.error, jqXhr.responseText, false, sender);
                    }
                }
                if ($loadingMessage) {
                    $loadingMessage.remove();
                }
            }

         
            context.addToAppDynamics(requestData, requestData.toolname);
            requestData.action = requestData.action == undefined ? "Index" : requestData.action;
            $.ajax({
                type: "POST",
                url: requestData.toolname + "/" + requestData.action,
                //dataType: "text",
                context: requestData,
                async: requestData.asyncload ? false : true,
                beforeSend: function (xhr)
                {
                    if (TdcMain.isBatchUser.toLowerCase() == "true") {
                        xhr.setRequestHeader('LoggedUserId', TdcMain.LoggedUserId);
                        xhr.setRequestHeader('LoggedUserName', TdcMain.LoggedUserName);
                        xhr.setRequestHeader('isBatchUser', "true");
                    }
                },
                data: JSON.stringify(requestData),
                error: onError,
                success: function (response, statusText, jqXhr) {
                    if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                        if (toolname_appdynamic.indexOf(requestData.toolname) >= 0) {
                            logEventEnd(eventObj);
                        }
                    }
                    if (jqXhr.responseText.indexOf('<body') >= 0) {
                        onError(jqXhr);
                        return;
                    }

                    if (requestData.callback) {
                        var callbackResult = requestData.callback(response);
                        if (callbackResult === false) { //if errorcallback returns false, do not show default error message.
                            if ($persistentMessage) $persistentMessage.remove();
                            if ($loadingMessage) $loadingMessage.remove();
                            return;
                        }
                    }

                    var message = requestData.messageSuccess;
                    if (!(message) && message != "") message = requestData.action + ' ' + TranslationsJs.done_successfully;

                    if ($persistentMessage) {

                        if (message != "") {
                            $persistentMessage.updateMessage(message, TdcUI.messageOptions.success, null);
                        }
                        else {
                            $persistentMessage.remove();
                        }
                    }
                    else {                      

                        if (message != "") {
                            $persistentMessage = TdcUI.createMessage(message, TdcUI.messageOptions.success, null, false, sender);
                        }
                    }

                    if ($loadingMessage) {
                        $loadingMessage.remove();
                    }
                }
            });
        };
        context.ShowTool = function (requestData) {
            //check if Menu Tool Loaded
            //if (requestdata.tooltype=="guidesteptool" &&  $("." + requestdata.toolname + "[data-noteid='" + tdcmain.portalsection + "']").length > 0) {
            //    return;
            //}           


            context.RegisterNote(requestData);

            if (!requestData.context) requestData.context = {};
            if (!requestData.parameters) requestData.parameters = {};
            var isGuideTool = requestData.context.noteId != null;

            var $tab = null;
            if (isGuideTool) {

                if (requestData.toolType != "MenuTool" && requestData.toolType != "GAATool")
                    $tab = TdcTabManager.$findTab({ noteId: requestData.context.noteId });
                else
                    $tab = null;


                requestData.toolPath = 'GuideTools/' + requestData.toolname;

            } else {
                requestData.toolPath = 'Tools/' + requestData.toolname;
            }

            showTool(requestData, $tab);
        };

        //auto hiding right toggle functionality
        context.autoHideRightPanel = function (rightPanelToolLoaded) {
            if (context.rightPanelcollapsedByUser == true)
            {
                if (rightPanelToolLoaded == "True") {
                    TdcUI.showRightPanel($('#tdc_rightPanelHandle'));
                }
                else  {
                    TdcUI.hideRightPanel($('#tdc_rightPanelHandle'));
                }
            }
        }

        /** 
       * @Description: Sets TimeOuts for the loader by taking into account the Best , average and Worst response time 
       * @Type : function 
       * @Parameters : { requestData: data containing tool details, $loadingHtml: html template having loader  } 
       * @Returns : 
       * @Author : Ajinkya Korade @Date : 15-01-2016 
       * @Project : Service Dashboard BLR 71012
       * @History : {//Project Name::TFS_ID::AUTHOR::mmddyyyy::Changes} 
       **/
        function setLoaderTimeouts(requestData, $loadingHtml) {
            var fetchToolParameters = {};
            fetchToolParameters.toolName = requestData.toolname == null || typeof requestData.toolname === "undefined" ? "Default" : requestData.toolname;
            fetchToolParameters.toolAction = requestData.action == null || typeof requestData.action === "undefined" ? "Index" : requestData.action;
            //var toolDetails = ServiceDashboard.GetToolDetails(fetchToolParameters.toolName, fetchToolParameters.toolAction);
            //if (toolDetails.AverageResponseTime > 0) {
            //    setTimeout(function () {
            //        $loadingHtml.find(".line-scale > div").removeClass();
            //        $loadingHtml.find(".line-scale > div").addClass("loader-yellow-theme");
            //        //$($loadingHtml.find("img")[0]).attr("src", "/_Layouts/Images/TPCIP.Web/GAASelector/loading_orange.gif");
            //    }, toolDetails.AverageResponseTime);
            //    setTimeout(function () {
            //        $loadingHtml.find(".line-scale > div").removeClass();
            //        $loadingHtml.find(".line-scale > div").addClass("loader-orange-theme");
            //        //  $($loadingHtml.find("img")[0]).attr("src", "/_Layouts/Images/TPCIP.Web/GAASelector/loading_red.gif");
            //    }, toolDetails.WorstResponseTime);
            //}

        }

        //Start and End Events for AppDynamics
        function logEventStart(event_name) {
            if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                var vPageView = new ADRUM.events.VPageView({
                    url: event_name
                });
                vPageView.start();
                vPageView.markViewChangeStart();
                return vPageView;
            }
        }


        function logEventEnd(eventobj) {
            if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                eventobj.markViewChangeEnd();
                eventobj.markViewDOMLoaded();
                eventobj.markXhrRequestsCompleted();
                eventobj.markViewResourcesLoaded();
                eventobj.end();
                ADRUM.report(eventobj);
            }
        }


        function showTool(requestData, $tab) { //$tab available for MenuTool and GAATool
            if (!requestData.context) requestData.context = {};           

            var toolname = requestData.toolname;
            var $existingTool = context.getToolByName(requestData, requestData.context.noteId);
            $existingTool.filter('[data-tooloverlay]').remove(); //cancel previous requests

            //preserve parameters from previous request
            var existingFirstRequestData = context.getFirstRequestData($existingTool);
            if (existingFirstRequestData) {
                if (!requestData.parameters) requestData.parameters = existingFirstRequestData.parameters;
                if (!requestData.toolType) requestData.toolType = existingFirstRequestData.toolType;
                if (requestData.portalSection == undefined && existingFirstRequestData.portalSection != undefined)
                    requestData.portalSection = existingFirstRequestData.portalSection;
            }

            var $loadingHtml = createToolOverlay(requestData, 'loading'); //#loadingTemplate or #loadingOverlayTemplate

            function onError(jqXhr, statusText, responseText) {
                if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                    if (toolname_appdynamic.indexOf(toolname) >= 0) {
                        logEventEnd(eventObj);
                    }
                }
                $loadingHtml.remove();

                if (requestData.action == "Index" || requestData.action == undefined) {
                    if (context.checkEmergencymode)
                        $("#" + toolname + "_placeholder").hide();
                }
                   var errorViewModel = {
                    errortitle: getErrorTitle(jqXhr)
                };

                var errorTitleCheck = errorViewModel.errortitle != undefined &&
                    errorViewModel.errortitle != "" &&
                    errorViewModel.errortitle.split(',').length >= 2 &&
                    errorViewModel.errortitle.split(',')[1] == TranslationsJs.Generic_Error.split(',')[1];
                var friendlyErrorCheck = getFriendlyErrorTitle(jqXhr);
                if (errorTitleCheck && !friendlyErrorCheck) // it compares the errorTitle with Generic error 
                {
                    context.logErrorDetails(requestData); // gets ErrorDetails
                }

                var $errorHtml = createToolOverlay(requestData, 'error', errorViewModel);
                $errorHtml.click(function() { TdcUI.createErrorWindow(jqXhr.responseText) });
                $errorHtml.find('.btnRetry').click(function(e) {
                    if ($tab) {
                        TdcTabManager.removeTabContent($tab, $errorHtml);
                    }
                    if (requestData.toolType == "MenuTool") {
                        TdcTabManager.removeMainMenuContent(requestData.noteId, $errorHtml);
                    } else if (requestData.toolType == "GAATool") {
                        TdcTabManager.removeGAATabContent(requestData.portalSection, $errorHtml);
                    }
                    showTool(requestData, $tab);
                    e.preventDefault();
                });

                setRequestData($errorHtml,
                    existingFirstRequestData); //transfer exiting requestData from old webpart to new
                setRequestData($errorHtml, requestData);

                //if (requestData.toolType == "MenuTool") {
                //    TdcTabManager.addMainMenuContent(requestData.noteId, $errorHtml);
                //}
                //else if (requestData.toolType == "GAATool") {
                //    TdcTabManager.addGAATabContent(requestData.noteId, $errorHtml);
                //}
                //else if ($tab) {                    
                //    TdcTabManager.addTabContent($tab, $errorHtml);
                //}

                if (requestData.errorcallback) {
                    requestData.errorcallback($errorHtml, jqXhr.statusText, jqXhr.responseText);
                }
            }

                
                context.addToAppDynamics(requestData,toolname);

            
            //Ajinkya
            setLoaderTimeouts(requestData, $loadingHtml);
            requestData.action = requestData.action == undefined ? "Index" : requestData.action;
            $.ajax({
                type: "POST",
                url: requestData.toolname + "/" + requestData.action,
                dataType: "text",
                beforeSend: function (xhr)
                {
                    if (TdcMain.isBatchUser.toLowerCase() == "true") {
                        xhr.setRequestHeader('LoggedUserId', TdcMain.LoggedUserId);
                        xhr.setRequestHeader('LoggedUserName', TdcMain.LoggedUserName);
                        xhr.setRequestHeader('isBatchUser', "true");
                    }
                },
                data: JSON.stringify(requestData),
                error: onError,
                success: function (html, statusText, jqXhr) {
                    if (TdcAsyncWebPartLoader.portalId != TdcAsyncWebPartLoader.portalIds.TSC) {
                        if (toolname_appdynamic.indexOf(toolname) >= 0) {
                            logEventEnd(eventObj);
                        }
                    }
                    var $html = $(html);

                    //to set menu main active when respective tab selected
                    var mainMenu = $html.data("mainmenu");
                    if (mainMenu != undefined)
                        $tab.data("tab-mainMenu", $html.data("mainmenu"));

                    //set noteId
                    if (requestData.context.noteId) {
                        if ($html.attr('data-noteid')) { //update noteId returned by tool (see GuideStep.StartGuide)
                            requestData.context.noteId = $html.attr('data-noteid');
                        }
                        $html.attr('data-noteid',
                            requestData.context.noteId); //set noteid to webpart root for faster DOM search
                    }

                    //set tooltype
                    if (requestData.toolType) {
                        $html.filter(':not([data-tooltype])').attr('data-tooltype', requestData.toolType);
                    }

                    //save requestData
                    setRequestData($html,
                        existingFirstRequestData); //transfer exiting requestData from old webpart to new
                    setRequestData($html, requestData);

                    //show webpart
                    $loadingHtml.replaceWith($html);
                    arrangeInnerWebparts($html);
                    $existingTool.remove();
                    if (requestData.toolType == "MenuTool") {
                        TdcTabManager.addMainMenuContent(requestData.context.noteId, $html);
                        TdcTabManager.removeMainMenuContent(requestData.context.noteId, $loadingHtml);
                        TdcTabManager.removeMainMenuContent(requestData.context.noteId, $existingTool);
                    }
                    if (requestData.toolType == "GAATool") {
                        TdcTabManager.addGAATabContent(requestData.portalSection, $html);
                        TdcTabManager.removeGAATabContent(requestData.portalSection, $loadingHtml);
                        TdcTabManager.removeGAATabContent(requestData.portalSection, $existingTool);
                    }
                    else if ($tab) {
                        TdcTabManager.addTabContent($tab, $html);
                        TdcTabManager.removeTabContent($tab, $loadingHtml);
                        TdcTabManager.removeTabContent($tab, $existingTool);

                    }

                    //callbacks, events
                    if (requestData.callback) {
                        requestData.callback($html, requestData);
                    }
                    context.$rootElement.triggerHandler('ToolLoaded', [$html, requestData]);
                },
            });

        }

        context.getToolByName = function (toolname, noteId) {
            var isGuideTool = noteId != undefined;
            var $placeholder = getToolPlaceholder(toolname, isGuideTool);
            if (isGuideTool) return $placeholder.children('[data-noteid=' + noteId + ']');
            else return $placeholder.children();
        };


        context.getTool = getTool;
        function getTool(html) {
            var $html = (html instanceof jQuery) ? html : $(html);
            return $html.closest('.AsyncWebpartLoader');
        }

        context.getToolPlaceholder = getToolPlaceholder;
        function getToolPlaceholder(requestData, isGuideTool) {
            var toolname = "";
            if (requestData.context != undefined)
            {
                if (requestData.context.placeholder != undefined) {
                    return requestData.context.placeholder;
                }
                else if (requestData.context.noteId != undefined) {
                    if ($('#placeholder_searchtool').find('#' + requestData.context.noteId + '_placeholder').length == 1) {
                        return $('#placeholder_searchtool').find('#' + requestData.context.noteId + '_placeholder');
                    }
                }
            }
            if (requestData.toolname != undefined) {
                toolname = requestData.toolname;
            }
            else {
                toolname = requestData;
            }
            var placeholder = $('#' + toolname + '_placeholder');
            if (placeholder.length == 0) {
                console.log('Placeholder for tool "' + toolname + '" not found');
                var $fallback = isGuideTool ? $('#placeholder_fallback_guidetool') : $('#placeholder_fallback_tool');
                placeholder = $('<div />').attr('id', toolname + '_placeholder');
                $fallback.append(placeholder);
            }
            return placeholder;
        }

        function setRequestData(webpartHtml, requestData) {
            var $webpart = (webpartHtml instanceof jQuery) ? webpartHtml : $(webpartHtml);

            var firstRequestData = context.getFirstRequestData($webpart);
            if (!firstRequestData) {
                $webpart.data('firstrequestdata', requestData);
            }
            $webpart.data('lastrequestdata', requestData);
            $webpart.addClass('AsyncWebpartLoader');
        }

        context.getLastRequestData = function (htmlElement) {
            var $htmlElement = (htmlElement instanceof jQuery) ? htmlElement : $(htmlElement);
            var $webpart = getTool($htmlElement);
            return $webpart.data('lastrequestdata');
        };

        //gets request of a webpart, when it was first loaded, usually index
        context.getFirstRequestData = function (htmlElement) {
            var $htmlElement = (htmlElement instanceof jQuery) ? htmlElement : $(htmlElement);
            var $webpart = getTool($htmlElement);
            return $webpart.data('firstrequestdata');
        };


        /*  Radhika Pokale : Error Handling Part 3 */

        // it gets ErrorDetails 
        /******** Disabling this action call as this functionality is no longer in use.Also, the timer job which sends excel repots over email has been disabled. **********/
        context.logErrorDetails = function (errorData) {
            
            /*if (errorData.context.customerId)
                var customerId = (errorData.context.customerId == "" || errorData.context.customerId == 'undefined' || errorData.context.customerId == 'kpm') ?
                    TdcAsyncWebPartLoader.getToolPlaceholder("CustomerInformation").attr('data-customerid') : errorData.context.customerId;
            TdcAsyncWebPartLoader.DoAction({
                toolname: 'ServiceDashboard',
                action: 'getErrorDetails',
                context: {
                    portalId: context.portalId,
                    toolName: errorData.toolname,
                    lid: customerId,
                },
            });
            */
        }

        //create overlay for tool based on toolname and noteid. if tool exists, use $('#' + templateName + 'OverlayTemplate'), otherwise $('#' + templateName + 'Template')
        function createToolOverlay(requestData, templateName, viewModel) {
            if (!viewModel) viewModel = {};
            var noteId = requestData.context.noteId;
            var isGuideTool = noteId != undefined;
            var $placeholder = getToolPlaceholder(requestData, isGuideTool);

            var $existingTool = context.getToolByName(requestData, noteId);
            var height = $existingTool.height();

            var $toolOverlay;
            if (height) {
                //if there placeholder has some content, create overlay
                $toolOverlay = TdcUtils.instantiateTemplate(templateName + 'OverlayTemplate', viewModel);
                $toolOverlay.height(height);
                $toolOverlay.width($existingTool.width());
            } else {
                //webpart is loading first time
                viewModel.toolname = getToolTitle(requestData);
                $toolOverlay = TdcUtils.instantiateTemplate(templateName + 'Template', viewModel);
            }

            $toolOverlay.attr('data-noteid', noteId);
            $toolOverlay.attr('data-tooltype', requestData.toolType);
            $toolOverlay.attr('data-tooloverlay', true);

            if (requestData.toolType == "MenuTool") {
                TdcTabManager.addMainMenuContent(noteId, $toolOverlay);
            }
            else if (requestData.toolType == "GAATool") {
                TdcTabManager.addGAATabContent(requestData.portalSection, $toolOverlay);
            }
            else {
                var $tab = TdcTabManager.$findTab({ noteId: noteId });
                TdcTabManager.addTabContent($tab, $toolOverlay);
            }

            $placeholder.prepend($toolOverlay);

            setRequestData($toolOverlay, requestData);
            return $toolOverlay;
        }

        //moves elements with data-placeholder attribute to their own placeholders
        function arrangeInnerWebparts($html) {
            $html.filter('[data-placeholder]').each(function (index, element) {
                var $webpartToMove = $(this);
                var placeholderSelector = $webpartToMove.attr('data-placeholder');
                var placeholder = $(placeholderSelector);
                var noteId = $webpartToMove.attr('data-noteid');
                placeholder.children('[data-noteId=' + noteId + ']').remove();
                $webpartToMove.appendTo(placeholder);
            });
        };


        function getToolTitle(requestData) {
            if (requestData.context && requestData.context.title) {
                return requestData.context.title;
            } else if (requestData.toolname in TranslationsJs) {
                return TranslationsJs[requestData.toolname];
            }
            return requestData.toolname;
        }

        function getFriendlyErrorTitle(jqXhr) {
            var friendlyError = jqXhr.getResponseHeader('IsFriendlyException');
            return friendlyError;
        };
        function getErrorTitle(jqXhr) {
            var errorTitle = jqXhr.getResponseHeader('ErrorTitle');
            errorTitle = browserDisplayIssue(errorTitle);

            if (!errorTitle) errorTitle = jqXhr.statusText;
            return errorTitle;
        };

        //Function created for incident no. IM433059

        function browserDisplayIssue(errorTitle)
        {
            if (errorTitle != undefined && errorTitle != "") {
                errorTitle = errorTitle.replace(/Ã¸/g, "ø");
                errorTitle = errorTitle.replace(/Ã¦/g, 'æ');
                errorTitle = errorTitle.replace(/Ãv/g, 'Øv');//changes made here for dannish error issue 
                errorTitle = errorTitle.replace(/Ã/g, 'Ø');
                errorTitle = errorTitle.replace(/˜/g, '');
                errorTitle = errorTitle.replace(/Ø¥/g, "å");


            }
            return errorTitle;
        }


        context.RefreshWP = function (sender) {
            var request = context.getFirstRequestData(sender);
            if (request.context && request.context.customerId) {
                request.context.taskId = TdcCustomerInformation.ToolCustomerTaskIDFSM;
                request.action = "Index";
            }
            context.ShowTool(request);
        };

        //fucntion to refresh webpart using focused Lid
        context.RefreshWPUsingFocusedLid = function (sender) {
            var request = context.getFirstRequestData(sender);
            context.ShowTool(request);
        }

    })(TdcAsyncWebPartLoader);


    $(TdcAsyncWebPartLoader.init);

})(jQuery);
