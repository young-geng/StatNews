/**************************************************************************************************************************************
* Last edited by: Toby Spinks  *  12-11-2013  *  Version: 136  *  Ticket No.: XX Bug related to removing inline slideshows.
***************************************************************************************************************************************/
/* Tracking city primary city module click events on prop56 */
/* This Just In required some brute force. :/ */

nbc.interactionBeacon = function(link, linkData) {
	var discreteData = linkData.split("|");
	var targetModule = discreteData[0];
	var placementInModule = discreteData[1];
	
	//nbcu.un = nbcu_account;
	//nbcu.tl(this,'o',' link tracking');
	s.un = s_account;
	s.linkTrackVars="prop56";
	s.prop56='City Site : '+nbc.brand+ ' : Module Clicked : '+targetModule+' : Placement : '+placementInModule;
	s.tl(this,'o','City Site : '+nbc.brand+ ' : Module Clicked : '+targetModule+' : Placement : '+placementInModule,null,'navigate'); 
	
	if(link.href != undefined) {
		location.href = link.href;
	}
}

nbc.thisJustInTracker = function() {
	z = jQuery('#ThisJustIn div.sectionPreview');
	y = jQuery('#ThisJustIn div.sectionPreview p.thisJustInHeadline');

	localNewsArray = jQuery(jQuery(z).get(0)).find('li a');
	usworldArray = jQuery(jQuery(z).get(1)).find('li a');
	entertainArray = jQuery(jQuery(z).get(2)).find('li a');

	for(b = 0; b <= 2; b++) {
		window['justInLinks'+b] = jQuery(jQuery(z).get(b)).find('li a');
	}
	for(ar1 = 0; ar1 <= 2; ar1++) {
		var c = jQuery(localNewsArray).get(ar1);
		jQuery(c).click(function() {
			//nbc.interactionBeacon(this,"This Just In|local-"+(jQuery.inArray(this,localNewsArray)+1));
			//console.log("local-"+(jQuery.inArray(this,localNewsArray)+1));
		});
		//console.log(c);
	}
	for(ar2 = 0; ar2 <= 2; ar2++) {
		var d = jQuery(usworldArray).get(ar2);
		jQuery(d).click(function() {
			//nbc.interactionBeacon(this,"This Just In|us_world-"+(jQuery.inArray(this,usworldArray)+1));
			//console.log("us_world-"+(jQuery.inArray(this,usworldArray)+1));
		});
		//console.log(d);
	}
	for(ar3 = 0; ar3 <= 2; ar3++) {
		var e = jQuery(entertainArray).get(ar3);
		jQuery(e).click(function() {
			//nbc.interactionBeacon(this,"This Just In|entertainment-"+(jQuery.inArray(this,entertainArray)+1));
			//console.log("entertainment-"+(jQuery.inArray(this,entertainArray)+1));
		});
		//console.log(e);
	}
}

/* JAVASCRIPT OBJECT: mmModule */
/* Required to run CSS changes on the multimedia module */
/* Required for some Omniture tracking */
/* Please note: Object and some variables defined in nbc_home_top_start */

