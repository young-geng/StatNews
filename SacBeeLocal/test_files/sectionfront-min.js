var mi=(!mi)?{'media_domain':''}:mi;mi.SideScrollAd=function(container){this.container=$(container).length?$(container):'';this.trigger_percentage=70;this.show=false;if(this.container!=='')
{this.right=this.container.css('right');$(window).bind('scroll',{obj:this},function(event){var obj=event.data.obj;if(obj.getScrollPosition()>obj.trigger_percentage&&obj.show===false)
{obj.container.stop().animate({'right':'0px'},850);obj.visible('true');}
else if(obj.getScrollPosition()<obj.trigger_percentage)
{obj.container.stop().animate({'right':obj.right},850);obj.visible('false');}});$("#closeSlideout a").bind('click',{obj:this},function(event){var obj=event.data.obj;obj.container.stop().animate({'right':obj.right},850);});}
else
{console.warn("Slide ad cannot be instantiated. "+container+" does not exist.");}};mi.SideScrollAd.prototype.visible=function(value)
{if(value===undefined)
{return this.show;}
else
{switch(value)
{case'true':case 1:this.show=true;break;case'false':case 0:this.show=false;break;default:break;}}};mi.SideScrollAd.prototype.getScrollPosition=function()
{var bottom=$(window).height()+$(window).scrollTop();var height=$(document).height();return Math.round(100*bottom/height);};mi.floorAd=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;var adDoc;this.wrapper;this.mainImg;floorAd_mainImg;this.mainWidth;this.mainHeight;this.leaveImg;this.leaveHeight;this.closeLink;this.openLink="";this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.checkForAd(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.checkForAd=function(container,repeat,adWrapper,adObject,count)
{if($('#floorboard-ad').length>0){adDoc=$(container);this.container=$(container).length?$(container):'';}
else{adDoc=$(adWrapper+" iframe").contents();this.initIframeSize(adWrapper);this.setIframeHeight(adWrapper,110);this.container=adDoc.find(container);var numdiv=adDoc.find("#floorboard-wrapper");if(numdiv.length<1){if(count++<60){setTimeout(adObject+".checkForAd( '"+container+"', "+repeat+",'"+adWrapper+"','"+adObject+"',"+count+" )",500);}
return;}}
this.floorAdExec(container,repeat,adWrapper,adObject,count);}
mi.floorAd.prototype.floorAdExec=function(container,repeat,adWrapper,adObject,count){count=typeof count!=='undefined'?count:0;adWrapper=typeof adWrapper!=='undefined'?adWrapper:"#floorWrapper";adObject=typeof adObject!=='undefined'?adObject:"floorAd";mi.App.apply(this,arguments);var floorAd_mainImg;var floorAd_leaveImg;$(adWrapper).css("display","inline");this.wrapper=adDoc.find("#floorboard-wrapper");if(adDoc.find('#floor-panel').length>0)
{this.mainImg=adDoc.find('#floor-panel');}
else
{this.mainImg=adDoc.find('img:eq(0)');}
floorAd_mainImg=this.mainImg;this.mainWidth=this.mainImg.width();this.mainHeight=this.mainImg.height();if(adDoc.find('#floor-leavebehind').length>0)
{this.leaveImg=adDoc.find('#floor-leavebehind');}
else
{this.leaveImg=adDoc.find('img:eq(1)');}
floorAd_leaveImg=this.leaveImg;this.leaveHeight=this.leaveImg.height();this.closeLink=adDoc.find('map[name="floorclosemap"]  area');this.openLink=adDoc.find('map[name="flooropenmap"] area');this.repeat=typeof repeat!=='undefined'?repeat:240;this.setConf('repeat',this.repeat);this.setConf('container',container);this.timeStamp=Math.round(new Date().getTime()/60000);this.cookieName='mi_floorboard';this.expand=true;this.cookie=new mi.Cookie(document,this.cookieName);this.cookie.load();if(this.container!=='')
{this.container.css({'position':'fixed','text-align':'left','bottom':'0','right':'0','left':'0'});if(navigator.platform=='iPad'||navigator.platform=='iPhone'||navigator.platform=='iPod'||navigator.platform=='Linux armv7l')
{this.container.css("position","static");}
this.wrapper.css({'width':this.mainWidth+'px','text-align':'left','margin':'0 auto'});if(this.mainImg!=='')
{this.flightID=this.mainImg[0].getAttribute('data-flightid');if(this.flightID==null){this.leaveImg[0].getAttribute('data-flightid');}
this.flightID=this.flightID!=null?this.flightID:'';var minutesAgo=this.lastShown();if(minutesAgo>=0&&minutesAgo<=this.repeat){this.expand=false;}
this.setCookie();this.mainImg.css({'position':'absolute','border':'0','bottom':(-1*this.mainHeight),'z-index':'2147483644'});if(this.leaveImg!==''&&this.closeLink!=='')
{this.leaveImg.css({'visibility':'hidden','border':'0','position':'absolute','bottom':(-1*this.leaveHeight),'z-index':'2147483644'});this.closeAd=function(){$(adWrapper+" div").animate({'height':"30px"});floorAd_leaveImg.css({'visibility':'visible','bottom':(-1*floorAd_mainImg.height())});floorAd_mainImg.animate({'bottom':(-1*floorAd_mainImg.height())});$('body').animate({'margin-bottom':floorAd_leaveImg.height()});floorAd_leaveImg.animate({'bottom':'0'});};this.closeLink.click(this.closeAd);if(this.openLink!='')
{this.openLink.click(function(){$(adWrapper+" div").animate({'height':"110px"});floorAd_leaveImg.animate({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').animate({'margin-bottom':floorAd_mainImg.height()});});}}
var passAd2ready=this;$(document).ready(function(){if(passAd2ready.expand){floorAd_leaveImg.css({'bottom':(-1*floorAd_leaveImg.height())});floorAd_mainImg.animate({'bottom':'0'});$('body').css({'margin-bottom':floorAd_mainImg.height()});}
else{passAd2ready.closeAd();}});}
else
{console.warn("No floor ad images to display");}}
else
{console.warn("Floor ad cannot be instantiated. "+container+" does not exist.");}};mi.floorAd.prototype.setCookie=function()
{var cookieData=new Array();var flightKey='fbid'+this.flightID;if(this.cookie){for(var prop in this.cookie){if(prop.indexOf('fbid')!=-1){var id_time=parseInt(this.cookie[prop]);if((this.timeStamp-id_time)<=this.repeat){cookieData[prop]=this.cookie[prop];}}}}
this.cookie.remove();this.cookie=new mi.Cookie(document,this.cookieName,this.getConf('repeat'),'/');this.cookie[flightKey]=this.timeStamp;for(var prop in cookieData){this.cookie[prop]=cookieData[prop];}
this.cookie.store();};mi.floorAd.prototype.lastShown=function(flightID)
{flightKey='fbid'+this.flightID;if(this.cookie){if(this.cookie[flightKey]){var id_time=parseInt(this.cookie[flightKey]);return(this.timeStamp-id_time);}
else{return-1;}}
return-1;}
mi.floorAd.prototype.setIframeHeight=function(adWrapper,height)
{$(adWrapper+" div").height(height+"px");}
mi.floorAd.prototype.initIframeSize=function(adWrapper)
{$(adWrapper+" iframe").each(function(index){if(this.id.indexOf('google_ads_iframe_')!=-1){this.width="100%";this.height="100%";}});}
$(window).load(function(){$('div[name=adx_al]').bind('click',function(){var $curMarg=$('body').css('margin-bottom').replace("px","");$curMarg=($curMarg==30)?110:30;$('body').css('margin-bottom',$curMarg+'px');});$('.advertisement img').each(function(index){if(this.height==1&&this.width==1){$(this).css("display","none");}});});var mi=(typeof mi=='undefined')?{'media_domain':''}:mi;if(window.miAppControler){mi.control=new miAppControler();}
mi.getArgs=function(){if(typeof mi.args=='undefined'){mi.args={};var query=location.search.substring(1);var pairs=query.split('&');for(var i=pairs.length-1;i>=0;i--){var pos=pairs[i].indexOf('=');if(pos==-1){continue;}
mi.args[pairs[i].substring(0,pos)]=unescape(pairs[i].substring(pos+1));}}
return mi.args;};mi._console=function(s){mi._console.log=(mi._console.log&&mi._console.log.length>0)?mi._console.log+'\n---------------------------------------------------\n'+s:s;};mi.fixConsole=function(){if(typeof window.console!="object"){window.console={};}
if(window.console.is_fixed){}
else{var firebugMethods=["log","debug","info","warn","error","assert","dir","dirxml","trace","group","groupEnd","time","timeEnd","profile","profileEnd","count"];var methodCount=firebugMethods.length;var args=mi.getArgs();var view=(args.viewlog&&args.viewlog=='1');for(var i=0;i<methodCount;i++){var methodName=firebugMethods[i];if(typeof window.console[methodName]!="function"){switch(methodName){case'log':if(view){window.console.log=mi._console;if(window.addEventListener){window.addEventListener("load",function(){alert(mi._console.log);},false);}else if(window.attachEvent){window.attachEvent("onload",function(){alert(mi._console.log);});}}else{window.console.log=function(){};}
break;default:eval("window.console[methodName] = function(s){window.console.log('"+methodName.toUpperCase()+": '+ s)};");}}}}
window.console.is_fixed=true;};mi.fixConsole();mi.cloneObject=function(sourceObj){if(sourceObj==null||typeof sourceObj!='object'){return sourceObj;}
var temp=new sourceObj.constructor();for(var key in sourceObj){temp[key]=mi.cloneObject(sourceObj[key]);}
return temp;};mi.App=function(){var _configs={};this._manageConf=function(prop,val){return val;};this.setConf=function(){switch(arguments.length){case 1:for(var prop in arguments[0]){_configs[prop]=this._manageConf(prop,arguments[0][prop]);}
break;case 2:_configs[arguments[0]]=this._manageConf(arguments[0],arguments[1]);break;default:console.warn('mi.App.setConf was passed an incorrect number of arguments, the method should be used with either a name-value pair or an object containing configuration settings.');}};this.getConf=function(prop){return _configs[prop];};this.viewConfs=function(){console.dir(_configs);};this.cache={};switch(arguments.length){case 1:this.setConf(arguments[0]);break;case 2:this.setConf(arguments[0],arguments[1]);break;}};mi.getEventSrc=function(e){if(!e){e=window.event;}
if(e.target){return e.target;}else if(e.srcElement){return e.srcElement;}};mi.templateVarPattern=/\@([^\@]+)\@/g;mi.templateParser=function(data,template){return template.replace(mi.templateVarPattern,function(){return data[arguments[1]];})};mi.makeHash=function(sourceData,firstDelimiter,secondDelimiter){if(sourceData&&firstDelimiter&&secondDelimiter){var hash={};var pairs=sourceData.split(firstDelimiter);var pos;for(var i=pairs.length-1;i>=0;i--){if(typeof(pairs[i+1])!='undefined'){pos=pairs[i].indexOf(secondDelimiter);if(pos==-1){continue;}
hash[pairs[i].substring(0,pos)]=pairs[i].substring(pos+1);}}
return hash;}
else{console.log('sourceData, firstDelimiter, & secondDelimiter must be defined. There are no default values.');}};mi.loadPageInfo=function(){if(window.pageInfo){var pi=window.pageInfo;if(this.pageInfo==undefined){this.pageInfo=this.cloneObject(pi);}else{for(var key in pi){if(key==='version'&&(parseFloat(pi[key])>parseFloat(this.pageInfo.version))){this.pageInfo.version=pi[key];}else if(this.pageInfo[key]==undefined){this.pageInfo[key]=this.cloneObject(pi[key]);}else if(typeof this.pageInfo[key]=='object'){for(var key2 in pi[key]){this.pageInfo[key][key2]=(this.pageInfo[key][key2])?this.pageInfo[key][key2]:this.cloneObject(pi[key][key2]);}}}}}
window.pageInfo=null;}
mi.wait_for_ready=function(time,target,callback){var checker,time_spent=0,interval=3000;_check_document=function(){if(null!==$(target)){clearInterval(checker);callback();}else{time_spent+=interval/1000;if(time_spent>=time){clearInterval(checker);}}};$(document).ready(function(){checker=setInterval(_check_document,interval);});};mi.Search=function(){mi.App.apply(this,arguments);mi.getArgs();this.kill;};mi.Search.prototype.submitForm=function(searchType){this.kill="false";switch(this.getConf("searchSelectorType")){case"option":searchType=document.miSearchForm.aff.value;break;case"radio":searchType=$('input:radio[name=aff]:checked').val();break;}
var queryInputField;if(document.miSearchForm.keywords){queryInputField=document.miSearchForm.keywords;}
else{queryInputField=document.miSearchForm.q;}
var searchText="";if($(queryInputField).attr("placeholder")){if(!(queryInputField.value==$(queryInputField).attr("placeholder"))){searchText=queryInputField.value;}}
else{searchText=queryInputField.value;}
if(searchType==parseInt(searchType)){return;}
else{this.searchParamConfig(searchType,searchText);this.buildForm(searchType);}
if(this.kill=="false"){document.miSearchForm.submit();}
else{return false;}};mi.Search.prototype.buildForm=function(search_type){var self=this;var searchInputContainer_div=document.getElementById("searchInputContainer").innerHTML;if(searchInputContainer_div){$("#searchInputContainer > input[type='hidden']").each(function(){$(this).remove();});}
$("#search_widget_form").attr('method',self.getConf("form_method"));try{jQuery.each(self.getConf("query_fields"),function(paramName,paramValue){paramName=paramName.replace(/(.*)_mihyphen_(.*)/,"$1-$2");$("<input type='hidden' name='"+paramName+"' value='"+paramValue+"' />").appendTo("#searchInputContainer");});}
catch(e){console.error("Script Caught Error - "+e);}
document.miSearchForm.action=self.getConf("form_action");};mi.Search.prototype.checkOption=function(){var self=this;if(typeof mi.args.collection!="undefined"){switch(self.getConf("searchSelectorType")){case"option":if(mi.args.collection=="WEB"){$("select#search_select option[value='web_search']").attr("selected",1);}else if(mi.args.collection=="ARCHIVES"){$("select#search_select option[value='archives']").attr("selected",1);}else{$("select#search_select option[value='h_archives']").attr("selected",1);}
break;case"radio":if(mi.args.collection=="WEB"){$("#search_web").attr("checked",1);}else if(mi.args.collection=="ARCHIVES"){$("#search_archives").attr("checked",1);}else{$("#search_history").attr("checked",1);}
break;}}};mi.Search.prototype.dropDownSelection=function(target){mi.search.cache.mi_search_type=target.children('a').attr("id");if(target.children('a').is('#site_search')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
else if(target.children('a').is('#web_search')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
else if(target.children('a').is('#archives')){var this_image=target.find("img").attr("src");mi.search.getConf("mi_search_widget_icon").attr("src",this_image);}
$("#search_keywords").focus();return false;}
mi.Search.prototype.configErrorReporter=function(){this.kill="true";alert("Option doesn't exist in your configuration. Please review your browsers error console.");console.error("Option doesn't exist in your configuration. Please submit a ticket to MI Support for assistance.");return false;}
mi.Search.prototype.setUp=function(){mi.search.searchParamConfig();if(!mi.search.getConf("noWebSearch")){mi.search.getConf("mi_search_drop_down_web_search_item").show();mi.search.getConf("yahoo_credit").css("visibility","visible");}
mi.search.getConf("mi_search_dropdown_keys").hover(function(){mi.search.getConf("mi_search_drop_down").show();},function(){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_drop_down_link").bind("click",function(e){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_dropdown_input").focus(function(){mi.search.getConf("mi_search_drop_down").hide();});mi.search.getConf("mi_search_selected").click(function(){mi.search.dropDownSelection($(this));return false;});mi.search.checkOption();mi.search.cache.mi_search_type=mi.search.getConf("defaultSearchType");var mi_search_form=document.miSearchForm;mi_search_form.onsubmit=function(){return mi.search.submitForm(mi.search.cache.mi_search_type);}}

// *****************************************************************************
// Function:	fetchKeywordUrlMap( 'myTargetSelector' )
// Arguments:	myKeywordUrlMap:  A string of URL to keyword mappings
//		myTargetSelector: JQuery style selector to inject keyword
//		mapping into.
// Purpose:	Based on keywords extrapolated from the current URL will compare
//		these keywords to a user generated mapping of URLs to Keywords
//		and if matched will output the URL link passed.
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchKeywordUrlMap = function( myKeywordUrlMap, myTargetSelector ){

    // If 'myKeywordUrlMap' has a trailing '++' then we need to strip this, the
    //   '++' is replaced by Template Toolkit for every line break, and having
    //   a trailing '++' means the page element had a trailing line break with
    //   no data after it
    if( myKeywordUrlMap.match( /\++$/ ) )
	myKeywordUrlMap = myKeywordUrlMap.replace( /\+*$/, '' );
	
    // This will contain all the HTML to be injected into the selector passed
    //   above after processing.
    var formattedOutput		= '';
    // All the keywords extrapolated from the current URL, urlKeyword == Array
    var urlKeywords		= this.fetch404Keywords( );
    
    // This array will house all objects of class type keywordUrlMapClass
    var keywordUrlMapObjects	= [];
    
    // Now we have to parse the Keyword -> URL mappings so we can match on the
    //   404 keywords found.
    myKeywordUrlMap 	= myKeywordUrlMap.split( '++' );
    for( var i in myKeywordUrlMap ){
	// Example Map: Link Name 1||http://www.link1.com||link1, test1, keyword
	
	// Split the current keyword / url map by '||' and create new object
	var currentKeywordUrlMap	= myKeywordUrlMap[i].split( '||' );
	// Create the object and set the name and URL
	keywordUrlMapObjects[i]	= new this.keywordUrlMapClass( currentKeywordUrlMap[0], currentKeywordUrlMap[1] );
	
	// Now split the 3rd( [2] ) part of data by ',' and add to list of
	//   keywords for this object
	var currentKeywords		= currentKeywordUrlMap[2].split( ',' );
	for( var x in currentKeywords ){
	    keywordUrlMapObjects[i].addKeyword( currentKeywords[x] );
	}
    }
    
    
    // Finally loop through all the 404 keywords extrapolated, and call the
    //   keywordUrlMapClass objects 'matchKeyword' method to see if any of the
    //   objects keywords match the 404 keyword
    for( var i in urlKeywords ){	
	for( var x in keywordUrlMapObjects ){
	    if( keywordUrlMapObjects[x].matchKeyword( urlKeywords[i] ) ){
		// Then add the output code
		formattedOutput += "\
		    <li><a href='" + keywordUrlMapObjects[x].url + "'>" +
			    keywordUrlMapObjects[x].name + "</a>\
		    </li>";
	    }
	}
    }
    
    // Output the final HTML to the page
    $( myTargetSelector ).append( formattedOutput );
    
    
}

/**
 * Construct a keywordUrlMapClass
 * @class Basic class to house keyword to url mappings, and any helper methods
 * needed.
 * @constructor
 * @param {String} myName The human readable link name, used for innerHTML of
 * the anchor when outputting to the user.
 * @param {String} myUrl The actual href URL for the anchor
 * @return A new keywordUrlMapClass
 */
mi.Search.prototype.keywordUrlMapClass = function( myName, myUrl){
    this.name		= myName;		// Name of link to display
    this.url		= myUrl;		// Actual URL
    this.keywords	= [];			// An array of keywords match
    this.matchedKeyword = false;		// This is set to true when we
						// match a keyword to prevent dups
        
    
     /**
    * Adds a new keyword to the Array 'keywords' for the current instance of
    * this object, also lowercases the keyword
    * @type String
    */
    this.addKeyword 	= function( myKeyword ){
	this.keywords.push( myKeyword.toLowerCase() );
    }
    
    /**
     * Given a passed keyword, see if it matches any keywords in this object,
     * if so then return true, and set that object as matchedKeyword == true
     * to prevent duplicate outputs
     * @type String
     * @return 'true' if match found, 'false' otherwise
    */
    this.matchKeyword 	= function( myKeyword ){
	
	if( ( !this.matchedKeyword ) && ( this.getKeywords().match( myKeyword ) ) ){
		this.matchedKeyword 	= true;
		return( true );
	}
	return( false );
    }
    
    /**
     * Will return a list of this objects instance keywords, in comma delimited
     * format.
     * @return String of comma delimited keywords
     */
    this.getKeywords 	= function( ){
	
	return( this.keywords.join( ', ' ) );
    }
    
}
// *****************************************************************************


// *****************************************************************************
// Function:	fetchSearchResults( 'myTargetSelector' )
// Arguments:	myTargetSelector: JQuery style selector to inject SOLR results in
// Purpose:	Based on keywords extrapolated from the current URL, will inject
// 		SOLR search results into the passed JQuery selector
// Return:	NA
// *****************************************************************************
mi.Search.prototype.fetchSearchResults = function( myTargetSelector ){
    
    // 'keywordList' is a space separated list of keywords found in the URL
    var keywordList 	= '';
    
    // Get the URL and send to function to get keywords, will return an array
    //   of keywords.
    var keywords 		= this.fetch404Keywords( );
    
    // Here we loop through the keywords, and assemble into a space separated
    //   string that SOLR can parse
    for( var i in keywords ){
	keywordList += ' ' + keywords[i];
    }
    
    // Now inject the search results into the passed selector
    $( myTargetSelector ).load( '/search/ #search', { q: keywordList } );

}
// *****************************************************************************


// *****************************************************************************
// Function:	fetch404Keywords( )
// Purpose:	Will parse for all words between forward slashes after the
// 		domain name and return this list of words as an array
// Return:	An array of keywords found in the url after the domain name
// *****************************************************************************
mi.Search.prototype.fetch404Keywords = function( ){
    
    // This will be the array that holds the unedited version of all 404 keywords
    var keywordsArray 		= [];
    // This will be the array returned by this function containing all keywords
    //   after filtering out the 'bad' keywords as defined by the regex below
    var returnKeywordsList 	= [];
    
    // Get the list of 404 keywords from the current URL
    keywordsArray = window.location.pathname.toLowerCase().slice(1).split('/');
    
    // Go through all the keywords and filter out for 'invalid' keywords
    //   based on the regex in the loop.
    for( var x in keywordsArray ){	

	// If the current keyword doesn't match the regex then assign on the
	//   returned keyword array
	if(  ( keywordsArray[x].match( /story/ ) ) || ( keywordsArray[x].match( /[0-9]+/ ) ) ){
	    //console.log( 'INVALID KEYWORD FOUND: ' + keywordsArray[x] );
	} else {
	    //console.log( 'VALID KEYWORD FOUND: ' + keywordsArray[x] ); 
	    returnKeywordsList.push( keywordsArray[x] );
	}
    }
	
    return( returnKeywordsList );

}

mi.Search.prototype.searchParamConfig=function(search_type,search_text){this.setConf("searchSelectorType","radio");if(search_type){switch(search_type){case"web_search":this.setConf("form_action","http://search2.sacbee.com/search-bin/search.pl.cgi?");this.setConf("query_fields",{sf_Keywords:search_text,product:"Yahoo,Overture",collection:"WEB",live_template:"http://www.sacbee.com/searchresults/v-ysr/index.html",error_template:"http://www.sacbee.com/searchresults/v-yerr/index.html",preview_template:"http://preview.sacbee.com/searchresults/v-ysr/index.html",results_per_page:"10",preview:"0",prop_related:"1",prop_dym:"1"});break;default:this.configErrorReporter();}}};var mi=(!mi)?{'media_domain':''}:mi;mi.Cookie=function(document,name,minutes,path,domain,secure){this.$document=(document)?document:window.document;this.$name=(name)?name:'cookie';this.$expiration=(minutes)?new Date((new Date()).getTime()+minutes*60000):null;this.$path=(path)?path:null;this.$domain=(domain)?domain:null;this.$secure=(secure)?true:false;};mi.Cookie.prototype.store=function(){var cookieVal="";for(var prop in this){if((prop.charAt(0)=='$')||((typeof this[prop])=='function')){continue;}
if(cookieVal!==""){cookieVal+='&';}
cookieVal+=prop+':'+escape(this[prop]);}
var cookie=this.$name+'='+cookieVal;cookie+=(this.$expiration)?'; expires='+this.$expiration.toGMTString():'';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+=(this.$secure)?'; secure':'';this.$document.cookie=cookie;};mi.Cookie.prototype.load=function(){var allCookies=this.$document.cookie;if(allCookies===""){return false;}
var start=allCookies.indexOf(this.$name+'=');if(start==-1){return false;}
start+=this.$name.length+1;var end=allCookies.indexOf(';',start);if(end==-1){end=allCookies.length;}
var cookieVal=allCookies.substring(start,end);var a=cookieVal.split('&');if((a.length==1)&&(a[0].indexOf(':')==-1)){var prop=this.$name;this[prop]=unescape(cookieVal.replace(/\+/g,'%20'));return true;}
for(var i=0;i<a.length;i++){a[i]=a[i].split(':');}
for(i=0;i<a.length;i++){this[a[i][0]]=unescape(a[i][1]);}
return true;};mi.Cookie.prototype.remove=function(){var cookie=this.$name+'=';cookie+=(this.$path)?'; path='+this.$path:'';cookie+=(this.$domain)?'; domain='+this.$domain:'';cookie+='; expires=Fri, 02-Jan-1970 00:00:00 GMT';this.$document.cookie=cookie;};mi.Commenting=function(){mi.App.apply(this,arguments);this._manageConf=function(prop,val){switch(prop){case'enabled':var v=parseInt(val);if(isNaN(v)){val=(val.toLowerCase)?val.toLowerCase():val;switch(val){case true:case'true':case'yes':case'on':v=1;break;default:v=0;break;}}
val=v;default:break;}
return val;};if(mi.control&&mi.control.commenting!=undefined){this.setConf('enabled',mi.control.commenting);}else{this.setConf('enabled',0);console.warn('Commenting has been instantiated, but disabled because mi.control.commenting is not defined.');}
mi.loadPageInfo();var splitHost=window.location.host.split('.');this.setConf('accountName',splitHost[splitHost.length-2]);this.setConf('target','commentingStage');this.finish();};mi.Commenting.prototype.finish=function(){};mi.Commenting.prototype.display=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('display commenting');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._renderCommenting();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('display commenting');}};mi.Commenting.prototype.displayPopular=function(count){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('popular comment threads');}
var e=this.getConf('enabled');if(e!==0&&e!==3&&e!==4){this._displayPopular(count);}else{console.info('The popular comment threads widget has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('popular comment threads');}};mi.Commenting.prototype.displayCommentCount=function(){if(window.gomez&&window.gomez.startInterval){window.gomez.startInterval('comment count');}
var e=this.getConf('enabled');if(e!==0&&e!==2){this._displayCommentCount();}else{console.info('Submission and display of comments has been disabled.');}
if(window.gomez&&window.gomez.endInterval){window.gomez.endInterval('comment count');}}
mi.Commenting.prototype.extended=true;var disqus_identifier,disqus_shortname,disqus_remote_auth_s2,disqus_title,disqus_developer,disqus_url;if(typeof facebookXdReceiverPath=="undefined"){var facebookXdReceiverPath;}
mi.Commenting.prototype._displayCommentingDisqus=function(){window.disqus_identifier=this.getThreadId();var cookie=new mi.Cookie(document,'disqus');if(cookie.load()){window.disqus_remote_auth_s2=cookie.disqus;}
window.disqus_title=mi.pageInfo.asset.title;if(window.disqus_identifier!=undefined){var target=document.getElementById(this.getConf('target'));window.disqus_url=window.location.href.split("#")[0];if(window.disqus_url.match(/:\/\/preview/)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/:\/\/[^\.]+\./,"://www.");}
else if(window.disqus_url.match(/-preview\./)){window.disqus_developer=1;window.disqus_url=window.disqus_url.replace(/-preview\./,"-site.");}
var thread=document.createElement('div');thread.id='disqus_thread';target.appendChild(thread);var dsq=document.createElement('script');dsq.type='text/javascript';dsq.async=true;dsq.src='http://'+this.getConf('accountName')+'.disqus.com/embed.js';(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(dsq);}else{console.error('Commenting could not be loaded because there was no defined thread id.');}};mi.Commenting.prototype._renderCommenting=mi.Commenting.prototype._displayCommentingDisqus;mi.Commenting.prototype._displayPopularDisqus=function(count){count=(isNaN(count))?this.getConf('discoveryCount'):count;if(isNaN(count)){count=0;}
count=(count>0&&count<21)?Math.floor(count):5;document.write('<script type="text/javascript" src="http://disqus.com/forums/'+this.getConf('accountName')+'/popular_threads_widget.js?num_items='+count+'"></script>');};mi.Commenting.prototype._displayPopular=mi.Commenting.prototype._displayPopularDisqus;mi.Commenting.prototype._displayCommentCountDisqus=function(){window.disqus_identifier=this.getThreadId();window.disqus_shortname=this.getConf('accountName');document.getElementById('commentCount').href=document.getElementById('commentCount').href+'#disqus_thread';document.getElementById('commentCount').setAttribute('data-disqus-identifier',this.getThreadId());var s=document.createElement('script');s.async=true;s.src='http://disqus.com/forums/'+this.getConf('accountName')+'/count.js';(document.getElementsByTagName('HEAD')[0]||document.getElementsByTagName('BODY')[0]).appendChild(s);};mi.Commenting.prototype._displayCommentCount=mi.Commenting.prototype._displayCommentCountDisqus;mi.Commenting.prototype.getThreadId=function(){return(mi.pageInfo&&mi.pageInfo.asset&&mi.pageInfo.asset.id)?mi.pageInfo.asset.id:undefined;};mi.Commenting.prototype.finish=function(){window.facebookXdReceiverPath='/static/scripts/mi/third_party/facebook/fb-disqus_xd_receiver.html';}
mi.Commenting.prototype.reset_disqus_config=function(disqus_cookie_val,public_api_key){var mi_disqus_config=new disqus_config();var sso_name=mi_disqus_config.sso.name.toString();var sso_button=mi_disqus_config.sso.button.toString();var sso_url=mi_disqus_config.sso.url.toString();var sso_logout=mi_disqus_config.sso.logout.toString();var sso_width=mi_disqus_config.sso.width.toString();var sso_height=mi_disqus_config.sso.height.toString();disqus_config=function(){this.page.remote_auth_s3=disqus_cookie_val;this.page.api_key=public_api_key;this.sso={name:sso_name,button:sso_button,url:sso_url,logout:sso_logout,width:sso_width,height:sso_height};};}
mi.commenting = new mi.Commenting();
 var disqus_config = function () {
 	this.sso = {
 		name:    "SacBee",
 		button:  "http://media.sacbee.com/static/images/dsq-login-button-mi.png",
 		url:     "http://www.sacbee.com/mistatic/disqus_login.html",
 		logout:  "http://www.sacbee.com/reg-bin/tint.cgi?mode=logout",
 		width:   "600",
 		height:  "375"
 	};
 };

mi.DealSaver=function(){mi.App.apply(this,arguments);if(mi.control&&mi.control.dealsaver!==undefined){this.setConf("enabled",mi.control.dealsaver);}else{this.setConf("enabled",0);console.warn("DealSaver has been instantiated, but disabled because mi.control.dealsaver is not defined.");}};mi.DealSaver.prototype.executeDs=function(){var self=this;var e=self.getConf("enabled");if(e!==0){dsUrl="http://"+window.location.hostname+"/static/dealsaver/widget/dealsaver.json";jQuery.ajax({type:"GET",cache:false,dataType:"json",url:dsUrl,success:function(data){self.checkData(data);self.displayWidget(self.getConf("enabled"));},error:function(){self.setConf("enabled",0);self.displayWidget(self.getConf("enabled"));}});}
else{console.info('Display of DealSaver has been disabled.');}};mi.DealSaver.prototype.checkData=function(data){var self=this;if(data.page.deals.deal==undefined){self.setConf("enabled",0);console.warn("The DealSaver widget has been disabled because it can't find any deal information in the feed.");}else if(data.page.deals.deal.saleprice.$t<=0||data.page.deals.deal.saleprice.$t==undefined){self.setConf("enabled",2);console.warn("The DealSaver widget has been placed in PlaceHolder mode because saleprice is empty or 0.");self.distributeData(data);}else{self.distributeData(data);}}
mi.DealSaver.prototype.distributeData=function(data){var self=this;if(self.getConf("LID")!==undefined){var lid=self.getConf("LID");var lidHash="&LID="+lid;}else{console.warn("DealSaver can't find mi.dealSaver.getConf('LID'). Disabling the LID hash tag in URLs.");var lidHash='';}
var dsvalue=data.page.deals.deal.productvalue.$t;var dsprice=data.page.deals.deal.saleprice.$t;var dollarsoff=(dsvalue-dsprice);var percentoff=(dollarsoff/dsvalue)*100;var misitelink=data.page.site.sitelink.$t+lidHash+"#widget=ds_rrail";var mideallink=data.page.deals.deal.link.$t+lidHash+"#widget=ds_rrail";jQuery("#ds_value").html("$"+Math.round(dsvalue));jQuery("#ds_discount").html(Math.floor(percentoff)+"%");jQuery("#ds_save").html("$"+Math.round(dollarsoff));jQuery("#dealsaver_td .ds_title_link").attr("href",mideallink);jQuery("#dealsaver_td .ds_title_link").html(data.page.deals.deal.offer.$t);jQuery("#dealsaver_td .ds_pricetag_container").html("$"+data.page.deals.deal.saleprice.$t);jQuery("#dealsaver_td .ds_deal_image img").attr("src",data.page.deals.deal.splashpagethumbnail.$t);jQuery("#dealsaver_td .ds_logo_link").attr("href",misitelink);jQuery("#dealsaver_td .ds_dealtitle").attr("href",misitelink);jQuery("#dealsaver_td .ds_deal_image a").attr("href",mideallink);jQuery("#dealsaver_td .ds_pricetag a").attr("href",mideallink);};mi.DealSaver.prototype.displayWidget=function(display_mode){var self=this;if(display_mode!==0&&display_mode!==2){jQuery("#dealSaverWidget").attr("style","display:block");}else if(display_mode==2){jQuery("#dealSaverWidget .ds_buycontainer").attr("style","display:none");jQuery("#dealSaverWidget .ds_deal_image").attr("style","float:none; text-align:center");jQuery("#dealSaverWidget").attr("style","display:block");}};(function($){$.fn.equalHeights=function(minHeight,maxHeight){tallest=(minHeight)?minHeight:0;this.each(function(){if($(this).height()>tallest){tallest=$(this).height();}});if((maxHeight)&&tallest>maxHeight)tallest=maxHeight;return this.each(function(){$(this).height(tallest).css("overflow","auto");});}})(jQuery);