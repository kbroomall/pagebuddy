/* When the browser-action button is clicked... */console.log("background");
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {debugger;
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */
        sendDom();
});

/* A function creator for callbacks */
function doStuffWithDOM(domContent) {debugger;console.log("test2");
    /*document.write("<table>", "<tr>", "<td>", "Iframes on Page:", "</td>", "<td>", domContent, "</td>", "</tr>", "</table>");*/
}

var sendDom = function() {
    chrome.tabs.getSelected(null, function(tab){
        chrome.tabs.sendMessage(tab.id, {type: "dom-report"});
    });
}