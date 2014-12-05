console.log("popup");
/* When the browser-action button is clicked... */
window.onload = function() {debugger;
    /*...check the URL of the active tab against our pattern and... */
        /* ...if it matches, send a message specifying a callback too */
        setTimeout(sendDom,500);
};

/* A function creator for callbacks */
function doStuffWithDOM(domContent) {
	var content = document.getElementById("content");
	content.innerHTML+=domContent.title + "<br/><br/>";
	content.innerHTML+="Chrome Version: " + domContent.chrome_version+"<br/>";
	content.innerHTML+="Flash Version: " + domContent.flash_version+"<br/>";
	content.innerHTML+="Iframes on Page: " + domContent.num_iframes +"<br/>";
	content.innerHTML+=domContent.is_secure?
	"Secure Protocol: Secure":"NOT Secure...";
	content.innerHTML+="<br/>";
	content.innerHTML+=(domContent.domain_match?"Location vs Domain: MATCH":"Location vs Domain: MISMATCH")+"<br/>";
	content.innerHTML+="PointRoll RM Ads on Page:"+"<br/>"
	for (var i=0;i<domContent.ads.length;i++)
	{
		content.innerHTML+="PID "+(i+1)+": "+"<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+domContent.ads[i]+"'>"+domContent.ads[i]+"</a>" + "<br/>";
	}
	content.innerHTML+="<br/>"+"Site Events: " + "<br/>" + domContent.site_events+"<br/>";
}

function sendDom(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: "dom_request"}, function(response) {
    console.log("response");
	doStuffWithDOM(response);
  });
});
}