mmModule.currentlySelectedItem = null;
var insertAd = false;
mmModule.navControl = function(elementAnchor) {
	if(mmModule.currentlySelectedItem !=null) {
		jQuery(mmModule.currentlySelectedItem).toggleClass('on');
		jQuery(mmModule.currentlySelectedItem).children('div.mmArrow').toggle();
		var elementParent = jQuery(elementAnchor).closest('div.related-item');
		jQuery(elementParent).toggleClass('on');
		var endCardRelatedTitleEncode = $(elementParent).children(".related-item-thumbnail").children(".relatedMMTitle").text().replace(/[']/gi,"&rsquo;");
		var endCardRelatedTitle = endCardRelatedTitleEncode.replace(/["]/gi,"&quot;");
		var endCardRelatedSummaryEncode = $(elementParent).children(".related-item-thumbnail").children(".relatedMMSummary").text().replace(/[']/gi,"&rsquo;");
		var endCardRelatedSummary = endCardRelatedSummaryEncode.replace(/["]/gi,"&quot;");
		$("#multimedia-module #currentMMID").text($(elementParent).children(".related-item-thumbnail").children(".relatedMMID").text());
		$("#multimedia-module #currentMMLink").text($(elementParent).children(".related-item-thumbnail").children(".relatedMMLink").text());
		$("#multimedia-module #currentMMTitle").text(endCardRelatedTitle);
		$("#multimedia-module #currentMMSummary").text(endCardRelatedSummary);
		tpController.addEventListener("OnMediaEnd","setSocializeVarsMM");
		jQuery(elementParent).children('div.mmArrow').toggle();
		mmModule.currentlySelectedItem = elementParent;
	} else {
		var elementParent = jQuery(elementAnchor).closest('div.related-item');
		jQuery(elementParent).toggleClass('on');
		var endCardRelatedTitleEncode = $(elementParent).children(".related-item-thumbnail").children(".relatedMMTitle").text().replace(/[']/gi,"&rsquo;");
		var endCardRelatedTitle = endCardRelatedTitleEncode.replace(/["]/gi,"&quot;");
		var endCardRelatedSummaryEncode = $(elementParent).children(".related-item-thumbnail").children(".relatedMMSummary").text().replace(/[']/gi,"&rsquo;");
		var endCardRelatedSummary = endCardRelatedSummaryEncode.replace(/["]/gi,"&quot;");
		$("#multimedia-module #currentMMID").text($(elementParent).children(".related-item-thumbnail").children(".relatedMMID").text());
		$("#multimedia-module #currentMMLink").text($(elementParent).children(".related-item-thumbnail").children(".relatedMMLink").text());
		$("#multimedia-module #currentMMTitle").text(endCardRelatedTitle);
		$("#multimedia-module #currentMMSummary").text(endCardRelatedSummary);
		tpController.addEventListener("OnMediaEnd","setSocializeVarsMM");
		jQuery(elementParent).children('div.mmArrow').toggle();
		mmModule.currentlySelectedItem = elementParent;
	}
}

/* JAVASCRIPT OBJECT: hpInlineSlideShow31 */
/* Required to run the inline slideshow on the homepage */
var hpInlineSlideShow31 = {};
hpInlineSlideShow31.imageCapsules = null;
hpInlineSlideShow31.autoPlayerTimer = null;
hpInlineSlideShow31.autoPlayerInterval = 4000;
hpInlineSlideShow31.autoPlayerEngaged = false;
hpInlineSlideShow31.showTitle = null;
hpInlineSlideShow31.autoPlayonLoad = true;
hpInlineSlideShow31.replayButton = "<div id=\"replayButton\"></div>";
hpInlineSlideShow31.fetchData = function(ssid,ssTitle) {
	hpInlineSlideShow31.lastShowLoaded = ssid;
	var slideshowID = ssid;
	hpInlineSlideShow31.showTitle = ssTitle;	
	jQuery.getJSON('http://'+nbc.env+nbc.domain+'/i/dispatcher/?h=slideshow&contentId='+slideshowID,function(response) {
		hpInlineSlideShow31.imageCapsules = response;
	}).success(function(){
		U.log('Data Fetch Successful');
		hpInlineSlideShow31.domInit();
		// doOmnitureTracker(43);// Fire initial omni values
	});
}

hpInlineSlideShow31.domInit = function() {
	if(document.getElementById('mediaRegioniOS')) {
		tpController.resetPlayer(['mediaRegioniOS']);
		jQuery('#mediaRegioniOS').css({'visibility':'hidden'});
		$pdk.controller.pause(true,['mediaRegioniOS'],true);
	}
	hpInlineSlideShow31.clicksMade = 0;
	hpInlineSlideShow31.slideCount = 1;
	hpInlineSlideShow31.currentlyInViewIndex = 0;
	//no play button for dgo
	if(nbc.siteKey != "dgo"){
	var slideshowDomSetup = "<div id=\"slideshowModule\"><div class=\"summary\" style=\"position:absolute; z-index:10;\"><div class=\"hideShowCaptionBtn\"></div><p class=\"showTitle\"><span class=\"galleryTitle\">"+hpInlineSlideShow31.showTitle+"</span> <span id=\"slideCounter\"></span></p><p class=\"photoCaption\"></p><div id=\"summaryBG\"></div></div><div id=\"ssplay\" class=\"slideShowControlButtons\"></div> <div id=\"ssleft\" class=\"slideShowControlButtons\"></div> <div id=\"ssright\" class=\"slideShowControlButtons\"></div><div id=\"slideShowAllElements\"></div></div>";
	}
	else {
		var slideshowDomSetup = "<div id=\"slideshowModule\"><div class=\"summary\" style=\"position:absolute; z-index:10;\"><div class=\"hideShowCaptionBtn\"></div><p class=\"showTitle\"><span class=\"galleryTitle\">"+hpInlineSlideShow31.showTitle+"</span> <span id=\"slideCounter\"></span></p><p class=\"photoCaption\"></p><div id=\"summaryBG\"></div></div><div id=\"ssleft\" class=\"slideShowControlButtons\"></div> <div id=\"ssright\" class=\"slideShowControlButtons\"></div><div id=\"slideShowAllElements\"></div></div>";	
	}
	
	jQuery('div.mediaRegion').removeClass('tpReady');
	jQuery('div.mediaRegion').removeClass('tpReadymediaRegion');
	jQuery('div.mediaRegion').html(slideshowDomSetup);

	hpInlineSlideShow31.populateSlideContainers();
	hpInlineSlideShow31.maintainWidth();
	hpInlineSlideShow31.init();
	hpInlineSlideShow31.eventAssignments();

	if(hpInlineSlideShow31.autoPlayerEngaged == true) {
		U.log('MESSAGE: Autoplayer engaged from previous slideshow. Halting...');
		hpInlineSlideShow31.autoPlay();
	}

	if(hpInlineSlideShow31.autoPlayonLoad == true) {
		if(nbc.siteKey != "dgo"){
			jQuery('#ssplay').trigger('click');
		}
	}
}

hpInlineSlideShow31.populateSlideContainers = function() {
	for (var z = 0; z < hpInlineSlideShow31.imageCapsules.length; z++) {
	jQuery('#slideShowAllElements').append('<div id="slide'+z+'" class="hpslides"></div>');
	}
}


hpInlineSlideShow31.maintainWidth = function() {
hpInlineSlideShow31.hpInlineSlideShowImageContainers = jQuery("#slideShowAllElements .hpslides");

jQuery(hpInlineSlideShow31.hpInlineSlideShowImageContainers).each(function(i) {
	var currentElement = jQuery(hpInlineSlideShow31.hpInlineSlideShowImageContainers).get(i);
	var currentElementWidth = jQuery(currentElement).width();
	hpInlineSlideShow31.totalWidthOfElements = currentElementWidth*(i+1);
	U.log(hpInlineSlideShow31.totalWidthOfElements);
	jQuery('#slideShowAllElements').css({'width':hpInlineSlideShow31.totalWidthOfElements+'px'});
});
}

hpInlineSlideShow31.init = function() {
	jQuery('#slide0').html('<img width="'+hpInlineSlideShow31.imageCapsules[0].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[0].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[0].imagePath+'"/>');
	jQuery('#slide1').html('<img width="'+hpInlineSlideShow31.imageCapsules[1].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[1].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[1].imagePath+'"/>');
	jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
	jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
	hpInlineSlideShow31.scrollThisElement = jQuery('#slideShowAllElements');
	hpInlineSlideShow31.currentlyInViewElement = jQuery(hpInlineSlideShow31.hpInlineSlideShowImageContainers).get(hpInlineSlideShow31.currentlyInViewIndex);
	hpInlineSlideShow31.currentlyInViewElementOffset = jQuery(hpInlineSlideShow31.currentlyInViewElement).position();
	hpInlineSlideShow31.currentScrollOffset = hpInlineSlideShow31.currentlyInViewElementOffset.left;
}

hpInlineSlideShow31.showNextSlide = function(autoPlayerEngaged) {
	jQuery('#slideshowModule div.summary').show();
	if(hpInlineSlideShow31.currentlyInViewIndex == hpInlineSlideShow31.hpInlineSlideShowImageContainers.length - 1) {
		U.log('End of the line.');
		jQuery('#slideshowModule').fadeTo('slow',.2);
		jQuery('div.mediaRegion').append(hpInlineSlideShow31.replayButton);
		jQuery('#replayButton').show();
		jQuery('.slideShowControlButtons').hide();
		jQuery('#slideshowModule div.summary').hide();
		
		jQuery('#replayButton').one('click',function() {
			hpInlineSlideShow31.replayLastShow();
			//G.doPixelTracking(84, true);
			doOmnitureTracker(43, true);
		});
		
		try {
			hpInlineSlideShow31.autoPlayerEngaged = false;
			//clearInterval(autoPlayer);
		} catch(e) {
			U.log('ALERT:Slideshow ended, but with errors.'+e)
		}
		
	} else {

		hpInlineSlideShow31.nextSlideIndex = hpInlineSlideShow31.currentlyInViewIndex+1;
		hpInlineSlideShow31.nextSlide = jQuery(hpInlineSlideShow31.hpInlineSlideShowImageContainers).get(hpInlineSlideShow31.nextSlideIndex);
		hpInlineSlideShow31.nextSlideElementOffset = jQuery(hpInlineSlideShow31.nextSlide).position();
		hpInlineSlideShow31.nextSlideScrollOffset = hpInlineSlideShow31.nextSlideElementOffset.left;
		
		jQuery(hpInlineSlideShow31.scrollThisElement).css({'left':(hpInlineSlideShow31.nextSlideScrollOffset * -1)+'px'});
		hpInlineSlideShow31.slideCount +=1;
		hpInlineSlideShow31.currentlyInViewIndex +=1;
	
		if(hpInlineSlideShow31.autoPlayerEngaged == false) {	
			if(hpInlineSlideShow31.clicksMade >= 4) {
				hpInlineSlideShow31.adInsertion("next");
				insertAd = true;
			} else {
				jQuery('#slide'+hpInlineSlideShow31.currentlyInViewIndex).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imagePath+'"/>');
				jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
				insertAd = false;
			}
			if(jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html() == "") {
				jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imagePath+'"/>');
				jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
			}
			if(hpInlineSlideShow31.clicksMade >= 4) {
				// nothing
			} else {
				if(autoPlayerEngaged == true) {
					//G.doPixelTracking(84);
					doOmnitureTracker(43);
				} else {
					if(insertAd == false){
						//G.doPixelTracking(51);
						doOmnitureTracker(44);
					}
				}
			}
		}
		
		
		if(hpInlineSlideShow31.autoPlayerEngaged == true) {
			if(hpInlineSlideShow31.slideCount % 4 == 0) {
				hpInlineSlideShow31.adInsertion("next");
				hpInlineSlideShow31.slideCount = 0;
			} else {
				jQuery('#slide'+hpInlineSlideShow31.currentlyInViewIndex).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imagePath+'"/>');
				jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
			}
			if(jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html() == "") {
				jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex+1].imagePath+'"/>');
				jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
			}
			if(hpInlineSlideShow31.slideCount % 4 == 0) {
				// nothing
			} else {
				if(autoPlayerEngaged == true) {
					//G.doPixelTracking(84);
					doOmnitureTracker(43);
				} else {
					//G.doPixelTracking(51);
					doOmnitureTracker(44);
				}
			}
		}
		jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex-1)).html("");
		//jQuery('#slideCounter').html(hpInlineSlideShow31.slideCount);
	}
}



hpInlineSlideShow31.showPrevSlide = function() {

	jQuery('#slideshowModule div.summary').show();
	if (hpInlineSlideShow31.currentlyInViewIndex - 1 < 0) {
	U.log('End of the line.');
	} else {


    hpInlineSlideShow31.prevSlideIndex = hpInlineSlideShow31.currentlyInViewIndex-1;
	hpInlineSlideShow31.prevSlide = jQuery(hpInlineSlideShow31.hpInlineSlideShowImageContainers).get(hpInlineSlideShow31.prevSlideIndex);
	hpInlineSlideShow31.prevSlideElementOffset = jQuery(hpInlineSlideShow31.prevSlide).position();
	hpInlineSlideShow31.prevSlideScrollOffset = hpInlineSlideShow31.prevSlideElementOffset.left;
	
	jQuery(hpInlineSlideShow31.scrollThisElement).css({'left':(hpInlineSlideShow31.prevSlideScrollOffset * -1)+'px'});
	hpInlineSlideShow31.currentlyInViewIndex -=1;

		if(hpInlineSlideShow31.autoPlayerEngaged == false) {
			if(hpInlineSlideShow31.clicksMade >= 4) {
				hpInlineSlideShow31.adInsertion("prev");
				insertAd = true;
			} else {
				jQuery('#slide'+hpInlineSlideShow31.currentlyInViewIndex).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imagePath+'"/>');
				jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html("");
				//jQuery('#slideShowAllElements #caption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
				jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
				insertAd = false;
			}
			if(hpInlineSlideShow31.clicksMade >= 4) {
				// nothing
			} else {
				if(insertAd == false){
					//G.doPixelTracking(51);
					doOmnitureTracker(44);
				}
			}
		}
		
		// Will probably never execute, but in here for now for the sake of consistency.
		if(hpInlineSlideShow31.autoPlayerEngaged == true) {
	
			if(hpInlineSlideShow31.slideCount % 4 == 0) {
			hpInlineSlideShow31.adInsertion("prev");
			hpInlineSlideShow31.slideCount = 0;
			} else {
			jQuery('#slide'+hpInlineSlideShow31.currentlyInViewIndex).html('<img width="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageWidth+'" height="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageHeight+'" src="'+hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imagePath+'"/>');
			jQuery('#slide'+(hpInlineSlideShow31.currentlyInViewIndex+1)).html("");
			//jQuery('#slideShowAllElements #caption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
			jQuery('#slideshowModule p.photoCaption').html(hpInlineSlideShow31.imageCapsules[hpInlineSlideShow31.currentlyInViewIndex].imageCaption);
			jQuery('#slideCounter').html('<span>'+(hpInlineSlideShow31.currentlyInViewIndex + 1) + '</span> / ' + hpInlineSlideShow31.hpInlineSlideShowImageContainers.length);
			}
			
		}
	
	}

}


hpInlineSlideShow31.autoPlay = function() {

	if(hpInlineSlideShow31.autoPlayerEngaged == false) {
		U.log("Starting autoplayer");
		hpInlineSlideShow31.autoPlayerEngaged = true;
		autoPlayer = setInterval("hpInlineSlideShow31.showNextSlide(true)",hpInlineSlideShow31.autoPlayerInterval);
		jQuery('#ssplay').toggleClass('paused');
		//hpInlineSlideShow31.slideCount = 0;

	
	} else if (hpInlineSlideShow31.autoPlayerEngaged == true) {
		U.log("Ending autoplayer");
		hpInlineSlideShow31.autoPlayerEngaged = false;
		//clearInterval(autoPlayer);
		jQuery('#ssplay').toggleClass('paused');
	}

}


hpInlineSlideShow31.clickCounter = function() {
	hpInlineSlideShow31.clicksMade +=1;
	}


hpInlineSlideShow31.replayLastShow = function() {
	// Spinning down and resetting all params that were set on the first run through.
	jQuery('#replayButton').hide();
	jQuery('.slideShowControlButtons').show();
	jQuery('#slideshowModule div.summary').show();
	jQuery('#slideshowModule').fadeTo('fast',1);
	
	//Likely redundant now.
	jQuery('div.hideShowCaptionBtn').die();
	
	hpInlineSlideShow31.fetchData(hpInlineSlideShow31.lastShowLoaded,hpInlineSlideShow31.showTitle);
}

hpInlineSlideShow31.eventAssignments = function() {
	jQuery('div.hideShowCaptionBtn').unbind();
	hpInlineSlideShow31.captionMinimized = false;
	
	jQuery('#ssplay').click(function() {
		hpInlineSlideShow31.autoPlay();
		//jQuery(this).toggleClass('paused');
		return false;
	});
	
	jQuery('#ssleft').click(function() {
		if(hpInlineSlideShow31.autoPlayerEngaged == true) {
			hpInlineSlideShow31.autoPlay();
		}
		hpInlineSlideShow31.clickCounter();
		hpInlineSlideShow31.showPrevSlide();
		U.log ("Previous button: Live");
		return false;
	});

	jQuery('#ssright').click(function() {
		if(hpInlineSlideShow31.autoPlayerEngaged == true) {
			hpInlineSlideShow31.autoPlay();
		}
		hpInlineSlideShow31.clickCounter();
		hpInlineSlideShow31.showNextSlide(false);
		U.log ("Next button: Live");
		return false;
	});

	jQuery('div.hideShowCaptionBtn').click(function() {
		if(hpInlineSlideShow31.captionMinimized == false) {
			jQuery('#slideshowModule div.summary').animate({'top':'373px'});
			jQuery(this).toggleClass('captionControlMin');
			hpInlineSlideShow31.captionMinimized = true;
		} else {
			jQuery('#slideshowModule div.summary').animate({'top':'310px'});
			jQuery(this).toggleClass('captionControlMin');
			hpInlineSlideShow31.captionMinimized = false;
		}
	});
	
};
	
/* JAVASCRIPT OBJECT: feastCitySiteModule */
/* Required to run The Feast's search module on the homepage */

feastCitySiteModule = {};

feastCitySiteModule.currentVisibleDropDown = null;
feastCitySiteModule.feastVerticalCurrentSelection = null;
feastCitySiteModule.feastNeighborhoodCurrentSelection = null;
feastCitySiteModule.feastNeighborhoodCurrentWordSelection = null;

jQuery(document).ready(function() {
	
	jQuery('#feast-module-selection-boxes div.selectionArrowOff').click(function(event) {
		event.stopPropagation();
		if(feastCitySiteModule.currentVisibleDropDown) {
		jQuery(feastCitySiteModule.currentVisibleDropDown).children().fadeOut("fast");
		feastCitySiteModule.currentVisibleDropDown=null;
		}else{
		feastCitySiteModule.currentVisibleDropDown = jQuery(this).next();
		jQuery(this).next().children().fadeIn('fast');
		}
		
	});

	jQuery('#feast-module-selection-boxes li.option').mouseover(function() {

	}).mouseout(function(){

	});
  
	  
	  jQuery('#feast-module-selection-boxes li.option').click(function() {
		    
		  var targetParent = jQuery(this).parent();
		  var targetChild = jQuery(targetParent).prev().prev();  
		  var whatIsTargetField = jQuery(targetChild).children('li').attr('class')
		   jQuery(targetChild).children('li').html(jQuery(this).html());
			switch (whatIsTargetField) {
			
			case "feastVerticalCurrentSelection":
			feastCitySiteModule.feastVerticalCurrentSelection = jQuery(this).attr("id");
			feastCitySiteModule.feastVerticalCurrentOmniSelection = jQuery(this).find("p").text();
			break;
			
			case "feastNeighborhoodCurrentSelection":
			feastCitySiteModule.feastNeighborhoodCurrentSelection = jQuery(this).attr("id");
			feastCitySiteModule.feastNeighborhoodCurrentWordSelection = jQuery(this).find("p").text();
			break;
			
			default:
			// Do nothing.
			break;
			
			}
		  
 //alert(feastCitySiteModule.feastVerticalCurrentOmniSelection+ " "+feastCitySiteModule.feastNeighborhoodCurrentWordSelection);
 nbc.omnitureVertical.vertical = feastCitySiteModule.feastVerticalCurrentOmniSelection;
 nbc.omnitureVertical.neighborhood = feastCitySiteModule.feastNeighborhoodCurrentWordSelection;
 
  jQuery(feastCitySiteModule.currentVisibleDropDown).children().fadeToggle('fast');
  feastCitySiteModule.currentVisibleDropDown=null;
  feastCitySiteModule.searchFeastVenues();
  });
  

jQuery(document.body).click(function(event) {
//	event.stopPropagation();
	jQuery('ul.feastVerticals').children().fadeOut();
	jQuery('ul.feastNeighborhoods').children().fadeOut();
	feastCitySiteModule.currentVisibleDropDown=null;
	});
  
});
	
 
/* Event handler assigments: Multimedia module - video links */
/* Without these videos can't be launched from the sidebar */

jQuery(document).ready(function() {
	mmModule.moduleLinkArray = jQuery('#multimedia-module div.related-item a');
	var detectBrowser = navigator.userAgent.toLowerCase();
		jQuery('#multimedia-module a.videoLink').click(function() {

			if(navigator.userAgent.match(/like Mac OS X/i)) {
				mmModule.navControl(this);
				thisTitleRow1 = this.title;
				thisTitle=escape(thisTitleRow1);
				try {
					hpInlineSlideShow31.autoPlayerEngaged = false;
					//clearInterval(autoPlayer);
					jQuery('#mediaRegion').html('');
				}
				catch(e) {
					U.log('ALERT:No slideshow has been loaded, no timer to halt..'+e)
				}
				var videoParams = this.id;
				var splitVideoParams = videoParams.split("-");
				var useThisId = splitVideoParams[1];
				nbcVideoPageUtils.currentReleaseId = splitVideoParams[0];
				jQuery('#mediaRegioniOS').css({'visibility':'visible'});
				nbcVideoPageUtils.getAdHocVideoMetaData('MM',710,399,nbcVideoPageUtils.currentReleaseId,'mmCluster','mediaRegioniOS',true,useThisId);
				//nbcVideoPageUtils.mmiPadPlayer();
				
				//playerMM.bind('mediaRegioniOS');
				//tpController.setReleaseURL("http://link.theplatform.com/s/Yh1nAC/"+useThisId+"?manifest=m3u&format=SMIL",replaceDefault=true,['mediaRegioniOS']);
				
				return false;
			} else {
				var videoParams = this.id;
				var videoParamSplit = videoParams.split("-");
				var splitVideoParams = videoParams.split("-");
				var IdForCarousel = splitVideoParams[0];
				nbcVideoPageUtils.targetEndCard = jQuery('div.endcard-mm');
				nbcVideoPageUtils.targetSummaryDiv = jQuery('#mmVideoSummary').attr('id');
				jQuery(nbcVideoPageUtils.targetEndCard).hide();
				nbcVideoPageUtils.endCardTitle = jQuery(this).text();
				jQuery(nbcVideoPageUtils.targetEndCard).find('p.videoTitle').text(nbcVideoPageUtils.endCardTitle);
				if(NBC_PageReload) {
					U.log("homeprimary.js | Attempting to halt page reload...");
					NBC_PageReload.interruptReload();
				}
				if(jQuery.browser.msie) {
					jQuery('#multimedia-module').css({'height':'400px'});
				}
				try {
					hpInlineSlideShow31.autoPlayerEngaged = false;
					//clearInterval(autoPlayer);
				}
				catch(e) {
					U.log('ALERT:No slideshow has been loaded, no timer to halt..'+e)
				}
				mmModule.navControl(this);
				thisTitleRow1 = this.title;
				thisTitle=escape(thisTitleRow1);
				var scopeRandomID = Math.floor(Math.random()*1000);
				jQuery('#multimedia-module div.mediaRegion').attr('id',"mediaRegion"+scopeRandomID);
				nbcVideoPageUtils.getVideoMetaData("mediaRegion"+scopeRandomID, this.id,700,394, thisTitle,'multimediaplayer');
				//nbcVideoPageUtils.player442("mediaRegion"+scopeRandomID, this.id,700,394, thisTitle,'multimediaplayer');
				nbcVideoPageUtils.populateRelatedMedia(IdForCarousel);
				var thisLocationInArray = jQuery.inArray(this,mmModule.moduleLinkArray);
				//nbc.interactionBeacon(this,this.title+'|'+ currentCount );
				return false;
			} // END iOS detection
		}); // END click assignment.
	

}); // END document ready.

/* Event handler assigments: Multimedia module - slideshow links */
/* Without these slideshow can't be launched from the sidebar */
/*
jQuery(document).ready(function() {
	//if(detectBrowser.indexOf('firefox')!=-1){ // Firefox

		jQuery('#multimedia-module div.galleryLink').click(function() {
			var currentLink = $(this).find('a.galleryLink');
			var currentCount = $(this).find('.relatedCount').text();
			hpInlineSlideShow31.fetchData(currentLink.attr('id'), currentLink.attr('title'));
			nbc.galleryVideo.title = currentLink.attr('title');
			//G.doPixelTracking(84);
			doOmnitureTracker(43);
			if($(nbcVideoPageUtils.targetEndCard).css('display') === 'block'){
		   		$(nbcVideoPageUtils.targetEndCard).fadeOut('fast');
			}
			if(jQuery('#'+nbcVideoPageUtils.targetSummaryDiv).css('display') === 'block') {
				jQuery('#'+nbcVideoPageUtils.targetSummaryDiv).hide();
			}
			mmModule.navControl(currentLink);
			var thisLocationInArray = jQuery.inArray(currentLink,mmModule.moduleLinkArray);
		//	nbc.interactionBeacon(currentLink,currentLink.attr('title')+'|'+ currentCount);
			return false;
		});
		jQuery('#multimedia-module div.related-item').click(function() {
			//mmModule.navControl(currentLink);
			mmModule.thisMediaLink = jQuery(this).children().eq(2).children('a');
			jQuery(mmModule.thisMediaLink).triggerHandler('click');
			if(NBC_PageReload) {
				U.log("homeprimary.js | Attempting to halt page reload...");
				NBC_PageReload.interruptReload();
			}
		}); // END click assignment.
	/*}else{ // All other browsers
		jQuery('#multimedia-module div.galleryLink').mousedown(function() {
			var currentLink = $(this).find('a.galleryLink');
			var currentCount = $(this).find('.relatedCount').text();
			hpInlineSlideShow31.fetchData(currentLink.attr('id'), currentLink.attr('title'));
			nbc.galleryVideo.title = currentLink.attr('title');
			G.doPixelTracking(84);
			if($(nbcVideoPageUtils.targetEndCard).css('display') === 'block'){
		   		$(nbcVideoPageUtils.targetEndCard).fadeOut('fast');
			}
			if(jQuery('#'+nbcVideoPageUtils.targetSummaryDiv).css('display') === 'block') {
				jQuery('#'+nbcVideoPageUtils.targetSummaryDiv).hide();
			}
			mmModule.navControl(currentLink);
			var thisLocationInArray = jQuery.inArray(currentLink,mmModule.moduleLinkArray);
			nbc.interactionBeacon(currentLink,currentLink.attr('title')+'|'+ currentCount);
			return false;
		});
		jQuery('#multimedia-module div.related-item').click (function() {
			//mmModule.navControl(currentLink);
			mmModule.thisMediaLink = jQuery(this).children().eq(2).children('a');
			jQuery(mmModule.thisMediaLink).triggerHandler('click');
		}); // END click assignment.
	}
}); // END document ready.
*/


/* Event handler assigments: video player - city module */
jQuery(document).ready(function() {
	jQuery('div.hp-module a.videoLink').click(function() {
		if(NBC_PageReload) {
			U.log("homeprimary.js | Attempting to halt page reload...");
			NBC_PageReload.interruptReload();
		} else {
		// Do nothing
		}
		if(navigator.userAgent.match(/like Mac OS X/i)) {
			var videoParams = this.id;
			var splitVideoParams = videoParams.split("-");
			var useThisId = splitVideoParams[1];
			var cmsID = splitVideoParams[0];
			var targetDiv = jQuery(this).parents('div.hp-module').find('div.topStory').attr('id');
			var targetDivSplit = targetDiv.split("-");
			var targetDivID = targetDivSplit[0];
			var targetDivSeq = targetDivSplit[1];
			if(nbc.env == "dev." || nbc.env =="stage.") {
			console.log("videoParams: " + videoParams);
			console.log("useThisId: "+ useThisId);
			console.log("targetDiv: "+ targetDiv);
			console.log("targetDivID: "+ targetDivID);
			console.log("targetDivSeq: " + targetDivSeq);
			console.log('Attempted scope: player-'+targetDivSeq);
			}
			//alert(targetDivID);
			//alert(targetDivSeq);
			//window['player'+targetDivSeq].bind('player-'+targetDivSeq);
			//Commented out tpController call
			//tpController.setReleaseURL("http://link.theplatform.com/s/Yh1nAC/"+useThisId+"?manifest=m3u&format=SMIL",replaceDefault=true,['player-'+targetDivSeq]);
			
			try {
				console.log("nbcVideoPageUtils.getAdHocVideoMetaData('playerAH"+targetDivSeq+"',410,231,"+cmsID+","+targetDivSeq+","+targetDiv+",true,"+useThisId+");");
				nbcVideoPageUtils.getAdHocVideoMetaData('AH'+targetDivSeq,410,231,cmsID,targetDivSeq,targetDiv,true,useThisId);

			}
			
			catch(e) {
				alert(e);
			}
			return false;
		} else {
			//var targetDiv = jQuery(this).parents('div.hp-module').attr('id');
			var targetDiv = jQuery(this).parents('div.hp-module').children('div.videoCapture').attr('id');
			nbcVideoPageUtils.targetEndCard = jQuery(this).parents('div.hp-module').find('div.endcard-small');
			nbcVideoPageUtils.targetSummaryDiv = jQuery(this).parents('div.hp-module').children('div.videoSummary').attr('id');
			var expandThisDiv = jQuery(this).parents('div.hp-module').attr('id');
			nbcVideoPageUtils.originModule = jQuery(this).parents('div.hp-module').attr('title');
			var videoParams = this.id;
			var splitVideoParams = videoParams.split("-");
			var IdForCarousel = splitVideoParams[0];
	
			jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'hidden'});
			jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'hidden'});
			jQuery('#'+expandThisDiv+' div.storyTitleNoGrid').css({'visibility':'hidden'});
			jQuery('#'+expandThisDiv+' div.storyTitleGrid').css({'visibility':'hidden'});
			var thisLinksTitle = escape(this.title);
			var thisVideoSummary = jQuery('#'+expandThisDiv+' div.topStory').children('.videoContentSummaryandTitle');
			jQuery('#'+expandThisDiv+' div.videoClose').css({'display':'block'});
			closeButtonImage = jQuery('#'+expandThisDiv).children('div.videoClose').children();
	
			jQuery(closeButtonImage).one('click',function() {
				//console.log("This is the close button.")
				jQuery('#'+targetDiv).html("");
				jQuery('#'+expandThisDiv+' div.videoClose').css({'display':'none'});
				jQuery('#'+expandThisDiv).animate({'height':'-=120px'});
				jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'visible'});
				jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'visible'});
				jQuery('#'+expandThisDiv+' div.storyTitleNoGrid').css({'visibility':'visible'});
				jQuery('#'+expandThisDiv+' div.storyTitleGrid').css({'visibility':'visible'});
				jQuery('#'+targetDiv).css({'height':'1px','width':'1px','padding-top':'0px','padding-left':'0px','z-index':'0'});
				jQuery(nbcVideoPageUtils.targetEndCard).hide();
				jQuery('#'+nbcVideoPageUtils.targetSummaryDiv).hide();
			});
			jQuery('#'+expandThisDiv).animate({'height':'+=120px'},{complete:function(){
				jQuery('#'+targetDiv).css({'height':'287px','width':'510px','padding-top':'20px','padding-left':'70px','z-index':'5','background-color':'#fff','top':'15px'});
				jQuery('#'+targetDiv).show();
				try {
					tmpTitle = jQuery('#'+expandThisDiv).find('div.topStoryHeadline').text();
					jQuery(nbcVideoPageUtils.targetEndCard).find('p.videoTitle').text(tmpTitle);
				}
				catch(e) {
					U.log("End card error: Title couldn't be found, attempting to recover...");
				}
				nbcVideoPageUtils.getVideoMetaData(targetDiv, videoParams,510,287,thisLinksTitle,'secondaryHomepagePlayer');
				//nbcVideoPageUtils.player442(targetDiv, videoParams,510,287,thisLinksTitle,'franchiseplayer');
				nbcVideoPageUtils.populateRelatedMedia(IdForCarousel);
				var clonedElement = jQuery(thisVideoSummary).clone();
				jQuery(clonedElement).appendTo(jQuery('#'+targetDiv));
				jQuery(clonedElement).css({'display':'block'});
				jQuery('#'+expandThisDiv+' div.videoClose').css({'display':'block'});
				}
			});
		} // END iOS detection
	}); // END click assignment.
}); // END document ready.

