/************************************************************
 * Last Edited by: Errol Dunlap
 * Date Modified: 08-6-2013
 * CMS Version: 199
 * Description: Contains New Omniture values for gallery redesign
************************************************************/
// Let's start with galleries first
//alert("Loaded ots_omniture_tracker js");
var omnitureTrackedEvents = new Array();
omnitureTrackedEvents[30] = "Full Page Slideshow Auto Next";
omnitureTrackedEvents[43] = "Slideshow Tracker Autoplay";
omnitureTrackedEvents[44] = "Slideshow Tracker User Initiated";
omnitureTrackedEvents[85] = "Inline Slideshow Tracker";


omnitureTrackedEvents[1] = "Next arrow on photo";
omnitureTrackedEvents[2] = "Previous arrow on photo";
omnitureTrackedEvents[3] = "Photo in filmstrip";
omnitureTrackedEvents[4] = "Right arrow in filmstrip";
omnitureTrackedEvents[5] = "Left arrow in filmstrip";
omnitureTrackedEvents[6] = "Share in upper left (any slide but end slide)";
omnitureTrackedEvents[7] = "Play gallery button in lower left";
omnitureTrackedEvents[8] = "Bottom replay gallery on end slide";

function doOmnitureTracker(evt,eventNumber, doPageRefresh, forwardToUrl, firedPlace) {
    if(nbc.env == "dev." || nbc.env=="stage.") {
	//U.log("doOmnitureTracking has fired.");

    }
    var _reportSuiteID = "";
    var _pageName = ""; // Document.title for slideshows, or event name for any others. Example: "The%20Obamas%27%20Trip%20to%20Europe%20in%20Photos" or "Media%20Viewer%20Next%20Page%20Click".
    var _eventNumber = ""; // The event number passed in as first param, with some additional info appended later
    var _randomValue = "&rndm=" + Math.random() * 10000000000000000;
    var doNothing = false; // used to handle muiltiple clicks
    if(nbcu_account == "undefined" || eventNumber == "undefined") {
        // still need to forward
        if(U.isNotNull(forwardToUrl)) {
            document.location = forwardToUrl;
        }
        return false;
    } else {
        // put prarams that are globally necessary here
        _eventNumber = "event" + eventNumber; // later sometimes overwritten
        var envParam = nbc.env;
        _reportSuiteID = nbcu_account; // later overwritten if the event is not one of the ones specifically handled below.
        // slideshow and section page subNav clicks (count as new page view)
        if(eventNumber == 30 || eventNumber == 43 || eventNumber == 44 || eventNumber == 85) {
            if(eventNumber == 30) { // auto next slideshow
                _c4 = "&c4=" + subSection;
                _c15 = "&c15=D%3dch%2b%22%7c%22%2bc4";
                _eventNumber = "event" + eventNumber;
                _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g, ''); // strip whitespace
            } else if(eventNumber == 43 || eventNumber == 44 || eventNumber == 85) { // slideshow
                //alert("Testing ots_omniture_tracker eventnumber: "+ eventNumber);
                _eventNumber = "event" + eventNumber + ",event2"; // event 6 records a page view
                if(eventNumber == 43) {
                    if((nbc.galleryVideo) && (nbc.galleryVideo.title != "")) {
                        nbcSlideshowTitle = nbc.galleryVideo.title;
                    }
                }
                
                var nbcSlideshowTitle = nbc.omniture.pageType;
                
                if(nbcSlideshowTitle == "article" || nbcSlideshowTitle == "blog") { // for embedded slideshows
                    // Start Omniture Values
                    if(nbc.omniture.pageType == "home") {
                        var getGalleryName = jQuery("#slideshowModule p.showTitle .galleryTitle").text();
                        var _galleryName = getGalleryName.replace(/\'+|\"+|\‚Äô+|\‚Äò+|\¬ª+|\¬´+|\‚Äú+|\‚Äù/g,'');
                        var _currentPhotoValue = jQuery("#slideshowModule p.showTitle #slideCounter span").text();
                        var _currentGalleryID = jQuery("#multimedia-module #currentMMID").text();
                        nbcu.pageName = "home:home page:detail content page";
                    }
                    else {
                    if (jQuery(".slideshow_embed .pg_article h1").text() != "") {
                        var getGalleryName = jQuery(".slideshow_embed .pg_article h1").text();
                        galleryContainer = ".slideshow_embed .pg_article";
                    } else {
                        var getGalleryName = jQuery("#leadGallery .pg_article h1").text();
                        galleryContainer = "#leadGallery .pg_article";
                    }    
                        var _galleryName = getGalleryName.replace(/\'+|\"+|\‚Äô+|\‚Äò+|\¬ª+|\¬´+|\‚Äú+|\‚Äù/g,'');
                        var _currentPhotoValue = parseInt(jQuery(galleryContainer + " .pg_article_counts_current").text());
                        var _currentGalleryID = jQuery(galleryContainer).attr("data-id");
                        
                        
                        if(jQuery(galleryContainer+" .pg_article_thumbnails_current").data('index') == parseInt(jQuery(galleryContainer+" .pg_article_counts_total").text())-1){
                        	_nonPhotoContent = " | End Card";
                        } else {
                        	_nonPhotoContent = "";
                        }
                        if (jQuery(galleryContainer+ " .interstitial").attr('data-name') != "") {
                        	_nonPhotoContent = jQuery(galleryContainer+ " .interstitial").attr('data-name');
                        } else {
                        	_nonPhotoContent = "";
                        }
                    }
                    
                    
                    // RESET START
                    nbcu.prop21 = "";//_currentGalleryID;
                    nbcu.eVar21 = "";//_currentGalleryID;
                    nbcu.prop22 = _galleryName;
                    nbcu.eVar22 = _galleryName;
                    nbcu.prop25 = "";
                    nbcu.eVar25 = "";
                    nbcu.prop27 = "";
                    nbcu.eVar27 = "";
                    nbcu.prop28 = "";
                    nbcu.eVar28 = "";
                    nbcu.eVar44 = "";
                        nbcu.prop49 = _galleryName;
                        nbcu.eVar49 = _galleryName;
                        nbcu.eVar61 = _galleryName;
                        nbcu.prop62 = _galleryName;
                    
                    //alert("Reset vars");
                    // RESET END
                    if(_currentPhotoValue == "1" || _currentPhotoValue == 1){
                    	nbcu.prop21 = "";//_currentGalleryID;
                    	nbcu.eVar21 = "";//_currentGalleryID;
                    	nbcu.prop22 = _galleryName;
                    	nbcu.eVar22 = _galleryName;
                        nbcu.prop23 = "slideshow-article";
                        nbcu.eVar23 = "slideshow-article";
                        nbcu.prop49 = _galleryName;
                        nbcu.eVar49 = _galleryName;
                        nbcu.prop61 = _galleryName;
                        nbcu.eVar61 = _galleryName;
                        nbcu.prop62 = _galleryName;
                   	nbcu.prop27 = "";
                        //U.log("Set props for first photo");
                    }
                    else {
                    
                        nbcu.prop23 = "slideshow-article";
                        nbcu.eVar23 = "slideshow-article";
                        nbcu.prop61 = "";
                        nbcu.prop49 = "";
                    	nbcu.prop27 = "";
                        //U.log("Photo number: " + _currentPhotoValue);
                    }
                    
                    // NEW LOGIC FOR INTERSTITIAL ON ARTICLE
                    if(jQuery("#leadGallery .pg_article_thumbnails_current").data('index') == parseInt(jQuery("#slideShowGallery .pg_article_counts_total").text())-1){
                   		_nonPhotoContent = " | End Card";
                   		//console.log("_nonPhotoContent || IF " + _nonPhotoContent);
                   	} else {
                        	_nonPhotoContent = "";
                        }
                        if(jQuery(galleryContainer+" .interstitial").attr('data-name') != ""){
	                   	_nonPhotoContent = jQuery(galleryContainer+" .interstitial").attr('data-name');
	                   	//console.log("_nonPhotoContent || ELSE IF " + _nonPhotoContent);
                   	} else {
                        _nonPhotoContent = "";
                        //console.log("_nonPhotoContent || ELSE" + _nonPhotoContent);
                   	}
                    // NEW LOGIC FOR INTERSTITIAL ON ARTICLE
                    
                    
                    if( evt && (evt.target.className =="playing" || evt.target.className =="paused") ) {
                    	nbcu.prop62 = evt.target.className;
                    	//U.log("PROP 62 IS CHANGED");
                        } else {
                        	if(typeof _nonPhotoContent == "undefined") {
                        		_nonPhotoContent = "";
                        	}
                        nbcu.prop62 = _galleryName + " Photo " + _currentPhotoValue + "" + _nonPhotoContent;
                        //U.log("PROP 62 IS DEFAULT");
                        }
                    
                    nbcu.eVar62 = "D=c62";
                    if(nbc.omniture.pageType == "home"){
                        if(eventNumber == 43) {
                            nbcu.prop63 = "home page photo player-autoplay";
                        } else if(eventNumber == 44) {
                            nbcu.prop63 = "home page photo player-user engaged";
                        }
                        nbcu.eVar63 = "home page photo player";
                    } else {
                        if(eventNumber == 43) {
                            nbcu.prop63 = "full photo player-autoplay";
                            nbcu.eVar63 = "full photo player-autoplay";
                        } else if(eventNumber == 44) {
                            nbcu.prop63 = "full photo player-user engaged";
                            nbcu.eVar63 = "full photo player-user engaged";
                        }
                    }
                    	nbcu.prop21 = _currentGalleryID;
                    	nbcu.eVar21 = _currentGalleryID;
                    if(pg.galleryMetadata.sponsored == true) {
                    nbcu.prop74 = "gallery sponsored";
                    } else {
                    nbcu.prop74 = "";	
                    }
                    nbcu.eVar74 = "";
                    nbcu.products = "";
                    nbcu.prop20 = "";
                    nbcu.eVar27 = "";
                    nbcu.eVar36 = "";
                    nbcu.eVar37 = "";
                    nbcu.eVar38 = "";
                    nbcu.eVar39 = "";
                    nbcu.eVar40 = "";
                    
                    nbcu.prop45 = "";
                    nbcu.eVar45 = "";
                    nbcu.prop46 = "";
                    nbcu.eVar47 = "";
                    nbcu.eVar48 = "";
                    nbcu.prop50 = "";
                    nbcu.eVar50 = "";
                    
                    if( evt && (evt.target.className =="playing" || evt.target.className =="paused") ) {
                    	nbcu.events = "";
                    } else {
                    	nbcu.events = _eventNumber;
                    	
                    }
                    // End Omniture Values
                    //U.log("Set all props and evars");
                } else { //////////////// for full-page slideshows
                    _pageName = nbc.section + ":" + nbc.subsection + ":gallery page";
                    _galleryName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,'');
                    if(_galleryName.match('|')) { // only use that part of the title before any pipe
                        _galleryName = _galleryName.split('|')[0];
                    }
                    // _pageViewEvent = nbcu.events + "=event1";
                    _currentPhotoValue = parseInt(jQuery("#slideShowGallery .pg_article_counts_current").text()); //OLD $('#slideCount span').html(); // Set current photo number for Omniture
                    
                    
                    
                    if(jQuery("#slideShowGallery .pg_article_thumbnails_current").data('index') == parseInt(jQuery("#slideShowGallery .pg_article_counts_total").text())-1){
                   		_nonPhotoContent = " | End Card";
                   		//console.log("_nonPhotoContent || " + _nonPhotoContent);
                   	} else {
                        	_nonPhotoContent = "";
                        }
                        if(jQuery("#slideShowGallery .interstitial").attr('data-name') != ""){
	                   	_nonPhotoContent = jQuery("#slideShowGallery .interstitial").attr('data-name');
	                   	//console.log("_nonPhotoContent || " + _nonPhotoContent);
                   	} else {
                        _nonPhotoContent = "";
                        //console.log("_nonPhotoContent || " + _nonPhotoContent);
                   	}
                        
                    if(_currentPhotoValue == 1 || _currentPhotoValue == "1"){
                        nbcu.prop61 = _galleryName;
                    }else{
                    	nbcu.prop61 = "";
                    }
                    if(evt && (evt.target.className =="playing" || evt.target.className =="paused") ) {
                    	nbcu.prop62 = evt.target.className;
                    	//U.log("PROP 62 IS CHANGED");
                        } else {
                        	if(typeof _nonPhotoContent == "undefined") {
                        		_nonPhotoContent = "";
                        	}
                        nbcu.prop62 = _galleryName + " Photo " + _currentPhotoValue + "" + _nonPhotoContent;
                        //U.log("PROP 62 IS DEFAULT");
                        }
                    nbcu.eVar62 = "D=c62";
                    if(eventNumber == 43) {
                        nbcu.prop63 = "full photo player-autoplay";
                        nbcu.eVar63 = "full photo player-autoplay";
                    } else if(eventNumber == 44) {
                        nbcu.prop63 = "full photo player-user engaged";
                        nbcu.eVar63 = "full photo player-user engaged";
                    }
                    
                        nbcu.prop23 = "slideshow";
                        nbcu.eVar23 = "slideshow";
                        if(pg.galleryMetadata.sponsored == true) {
                            nbcu.prop74 = "gallery sponsored";
                            } else {
                            nbcu.prop74 = "";	
                            }
                    nbcu.eVar74 = "";
                    nbcu.products = "";
                    nbcu.prop20 = "";
                    nbcu.eVar27 = "";
                    nbcu.eVar36 = "";
                    nbcu.eVar37 = "";
                    nbcu.eVar38 = "";
                    nbcu.eVar39 = "";
                    nbcu.eVar40 = "";
                    nbcu.prop45 = "";
                    nbcu.eVar45 = "";
                    nbcu.prop46 = "";
                    nbcu.eVar47 = "";
                    nbcu.eVar48 = "";
                    nbcu.prop50 = "";
                    nbcu.eVar50 = "";
                    nbcu.eVar61 = _galleryName;
                    
                    if(evt && (evt.target.className =="playing" || evt.target.className =="paused") ) {
                    	nbcu.events = "";
                    } else {
                    	nbcu.events = _eventNumber;
                    	
                    }
                    
                    if(U.getQueryParam("ssAuto") == "true") {
                        if(U.readCookie('finalSlide') == "true") {
                            _eventNumber = _eventNumber + ",event30";
                            U.createCookie("finalSlide", "false", 365);
                        }
                    }
                }
            }
            if(_pageName.match('|')) { // only use that part of the title before any pipe
                _pageName = _pageName.split('|')[0];
            }
        }
        /*
                    if(eventNumber == 1) {
                        nbcu.prop53 = "nextclick";
                    } else if(eventNumber == 2) {
                        nbcu.prop53 = "previousclick";
                    } else if(eventNumber == 3) {
                        nbcu.prop53 = "filmstripclick";
                    } else if(eventNumber == 4) {
                        nbcu.prop53 = "filmstripclickright";
                    } else if(eventNumber == 5) {
                        nbcu.prop53 = "filmstripclickleft";
                    } else if(eventNumber == 6) {
                        nbcu.prop53 = "share";
                    } else if(eventNumber == 7) {
                        nbcu.prop53 = "playgallery";
                    } else if(eventNumber == 8) {
                        nbcu.prop53 = "replaygallery";
                    }
        */
    }
    if(!doNothing) {
        var encodedSpecChars = escape(_pageName);
        _pageName = encodedSpecChars;
        if(nbc.omniture.pageType == "home" && _currentPhotoValue == "1"){
            nbcu.prop52 = nbcu.pageName;
            nbcu.prop53 = _galleryName;
            nbcu.prop54 = nbcu.prop52 + ' | ' + nbcu.prop53;
            nbcu.prop55 = "Homepage Photos and Videos";
        } else if(nbc.omniture.pageType != "home" && _currentPhotoValue == "1"){
            nbcu.prop55 = "Inline Article Multimedia Module";
        } else if(_currentPhotoValue != "1"){
            nbcu.prop52 = "";
            nbcu.prop53 = "";
            nbcu.prop54 = "";
            nbcu.prop55 = "";
        }
        //alert('Firing nbcu.t function...');
        
        
        if( evt && (evt.target.className =="playing" || evt.target.className =="paused") ) {
        	//console.log("User pressed play/pause!");
        	nbcu.linkTrackVars="prop52,prop53,prop54,prop55";
        	nbcu.prop52 = nbcu.pageName;
        	nbcu.prop53 = "playpausegallery";
        	nbcu.prop54 = document.title.replace(/^\s+|\n+|\t+|\s+$/g, '') + "|playpausegallery";
        	nbcu.prop55 = "gallery";
        	

        	
        	//console.log("nbcu.prop52 | "+nbcu.prop52+"\n");
        	//console.log("nbcu.prop53 | "+nbcu.prop53+"\n");
        	//console.log("nbcu.prop54 | "+nbcu.prop54+"\n");
        	//console.log("nbcu.prop55 | "+nbcu.prop55+"\n");
        	nbcu.tl(this,'o','playpause');
        	//nbcu.tl();
        	//console.log("nbcu.tl call COMPLETE!");
        	
        } else {
        	nbcu.t();
        }
        //alert('Fired');
    }
}
