
if (menubardropdown == null || typeof (menubardropdown) != "object") {
    var menubardropdown = new Object();
}
//jQuery(document).ready(function (e) {

//    function t(t) {
//        e(t).bind("click", function (t) {
//            t.preventDefault();
//            e(this).parent().fadeOut()
//        })
//    }
//    e(".dropdown-toggle").click(function () {
//        var t = e(this).parents(".MyTPbutton-dropdown").children(".MyTpdropdown-menu").is(":hidden");
//        e(".MyTPbutton-dropdown .MyTpdropdown-menu").hide();
//        e(".MyTPbutton-dropdown .dropdown-toggle").removeClass("active");
//        if (t) {
//            e(this).parents(".MyTPbutton-dropdown").children(".MyTpdropdown-menu").toggle().parents(".MyTPbutton-dropdown").children(".dropdown-toggle").addClass("active")
//        }
//    });
//    e(document).bind("click", function (t) {
//        var n = e(t.target);
//        if (!n.parents().hasClass("MyTPbutton-dropdown")) e(".MyTPbutton-dropdown .MyTpdropdown-menu").hide();
//    });
//    e(document).bind("click", function (t) {
//        var n = e(t.target);
//        if (!n.parents().hasClass("MyTPbutton-dropdown")) e(".MyTPbutton-dropdown .dropdown-toggle").removeClass("active");
//    })
//});
$(document).ready(function () {
    // Show hide popover
    $(".MyTPdropdown").click(function () {
        $(this).find(".MyTPdropdown-menu").slideToggle("fast");
    });
});
$(document).on("click", function (event) {
    var $trigger = $(".MyTPdropdown");
    if ($trigger !== event.target && !$trigger.has(event.target).length) {
        $(".MyTPdropdown-menu").slideUp("fast");
    }
});
