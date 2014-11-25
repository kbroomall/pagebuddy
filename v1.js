function writeTitle() {
	document.write("<table>");
    document.write("<tr>");
    document.write("<td>");
	document.write("PointRoll PageBuddy v.09");
	document.write("</td>");
    document.write("</tr>");
    document.write("</table>");
	document.write("</br>");
}
writeTitle();

//check flash version and return to window
function getFlash() {
var f = navigator.plugins["Shockwave Flash"].description;
	document.write("<table>");
    document.write("<tr>");
    document.write("<td>");
	document.write("Flash Version:");
	document.write("</td>");
	document.write("<td>");
	document.write(f);
	document.write("</td>");
    document.write("</tr>");
    document.write("</table>");
}
getFlash();

function getSecure() {
if (location.protocol.toLowerCase().indexOf("https") >= 0) {
	document.write("<table>");
    document.write("<tr>");
    document.write("<td>");
	document.write("Secure Protocol:");
	document.write("</td>");
	document.write("<td>");
	document.write("Page Secure");
	document.write("</td>");
    document.write("</tr>");
    document.write("</table>");
}else{
	document.write("<table>");
    document.write("<tr>");
    document.write("<td>");
	document.write("Secure Protocol:");
	document.write("</td>");
	document.write("<td>");
	document.write("No SSL protocol detected...");
	document.write("</td>");
    document.write("</tr>");
    document.write("</table>");
}}
getSecure();
  
//check to see how many iframes exist on the page:
function getIframes() {
    var x = document.getElementsByTagName("iframe");
	document.write("<table>");
    document.write("<tr>");
    document.write("<td>");
	document.write("Iframes on Page:");
	document.write("</td>");
	document.write("<td>");
	document.write(x.length);
	document.write("</td>");
    document.write("</tr>");
    document.write("</table>");
}
getIframes(); 
