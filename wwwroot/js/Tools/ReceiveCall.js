/// <reference path="../main.js" />
/// <reference path="customerhistoryinformation.js" />
/// <reference path="../asyncwebpartloader.js" />
/// <reference path="../guidemanager.js" />
/// <reference path="../pagestatesmanager.js" />

if (TdcReceiveCall == null || typeof (TdcReceiveCall) != "object") {
    var TdcReceiveCall = new Object();
}


(function ($) {
    (function (context) {
        var $startCallBtn = undefined;
        var $timerContainer = undefined;
        var timerValue = undefined;
        var updateTime = undefined;
        var time = 0;
        context.svarsted = "";
        context.contextId = "";
        context.ReceivedInValidLid = false;
        context.receivedCallCustomerId = "";
        context.init = function () {

            $startCallBtn = $('#startCall');
            $timerContainer = $('#timerContainer');
            timerValue = $timerContainer.find('#timerValue');

            //receive call on cltr+m
            $(document).on('keydown.ciputils', function (e) {
                if (e.ctrlKey && e.which === 77) { // ctrl + m
                    if (context.receiveCallIfValid()) {
                        e.preventDefault();
                    }
                }
            });
        };

        context.receiveCallIfValid = function () {
            TdcCustomerInformation.installationSeqNo = "";
            TdcCustomerInformation.AddLookupInstallationSeqNo = "";
            TdcCustomerInformation.foundInWholesale = "";
            TdcCustomerInformation.parentSegment = "";
            TdcCustomerInformation.AmsId = "";
            TdcCustomerInformation.AreaId = "";
            TdcCustomerInformation.AnleagId = "";

            if (!canRecieveCall) return false;


            var $message = TdcUI.createMessage(TranslationsJs.Receive_Next_Call + " " + TranslationsJs.isInProgress, TdcUI.messageOptions.info, null, true, $startCallBtn);
            $startCallBtn.addClass('hidden');

            TdcAsyncWebPartLoader.DoAction({
                toolname: "ReceiveCall",
                action: "Receive",
                callback: function (callInfo) {
                    context.svarsted = callInfo.Svarsted;
                    context.contextId = callInfo.ContextId;
                    context.receivedCallCustomerId = callInfo.CustomerId;
                    callStarted(callInfo, $message);
                },
                errorcallback: function (jqXhr) {
                    var message = TranslationsJs.Receive_call_failed;
                    var errorTitle = jqXhr.getResponseHeader('ErrorTitle');
                    if (errorTitle) {
                        message += "<br />" + errorTitle;
                    }
                    $message.updateMessage(TdcUI.createErrorLink(TranslationsJs.Receive_Next_Call, message), TdcUI.messageOptions.error, jqXhr.responseText, false);
                    context.endCall();
                }
            });

            return true;
        };

        function canRecieveCall() {
            var isCipPortal = TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.CIP;
            var isSessionOverview = TdcPageStatesManager.getCurrentState() == TdcPageStatesManager.states.sessionOverview;

            return isCipPortal && isSessionOverview;
        }

        function callStarted(callInfo, $searchMessage) {
            var message = TranslationsJs.Unable_to_receive_call;

            var lidCheckList = context.CheckAndReturnValidLid(callInfo.CustomerId);
            callInfo.CustomerId = lidCheckList.Lid;
            setRecieveCallLidValidation(lidCheckList);

            if (context.ReceivedInValidLid) {
                message = TranslationsJs.InvalidLidFormat + " " + callInfo.CustomerId;
            }
            if (callInfo.CustomerId && !context.ReceivedInValidLid) {
                //make sure that customer information is loaded before loading guides and article
                var promise = TdcCustomerInformation.loadCustomer(callInfo.CustomerId, undefined, false, callInfo.PortalSection, true)
                
                promise.then(function (result) {// when customer is loaded successfully this fucntion is called
                    //TdcMain.changePortalSection(callInfo.PortalSection, function () {
                        //TdcGuideSelector.showSection(callInfo.MainSection);
                    //});
                    $searchMessage.remove();
                    TdcPageStatesManager.goToNewSession();
                    $timerContainer.removeClass('hidden');
                }, function () {// when customer is NOT loaded this fucntion is called 
                    $searchMessage.remove();
                    context.endCall();
                    TdcSearchCustomer.$customerSearchBox.val(callInfo.CustomerId);
                    TdcSearchCustomer.$customerSearchBox.removeClass("invalidInput");

                    message = TranslationsJs.No_customer_found;
                    //var data = "<pre>" + JSON.stringify(callInfo, null, "\t") + '</pre>';  
                    var htmlLink = '<br><a id="EmergencyState" href="#" onclick="TdcSearchCustomer.Emergencycustomerlookup(this,\'' + callInfo.CustomerId + '\');" >Emergency</a>';
                    var $message = TdcUI.createMessage(message, TdcUI.messageOptions.error, null, false, $startCallBtn, "", htmlLink);
                });
            } else {
                $searchMessage.remove();
                context.endCall();
                var data = "<pre>" + JSON.stringify(callInfo, null, "\t") + '</pre>';
                var $message = TdcUI.createMessage(message, TdcUI.messageOptions.error, data, false, $startCallBtn);
            }
        }

        function setRecieveCallLidValidation(lidCheckList) {

            TdcSearchCustomer.$customerSearchBox.removeClass("invalidInput");
            context.ReceivedInValidLid = false;
            if (!lidCheckList.IsValidLid) {
                TdcSearchCustomer.$customerSearchBox.val(lidCheckList.Lid);
                TdcSearchCustomer.$customerSearchBox.addClass("invalidInput");
                context.ReceivedInValidLid = true;
            }
        }

        context.CheckAndReturnValidLid = function CheckAndReturnValidLid(lid) {
            // Resolver Phase: Below regex's to ensureto match digit as 8,9 & 12 only & if Letters then XX + 6d (where x is char and d is digit)
            var lidAccDigitsRange = /^[0-9]{6,9}$/;
            var twelveDigitsRange = /^[0-9]{12}$/;
            var letterCheck = /^[A-Za-z]{2}[0-9]{6}$/;
            var lidCheckList = {};
            // Resolver Phase:Remove all the white space and Leading zero from the CustomerId
            lid = lid.toUpperCase().replace(/\s/g, "").replace(/^0+/g, "");
            lidCheckList["Lid"] = lid;
            lidCheckList["IsValidLid"] = (letterCheck.test(lid) || lidAccDigitsRange.test(lid) || twelveDigitsRange.test(lid))
            return lidCheckList;
        }

        context.endCall = function () {
            $startCallBtn.removeClass('hidden');
            $timerContainer.addClass('hidden');
        };

    })(TdcReceiveCall);

    $(document).ready(TdcReceiveCall.init);

})(jQuery);


