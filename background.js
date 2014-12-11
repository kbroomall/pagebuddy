var connections = {};
var myPort;

/* clean up old ad info. Also need to add functionality to refresh this on page reload */
chrome.storage.local.remove("adIds");

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
	console.log(details.statusCode + '  ' + details.url);
},{urls: [ "<all_urls>" ]},['responseHeaders']);
