$("document").ready(function() {
    if (location.pathname.includes("/dashboard")) {
        $($(".option-text")[0]).addClass("option-selected");
    }
    if (location.pathname.includes("/editor")) {
        $($(".option-text")[1]).addClass("option-selected");
    }
    if (location.pathname.includes("/labels")) {
        $($(".option-text")[2]).addClass("option-selected");
    }
    if (location.pathname.includes("/corporate")) {
        $($(".option-text")[3]).addClass("option-selected");
    }
    if (location.pathname.includes("/queries")) {
        $($(".option-text")[4]).addClass("option-selected");
    }
    if (location.pathname.includes("/advertisements")) {
        $($(".option-text")[5]).addClass("option-selected");
    }
    if (location.pathname.includes("/settings")) {
        $($(".option-text")[6]).addClass("option-selected");
    }
    if (location.pathname.includes("/troubleshooting")) {
        $($(".option-text")[7]).addClass("option-selected");
    }
    if (location.pathname.includes("/notes")) {
        $($(".option-text")[8]).addClass("option-selected");
    }
});
