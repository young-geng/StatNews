/* ################################################################# */
/*                                                                   */
/*  TITLE:        UTILS.JS                                           */
/*  SITE:         nbcnewyork.com                                     */
/*  VERSION:      0.24                                               */
/*  AUTHOR:       Brian Maniere                                      */
/*  LAST UPDATED: 2010/02/01                                         */
/*  UPDATED BY:   Brian Maniere                                      */
/*  @release lists brian                                             */
/*                                                                   */
/*  NAMESPACE: U                                                     */
/*                                                                   */
/*  PUBLIC DEFINITIONS:                                              */
/*    imagePath                                                      */
/*                                                                   */
/*  PUBLIC CONSTRUCTORS:                                             */
/*    preloadImgs                                                    */
/*    postloadImgs                                                   */
/*    toggleImgs                                                     */
/*    loadImg()                                                      */
/*    toggleImg()                                                    */
/*                                                                   */
/*  PUBLIC FUNCTIONS:                                                */
/*    isDomBrowser()                                                 */
/*    $()                                                            */
/*    addEvent()                                                     */
/*    removeEvent()                                                  */
/*    getElementsByClassName()                                       */
/*    getElementsIncludeClassName()                                  */
/*    toggleDisplay()                                                */
/*    setClass()                                                     */
/*    toggleClass()                                                  */
/*    swapClass()                                                    */
/*    outputHTML()                                                   */
/*    insertAfter()                                                  */
/*    removeChildren()                                               */
/*    prependChild()                                                 */
/*    randomizeArray()                                               */
/*    getMaxValueInArray()                                           */
/*    getQueryParam()                                                */
/*    preloadImage()                                                 */
/*    doLoadImages()                                                 */
/*    doDoLoadImages()                                               */
/*    parseAndExecuteScripts()                                       */
/*    enterKeyPressed()                                              */
/*    charEncodeSpaces()                                             */
/*    truncatedString()                                              */
/*    trim()                                                         */
/*    ltrim()                                                        */
/*    rtrim()                                                        */
/*    createCookie()                                                 */
/*    readCookie()                                                   */
/*    manageCookie()                                                 */
/*    eraseCookie()                                                  */
/*    isNull()                                                       */
/*    isNotNull()                                                    */
/*    log()                                                          */
/*    warn()                                                         */
/*    error()                                                        */
/*    isOpera()                                                      */
/*    isSafari()                                                     */
/*    isKDE()                                                        */
/*    isGecko()                                                      */
/*    isNN4()                                                        */
/*    isWinIE()                                                      */
/*    isMac()                                                        */
/*    getPosition()                                                  */
/*                                                                   */
/*  PRIVATE OBJECTS:                                                 */
/*    Navigator                                                      */
/*                                                                   */
/* ################################################################# */

/* Some of these functions were derived and adapted from the books:
 * Advanced DOM Scripting, Jeffrey Sambells, 2007 Friends of Ed
 * JavaScript: The Definitive Guide, 5th Edition, David Flanagan, 2006 O'Reilly Media, Inc.
 * Most are home-baked
 */
 
