/// <reference path="libs/jquery.cookie.js" />
/// <reference path="asyncwebpartloader.js" />

if (TdcWebpartVisibilityManager == null || typeof (TdcWebpartVisibilityManager) != "object") {
    var TdcWebpartVisibilityManager = new Object();
}

(function ($) {

    (function (context) {
        var collapsedWebparts = new Array();

        context.init = function () {
            //collapsed webparts are stored, in cookie.
            //if there will be more webparts with persistexpandstate=true, the stoaege must be replaced, since cookie has limited length
            var collapsedWebpartsCookie = $.cookie('collapsedWebparts');
            if (collapsedWebpartsCookie) collapsedWebparts = collapsedWebpartsCookie.split(',');

            TdcAsyncWebPartLoader.$rootElement.on('ToolLoaded', restoreExpandStateOnToolLoaded);
        };
  
        function restoreExpandStateOnToolLoaded(evt, $html, requestData) {
            $html.each(function(index, item) {
                var $webpart = $(item);
                var webpartName = getWebpartName($webpart);
                if ($.inArray(webpartName, collapsedWebparts) > -1) {
                    context.toggleWebpart($webpart.find('.hidePanel'));
                }
            });
        }



        context.toggleWebpart = function(headerElement) {
            var $headerElement = (headerElement instanceof jQuery) ? headerElement : $(headerElement);
            var $content = $headerElement.closest('.panel').find('.panel-content');
            var $arrowBtn = $headerElement.find('a');
            var $arrowIcon = $arrowBtn.find('span');
            var webpartName = getWebpartName($headerElement);

            $content.toggleClass('hidden');

            if ($content.hasClass('hidden')) {
                $arrowIcon.removeClass().addClass('ion-chevron-down');
                refreshTooltip($arrowBtn, TranslationsJs.show);

            } else {
                $arrowIcon.removeClass().addClass('ion-chevron-up');
                refreshTooltip($arrowBtn, TranslationsJs.hide);
              
            }

            if ($headerElement.attr('data-persistexpandstate') == 'true') {
                collapsedWebparts.remove(webpartName);
                if ($content.hasClass('hidden')) {
                    collapsedWebparts.push(webpartName);
                }
                $.cookie('collapsedWebparts', collapsedWebparts.join(','));
            }

        }

        function refreshTooltip($element, text) {
            if ($element.attr("data-original-title"))
                $element.attr("data-original-title", text);
            else $element.attr('title', text);

            var isTooltipVisible = $element.next('.tooltip').length > 0;

            $element.tooltip('hide');
            if (isTooltipVisible) {
                $element.tooltip('show');
            }
        };

        var getWebpartName = function (element) {
            var $element = (element instanceof jQuery) ? element : $(element);
            var placeholderId = $element.closest('[id$="_placeholder"]').attr('id');
            if (!placeholderId) return '';
            var webpartName = placeholderId.replace('_placeholder', '');
            return webpartName;
        };

    })(TdcWebpartVisibilityManager);

    $(TdcWebpartVisibilityManager.init);
})(jQuery);

