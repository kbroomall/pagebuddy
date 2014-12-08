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
	var adinfo = document.getElementById("adinfo");
	var title = document.getElementById("title");
	title.innerHTML+="<span>" + domContent.title + "</span>";
	content.innerHTML+="Chrome Version: " + domContent.chrome_version+"<br/>";
	content.innerHTML+="Flash Version: " + domContent.flash_version+"<font size='1'>  <a target='_blank' href='http://helpx.adobe.com/flash-player.html'>more</a></font><br/>";
	content.innerHTML+="Iframes on Page: " + domContent.num_iframes +"<br/>";
	content.innerHTML+=domContent.is_secure?
	"Secure Protocol: Secure":"NOT Secure...";
	content.innerHTML+="<br/>";
	content.innerHTML+=(domContent.domain_match?"Location vs Domain: MATCH":"Location vs Domain: MISMATCH")+"<br/>";
	adinfo.innerHTML+="PointRoll RM Ads on Page:"+"<br/>";
	for (var i=0;i<domContent.ads.length;i++)
	{
		adinfo.innerHTML+="<a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+domContent.ads[i]+"'>Ad "+(i+1)+": "+domContent.ads[i]+"</a>" + "<br/>";
	}
	adinfo.innerHTML+="<br/>"+"Site Events: " + "<br/>" + domContent.site_events+"<br/>";
}

function sendDom(){
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {type: "dom_request"}, function(response) {
    console.log("response");
	doStuffWithDOM(response);
  });
});
}