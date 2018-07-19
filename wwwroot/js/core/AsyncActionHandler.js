/// <reference path="_references.js" />
/* 
 *  GLOBAL VARIABLES/OBJECTS
 * ======================================================================== */
var __rootUrl = window.location.protocol + '//' + window.location.hostname, // Avoids hardcoded urls in script

    GlobalSessionObjectStore = GlobalSessionObjectStore || []; // Creates global array object for cleanup

GlobalSessionObjectStore.Remove = function (noteid, checkForToolType) {
    if (!isNaN(noteid)) {
        var objectsToRemove = this.filter(function (object) {
            if (typeof checkForToolType !== 'undefined' && typeof checkForToolType === 'Boolean' && checkForToolType) {
                if (typeof object.NoteID !== 'undefined')
                    return object.NoteID == noteid && object.ToolType == "guideStepTool";
            }
            else if (typeof object.NoteID !== 'undefined') {
                return object.NoteID == noteid;
            }
            else {
                return false;
            }
        });

        objectsToRemove.forEach(function (object) {
            var index = $.inArray(object, GlobalSessionObjectStore); // IE8 fix
            GlobalSessionObjectStore.splice(index, 1);
            object = undefined;
        });

        objectsToRemove = undefined;
    }
};
GlobalSessionObjectStore.Dispose = function () {
    this.forEach(function (object) {
        var index = $.inArray(object, GlobalSessionObjectStore); // IE8 fix
        GlobalSessionObjectStore.splice(index, 1);
        object = undefined;
    });
    this.Destroy();
};
GlobalSessionObjectStore.Destroy = function () {
    this = undefined;
};

/* ========================================================================
 *  GLOBAL METHODS
 * ======================================================================== */
PerformAjaxAsynchronousPostback = function (jsondata, sender, successCallback, failureCallback) {
    $.ajax({
        url: __rootUrl + '/_layouts/tpcip.web/ws/ActionHandler.asmx/HandleUserAction',
        type: 'POST',
        data: JSON.stringify(jsondata),
        dataType: 'json',
        contentType: 'application/json'
    }).success(function (data, status) {
        if (status == 'success') {
            if (typeof successCallback === 'function') {
                successCallback(sender, data.d, true);
            }
        }
    }).fail(function (jqHXR, status, errorThrown) {
        if (typeof failureCallback === 'function') {
            failureCallback(sender, status + ': ' + errorThrown + '<p>StackTrace: ' + jqHXR.responseText + "</p>", true);
        }
    });
};

OnAjaxAsynchronousPostback = function (jsondata) {
    return $.ajax({
        url: __rootUrl + '/_layouts/tpcip.web/ws/ActionHandler.asmx/HandleUserAction',
        type: 'POST',
        data: JSON.stringify(jsondata),
        dataType: 'json',
        contentType: 'application/json'
    });
};

/* ========================================================================
 *  GLOBAL BASE TYPE
 * ======================================================================== */
var TdcBaseObject = function () {
    this.NoteID = 0;
    this.ToolType = null;
};