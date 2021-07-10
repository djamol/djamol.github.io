function clearEditor() {
    window.currentContent = "";
    window.currentCssContent = "";
    editor.DomComponents.clear(); // Clear components
    editor.UndoManager.clear(); // Clear undo history
    editor.setComponents([{}, {}, []]); // Add components
    editor.setStyle([{}, {}, null]); // Add rules
}

function update() {
    /*setTimeout(() => {
        const currentContent = window.currentContent;
        const currentCssContent = window.currentCssContent;
        // Weird divs the editor inserts to the document
        let htmlContent = editor.getHtml();
        htmlContent = htmlContent.substr(33, htmlContent.length - 1);
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
    }, 9000);*/
}

function loadPageContent() {
    atomic(`/retrive-website/${window.page}`)
        .then(function(response) {
            if (response.data.status) {
                const parsedResult = response.data.message;
                const parsedContent = JSON.parse(parsedResult.content);
                const parsedCss = JSON.parse(parsedResult.styles);
                // Update current HTML
                window.currentContent = parsedContent;
                window.currentCssContent = parsedCss;
                editor.addComponents(parsedContent);
                editor.setStyle(parsedCss);
            }
        })
        .catch(function(error) {
            console.log(error.status); // xhr.status
            console.log(error.statusText); // xhr.statusText
        });
}

function beginToSave() {
    // Weird divs the editor inserts to the document
    let htmlContent = editor.getHtml();
    htmlContent = htmlContent.substr(33, htmlContent.length - 1);
    const cssContent = editor.getCss();
    if (
        htmlContent !== window.currentContent &&
        cssContent !== window.currentCssContent
    ) {
        window.currentContent = htmlContent;
        window.currentCssContent = cssContent;
        save(htmlContent, cssContent);
    }
}

function save(htmlContent, cssContent) {
    atomic("/store-website", {
        method: "POST",
        data: {
            code: window.page,
            content: htmlContent,
            css: cssContent
        }
    })
        .then(function(response) {
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
}
