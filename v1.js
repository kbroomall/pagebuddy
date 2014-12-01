console.log("v1");
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	sendResponse({
		title:getTitle(),
		num_iframes:getIframes(),
		flash_version:getFlash(),
		is_secure:getSecure(),
		domain_match:getDomains()
	});
});
//writes PointRoll Page Buddy to top of page with line break
function getTitle() {
    return "PointRoll PageBuddy v.09";
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
