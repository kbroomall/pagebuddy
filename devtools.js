
// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
    name: "panel"+Math.random()
});
console.log(backgroundPageConnection.name);

backgroundPageConnection.postMessage({
    name: 'init',
    tabId: chrome.devtools.inspectedWindow.tabId
});

/* Send ad info to background page. Needs to be tweaked to make sure we're grabbing all valid ad types */
/*
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
});*/

/* Use console window to run JS on parent page using eval. */
backgroundPageConnection.onMessage.addListener (function(message, sender, sendResponse) {
	if(message.type=="panel_pin")
	{
		console.log("firing prPin");
		chrome.devtools.inspectedWindow.eval("prAddEvent('pi',function(){prpc=1;});");
		console.log("prPin fired");
	}
	else if (message.type=="panel_close")
	{
		chrome.devtools.inspectedWindow.eval("prClose();");
	}
});