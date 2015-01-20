# pagebuddy

PointRoll PageBuddy is a Chrome Extension that lists the PointRoll Placement ID of any PointRoll tags on a website and return them to a list in the app's popup, which deep links to PointRoll's AdPortal system.

The program scrapes calls to PointRoll in Chrome's network tab, and displays a shortened version which links directly to AdPortal.

This allows a user to quickly identify PointRoll tags on a page, and view their corresponding setup in the AdPortal system.

Other features include the ability to highlight any PointRoll banners on the page in Green while expanded Panels are highlighted in Red.

This allows a user to quickly ID which ads on the page are PointRoll ads, vs. other vendors.

Code Example:

popup.html is the popup display that you see from the extension shortcut.  
v1.js is where the JS that accesses the DOM lives and passes messages to content.js for display in popup.html.

Motivation

The motivation behind this project is to increase the effeciency in which PointRoll's Operations teams can provide support for clients with specific technical questions.  It allows Operations Team members to instantly identify PointRoll tags being served to the page and view those tags in the AdPortal system.

Installation

To install this extension, please clone the repository locally and follow the instructions under "Load the Extension" on the following page:


https://developer.chrome.com/extensions/getstarted

Testing:

You can use the following URL to test the highlighting and deep linking functionality:

http://goo.gl/RSlJiN

