console.log("v1");
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	sendResponse({
		title:getTitle(),
		flash_version:getFlash(),
		chrome_version:getBrowserVersion(),
		num_iframes:getIframes(),
		is_secure:getSecure(),
		domain_match:getDomains(),
		ads:getAds()
	});
});
//writes PointRoll Page Buddy to top of page with line break
function getTitle() {
    return "PageBuddy v.1.0";
}

function getAds() {
	var ads = [];
	var adIndex = 0;
	for (var i=0; i < document.scripts.length; i++)
	{
		if(document.getElementsByTagName("script")[i].src.indexOf("ads.pointroll.com")>0)
		{
			var temp = document.getElementsByTagName("script")[i].src.split("pid=")[1];
			if (typeof(temp) != "undefined")
			{
				ads[adIndex]=temp.slice(7);
				adIndex++;
			}
		}
	}
	
	for (var i=0; i < document.getElementsByTagName("iframe").length; i++)
	{
		if(document.getElementsByTagName("iframe")[i].innerHTML.indexOf("ads.pointroll.com")>0)
		{
			var temp = document.getElementsByTagName("iframe")[i].innerHTML.split("pid=")[1];
			if (typeof(temp) != "undefined")
			{
				ads[adIndex]=temp.slice(7);
				adIndex++;
			}
		}
	}
	return ads;
}

//check flash version and return to window
function getFlash() {
    var f = navigator.plugins["Shockwave Flash"].description;
    return f;
}

//checks to see if page is SSL compliant...
function getSecure() {
    if (location.protocol.toLowerCase().indexOf("https") >= 0) {
        return true;
    } else {
        return false;
    }
}

//check to see how many iframes exist on the page:
function getIframes() {
	console.log(document.title);
    var x = document.all[0].getElementsByTagName("iframe").length;
	return x;
}

//checks to see if location.href matches document.domain:
function getDomains() {
    var str1 = location.href.split('/')[2],
        str2 = document.domain;
    if (str1 == str2) {
        return true;
    } else {
        return false;
    }
}

function getBrowserVersion(){
    var ua=navigator.userAgent,tem,chromeVersion=ua.match(/(chrome(?=\/))\/?\s*(\d+)/i) || [];                                                                                                                         
    chromeVersion=chromeVersion[2]? [chromeVersion[1], chromeVersion[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {chromeVersion.splice(1,1,tem[1]);}
	return chromeVersion[1];
    }

