/// <reference path="webpartvisibilitymanager.js" />
/// <reference path="asyncwebpartloader.js" />
/// <reference path="PageStateManager.js" />

if (TdcUI == null || typeof (TdcUI) != "object") {
    var TdcUI = new Object();
}


(function ($) {

    $.fn.updateMessage = function (newMessage, messageType, windowText, clickable) {
        if (typeof (clickable) === 'undefined') clickable = true;
        var $this = $(this);
        var $messageContent = $('<small>').html(newMessage);
        $this.empty().append($messageContent);

        if ($this.hasClass('alert-danger')) {
            $this.removeClass('alert-danger');
        } else if ($this.hasClass('alert-warning')) {
            $this.removeClass('alert-warning');
        } else if ($this.hasClass('alert-success')) {
            $this.removeClass('alert-success');
        } else if ($this.hasClass('alert-info')) {
            $this.removeClass('alert-info');
        }

        switch (messageType) {
            case 'error':
                $this.addClass('alert-danger');
                break;
            case 'warning':
                $this.addClass('alert-warning');
                break;
            case 'success':
                $this.addClass('alert-success');
                break;
            default:
                $this.addClass('alert-info');
        }

        if (clickable && windowText) $this.click(function () { TdcUI.createErrorWindow(windowText); });

        if (messageType == "success") {
            var timer = new TdcUtils.Timer(function () {
                $this.fadeOut(500, function () {
                    $this.remove();
                });
            }, 2000);
        }
        else
        {
            var timer = new TdcUtils.Timer(function () {
                $this.fadeOut(500, function () {
                    $this.remove();
                });
            }, 5000);
        }

        $this.hover(timer.pause, timer.resume);
    };

    (function (context) {
        var leftPanel_visible = 'col-lg-2 col-md-3 col-sm-3',
             leftPanel_hidden = 'hidden',
             rightPanel_visible = 'col-lg-3 col-md-3 col-sm-3',
             rightPanel_hidden = 'hidden',
             contentPanel_normal = 'col-lg-7 col-md-6 col-sm-6',
             contentPanel_TscColoumnormal = 'col-lg-6 col-md-6 col-sm-6 col-xs-6',
             contentPanel_large = 'col-lg-9 col-md-9 col-sm-9',
             contentPanel_fullscreen = 'col-lg-12 col-md-12 col-sm-12',
             contentPanel_TscBodylarge = 'col-lg-10 col-md-9 col-sm-9',
             contentPanel_Tsclarge = 'col-xs-7 col-sm-7 col-md-7 col-lg-7',
             contentPanel_TscNormal = 'col-xs-5 col-sm-5 col-md-5 col-lg-5',
             updateTime,
             time = 0;

        var $messageAlertsBox = null;

        context.init = function () {

            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.WSP) {
                contentPanel_normal = 'col-lg-9 col-md-9 col-sm-9';
                contentPanel_large = 'col-lg-12 col-md-12 col-sm-12';
                $('#cip_body').removeClass(contentPanel_normal).addClass(contentPanel_large);
                $("#cip_sidebarRight").attr('display', 'none');// removeClass("col-lg-3 col-md-3 col-sm-3");
            }

            context.collapsePanel();
            context.isLeftPanelHidden();
            context.showHideLeftPanel();
            context.isRightPanelHidden();
            context.showHideRightPanel();
            context.scrollToTop();
            context.supportsTransition();
            context.scroller();

            $messageAlertsBox = $('#messageAlertsBox');

            $(".notification-container-top").on("click", function () {
                $("#main-notification-panel").toggle();
            });

            $(document).ajaxComplete(function () {
                $('*[data-toggle="tooltip"]').tooltip();
            });


            $(document).on('click', "div[data-toggle='collapse']", function () {
                var $icon = $(this).find('[data-alternateicon]');
                var alternateicon = $icon.attr('data-alternateicon');
                $icon.attr('data-alternateicon', $icon.attr('class'));
                $icon.attr('class', alternateicon);
            });
        };

        context.isset = function (value) {
            if (typeof (value) != "undefined" && value !== null) {
                return true;
            } else {
                return false;
            }
        };

        context.messageOptions = {
            success: 'success',
            error: 'error',
            warning: 'warning',
            info: 'info',
            loading: 'loading',
        };

        context.createMessage = function (messageText, messageType, windowText, persistent, sender,term, htmlLink) {
            // IE8 fix
            var offsetTop, offsetLeft, offsetRight, webpartoffsetLeft, webpartoffsetRight, leftdiff, rightdiff;
           
            var $webpart = TdcAsyncWebPartLoader.getTool(sender);
               
            if (sender) {
                var $sender = sender instanceof jQuery ? sender : $(sender);
                offsetTop = $sender.offset().top + $sender.outerHeight() + 5;
                offsetLeft = $sender.offset().left;
                offsetRight = $(window).width() - ($sender.offset().left + $sender.outerWidth());


                //Getting difference in width of sender from both left and right of webpart in which the sender is placed

                if ($webpart.offset() == undefined) {
                    $webpart = $webpart.prevObject;
                }
                webpartoffsetLeft = $webpart.offset().left;
                webpartoffsetRight = $(window).width() - ($webpart.offset().left + $webpart.outerWidth());
                leftdiff = offsetLeft - webpartoffsetLeft;
                rightdiff = offsetRight - webpartoffsetRight;
            }

            if (htmlLink == undefined && messageType == "error") {
                var $message = $('<div class="msgDiv" style="height:33px; ">').addClass('alert alert-dismissable fr tdc-notification-global');
            }
            else if (htmlLink != "" && messageType == "error") {
                var $message = $('<div class="msgDiv" style="height:65px; ">').addClass('alert alert-dismissable fr tdc-notification-global');
            }
            else {
                var $message = $('<div class="msgDiv">').addClass('alert alert-dismissable fr tdc-notification-global');
            }
            if (messageType == "loading") {
                var $messageContent = $('<small class="loadingIconNew">').html(messageText);
            }
            else {
                var $messageContent = $('<small>').html(messageText);
            }

            switch (messageType) {
                case 'error':
                    $message.addClass('alert-danger');
                    break;
                case 'warning':
                    $message.addClass('alert-warning');
                    break;
                case 'success':
                    $message.addClass('alert-success');
                    break;
                case 'loading':
                    $message.addClass('alert-loading');
                    break;
                default:
                    $message.addClass('alert-info');
            }

           
            if (messageType != "loading") {
                $message.append('<button type="button" class="close" data-dismiss="alert" aria-hidden="true" style="margin-right: 20px;">&times;</button>');
            }
            $message.append($messageContent);
            if (htmlLink != "" && messageType == "error") {
                $message.append(htmlLink);
            }

            if (windowText) {
                $message.css('cursor', 'pointer');
                $message.click(function () { context.createErrorWindow(windowText); });
            }

            if (messageType == "loading") {
                var $toolOverlay;
                var viewModel = {};
                $toolOverlay = TdcUtils.instantiateTemplate('doActionOverlayTemplate', viewModel);
                $toolOverlay.height("0px");
                $toolOverlay.width("40%");
                $toolOverlay.addClass("font14");
                $message.append($toolOverlay);
            }
          
            $messageAlertsBox.append($message);
            if(sender){
                
                $message.css('zIndex', 3000);
                
                if (messageType == "loading" && leftdiff > rightdiff) { //Left alligning the loading message if width difference of sender from the webpart's left is than from right 
                    $message.css({
                        top: offsetTop - 10,
                        right: offsetRight + 25
                    });
                }
                else if (messageType == "loading") {
                    $message.css({
                        top: offsetTop - 10,
                        left: offsetLeft
                    });
                }
                else if (leftdiff > rightdiff) { //Left alligning other type of messages other than "loading" if width difference of sender from the webpart's left is than from right 
                    $message.css({
                        top: offsetTop,
                        right: offsetRight
                    });
                }
                else {
                    $message.css({
                        top: offsetTop,
                        left: offsetLeft
                    });
                }
            }     

        if (!persistent) {
            if (htmlLink != "" && messageType == "error") {
                //No Customer Found 
                var timer = new TdcUtils.Timer(function () {
                    $message.fadeOut(10000, function () {
                        $(this).remove();
                    });
                }, 10000);
                    
                   
            }
            else {
                var timer = new TdcUtils.Timer(function () {
                    $message.fadeOut(1000, function () {
                        $(this).remove();
                    });
                }, 1000);
            }
            $message.hover(timer.pause, timer.resume);
        }

        return $message;
    };

    context.createErrorLink = function (toolname, statusText) {
            
        return '<div><span>' + toolname + '</span>' + '<p>' + statusText + '</p></div>';
    };

    context.createErrorWindow = function (responseText) {

        if (window.confirm('Ønsker du at indsende en fejl?')) {
            // They clicked Yes

            var errorWindow = window.open("", "_blank", "toolbar=no, scrollbars=yes, resizable=yes,width=600, height=400");
            errorWindow.document.write(responseText);
            var CustomerId = $(".CurrentCustomerId").text();
               
            if ($(errorWindow.document.getElementById('Lidtxt')).val() == '') {  // If CustomerId blank then get from Kundeinformation.
                $(errorWindow.document.getElementById('Lidtxt')).val(CustomerId);
            }
        }
    };

    context.scroller = function () {
        $('a[href*=#]:not([href=#])').click(function () {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top
                    }, 1000);
                    return false;
                }
            }
        });
    };

    /* functionality to collapse/expand any panel */
    context.collapsePanel = function () {
        TdcAsyncWebPartLoader.$rootElement.on('click', '.hidePanel', function (e) {
            e.preventDefault();
            TdcWebpartVisibilityManager.toggleWebpart(this);
        });
    };



    context.showHideLeftPanel = function () {
        TdcAsyncWebPartLoader.$rootElement.on('click', '#tdc_leftPanelHandle', function (e) {
            e.preventDefault();
            if (localStorage.leftPanelHidden == "visible") {
                context.hideLeftPanel($(this));
            } else {
                context.showLeftPanel($(this));
            }
        });
    };

    // functionality to show hide right panel
    context.showHideRightPanel = function () {
        TdcAsyncWebPartLoader.$rootElement.on('click', '#tdc_rightPanelHandle', function (e) {
            e.preventDefault();
            if (localStorage.rightPanelHidden == "visible") {
                TdcAsyncWebPartLoader.rightPanelcollapsedByUser = true;
                context.hideRightPanel($(this));
            } else {
                TdcAsyncWebPartLoader.rightPanelcollapsedByUser = false;
                context.showRightPanel($(this));
            }
        });
    };

      
    context.hideLeftPanel = function (el) {
        localStorage.leftPanelHidden = "hidden";
        el.addClass('no-left-panel');
        $('#cip_sidebarLeft').removeClass(leftPanel_visible).addClass(leftPanel_hidden);
        if (TdcAsyncWebPartLoader.$rootElement.find('#tdc_rightPanelHandle').hasClass('no-right-panel')) 
            $('#cip_body').removeClass(contentPanel_large).addClass(contentPanel_fullscreen);
        else 
            $('#cip_body').removeClass(contentPanel_normal).addClass(contentPanel_large);
    };

    // functinality to hide right panel
    context.hideRightPanel = function (el) {
        localStorage.rightPanelHidden = "hidden";
        el.addClass('no-right-panel');
        $('#cip_sidebarRight').removeClass(rightPanel_visible).addClass(rightPanel_hidden);
        if (TdcAsyncWebPartLoader.$rootElement.find('#tdc_leftPanelHandle').hasClass('no-left-panel'))
            $('#cip_body').removeClass(contentPanel_large).addClass(contentPanel_fullscreen);
        else {
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP || TdcMain.portalSection == "csam_tsc") {
                $('#cip_body').removeClass(contentPanel_normal).addClass(contentPanel_TscBodylarge);
                $('#viskundetab').removeClass(contentPanel_fullscreen).addClass(contentPanel_Tsclarge);
                $('#viskundetab').find('#BtnsDivVisKunde').addClass('pollButton');
                $('#viskundetab').find('#pollDetails').find('#PollInfoFont').attr('style', 'padding-top:1%; font-size: inherit;  z-index: 1; background: white;')
               
                $('#viskundetab').find('#pingDetails').find('#PingInfoFont').attr('style', 'padding-top:1%; font-size: inherit; width:185%;  z-index: 1; background: white;font-family:Lucida Console')
                $('#MoveboxCMTS').removeClass(contentPanel_fullscreen).addClass(contentPanel_TscNormal);
                $('#MoveboxCMTS').find('#TscScrollbar').addClass('tscScrollbar');
                $('#MoveboxCMTS').find('#CMTSTable').hide();
                $('#MoveboxCMTS').find('#boxCMTS').attr('style', 'padding-left: 0px')
                $('#MoveboxCMTS').find('#TscScrollbar').find('#CMTSFirstColData').removeClass(contentPanel_TscColoumnormal).addClass(contentPanel_fullscreen);
                $('#MoveboxCMTS').find('#TscScrollbar').find('#CMTSSecColData').removeClass(contentPanel_TscColoumnormal).addClass(contentPanel_fullscreen);
                $('#MoveboxCMTS').find("#boxCMTS").show();

               }
            else { $('#cip_body').removeClass(contentPanel_normal).addClass(contentPanel_large); }
        }
    };

    context.showLeftPanel = function (el) {
        localStorage.leftPanelHidden = "visible";
        el.removeClass('no-left-panel');
        $('#cip_sidebarLeft').removeClass(leftPanel_hidden).addClass(leftPanel_visible);
        if ($('#cip_body').hasClass(contentPanel_fullscreen))
            $('#cip_body').removeClass(contentPanel_fullscreen).addClass(contentPanel_large);
        else
            $('#cip_body').removeClass(contentPanel_large).addClass(contentPanel_normal);
    };

       
    //functionality to show right panel
    context.showRightPanel = function (el) {
        localStorage.rightPanelHidden = "visible";
        el.removeClass('no-right-panel');
        $('#cip_sidebarRight').removeClass(rightPanel_hidden).addClass(rightPanel_visible);
        if ($('#cip_body').hasClass(contentPanel_fullscreen))
            $('#cip_body').removeClass(contentPanel_fullscreen).addClass(contentPanel_large);
        else {
            if (TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TSC ||
                TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.TP || TdcAsyncWebPartLoader.portalId == TdcAsyncWebPartLoader.portalIds.MyTP ||TdcMain.portalSection == "csam_tsc")
            {
                $('#cip_body').removeClass(contentPanel_TscBodylarge).addClass(contentPanel_normal);
                $('#viskundetab').removeClass(contentPanel_Tsclarge).addClass(contentPanel_fullscreen);
                $('#viskundetab').find('#BtnsDivVisKunde').removeClass('pollButton');
                $('#viskundetab').find('#BtnsDivVisKunde').css('z-index', '1');
                $('#viskundetab').find('#pollDetails').find('#PollInfoFont').attr('style', 'font-size:  xx-small; padding-left:0%;');
                $('#viskundetab').find('.ButtonInfo').find('.ButtonsWidht').attr('style', 'width:100%');
                //$('#visKundeTab').find('#DataforPingInfo').find('#PingInfoFont').attr('style', '')
                $('#viskundetab').find('#pingDetails').find('#pingDetails').attr('style', 'padding-left: 12%; padding-top:1%; font-size:  x-small; width:100%;font-family:Lucida Console')
                $('#MoveboxCMTS').removeClass(contentPanel_TscNormal).addClass(contentPanel_fullscreen);
                $('#MoveboxCMTS').find('#TscScrollbar').removeClass('tscScrollbar');
                $('#MoveboxCMTS').find('#boxCMTS').attr('style', 'padding-left: 30px')
                $('#MoveboxCMTS').find('#TscScrollbar').find('#CMTSFirstColData').removeClass(contentPanel_fullscreen).addClass(contentPanel_TscColoumnormal);
                $('#MoveboxCMTS').find('#TscScrollbar').find('#CMTSSecColData').removeClass(contentPanel_fullscreen).addClass(contentPanel_TscColoumnormal);

                if (($('#viskundetab').find("#pingDetails").is(':visible') || $('#viskundetab').find('#pollDetails').is(':visible') || $('#viskundetab').find('#flapDetails').is(':visible') || $('#viskundetab').find('#modemDetails').is(':visible')))
                {
                    $('#MoveboxCMTS').find("#boxCMTS").hide();
                }
                else
                {
                    $('#MoveboxCMTS').find("#boxCMTS").show();
                }
            }
            else
            {
                $('#cip_body').removeClass(contentPanel_large).addClass(contentPanel_normal);
            }
        }
    };
      

    context.isLeftPanelHidden = function () {
        localStorage.leftPanelHidden = "visible";
        context.showLeftPanel($('#tdc_leftPanelHandle'));            
    };


    //functionality to call show right panel
    context.isRightPanelHidden = function () {
        localStorage.rightPanelHidden = "visible";
        context.showRightPanel($('#tdc_rightPanelHandle'));            
    };


    context.supportsTransition = function () {
        if (context.cssSupport('transition')) {
            $(document.documentElement).addClass('transitions');
        }
    };

    context.scrollToTop = function () {
        setTimeout(function () {
            window.scrollTo(0, 0);
        }, 450);
    };

    context.cssSupport = function () {
        var div = document.createElement('div'),
        vendors = 'Khtml Ms O Moz Webkit'.split(' '),
        len = vendors.length;

        return function (prop) {
            if (prop in div.style) return true;

            prop = prop.replace(/^[a-z]/, function (val) {
                return val.toUpperCase();
            });

            while (len--) {
                if (vendors[len] + prop in div.style) {
                    // browser supports box-shadow. Do what you need.  
                    // Or use a bang (!) to test if the browser doesn't.  
                    return true;
                }
            }
            return false;
        };
    };

})(TdcUI);

$(document).ready(function () {

    $(window).resize(function () {
        TdcPageStatesManager.compareFixedTopHeight();
    }).resize();

    TdcUI.init();
});
})(jQuery);