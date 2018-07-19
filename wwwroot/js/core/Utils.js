/// <reference path="asyncwebpartloader.js" />

if (TdcUtils == null || typeof (TdcUtils) != "object") {
    var TdcUtils = new Object();
}


(function ($) {

    (function (context) {

        context.SectionKeyValue = {
            ch_salg: "Salg & kundeservice",
            ch_regning: "Regning",
            ch_support: "Support",
            ch_save: "Save",
            ch_butik: "Butik",
            ch_back: "Særlige opgaver",
            ch_scale: "Erhverv",
            onsite_kobber: "Kobber",
            onsite_coax: "Coax",
            onsite_fiber: "Fiber",
            ch_test_cip: "Test Cip (IT)",
            onsite_bygning: "Bygning",
            onsite_scale: "IP WAN/ Scale",
            onsite_mobil: "Mobil",
            onsite_stationsdrift: "Stationsdrift",
            onsite_test: "Test TP/MyTP (IT)",

        };

        context.init = function () {
            $(':input[placeholder]').inputWatermark();
        };

        //creates clone of html element and binds viewmodel properties data-bind="text:{0}"
        context.instantiateTemplate = function (templateId, viewModel) {
            var $instance = $('#' + templateId).clone();
            $instance.removeAttr('id');
            if (viewModel) {
                $.each(viewModel, function (key, value) {
                    //todo: support more than text binding
                    $instance.find('[data-bind="text: ' + key + '"]').text(value);
                });
            }
            return $instance;
        };

        context.getJson = function ($form) {
            var unindexedArray = $form.serializeArray();
            var indexedArray = {};

            $.map(unindexedArray, function (n, i) {
                indexedArray[n['name']] = n['value'];
            });

            return indexedArray;
        };


        // Set css class on containing element for different pages.
        context.setPageClass = function (className) {
            TdcAsyncWebPartLoader.$rootElement.attr('class', '');
            TdcAsyncWebPartLoader.$rootElement.addClass(className);
        };


        context.showErrorDialog = function (errorMessage, errorResponseText) {
            if (confirm(errorMessage + '\nDo you want to see details?')) {
                var errorWindow = window.open("", "_blank", "toolbar=no, scrollbars=yes, resizable=yes,width=600, height=400");
                errorWindow.document.write(errorResponseText);
            }
        };

        context.Timer = function (callback, delay) {
            var timerId, start, remaining = delay;

            this.pause = function () {
                window.clearTimeout(timerId);
                remaining -= new Date() - start;
            };

            this.resume = function () {
                start = new Date();
                timerId = window.setTimeout(callback, remaining);
            };

            this.resume();
        };

        context.getObjectLength = function (object) {
            return $.map(object, function (n, i) { return i; }).length;
        };

        create4LetterString = function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        };

        context.createNewGuid = function () {
            return create4LetterString() + create4LetterString() + '-' + create4LetterString() + '-' + create4LetterString() + '-' +
                create4LetterString() + '-' + create4LetterString() + create4LetterString() + create4LetterString();
        };

        context.removeAccents = function (s) {
            var r = s.toLowerCase();
            r = r.replace(new RegExp("\\s", 'g'), "");
            r = r.replace(new RegExp("[àáâãäå]", 'g'), "a");
            r = r.replace(new RegExp("æ", 'g'), "ae");
            r = r.replace(new RegExp("[çč]", 'g'), "c");
            r = r.replace(new RegExp("[èéêë]", 'g'), "e");
            r = r.replace(new RegExp("[ìíîï]", 'g'), "i");
            r = r.replace(new RegExp("[ľĺ]", 'g'), "l");
            r = r.replace(new RegExp("ñ", 'g'), "n");
            r = r.replace(new RegExp("[òóôõö]", 'g'), "o");
            r = r.replace(new RegExp("œ", 'g'), "oe");
            r = r.replace(new RegExp("[ŕř]", 'g'), "r");
            r = r.replace(new RegExp("[śš]", 'g'), "s");
            r = r.replace(new RegExp("ť", 'g'), "t");
            r = r.replace(new RegExp("[ùúûü]", 'g'), "u");
            r = r.replace(new RegExp("[ýÿ]", 'g'), "y");
            r = r.replace(new RegExp("\\W", 'g'), "");
            return r;
        };

        context.getQueryStringParameter = function (name) {
            var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
            return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
        }


        // Extension for IE Support for .includes function
        if (!String.prototype.includes) {
            String.prototype.includes = function (search, start) {
                if (typeof start !== 'number') {
                    start = 0;
                }

                if (start + search.length > this.length) {
                    return false;
                } else {
                    return this.indexOf(search, start) !== -1;
                }
            };
        }

        context.OnClickCategory = function (sender) {
            var x = $(sender).text();
            
            $.each(TdcUtils.SectionKeyValue, function (key, value) {
                if (x.includes(value)) {
                    if ($(sender).next().filter(':visible').length > 0) {
                        $('.v4master').find('.ui-autocomplete .' + key + '').hide();
                        $(sender).find('.ion-chevron-up').removeClass().addClass('ion-chevron-down pull-right');
                    }
                    else {
                        $('.v4master').find('.ui-autocomplete .commonClass').hide();
                        $('.v4master').find('.ui-autocomplete .' + key + '').show();
                        $('.v4master').find('.ui-autocomplete .ui-autocomplete-category .ion-chevron-up').removeClass().addClass('ion-chevron-down pull-right');
                        $(sender).find('.ion-chevron-down').removeClass().addClass('ion-chevron-up pull-right');
                    }
                }

            });

        }

        context.OnClickCategoryName = function (sender) {

            var categoryName = $(sender).text();
            var itemCategory = categoryName.replace(/[\W_]/g, "");

            if ($(sender).next().filter(':visible').length > 0) {
                $('.v4master').find('.' + itemCategory + '').hide();
                $(sender).find('.ion-chevron-up').removeClass('ion-chevron-up pull-right').addClass('ion-chevron-down pull-right');
            }
            else {
                $('.v4master').find('.ui-autocomplete .ui-menu-item').hide();
                $('.v4master').find('.' + itemCategory + '').show();
                $('.v4master').find('.ui-autocomplete .ui-autocomplete-category .ion-chevron-up ').removeClass('ion-chevron-up pull-right').addClass('ion-chevron-down pull-right');
                $(sender).find('.ion-chevron-down').removeClass('ion-chevron-down pull-right').addClass('ion-chevron-up pull-right');
            }

        };

        context.OnCategoryClick = function (sender) {

            var categoryName = $(sender).data("category");
            var itemCategory = categoryName.replace(/\s+/g, '');

            if ($(sender).hasClass("subCat")) {
                
                if ($(sender).find("span").hasClass("ion-chevron-up")) {
                    $('.v4master').find("." + itemCategory).hide();
                    $(sender).find("span").removeClass('ion-chevron-up pull-right').addClass('ion-chevron-down pull-right');
                }
                else {
                    $('.v4master').find("." + itemCategory).show();
                    $(sender).find("span").removeClass('ion-chevron-down pull-right').addClass('ion-chevron-up pull-right');
                }
            }
            else {
                if ($(sender).next().filter(':visible').length > 0) {
                    $('.v4master').find("[class*=" + itemCategory + "]").hide();
                    $(sender).find('.ion-chevron-up').removeClass('ion-chevron-up pull-right').addClass('ion-chevron-down pull-right');
                }
                else {

                    $('.v4master').find('.ui-autocomplete .ui-menu-item').hide();
                    $('.v4master').find('.subCat').hide();
                    $('.v4master').find("." + itemCategory).show();
                    $('.v4master').find('.ui-autocomplete .ui-autocomplete-category .ion-chevron-up ').removeClass('ion-chevron-up pull-right').addClass('ion-chevron-down pull-right');
                    $(sender).find('.ion-chevron-down').removeClass('ion-chevron-down pull-right').addClass('ion-chevron-up pull-right');
                }
            }

        }


    })(TdcUtils);

    $(TdcUtils.init);

    Array.prototype.remove = function (v) { this.splice(this.indexOf(v) == -1 ? this.length : this.indexOf(v), 1); }

    // Extension of autocomplete to support categories.
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {

            var portalSection = $('.aktiveTabCustom').attr('data-portalsectionname');
            if (items[0].entityClass == "AdvancedGuideSearchLink") {
                var retrievedObject = localStorage.getItem('SearchObject');
                var MoreData = JSON.parse(retrievedObject);
                var that = this;
                var currentCategory = "";
                if (this.options.customclass)
                    ul.addClass(this.options.customclass);
                $.each(items, function (index, item) {
                    if (item.category != undefined) {

                        if (item.category != currentCategory) {

                            if (item.category == "ch_support") {
                                DisplayCategory(ul, item.category, MoreData.ch_supportCnt);
                            }
                            else if (item.category == "ch_scale") {
                                DisplayCategory(ul, item.category, MoreData.ch_scaleCnt);
                            }
                            else if (item.category == "ch_salg") {
                                DisplayCategory(ul, item.category, MoreData.ch_salgCnt);
                            }
                            else if (item.category == "ch_save") {
                                DisplayCategory(ul, item.category, MoreData.ch_saveCnt);
                            }
                            else if (item.category == "ch_butik") {
                                DisplayCategory(ul, item.category, MoreData.ch_butikCnt);
                            }
                            else if (item.category == "ch_back") {
                                DisplayCategory(ul, item.category, MoreData.ch_backCnt);
                            }
                            else if (item.category == "ch_regning") {
                                DisplayCategory(ul, item.category, MoreData.ch_regningCnt);
                            }
                            else if (item.category == "onsite_kobber") {
                                DisplayCategory(ul, item.category, MoreData.onsite_kobberCnt);
                            }
                            else if (item.category == "onsite_coax") {
                                DisplayCategory(ul, item.category, MoreData.onsite_coaxCnt);
                            }
                            else if (item.category == "onsite_fiber") {
                                DisplayCategory(ul, item.category, MoreData.onsite_fiberCnt);
                            }
                            else if (item.category == "onsite_bygning") {
                                DisplayCategory(ul, item.category, MoreData.onsite_bygningCnt);
                            }
                            else if (item.category == "onsite_scale") {
                                DisplayCategory(ul, item.category, MoreData.onsite_scaleCnt);
                            }
                            else if (item.category == "onsite_mobil") {
                                DisplayCategory(ul, item.category, MoreData.onsite_mobilCnt);
                            }
                            else if (item.category == "onsite_stationsdrift") {
                                DisplayCategory(ul, item.category, MoreData.onsite_stationsdriftCnt);
                            }
                            else if (item.category == "onsite_test" && MoreData.ch_testCnt > 0) {
                                DisplayCategory(ul, item.category, MoreData.ch_testCnt);
                            }
                            else if (item.category == "ch_test_cip" && MoreData.ch_testCnt > 0) {
                                DisplayCategory(ul, item.category, MoreData.ch_testCnt);
                            }

                            currentCategory = item.category;
                        }
                    }
                    that._renderItemData(ul, item);

                    if ($('.v4master').find('#commonID').hasClass(portalSection)) {
                        $('.v4master').find('#commonID').prev().find('.ion-chevron-down').removeClass().addClass('ion-chevron-up pull-right');
                    }

                });

            }
            else {
                var that = this;
                var currentCategory = "";
                
                var currentTab = TdcUtils.SectionKeyValue[portalSection];
                if (this.options.customclass)
                    ul.addClass(this.options.customclass);
                $.each(items, function (index, item) {
                    if (item.category != undefined) {

                        if (item.category != currentCategory) {
                            if (item.category == "Salg & kundeservice" && currentTab == "Butik") {
                                ul.append("<li class='ui-autocomplete-category commonSection ' onclick='TdcUtils.OnClickCategoryName(this)'>" + '<span class="ion-chevron-up pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + item.category + "</li>");
                                currentCategory = item.category;
                            }
                            else { 
                            if (item.category == "Generel" || item.category == currentTab) {
                                ul.append("<li class='ui-autocomplete-category commonSection ' onclick='TdcUtils.OnClickCategoryName(this)'>" + '<span class="ion-chevron-up pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + item.category + "</li>");
                                currentCategory = item.category;
                            }
                            else {
                                ul.append("<li class='ui-autocomplete-category commonSection ' onclick='TdcUtils.OnClickCategoryName(this)'>" + '<span class="ion-chevron-down pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + item.category + "</li>");
                                currentCategory = item.category;
                            }
                        }
                    }
                    }
                    that._renderItemData(ul, item);
                });
            }
        },
        _renderItem: function (ul, item) {

            var portalSection = $('.aktiveTabCustom').attr('data-portalsectionname');
            if (item.description == "SearchEngineGA") {

                if (item.category != undefined) {
                    var entityClass = "";

                    var portalSection = $('.aktiveTabCustom').attr('data-portalsectionname');
                 
                    if (item.entityClass != undefined)
                        entityClass = item.entityClass;

                    if (item.entityClass == "AdvancedGuideSearchLink") {
                        return $("<li>")
                            .addClass(item.category)
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(item.label))
                        .appendTo(ul).show();
                    }                
                    else if (portalSection == item.category) {
                        return $("<li id='commonID'>")
                            .addClass(item.category)
                            .addClass("commonClass")
                            .addClass(portalSection)
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(getLabelValue(item.label, item.entityType, item.category)))
                        .appendTo(ul).show();
                    }
                    else {
                        return $("<li>")
                            .addClass(item.category)
                            .addClass("commonClass")
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(getLabelValue(item.label, item.entityType, item.category)))
                        .appendTo(ul).hide();
                    }
                }

                else {
                    return $("<li>")
                    .append($("<span>").text("Ingen søge resultater"))
                    .appendTo(ul);
                }
            }
            else {
                if (item.category != undefined) {
                    var entityClass = "";
                    //var itemCategory = item.category;
                    var itemCategory = item.category.replace(/[\W_]/g, "");
                    if (item.entityClass != undefined)
                        entityClass = item.entityClass;
                    var currentTab = TdcUtils.SectionKeyValue[portalSection];
                    if (itemCategory == "Salgkundeservice" && currentTab == "Butik") {
                        return $("<li>")
                        .addClass(itemCategory)
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(item.label))
                        .appendTo(ul).show();
                    }
                    else {
                    if (itemCategory == "Generel" || item.category == currentTab) {
                        return $("<li>")
                        .addClass(itemCategory)
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(item.label))
                        .appendTo(ul).show();
                    }
                    else {
                        return $("<li>")
                        .addClass(itemCategory)
                        .attr("data-value", item.value).addClass(entityClass)
                        .append($("<a>").html(item.label))
                        .appendTo(ul).hide();
                    }
                } 
                } 
                else {
                    return $("<li>")
                    .append($("<span>").text("Ingen søge resultater"))
                    .appendTo(ul);
                }
            }
        }

    });

    // Extension of autocomplete to support multi level categories.
    $.widget("custom.multiLevelCatcomplete", $.ui.autocomplete, {
        _renderMenu: function (ul, items) {

            var that = this;
            var currentCategory = "";
            var currentCateogoryId = 0;
            var currentSubCategory = "";
            var currentSubCateogoryId = items.length;
            var catrgoriesList = [];
            
            if (this.options.customclass)
                ul.addClass(this.options.customclass);

            $.each(items, function (index, item) {
                if (item.categoryName == undefined) {
                    that._renderItemData(ul, item);
                }
                else {
                    var categories = item.categoryName.split('SUB');
                    var mainCat = categories[0];
                    var subCat = categories[1];
                    var category = "-" + item.categoryId + "-";
                    item.category = category;
                    if (mainCat != undefined) {
                        if (mainCat != currentCategory) {
                            if (that.expandAll == true) {
                                ul.append("<li class='ui-autocomplete-category commonSection ' data-category='-" + item.categoryId + "-' onclick='TdcUtils.OnCategoryClick(this)'>" + '<span class="ion-chevron-up pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + mainCat + "</li>");
                            }
                            else {
                                ul.append("<li class='ui-autocomplete-category commonSection ' data-category='-" + item.categoryId + "-' onclick='TdcUtils.OnCategoryClick(this)'>" + '<span class="ion-chevron-down pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + mainCat + "</li>");
                            }
                            currentCategory = mainCat;
                            currentCateogoryId = item.categoryId;
                        }
                        else {
                            item.categoryId = currentCateogoryId;
                            item.category = "-" + currentCateogoryId + "-";
                        }
                    }

                    if (subCat != undefined) {
                        category = "-" + item.categoryId + "--" + currentSubCateogoryId + "-"
                        item.category = category;
                        if (subCat != currentSubCategory) {
                            currentSubCateogoryId++;
                            category = "-" + item.categoryId + "--" + currentSubCateogoryId + "-"
                            item.category = category;

                            if (that.expandAll == true) {
                                ul.append("<li style='padding-left: 5%;' class='subCat ui-autocomplete-category commonSection -" + item.categoryId + "-' data-category='" + category + "' onclick='TdcUtils.OnCategoryClick(this)'>" + '<span class="ion-chevron-up pull-right" style="padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + subCat + "</li>");
                            }
                            else {
                                ul.append("<li style='display:none;font-weight:normal; padding-left: 5%;' class='subCat ui-autocomplete-category commonSection -" + item.categoryId + "-' data-category='" + category + "' onclick='TdcUtils.OnCategoryClick(this)'>" + '<span class="ion-chevron-down pull-right" style=" padding-top: 3px;padding-right: 5px;font-size:smaller"></span>' + subCat + "</li>");
                            }
                            currentSubCategory = subCat;

                        }
                    }
                    that._renderItemData(ul, item);
                }
            });
        },
        _renderItem: function (ul, item) {
            if (item.categoryName != undefined) {
                var categories = item.categoryName.split('SUB');
                var mainCat = categories[0];
                var subCat = categories[1];
                var guideIdentifier = "";
                var category = item.category;
                var paddingLeft = "0";
                var textWidth = "95%"
                guideIdentifier = item.categoryType == "Guide" ? "<div style='width:5%; display:inline-block'>(G)</div>" : "<div style='width:5%; display:inline-block'>&nbsp;&nbsp;&nbsp; </div>";
                if (subCat != undefined) {
                    paddingLeft = "0";
                    guideIdentifier = item.categoryType == "Guide" ? "<div style='width:10%;display:inline-block'>(G)&nbsp;&nbsp;&nbsp;</div>" : "<div style='width:10%; display:inline-block'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </div>";
                    textWidth = "90%"
                }

                var entityClass = "";
                var itemCategory = category.replace(/\s+/g, '');
                
                if (item.entityClass != undefined)
                    entityClass = item.entityClass;
                if (this.expandAll == true) {

                    return $("<li>")
                    .addClass(category)
                    .attr("data-value", item.value).addClass(entityClass)
                    .append($("<a>").append(guideIdentifier).append($("<div style='width:90%;display:inline-block; padding-left: " + paddingLeft + "px;'>").html(item.title)))
                    .appendTo(ul).show();
                } else {
                    return $("<li>")
                    .addClass(category)
                    .attr("data-value", item.value).addClass(entityClass)
                    .append($("<a>").append(guideIdentifier).append($("<div style='width:90%;display:inline-block; padding-left: " + paddingLeft + "px;'>").html(item.title)))
                    .appendTo(ul).hide();
                }
            }
            else if (item.title != undefined)
            {
                return $("<li>")
                    .attr("data-value", item.value)
                    .append($("<a>").append($("<div style='width:90%;display:inline-block; padding-left: " + paddingLeft + "px;'>").html(item.title)))
                    .appendTo(ul)
            }
            else {
                return $("<li>")
                .append($("<span>").text("Ingen søge resultater"))
                .appendTo(ul);
            }
        }

    });


    // Extension to support watermark textbox if placeholder attribute is not supported by browser.
    $.fn.extend({
        inputWatermark: function () {
            return this.each(function (index, element) {
                var $element = $(element);
                var watermarkText = $element.attr('placeholder');

                function refreshWatermark() {
                    var isFocused = element === document.activeElement;
                    if ($element.val() == '' && !isFocused) {
                        $element.val(watermarkText);
                        $element.addClass('watermark');
                    } else if ($element.val() == watermarkText && isFocused) {
                        $element.val('');
                        $element.removeClass('watermark');
                    }
                }

                refreshWatermark();
                $element.blur(refreshWatermark);
                $element.focus(refreshWatermark);
            });
        }
    });

    function DisplayCategory(ul, category, categoryCnt) {
        ul.append("<li class='ui-autocomplete-category commonSection' onclick='TdcUtils.OnClickCategory(this)'>" + TdcUtils.SectionKeyValue[category]
                                    + "<span class='ion-chevron-down pull-right' style='margin-top:5px;margin-right:10px'></span>" +
                                    "<span class='pull-right'  style='margin-left:10px;margin-right:10px'> (" + categoryCnt + ")</span>" + "</li>");
    };

    function getLabelValue(label, entityType, portalSection) {
        if (entityType == "Guide") {           
                return "(G) " + label;           
        }
        else if (entityType == "Article") {
            return "(A) " + label;
        }
        else {
            return label;
        }
    };

})(jQuery);

/*------------------------ smartresize */
(function ($, sr) {
    var debounce = function (func, threshold, execAsap) {
        var timeout;
        return function debounced() {
            var obj = this, args = arguments;
            function delayed() {
                if (!execAsap)
                    func.apply(obj, args);
                timeout = null;
            };
            if (timeout)
                clearTimeout(timeout);
            else if (execAsap)
                func.apply(obj, args);
            timeout = setTimeout(delayed, threshold || 100);
        };
    }; // smartresize
    jQuery.fn[sr] = function (fn) {
        return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr);
    };
})(jQuery, 'smartresize');

/*------------------------ smartresize short */
function on_resize(c, t) {
    onresize = function () {
        clearTimeout(t);
        t = setTimeout(c, 100);
    };
    return c;
};