(function() {

if(!window.U) {
  window['U'] = {};
}

  // preloadImgs definition
var imagePath = nbc.mediaDomain + "/designimages/";
window['U']['imagePath'] = imagePath;

  // preloadImgs constructor
var preloadImgs = new Array();
window['U']['preloadImgs'] = preloadImgs;

  // postloadImgs constructor
var postloadImgs = new Array();
window['U']['postloadImgs'] = postloadImgs;

  // toggleImgs constructor
var toggleImgs = new Array();
window['U']['toggleImgs'] = toggleImgs;

  // loadImg constructor
function loadImg(file) {
  this.file = file;
  return this;
}
window['U']['loadImg'] = loadImg;

  // toggleImg constructor
function toggleImg(defaultImg, hoverImg) {
  this.defaultImg = defaultImg;
  this.hoverImg = hoverImg;
  return this;
}
window['U']['toggleImg'] = toggleImg;

function isDomBrowser(other) {
  if(other === false
    || !Array.prototype.push
    || !Object.hasOwnProperty
    || !document.createElement
    || !document.getElementsByTagName
    ) {
    return false;
  }
  return true;
}
window['U']['isDomBrowser'] = isDomBrowser;

function $() {
  var elements = new Array();
  for (var i=0; i< arguments.length; i++) {
    var element = arguments[i];
    if(typeof element == 'string') {
      element = document.getElementById(element);
    }
    if(arguments.length == 1) {
      return element;
    }
    elements.push(element);
  }
  return elements;
};
window['U']['$'] = $;

function addEvent(node, type, listener) {
  if(!isDomBrowser()) { return false; }
  if(!(node == $(node))) { return false; }
    // try it via the W3C standard
  if(node.addEventListener) {
    node.addEventListener(type, listener, false);
    return true;
  }
    // otherwise try the IE method
  else if(node.attachEvent) {
    node['e'+type+listener] = listener;
    node[type+listener] = function() {
      node['e'+type+listener](window.event);
    }
    node.attachEvent('on'+type, node[type+listener]);
    return true;
  }
    // if both fail
  return false;
};
window['U']['addEvent'] = addEvent;

function removeEvent(node, type, listener) {
  if(!(node == $(node))) { return false; }
    // try it via the W3C standard
  if(node.removeEventListener) {
    node.removeEventListener(type,listener,false);
    return true;
  }
    // otherwise try the IE method
  else if (node.detachEvent) {
    node.detachEvent('on'+type, node[type+listener]);
    node[type+listener] = null;
    return true;
  }
    // if both fail
  return false;
};
window['U']['removeEvent'] = removeEvent;

function getElementsByClassName(cssClass, tag, parent) { // parent must be a DOM node and is optional
     //G.outB("enter U.getElementsByClassName; cssClass: " + cssClass + "; tag: " + tag + "; parent: " + parent);
    // locate all matching tags
  if( isNull(parent) ) {
    parent = document;
  }
  var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
  var matchingElements = new Array();
  cssClass = cssClass.replace(/\-/g, "\\-");
  var regex = new RegExp("(^|\\s)" + cssClass + "(\\s|$)");
  var element;
  for(var i=0; i<allTags.length; i++) {
    element = allTags[i];
    if(regex.test(element.className)) {
      matchingElements.push(element);
    }
  }
     //G.outB("exit U.getElementsByClassName; matchingElements.length: " + matchingElements.length);
  return matchingElements;
};
window['U']['getElementsByClassName'] = getElementsByClassName;

function getElementsIncludeClassName(cssClass, tag, parent) { // parent must be a DOM node and is optional
    // G.outB("enter U.getElementsIncludeClassName; cssClass: " + cssClass + "; tag: " + tag + "; parent: " + parent);
    // locate all matching tags
  if( isNull(parent) ) {
    parent = document;
  }
  var allTags = (tag == '*' && parent.all) ? parent.all : parent.getElementsByTagName(tag);
  var matchingElements = new Array();
  var element;
  for(var i=0; i<allTags.length; i++) {
    element = allTags[i];
      // G.outB("U.getElementsIncludeClassName; element.className: " + element.className);
    if(element.className.indexOf(cssClass) != -1) {
        // G.outB("U.getElementsIncludeClassName; match!");
      matchingElements.push(element);
    }
  }
    // G.outB("getElementsIncludeClassName; matchingElements.length: " + matchingElements.length);
  return matchingElements;
};
window['U']['getElementsIncludeClassName'] = getElementsIncludeClassName;

function toggleDisplay(node, value) {
  if(!(node == $(node))) { return false; }
  if(node.style.display != 'none') {
    node.style.display = 'none';
  }
  else {
    node.style.display = value || "";
  }
  return true;
};
window['U']['toggleDisplay'] = toggleDisplay;

  // sets the css class for a node of id nodeID.  Overwrites any preexisting classes.
function setClass(nodeID, cssClass) {
  if($(nodeID)) {
    $(nodeID).className = cssClass;
  }
  else {
    return false;
  }
}
window['U']['setClass'] = setClass;

   // adds nodeClass as a css class to node of id nodeID, or removes the class if it already exists
   // this works whether the css className is empty, singular, or contains multiple classes
function toggleClass(nodeID, nodeClass) {
  if(!$(nodeID)) { return false; }
  else {
    var node = $(nodeID);
    var currClass = node.className;
    if(currClass.length == 0) {
      node.className = nodeClass;
    }
    else {
      if(currClass.match(nodeClass)) {
        if (currClass.match(" ")) {
          currClass.charAt(currClass.indexOf(nodeClass)-1)==" " ? nodeClass = " " + nodeClass : nodeClass += " ";
        }
        var substrings = currClass.split(nodeClass);
        var newClass = ""
        for (var i=0; i<substrings.length; i++) {
          newClass += substrings[i];
        }
        node.className = newClass;
      }
      else {
        node.className = node.className + " " + nodeClass;
      }
    }
    return true;
  }
};
window['U']['toggleClass'] = toggleClass;

   // finds node of id nodeID and replaces oldclass with newclass.  Works on nodes with multiple classes.
function swapClass(nodeID, oldclass, newclass) {
    // when calling nodeID, oldclass, newclass be sure to use quotes as they are strings
  if(!isDomBrowser()) { return false; }
  if(!(node == $(node))) { return false; }
  var node = $(nodeID);
    // assumes oldclass exists, and newclass doesn't, otherwise it toggles both
  toggleClass(node,oldclass);
  toggleClass(node,newclass);
}
window['U']['swapClass'] = swapClass;

  // writes markup to screen within specified divID.  Used by Media Viewer.
function outputHTML(divID, markup) {
  if ($(divID)) {
    var targetNode = $(divID);
    targetNode.innerHTML = markup;
  }
}
window['U']['outputHTML'] = outputHTML;

function insertAfter(node, referenceNode) {
  if(!(node == $(node))) { return false; }
  if(!(referenceNode = $(referenceNode))) { return false; }
  return referenceNode.parentNode.insertBefore(node, referenceNode.nextSibling);
};
window['U']['insertAfter'] = insertAfter;

function removeChildren(parent) {
  if(!(parent == $(parent))) { return false; }
  while(parent.firstChild) {
    parent.firstChild.parentNode.removeChild(parent.firstChild);
  }
  return parent;
};
window['U']['removeChildren'] = removeChildren;

function prependChild(parent, newChild) {
  if(!(parent == $(parent))) { return false; }
  if(!(newChild == $(newChild))) { return false; }
  if(parent.firstChild) {
    parent.insertBefore(newChild,parent.firstChild);
  }
  else {
    parent.appendChild(newChild);
  }
    // return the parent again so you can chain the methods
  return parent;
};
window['U']['prependChild'] = prependChild;

function randomizeArray(array_in) {
  var i = array_in.length;
  if (i == 0) return false;
  while (--i) {
    var j = Math.floor(Math.random()*(i+1));
    var temp_i  = array_in[i];
    var temp_j  = array_in[j];
    array_in[i] = temp_j;
    array_in[j] = temp_i;
  }
};
window['U']['randomizeArray'] = randomizeArray;

function getMaxValueInArray(array_in) {
  if(array_in.length == 0) {
    return false;
  }
  var biggestYet = array_in[0];
  if( array_in.length > 1 ) {
    for( i=1; i<array_in.length; i++ ) {
      if( array_in[i] > biggestYet) {
        biggestYet = array_in[i];
      }
    }
  }
  return biggestYet;
}
window['U']['getMaxValueInArray'] = getMaxValueInArray;

function getQueryParam(param) {
  var q = document.location.search || document.location.hash;
  if(q) {
    var pairs = q.substring(1).split("&");
    for (var i=0; i < pairs.length; i++) {
      if (pairs[i].substring(0, pairs[i].indexOf("=")) == param) {
        return pairs[i].substring((pairs[i].indexOf("=")+1));
      }
    }
  }
}
window['U']['getQueryParam'] = getQueryParam;

  // very simple very easy
function preloadImage(imgUrl) {
  var img = new Image();
  img.src = imgUrl;
}
window['U']['preloadImage'] = preloadImage;

  // requires array parameter in expected format
function doLoadImages(arrImgs) {
  for(var i=0; i < arrImgs.length; i++) {
    var img = new Image();
    img.src = imagePath + arrImgs[i]["file"];
  }
}
window['U']['doLoadImages'] = doLoadImages;

  // let addLoadEvent to do its thing
function doDoLoadImages() {
  doLoadImages(U.postloadImgs);
}
window['U']['doDoLoadImages'] = doDoLoadImages;

  // finds any script blocks within text and executes them
  // outputs everything outside of script blocks
function parseAndExecuteScripts(src) {
  var source     = src;
  var arrScripts = new Array();
    // find script tags and parse out that which is between them
  while(source.indexOf("<script") > -1 || source.indexOf("</script") > -1) {
    var openScriptTagBegin  = source.indexOf("<script");
    var openScriptTagEnd    = source.indexOf(">", openScriptTagBegin);
    var closeScriptTagBegin = source.indexOf("</script", openScriptTagBegin);
    var closeScriptTagEnd   = source.indexOf(">", closeScriptTagBegin);
    arrScripts.push(source.substring(openScriptTagEnd + 1, closeScriptTagBegin));
    source = source.substring(0, openScriptTagBegin) + source.substring(closeScriptTagEnd + 1);
  }
    // Loop through each script and eval it
  for(var i=0; i<arrScripts.length; i++) {
    try {
      eval(arrScripts[i]);
    }
    catch(err) {
      U.log("error in U.parseAndExecuteScripts(): " + err);
    }
  }
    // Return the non-script source
  return source;
}
window['U']['parseAndExecuteScripts'] = parseAndExecuteScripts;

function enterKeyPressed(e) {
  var characterCode;
  if (e && e.which) { // for NN4
    characterCode = e.which; // character code is contained in NN4's which property
  }
  else { // for IE
    e = event;
    characterCode = e.keyCode;
  }
  if (characterCode == 13) { // ascii 13 == enter key
    return true;
  }   
  else{
    return false;
  }
}
window['U']['enterKeyPressed'] = enterKeyPressed;

function charEncodeSpaces(someText) {
  var encodedText = "";
  if (someText == "") return false;
  encodedText = someText.replace(/\s+/g,'%20');
  return encodedText;
};
window['U']['charEncodeSpaces'] = charEncodeSpaces;

  // truncates a string after a specified length and appends "..."
  // name should be changed to truncateString()
function truncatedString(_str, _maxLen) {
  var str       = _str;
  var maxLen    = _maxLen;
  var strLen    = str.length;
  var idxSpace  = 0;
  var curSubstr = "";
  var strTemp   = "";
  var output    = "";
  if(str.length <= maxLen) {
    return str;
  }
  else {
    do {
      idxSpace  = str.indexOf(" ");
      curSubstr = str.substring(0,idxSpace);
      strTemp   = strTemp + curSubstr + " ";
      str       = str.substring(idxSpace + 1, strLen);
    } while (strTemp.length < maxLen);
      // strip the trailing space
    strTemp = strTemp.substring(0,strTemp.lastIndexOf(" "));
    if(strTemp.length > maxLen) {
      strTemp = strTemp.substring(0,strTemp.lastIndexOf(" "));
    }
    output = strTemp + "...";
    return output;
  }
}
window['U']['truncatedString'] = truncatedString;

function trim(stringToTrim) {
  return stringToTrim.replace(/^\s+|\s+$/g,"");
}
window['U']['trim'] = trim;

function ltrim(stringToTrim) {
  return stringToTrim.replace(/^\s+/,"");
}
window['U']['ltrim'] = ltrim;

function rtrim(stringToTrim) {
  return stringToTrim.replace(/\s+$/,"");
}
window['U']['rtrim'] = rtrim;

function createCookie(name, value, days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "; expires="+date.toGMTString();
  }
  else var expires = "";
  document.cookie = name + "=" + value+expires + "; path=/";
}
window['U']['createCookie'] = createCookie;

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') {
      c = c.substring(1,c.length);
    }
    if (c.indexOf(nameEQ) == 0) {
      return c.substring(nameEQ.length,c.length);
    }
  }
  return null;
}
window['U']['readCookie'] = readCookie;

