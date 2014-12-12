console.log("popup");

var content;
var adinfo;
var title;
var siteEventInfo;

var background = chrome.extension.getBackgroundPage();
	
/* When the browser-action button is clicked... */
window.onload = function() {debugger;
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */
        setTimeout(sendDom,500);
};

/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
	content = document.getElementById("content");
	adinfo = document.getElementById("adinfo");
	siteEventInfo = document.getElementById("siteeventinfo");
	title = document.getElementById("title");
	title.innerHTML+="<span>" + domContent.title + "</span>";
	content.innerHTML+="Chrome Version: " + domContent.chrome_version+"<br/>";
	content.innerHTML+="Flash Version: " + domContent.flash_version+"<font size='1'>  <a target='_blank' href='http://helpx.adobe.com/flash-player.html'>more</a></font><br/>";
	content.innerHTML+="Iframes on Page: " + domContent.num_iframes +"<br/>";
	content.innerHTML+=domContent.is_secure?
	"Secure Protocol: Secure":"NOT Secure...";
	content.innerHTML+="<br/>";
	content.innerHTML+=(domContent.domain_match?"Location vs Domain: MATCH":"Location vs Domain: MISMATCH")+"<br/>";
	adinfo.innerHTML+="PointRoll RM Ads on Page:"+"<br/>";
	
	/* Grab adIds passed from dev tools network tab from local storage*/
	
	/*try{chrome.storage.local.get("adIds", getAdsFromStorage);}catch(e){}*/
	
	for (var i=0;i<domContent.ads.length;i++)
	{
		adinfo.innerHTML+="<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+background.adIds[i]+"'>Ad "+(i+1)+": " + background.adIds[i]+"</a>" + "<br/>";
	}
	siteEventInfo.innerHTML+="<br/>"+"Site Events: " + "<br/>" + domContent.site_events+"<br/>";

}

function updateRequests(requests){
	if(document.getElementById('requests')){
		document.getElementById('requests').innerHTML = requests[0];
	}
}

function getAdsfromStorage (ads)
{
	for (i in ads)
	{
		adinfo.innerHTML += ads[i];
	}
}

function sendDom(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: "dom_request"}, function(response) {
    console.log("response");
	doStuffWithDOM(response);
  });
});
}

/* This was being used to grab ad calls from network tab in real time. May need to be scrapped or reworked. */

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.type=="ad_call")
	{
		adinfo = document.getElementById("adinfo");
		adinfo.innerHTML+="<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+background.adIds[i]+"'>Ad "+(i+1)+": " + background.adIds[i]+"</a>" + "<br/>";
		/*try{console.log(message.details);}catch(e){}*/
	}
});

function prPinPRADS(){
	chrome.runtime.sendMessage({type:"panel_pin"});
}

function prClosePRADS(){
	chrome.runtime.sendMessage({type:"panel_close"});
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('pin');
    // onClick's logic below:
    link.addEventListener('click', function() {
        prPinPRADS();
    });
	
	link = document.getElementById("close");
	
	link.addEventListener('click', function() {
        prClosePRADS();
    });
});

console.log("test");
