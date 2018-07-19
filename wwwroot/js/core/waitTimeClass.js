/// <reference path="Scripts/libs/jquery-2.0.3.intellisense.js" />
var waitTimeClass = function () {
    var intervalId;
    var elementSelector;
    var timeLeft = 5;

    // Display loading element
    var displayWaitTime = function (element) {
        console.log('displayWaitTime');
        // Find div
        elementSelector = element;

        // Inject loading icon + time
        $(elementSelector).append("<div class='loader'>Færdig med at indlæse om " + timeLeft + " <div>");

        // Start timer
        intervalId = setInterval(function () {
            timeLeft--;
            $(elementSelector).find('.loader').text('Færdig med at indlæse om ' + timeLeft);

        }, 1000);
    };

    // This is called when ajax returns
    var removeWaitTime = function () {
        console.log('removeWaitTime');
        // stop interval
        clearInterval(intervalId);
    };

    return {
        displayWaitTime: displayWaitTime,
        removeWaitTime: removeWaitTime
    };
};