function manageCookie(name, value, days) {
  var currentValue = readCookie(name);
  if (currentValue == value) return;
  else {
    createCookie(name, value, days);
  }
}
window['U']['manageCookie'] = createCookie;

function eraseCookie(name) {
  createCookie(name,"",-1);
}
window['U']['eraseCookie'] = eraseCookie;

function isNotNull(aString) {
  return( aString != undefined && aString != "" && aString.length > 0 );
}
window['U']['isNotNull'] = isNotNull;

function isNull(aString) {
  return( aString == undefined || aString == null || aString == "" || aString.length == 0 );
}
window['U']['isNull'] = isNull;

  // logging methods: log(), warn(), and error()
function log(msg, component, level) {
  addToConsole(msg, level, component);
}
window['U']['log'] = log;

function warn(msg, component) {
  addToConsole(msg, "warn", component);
}
window['U']['warn'] = warn;

function error(msg, component) {
  addToConsole(msg, "error", component);
}
window['U']['error'] = error;

function addToConsole(msg, level, component) {
  /* make sure we're in debug mode */
  if (typeof nbc === 'undefined' || !nbc.debug)
    return;

  /* validate log level */
  if (nbc.debug.level == "warn" || nbc.debug.level == "error") {
    if (level && (level == "warn" || level == "error")) {
      if (nbc.debug.level == "error" && level == "warn")
        return;
    }
    else {
      return;
    }
  }
  if (!level) {
    var level = "";
  }
  else {
    var level = level + " ";
  }

  /* validate/set component */
  if (!component) {
    var component = " ";
  }
  else {
    var component = " [" + component + "] ";
  }
  if (typeof nbc.debug.component !== "undefined" &&
      (component == " " || nbc.debug.component.indexOf(component) != -1)) {
    return;
  }

  if (typeof console == 'object') {
    console.log(new Date().toLocaleTimeString() + component + level.toUpperCase() + msg);
  }
  else if (typeof java == 'object' && typeof java.lang == 'object') {
    java.lang.System.out.println(level + component + msg);
  }
}

