//writes PointRoll Page Buddy to top of page with line break
function writeTitle() {
    document.write("<table>", "<tr>", "<td>", "PointRoll PageBuddy v.09", "</td>", "</tr>", "</table>", "</br>");
}
writeTitle();

//check flash version and return to window
function getFlash() {
    var f = navigator.plugins["Shockwave Flash"].description;
    document.write("<table>", "<tr>", "<td>", "Flash Version:", "</td>", "<td>", f, "</td>", "</tr>", "</table>");
}
getFlash();

//checks to see if page is SSL compliant...
function getSecure() {
    if (location.protocol.toLowerCase().indexOf("https") >= 0) {
        document.write("<table>", "<tr>", "<td>", "Secure Protocol:", "</td>", "<td>", "Page Secure", "</td>", "</tr>", "</table>");
    } else {
        document.write("<table>", "<tr>", "<td>", "Secure Protocol:", "</td>", "<td>", "SSL Protocol not detected...", "</td>", "</tr>", "</table>");
    }
}
getSecure();

//check to see how many iframes exist on the page:
function getIframes() {
    var x = document.getElementsByTagName("iframe");
    document.write("<table>", "<tr>", "<td>", "Iframes on Page:", "</td>", "<td>", x.length, "</td>", "</tr>", "</table>");
}
getIframes();

//checks to see if location.href matches document.domain:
function getDomains() {
    var str1 = location.href.split('/')[2],
        str2 = document.domain;
    if (str1 == str2) {
        document.write("<table>", "<tr>", "<td>", "loc.href vs doc.dom:", "</td>", "<td>", "MATCH", "</td>", "</tr>", "</table>");
    } else {
        document.write("<table>", "<tr>", "<td>", "loc.href vs doc.dom:", "</td>", "<td>", "MISMATCH", "</td>", "</tr>", "</table>");
    }
}
getDomains();