/* ################################################### */
/*                                                     */
/*  TITLE:        GLOBAL.JS                            */
/*  VERSION:      0.58                                 */
/*  LAST UPDATED: 2012/01/06                           */
/*  UPDATED BY:   Rob Sable		                       */
/*                                                     */
/*  NAMESPACE: G  (. indicates public)                 */
/*                                                     */
/*  DEFINITIONS:                                       */
/*   .preloadImgs()                                    */
/*   .postloadImgs()                                   */
/*   .toggleImgs()                                     */
/*    trackedEvents()                                  */
/*                                                     */
/*  FUNCTIONS:                                         */
/*   .prepSearchForm()                                 */
/*   .outputDebug()                                    */
/*   .out()                                            */
/*   .outB()                                           */
/*   .navTo()                                          */
/*   .doPixelTracking()                                */
/*   .setMostPopularFilter()                           */
/*   .setupTrafficMapSelector()                        */
/*   .showLogin()                                      */
/*                                                     */
/*  PREREQUISTES:                                      */
/*    utils.js                                         */
/*      U.preloadImgs                                  */
/*      U.loadImg                                      */
/*      U.postloadImgs                                 */
/*      U.toggleImgs                                   */
/*      U.toggleImg                                    */
/*      U.isDomBrowser                                 */
/*      U.$                                            */
/*      U.doLoadImages                                 */
/*      U.addEvent                                     */
/*      U.doDoLoadImages                               */
/*      U.insertAfter                                  */
/*      U.isNotNull                                    */ 
/*      U.getQueryParam                                */ 
/*    nbc_user_overlay.js                              */
/*      NBC_UserOverlay.showLogin                      */
/*      NBC_UserOverlay.calcHeight                     */
/*      NBC_UserOverlay.calcWidth                      */
/*    file: nbc_traffic_config_[siteKey].js            */ 
/*                                                     */
/* ################################################### */

