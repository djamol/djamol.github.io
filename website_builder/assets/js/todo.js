$("document").ready(function() {
    // load to-dos
    $("#hidden-color").val("red");
    $.ajax({
        method: "GET",
        url: "/get-todos",
        data: {}
    }).done(function(msg) {
        let result = JSON.parse(msg);
        if (result) {
            // renders to-do
            if (result.length > 0) {
                $(".empty-message").hide();
            }
            result.map(el => {
                $(".todo-box").append(
                    `<div class="container-box-todo box-color-${el.color}">
                        <h2 class="inside-box-title">
                            <span>${el.title}</span>
                            <span class="date-of-todo">${el.date}</span>
                        </h2>
                        <p
                            id="preview-box-description"
                            class="inside-todo-box-text-content"
                        >
                        ${el.description}
                        </p>
                    </div>`
                );
            });
        }
    });
});

function updateTodos() {
    location.reload();
}

$("#title_todo").keyup(function() {
    let d = new Date();
    $(".date-todo").text(d.toLocaleDateString());
    if (!$("#title_todo").val() && !$("#description_todo").val()) {
        $(".preview-inside-box").addClass("hide");
        $("#empty-message-prv").show();
        $("#preview-box-title").text("title test");
        return;
    }
    if ($(".preview-inside-box").hasClass("hide")) {
        $(".preview-inside-box").removeClass("hide");
    }
    if ($("#empty-message-prv").is(":visible")) {
        $("#empty-message-prv").hide();
    }
    $("#preview-box-title").text($("#title_todo").val());
});

$("#description_todo").keyup(function() {
    let d = new Date();
    $(".date-todo").text(d.toLocaleDateString());
    if (!$("#title_todo").val() && !$("#description_todo").val()) {
        $(".preview-inside-box").addClass("hide");
        $("#empty-message-prv").show();
        $("#preview-box-description").text("test");
        return;
    }
    if ($(".preview-inside-box").hasClass("hide")) {
        $(".preview-inside-box").removeClass("hide");
    }
    if ($("#empty-message-prv").is(":visible")) {
        $("#empty-message-prv").hide();
    }
    $("#preview-box-description").text($("#description_todo").val());
});

function updateSelected(color) {
    $(".class-color-wheels .circle").each(function(k, v) {
        if ($(v).hasClass("selected") && !$(v).hasClass(color + "-circle")) {
            $(v).removeClass("selected");
        }
        if ($(v).hasClass(color + "-circle")) {
            $(v).addClass("selected");
        }
    });
}

function changeColor(color) {
    $(".preview-inside-box").removeClass("box-color-red");
    $(".preview-inside-box").removeClass("box-color-black");
    $(".preview-inside-box").removeClass("box-color-blue");
    $(".preview-inside-box").removeClass("box-color-yellow");
    $(".preview-inside-box").removeClass("box-color-green");
    $(".preview-inside-box").removeClass("box-color-grey");
    switch (color) {
        case "red":
            $(".preview-inside-box").addClass("box-color-red");
            $("#hidden-color").val("red");
            break;
        case "black":
            $(".preview-inside-box").addClass("box-color-black");
            $("#hidden-color").val("black");
            break;
        case "blue":
            $(".preview-inside-box").addClass("box-color-blue");
            $("#hidden-color").val("blue");
            break;
        case "yellow":
            $(".preview-inside-box").addClass("box-color-yellow");
            $("#hidden-color").val("yellow");
            break;
        case "green":
            $(".preview-inside-box").addClass("box-color-green");
            $("#hidden-color").val("green");
            break;
        case "grey":
            $(".preview-inside-box").addClass("box-color-grey");
            $("#hidden-color").val("grey");
            break;
    }
    return updateSelected(color);
}

$(".red-circle").click(function() {
    changeColor("red");
});

$(".black-circle").click(function() {
    changeColor("black");
});

$(".blue-circle").click(function() {
    changeColor("blue");
});

$(".yellow-circle").click(function() {
    changeColor("yellow");
});

$(".green-circle").click(function() {
    changeColor("green");
});

$(".grey-circle").click(function() {
    changeColor("grey");
});

$("#add-todo").click(function() {
    const title = $("#title_todo").val();
    const description = $("#description_todo").val();
    const date = $(".date-todo").text();
    const color = $("#hidden-color").val();
    $.ajax({
        method: "POST",
        url: "/store-todo",
        data: {
            title,
            description,
            date,
            color
        }
    }).done(function(msg) {
        console.log(msg);
        if (msg) {
            updateTodos();
        }
    });
});
