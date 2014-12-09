
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"
});
console.log(backgroundPageConnection.name);
backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

chrome.devtools.network.onRequestFinished.addListener(function(request) {
	if (request.request.url.indexOf("PortalServe")>-1)
	{
		console.log(request.request.url);
		backgroundPageConnection.postMessage({
			type: "ad_call",
			tabId: chrome.devtools.inspectedWindow.tabId,
			adID: request.request.url.split("pid=")[1].slice(0,7)
		});
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	console.log(message.type);
	if(message.type=="pr_pin")
	{
		chrome.devtools.inspectedWindow.eval("prAddEvent('pi','prPin()',window);alert('firing pin from inspected window');");
	}
});