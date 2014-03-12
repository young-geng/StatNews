/* ################################################################# */
/*  TITLE:        nbctools.js                                        */
/*  VERSION:      1.0                                                */
/*  AUTHOR:       sabler                                             */
/*  LAST UPDATED: 07/03/2013                                         */
/*  NOTES:        Any function written here must be raw JS.          */
/*                NO 3rd PARTY APIs/LIBRARIES ALLOWED                */
/*                                                                   */
/* ################################################################# */

nbc.activeTools = new Array();

nbc.tools = function(id) {
	this.id = id;
	this.instanceTime = new Date();
	

	this.init = function() {
		if (typeof console == "object" && nbc.env != "") {
			console.log("**** NBC OTS | NBC Tools v1.0 ****\nCalled at "+ this.instanceTime + "\n\nReference this instance as: "+ this.id +"\n\n(If you can read this, the object is OK.)");
		}
		
		nbc.activeTools.push(this.id);
	
	}
	
	
	/* function listActiveTools()
	 * Get a quick readout of how many instances of nbc.tools
	 * are active on the page.
	 */
	this.listActiveTools = function() {
		if(typeof console == "object") {
			console.log("**** NBC OTS | NBC Tools v1.0 ****\nCurrent, active instances of nbc.tools: "+ nbc.activeTools);
		}
	}
	
	/* function getPDKVersion()
	 * Easily returns current version of the PDK
	 *
	 * Used for preserving sanity during PDK upgrades.
	 */
	
	this.getPDKVersion = function() {
	
		if(typeof $pdk == "object") {
		console.log("PDK is present!\nCurrent version: " + $pdk.version.major + "." + $pdk.version.minor + "." + $pdk.version.revision);
		} else {
		console.warn("The PDK either hasn't loaded yet or isn't on the page.");
		}
	
	}
	

	/* function makeSafeString("string",boolean)
	 * Take a string and either replace all special characters with dashes
	 * or encode the entire string to ASCII values
	 * 
	 */
	
	this.makeSafeString = function(targetString,encode) {
		if(!encode) {
			var encode = false;
		}
		
		if(encode == false) {
		var safeString = targetString.replace(/[,;:.!&?+=@*()%\$#'" ]/g,"-");
		return safeString;
		} else {
		var safeString = encodeURIComponent(targetString);
		return safeString;
		}
	}
	
	/* function makeFriendlyUrl(object,"string","string","string",boolean)
	 * Push an HTML5 history object into the browser memory
	 * and location bar.
	 * 
	 * Syntax of required object: var foo = {info:"foo",about:"foo",this:"foo",historyItem:"foo"};
	 * 
	 * See https://developer.mozilla.org/en-US/docs/Web/Guide/DOM/Manipulating_the_browser_history#Example
	 * for further information 
	 */
	this.makeFriendlyUrl = function(stateDataObj,urlString,altUrlString,title,pushToLocationBar) {
		if(!stateDataObj || typeof stateDataObj !="object") {
			if(typeof console=="object") {
				console.warn(this.id+".makeFriendlyUrl | No object passed, aborting...");
				return false;
			}
		} else {
		
			if(!pushToLocationBar) {
				pushToLocationBar = false;
			}
		
			if(pushToLocationBar == true) {
				if( (typeof history.pushState == "function")) {
					var stateData = stateDataObj;
					history.replaceState(stateData,title,urlString);
				} else {
					location.href = altUrlString;
				}
			} else {
				console.log(this.id+".makeFriendlyUrl | URL state data stored.");
			}
			
		} // end stateDataObj sniffing
	}
	
	/* function rightNow("string",boolean)
	 * Can return just the time, hour, minute, day, or full date.
	 * (But if you just need the full date, why are you even using this?) :)
	 * Accepts "hour","minute","day","month","hourUTC","minuteUTC","dayUTC","monthUTC"
	 * Returns what you've asked for.
	 *
	 * Used for helping to day-part in tracking tools. 
	 */
	 
	this.rightNow = function(flux,daypartFriendly) {
		if(!daypartFriendly) {
			var daypartFriendly = false;
		}
		
		var getcurrentDateandTime = new Date();
		var userRequest = null;
		var months = new Array();
		var days = new Array();
		
		months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
		days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
		
		
		switch(flux) {
			case "hour":
			userRequest = getcurrentDateandTime.getHours();
			
			if(daypartFriendly == true) {
				userRequestDP = userRequest + ":00";
				return userRequestDP;
			} else {
				return userRequest;
			}
			break;
			
			case "minute":
			userRequest = getcurrentDateandTime.getMinutes();
			
			if(daypartFriendly == true && userRequest < 10) {
				userRequestDP = getcurrentDateandTime.getHours() + ":0" + userRequest;
				return userRequestDP;
			} else if(daypartFriendly == true && userRequest > 10) {
				userRequestDP = getcurrentDateandTime.getHours() + ":" + userRequest;
				return userRequestDP;
			} else {
				return userRequest;
			}
			break;
			
			case "day":
			var dayAsNumber = getcurrentDateandTime.getDay();
			userRequest = days[dayAsNumber];
			break;
			
			case "month":
			var monthAsNumber = getcurrentDateandTime.getMonth();
			userRequest = months[monthAsNumber];
			break;
			
			case "hourUTC":
			userRequest = getcurrentDateandTime.getUTCHours();
			return userRequest;
			break;
			
			case "minuteUTC":
			userRequest = getcurrentDateandTime.getUTCMinutes();
			return userRequest;
			break;
			
			case "dayUTC":
			var dayAsNumber = getcurrentDateandTime.getUTCDay();
			userRequest = days[dayAsNumber];
			break;
			
			case "monthUTC":
			var monthAsNumber = getcurrentDateandTime.getUTCMonth();
			userRequest = months[monthAsNumber];
			break;
			
			default:
			return getcurrentDateandTime;
			break;
		}
		
		return userRequest;
	}
	
	/* function createCookie('string','string',number)
	 * INHERITED FROM UTILS.JS
	 * KNOWN BUG: PASSING DAYS RESULTS IN NO COOKIE BEING SET
	 * 
	 * Creates a cookie 
	 */
	this.createCookie = function(name, value, days) {
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			var expires = "; expires="+date.toGMTString();
		} else {
			var expires = "";
			  document.cookie = name + "=" + value+expires + "; path=/";
		}
	}
	
	/* function readCookie('string')
	 * INHERITED FROM UTILS.JS
	 * 
	 * Reads a cookie
	 */
	
	this.readCookie = function(name) {
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
	}
	
	
	this.init();

}