var Navigator = {
  _getVersion: function (a, b) {
    var t = navigator.userAgent.split(a)[1];
    return (t) ? t.split(b)[0] : false;
  },
  isOpera: function () {
    return (
      (window.opera) ?
        (document.createElementNS) ?
          (document.createCDATASection) ?
            (document.styleSheets) ? 9 : 8
          : 7
        : 6
      : false
    );
  },
  isSafari: function () {
    return (document.createCDATASection && document.createElementNS) ? Navigator._getVersion('AppleWebKit/', '(') : false;
  },
  isKDE: function () {
    return (document.createCDATASection && document.createElementNS) ? Navigator._getVersion('Konqueror/', ';') : false;
  },
  isGecko: function () {
    return (document.createCDATASection && document.createElementNS) ? Navigator._getVersion('Gecko/', ' ') : false;
  },
  isNN4: function () {
    return (document.layers && typeof document.layers == 'object') ? true : false;
  },
  isWinIE: function () {
    return (
      /*@cc_on @if (@_win64 || @_win32 || @_win16)
      (document.getElementsByTagName) ?
        (@_jscript_version > 5.6) ? 7 :
        (@_jscript_version == 5.6) ? 6 :
        (@_jscript_version == 5.5) ? 5.5 :
        5
      : 4
      @else@*/false/*@end @*/
    );
  },
  isMac: function () {
    var av = navigator.appVersion.toLowerCase();
    return ( av.indexOf( 'mac' ) != -1 );
  }
};
window['U']['isOpera']  = Navigator.isOpera();
window['U']['isSafari'] = Navigator.isSafari();
window['U']['isKDE']    = Navigator.isKDE();
window['U']['isGecko']  = Navigator.isGecko();
window['U']['isNN4']    = Navigator.isNN4();
window['U']['isWinIE']  = Navigator.isWinIE();
window['U']['isMac']    = Navigator.isMac();

function getPosition(element) {
    // The counters for the total offset values.
  var left = 0;
  var top  = 0;
    // Loop while this element has a parent.
  while( element.offsetParent ) {
      // Sum the current offsets with the total.
    left += element.offsetLeft;
    top += element.offsetTop; 
      // Switch position to this element's parent.
    element = element.offsetParent;
  }
    // Do a final increment in case there was no parent or if //the last parent has an offset.
  left += element.offsetLeft;
  top  += element.offsetTop;
    // Return the values as x,y.
  return { x:left, y:top };
}
window['U']['getPosition'] = getPosition;

})();
