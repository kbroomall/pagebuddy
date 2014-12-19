var connections = {};
var myPort;
var ads = new Array();

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

chrome.webNavigation.onBeforeNavigate.addListener (function(details){
	delete ads;
	ads = new Array();
	return;
});

chrome.webRequest.onCompleted.addListener(function(details){
	var newAdId, ad, adType;
	if (details.url.indexOf("PortalServe")>-1)
	{
		newAdId = details.url.split("pid=")[1].slice(0,7);
		if(details.url.indexOf("pos=i") > -1)
		{
			adType = "image";
		}
		else if (details.url.indexOf("pos=o") > -1)
		{
			adType = "in_stream";
		}
		else
		{
			adType = "rich_media";
		}
	}
	else if (details.url.indexOf("ev.ads.pointroll.com") > -1)
	{
		newAdId = details.url.split("ss=")[1].slice(0,36);
		adType = "site_event";
	}
	else if (details.url.indexOf("container.pointroll.com") > -1)
	{
		newAdId = details.url.split("ctid=")[1].slice(0,36);
		adType = "container_tag";
	}
	if (typeof(newAdId)!=="undefined")
	{
		ad = {id:newAdId, status:details.statusCode, type:adType};
		try{ads.push(ad);}catch(e){}
		if (chrome.extension.getViews({type: "popup"}).length > 0)
		{
			chrome.runtime.sendMessage({type:"ad_call", status: details.statusCode, adID: newAdId, adType:adType});
			/*backgroundPageConnection.postMessage({
				type: "ad_call",
				tabId: chrome.devtools.inspectedWindow.tabId,
				adID: request.request.url.split("pid=")[1].slice(0,7)
			});*/
		}
	}
		
},{urls: [ "<all_urls>" ]},['responseHeaders']);

