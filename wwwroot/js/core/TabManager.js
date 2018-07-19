/// <reference path="asyncwebpartloader.js" />
/// <reference path="utils.js" />
/// <reference path="libs/jquery-1.10.2.intellisense.js" />


if (TdcTabManager == null || typeof (TdcTabManager) != "object") {
    var TdcTabManager = new Object();
}


(function ($) {
    (function (context) {
        var tabCounter = 0;

        context.activeTabChangedEventName = "activeTabChanged";
        context.$activeTab = undefined;

        // Cached selectors.
        context.$tabsPlaceholder = undefined;

        context.init = function () {
            context.$tabsPlaceholder = $('#Tabs_placeholder');
        }

        context.addNewTab = function (tabTitle, dataContext, isPinnedToEnd, showSaveCloseBtn, showCancelBtn, isToolTab, showBackBtn) {
            var tabId = TdcUtils.createNewGuid();
            //$('<div/>').html(tabTitle).attr('data-additionalvalues', {});
            var $newTabButton = $('<div/>').html(tabTitle).attr('data-tabid', tabCounter++);
            $newTabButton.data('tab-additionalvalues', new Array());
            $newTabButton.data('tab-datacontext', dataContext);
            $newTabButton.data('tab-content', new Array());
            $newTabButton.data('tab-menucontent', {});

            $newTabButton.data('tab-mainMenu', TdcMain.portalSection);

            if (isToolTab) {
                $newTabButton.addClass('sessionTab');
            }

            if (isPinnedToEnd) {
                $newTabButton.addClass('pinnedToEnd');
                context.$tabsPlaceholder.append($newTabButton);
            } else {
                var $pinned = context.$tabsPlaceholder.children().filter('.pinnedToEnd:first');
                if ($pinned.length == 1) $newTabButton.insertBefore($pinned);
                else context.$tabsPlaceholder.append($newTabButton);
            }

            $newTabButton.click(function () { //activate on click
                context.activateTab($(this));
            });

            onTabAdded(tabId, $newTabButton);
            var closeButton = $(' <div class="clearfix closeButton"><div class="pull-right"><div class="btn call-actions-restart color-primary pull-right" onclick="TdcTabManager.removeTab(TdcTabManager.$activeTab);"><span class="ion-close"></span><small class="call-actions-remove-text">'+TranslationsJs.Cancel+'</small></div></div></div>').attr('data-noteid', dataContext.noteId);

            var SaveButton = $('<div class="btn color-success call-actions-ok pull-right" data-entitytype="Guide" data-toggle="tooltip" title="" data-original-title="Gem og afslut igangværende guide" onclick="TdcGuideSelector.SaveToolSessionNoteButtonClicked(this)"><span class="ion-checkmark"></span><small>Afslut &amp; Luk</small></div>').attr('data-noteid', dataContext.noteId);

            var BackButton = $('<div class="clearfix backButton"><div class="pull-left"><div style="margin-left:-10px" class="btn call-actions-restart pull-left" onclick="TdcTabManager.removeTab(TdcTabManager.$activeTab);"><span style="font-size:17px;" class="icon ion-arrow-left-a"></span><small  style="position:absolute;margin-top:1px;" class="call-actions-remove-text">&nbsp;Tilbage</small></div></div></div>').attr('data-noteid', dataContext.noteId);
                
            var $actionBtnPlaceholder = $('#placeholder_actionbuttons');
            if (showSaveCloseBtn) {
                $actionBtnPlaceholder.append(SaveButton);
                TdcTabManager.addTabContent($newTabButton, SaveButton);
            }

            if (showCancelBtn) {
                $actionBtnPlaceholder.append(closeButton);
                TdcTabManager.addTabContent($newTabButton, closeButton);
            }

            if (showBackBtn) {
                $actionBtnPlaceholder.append(BackButton);
                TdcTabManager.addTabContent($newTabButton, BackButton);
            }

            context.activateTab($newTabButton); //activate now
            if (TdcMain.portalSection == "ch_kundeservice") {
                $("#Tabs_placeholder").find(".pinnedToEnd").hide();
            }
            else if (TdcMain.portalSection == "csam_tsc") {
                $("#Tabs_placeholder").hide();
            }
            else {
                $("#Tabs_placeholder").find(".pinnedToEnd").show();
            }
            
            return $newTabButton;
        };

        context.addToolSessionTab = function (e, toolName, tabTitle, showSaveCloseBtn, showCancelBtn, callback, showNoter, showBackBtn, showCompleteButton) { //showCompleteButton added to show the button gem button under noter when the tool is opened from timeline
            $(window).scrollTop(0);
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            var $existingTab = TdcTabManager.$findTab({ tabInfo: toolName });
            if ($existingTab.length != 0) {
                var isActiveTab = TdcTabManager.isTabActive($existingTab);
                TdcTabManager.activateTab($existingTab);
                if (callback)
                    callback();
                return !isActiveTab;
            }

            var target = e.target ? e.target : e.srcElement;

            var $sender = $(target);
            var webpart = TdcAsyncWebPartLoader.getTool($sender);
            var notewebpart = TdcAsyncWebPartLoader.getTool($('#GAASelectorNote_placeholder .GuideNoteWP'));

            var requestData = TdcAsyncWebPartLoader.getLastRequestData($sender);
            var noteId = requestData.context.noteId;
            var isGuideTool = noteId != undefined;
            var dataContext = {
                tabInfo: toolName,
                customerId: TdcCustomerInformation.getSelectedCustomerId(),
                tabType: TdcGuideSelector.linkTabType,
                noteId: toolName,
            };

            var $tab = TdcTabManager.addNewTab(tabTitle, dataContext, false, showSaveCloseBtn, showCancelBtn, true, showBackBtn);

            if (showNoter == undefined || showNoter == true) {
                var $noteplaceholder = TdcAsyncWebPartLoader.getToolPlaceholder('GuideNote', false);
                var notewebpartcopy = notewebpart.clone();
                //for mandatory note, might be required in future.
                notewebpartcopy.find(".invalidInput").removeClass("invalidInput");
                notewebpartcopy.find(".errorMessage").css("display", "none");
                notewebpartcopy.data('noteid', toolName);
                notewebpartcopy.attr('data-noteid', toolName);
                $(notewebpartcopy).find(".completeGuideButton").attr("onclick", "TdcGuideSelector.SaveToolSessionNoteButtonClicked(this)");
                
                if (showCompleteButton) {
                    $(notewebpartcopy).find(".completeGuideButton").css("display", "block");
                    $(notewebpartcopy).find(".completeGuideButton").attr("data-noteid", toolName);
                    $(notewebpartcopy).find(".completeGuideButton").addClass("isTimeline");//so that user is not navigated to dashboard even if single tab is open
                } else {
                    $(notewebpartcopy).find(".completeGuideButton").css("display", "none");
                }


                if ($(notewebpartcopy).find("textarea").val() == $(notewebpartcopy).find("textarea").attr("placeholder") || $.trim($(notewebpartcopy).find("textarea").val()) == "")//for placeholder issue in IE
                $(notewebpartcopy).find("textarea").val("");

                $noteplaceholder.prepend(notewebpartcopy);
                TdcTabManager.addTabContent($tab, notewebpartcopy);

                $(notewebpartcopy).find("textarea").trigger("click");
                $(notewebpartcopy).find("textarea").focus();

                TdcTabManager.reActivateTab($tab);
            }
            if (callback)
                callback();
            return true;
        }

        context.addSearchToolSessionTab = function (e, toolName, tabTitle, showSaveCloseBtn, showCancelBtn, callback) {
            $(window).scrollTop(0);
            e.preventDefault ? e.preventDefault() : (e.returnValue = false);

            var $existingTab = TdcTabManager.$findTab({ tabInfo: toolName });
            if ($existingTab.length != 0) {
                var isActiveTab = TdcTabManager.isTabActive($existingTab);
                TdcTabManager.activateTab($existingTab);
                if (callback)
                    callback();
                return !isActiveTab;
            }

            var target = e.target ? e.target : e.srcElement;

            var $sender = $(target);
            //var webpart = TdcAsyncWebPartLoader.getTool($sender);
            //var notewebpart = TdcAsyncWebPartLoader.getTool($('#GAASelectorNote_placeholder .GuideNoteWP'));

            //var requestData = TdcAsyncWebPartLoader.getLastRequestData($sender);
            var noteId = toolName;// requestData.context.noteId;
            //var isGuideTool = noteId != undefined;
            var dataContext = {
                tabInfo: toolName,
                customerId: TdcCustomerInformation.getSelectedCustomerId(),
                tabType: TdcGuideSelector.linkTabType,
                noteId: toolName,
            };

            var $tab = TdcTabManager.addNewTab(tabTitle, dataContext, false, showSaveCloseBtn, showCancelBtn, true);
            
            if (callback)
                callback();
            return true;
        }

        context.addTabContent = function ($tab, html) {
            if (!$tab.data('tab-content')) return;
            var $html = (html instanceof jQuery) ? html : $(html);
            if (!$tab.closest(document.documentElement)) { //tab was already removed
                $html.remove();
                return;
            }

            if (!context.isTabActive($tab)) $html.hide();            
            $html.each(function (index, element) {
                $tab.data('tab-content').push(element);
            });
            
        }
        
        context.addMainMenuContent = function (menu, html) {
            var $tab = $("#portalmenubar li." + menu);
            var $html = (html instanceof jQuery) ? html : $(html);
            //Check if GAA is Active or atleast the tool's SessionTab is active.
            if (TdcMain.portalSection == menu && (TdcTabManager.isTabActive(TdcGuideSelector.$tabButton) || TdcTabManager.$findTab({ noteId: menu })))
                $html.show();
            else
                $html.hide();

            //if (TdcMain.portalSection != menu) $html.hide();
            if ($tab.data('tab-menucontent') == undefined) {
                $tab.data('tab-menucontent', []);
            }
            $html.each(function (index, element) {
                $tab.data('tab-menucontent').push(element);
            });
        }

        context.addGAATabContent = function (menu, html) {
            var $tab = TdcGuideSelector.$tabButton;
            var $html = (html instanceof jQuery) ? html : $(html);

            if (TdcMain.portalSection == menu && TdcTabManager.isTabActive(TdcGuideSelector.$tabButton))
                $html.show();
            else
                $html.hide();

            if ($tab.data(menu) == undefined) {
                $tab.data(menu, []);
            }
            $html.each(function (index, element) {
                $tab.data(menu).push(element);
            });
        }

        context.removeTabContent = function ($tab, html) {
            var $html = (html instanceof jQuery) ? html : $(html);
            var tabContent = context.$getTabContent($tab);
            $html.each(function (i, element) {
                if (tabContent) {
                    var index = $.inArray(element, tabContent);
                    if (index > 0) tabContent.splice(index, 1);
                }
            });
            $html.remove();
        }

        context.removeMainMenuContent = function (menu, html) {
            var $html = (html instanceof jQuery) ? html : $(html);
            var mainMenuContent = context.$getMainMenuContent(menu);
            $html.each(function (i, element) {
                if (mainMenuContent) {
                    var index = $.inArray(element, mainMenuContent);
                    if (index > 0) mainMenuContent.splice(index, 1);
                }
            });
            $html.remove();
        }

        context.removeGAATabContent = function (menu, html) {
            var $html = (html instanceof jQuery) ? html : $(html);
            var GAATabContent = context.$getGAATabContent(menu);
            $html.each(function (i, element) {
                if (GAATabContent) {
                    var index = $.inArray(element, GAATabContent);
                    if (index > 0) GAATabContent.splice(index, 1);
                }
            });
            $html.remove();
        }

        context.$findTab = function (dataContextProperties) { //finds tab by datacontext. compares properties of data with tab's datacontext. e.g. $findTab({ entityId = "Breband" }) return tab which datacontext has entityId=="Breband"            
            return context.$findTabs(dataContextProperties).first();
        }

        context.$findTabs = function (dataContextProperties) {
            return context.$findTabsByPredicate(function ($tab) {
                var dataContext = context.getDataContext($tab);
                if (!dataContext) return false;
                for (var prop in dataContextProperties) {
                    if (!(prop in dataContext)) return false;
                    if (dataContextProperties[prop] != dataContext[prop]) return false;
                }
                return true;
            });
        }

        context.$findTabsByPredicate = function (predicateFunction) { //predicateFuction takes $tab paremeter and should return boolean
            return context.$getTabs().filter(function (index, tab) {
                return predicateFunction($(tab));
            });
        }

        context.$findTabByContentElement = function (element) { //gets tab to which element belongs
            return context.$findTabsByPredicate(function ($tab) {
                var $tabContent = context.$getTabContent($tab);
                for (var i = 0; i < $tabContent.length; i++) {
                    var contentElement = $tabContent[i];
                    if (element == contentElement || $(contentElement).has(element).length > 0) {
                        return true;
                    }
                }
                return false;
            });
        };

        context.activateTab = function ($tab) {            
            if (context.isTabActive($tab)) {                
                return;
            }
            
            var $oldTab = context.$activeTab;
            context.$activeTab = $tab;

            if ($oldTab) {
                context.$getTabContent($oldTab).hide();                
                
                if (context.$getMainMenuContent(TdcMain.portalSection)) {
                    if ($tab.hasClass("pinnedToEnd") || $tab.hasClass("sessionTab")) {
                        $(context.$getMainMenuContent(TdcMain.portalSection)).show();
                    }
                    else {
                        $(context.$getMainMenuContent(TdcMain.portalSection)).hide();
                    }
                }
                if (context.$getGAATabContent(TdcMain.portalSection)) {
                    if ($tab.hasClass("pinnedToEnd")) { //|| $tab.hasClass("sessionTab")
                        $(context.$getGAATabContent(TdcMain.portalSection)).show();
                    }
                    else {
                        $(context.$getGAATabContent(TdcMain.portalSection)).hide();
                    }
                }
                //else {
                //    if ($tab.hasClass("pinnedToEnd"))
                //        TdcMain.loadPortalSectionTool(TdcCustomerInformation.getSelectedCustomerId());
                //}

                $oldTab.removeClass('active');
            }
            context.$getTabContent($tab).show();            

           /** 
           * @Description: Incident IM369694: Browse Freeze issue
           * @Type : 
           * @Parameters : 
           * @Returns : 
           * @Author : Akshay Lodha @Date : 02112015 
           * @Project :  IM369694
           * @History : Browser used to get freeze when the tab was activated second time & when 
                        browser was getting freeze when the modal(popup) was unintentionally getting 
                        activated with Display:Block
           **/
            context.$getTabContent($tab).filter('.modal').hide();

            $tab.addClass('active');            
            TdcMain.SetPortalSection($tab);
            if ($tab.context != undefined) {
                if ((TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP) && $tab.context.innerText == "CSAM") {
                    TdcUI.hideRightPanel($('#tdc_rightPanelHandle'));
                }
                else {
                    TdcUI.showRightPanel($('#tdc_rightPanelHandle'));
                }
            }
            onActiveTabChanged($tab, $oldTab);
        };

        context.reActivateTab = function ($tab) {           
                context.$getTabContent($tab).show();                
        };
        
        context.activateMainMenuGuideTools = function (selMenu) {            
            for (var mainMenuTool in TdcMain.MenuSpecificGuideTools) {
                var tools = context.$getMainMenuContent(mainMenuTool);
                if (tools != undefined) {                    
                    if (selMenu == mainMenuTool && TdcTabManager.isTabActive(TdcGuideSelector.$tabButton)) {
                        $(tools).show();
                    }
                    else {
                        $(tools).hide();
                    }
                }
            }
        };

        context.activateGAATools = function (selMenu) {
            for (var mainMenuGAATool in TdcMain.MenuSpecificGAAGuideTools) {
                var tools = context.$getGAATabContent(mainMenuGAATool);
                if (tools != undefined) {
                    if (selMenu == mainMenuGAATool &&  TdcTabManager.isTabActive(TdcGuideSelector.$tabButton) ) {
                        $(tools).show();
                    }
                    else {
                        $(tools).hide();
                    }
                }
            }
        };

        context.removeMainMenuGuideTools = function () {
            for (var mainMenuTool in TdcMain.MenuSpecificGuideTools) {
                var tools = context.$getMainMenuContent(mainMenuTool);
                if (tools != undefined) {                    
                    $(tools).remove();
                }
            }
        };        

        context.removeTab = function ($tabOrDataContextProperties) {
            var $tab;
            if ($tabOrDataContextProperties instanceof jQuery) $tab = $tabOrDataContextProperties;
            else $tab = context.$findTab($tabOrDataContextProperties);
            var changeActiveTab = context.isTabActive($tab);

            context.$getTabContent($tab).remove();
            $tab.remove();

            onTabRemoved($tab);

            if (changeActiveTab) {
                var $tabToActivate = context.$tabsPlaceholder.children().filter('.pinnedToEnd:first');
                if ($tabToActivate.length == 0) {
                    $tabToActivate = context.$tabsPlaceholder.children().first();
                }
                context.activateTab($tabToActivate);
            }

            //To show the consumptionoverview when annuler pressed on consumptiondetails
            $('#ToolConsumption_placeholder').show();

            if (!(TdcTabManager.$getTabs().not(".pinnedToEnd").length > 0)) {
                $("#Tabs_placeholder").find(".pinnedToEnd").hide();
             if (TdcMain.portalSection == "csam_tsc") {
                    $("#Tabs_placeholder").hide();
                }
            }
           
            else {
                if (TdcMain.portalSection == "ch_kundeservice") {
                    $("#Tabs_placeholder").find(".pinnedToEnd").hide();
                }
                else if (TdcMain.portalSection == "csam_tsc") {
                    $("#Tabs_placeholder").hide();
                }
                else {
                    $("#Tabs_placeholder").find(".pinnedToEnd").show();
                }
            }
            ToolConsumption.load($tabOrDataContextProperties);
        };

        context.$getTabs = function () {
            return context.$tabsPlaceholder.children();
        }

        context.isTabActive = function ($tab) {
            return $tab.hasClass('active');
        };

        context.getTabTitle = function ($tab) {
            return $tab.text();
        };

        context.getDataContext = function ($tab) {
            var dataContext = $tab.data('tab-datacontext');
            return dataContext ? dataContext : {};
        };

        context.$getTabContent = function ($tab) {
            return $($tab.data('tab-content'));
        }

        context.$getMainMenuContent = function (menu) {
            var $tab = $("#portalmenubar li." + menu);
            return $tab.data('tab-menucontent');
        }

        context.$getGAATabContent = function (menu) {
            var $tab = TdcGuideSelector.$tabButton;
            return $tab.data(menu);
        }

        context.getTabsCount = function () {
            return context.$getTabs().length;
        };


        //events: activeTabChanged, onTabAdded, onTabRemoved
        context.subscribe = function (eventName, handler) {
            context.$tabsPlaceholder.on(eventName, handler);
        };

        function onActiveTabChanged($tab, $oldTab) {
            context.$tabsPlaceholder.triggerHandler('activeTabChanged', [$tab, $oldTab]);
        }

        function onTabAdded($tab) {
            context.$tabsPlaceholder.triggerHandler('tabAdded', [$tab]);
        }

        function onTabRemoved($tab) {
            context.$tabsPlaceholder.triggerHandler('tabRemoved', [$tab]);
        }

//endevents

    })(TdcTabManager);

    $(document).ready(TdcTabManager.init);

})(jQuery);