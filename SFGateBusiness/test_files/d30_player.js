if (top.shortTail_D30 === undefined) {
    var shortTail_D30 = {};

    // =========================================
    // INITIALIZATION CODE

    // ************************************
    // ** DEFINE EXTERNAL FILE URLS
    // ************************************
    /** @@Set by the Player Creator@@ **/
    shortTail_D30.CDN_CONTAINER_URL = 'http://cdn.video.adtouch.com/d30-creatives-production-7707-10235324';
    shortTail_D30.URL_SWFOBJECT = shortTail_D30.CDN_CONTAINER_URL+'/swfobject.js'; //'http://c343183.r83.cf1.rackcdn.com/swfobject.js';
    shortTail_D30.URL_D30 = shortTail_D30.CDN_CONTAINER_URL+'/d30.swf'; //'http://c343183.r83.cf1.rackcdn.com/d30.swf';
    
    /** @@Set by the Player Creator@@ **/
    shortTail_D30.FLV_FILE_NAME = 'd30-creatives-video-7707.flv';
    shortTail_D30.FLV_FILE_URL = shortTail_D30.CDN_CONTAINER_URL+'/'+shortTail_D30.FLV_FILE_NAME;
    
    shortTail_D30.FLV_DURATION = '';
    
    /** @@Set by the Player Creator@@ **/
    shortTail_D30.THIRD_PARTY_TRACKING_URL = '';
    
    /** @@Set by the Player Creator@@ **/
    //New variable for AppNexus Server
    //'http://ib.sand-08.adnxs.net/ptv?id=610860&size=1x1';
    shortTail_D30.APPNEXUS_SERVER = '';//'http://localhost:8080/ptv?size=1x1&pid=';

    /** @@Set by the Player Creator@@ **/
    //New variable for AppNexus Placement ID
    shortTail_D30.APPNEXUS_PLACEMENT_ID = 'NONE';

    /** @@Set by the Player Creator@@ **/
    shortTail_D30.APPNEXUS_CREATIVE_ID = '10235324';
    
    /** @@Set by the Player Creator@@ **/
    shortTail_D30.IS_APPNEXUS_PLAYER_APP = true;

    /** @@Set by the Player Creator@@ **/
    //The viewing time required before the close button appears
    shortTail_D30.REQUIRED_VIEWING_TIME =0;

    /** @@Set by the Player Creator@@ **/
    //Volume control 10-100
    shortTail_D30.VOLUME_LEVEL='0.5';

    /** @@Set by the Player Creator@@ **/
    //Muted true/false
    shortTail_D30.MUTED ='1';

    /** @@Set by the Player Creator@@ **/
    // use default value for now
    shortTail_D30.BASE_COLOR ='000000';//'%base_color%';

    /** @@Set by the Player Creator@@ **/
    // use default value for now
    shortTail_D30.FONT_COLOR = 'ffffff';//'%font_color%';

    /** @@Set by the Player Creator@@ **/
    // use default value for now
    shortTail_D30.PROGRESS_COLOR = '0066cc';//'%progress_color%';
    
    shortTail_D30.MODE_WRAPPER = 1;
    shortTail_D30.MODE_INLINE = 0;

    /** @@Set by the Player Creator@@ **/
    //shortTail_D30.MODE_WRAPPER or shortTail_D30.MODE_INLINE
    shortTail_D30.PLAYER_MODE = shortTail_D30.MODE_WRAPPER;


    /** @@Set by the player creator@@ **/
    shortTail_D30.AD_SLOT_IMAGE_URL = shortTail_D30.CDN_CONTAINER_URL+'/';
    /** @@Set by the Player Creator@@ **/ 
    shortTail_D30.AD_SLOT_IMAGE_CLICK_THROUGH_URL = '';

    /** @@Set by the Player Creator@@ **/
    shortTail_D30.AD_SLOT_SIZE = '1x1';

    /** @@Set by the Player Creator@@ **/
    //NOTE: tracker URL only used in MODE_WRAPPER
    shortTail_D30.ANALYTICS_TRACKER_URL='http://video.adtouch.com/api/tracker?pid='+shortTail_D30.APPNEXUS_CREATIVE_ID+'&adid='+shortTail_D30.APPNEXUS_CREATIVE_ID+'&size='+shortTail_D30.AD_SLOT_SIZE+'&';

    shortTail_D30.AUTO_LAUNCH = 0;
    shortTail_D30.content = 'shortTail_D30_content';
    shortTail_D30.ready = false;
    shortTail_D30.modal = 'shortTail_D30_modal';
    shortTail_D30.ieFix = false;
    shortTail_D30.version = '04_30_10_0323PM';
    shortTail_D30.width = '800';
    shortTail_D30.height = '525';
    shortTail_D30.useModalAlphaTween = true;
    shortTail_D30.activeTweens = [];
    shortTail_D30.tweenFrameRate = 60;
    shortTail_D30.alphaTweenDuration = 0.3;

    /** @@Set by the Player Creator@@ **/ //The Player Opacity
    shortTail_D30.modalAlpha = 0.7;

    /** @@Set by the Player Creator@@ **/ 
    shortTail_D30.CLICK_THROUGH_URL = 'http://ib.adnxs.com/clktrb?id=260646';
    
    /** @@Set by the Player Creator@@ **/ 
    shortTail_D30.TWITTER_URL = '%twitter_url%';
    
    /** @@Set by the Player Creator@@ **/ 
    shortTail_D30.FACEBOOK_URL = '%facebook_url%';
    
    /** @@Set by the Player Creator@@ **/ 
    shortTail_D30.LOGO_FILE = '%logo_file%';
    shortTail_D30.LOGO_URL = shortTail_D30.CDN_CONTAINER_URL+'/%logo_file%';
    
    shortTail_D30.log = function(message) {
        window.log = function(){
            log.history = log.history || [];   // store logs to an array for reference
            log.history.push(arguments);
            if(this.console){
                console.log( Array.prototype.slice.call(arguments) );
            }
        };
        log(message);
    }; 
    shortTail_D30.embed = function(){
        shortTail_D30.log('top.document.addEventListener: ' +top.document.addEventListener);
        shortTail_D30.log('top.document.attachEvent: '+top.document.attachEvent);
        if (top.document.addEventListener) {
            top.document.addEventListener(
                "DOMContentLoaded",
                function(){top.document.removeEventListener("DOMContentLoaded", arguments.callee, false ); top.shortTail_D30.onPageLoaded();},
                false
            );
            window.addEventListener("load",
                function(){window.removeEventListener("DOMContentLoaded", arguments.callee, false); top.shortTail_D30.onPageLoaded();},
                false
            );
        }
        else if (top.document.attachEvent) {
            top.document.attachEvent("onreadystatechange", function(){
                if(top.document.readyState === "complete"){
                    top.document.detachEvent("onreadystatechange", arguments.callee);
                    top.shortTail_D30.onPageLoaded();
                }
            });

            if (top.document.documentElement.doScroll) (function(){
                if(top.shortTail_D30.ready)
                    return;

                try {
                    // If IE is used, use the trick by Diego Perini
                    // http://javascript.nwbox.com/IEContentLoaded/
                    top.document.documentElement.doScroll("left");
                } catch( error ) {
                    setTimeout( arguments.callee, 0 );
                    return;
                }
                // and execute any waiting functions
                top.shortTail_D30.onPageLoaded();
            })();

            top.document.attachEvent("onload", function(){
                top.document.detachEvent("onload", arguments.callee);
                top.shortTail_D30.onPageLoaded();
            });
        }
        (function(){
            top.window.status = top.document.readyState;
            if (top.document.readyState == "complete") {
                top.shortTail_D30.onPageLoaded();
            }
            else {
                setTimeout(arguments.callee, 1000);
            }
        })();
    };


    shortTail_D30.writeScript = function(p_src) {
        var container = top.document.getElementsByTagName("head").length > 0
                        ? top.document.getElementsByTagName("head")[0] : top.document.getElementsByTagName("body")[0];
        var tag = top.document.createElement('script');
        tag.setAttribute('src', p_src);
        tag.setAttribute('type', 'text/javascript');
        tag.setAttribute('language', 'JavaScript');
        container.appendChild(tag);
        void(tag);
    };

    shortTail_D30.start = function() {
        if (!top.swfobject_D30.hasFlashPlayerVersion("9.0.115")) {
            return
        };

        var version = top.shortTail_D30.getInternetExplorerVersion(),
            mode = top.shortTail_D30.getInternetExplorerMode(),
            hostPage = top.location.href ? top.location.href : '',
            hostReferrer = top.document.referrer ? top.document.referrer : '',
            viewWidth = top.shortTail_D30.getViewWidth(),
            viewHeight = top.shortTail_D30.getViewHeight();

        top.shortTail_D30.ieFix = (version < 7.0 || mode == 'BackCompat') ? true : false;

        top.shortTail_D30.width = viewWidth < top.shortTail_D30.width ? viewWidth : top.shortTail_D30.width;
        top.shortTail_D30.height = viewHeight < top.shortTail_D30.height ? viewHeight : top.shortTail_D30.height;

        if (top.document.getElementById('shortTail_D30_modal') == null) {
            var modal = top.shortTail_D30.modal = top.document.createElement('div');
            modal.id = 'shortTail_D30_modal';
            modal.style.top = 0;
            modal.style.width = '100%';
            modal.style.height = '100%';
            modal.style.left = 0;
            modal.style.margin = 0;
            modal.style.opacity = 0.0;
            modal.style.overflow = 'hidden';
            modal.style.filter = 'alpha(opacity=0)';
            modal.style.background = '#000';
            modal.style.position = top.shortTail_D30.ieFix ? 'absolute' : 'fixed';
            top.document.getElementsByTagName("body")[0].appendChild(modal);
        }

        if (top.document.getElementById('shortTail_D30_content') == null) {
            var content = top.shortTail_D30.content = top.document.createElement('div');
            content.id = 'shortTail_D30_content';
            content.style.margin = 0;
            content.style.display = 'block';
            content.style.width = top.shortTail_D30.width + 'px';
            content.style.height = top.shortTail_D30.height + 'px';
            content.style.position = top.shortTail_D30.ieFix ? 'absolute' : 'fixed';
            content.innerHTML = '<div id="shortTail_D30_swf"></div>';
            top.document.getElementsByTagName("body")[0].appendChild(content);
        }

        top.swfobject_D30.embedSWF( top.shortTail_D30.URL_D30,
                                    "shortTail_D30_swf",
                                    top.shortTail_D30.width,
                                    top.shortTail_D30.height,
                                    "9.0.115",
                                    "expressInstall.swf",
                                    {
                                        hostPage:escape(hostPage),
                                        hostReferrer:escape(hostReferrer),
                                        VastXML:escape(top.shortTail_D30.vastXML)
                                    },
                                    {
                                        bgcolor:"#000000",
                                        allowScriptAccess:"always",
                                        wmode:"transparent"
                                    });
        top.shortTail_D30.onResized();
        top.shortTail_D30.processTimer = setInterval(function(){
                        top.shortTail_D30.setVisibilityForConflictElements(false);
                    }, 250);
    };


    shortTail_D30.showModal = function () {
        if (top.window.addEventListener) {
            top.window.addEventListener('resize', top.shortTail_D30.onResized, false);
        } else if (top.window.attachEvent ) {
            top.window.attachEvent('onresize', top.shortTail_D30.onResized);
            if (top.shortTail_D30.ieFix) {
                top.window.attachEvent('onscroll', top.shortTail_D30.onScroll);
            }
        }
        if (top.shortTail_D30.useModalAlphaTween) {
            top.shortTail_D30.addAlphaTween(top.shortTail_D30.modal.style,
                                            top.shortTail_D30.modalAlpha,
                                            top.shortTail_D30.alphaTweenDuration,
                                            function(){});
        }
        else {
            top.shortTail_D30.modal.style.opacity = top.shortTail_D30.modalAlpha;
            top.shortTail_D30.modal.style.filter = 'alpha(opacity=' + top.shortTail_D30.modalAlpha * 100 + ')';
            top.shortTail_D30.onResized();
        }
        top.shortTail_D30.modal.style.zIndex = 2147483647;
        top.shortTail_D30.content.style.zIndex = 2147483647;
    };


    shortTail_D30.clear = function() {
        var content = top.shortTail_D30.content;
            content.innerHTML = "";
        content.style.width = '1px';
        content.style.height = '1px';
    };


    shortTail_D30.closeModal = function () {
        if (top.shortTail_D30.useModalAlphaTween) {
            top.shortTail_D30.addAlphaTween(top.shortTail_D30.modal.style,
                                            0.0,
                                            top.shortTail_D30.alphaTweenDuration,
                                            function(){
                                                top.shortTail_D30.closeModalAfterTween();
                                            });
        }
        else {
            top.shortTail_D30.closeModalAfterTween();
        }
    };


    shortTail_D30.closeModalAfterTween = function () {
        top.shortTail_D30.modal.style.display = 'none';
        top.shortTail_D30.modal.innerHTML = '';
        top.shortTail_D30.content.style.display = 'none';

        if (top.window.removeEventListener) {
            top.window.removeEventListener('resize', top.shortTail_D30.onResized, false);
        } else if (top.window.removeEvent) {
            top.window.removeEvent('onresize', top.shortTail_D30.onResized);
            if (top.shortTail_D30.ieFix){
                top.window.removeEvent('onscroll', top.shortTail_D30.onScroll);
            }
        }

        // SAFARI throws an error if attempting to kill out from an ExternalInterface call
        setTimeout("top.shortTail_D30.clear();", 250);
        try {
            top.shortTail_D30_onClose();
        } catch(e) {
            //throw away expection???
        }
        clearInterval(top.shortTail_D30.processTimer);
        top.shortTail_D30.setVisibilityForConflictElements(true);
    };


    shortTail_D30.setVisibilityForConflictElements = function(p_visible) {
        var d = top.document,
            element,
            elements,
            elementItr,
            tag,
            tags = ["SELECT", "INPUT", "IFRAME", "OBJECT", "EMBED"],
            tagItr = tags.length,
            visibility = p_visible ? "visible" : "hidden";

        while(tagItr--) {
            tag = tags[tagItr];
            elements = d.getElementsByTagName(tag);
            elementItr = elements.length;
            while (elementItr--) {
                element = elements[elementItr];
                if (((!p_visible) &&
                    (element.style.visibility == visibility) &&
                    element.getAttribute("d30Tagged")) != 1) {

                    element.setAttribute("previouslyHidden", "1");
                }
                element.setAttribute("d30Tagged", "1");
                if (element.getAttribute("previouslyHidden") != 1 || element.style.visibility != visibility) {
                    if(
                        (tag == "SELECT")||
                        ((tag == "INPUT")&&(element.type=="text"))||
                        ((tag =="IFRAME"))||
                        (((tag=="OBJECT")||(tag=="EMBED")) && (element.id.indexOf("shortTail_D30") == -1))) {
                            element.style.visibility = visibility;
                    }
                }
            }
        }
    };


    shortTail_D30.onPageLoaded = function() {
        if(top.shortTail_D30.ready) return;

        top.shortTail_D30.ready = true;

        if (top.swfobject_D30 == undefined){
            top.shortTail_D30.writeScript(top.shortTail_D30.URL_SWFOBJECT);
        }

        top.shortTail_D30.initTimer = setInterval(function() {
            if (top.swfobject_D30 != undefined) {
                clearInterval(top.shortTail_D30.initTimer);
                top.shortTail_D30.start();
            }
        }, 100);
    };


    shortTail_D30.onVPAIDEvent = function(p_event){
        try {
            top.shortTail_D30_onVPAIDEvent(p_event);
        } catch(e) {
            //throw away exception???
        }
    };

    shortTail_D30.onResized = function() {
        var viewWidth = top.shortTail_D30.getViewWidth(),
            viewHeight = top.shortTail_D30.getViewHeight();

        top.shortTail_D30.content.style.left = Math.round((viewWidth - top.shortTail_D30.width) / 2) + 'px';

        if (top.shortTail_D30.ieFix) {
            top.shortTail_D30.content.style.top = Math.round(((viewHeight - top.shortTail_D30.height) / 2) + top.document.documentElement.scrollTop) + 'px';
            top.shortTail_D30.modal.style.top = top.document.documentElement.scrollTop;
            top.shortTail_D30.modal.style.height = viewHeight + 20;
        }
        else {
            top.shortTail_D30.content.style.top = Math.round((viewHeight - top.shortTail_D30.height) / 2) + 'px';
        }
    };

    shortTail_D30.getViewWidth = function() {
        if (typeof top.window.innerWidth != 'undefined') {
            return top.window.innerWidth;
        } else if (typeof top.document.documentElement != 'undefined' &&
                   typeof top.document.documentElement.clientWidth != 'undefined' &&
                   top.document.documentElement.clientWidth != 0) {

            return top.document.documentElement.clientWidth;
        } else {
            return top.document.getElementsByTagName('body')[0].clientWidth;
        }
        return 0;
    };


    shortTail_D30.getViewHeight = function() {
        if (typeof top.window.innerWidth != 'undefined') {
            return top.window.innerHeight;
        } else if (typeof top.document.documentElement != 'undefined' &&
                   typeof top.document.documentElement.clientWidth != 'undefined' &&
                   top.document.documentElement.clientWidth != 0) {

            return top.document.documentElement.clientHeight;
        } else {
            return top.document.getElementsByTagName('body')[0].clientHeight;
        }
        return 0;
    };


    shortTail_D30.onScroll = function() {
            top.shortTail_D30.content.style.top = Math.round(((top.document.documentElement.clientHeight - top.shortTail_D30.height) / 2) + top.document.documentElement.scrollTop) + 'px';
            top.shortTail_D30.modal.style.top = top.document.documentElement.scrollTop;
    };


    shortTail_D30.getInternetExplorerVersion = function() {
        var rv = 99999;
        if (navigator.appName == 'Microsoft Internet Explorer') {
        var ua = navigator.userAgent;
        var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
        if (re.exec(ua) != null)
            rv = parseFloat( RegExp.$1 );
        }
        return rv;
    };


    shortTail_D30.getInternetExplorerMode = function() {
        var mode = '';
        if (navigator.appName == 'Microsoft Internet Explorer'){
            mode = top.document.compatMode;
        }
        return mode;
    };


    shortTail_D30.tweenLoop = function() {
        var now = (new Date() - 0);
        for (var i = 0; i < top.shortTail_D30.activeTweens.length; i++) {
            var tween = top.shortTail_D30.activeTweens[i],
                start = now - tween.startTime,
                delta = tween.endTime - tween.startTime;
            if (start >= delta) {
                var val = tween.b + tween.c;
                tween.target.opacity = val;
                tween.target.filter = 'alpha(opacity = ' + (val*100) + ')';
                top.shortTail_D30.activeTweens.splice(i,1);
                if (typeof tween.onComplete == 'function') {
                    tween.onComplete();
                }
            }
            else {
                var val = tween.c*start/delta + tween.b;
                try {
                    // FIXME: IE sometimes throws error...
                    tween.target.opacity = val;
                    tween.target.filter = 'alpha(opacity = ' + (val*100) + ')';
                } catch(e) {}
            }
        }
        if (top.shortTail_D30.activeTweens.length > 0) {
            setTimeout( function() {
                            top.shortTail_D30.tweenLoop();
                        },
                        1000/top.shortTail_D30.tweenFrameRate);
        }
    };


    shortTail_D30.addAlphaTween = function(p_obj, p_val, p_dur, p_func) {
        var tween = {};
        tween.target = p_obj;

        // hardcode current alpha to avoid having
        // to hack out code for getting opacity in ie.
        // can use p_obj.opacity in other browsers
        tween.b = p_val <= 0 ? top.shortTail_D30.modalAlpha : 0;

        tween.c = p_val - tween.b;
        tween.duration = p_dur;
        tween.onComplete = p_func;
        tween.startTime = (new Date() - 0);
        tween.endTime = tween.duration * 1000 + tween.startTime;

        top.shortTail_D30.activeTweens[top.shortTail_D30.activeTweens.length] = tween;
        if (top.shortTail_D30.activeTweens.length == 1) {
            top.shortTail_D30.tweenLoop();
        }
    };

    top.shortTail_D30 = shortTail_D30;

    /**
     * Function to load the VAST XML from a URL
     * @author Ram
     */
    shortTail_D30.loadXHR = function (url){
        //reset the vastXMl variable
        shortTail_D30.vastXML = '<vast />';
        if(typeof ADGENT_APPNEXUS_PREVIEW_MODE !== 'undefined'){
            url=url+'&preview=true';
        }
        shortTail_D30.log('D30 APP: RAM: URL='+url);
        var xmlhttp;
        if (window.XMLHttpRequest){// code for IE7+, Firefox, Chrome, Opera, Safari
            xmlhttp=new XMLHttpRequest();
        }else{// code for IE6, IE5
            xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
        }
        xmlhttp.onreadystatechange = function(){
            shortTail_D30.handleResponse(xmlhttp);
        }
        //url = 'http://ib.adnxs.com/ttj?id=839276&size=300x600';
        xmlhttp.open("GET",url,true);
        xmlhttp.send('');
    }
    /**
     * Function to load handle the response of the server
     * @author Ram
     * @todo Change shortTail_D30.log to trackEvent
     */
    shortTail_D30.handleResponse = function(xmlhttp){
        /*if( xmlhttp.readyState == 0 ) {
            shortTail_D30.log("UNITIALIZED");
        }
        else if( xmlhttp.readyState == 1 ) {
            shortTail_D30.log("LOADING");
        }
        else if( xmlhttp.readyState == 2 ) {
            shortTail_D30.log("LOADED");
        }
        else if( xmlhttp.readyState == 3 ) {
            shortTail_D30.log("INTERACTIVE");
        }
        else */
        if( xmlhttp.readyState == 4 ) {
            shortTail_D30.log("COMPLETE");
            if( xmlhttp.status == 200 ) {
                //shortTail_D30.log(req.responseText);
                shortTail_D30.log('D30 APP: RAM: responseText='+xmlhttp.responseText);
                //shortTail_D30.log('D30 APP: RAM: responseXML='+xmlhttp.responseXML);
                shortTail_D30.vastXML = xmlhttp.responseText;
                var regex = new RegExp('\<vast\\s?\/\>','im');
                if(!regex.test(shortTail_D30.vastXML)){
                    shortTail_D30.embed();
                }
            }
        }
    }
    /**
     * Function to launch the D30 player.
     * Decides whether the embedded VAST xml should be used or the one that is
     * loaded fromt the XHR
     * @author Ram
     */
    shortTail_D30.launchPlayer = function (){
        if(shortTail_D30.AD_SLOT_SIZE!='1x1'){
            if(shortTail_D30.AD_SLOT_IMAGE_URL !=''){
                if(shortTail_D30.AD_SLOT_IMAGE_CLICK_THROUGH_URL != ''){
                    document.write('<a href="'+shortTail_D30.AD_SLOT_IMAGE_CLICK_THROUGH_URL+'" target=_blank><img src="'+shortTail_D30.AD_SLOT_IMAGE_URL+'" border=0></a>');
                }else{
                    if(shortTail_D30.AUTO_LAUNCH){
                        top.shortTail_D30.content = top.document.getElementById(top.shortTail_D30.content);
                        top.shortTail_D30.modal   = top.document.getElementById(top.shortTail_D30.modal);
                        
                        document.write('<a target=_top href="javascript:if(top.shortTail_D30.content){var parent = top.document.getElementsByTagName(\'body\')[0];parent.removeChild(top.shortTail_D30.content);parent.removeChild(top.shortTail_D30.modal);top.shortTail_D30.content = null;top.shortTail_D30.modal = null;top.shortTail_D30.start();}else{top.shortTail_D30.embed();}"><img src="'+shortTail_D30.AD_SLOT_IMAGE_URL+'" border=0></a>');  
                    }else{
                        document.write('<img src="'+shortTail_D30.AD_SLOT_IMAGE_URL+'" border=0>');
                    }
                }
            }
        }
        if(shortTail_D30.IS_APPNEXUS_PLAYER_APP){
            shortTail_D30.log('shortTail_D30.IS_APPNEXUS_PLAYER_APP: '+ shortTail_D30.IS_APPNEXUS_PLAYER_APP);
            shortTail_D30.log('shortTail_D30.PLAYER_MODE: '+ shortTail_D30.PLAYER_MODE);
            switch(shortTail_D30.PLAYER_MODE){
                case shortTail_D30.MODE_INLINE:
                    //retreive the VAST XML from backend servers
                    var url = shortTail_D30.APPNEXUS_SERVER + shortTail_D30.APPNEXUS_CREATIVE_ID +
                                '&opacity='+ shortTail_D30.modalAlpha +
                                '&time='+ shortTail_D30.REQUIRED_VIEWING_TIME +
                                '&muted='+shortTail_D30.MUTED +
                                '&volume='+shortTail_D30.VOLUME_LEVEL;
                    shortTail_D30.loadXHR(url);
                    break;
                case shortTail_D30.MODE_WRAPPER:
                    shortTail_D30.log(shortTail_D30.vastXML);
                    //VAST Tag is embedded .. so just launch it
                    shortTail_D30.embed();
                    break;
                default:
                    shortTail_D30.log("Error: Unknow Mode. Could not launch player");
            }
        }else{
            if(!shortTail_D30.AUTO_LAUNCH){
              // ok normal loading .. just launch the player
              shortTail_D30.embed();
            }
        }
    };
    //the code below invokes the click tracker 
    shortTail_D30.trackThirdParty = function(tracker) {
      if (tracker) {
        var image = new Image();//Image;
        image.src = pubclick;
      }
    }
    /*
     * The VASTXML string var that is passed into the constructor as VAST string
     * Ad servers should template this string so that it creates a valid VAST document within the one line string.
     * The D30 JavaScript will the embed the VAST string into the D30 Flash module when the ad is run.
     */
     /** @@Set by player creator@@ */
    shortTail_D30.vastXML= '<?xml version="1.0"?><VAST version="2.0"><Ad id="91527"><InLine><AdSystem>AppNexus</AdSystem><AdTitle/><Error><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22imp_tracked%22%3Atrue%2C%22noplay%22%3Atrue%7D]]></Error><Impression><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22imp%22%3Atrue%7D]]></Impression><Impression><![CDATA[]]></Impression><Creatives><Creative sequence="1"><Linear><Duration/><TrackingEvents><Tracking event="start"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22start%22%3Atrue%7D]]></Tracking><Tracking event="midpoint"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22midpoint%22%3Atrue%7D]]></Tracking><Tracking event="firstQuartile"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22fqtl%22%3Atrue%7D]]></Tracking><Tracking event="thirdQuartile"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22tqtl%22%3Atrue%7D]]></Tracking><Tracking event="complete"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22complete%22%3Atrue%7D]]></Tracking><Tracking event="mute"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22mute%22%3Atrue%7D]]></Tracking><Tracking event="unmute"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22unmute%22%3Atrue%7D]]></Tracking><Tracking event="pause"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22pause%22%3Atrue%7D]]></Tracking><Tracking event="rewind"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&timestamp=1384186763&json=%7B%22rewind%22%3Atrue%7D]]></Tracking><Tracking event="resume"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22resume%22%3Atrue%7D]]></Tracking><Tracking event="fullscreen"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22fullscreen%22%3Atrue%7D]]></Tracking><Tracking event="expand"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22expand%22%3Atrue%7D]]></Tracking><Tracking event="collapse"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22collapse%22%3Atrue%7D]]></Tracking><Tracking event="acceptInvitation"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22acceptInvitation%22%3Atrue%7D]]></Tracking><Tracking event="close"><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B%22close%22%3Atrue%7D]]></Tracking></TrackingEvents><VideoClicks><ClickThrough><![CDATA[http://ib.adnxs.com/clktrb?id=260646]]></ClickThrough><ClickTracking><![CDATA[http://video.adtouch.com/api/tracker?pid=10235324&adid=91527&json=%7B"link_clicked"%3Atrue%7D]]></ClickTracking></VideoClicks><MediaFiles><MediaFile delivery="progressive" type="video/x-flv" bitrate="96" height="480" width="640"><![CDATA[http://cdn.video.adtouch.com/d30-creatives-production-7707-10235324/d30-creatives-video-7707.flv]]></MediaFile></MediaFiles></Linear></Creative></Creatives><Extensions><Extension type="D30Config"><BaseColor>000000</BaseColor><FontColor>ffffff</FontColor><ProgressColor>0066cc</ProgressColor><SponsorExtrasBgrndColor>000000</SponsorExtrasBgrndColor><SponsorExtrasLabel>Click for extra content</SponsorExtrasLabel><AutoPlay>true</AutoPlay><ScaleMode>uniform</ScaleMode><SecsRequiredToView>0</SecsRequiredToView><LogoVisible>false</LogoVisible><LogoSecsVisible>0</LogoSecsVisible><Volume>0.5</Volume><Muted>true</Muted><VMEnabled>false</VMEnabled><BaseVisible>true</BaseVisible><SecsAllowedToView>0</SecsAllowedToView><SecsAllowedToViewCloseDelay>0</SecsAllowedToViewCloseDelay><SecsAllowedToViewLabel/><AdCountdownLabel>Ad ends in ${TIME}</AdCountdownLabel><SponsorByLabel>THIS CONTENT IS SPONSORED BY</SponsorByLabel></Extension></Extensions></InLine></Ad></VAST>';
    //Launch the player after processing the options
    shortTail_D30.launchPlayer();
    //Track the impression
    shortTail_D30.trackThirdParty(shortTail_D30.THIRD_PARTY_TRACKING_URL);
};