/* Event handler assigments: video player - top stories */
jQuery(document).ready(function() {
	jQuery('#top-stories a.videoLink').click(function() {
		if(NBC_PageReload) {
			U.log("homeprimary.js | Attempting to halt page reload...");
			NBC_PageReload.interruptReload();
		} else {
			// Do nothing
		}
		if(navigator.userAgent.match(/like Mac OS X/i)) {
			var videoParams = this.id;
			var splitVideoParams = videoParams.split("-");
			var useThisId = splitVideoParams[1];
			playerts.bind('top-stories-thumb');
			tpController.setReleaseURL("http://link.theplatform.com/s/Yh1nAC/"+useThisId+"?manifest=m3u&format=SMIL",replaceDefault=true,['top-stories-thumb']);
		} else {
			targetDiv = jQuery(this).parents('#top-stories').children('div.videoCapture').attr('id');
			expandThisDiv = jQuery(this).parents('#top-stories').attr('id');
			thisTitleRow = $(this).parent().parent().find(".omnitureTitle").val();
			thisTitle=escape(thisTitleRow);
			videoParams = this.id;
			jQuery('#top-stories-thumb').css({'visibility':'hidden'});
			nbcVideoPageUtils.getVideoMetaData(targetDiv, this.id,422,237, thisTitle,'topstoriesplayer');
			//nbcVideoPageUtils.player442(targetDiv, this.id,422,237, thisTitle,'topstoriesplayer');
			//videoPlayerWidget.init(targetDiv,videoParams,422,237,thisTitle,'topstoriesplayer');
			jQuery('#'+targetDiv).css({'height':'237px','width':'422px','padding-top':'0px','padding-left':'0px','top':'0px','z-index':'10','background-color':'#fff'});
		} // End iOS detection
	}); // END click assignment.
}); // END document ready.

