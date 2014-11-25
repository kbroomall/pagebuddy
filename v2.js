

/*
//check to see if the loacation.href is the same as document.domain.  if yes green flag if no red flag.

function getDomains()
{
  var str1 = location.href.split('/')[2]
  var str2 = document.domain

    if(str1 == str2)
    {
        console.log("Domains Match")  
    }

    else
    {
        console.log("Domain Mismatch")  
    }
}


//check to see if the page secure?

function getSecure() {
if (location.protocol.toLowerCase().indexOf("https") >= 0) {
console.log("SSL Secure");
}else{
console.log("Not Secure");
}}
  
//check to see which version of flash is running:

navigator.plugins["Shockwave Flash"].description

