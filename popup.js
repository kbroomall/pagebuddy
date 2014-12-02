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
	"Secure Protocol: Page Secure":"Secure Protocol: SSL Protocol not detected...";
	content.innerHTML+="<br/>";
	content.innerHTML+=domContent.getDomains?"Location vs Domain: MATCH":"Location vs Domain: MISMATCH";
	for (var i=0;i<domContent.ads.length;i++)
	{
		content.innerHTML+="<br/><a target='_blank' href='http://adportal.pointroll.com/Tools.aspx?pid="+domContent.ads[i]+"'>Ad "+(i+1)+": "+domContent.ads[i]+"</a>";
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