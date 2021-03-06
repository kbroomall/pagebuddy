console.log("v1");

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message.type=='dom_request'){
	sendResponse({
		flash_version:getFlash(),
		chrome_version:getBrowserVersion(),
		num_iframes:getIframes(),
		is_secure:getSecure(),
		domain_match:getDomains(),
		/*ads:getAds(),*/
		site_events:getSiteEvents(),
		prids:getPRIds()
	});}
	else if(message.type=='pr_pin'){prPinAllPanels();}
	else if(message.type=='pr_highlight')
	{
		prHighlight(message.bannercolor, message.panelcolor, message.opacity);
	}
	else if(message.type=='injected_function')
	{
		if(message.args)
		{
			addFunction(message.passed_function, message.function_name, message.args);
		}
		else
		{
			addFunction(message.passed_function, message.function_name);
		}
	}
});


//Displays site Events on the page
function getSiteEvents() {

}

function addScript(script){
	var th = document.getElementsByTagName('body')[0];
	    var s = document.createElement('script');
	    s.setAttribute('type', 'text/javascript');
	    s.innerText = script;
		s.setAttribute('class','prInjectedScript');
		s.style.display="none";
	    th.appendChild(s);
}

function getPRIds(){
	return getDomVariable("prids");
}
	
//Displays links to PointRoll pids that link to AdPortal
function getAds() {
	/*var ads = [];
	var adIndex = 0;
	
	for (var i=0; i < document.scripts.length; i++)
	{
		if(document.getElementsByTagName("script")[i].src.indexOf("ads.pointroll.com")>0)
		{
			var temp = document.getElementsByTagName("script")[i].src.split("pid=")[1];
			if (typeof(temp) != "undefined")
			{
				ads[adIndex]=temp.slice(0,7);
				adIndex++;
			}
		}
	}
	
	for (var i=0; i < window.frames.length; i++)
	{
		console.log(window.frames[i].document.scripts);
		var frameScripts = window.frames[i].document.scripts;
		for (var j=0; j < frameScripts.length; j++)
		{
			if(frameScripts[j].src.indexOf("ads.pointroll.com")>0)
			{
				var temp = frameScripts[j].src.split("pid=")[1];
				if (typeof(temp) != "undefined")
				{
					ads[adIndex]=temp.slice(0,7);
					adIndex++;
				}
			}
		}
	}


	return ads;*/
	return chrome.extension.getBackgroundPage().ads;
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

/* Function to cause all ads to pin when opened */
function prPinAllPanels(){
console.log("start of panel pin events");
window.addEventListener("load", prPin, false);
//parent.window.prAddEvent('pi',(function(z){prpc='1';
console.log("inside of PI event to pin");
};

/* ad highlighting function, c=color o=opacity*/
/*function prHighlight(bc,pc,o){
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
}*/

function getDomVariable (variable)
{
	addScript("var a = document.createElement('p'); a.id='"+variable+"Element'; a.style.display='none'; if(typeof("+variable+")!== 'undefined'){a.innerText="+variable+";}else{a.innerText='';}document.body.appendChild(a)");
	return document.getElementById("pridsElement").innerText;
}

/* Add JS function to parent page. Pass it the function, name of the function, and argument list as array. Currently only supports string arguments.*/
function addFunction (script, scriptName, args)
{
	addScript(script);
	var functionCall = scriptName + "(";
	if(typeof(args) !== "undefined")
	{
		for (i=0;i<args.length;i++)
		{
			functionCall += "'" + args[i] + "'";
			if (i<args.length-1)
			{
				functionCall += ",";
			}
		}
	}
	functionCall += ");"
	addScript(functionCall);
}


