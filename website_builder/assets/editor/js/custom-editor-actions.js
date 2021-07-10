$("#toggle-extra-options").click(function() {
    $("#options-container").toggle();
});

$(".top-web-device").click(function() {
    window.history.back();
});

$(".down-mobile-device").click(function() {
    beginToSave();
});

$("document").ready(function() {
    clearEditor();
    // update();
    loadPageContent();
});
