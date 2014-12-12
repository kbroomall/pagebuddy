var connections = {};
var myPort;
var adIds = new Array();

chrome.runtime.onSuspend.addListener = function() {
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */
		alert("clearing adIds");
        delete adIds;
		adIds = new Array();
		alert("adIds:"+adIds);
};

/* clean up old ad info. Also need to add functionality to refresh this on page reload */
/*chrome.storage.local.remove("adIds");*/

chrome.runtime.onConnect.addListener(function (port) {
	port.onMessage.addListener(function(message, sender, sendResponse) {
		/* Grab ad call info from network tab and pass it to popup. 
		   Seems to be more or less working, but needs better detection of when popup is open.*/
		if (message.type == "ad_call")
		{
			/*if (chrome.extension.getViews({type:"popup"}))
			{
				chrome.storage.local.get(function(cfg) {
				  if(typeof(cfg["adIds"]) !== 'undefined' && cfg["adIds"] instanceof Array) { 
					cfg["adIds"].push(message.adID);
				  } else {
					cfg["adIds"] = [message.adID];
				  }
				  chrome.storage.local.set(cfg); 
				});
			}
			else
			{
				chrome.runtime.sendMessage(message);
			}*/
		}
		/* if we don't need to communicate with popup, pass the message along */
		else
		{
			chrome.runtime.sendMessage(message);
		}
	});
    // Listen to messages sent from the DevTools page
    chrome.runtime.onMessage.addListener(function (message) {
		try{port.postMessage(message);}catch(e){}
	// other message handling
    });

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

		delete myPort;

    });
});

chrome.webRequest.onCompleted.addListener(function(details){
	if (details.url.indexOf("PortalServe")>-1)
	{
		var newAdId = details.url.split("pid=")[1].slice(0,7);
		try{adIds.push( newAdId );}catch(e){alert(e.message);}
		if (chrome.extension.getViews({type: "popup"}).length > 0)
		{
			chrome.runtime.sendMessage({type:"ad_call", status: details.statusCode, adID: newAdId});
			/*backgroundPageConnection.postMessage({
				type: "ad_call",
				tabId: chrome.devtools.inspectedWindow.tabId,
				adID: request.request.url.split("pid=")[1].slice(0,7)
			});*/
		}
	}
},{urls: [ "<all_urls>" ]},['responseHeaders']);

