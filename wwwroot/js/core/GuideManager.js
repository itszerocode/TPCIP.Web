/// <reference path="guidetools/guidestep.js" />
/// <reference path="tools/receivecall.js" />
/// <reference path="tools/parkedguides.js" />
/// <reference path="tabmanager.js" />
/// <reference path="asyncwebpartloader.js" />
/// <reference path="pagestatesmanager.js" />

if (TdcGuideManager == null || typeof (TdcGuideManager) != "object") {
    var TdcGuideManager = new Object();
}


(function ($) {
    (function (context) {
        // Cached selectors.
        context.$guideTools = null;
        context.$guideSessionReplacableZones = null;
        context.etrayGuideOrArticleTitle = "";
       
        context.init = function () {           

            // Zones that are often filtered on together.
            context.$guideSessionReplacableZones = $();
            context.$guideSessionReplacableZones = context.$guideSessionReplacableZones.add('#GAASelector_placeholder');            
            context.$guideSessionReplacableZones = context.$guideSessionReplacableZones.add('#GuideStep_placeholder');
            context.$guideSessionReplacableZones = context.$guideSessionReplacableZones.add('#GuideActionButtons_placeholder');
            context.$guideSessionReplacableZones = context.$guideSessionReplacableZones.add(context.$guideTools);
            context.$guideSessionReplacableZones = context.$guideSessionReplacableZones.add('#CustomerHistoryInformationGuide_placeholder');
        };

        //params: entityId, entityType, customerId, rootCustomerId, noteText, entityTitle, sectionTitle, subsectionTitle, portalSection
        context.startGuideOrArticle = function (params) {
            $(window).scrollTop(0);

            //just activate tab if guide already opened and DON'T open the same guide twice
            if (activateGuideTab(params.entityId)) return;

            //TdcPageStatesManager.goToNewSession();


            var dataContext = params;
            dataContext.noteId = TdcUtils.createNewGuid(),
            dataContext.tabType = 'GuideStep';
            if (dataContext.rootCustomerId == undefined) dataContext.rootCustomerId = dataContext.customerId;

            dataContext.jobCodeValue = TdcCustomerInformation.JobKode == undefined ? "" : TdcCustomerInformation.JobKode;
            dataContext.orderType = TdcCustomerInformation.OrderType == undefined ? "" : TdcCustomerInformation.OrderType;
            dataContext.orderId = TdcCustomerInformation.OrdreTypeID == undefined ? "" : TdcCustomerInformation.OrdreTypeID;
            dataContext.svarsted = TdcReceiveCall.svarsted;
            dataContext.contextId = TdcReceiveCall.contextId;
            dataContext.departmentName = TdcMain.UserDepartment;
            dataContext.taskID = TdcCustomerInformation.ToolCustomerTaskIDFSM;

            TdcGuideManager.etrayGuideOrArticleTitle = params.entityTitle;
        
            var $tab = TdcTabManager.addNewTab(params.entityTitle, dataContext, false);
            $tab.attr('title', params.entityTitle + '  LID: ' + params.customerId);
            $tab.attr('data-focusedlid', params.customerId);
            $tab.attr('data-isarticle', params.entityType == "Article");
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "GuideStep",
                toolType: "guideTool",
                action: 'Start' + params.entityType,
                context: dataContext,
                callback: function (webpart,requestData) {
                    if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP) {
                    }
                    else {
                        var noteField = $('.GuideNoteWP[data-noteid=' + requestData.context.noteId + '] textarea');
                        noteField.trigger("click");
                        noteField.focus();
                    }

                    if (dataContext.noteId == TdcTabManager.getDataContext(TdcTabManager.$activeTab).noteId) {
                    }
                },
                errorcallback: function ($errorHtml) { addCloseTabButton($errorHtml, $tab); }
            });
        };

        context.resumeArticle = function (params) {
            $(window).scrollTop(0);

            //just activate tab if guide already opened and DON'T open the same guide twice
            if (activateGuideTab(params.entityId)) return;

            TdcPageStatesManager.goToNewSession();


            var dataContext = params;
            dataContext.noteId = TdcUtils.createNewGuid();
            dataContext.departmentName = TdcMain.UserDepartment;
            dataContext.tabType = 'GuideStep';
            if (dataContext.rootCustomerId == undefined) dataContext.rootCustomerId = dataContext.customerId;

            var $tab = TdcTabManager.addNewTab(params.entityTitle, dataContext, false);
            $tab.attr('title', params.entityTitle + '  LID: ' + params.customerId);
            $tab.attr('data-isarticle', params.entityType == "Article");

            TdcAsyncWebPartLoader.ShowTool({
                toolname: "GuideStep",
                toolType: "guideTool",
                action: 'Resume' + params.entityType,
                context: dataContext,
                callback: function () {
                    if (dataContext.noteId == TdcTabManager.getDataContext(TdcTabManager.$activeTab).noteId) {
                    }
                },
                errorcallback: function ($errorHtml) { addCloseTabButton($errorHtml, $tab); }
            });
        };

        context.startGuideFromHop2fakt = function (customerId, jobCodeName, jobCodeValue, msosOrderType, msosOrderNumber, guideName) {
            $(window).scrollTop(0);
            var entityId = jobCodeName;

            if (activateGuideTab(entityId)) return;

            TdcPageStatesManager.goToNewSession();

            var promise = TdcCustomerInformation.loadCustomer(customerId)
            promise.then(function (result) {

                if (msosOrderType != "CASTRO") {

                var parentAccountNo = TdcCustomerInformation.getSelectedCustomerAccountNo();
                var params = {
                    customerId: customerId,
                    rootCustomerId: customerId,
                    jobCodeName: jobCodeName,
                    jobCodeValue: jobCodeValue,
                    msosOrderType: msosOrderType,
                    msosOrderNumber: msosOrderNumber,
                    noteId: TdcUtils.createNewGuid(),
                    entityId: entityId,
                    guideName: guideName,
                    tabType: 'GuideStep',
                    parentAccountNo: parentAccountNo,
                    svarsted: TdcReceiveCall.svarsted,
                    departmentName : TdcMain.UserDepartment,
                    contextId: TdcReceiveCall.contextId,
                    portalSection: TdcMain.portalSection,
                    taskID: TdcCustomerInformation.ToolCustomerTaskIDFSM
                };
                var $tab = TdcTabManager.addNewTab(jobCodeName, params, false);
                $tab.attr('title', guideName + '  LID: ' + params.customerId);
                $tab.attr('data-isarticle', false);

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "GuideStep",
                    toolType: "guideTool",
                    action: 'StartGuideFromHop2Fakt',
                    context: params,
                    callback: function ($html, newNoteId) { //guideStep returns new noteId and we need update it;
                        $html.filter('div').each(function () {
                            TdcTabManager.addTabContent($(this));
                        });

                        $tab.text($html.filter('.GuideStepWP').attr('data-entitytitle'));                                                
                    },
                    errorcallback: function ($errorHtml) {
                        addCloseTabButton($errorHtml, $tab);     
                    }
                });
                }
            });
        };


        context.startGuideFromMyTP = function (customerId, jobCodeName, jobCodeValue, msosOrderType, msosOrderNumber, guideName) {
            $(window).scrollTop(0);
            var entityId = jobCodeName;
            var deferred = $.Deferred();
            if (activateGuideTab(entityId)) return;

            TdcPageStatesManager.goToNewSession();

            var promise = TdcCustomerInformation.loadCustomer(customerId, null, false, 'onsite_Ordredetaljer')
            promise.then(function (result) {

                if (msosOrderType != "CASTRO") {

                    var parentAccountNo = TdcCustomerInformation.getSelectedCustomerAccountNo();
                    var params = {
                        customerId: customerId,
                        rootCustomerId: customerId,
                        jobCodeName: jobCodeName,
                        jobCodeValue: jobCodeValue,
                        msosOrderType: msosOrderType,
                        msosOrderNumber: msosOrderNumber,
                        noteId: TdcUtils.createNewGuid(),
                        entityId: entityId,
                        guideName: guideName,
                        tabType: 'GuideStep',
                        parentAccountNo: parentAccountNo,
                        svarsted: TdcReceiveCall.svarsted,
                        departmentName: TdcMain.UserDepartment,
                        contextId: TdcReceiveCall.contextId,
                        portalSection: TdcMain.portalSection,
                        taskID: TdcCustomerInformation.ToolCustomerTaskIDFSM
                    };
                    var $tab = TdcTabManager.addNewTab(jobCodeName, params, false);
                    $tab.attr('title', guideName + '  LID: ' + params.customerId);
                    $tab.attr('data-isarticle', false);

                    TdcAsyncWebPartLoader.ShowTool({
                        toolname: "GuideStep",
                        toolType: "guideTool",
                        action: 'StartGuideFromHop2Fakt',
                        context: params,
                        callback: function ($html, newNoteId) { //guideStep returns new noteId and we need update it;
                            $html.filter('div').each(function () {
                                TdcTabManager.addTabContent($(this));                                
                            });

                            $tab.text($html.filter('.GuideStepWP').attr('data-entitytitle'));
                            deferred.resolve(true);
                            //if (context.userType == "COAX") {
                            //TdcMyOrder.ShowCSAMTab();
                            //}
                        },
                        errorcallback: function ($errorHtml) {
                            addCloseTabButton($errorHtml, $tab);                            
                            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP && TdcMyOrder.userType == "COAX") {
                            TdcMyOrder.ShowCSAMTab();
                            }
                            deferred.resolve(true);
                        }
                    });
                }
            });
            return deferred.promise();
        };


       

        context.resumeGuideOrShowHistoryInformation = function (noteId, entityId, entityTitle, portalId, callback) { 
           
            if (activateGuideTab(entityId)) return;

            //TdcPageStatesManager.goToNewSession();

            if (portalId != TdcAsyncWebPartLoader.portalId) {
                //openGuideHistoryTab
                context.openGuideHistoryTab(noteId, entityId, entityTitle);
            }
            else {
                //resume
                var dataContext = {
                    noteId: noteId,
                    tabType: 'GuideStep',
                    entityType: 'Guide',
                    entityId: entityId,
                    departmentName : TdcMain.UserDepartment,
                      
                };

                var $tab = TdcTabManager.addNewTab(entityTitle, dataContext, false);
                $tab.attr('data-isarticle', false);
                $(window).scrollTop(0);

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "GuideStep",
                    toolType: "guideTool",
                    action: 'ResumeGuide',
                    context: dataContext,
                    callback: function ($html, requestData) {
                        dataContext.customerId = $html.attr('data-customerid');
                        dataContext.rootCustomerId = $html.attr('data-rootcustomerid');
                        $tab.attr('title', entityTitle + '  LID: ' + dataContext.customerId);
                        callback($html, requestData);
                    },
                    errorcallback: function ($errorHtml) { addCloseTabButton($errorHtml, $tab); }
                });
            }
        };
        

        context.openGuideHistoryTab = function (noteId, entityId, entityTitle) {
            $(window).scrollTop(0);

            var $existingTab = TdcTabManager.$findTab({ noteId: noteId });
            if ($existingTab.length > 0) {
                TdcTabManager.activateTab($existingTab);
            }
            else {
                TdcPageStatesManager.goToNewSession();
                var dataContext = {
                    noteId: noteId,
                    tabType: 'CustomerHistoryInformationGuide'
                };

                var $tab = TdcTabManager.addNewTab(entityTitle, dataContext);
                $tab.attr('data-isarticle', false);
                $tab.wrapInner('<em></em>');
                $('<span/>').attr('class', 'glyphicon glyphicon-lock margin-right-10').prependTo($tab);

                TdcAsyncWebPartLoader.ShowTool({
                    toolname: "CustomerHistoryInformationGuide",
                    toolType: "guideTool",
                    context: dataContext,
                    errorcallback: function ($errorHtml) { addCloseTabButton($errorHtml, $tab); }
                });
            }
        };

        context.goToNextStep = function (noteId, responseId, stepStateData, noteText, entityType) {
            var dataContext = {
                noteId: noteId,
                noteText: noteText,
                responseId: responseId,
                stepStateData: stepStateData,
                entityType: entityType,
                departmentName : TdcMain.UserDepartment,                
            };

            var $existingGuideStepTools = $('[data-tooltype=guideStepTool][data-noteid=' + noteId + ']');

            TdcAsyncWebPartLoader.ShowTool({
                action: 'NextStep',
                toolname: "GuideStep",
                context: dataContext,
                callback: function (html) {
                    var $tab = TdcTabManager.$findTab({ noteId: dataContext.noteId });
                    TdcTabManager.removeTabContent($tab, $existingGuideStepTools);
                    if (TdcTabManager.isTabActive($tab)) {
                        $(window).scrollTop(0);
                    }
                }
            });
        };

        context.goToPreviousStep = function (noteId, stepStateData, noteText, stepId /*optional*/) {
            var curNoteId = noteId;
            showStep({
                action: 'PreviousStep',
                toolname: "GuideStep",
                context: {
                    noteId: noteId,
                    noteText: noteText,
                    stepStateData: stepStateData,
                    stepId: stepId,
                    departmentName: TdcMain.UserDepartment,
                },
                errorcallback: function () {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
            });
        };

        context.showNextStep = function (noteId, responseId, stepStateData, noteText) {
            var curNoteId = noteId;         
            showStep({
                action: 'NextStep',
                toolname: "GuideStep",
                context: {
                    noteId: noteId,
                    noteText: noteText,
                    responseId: responseId,
                    stepStateData: stepStateData,
                    departmentName: TdcMain.UserDepartment,
                },
                errorcallback: function () {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
            });
        };

        function showStep(requestData) {
            var $existingGuideStepTools = $('[data-tooltype=guideStepTool][data-noteid=' + requestData.context.noteId + ']');

            requestData.callback = function (html) {
                var $tab = TdcTabManager.$findTab({ noteId: requestData.context.noteId });
                TdcTabManager.removeTabContent($tab, $existingGuideStepTools);
                if (TdcTabManager.isTabActive($tab)) {
                    $(window).scrollTop(0);
                }
            }

            TdcAsyncWebPartLoader.ShowTool(requestData);
        }

        context.parkGuide = function (noteId, stepStateData, noteText, sender) {
            TdcMain.atleastOneNoteSaved = true;
            var $tab = TdcTabManager.$findTab({ noteId: noteId });
            var curNoteId = noteId;
            TdcAsyncWebPartLoader.DoAction({
                toolname: "GuideStep",
                action: 'ParkGuide',
                context: {
                    stepStateData: stepStateData,
                    noteId: noteId,
                    noteText: noteText,
                    additionalValues: $(TdcTabManager.$getTabs()).filter(".active").data('tab-additionalvalues'),
                    departmentName: TdcMain.UserDepartment,
               },
                callback: function () {
                    TdcTabManager.removeTab($tab);
                    TdcParkedGuides.refresh();
                },
                errorcallback: function () {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
                messageProcess: TranslationsJs.Parking_guide,
                messageSuccess: TranslationsJs.Guide_parked_succesfully,
                messageError: TranslationsJs.Aborting_guide + ' "' + TdcTabManager.getTabTitle($tab) + '" ' + TranslationsJs.failed + '.',
            }, sender);
        };

        //Bug ID041 : Added parameters noteText and entityType
        context.abortGuide = function (noteId, stepStateData, entityType, noteText, sender) {
            var $tab = TdcTabManager.$findTab({ noteId: noteId });
            var curNoteId = noteId;
            TdcAsyncWebPartLoader.DoAction({
                toolname: "GuideStep",
                action: 'CancelGuide',
                context: {
                    stepStateData: stepStateData,
                    noteId: noteId,
                    noteText: noteText,
                    entityType: entityType,
                },
                callback: function () {
                    //var noteText = TdcGuideStep.getNoteText(noteId);
                    TdcGuideSelector.setNoteText("");
                    TdcTabManager.removeTab($tab);
                    TdcParkedGuides.refresh();
                },
                errorcallback: function () {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
                messageProcess: TranslationsJs.Aborting_guide,
                messageSuccess: TranslationsJs.Guide_was_aborted,
                messageError: TranslationsJs.Aborting_guide + ' "' + TdcTabManager.getTabTitle($tab) + '" ' + TranslationsJs.failed + '.',
            }, sender);
        };

        context.restartGuide = function (noteId, stepStateData, noteText, sender) {
            var $tab = TdcTabManager.$findTab({ noteId: noteId });
            var $existingGuideStepTools = context.$guideSessionReplacableZones.find('[data-tooltype=guideStepTool][data-noteid=' + noteId + ']');
            var curNoteId = noteId;
            TdcAsyncWebPartLoader.ShowTool({
                toolname: "GuideStep",
                action: 'RestartGuide',
                context: {
                    stepStateData: stepStateData,
                    noteId: noteId,
                    noteText: noteText,
                    departmentName: TdcMain.UserDepartment,
                },
                callback: function () {
                    TdcTabManager.removeTabContent($tab, $existingGuideStepTools);
                },
                errorcallback : function() {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
                messageProcess: TranslationsJs.Restarting_guide,
                messageSuccess: TranslationsJs.Guide_was_restarted,
                messageError: TranslationsJs.Restarting_guide + ' "' + TdcTabManager.getTabTitle($tab) + '" ' + TranslationsJs.failed + '.',
            }, sender);
        };

        context.completeGuide = function (noteId, noteText, stepStateData, sender, entityType, callfromDashboardLink) {
            var $guideStepTool = TdcAsyncWebPartLoader.getToolByName("GuideStep", noteId);
        
            if (TdcMain.etrayCIPTagsValues[noteId] != undefined && TdcMain.etrayCIPTagsValues[noteId].length > 0) {

                    var etrayCipTag = TdcMain.etrayCIPTagsValues[noteId][TdcMain.etrayCIPTagsValues[noteId].length - 1].tags;  // get cip tags for etrayCallEvent 
                    var etrayCipTagValue = TdcMain.etrayCIPTagsValues[noteId][TdcMain.etrayCIPTagsValues[noteId].length - 1].tagValues;   // get cip tag values for etrayCallEvent 

                    var etrayGuideSessionId = $('.GuideStepWP').filter(':visible').attr('data-sessionid');
                    var etrayCustomerId = TdcCustomerInformation.getSelectedCustomerId();
                    var etrayAccountNumber = TdcCustomerInformation.getSelectedCustomerAccountNo();
                    var userId = TdcCustomerInformation.UserId;
                    var technology = "FIXED";
                    var date = new Date();
                    var dateTime = date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
                    var etraySectionTitle = $('.navbar-collapse').find("[data-portalsectionname='" + TdcMain.portalSection + "']")[0].innerText;                 
                    var etrayGuideOrArticleTitle = $guideStepTool.attr('data-entitytitle').replace("%", " ");  // Handled % by replacing it by blank space as it was giving issue with the guide title while passing it in the etray URL                
                    var etrayContextId = TdcReceiveCall.contextId;
                    var note = $('.tempGuideNoteTextarea').filter(":visible").val().replace(/ /g, "_");
               
                    var etrayUrl = "https://etray.yousee.dk/Privat/N/Portal/Master.html?token=Cjh7SalJdtN/obcQoB0eSMZzpIpCzPbM&CIP_SESSION_ID=" + etrayGuideSessionId + "&LID=" + etrayCustomerId + "&ACCOUNT_NO=" + etrayAccountNumber + "&USER_ID=" + userId + "&TECHNOLOGY=" + technology + "&CIP_TIMESTAMP=" + dateTime + "&AREA=" + etraySectionTitle + "&TITLE=" + etrayGuideOrArticleTitle + "&AVAYA_CALLID=" + etrayContextId + "&" + etrayCipTag + "=" + etrayCipTagValue + "&Note=" + note + "";
                    $("#iframeCallEventEtrayURL").attr('src', etrayUrl);
                    setTimeout(function () {
                    context.completeGuideCIPTag(noteId, noteText, stepStateData, sender, entityType, callfromDashboardLink);
                }, 6000);
            }

            else {
                context.completeGuideCIPTag(noteId, noteText, stepStateData, sender, entityType, callfromDashboardLink);
            }
        };


        context.completeGuideCIPTag = function (noteId, noteText, stepStateData, sender, entityType, callfromDashboardLink) {
            TdcMain.atleastOneNoteSaved = true;
            var $tab = TdcTabManager.$findTab({ noteId: noteId });
            var curNoteId = noteId;
            TdcAsyncWebPartLoader.DoAction({
                toolname: "GuideStep",
                action: 'CompleteGuide',
                context: {
                    stepStateData: stepStateData,
                    noteId: noteId,
                    noteText: noteText,
                    entityType: entityType,
                    additionalValues: $(TdcTabManager.$getTabs()).filter(".active").data('tab-additionalvalues'),
                    departmentName: TdcMain.UserDepartment,
                },
                callback: function () {
                    TdcTabManager.removeTab($tab);
                    if (typeof (callfromDashboardLink) == undefined || typeof (callfromDashboardLink) == "undefined" || callfromDashboardLink == false) {
                        //Bug 1360: Corrected logic to get the active guide tab count and then compare it if it is > 0                    
                        if (context.$getActiveGuideTabs().length > 0 || context.$getActiveFasoTabs().length > 0 || context.$getActiveLinkTabs().length > 0) {
                            TdcGuideSelector.activate();
                            TdcCustomerHistoryInformation.refresh();
                        } else {
                            TdcMain.goToDashboard = true;
                            TdcMain.showDashboard();
                        }
                    }
                },
                errorcallback: function () {
                    TdcGuideStep.EnableActionButtons(curNoteId);
                },
                messageProcess: TranslationsJs.Completing_guide,
                messageSuccess: TranslationsJs.Guide_was_completed,
                messageError: TranslationsJs.Complete_guide + ' "' + TdcTabManager.getTabTitle($tab) + '" ' + TranslationsJs.failed + '.',
            }, sender);
        };

        context.parkOpenedGuides = function (sender, callfromDashboardLink) {
            $.each(context.$getActiveGuideTabs(), function () {
                var dataContext = TdcTabManager.getDataContext($(this));
                var stepStateData = TdcGuideStep.getStepStateData(dataContext.noteId);
                var noteField = $('.GuideNoteWP[data-noteid=' + dataContext.noteId + '] textarea');
                var noteText = noteField.val();

                if (!TdcGuideSelector.isValidNoteText(noteField)) {
                    TdcGuideSelector.errorOutNoteField(noteField);
                    TdcMain.goToDashboard = false;
                    var $tab = TdcTabManager.$findTab({ noteId: dataContext.noteId });
                    $tab.addClass("inValidNoteText");
                    return;
                }

                if ($(this).data("isarticle") == undefined || $(this).data("isarticle") != true)
                {//dont call parkGuide in case of articles
                    context.parkGuide(dataContext.noteId, stepStateData, noteText, sender);
                }
                else if ($(this).data("isarticle") != undefined || $(this).data("isarticle") == true) {// call complete guide in case of Article
                    context.completeGuide(dataContext.noteId, noteText, stepStateData, sender, "Article", callfromDashboardLink);
                }
            });
        };

        context.closeAndSaveOpenedGuidesAndArticle = function (sender, callfromDashboardLink) {
            $.each(context.$getActiveGuideTabs(), function () {
                var dataContext = TdcTabManager.getDataContext($(this));
                var stepStateData = TdcGuideStep.getStepStateData(dataContext.noteId);
                var noteField = $('.GuideNoteWP[data-noteid=' + dataContext.noteId + '] textarea');
                var noteText = noteField.val();

                //if (!TdcGuideSelector.isValidNoteText(noteField)) {
                //    TdcGuideSelector.errorOutNoteField(noteField);
                //    TdcMain.goToDashboard = false;
                //    var $tab = TdcTabManager.$findTab({ noteId: dataContext.noteId });
                //    $tab.addClass("inValidNoteText");
                //    return;
                //}

                //if ($(this).data("isarticle") == undefined || $(this).data("isarticle") != true) {//dont call parkGuide in case of articles
                //    context.parkGuide(dataContext.noteId, stepStateData, noteText, sender);
                //}
                //else if ($(this).data("isarticle") != undefined || $(this).data("isarticle") == true) {
                // call complete guide in case of Article
                var entitytype = $(this).data("isarticle") != undefined || $(this).data("isarticle") == true ? "Article" : "Guide";
                context.completeGuide(dataContext.noteId, noteText, stepStateData, sender, entitytype, callfromDashboardLink);
                //}
            });
        };

        context.$getActiveGuideTabs = function () {
            return TdcTabManager.$findTabs({ tabType: 'GuideStep' });
        };

        context.$getActiveFasoTabs = function () {
            return TdcTabManager.$findTabs({ tabType: 'Faso' });
        };

        //Gets the active Link tabs
        context.$getActiveLinkTabs = function () {
            return TdcTabManager.$findTabs({ tabType: 'Link' });
        };


        function activateGuideTab(entityId) { //returns Boolean
            var $existingTab = TdcTabManager.$findTab({ entityId: entityId });
            if ($existingTab.length != 0) {
                TdcTabManager.activateTab($existingTab);
                return true;
            }
            return false;
        }

        function addCloseTabButton($errorHtml, $tab) {
            var $closeBtn = TdcUtils.instantiateTemplate("closeTabBtnTemplate")
                .click(function (e) {
                    TdcTabManager.removeTab($tab);
                    e.preventDefault();
                });
            $errorHtml.find('.btnRetry').parent().append('&nbsp;').append($closeBtn);
        }


    })(TdcGuideManager);

    $(TdcGuideManager.init);

    $(document).ready(function () {        
        TdcAsyncWebPartLoader.$rootElement.on(TdcAsyncWebPartLoader.toolLoadedEventName, function (event, html) {
            if ($(html).hasClass("GuideStepWP")) {
                var noteId = $(html).data('noteid');
                $tab = TdcTabManager.$findTab({ noteId: noteId });
                TdcMain.SetPortalSection($tab);
            }
        });

    });

})(jQuery);