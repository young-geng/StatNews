// $Id: MI_Cookie.js 1603 2011-03-24 20:29:00Z bjones $
/** MI_Cookie.js ****************************************************************
 * @fileoverview Class for managing cookies. This class allows you to interact with cookies
 * as an object with each named value represented as a property of the object.
 * This class will store multiple name/value pairs in a single cookie, reducing 
 * the number of cookies needed. Browsers may enforce limits to the number of 
 * individual cookies stored, so bundling values up in a single cookie is a good
 * idea. New cookies should be used if there's a difference in access rights, or
 * a cookie is getting too big, 4k of data is generally the limit.
 * @minify true
 * @author Joe Whetzel
 * @aggpath js/MI_Cookie.js
 *************************************************************************** */
 var mi = (!mi) ? {'media_domain':''} : mi;
 
/** Cookie object constructor. This constructor creates the javascript object, it
 * does not create the browser cookie, use {@link #store} to store the cookie in 
 * the browser.
 * @param document the Document object for which the cookie is stored
 * @param {String} name string that specifies a name for the cookie, defaults to "cookie"
 * @param {Integer} minutes how long until the cookie expires, defaults to current session
 * @param {String} path the path with which the cookie is associated, defaults to current page
 * @param {String} domain domain the cookie is associated to
 * @param {Boolean} secure whether or not the cookie is secure, only if the connection is secure
 * @constructor
 */
mi.Cookie = function (document, name, minutes, path, domain, secure) {
	/** Document object for which the cookie is stored. Default is to use the current document. */
	this.$document = (document) ? document : window.document;
	/** Name of the cookie. Defaults to "cookie".
	 * @type Document
	 */
	this.$name = (name) ? name : 'cookie';
	/** Minutes until the cookie expires. Default is at the end of the current session.
	 * @type Integer
	 */
	this.$expiration = (minutes) ? new Date((new Date()).getTime() + minutes * 60000) : null;
	/** Path associated with the cookie.
	 * @type String
	 */
	this.$path = (path) ? path : null;
	/** Domain associated with the cookie.
	 * @type String
	 */
	this.$domain = (domain) ? domain : null;
	/** Whether or not the cookie is secure.
	 * @type Boolean
	 */
	this.$secure = (secure) ? true : false;
};

/** Stores the cookie in the browser. Defining or changing values in the cookie
 * object alone does not save the values to the browser. After working with the
 * cookie object it must be stored in the browser.
 */
mi.Cookie.prototype.store = function() {
	var cookieVal = "";
	for(var prop in this) {
		if ((prop.charAt(0) == '$') || ((typeof this[prop]) == 'function')) {
			continue;
		}
		if (cookieVal !== "") {
			cookieVal += '&';
		}
		cookieVal += prop + ':' + escape(this[prop]);
	}
	var cookie = this.$name + '=' + cookieVal;
	cookie += (this.$expiration) ? '; expires=' + this.$expiration.toGMTString() : '';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += (this.$secure) ? '; secure' : '';
	this.$document.cookie = cookie;
};

/** Loads a single cookie from the browser into the cookie object, making each 
 * name/value pair properties of the object.
 * @type Boolean
 */
mi.Cookie.prototype.load = function() {
	var allCookies = this.$document.cookie;
	if (allCookies === "") {
		return false;
	}
	var start = allCookies.indexOf(this.$name + '=');
	if (start == -1) {
		return false;
	}
	start += this.$name.length + 1;
	var end = allCookies.indexOf(';', start);
	if (end == -1) {
		end = allCookies.length;
	}
	var cookieVal = allCookies.substring(start, end);
	var a = cookieVal.split('&');
	if ((a.length == 1) && (a[0].indexOf(':') == -1)) {
		var prop = this.$name;
		this[prop] = unescape(cookieVal.replace(/\+/g, '%20')); // PHP encodes spaces with a '+'
		return true;
	}
	for(var i=0; i < a.length; i++) {
		a[i] = a[i].split(':');
	}
	for(i=0; i < a.length; i++) {
		this[a[i][0]] = unescape(a[i][1]);
	}
	return true;
};

/** Method for removing the entire cookie from the browser.
 */
mi.Cookie.prototype.remove = function() {
	var cookie = this.$name + '=';
	cookie += (this.$path) ? '; path=' + this.$path : '';
	cookie += (this.$domain) ? '; domain=' + this.$domain : '';
	cookie += '; expires=Fri, 02-Jan-1970 00:00:00 GMT';
	this.$document.cookie = cookie;
};



/* MI_Cookie.js ^ *********************************************************** */