/* LEGACY CODE */
/* ################################################### */
/*                                                     */
/*  TITLE:        nbc_event_manager.js                 */
/*  VERSION:      0.01                                 */
/*                                                     */
/* ################################################### */
NBC_EventManager = {};
NBC_EventManager.events = {};
NBC_EventManager.subscribe = function(sEvent, oSubscriber, sMethod) {
	if (!NBC_EventManager.events[sEvent]) {
		NBC_EventManager.events[sEvent] = [];
	}
	NBC_EventManager.events[sEvent].push({subscriber: oSubscriber, method: sMethod});
};
NBC_EventManager.unsubscribe = function(sEvent, oSubscriber) {
	if(!NBC_EventManager.events[sEvent]) {
		return;
	}
	for (var i=NBC_EventManager.events[sEvent].length-1; i>=0; i--) {
		if (NBC_EventManager.events[sEvent][i].subscriber===oSubscriber) {
			NBC_EventManager.events[sEvent].splice(i,1);
		}
	}
};
NBC_EventManager.fire = function(sEvent) {
	if(!NBC_EventManager.events[sEvent]) {
		return;
	}
	for(var i=0; i<NBC_EventManager.events[sEvent].length; i++) {
		subscription = NBC_EventManager.events[sEvent][i];
		subscription.subscriber[subscription.method].apply(subscription.subscriber, arguments);
	}
};
