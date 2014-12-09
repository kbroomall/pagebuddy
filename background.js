var connections = {};

console.log("background");

chrome.runtime.onConnect.addListener(function (port) {
console.log("connect to backgorund");
    var extensionListener = function (message, sender, sendResponse) {
        // The original connection event doesn't include the tab ID of the
        // DevTools page, so we need to send it explicitly.
        if (message.name == "init") {
          connections[message.tabId] = port;
          return;
        }
		else if (message.type=="ad_call")
		{
			/*chrome.runtime.sendMessage(message);*/
			/*chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			  chrome.tabs.sendMessage(tabs[0].id, message);
			});*/
			/*var popup = chrome.extension.getViews({type:'popup'})
			popup.console.log(message.adID);
			popup.adinfo = popup.document.getElementById("adinfo");
			popup.adinfo.innerHTML += message.adID + "<br/>";*/
		}

	// other message handling
    }

    // Listen to messages sent from the DevTools page
    port.onMessage.addListener(extensionListener);

    port.onDisconnect.addListener(function(port) {
        port.onMessage.removeListener(extensionListener);

        var tabs = Object.keys(connections);
        for (var i=0, len=tabs.length; i < len; i++) {
          if (connections[tabs[i]] == port) {
            delete connections[tabs[i]]
            break;
          }
        }
    });
});