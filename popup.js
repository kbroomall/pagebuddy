console.log("popup");

var content;
var adinfo;
var siteEventInfo;
var adCount = 0;
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
	content.innerHTML+="Chrome Version: " + domContent.chrome_version+"<br/>";
	content.innerHTML+="Flash Version: " + domContent.flash_version+"<font size='1'>  <a target='_blank' href='http://helpx.adobe.com/flash-player.html'>more</a></font><br/>";
	content.innerHTML+="Iframes on Page: " + domContent.num_iframes +"<br/>";
	content.innerHTML+=domContent.is_secure?
	"Secure Protocol: Secure":"NOT Secure...";
	content.innerHTML+="<br/>";
	content.innerHTML+=(domContent.domain_match?"Location vs Domain: MATCH":"Location vs Domain: MISMATCH")+"<br/>";
	adinfo.innerHTML+="";
	
	/* Grab adIds passed from dev tools network tab from local storage (currently deprecated as we can use direct access to background page instead,
	   but keeping this for now in case its needed for other pieces).*/
	
	/*try{chrome.storage.local.get("adIds", getAdsFromStorage);}catch(e){}*/

	for (var i=0;i<domContent.ads.length;i++)
	{
		adCount++;
		adinfo.innerHTML+="<li class='list-group-item'>" + 
		"<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+
		background.ads[i].id+ 
		"'><span class='glyphicon glyphicon-tag green' aria-hidden='true' title='Tag Found'></span>" + 
		" " +
		background.ads[i].id+ 
		" (Status: "+background.ads[i].status+")</a>" +
		"</li>";
	}
	//siteEventInfo.innerHTML+="<br/>"+"Site Events: " + "<br/>" + domContent.site_events+"<br/>";

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
		adCount++;
		adinfo = document.getElementById("adinfo");
		adinfo.innerHTML+="<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+message.adID+"'>Ad "+adCount+": " + message.adID+" (Status "+message.status+")</a><br/>";
	}
});

function passPRPinADS(){
	var passedFunction = function prPinAds() {
		prAddEvent('pi',function(){prpc=1;});
	};
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type:"injected_function", passed_function:passedFunction.toLocaleString(), function_name:"prPinAds"}, function(response) {
		});
	});
}

function passPRCloseADS(){
	var passedFunction = function prCloseAds() {
		prClose();
	};
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type:"injected_function", passed_function:passedFunction.toLocaleString(), function_name:"prCloseAds"}, function(response) {
		});
	});
}

/*function prHighlight(bannercolor, panelcolor, opacity){
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type:"pr_highlight", bannercolor:bannercolor, panelcolor:panelcolor, opacity:opacity}, function(response) {
		});
	});
}*/

function passPRHighlight(bannercolor, panelcolor, opacity){
	var passedFunction = function prHighlight(bannercolor, panelcolor, opacity) {
		for(n=0;n<(prids.split(',').length);n++){
			try{
				document.getElementById('prw'+prids.split(',')[n]).style.backgroundColor=bannercolor;
				document.getElementById('prflsh'+prids.split(',')[n]).style.opacity=opacity;
				document.getElementById('prf'+prids.split(',')[n]).style.backgroundColor=panelcolor;
			}catch(e){}
		}
		if(prup!=0){document.getElementById('prinner'+prids.split(',').pop()).style.opacity=opacity;}
		prAddEvent('pi',(function(z){
			for(n=0;n<(prids.split(',').length);n++){
				try{document.getElementById('prinner'+prids.split(',')[n]).style.opacity=opacity;}catch(e){}
			}
		}));
		
	};
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
		chrome.tabs.sendMessage(tabs[0].id, {type:"injected_function", passed_function:passedFunction.toLocaleString(), args:[bannercolor, panelcolor, opacity], function_name:"prHighlight"}, function(response) {
		});
	});
}

function prHighlight(bc,pc,o){
	var script = "for(n=0;n<(prids.split(',').length);n++){"
	script += "try{"
	script += "document.getElementById('prw'+prids.split(',')[n]).style.backgroundColor='"+bc+"';";
	script += "document.getElementById('prflsh'+prids.split(',')[n]).style.opacity='"+o+"';"
	script += "document.getElementById('prf'+prids.split(',')[n]).style.backgroundColor='"+pc+"';";
	script += "}catch(e){}}";
	script += "if(prup!=0){document.getElementById('prinner'+prids.split(',').pop()).style.opacity="+o+";}";
	script += "prAddEvent('pi',(function(z){";
	script += "for(n=0;n<(prids.split(',').length);n++){";
	script += "try{document.getElementById('prinner'+prids.split(',')[n]).style.opacity="+o+";}catch(e){}}}));";
	addScript(script);
}

document.addEventListener('DOMContentLoaded', function() {
    var link = document.getElementById('pin');
    // onClick's logic below:
    link.addEventListener('click', function() {
        passPRPinADS();
    });
	
	link = document.getElementById("close");
	
	link.addEventListener('click', function() {
        passPRCloseADS();
    });
	
		link = document.getElementById("highlight-on");
	
	link.addEventListener('click', function() {
        passPRHighlight('green','red', 0.5);
    });
	
		link = document.getElementById("highlight-off");
	
	link.addEventListener('click', function() {
        passPRHighlight('transparent','transparent', 1);
    });
});
