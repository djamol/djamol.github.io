// Global current content
window.currentContent = "";
// Global Css current content
window.currentCssContent = "";
// Global Editor
window.editor = grapesjs.init({
    fromElement: 1,
    component: "<p>All new content. <em>You bet!</em></p>",
    container: "#gjs",
    canvas: {
        styles: [
            "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        ]
    },
    assetManager: {
        assets: [
            "http://placehold.it/350x250/78c5d6/fff/image1.jpg",
            // Pass an object with your properties
            {
                type: "image",
                src: "http://placehold.it/350x250/459ba8/fff/image2.jpg",
                height: 350,
                width: 250
            },
            {
                // As the 'image' is the base type of assets, omitting it will
                // be set as `image` by default
                src: "http://placehold.it/350x250/79c267/fff/image3.jpg",
                height: 350,
                width: 250
            }
        ]
    },
    storageManager: {
        autosave: true
    }
});
function getContent(contentType) {
    switch (contentType) {
        case "text":
            return "<span>Default text template...</span>";
        case "image":
            // editor.runCommand("open-assets");
            return "<img src='http://placehold.it/350x250/459ba8/fff/image2.jpg' style='width: 350px; height: 250px;' />";
        case "link":
            return "<a href='#'>Link to another page...</a>";
        case "box-1":
            return '<div style="border: 1px solid black; padding: 6%; width: 340px;">This is a simple block</div>';
        case "box-4-4":
            return '<div class="row" style="width:100%;height: 300px;"><div class="col-sm-6">Box 1</div><div class="col-sm-6">Box 1-2</div><div class="col-sm-6">Box 2-1</div><div class="col-sm-6">Box 2-2</div></div>';
        case "box-4-2":
            return '<div class="row" style="width:100%"><div class="col-sm-6">Box 1</div><div class="col-sm-6">Box 1-2</div></div>';
        case "box-3-1":
            return '<div class="row" style="width:100%"><div class="col-sm-4">One of three</div><div class="col-sm-4">Two of three</div><div class="col-sm-4">Three of three</div></div>';
        case "box-6-2":
            return '<div class="row" style="width:100%"><div class="col-sm-4">One of Six</div><div class="col-sm-4">Two of Six</div><div class="col-sm-4">Three of Six</div><div class="col-sm-4">Four of Six</div><div class="col-sm-4">Five of Six</div><div class="col-sm-4">Six of Six</div></div>';
        case "box-9-3":
            return '<div class="row" style="width:100%"><div class="col-sm-4">One of Nine</div><div class="col-sm-4">Two of Nine</div><div class="col-sm-4">Three of Nine</div><div class="col-sm-4">Four of Nine</div><div class="col-sm-4">Five of Nine</div><div class="col-sm-4">Six of Nine</div><div class="col-sm-4">Seven of Nine</div><div class="col-sm-4">Eight of Nine</div><div class="col-sm-4">Nine of Nine</div></div>';
        case "ol":
            return "<ol><li>Coffee</li><li>Tea</li><li>Milk</li></ol>";
        case "ul":
            return '<ul class="list-group"><li class="list-group-item">First item</li><li class="list-group-item">Second item</li><li class="list-group-item">Third item</li></ul>';
        case "form":
            return '<form><input type="text" value="Enter some text" placeholder="Placeholder text" name="input-1" /></form>';
        case "input":
            return '<input type="text" value="Basic text input" placeholder="Placeholder text" name="input-2" />';
        case "radio":
            return '<input type="radio" name="default_value" value="default_value" />';
        case "checkbox":
            return '<input type="checkbox" name="default_value" value="default_value" />';
        case "button":
            return "<button type='submit'>Default button</button>";
    }
    return ""; //default
}
// editor.addComponents(`<div>
//   <img src="https://path/image" />
//   <span title="foo">Hello world!!!</span>
// </div>`);
var blockManager = editor.BlockManager;
// Add components
blockManager.add("text", {
    label:
        '<i class="fa fa-text-width" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Text',
    content: getContent("text")
});
blockManager.add("image", {
    label:
        '<i class="fa fa-picture-o" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Image',
    content: getContent("image")
});
blockManager.add("link", {
    label:
        '<i class="fa fa-link" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Link',
    content: getContent("link")
});
blockManager.add("single-box", {
    label:
        "<i class='fa fa-square-o' aria-hidden='true' style='font-size: 2.4rem;'></i><br/>1 Block",
    content: getContent("box-1")
});
blockManager.add("four-box", {
    label:
        '<i class="fa fa-th-large" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>4 Multi Box',
    content: getContent("box-4-4")
});
blockManager.add("two-box", {
    label:
        '<i class="fa fa-th-large" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>2 Multi Box',
    content: getContent("box-4-2")
});
blockManager.add("one-line-triple-box", {
    label:
        '<i class="fa fa-th" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>1 TripleBox',
    content: getContent("box-3-1")
});
blockManager.add("two-line-triple-box", {
    label:
        '<i class="fa fa-th" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>2 TripleBox',
    content: getContent("box-6-2")
});
blockManager.add("three-line-triple-box", {
    label:
        '<i class="fa fa-th" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>3 TripleBox',
    content: getContent("box-9-3")
});
blockManager.add("list-ordered", {
    label:
        '<i class="fa fa-list-ol" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>O. List',
    content: getContent("ol")
});
blockManager.add("unordered-list", {
    label:
        '<i class="fa fa-list-ul" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Unord. List',
    content: getContent("ul")
});
blockManager.add("form", {
    label:
        '<i class="fa fa-square" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Form',
    content: getContent("form")
});
blockManager.add("text-area", {
    label:
        '<i class="fa fa-keyboard-o" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Text Area',
    content: getContent("input")
});
blockManager.add("radio-input", {
    label:
        '<i class="fa fa-check-circle-o" style="font-size: 2.4rem;"></i><br/>Radio',
    content: getContent("radio")
});
blockManager.add("checkbox-input", {
    label:
        '<i class="fa fa-check-square-o" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Checkbox',
    content: getContent("checkbox")
});
blockManager.add("button", {
    label:
        '<i class="fa fa-behance-square" aria-hidden="true" style="font-size: 2.4rem;"></i><br/>Button',
    content: getContent("button")
});
loadPageContent = () => {
    atomic(`/retrive-website/${page}`)
        .then(function(response) {
            if (response.data.status) {
                const parsedResult = response.data.message;
                const parsedContent = JSON.parse(parsedResult.content);
                const parsedCss = JSON.parse(parsedResult.styles);
                // Update current HTML
                window.currentContent = parsedContent;
                editor.addComponents(parsedContent);
                editor.setStyle(parsedCss);
            }
        })
        .catch(function(error) {
            console.log(error.status); // xhr.status
            console.log(error.statusText); // xhr.statusText
        });
};
function clearEditor() {
    window.currentContent = "";
    window.currentCssContent = "";
    editor.DomComponents.clear(); // Clear components
    editor.UndoManager.clear(); // Clear undo history
    editor.setComponents([{}, {}, []]); // Add components
    editor.setStyle([{}, {}, null]); // Add rules
}
update = () => {
    setTimeout(() => {
        const currentContent = window.currentContent;
        const currentCssContent = window.currentCssContent;
        const htmlContent = editor.getHtml().substr(33); // Weird divs the editor inserts to the document
        const cssContent = editor.getCss();
        if (
            htmlContent !== currentContent &&
            cssContent !== currentCssContent
        ) {
            window.currentContent = htmlContent;
            window.currentCssContent = cssContent;
            save(htmlContent, cssContent);
        }
        update();
    }, 9000);
};
$(document).ready(function() {
    clearEditor();
    update();
    loadPageContent();
});
save = (htmlContent, cssContent) => {
    atomic("/store-website", {
        method: "POST",
        data: {
            code: page,
            content: htmlContent,
            css: cssContent
        }
    })
        .then(function(response) {
            console.log(response.data); // xhr.responseText
            console.log(response.xhr); // full response
            if (!response.data.status) {
                Toastify({
                    text: "Error processing request!",
                    duration: 1500,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    backgroundColor: "red",
                    className: "info-toast",
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    onClick: function() {} // Callback after click
                }).showToast();
            } else {
                Toastify({
                    text: "Changes have been saved!",
                    duration: 1500,
                    destination: "https://github.com/apvarun/toastify-js",
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "center", // `left`, `center` or `right`
                    backgroundColor: "#00a673",
                    className: "info-toast",
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    onClick: function() {} // Callback after click
                }).showToast();
            }
        })
        .catch(function(error) {
            console.log(error.status); // xhr.status
            console.log(error.statusText); // xhr.statusText
        });
};