(function() {

if(!window.G) {
  window['G'] = {};
}

  // preloadImgs definition  // needs refactoring
preloadImgs = (
  new U.loadImg("NBC_main_v6_A-1.jpg"),
  new U.loadImg("btn_go_v2.gif"),
  new U.loadImg("nbc_share_your_mood.gif"),
  new U.loadImg("twitter.gif"),
  new U.loadImg("facebook.gif")
);
window['G']['preloadImgs'] = preloadImgs;

  // postloadImgs definition  // needs refactoring
postloadImgs = (
  new U.loadImg("btn_go_h_v2.gif"),
  new U.loadImg("nbc_mood_checked_bored.gif"),
  new U.loadImg("nbc_mood_checked_furious.gif"),
  new U.loadImg("nbc_mood_checked_sad.gif"),
  new U.loadImg("nbc_mood_checked_intrigued.gif"),
  new U.loadImg("nbc_mood_checked_laughing.gif"),
  new U.loadImg("nbc_mood_checked_thrilled.gif")
);
window['G']['postloadImgs'] = postloadImgs;

  // toggleImgs definition.  Use toggle button css id as the array identifier when adding to this array
U.toggleImgs["searchSubmit"] = new U.toggleImg("btn_go_v2.gif","btn_go_h_v2.gif");

  // flag used by doPixeltracking to make sure momentStarted is not counted more than once per page
var momentStarted = false;
  // flag used by doPixeltracking to make sure commentStarted is not counted more than once per page
var commentStarted = false;
  // flag used by doPixeltracking to make sure mood flash clicks are not counted more than once per page
var moodFlashClicked = false;

  // behaviors for search form
function prepSearchForm() {
  var keyPressed = false;
  if (U.isDomBrowser) {
    if (U.$("searchForm")) {
      var searchForm = U.$("searchForm");
      var searchText = U.$("searchText");
      searchText.onfocus = function() {
        if (this.value=='Search') {
          this.value='';
        }
      }
      searchText.onkeypress = function(e) {
      keyPressed = true;
        if (U.enterKeyPressed(e)) {
          searchForm.submit();
        }
      }
      searchForm.onsubmit = function() {
        if (searchText.value == "Search" && !keyPressed) {
          searchText.value='';
        }
      }
      U.$("searchSubmit").onmouseover = function() {
        this.src = U.imagePath + U.toggleImgs["searchSubmit"]["hoverImg"];
      }
      U.$("searchSubmit").onmouseout = function() {
        this.src = U.imagePath + U.toggleImgs["searchSubmit"]["defaultImg"];
      }
    }
    return true;
  }
  return false;
}
window['G']['prepSearchForm'] = prepSearchForm;

  // writes debug information to screen.  Outputs the msg param to the div matching with the id in the divID param
function outputDebug(msg, divID) {
  if (U.$(divID)) {
    var parentNode = U.$(divID);
    if (!U.$("debug")) {
      var div = document.createElement("div");
      div.setAttribute("id","debug");
      U.insertAfter(div, parentNode);
    }
    var d = U.$("debug");
    var p = document.createElement("p");
    p.innerHTML = msg;
    d.appendChild(p);
  }
}
window['G']['outputDebug'] = outputDebug;

  // writes debug information to screen.  Outputs the msg param to a new div that is created as the child of the body
function out(msg) {
  if (!U.$("debug")) {
    var parentNode = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("id","debug");
    parentNode.appendChild(div);
  }
  var d = U.$("debug");
  var p = document.createElement("p");
  p.innerHTML = msg;
  d.appendChild(p);
}
window['G']['out'] = out;

// writes debug information to screen.  Outputs the msg param to a new div that is created as the child of the body
function outB(msg) {
  if (!U.$("debugB")) {
    var parentNode = document.getElementsByTagName("body")[0];
    var div = document.createElement("div");
    div.setAttribute("id","debugB");
    parentNode.appendChild(div);
  }
  var d = U.$("debugB");
  var p = document.createElement("p");
  p.innerHTML = msg;
  d.appendChild(p);
}
window['G']['outB'] = outB;

function navTo(nextURL) {
  document.location.replace(nextURL);
}
window['G']['navTo'] = navTo;

  // trackedEvents definition
var trackedEvents = new Array();
trackedEvents[5]  = "Mood Header Clicks";
trackedEvents[6]  = "Page Count";
trackedEvents[7]  = "Mood Module (dropdown)";
trackedEvents[8]  = "Mood Comments (radio buttons)";
trackedEvents[9]  = "Subnav Tracking";
trackedEvents[10] = "Mood Hover Click";
trackedEvents[11] = "Traffic Route Submit";
trackedEvents[12] = "Traffic Route Save";
trackedEvents[13] = "Traffic Saved Route Click";
trackedEvents[16] = "Facebook Registration Update Completes";
trackedEvents[19] = "Content Group";
trackedEvents[30] = "Full Page Slideshow Auto Next";
trackedEvents[32] = "Submission Complete For Anonymous";
trackedEvents[35] = "Submission Start";
trackedEvents[36] = "Submission Complete";
trackedEvents[37] = "Submission Cancel";
trackedEvents[44] = "Show Articles";
trackedEvents[45] = "Show Videos";
trackedEvents[46] = "Show Galleries";
trackedEvents[51] = "Slideshow Tracker";
trackedEvents[52] = "MediaViewer Timeline Clicks";
trackedEvents[53] = "MediaViewer Top Story Clicks";
trackedEvents[54] = "MediaViewer Full Story Clickthrus";
trackedEvents[57] = "MediaViewer Next Story Clicks";
trackedEvents[58] = "MediaViewer Previous Story Clicks";
trackedEvents[59] = "MediaViewer Most Commented Button Clicks";
trackedEvents[60] = "MediaViewer List View Clicks";
trackedEvents[61] = "MediaViewer Next Page Clicks";
trackedEvents[62] = "MediaViewer Previous Page Clicks";
trackedEvents[63] = "MV Most Viewed Button Clicks";
trackedEvents[64] = "MV Most Viewed Item 1";
trackedEvents[65] = "MV Most Viewed Item 2";
trackedEvents[66] = "MV Most Viewed Item 3";
trackedEvents[67] = "MV Most Viewed Item 4";
trackedEvents[68] = "MV Most Viewed Item 5";
trackedEvents[69] = "MV Most Viewed Item 6";
trackedEvents[70] = "MV Most Viewed Item 7";
trackedEvents[71] = "MV Most Viewed Item 8";
trackedEvents[72] = "MV Most Commented Item 1";
trackedEvents[73] = "MV Most Commented Item 2";
trackedEvents[74] = "MV Most Commented Item 3";
trackedEvents[75] = "MV Most Commented Item 4";
trackedEvents[76] = "MV Most Commented Item 5";
trackedEvents[77] = "MV Most Commented Item 6";
trackedEvents[78] = "MV Most Commented Item 7";
trackedEvents[79] = "MV Most Commented Item 8";
  // faked events
trackedEvents[80] = "NBC Registration";
trackedEvents[81] = "Registration Cancellations";
trackedEvents[82] = "Facebook Registration";
trackedEvents[83] = "Lead Image Click";
trackedEvents[84] = "Slideshow Tracker Autoplay";
trackedEvents[85] = "Inline Slideshow Tracker";
trackedEvents[90] = "Share Options";

  // fetches an image with a query string that helps us track user events and learn how to make a better site
  // if forwardToUrl is specified, waits till the pixel is loaded and forwards to the url
  // added section name for registration fired for header, comments, moments and etc.
  // sectionForFacebookRegstr, sectionForNBCRegistr, sectionForRegstrCancel are needed to set to 1 for registration tracking

function doPixelTracking(eventNumber, doPageRefresh, forwardToUrl, firedPlace, sectionForFacebookRegstr, sectionForNBCRegistr, sectionForRegstrCancel, moodUserVote) {
    // this allows the doPageRefresh param to be optional / undefined
    // doPageRefresh is no longer used by the code, but it's still here.
  if(!doPageRefresh) {
    doPageRefresh = false;
  }
  var _srcURL = "";
  var _reportSuiteID = "";
  var _pe  = "";                  // Link out. Example: "lnk_o".  Not used for Slideshows
  var _siteName = s.prop10;       // Site name in English. Example: "NBC%20San%20Diego".  Same value as _c10 (below).
  var _ch = "&ch=" + s.channel;   // Channel / Section. Example: "news".
  var _hostname = "&server=" + window.location.hostname; // Server Hostname. Example: "www.nbcsandiego.com".
  var _pageName = "";             // Document.title for slideshows, or event name for any others. Example: "The%20Obamas%27%20Trip%20to%20Europe%20in%20Photos" or "Media%20Viewer%20Next%20Page%20Click".
  var _eventNumber = "";          // The event number passed in as first param, with some additional info appended later
  var _c3  = "";                  // Content Type. Example: "Gallery". Same value as _v3
  var _c4  = "&c4="  + s.prop4;   // Sub-Section. Example: "local".
  var _c6  = "&c6="  + location.href;       // Current URL
  var _c7  = "&c7="  + s.prop7;   // Content Source. Example: "Uncategorized"
  var _c8  = "&c8="  + s.prop8;   // Not sure. Example: "nbc".
  var _c9  = "&c9="  + s.prop9;   // Station Call Letters. Example: "KNSD".
  var _c10 = "&c10=" + s.prop10;  // Site name in English. Example: "NBC%20San%20Diego". Same as _sitename
  var _c13 = "&c13=" + s.prop13;  // New or return visitor
  var _c15 = "";                  // Subnav Tracking
  var _c20 = "";                  // Market Type
  var _c19 = "&c19=" + s.prop19;  // Franchise Content Group
  var _c22 = "&c22=" + s.prop22;  // Feature Content Group
  var _c26 = "";
  var _c30 = "";                  // Page mood status.  Example: "furious".  From s.eVar30. Equal to _v24 but used sometimes instead.
  var _c31 = "";                  // Registration type
  var _c39 = "";                  // Get gallery type exe. full page, embedded or lead image
  var _c41 = s.prop41;
  var _v1  = "";                  // Identifies whether user is registered, non-registered, or facebook-registered
  var _v2  = "";                  // eVar for traffic routes.
  var _v3  = "";                  // Content Type. Example: "Gallery". Same value as _c3 (above).
  var _v11 = "";                  // Tracks Facebook registration event
  var _v12 = "";                  // Tracks NBC registration event
  var _v13 = "";                  // Registration cancellation event
  var _v16 = "";                  // share method
  var _v19 = "&v19=" + s.prop19;  // Feature Content Group
  var _v22 = "&v22=" + s.prop22;  // Franchise Content Group
  var _v24 = "";                  // Page mood status.  Example: "furious".  From s.eVar30. 
  var _v28 = "";                  // User-selected mood.  Example: "furious".  From nbc.omniture.userVote.
  var _v29 = "";                  // Content Type
  var _v31 = "";                  // Mood header status.  Example: "furious"
  var _v32 = "";                  // Moment category.  Example: "check it"
  var _v34 = "";                  // Get age on login
  var _v35 = "";                  // Get gender on login
  var _v39 = "";                 // Get gallery type exe. full page, embedded or lead image
  var _v41 = s.prop41;
  var _trackingForRegstr = "";    // If registration initiated, tracks whether NBC Reg successful, Facebook Reg successful, or User cancellation
  var _randomValue = "&rndm=" + Math.random()*10000000000000000;
  var doNothing = false;          // used to handle muiltiple clicks
  var _contentType = "";			 // is it a feature of franchise?

  //check to see if it's a franchise or a feature
  if(_c22 != "&c22=undefined" && s.channel != "blog") {
	var _contentType = "feature"
  }
  else if(_c19 != "&c19=undefined" && s.channel == "blog") {
	var _contentType = "franchise";
  }

  if(typeof s_account == 'undefined' || typeof s.prop10 == 'undefined' || typeof trackedEvents[eventNumber] == 'undefined') {
      // still need to forward
    if(U.isNotNull(forwardToUrl)) {
      document.location = forwardToUrl;
    }
      // alert("test");
    return false;
  }
  else {
      // put prarams that are globally necessary here
    _eventNumber = "event" + eventNumber; // later sometimes overwritten
    
    var envParam = nbc.env; 
    if(nbc.section == "feast") // $o_currentSectionName defined in nbc_get_section_subsection_names
    {
      if ((envParam != "dev.")  && (envParam != "stage.")) {
          _reportSuiteID =s_account+",nbculimfeastprod";
       _c20 = "&c20=Feast";
      } 
     else {
          _reportSuiteID =s_account+",nbculimfeastdev";
      _c20 = "&c20=Feast-Dev";
    }
    }
    else {
    _reportSuiteID = s_account; // later overwritten if the event is not one of the ones specifically handled below.
    }
      // slideshow and section page subNav clicks (count as new page view)
    if( eventNumber == 9 || eventNumber == 11 || eventNumber == 12 || eventNumber == 13 || eventNumber == 30 || eventNumber == 51 || eventNumber == 84 || eventNumber == 85 ) {
      if(eventNumber == 9) { // subnav
    	_c3 = "&c3=Gallery";
        _c4  = "&c4=" + subSection;
        _c15 = "&c15=D%3dch%2b%22%7c%22%2bc4";
        _v3 = "&v3=D%3dc3";
        _c26 = "&c26=D=g";
        
        _eventNumber = "event" + eventNumber + ",event6";  // event 6 records a page view
        _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      }
      else if(eventNumber == 11 || eventNumber == 13) { // traffic
        _v2  = "&v2=Traffic";
        _eventNumber = "event" + eventNumber + ",event6";  // event 6 records a page view
        _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      }
      else if(eventNumber == 12) { // traffic
        _v2  = "&v2=Traffic";
        _eventNumber = "event" + eventNumber;
        _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      }
      else if(eventNumber == 30) {  // auto next slideshow
        _c4  = "&c4=" + subSection;
        _c15 = "&c15=D%3dch%2b%22%7c%22%2bc4";
        _eventNumber = "event" + eventNumber;
        _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      }
      else if(eventNumber == 51 || eventNumber == 84 || eventNumber == 85) { // slideshow
        U.log("in event cond for 85");
      if(nbc.omniture.pageType == "home") {
    	  _c26 = "&c26=D=g";
          _c4 = "&c4=multimedia_home";
          _ch = "&ch=multimedia_home";
          }
        _c3 = "&c3=Gallery";
        _c30 = "&c30=" + s.eVar30;
        _eventNumber = "event" + eventNumber + ",event6";  // event 6 records a page view
        if ( eventNumber == 85 ) {
          if(nbc.section == "feast") {
            nbcSlideshowTitle = nbc.gallery.title;
          }
        }
        if( typeof nbcSlideshowTitle != "undefined" ) { // for embedded slideshows
          _pageName = nbcSlideshowTitle;
          _c3  = "&c3=Gallery";
          _c39 = "&c39=Embedded";
          _v39 = "&v39=D%3dc39";
          if ( eventNumber == 85 ) {    // for feast blog slideshows            
              _c39 = "&c39=Inline";
            }  
        }
        else { // for full-page slideshows
          _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
          _c3 = "&c3=Gallery";
          _c39 = "&c39=Full%20Page";
            if (U.getQueryParam("ssAuto") == "true") {
              if (U.readCookie('finalSlide') == "true") {
                _eventNumber =  _eventNumber + ",event30";
                U.createCookie("finalSlide", "false", 365);
              }
            }
          _v39 = "&v39=D%3dc39";
        }
        
        if(eventNumber == 84) { 
          _c39 = _c39 +"-Autoplay";
        }
        
      }
      _v1  = "&v1="  + s.eVar1;
      _v34 = "&v34=" + s.eVar34;
      _v35 = "&v35=" + s.eVar35;
      _v41 = "&v41=" + s.eVar41;
      _c41 = "&c41=" + s.eVar41;
      if(_pageName.match('|')) { // only use that part of the title before any pipe
        _pageName = _pageName.split('|')[0];
      }
    }
      // registration
    else if(firedPlace || eventNumber == 16) {
      _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      if(_pageName.match('|')) { // only use that part of the title before any pipe
        _pageName = _pageName.split('|')[0];
      }
    }
      // mood header click
    else if(eventNumber == 5) {
      if(moodFlashClicked) { // make sure mood flash has not already been recorded
        doNothing = true;
      }
      else {
        moodFlashClicked = true;
        _v3  = "&v3="  + s.prop3;
        _v31 = "&v31=" + nbcHeaderMood;
        _eventNumber = "event" + eventNumber; 
        _pageName = nbcHeaderStoryTitle.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace // note pageName is collected from a js var -- different here than elsewhere
        if(_pageName.match('|')) { // only use that part of the title before any pipe
          _pageName = _pageName.split('|')[0];
        }
      }
    }
      // mood module
    else if(eventNumber == 7 || eventNumber == 8 || eventNumber == 10) {
      _v1  = "&v1="  + s.eVar1;
      _v3  = "&v3="  + s.prop3;
      _v24 = "&v24=" + s.eVar30;
      _v28 = "&v28=" + nbc.omniture.userVote;
      _eventNumber = "event" + eventNumber + ",event36"; 
      _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      if(_pageName.match('|')) { // only use that part of the title before any pipe
        _pageName = _pageName.split('|')[0];
      }
    }
      // moment and comment submission
    else if(eventNumber == 32 || eventNumber == 35 || eventNumber == 36 || eventNumber == 37) {
      if(eventNumber == 35 && nbc.submissionType == "moment") {
        if(momentStarted) { // make sure moment started has not already been recorded
          return false;
        }
        else {
          momentStarted = true;
        }
      }
      else if(eventNumber == 35 && nbc.submissionType == "comment") {
        U.log(commentStarted);
        if(commentStarted) { // make sure comment started has not already been recorded
          return false;
        }
        else {
          commentStarted = true;
        }
      }
      if(eventNumber == 37 && nbc.submissionType == "moment") { // reset moment started flag
        momentStarted = false;
      }
        // post as anonymous
      if(eventNumber == 32) {
       _eventNumber = "event" + eventNumber + ",event36"; 
      }
      _v1 = "&v1=" + s.eVar1;
      _v3 = "&v3=" + s.prop3;
      if(nbc.submissionType == "moment") {
        _v32 = "&v32=Moment";
      }
      else if(nbc.submissionType == "comment") {
        _v24 = "&v24=" + s.eVar30;
        _v29 = "&v29=" + s.prop3;
      }
      _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      if(_pageName.match('|')) { // only use that part of the title before any pipe
        _pageName = _pageName.split('|')[0];
      }
    }
      // Lead Image CLick
    else if(eventNumber == 83) {
      _c39 = "&c39=Lead%20Image";
      _v39 = "&v39=D%3dc39";
    }
   
    
      // share options
    else if(eventNumber == 90) {
      _v3  = "&v3="  + s.prop3;
      _v16 = "&v16=" + nbc.omniture.shareOption;
      _v24 = "&v24=" + s.eVar30;
      _eventNumber = "";
      _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
      if(_pageName.match('|')) { // only use that part of the title before any pipe
        _pageName = _pageName.split('|')[0];
      }
    }
      // everything other than slideshows, subnav, traffic, registration, mood header, mood module, and submission clicks.
      // Includes linkout, but no _c or _v props.  Also handles _reportSuiteID differently.
    else {
      var tokens =  s_account.split(",");
      _reportSuiteID = tokens[tokens.length-1];
      _pe = "pe=lnk_o&";
      _pageName = trackedEvents[eventNumber];
    }
  }
  if(!doNothing) {
    if(firedPlace) { // tracking for registration
      if(sectionForFacebookRegstr) {
        _v11 = sectionForFacebookRegstr;
        _c31 = "&c31=Facebook"
        _trackingForRegstr = "&v11=" + firedPlace;
      }
      if(sectionForNBCRegistr) {
        _v12 = sectionForNBCRegistr;
        _c31 = "&c31=NBC"
        _trackingForRegstr = "&v12=" + firedPlace;
      }
      if(sectionForRegstrCancel) {
        _v13 = sectionForRegstrCancel;
        _trackingForRegstr = "&v13=" + firedPlace;
      }
    }
    else {
     _trackingForRegstr = "";
    }
    var encodedSpecChars = escape(_pageName);
      U.log("type is undefined "+encodedSpecChars);
    _pageName = encodedSpecChars;
    
    //don't want to pass value for franchise or features if they are not there
    if(_contentType == "feature") {
    	_srcURL = U.charEncodeSpaces("http://oimg.nbcuni.com/b/ss/" + _reportSuiteID + "/1/H.-2pdv-2/s16571644299919?" + _pe + "pev2=" + _siteName + _ch + _hostname + "&pageName=" + _pageName + _c3 + "&events=" + _eventNumber + _c4 + _c6 + _c7 + _c8 + _c9 + _c10 + _c13 + _c15 + _c20 + _c22 + _c26 + _c30 + _c31 + _c39 + _c41 + _v1 + _v2 + _v3 + _v16 + _v19 + _v22 + _v24 + _v28 + _v29 + _v31 + _v32 + _v34 + _v35 + _v39 + _v41 +  _trackingForRegstr + _randomValue);	
    	U.log("feature is:" + _c22);
    }
    else if(_contentType == "franchise") {
    	_srcURL = U.charEncodeSpaces("http://oimg.nbcuni.com/b/ss/" + _reportSuiteID + "/1/H.-2pdv-2/s16571644299919?" + _pe + "pev2=" + _siteName + _ch + _hostname + "&pageName=" + _pageName + _c3 + "&events=" + _eventNumber + _c4 + _c6 + _c7 + _c8 + _c9 + _c10 + _c13 + _c15 + _c19 + _c20 + _c26+ _c30 + _c31 + _c39 + _c41 + _v1 + _v2 + _v3 + _v16 + _v19 + _v24 + _v28 + _v29 + _v31 + _v32 + _v34 + _v35 + _v39 + _v41 +  _trackingForRegstr + _randomValue);
    	U.log("franchise is:" + _c19);
    }
    else{
    	_srcURL = U.charEncodeSpaces("http://oimg.nbcuni.com/b/ss/" + _reportSuiteID + "/1/H.-2pdv-2/s16571644299919?" + _pe + "pev2=" + _siteName + _ch + _hostname + "&pageName=" + _pageName + _c3 + "&events=" + _eventNumber + _c4 + _c6 + _c7 + _c8 + _c9 + _c10 + _c13 + _c15 + _c20 + _c26+ _c30 + _c31 + _c39 + _c41 + _v1 + _v2 + _v3 + _v16 + _v24 + _v28 + _v29 + _v31 + _v32 + _v34 + _v35 + _v39 + _v41 +  _trackingForRegstr + _randomValue);
    	U.log("not a feature or franchise...")
    }
    
    
    U.log(_srcURL);
    var img = new Image();
    if(U.isNotNull(forwardToUrl)) {
      img.onload = function() {
        document.location = forwardToUrl;
      }
    }
    img.src = _srcURL;
  }
}
window['G']['doPixelTracking'] = doPixelTracking;

function doVideoPixelTracking(omnitVideoURL) {

U.log(omnitVideoURL);

var omnitUrl = omnitVideoURL; 
var _srcURL = "";
_srcURL = U.charEncodeSpaces(omnitUrl);
U.log(_srcURL);
var img = new Image();
img.src = _srcURL;
}
window['G']['doVideoPixelTracking'] = doVideoPixelTracking;

  // uses U.setClass to update the class of the mostPopularItems and mostPopularLists nodes
function setMostPopularFilter(cssClass) {
  U.setClass('mostPopularFilterer',cssClass);
  U.setClass('mostPopularLists',cssClass);
}
window['G']['setMostPopularFilter'] = setMostPopularFilter;

function setupTrafficMapSelector() {
  if(U.$("traffic_selector")) {
    var mapID = "";
    var selectHTML;
    var optionHTML;
    var selected;
    var parent = U.$("traffic_selector");
    if (U.getQueryParam("map")) {
      mapID = U.getQueryParam("map");
    }
    selectHTML = "<select id=\"trafficMapSelector\"><option value=\"0\">SEE TRAFFIC ON YOUR ROUTE</option>";
    if (TrafficConfig.mapCenters.length > 0) {
      for( i=0; i<TrafficConfig.mapCenters.length; i++) { // mapCenters defined in nbc_traffic_config_[siteKey].js
        selected = "";
        if (i == parseInt(mapID)) {
          selected = " selected";
        }
        optionHTML = "<option value=\"" + i + "\"" + selected + ">" + TrafficConfig.mapCenters[i].name + "</option>";
        selectHTML += optionHTML;
      }
    }
    selectHTML += "</select>";
    parent.innerHTML = selectHTML;
    U.$("trafficMapSelector").onchange = function() {
      var mapIdx = this.value;
      if (U.isNotNull(mapIdx)) {
        window.location = "/traffic/?map=" + mapIdx + "&lat=" + TrafficConfig.mapCenters[mapIdx].lat + "&long=" + TrafficConfig.mapCenters[mapIdx].long + "&zoom=" + TrafficConfig.mapCenters[mapIdx].zoom;
      }
    };
  }
}
window['G']['setupTrafficMapSelector'] = setupTrafficMapSelector;

function positionLogin(o) {
    var canvas = document.getElementById("canvas");
    var leftPos = U.getPosition(o).x - U.getPosition(canvas).x;
    leftPos = leftPos/2;
    var getY = U.getPosition(o).y;
    jQuery("#overlay_wrapper").css("top",getY);
    jQuery("#overlay_wrapper").css("left", leftPos);
    jQuery("#overlay_wrapper").css("position","absolute");
}
window['G']['positionLogin'] = positionLogin;
function showLogin() {
    //out("enter G.showLogin()");
  NBC_UserOverlay.showLogin();
  NBC_UserOverlay.calcHeight("overlay_wrapper"); // it would be better if these two lines were handled by NBC_UserOverlay so
  NBC_UserOverlay.calcWidth("overlay_wrapper");  // showLogin() could be called in one line and we could do away with this function
    //out("exit G.showLogin()");
}
window['G']['showLogin'] = showLogin;

})();

  // load image(s) before window.onload
U.doLoadImages(G.preloadImgs);

$(document).ready( function() {
  U.doLoadImages(G.postloadImgs);
});
 
