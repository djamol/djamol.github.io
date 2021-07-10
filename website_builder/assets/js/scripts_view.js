$(document).ready(() => {
    $('[data-toggle="tooltip"]').tooltip();
});

$("#add-new-script-file").click(() => {
    $("#add_script_file_modal").modal("show");
});

clearPopup = () => {
    $("#file_name").val("");
    $("#page_id").val("");
};

$("#add_script_file_frm").submit(async e => {
    e.preventDefault();
    const fileName = $("#file_name").val();
    const pageId = $("#page_id").val();
    const data = {
        fileName,
        pageId
    };
    axios({
        method: "post",
        url: "/store-script-file",
        data: data
    });
    clearPopup();
    $("#add_script_file_modal").modal("hide");
    location.reload();
});

$(".edit-field").click(function() {
    const fileId = $(this)
        .parent()
        .parent()
        .data("file-id");
    console.log("edit file action...", fileId);
    if (fileId) {
        const replaceScreen = `/code-editor-view/${fileId}`;
        location.href = replaceScreen;
    }
});

$(".delete-field").click(async function() {
    const fileId = $(this)
        .parent()
        .parent()
        .data("file-id");
    if (fileId) {
        const request = await axios({
            method: "post",
            url: "/delete-script-file/" + fileId,
            data: {}
        });
        if (request.data.status === "true") {
            location.reload();
        }
    }
});
