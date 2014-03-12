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
  if (!NBC_EventManager.events[sEvent]) {
    return;
  }
  for (var i=NBC_EventManager.events[sEvent].length-1; i>=0; i--) {
    if (NBC_EventManager.events[sEvent][i].subscriber===oSubscriber) {
      NBC_EventManager.events[sEvent].splice(i,1);
    }
  }
};

NBC_EventManager.fire = function(sEvent) {
  if (!NBC_EventManager.events[sEvent]) {
    return;
  }
  for (var i=0; i<NBC_EventManager.events[sEvent].length; i++) {
    subscription = NBC_EventManager.events[sEvent][i];
    subscription.subscriber[subscription.method].apply(subscription.subscriber, arguments);
  }
};

/*  NAMESPACE: G  (. indicates public)                 */

(function() {

if(!window.G) {
  window['G'] = {};
}
})();


/* CODE FOR HOMEPAGE FEAST MODULE */

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
//  event.stopPropagation();
    jQuery('ul.feastVerticals').children().fadeOut();
    jQuery('ul.feastNeighborhoods').children().fadeOut();
    feastCitySiteModule.currentVisibleDropDown=null;
    });
  
});


/* CODE FOR HOMEPAGE FEAST MODULE */



/* CODE FOR VIDEO LOADING A VIDEO PLAYER INTO A TARGETED DIV */


videoPlayerWidget = {};
videoPlayerWidget.currentlySelectedItem = null;

videoPlayerWidget.init = function(targetContainer, videoIDString, width, height, thisTitle, playertype,syndicationAllowed) {
jQuery(targetContainer).fadeToggle();
var videoIDParams = videoIDString.split("-");

var videoReleaseID = videoIDParams[0];
var videoIDForThePlatform = videoIDParams[1];
var syndy = videoIDParams[2];
var originModule = videoIDParams[3];
var videoCategorization = videoIDParams[4];
var videoContentSource = videoIDParams[5];

U.log(originModule);

if(syndy == "true") {
    syndy = "y";
}

var calculateCurrentPath = location.href.split('.com/');
var currentPath = calculateCurrentPath[1];


tpSetCommManagerID("communicationwidget", true, nbc.mediaDomain+"/designvideo/commManager428.swf")
var so = new SWFObject(nbc.mediaDomain+"/designvideo/embeddedPlayer.swf", "playerwidget", width, height, "9.0.0.0", '#131313');
    
    so.addParam("quality", "high");
    so.addParam("scale", "noscale");
    so.addParam("salign", "tl");
    so.addParam("menu", "true");
    so.addParam("bgcolor", "#000000");  
    so.addParam("wmode", "transparent");
    so.addParam("allowFullScreen", "true");
    so.addParam("allowScriptAccess", "always");
    so.addVariable("commManagerID", tpGetCommManagerID());
    so.addVariable("ID", "playerwidget"+videoReleaseID);
    so.addVariable("instanceID", tpGetInstanceID());
    so.addVariable("skinURL", nbc.mediaDomain+"/designvideo/skinGlass425.swf");
    so.addVariable("layoutURL", nbc.fullDomain+"/templates/nbc_video_player_meta_layout?syndicationAllowed="+syndy);
    so.addVariable("releaseURL", "http://release.theplatform.com/content.select?pid=" +videoIDForThePlatform+ "&amp;format=SMIL");
    
    so.addVariable('embeddedPlayerHTML', '<embed width="576" height="324" src="'+nbc.mediaDomain+'/designvideo/embeddedPlayer.swf" flashvars="v=http%3A%2F%2F'+nbc.env+nbc.domain+'%2Fi%2Fembed_new%2F%3Fcid%3D'+videoReleaseID+'&path=%2F'+location.href+'"allowFullScreen="true" AllowScriptAccess="always" /> <p style="font-size:small">View more videos at: <a href="http://'+nbc.env+nbc.host+'/?__source=embedCode">http://'+nbc.env+nbc.host+'</a>.</p>');
    
    if (nbc.omniture.pageType == "weather"){
        
        if (nbc.subsection == "") {

            nbc.subsection = "weather_landing";

        }
        
        so.addVariable("plugin0", "type=plugin|URL=http://objectsorigin.tremormedia.com/embed/swf/tpacudeoplugin46.swf|progId=4b0bfb1eca593|videoDescriptionUrl="+nbc.fullDomain+"|site="+videoadSiteKey+"|zone="+videoReleaseID+nbc.section+"_"+nbc.subsection+"|sect="+nbc.section+"|sub="+nbc.subsection+"|pid="+videoReleaseID+"|contentid="+videoReleaseID+"|contentgroup="+videoAdContentGroup+nbc.env+"|hascompanion=nocompanion|companionexists=false|pt="+playertype);
        so.addVariable("plugin1", "type=tracking|URL="+nbc.mediaDomain+"/designvideo/omnitureMedia428.swf|account="+mmModule.omni+"|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+thisTitle+"|channel=weather|prop2=VideoPlayer|prop3=Video|prop4="+nbc.subsection+"|prop6="+document.location.href+"|prop37=TK|eVar39=VideoPlayer|eVar40="+thisTitle+"|prop48="+playertype+"|eVar48="+playertype+"|prop49="+thisTitle+"|frequency=25%25");
    }
    
    else if (nbc.siteKey == "ami" && nbc.omniture.pageType == "home") {
        
        nbc.section = "hp";
        nbc.subsection = "hp-index";
        U.log(videoCategorization);
        
        so.addVariable("plugin0", "type=plugin|URL=http://objectsorigin.tremormedia.com/embed/swf/tpacudeoplugin46.swf|progId=4b0bfb1eca593|videoDescriptionUrl="+nbc.fullDomain+"|site="+videoadSiteKey+"|zone="+videoReleaseID+"_"+videoContentSource+"_"+nbc.section+"_"+nbc.subsection+"|sect="+nbc.section+"|sub="+nbc.subsection+"|pid="+videoContentSource+"|contentid="+videoReleaseID+"|contentgroup="+videoCategorization+"|hascompanion=nocompanion|companionexists=false|pt="+playertype);
        so.addVariable("plugin1", "type=tracking|URL="+nbc.mediaDomain+"/designvideo/omnitureMedia428.swf|account="+mmModule.omni+"|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+thisTitle+"|channel="+nbc.section+"|prop2=VideoPlayer|prop3=Video|prop4="+nbc.subsection+"|prop6="+document.location.href+"|prop37=TK|eVar39=VideoPlayer|eVar40="+thisTitle+"|prop48="+playertype+"|eVar48="+playertype+"|prop49="+thisTitle+"|frequency=25%25");  
    }
    
    else if(nbc.omniture.pageType != "home") {
    U.log("type=plugin|URL=http://objects.tremormedia.com/embed/swf/tpacudeoplugin46.swf|progId=4b69cf866259c|videoDescriptionUrl="+nbc.fullDomain+"|site="+videoadSiteKey+"|zone="+videoReleaseID+nbc.section+"_"+nbc.subsection+"|sect="+nbc.section+"|sub="+nbc.subsection+"|pid="+videoReleaseID+"|contentid="+videoReleaseID+"|contentgroup="+videoAdContentGroup+nbc.env+"|hascompanion=nocompanion|companionexists=false|pt="+playertype);
    so.addVariable("plugin0", "type=plugin|URL=http://objectsorigin.tremormedia.com/embed/swf/tpacudeoplugin46.swf|progId=4b0bfb1eca593|videoDescriptionUrl="+nbc.fullDomain+"|site="+videoadSiteKey+"|zone="+videoReleaseID+nbc.section+"_"+nbc.subsection+"|sect="+nbc.section+"|sub="+nbc.subsection+"|pid="+videoReleaseID+"|contentid="+videoReleaseID+"|contentgroup="+videoAdContentGroup+nbc.env+"|hascompanion=nocompanion|companionexists=false|pt="+playertype);
    so.addVariable("plugin1", "type=tracking|URL="+nbc.mediaDomain+"/designvideo/omnitureMedia428.swf|account="+mmModule.omni+"|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+thisTitle+"|channel="+nbc.section+"|prop2=VideoPlayer|prop3=Video|prop4="+nbc.subsection+"|prop6="+document.location.href+"|prop37=TK|eVar39=VideoPlayer|eVar40="+thisTitle+"|prop48="+playertype+"|eVar48="+playertype+"|prop49="+thisTitle+"|frequency=25%25");
    } 
    
    else if(nbc.omniture.pageType == "home") {
        so.addVariable("plugin0", "type=tracking|URL="+nbc.mediaDomain+"/designvideo/omnitureMedia428.swf|account="+mmModule.omni+"|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+thisTitle+"|channel=multimedia_home|prop2=VideoPlayer|prop3=Video|prop4=multimedia_home|prop6="+document.location.href+"|prop37=TK|eVar39=VideoPlayer|eVar40="+thisTitle+"|prop48="+playertype+"|eVar48="+playertype+"|prop49="+thisTitle+"|frequency=25%25");
        }
    
    so.addVariable("backgroundColor", "0x131313");
    so.addVariable("controlBackgroundColor", "0x3d3d3d");
    so.addVariable("controlColor", "0xbfbfbf");
    so.addVariable("controlFrameColor", "0x4c4c4c");
    so.addVariable("controlHoverColor", "0xffffff");
    so.addVariable("controlSelectedColor", "0xffffff");
    so.addVariable("frameColor", "0xE0E0E0");
    so.addVariable("loadProgressColor", "0x7C7C7C");
    so.addVariable("pageBackgroundColor", "0x131313");
    so.addVariable("playProgressColor", "0xE0E0E0");
    so.addVariable("scrubberColor", "0xF2F2F2");
    so.addVariable("scrubberFrameColor", "0xF2F2F2");
    so.addVariable("scrubTrackColor", "0x131313");
    so.addVariable("textBackgroundColor", "0x383838");
    so.addVariable("textColor", "0xffffff");
    so.write(targetContainer);
    

}



/* CODE FOR VIDEO LOADING A VIDEO PLAYER INTO A TARGETED DIV */


/* CODE FOR VIDEO LINKS THAT MAY POPULATE ON THE HOME PAGE MODULE */
jQuery(document).ready(function() {
    
    /*  TOP STORIES  */
    jQuery('#top-stories a.videoLink').click(function() {
        if(nbc.env !="dev.") {
            NBC_PageReload.interruptReload();
        } else {
        // Do nothing
        }
        
     if (navigator.userAgent.match(/like Mac OS X/i)) {
        
        var videoParams = this.id;
        var splitVideoParams = videoParams.split("-");
        var useThisId = splitVideoParams[1];
         
        playerts.bind('top-stories-thumb');
        tpController.setReleaseURL("http://link.theplatform.com/s/-/"+useThisId+"?mbr=true&manifest=m3u",replaceDefault=true,['top-stories-thumb']);

        
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
    });
    
    
    
    /* TOP STORIES */
    
    
        /* MULTIMEDIA MODULE */
    jQuery('#multimedia-module a.videoLink').click(function() {
        
        if (navigator.userAgent.match(/like Mac OS X/i)) {
             mmModule.navControl(this);
             thisTitleRow1 = this.title;
             thisTitle=escape(thisTitleRow1);
            try {
                hpInlineSlideShow31.autoPlayerEngaged = false;
                clearInterval(autoPlayer);
                jQuery('#mediaRegion').html('');
                }
                
                catch(e) {
                    U.log('ALERT:No slideshow has been loaded, no timer to halt..'+e)
                }
            
            var videoParams = this.id;
            var splitVideoParams = videoParams.split("-");
            var useThisId = splitVideoParams[1];

            
            //alert(targetDivID);
            //alert(targetDivSeq);
            
            jQuery('#mediaRegioniOS').css({'display':'block'});
            playerMM.bind('mediaRegioniOS');
            tpController.setReleaseURL("http://link.theplatform.com/s/-/"+useThisId+"?mbr=true&manifest=m3u",replaceDefault=true,['mediaRegioniOS']);
            return false;
        } else {
        
        
        
        var videoParams = this.id;
        var videoParamSplit = videoParams.split("-");
        var splitVideoParams = videoParams.split("-");
        var IdForCarousel = splitVideoParams[0];
    nbcVideoPageUtils.targetEndCard = jQuery('div.endcard-mm');
    jQuery(nbcVideoPageUtils.targetEndCard).hide();
    

     nbcVideoPageUtils.endCardTitle = jQuery(this).text();
    jQuery(nbcVideoPageUtils.targetEndCard).find('p.videoTitle').text(nbcVideoPageUtils.endCardTitle);

    
        if(nbc.env !="dev.") {
        NBC_PageReload.interruptReload();
        }
        
    if(jQuery.browser.msie) {
        jQuery('#multimedia-module').css({'height':'400px'});
    }
    
    try {
        hpInlineSlideShow31.autoPlayerEngaged = false;
        clearInterval(autoPlayer);
        }
        
        catch(e) {
            U.log('ALERT:No slideshow has been loaded, no timer to halt..'+e)
        }
         mmModule.navControl(this);
         thisTitleRow1 = this.title;
         thisTitle=escape(thisTitleRow1);
    
    //nbcVideoPageUtils.targetEndCard = jQuery('#multimedia-module div.endcard-mm');

    var scopeRandomID = Math.floor(Math.random()*1000);
    jQuery('#multimedia-module div.mediaRegion').attr('id',"mediaRegion"+scopeRandomID);
    
    nbcVideoPageUtils.getVideoMetaData("mediaRegion"+scopeRandomID, this.id,700,394, thisTitle,'multimediaplayer');
    //nbcVideoPageUtils.player442("mediaRegion"+scopeRandomID, this.id,700,394, thisTitle,'multimediaplayer');
    nbcVideoPageUtils.populateRelatedMedia(IdForCarousel);

    return false;
    
        } // END iOS detection
    
    });
    
    /* MULTIMEDIA MODULE */
    
        /* CITY MODULE */
    
    jQuery('div.hp-module a.videoLink').click(function() {
        if(nbc.env !="dev.") {
            NBC_PageReload.interruptReload();
        } else {
        // Do nothing
        }

        if (navigator.userAgent.match(/like Mac OS X/i)) {
            var videoParams = this.id;
            var splitVideoParams = videoParams.split("-");
            var useThisId = splitVideoParams[1];
            var targetDiv = jQuery(this).parents('div.hp-module').find('div.topStory').attr('id');
            
            var targetDivSplit = targetDiv.split("-");
            var targetDivID = targetDivSplit[0];
            var targetDivSeq = targetDivSplit[1];
            U.log('Attempted scope: player-'+targetDivSeq);
            //alert(targetDivID);
            //alert(targetDivSeq);
            
            
            window['player'+targetDivSeq].bind('player-'+targetDivSeq);
            
            //Commented out tpController call
            tpController.setReleaseURL("http://link.theplatform.com/s/-/"+useThisId+"?mbr=true&manifest=m3u",replaceDefault=true,['player-'+targetDivSeq]);
            return false;
        } else {
        

        //var targetDiv = jQuery(this).parents('div.hp-module').attr('id');
        var targetDiv = jQuery(this).parents('div.hp-module').children('div.videoCapture').attr('id');
        nbcVideoPageUtils.targetEndCard = jQuery(this).parents('div.hp-module').find('div.endcard-small');
        var expandThisDiv = jQuery(this).parents('div.hp-module').attr('id');
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
            //U.log("This is the close button.")
            jQuery('#'+targetDiv).html("");
            jQuery('#'+expandThisDiv+' div.videoClose').css({'display':'none'});
            jQuery('#'+expandThisDiv).animate({'height':'-=100px'});
            jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'visible'});
            jQuery('#'+expandThisDiv+' div.topStory').css({'visibility':'visible'});
            jQuery('#'+expandThisDiv+' div.storyTitleNoGrid').css({'visibility':'visible'});
            jQuery('#'+expandThisDiv+' div.storyTitleGrid').css({'visibility':'visible'});
            jQuery('#'+targetDiv).css({'height':'1px','width':'1px','padding-top':'0px','padding-left':'0px','z-index':'0'});
            jQuery(nbcVideoPageUtils.targetEndCard).hide();
        });
        

        jQuery('#'+expandThisDiv).animate({'height':'+=100px'},
                { complete:function(){
             jQuery('#'+targetDiv).css({'height':'287px','width':'510px','padding-top':'20px','padding-left':'70px','z-index':'5','background-color':'#fff','top':'15px'});
             
             try {
             tmpTitle = jQuery('#'+expandThisDiv).find('div.topStoryHeadline').text();
             jQuery(nbcVideoPageUtils.targetEndCard).find('p.videoTitle').text(tmpTitle);
             }
             
             catch(e) {
                
                 U.log("End card error: Title couldn't be found, attempting to recover...");
                 
             }
             nbcVideoPageUtils.getVideoMetaData(targetDiv, videoParams,510,287,thisLinksTitle,'franchiseplayer');
             
             //nbcVideoPageUtils.player442(targetDiv, videoParams,510,287,thisLinksTitle,'franchiseplayer');
             nbcVideoPageUtils.populateRelatedMedia(IdForCarousel);
             
            
            
            
            var clonedElement = jQuery(thisVideoSummary).clone();
            jQuery(clonedElement).appendTo(jQuery('#'+targetDiv));
            jQuery(clonedElement).css({'display':'block'});
            jQuery('#'+expandThisDiv+' div.videoClose').css({'display':'block'});
            }
            
        });
        
        } // END iOS detection

    });
    
    /* CITY MODULE */

});


/* CODE FOR VIDEO LINKS THAT MAY POPULATE IN THE MULTIMEDIA MODULE */



/* CODE FOR RIGHT RAIL FOLLOWING DOWN THE PAGE */


jQuery(document).ready(function() {
if( (nbc.omniture.pageType == "article") && (!document.getElementById('blogEmbed')) && (!document.getElementById('invRightRailWidgets')) && (partner_xfinity == false) ) {

rightrailTracker = {};

// Returns the smallest top value allowed to be assigned to the right rail for resting at the top.

rightrailTracker.maxCeiling = function() {
    invElementCheck = document.getElementById('invRightRailWidgets');
    featureElementCheck = document.getElementById('feature-header-container');
    ribbonElementCheck = document.getElementById('headerBannerContainer');

    if(invElementCheck || featureElementCheck || ribbonElementCheck) {
    totalRightRailHeight = jQuery('#rightrail').outerHeight();
    topStoriesModuleHeight = jQuery('#rr_b').outerHeight();
    U.log("Ribbon or feature or investigation!")
    maxCeilingForRightRail = (totalRightRailHeight - topStoriesModuleHeight);
    
    } else {

    maxCeilingForRightRail = 0;
    
    }
    
    return maxCeilingForRightRail;
    
    
}


// Returns the maximum top value allowed to be assigned to the right rail for resting at the bottom.
rightrailTracker.scrollLimitValue = function () {
    
    if (document.getElementById("blogMain")) {
    totalBodyHeight = jQuery('#articleText').height();
    } else {
    totalBodyHeight = jQuery('#ctarticle').height();
    }
    totalRightRailHeight = jQuery('#rr_b').outerHeight();
    rightRailTopOffset = parseInt(jQuery('#rightrail').css('margin-top'));
    U.log(totalBodyHeight +"-"+ "totalRightRailHeight" +"-"+ rightRailTopOffset);
    stallValue = (totalBodyHeight - totalRightRailHeight - rightRailTopOffset);
    
    return stallValue;


}

// EVERYTHING BETWEEN THESE LINES WILL EVENTUALLY BE IN A DOCUMENT READY CALL


rightrailTracker.topRestSpot = rightrailTracker.maxCeiling();
rightrailTracker.bottomRestSpot = rightrailTracker.scrollLimitValue();

if (document.getElementById("blogMain")) {
    theBigTarget = ".post_top_header_box";
    } else {
    theBigTarget = "#ctarticle";
    }



// jQuery('#rr_b').css({'position':'absolute'});
jQuery('#rr_b').css({'top':rightrailTracker.topRestSpot+'px'});
U.log("Right rail scroller is running..")


//EVERYTHING BETWEEN THESE LINES WILL EVENTUALLY BE IN A DOCUMENT READY CALL

jQuery(window).scroll(function() {

    if(jQuery(window).scrollTop() >= rightrailTracker.topRestSpot) {
        
        if((jQuery(window).scrollTop()-200) <= rightrailTracker.bottomRestSpot && (jQuery(window).scrollTop()-200) >= rightrailTracker.topRestSpot) {
            jQuery('#rr_b').css({'position':'fixed','top':'0px'});
        } else if( jQuery(window).scrollTop() > rightrailTracker.bottomRestSpot) {
            
            //if( (document.getElementById('newsletterSignupBoxContainer') || document.getElementById("feature-header-container") || document.getElementById("blog_header")) ) {
            if( (document.getElementById('newsletterSignupBoxContainer')) ) {
                // 150 was determined to be Just A Good Number. Alter to taste.
                //console.log("No Investigations | -155px");
            jQuery('#rr_b').css({'position':'relative','top':(rightrailTracker.bottomRestSpot-221)+'px'});
            } else {
                    // 60 was determined to be Just A Good Number. Alter to taste.
            //console.log("No investigations | -60px");
            jQuery('#rr_b').css({'position':'relative','top':(rightrailTracker.bottomRestSpot-131)+'px'});
            }
        }
        
        if(document.getElementById('invRightRailWidgets')) {
            if((jQuery(window).scrollTop()) <= (rightrailTracker.topRestSpot)) {
                jQuery('#rr_b').css({'position':'relative','top':'0px'});
            }
        } else {
            if((jQuery(window).scrollTop()) <= (jQuery(theBigTarget).offset().top)) {
                jQuery('#rr_b').css({'position':'relative','top':rightrailTracker.topRestSpot+'px'});
            }   
        }
        
        
    
    }
    
});
// END jQuery(window).scroll

} else if( (nbc.omniture.pageType == "article") && (!document.getElementById('blogEmbed')) && (nbc.section =="investigations") && (partner_xfinity == false) ) {
    rightrailTracker = {};

    // Returns the smallest top value allowed to be assigned to the right rail for resting at the top.

    rightrailTracker.maxCeiling = function() {
        invElementCheck = document.getElementById('invRightRailWidgets');
        featureElementCheck = document.getElementById('feature-header-container');

        if(invElementCheck || featureElementCheck) {
        totalRightRailHeight = jQuery('#rightrail').outerHeight();
        topStoriesModuleHeight = jQuery('#rr_b').outerHeight();

        maxCeilingForRightRail = (totalRightRailHeight - topStoriesModuleHeight);
        
        } else {

        maxCeilingForRightRail = 0;
        
        }
        
        return maxCeilingForRightRail;
        
        
    }


    // Returns the maximum top value allowed to be assigned to the right rail for resting at the bottom.
    rightrailTracker.scrollLimitValue = function () {
        totalBodyHeight = jQuery('#ctarticle').height();
        totalRightRailHeight = jQuery('#rr_b').outerHeight();
        rightRailTopOffset = parseInt(jQuery('#rightrail').css('margin-top'));

        stallValue = (totalBodyHeight - totalRightRailHeight - rightRailTopOffset);
        
        return stallValue;


    }

    // EVERYTHING BETWEEN THESE LINES WILL EVENTUALLY BE IN A DOCUMENT READY CALL


    rightrailTracker.topRestSpot = rightrailTracker.maxCeiling();
    rightrailTracker.bottomRestSpot = rightrailTracker.scrollLimitValue();



    jQuery('#rr_b').css({'position':'absolute'});
    jQuery('#rr_b').css({'top':rightrailTracker.topRestSpot+'px'});
    U.log("Right rail scroller is running..")


    //EVERYTHING BETWEEN THESE LINES WILL EVENTUALLY BE IN A DOCUMENT READY CALL

    jQuery(window).scroll(function() {

        if(jQuery(window).scrollTop() >= rightrailTracker.topRestSpot) {
            
            if((jQuery(window).scrollTop()-200) <= rightrailTracker.bottomRestSpot && (jQuery(window).scrollTop()-200) >= rightrailTracker.topRestSpot) {
                if(navigator.userAgent.indexOf('Firefox') > 1) {
                jQuery('#rr_b').css({'top':(jQuery(window).scrollTop()-200)+'px'});
                } else {
                jQuery('#rr_b').animate({'top':(jQuery(window).scrollTop()-200)+'px'},{ queue: false, duration: "fast" });
                }
            }
                
            if((jQuery(window).scrollTop()-200) == 0) {
                
                if(navigator.userAgent.indexOf('Firefox') > 1) {
                jQuery('#rr_b').css({'top':rightrailTracker.topRestSpot+'px'});
                } else {
                
                jQuery('#rr_b').animate({'top':rightrailTracker.topRestSpot+'px'},{ queue: false, duration: "fast" });
                }
                
            }
        }
        
    }); 
}
// END pageType if statement
});
// END jQuery(document).ready

 


/* ################################################################# */
/*                                                                   */
/*  TITLE:        NBC_JAVASCRIPT_LIBRARY.JS                          */
/*  VERSION:      2.04                                               */
/*  LAST UPDATED: 03/12/2010                                         */
/*  UPDATED BY:   Toby Spinks                                        */
/*                                                                   */
/*  NAMESPACE: NBC                                                   */
/* ################################################################# */

// Create NBC namespace 
var NBC = (typeof NBC=="object") ? NBC : {};

// Enjoy this functionality
NBC.enjoyThis = function() {
  this.ini = function() {
    var current = 1;
    var total   = $('#multimediaModule .multimediaModuleBody').children('.entry').length; 

    $('a.previous').click(function() {
        G.doPixelTracking(8);
        var prev = current - 1;
        if (prev < 1) {
          prev = total;
        }
        
        $('#pic' + current).fadeOut('normal');
        $('#l' + current).removeClass('current');
        $('#pic' + prev).fadeIn('normal');
        $('#l' + prev).addClass('current');
    
        current = prev;
        return false;
      });
    
    $('a.next').click(function() {
      G.doPixelTracking(8);
      var next = current + 1;
      if (next > total) {
        next = 1;
      }
      
      $('#pic' + current).fadeOut('normal');
      $('#l' + current).removeClass('current');
      $('#pic' + next).fadeIn('normal');
      $('#l' + next).addClass('current');
    
      current = next;
      return false;
    });

    $("#multiMediaNavigation ul").children().click(function() {
      var currId = $(this).attr("id");
      if (currId[0] == "l") { /* if it starts with "l" */
        var currnum = currId[1];
        G.doPixelTracking(8);
        $('#pic' + current).fadeOut('normal');
        $('#l' + current).removeClass('current');
        $('#pic'+currnum).fadeIn('normal');
        $('#l'+currnum).addClass('current');
        current = currnum;
      }
      return false;
    });// End of Gallery Switch
  };
};




//Watch this functionality
NBC.watchThis = function() {
  this.ini = function() {
    var wcurrent = 1;
    var wtotal   = $('#watchNowModule .watchNowModuleBody').children('.entry').length; 

    $('a.wprevious').click(function() {
        G.doPixelTracking(8);
        var wprev = wcurrent - 1;
        if (wprev < 1) {
          wprev = wtotal;
        }
        
        $('#vid_pic' + wcurrent).fadeOut('normal');
        $('#vid_pic' + wprev).fadeIn('normal');
    
        wcurrent = wprev;
        return false;
      });
    
    $('a.wnext').click(function() {
      G.doPixelTracking(8);
      var wnext = wcurrent + 1;
      if (wnext > wtotal) {
        wnext = 1;
      }
      
      $('#vid_pic' + wcurrent).fadeOut('normal');
      $('#vid_pic' + wnext).fadeIn('normal');
    
      wcurrent = wnext;
      return false;
    });

    // End of Watch This Switch
  };
};



NBC.Helpers = function() {
    // refresher
  this.attRefresher = function(att, elmId) {
    $(elmId).attr(att, $(elmId).attr(att));
    return false;
  };
    // ad iframe refresher
  this.AdFrameRefresher = function(elmId) {
    var ifSrc = $(elmId).attr("src");
    if(ifSrc != undefined) {
      if(typeof subSection != "undefined") {
        var arrS1   = ifSrc.split("sub=");
        var string1 = arrS1[0] + "sub=" + subSection + arrS1[1].slice(arrS1[1].indexOf(";"));
        var arrS2   = string1.split("ord=");
      }
      else {
        var arrS2   = ifSrc.split("ord=");
      }
      var string2 = arrS2[0] + "ord=" + nbc.roadblockOrdNumber + "?"
       // alert(string2);
      $(elmId).attr("src", string2);
    }
    return false;
  };
}; // end of Helpers

  // Gallery class
NBC.Gallery = function() {
    // initiatest gallery
  this.ini = function() {
    var scrollIncrement = 6;
    scrollIncrement = scrollIncrement + 1;
    var gallerySize = $('.gallery_thumb').size() - 1;
    var scrollToId = scrollIncrement;
    var galleryCurrentIdex = 1;
    $('.gallery_thumb').click(function(event) { //swaps main image with selected full size gallery thumbnail
        // get id
      var IdArr = $(this).attr('id').split('_');
      var strThmbId = "";
      strThmbId = IdArr[2];
      var imgIndex = strThmbId; // not sure if this is to be removed
      galleryCurrentIdex = parseInt(strThmbId);
      $(".gallery_thumb").removeClass("selected");
      $(this).addClass("selected");
        // track the slideshow click event
      G.doPixelTracking(51);
        // create update object
      var x = new NBC.Gallery();
      x.UpdImg(strThmbId);
      return false;
    })
      // next / previous
    $('#info_box a.next').click(function(event) { //load next image in gallery
      $(this).css('visibility','visible');
      if (galleryCurrentIdex == $('.gallery_thumb').size()) {
        galleryCurrentIdex = 1;
      }
      else {
        galleryCurrentIdex = galleryCurrentIdex + 1;
      }
        // track the slideshow click event
      G.doPixelTracking(51);
      var x = new NBC.Gallery();
      x.UpdImg(galleryCurrentIdex);
      var prevIndex = galleryCurrentIdex + 1;
      $(".gallery_thumb").removeClass("selected");
      $("#Gallery_Thumb_" + galleryCurrentIdex).addClass("selected");
      return false;
    })
      // next / previous
    $('.gallery_thumb_more').click(function(event) { // more
      if($(this).text() == "more") {
        $('.thumb_caption').html(gallery_thmbs[galleryCurrentIdex].caption);
        $(this).text("less");
      }
      else {
        $('.thumb_caption').html(gallery_thmbs[galleryCurrentIdex].caption_summary);
        $(this).text("more");
      }
      return false;
    })
    $('#info_box a.prev').click(function(event) { // load previous image in gallery
      if (galleryCurrentIdex == 1) {
        // $(this).css('visibility','hidden');
      }
      else {
        galleryCurrentIdex = galleryCurrentIdex - 1;
        $(this).css('visibility','visible');
          // track the slideshow click event
        G.doPixelTracking(51);
        var x = new NBC.Gallery();
        x.UpdImg(galleryCurrentIdex);
        var prevIndex = galleryCurrentIdex - 1;
        $(".gallery_thumb").removeClass("selected");
        $("#Gallery_Thumb_" + galleryCurrentIdex).addClass("selected");
      }
      return false;
    })
      // scrolling next
    $('#thumbnail_container a.next').click(function(event) { // scrolls thumbnail strip forward
      var _gallerySize;
      _gallerySize = gallerySize + 1;
      if (_gallerySize >= scrollIncrement) {
        var $mask = $('li.mask');
        var lastPos = gallerySize - 4;
        if (scrollToId >= lastPos) {
          scrollToId = lastPos;
        }
        $mask.stop().scrollTo($('#Gallery_Thumb_' + scrollToId), 800, {axis:'x'});
        scrollToId = scrollToId + 6;
        return false;
      }
      return false;
    })
      // scrolling previous
    $('#thumbnail_container a.prev').click(function(event) { // scrolls thumbnail strip back    
      var $mask = $('li.mask');
      scrollToId = 1;
      $mask.stop().scrollTo($('#Gallery_Thumb_' + scrollToId), 800, {axis:'x'});
      scrollToId = scrollIncrement;
      return false;
    })  
  };
    // update image class class
  this.UpdImg = function(strThmbId) {
      // refreshers ads
    var rf = new NBC.Helpers();
    rf.AdFrameRefresher("#nbcad_300x250_iframe");
    rf.AdFrameRefresher("#nbcad_728x90_iframe");
    $('#image_number').html("Image " + strThmbId + " of " + $('.gallery_thumb').size());
    $('div.gallery_image > div').css('background-image','url('+gallery_thmbs[strThmbId].fullImage+')');
    $('.author').html(" " + gallery_thmbs[strThmbId].credit);
    $('.gallery_thumb_more').text("more");
    if (gallery_thmbs[strThmbId].caption_summary == undefined) {
      $('.thumb_caption').html(gallery_thmbs[strThmbId].caption);
      $('.gallery_thumb_more').hide();
    }
    else {
      $('.thumb_caption').html(gallery_thmbs[strThmbId].caption_summary + "");
      $('.gallery_thumb_more').show();
    }
    if(gallery_thmbs[strThmbId].credit == "") {
      $('.byauthor').hide();
    }
    else {
      $('.byauthor').hide();
    }
    return false;
  };
};

  // interactive Insert
NBC.InteractiveInsert = function() {
  this.ini = function() {
    document.write("<script type=\"text/javascript\">var flashvars = {xmlfile:\"" + this.fDomain + "/includes/" + this.xmlFile + "\",url:\"" + this.mDomain + "\"};var params = {wmode:\"" + this.wmode + "\",allowFullScreen:\"" + this.allowFullScreen + "\",allowScripting:\"" + this.allowScripting + "\",allowScriptAccess:\"" + this.allScriptAccess + "\"};var attributes={};attributes.id=\"" + this.attributesId + "\";swfobject.embedSWF(\"" + this.mDomain + this.embedSWFFile + "\", \"audioSSContainer\", \"" + this.audioSSContainerWidth +"\", \"" + this.audioSSContainerHeight + "\", \"" + this.audioSSContainerVersion + "\", \"\", flashvars, params, attributes)<\/script>");
    return false;
  };
};

  // nbc contact form
NBC.ContactForm = function() {
  this.ini = function() {
    $("#contact_inp_submit").click(function() {
      var cx = new NBC.ContactForm();
      if (cx.checkEmail($("#contact_inp_email").val()) == false) {
        //alert("Wrong email format!");
      }
      else if ($("#contact_inp_subject").val() == "") {
        //alert("You have not entered a subject!");
      }
      else if ($("#contact_inp_messages").val() == "") {
        //alert("You have not entered any message!");
      }
      else {
        $("#contactform").submit();
      }
      return false;
    });
  }
  this.checkEmail = function(st){
    var Ex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var rs;
    if(st.match(Ex)) {
      rs = true;
    } else {
      rs = false;
    }
    return rs;
  }
};

NBC.Weather = function(){
      
      //initiatest poll function
      this.ini = function() {
      
        $(".weather_search_box").click(function(){
          $(this).val("");    
          return false;
        });
        
        $(".weather_search_btn").click(function(){
          var w = new NBC.Weather();
          w.ToolTip();
        return false;
        });
      
      $("#weather_change_loc").submit(function(){
          var w = new NBC.Weather();
          w.ToolTip();
        return false;
        });

        $("#weather_more_wrp a").click(function(){
          $(".currentLocation").fadeOut();  
          $("#weather_more_wrp div").fadeIn();
        return false;
        });
      
      $("#weather_currentLocation a").click(function(){
      $(".search_overlay").html("");  
        $(".currentLocation").fadeOut();                         
        $("#weather_more_wrp div").fadeIn();
        return false;
      }); 
      
      $(".weather_form_close_arrow").click(function(){
      $(".search_overlay").fadeOut();  
        $("#weather_more_wrp div").fadeOut();
        $(".currentLocation").fadeIn();
        $(".search_overlay").remove();
        return false;
      });
      
    };
      
      this.ToolTip = function()
      {
        var sVal = $(".weather_search_box").val();
        var sValArr = sVal.split(', ');
        var UrlArr = window.location.href.split('/'); // gets domain
        var url = "http://" + UrlArr[2] + "/i/location_lookup/?loc=" + $(".weather_search_box").val();
        var PostUrl;
        if (UrlArr[4] == "maps")
        {
          PostUrl = "http://" + UrlArr[2] + "/weather/maps/?zipCode=";
        }
        else
        {
          PostUrl = "http://" + UrlArr[2] + "/weather/?zipCode=";
        }
        
        
        $.ajax({
          type: "GET",
          url: url,
          dataType: "json",
            success: function(json){
          
        // reset and remove the old overlays
        $(".search_overlay").empty;
        
          // if there are no results
          if (typeof(json.search.loc) == 'undefined')
          {
              $(".search_wrp").remove(".search_overlay").append("<div class='search_overlay'><p>No Match Found. Please check your location.</p></div>");
          }
        
        else
          {
            if (json.search.loc instanceof Array)
            {
              //offer suggested cities
              var w = new NBC.Weather();
              w.GenToolTip(json.search.loc, PostUrl);
            }
            else // redirect if there is only one result

            {
              window.location = PostUrl + json.search.loc.id;
            }
          }
          
          }
        });
      
      };//end of toolTip
      
      
      // initiatest poll function
      this.GenToolTip = function(locObj, PostUrl)
      {
        var citiesHTML = "";
        for (i = 0; i < locObj.length; i++)
              {
                citiesHTML = citiesHTML + "<a class='s_overlay_link' href='" + PostUrl + locObj[i].id  + "'>" + locObj[i].textContent + "</a>";
              }
        $(".search_wrp").remove(".search_overlay").append("<div class='search_overlay'><p>" + citiesHTML + "</p></div>");
      }
    };


NBC.setupTabs = function() {
    // This must be external to any class (none here) and repeated after every user interaction
    // because FF misindexes anchors in the DOM tree when links are added and
  // removed in captions.
    // We us jquery for simplicity because IE uses a non-standard event model.
    // It is safe to remove event listeners even if the event listener has not
  // yet been associated
    // G.outputDebug2("setupButtons");
    
    //alert('setupTabs is running');
    
        // set up most recent
    $('#vmr').unbind('click', showMostVideoLatestStories(this));
  $('#vmr').bind('click', showMostVideoLatestStories(this));
    // setup most popular
  $('#vmp').unbind('click', showVideoMostPopular(this));
  $('#vmp').bind('click', showVideoMostPopular(this));
    // setup most commented
  $('#vmc').unbind('click', showVideoMostCommented(this));
  $('#vmc').bind('click', showVideoMostCommented(this));
    // setup video by section
  $('#vbs').unbind('click', showVideoBySection(this));
  $('#vbs').bind('click', showVideoBySection(this));
  
}



function enterKeyPressed(e) { //e is event object passed from function invocation
    var characterCode; // literal character code will be stored in this
            // variable

    if (e && e.which){ //if which property of event object is supported (NN4)
        e = e;
        characterCode = e.which; // character code is contained in NN4's
                  // which property
    }
    else {
        e = event;
        characterCode = e.keyCode; // character code is contained in IE's
                  // keyCode property
    }

    if (characterCode == 13) { //if generated character code is equal to ascii 13 (if enter key)
        return true;
    }   
    else{
        return false;
    }
}


var gallery_thmbs=new Array();

$(document).ready(function(){
  //start fuctions(onload)/

  // initiatest poll ajax
  //var pl = new NBC.Poll();
  //pl.ini();
  
  // weather ini
  var wthr = new NBC.Weather();
  wthr.ini();

  // enjoy this
  var enjoy = new NBC.enjoyThis();
  enjoy.ini();
  
  

  // watch this
  //var watch = new NBC.watchThis();
  //watch.ini();
  
  
  // calls ajax page DELETE
  $("#mynav a").click(function(){
    $(this).addClass("selected");
  return false;
  });


  // search taggle function
  $("#more_taggle").click(function(){
    if($(this).attr("class") != "open")
    {
      $("#more_options").show();
      $(this).text("™ Less Options");
      $(this).addClass("open")
    }
    else
    {
      $("#more_options").hide();
      $(this).text("™ More Options");
      $(this).removeClass("open")
    }
  return false;
  });
  
  // call for captions up and down
  
   $(".box").click(function(){
    var IdArr = $(this).attr('id').split('_'); // gets ID
    $("#imgCaption_" + IdArr[1]).fadeIn("fast");
  return false;
  });
  
  $(".overlayBox").click(function(){
  $(this).fadeOut("slow");
  return false;
  });
  
  $(".jqmClose").click(function(){
    var IdArr = $(this).attr('id').split('_'); // gets ID
    $("#jqm_cont_" + IdArr[2]).empty();
    $("#jqm_wrp_" + IdArr[2]).fadeTo("slow", 0);
    document.getElementById('jqm_wrp_' + IdArr[2]).style.display="none";
  });
  
// end onload//
});          

(function($){
  $.fn.vCenter = function(options) {
    var pos = {
      sTop : function() {
        return window.pageYOffset || document.documentElement && document.documentElement.scrollTop ||  document.body.scrollTop;
      },
      wHeight : function() { 
        return window.innerHeight || document.documentElement && document.documentElement.clientHeight || document.body.clientHeight;
      }
    };
    return this.each(function(index) {
      if (index == 0) {
        var $this = $(this);
        var elHeight = $this.height();
        var elTop = pos.sTop() + (pos.wHeight() / 2) - (elHeight / 2);
        $this.css({
          position: 'absolute',
          marginTop: '0',
          top: elTop
        });
      }
    });
  };

})(jQuery);


function getRandomNumber() {
    randomizedNumber = Math.round(Math.random()*1000000000);
    U.log('ad random n '+randomizedNumber);
    return randomizedNumber;
}

window['G']['getRandomNumber'] = getRandomNumber;


function doPoll(pollId, oid, pollAnswer) {
    var IdArr = $('#'+ oid).attr('id').split('_'); // gets ID
    var UrlArr = window.location.href.split('/'); // gets domain
    var url = 'http://' + UrlArr[2] + '/i/pollsubmit/?pid=' + pollId + '&mr=1&cid=' + poll_setting.cid + '&oid=' + IdArr[2] + '&submit=Submit';
    $.ajax({
      type: "GET",
      url: url,
      cache:false,
      dataType: "json",
      success: function(json) {

      for (i = 0; i <= json.poll_response.results.length; i++) {
      var domIterate = parseInt(i+1);
      var pollAnswer = 'poll_answer_' + domIterate + '_' + pollId;
      U.log(json.poll_response.results[i]);
      U.log(pollAnswer);
      U.log(jQuery('#'+pollAnswer).html());
      jQuery('#'+pollAnswer).html('<strong>'+json.poll_response.results[i]+'</strong>');
      }
        
        jQuery('.poll_list'+ pollId).hide();
          jQuery('.pollResults'+ pollId).fadeIn("fast");

      }
      });
} // end of NBC poll

/* LEGACY CODE - doPixelTracking  DO NOT CHANGE!! */

var trackedEvents = new Array();
trackedEvents[6]  = "Page Count";
trackedEvents[7]  = "Mood Module (dropdown)";
trackedEvents[8]  = "Mood Comments (radio buttons)";
trackedEvents[9]  = "Subnav Tracking";
trackedEvents[10] = "Mood Hover Click";
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
trackedEvents[47] = "Track Eat/Shop/Play";
trackedEvents[51] = "Slideshow Tracker";
trackedEvents[52] = "MediaViewer Timeline Clicks";
trackedEvents[53] = "Registration - Registration Open";
trackedEvents[54] = "Registration - Step 1 Complete";
trackedEvents[55] = "Registration - Step 2 Complete";
trackedEvents[56] = "Registration - Facebook Friends Added";
trackedEvents[57] = "MediaViewer Next Story Clicks";
trackedEvents[58] = "MediaViewer Previous Story Clicks";
trackedEvents[59] = "MediaViewer Most Commented Button Clicks";
trackedEvents[60] = "MediaViewer List View Clicks";
trackedEvents[61] = "MediaViewer Next Page Clicks";
trackedEvents[62] = "MediaViewer Previous Page Clicks";
  // faked events
trackedEvents[80] = "NBC Registration";
trackedEvents[81] = "Registration Cancellations";
trackedEvents[82] = "Facebook Registration";
trackedEvents[83] = "Lead Image Click";
trackedEvents[84] = "Slideshow Tracker Autoplay";
trackedEvents[85] = "Inline Slideshow Tracker";
trackedEvents[90] = "Share Options";

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
  
  
  var _c7  = "&c7="  + s.prop7;   // Content Source. Example: "Uncategorized"
  var _c6  = "&c6="  + location.href;                  // Current URL
  var _c8  = "&c8="  + s.prop8;   // Not sure. Example: "nbc".
  var _c9  = "&c9="  + s.prop9;   // Station Call Letters. Example: "KNSD".
  var _c10 = "&c10=" + s.prop10;  // Site name in English. Example: "NBC%20San%20Diego". Same as _sitename
  var _c15 = "";                  // Subnav Tracking
  if(s.prop19 && (s.prop19 != "undefined")) {    // Feature -- clear if there isn't one
   var _c19 = "&c19=" + s.prop19; // Feature -- clear if there isn't one 
  }
  else {
   var _c19 = "";  
  }
  var _c20 = "";                  // Market Type
  if ((s.prop22) && (s.prop22 != "undefined")) {      // Franchise -- clear if there isn't one
   var _c22 = "&c22=" + s.prop22; // Feature -- clear if there isn't one 
  }
  else {
   var _c22 = "";  
  }
  
  if (nbc.contentType = "Gallery") {
  var _c26 = "&c26=D=g";
  } else {
var _c26 = "";
  }
  var _c30 = "";                  // Page mood status.  Example: "furious".  From s.eVar30. Equal to _v24 but used sometimes instead.
  var _c31 = "";                  // Registration type
  var _c39 = "";                  // Get gallery type exe. full page, embedded or lead image
  var _c57 = "";                  // Eat/Play/Shop
  var _v57 = "";                  // Eat/Play/Shop
  var _v1  = "";                  // Identifies whether user is registered, non-registered, or facebook-registered
  var _v2  = "";                  // eVar for traffic routes.
  var _v3  = "";                  // Content Type. Example: "Gallery". Same value as _c3 (above).
  var _v11 = "";                  // Tracks Facebook registration event
  var _v12 = "";                  // Tracks NBC registration event
  var _v13 = "";                  // Registration cancellation event
  var _v16 = "";                  // share method
  var _v24 = "";                  // Page mood status.  Example: "furious".  From s.eVar30. 
  var _v28 = "";                  // User-selected mood.  Example: "furious".  From nbc.omniture.userVote.
  var _v29 = "";                  // Content Type
  var _v31 = "";                  // Mood header status.  Example: "furious"
  var _v32 = "";                  // Moment category.  Example: "check it"
  var _v34 = "";                  // Get age on login
  var _v35 = "";                  // Get gender on login
  var _v39 = "";                  // Get gallery type exe. full page, embedded or lead image
  var _trackingForRegstr = "";    // If registration initiated, tracks whether NBC Reg successful, Facebook Reg successful, or User cancellation
  var _randomValue = "&rndm=" + Math.random()*10000000000000000;
  var doNothing = false;          // used to handle muiltiple clicks
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
    U.log("before all ifs");
      // slideshow and section page subNav clicks (count as new page view)
    if( eventNumber == 9 || eventNumber == 11 || eventNumber == 12 || eventNumber == 13 || eventNumber == 30 || eventNumber == 47 || eventNumber == 51 || eventNumber == 84 || eventNumber == 85 ) {
        U.log("inside of big if");
      if(eventNumber == 9) { // subnav
        _c4  = "&c4=" + subSection;
        _c15 = "&c15=D%3dch%2b%22%7c%22%2bc4";
        _v3 = "&v3=D%3dc3";
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
      else if(eventNumber == 47) {
        _c57 = "&c57=" + nbc.brand+":"+nbc.omnitureVertical.vertical+":"+nbc.omnitureVertical.neighborhood;
        _v57 = "&v57=" + nbc.brand+":"+nbc.omnitureVertical.vertical+":"+nbc.omnitureVertical.neighborhood;
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
        _c4 = "&c4=multimedia_home";    
        }
        _c3 = "&c3=Gallery";
        _c30 = "&c30=" + s.eVar30;
        _eventNumber = "event" + eventNumber + ",event6";  // event 6 records a page view
        if ( eventNumber == 85 ) {
         if( nbc.domain == "www.thefeast.com") {
            nbcSlideshowTitle = nbc.gallery.title;
            _c19 = "";
          }
        }
        if ( eventNumber == 51 ) {      
            if ((nbc.galleryVideo) && (nbc.galleryVideo.title != "")) {
                U.log("TEST "+ nbc.galleryVideo.title);
               nbcSlideshowTitle = nbc.galleryVideo.title;
               _c3 = "&c3=Gallery";
               _c19 = "";
               _ch = "&ch=" + nbc.galleryVideo.title;
               _c4 = "&c4=" + nbc.galleryVideo.title;     
            }
        }
        
        if( typeof nbcSlideshowTitle != "undefined" ) { // for embedded slideshows
          _pageName = nbcSlideshowTitle;
          if (nbc.omniture.pageType == "blog") {
              _ch = "&ch=blogs";
              _c4 = "&c4="+nbc.subsectionPageTitle;
          }
          
          else if (nbc.omniture.pageType == "article") {
              _ch = "&ch="+nbc.section;
              _c4 = "&c4="+nbc.subsection;
          }
          
          else {
          _ch = "&ch=multimedia_home";
          _c4 = "&c4=multimedia_home";
          }
          
          _c3  = "&c3=Gallery";
          _c39 = "&c39=Embedded";
          _v39 = "&v39=D%3dc39";
          
          if(_c39 == "&c39=Embedded" && s.prop7 == "Politico") {
              _c7 = "";
          }
          
          if ( eventNumber == 85 ) {    // for feast blog slideshows            
              _c39 = "&c39=Inline";
            }  
          if( nbc.domain == "www.thefeast.com") {
              _c39 = "&c39="+nbc.gallery.tracked_page;
          }
        }
        else { // for full-page slideshows
          _pageName = document.title.replace(/^\s+|\n+|\t+|\s+$/g,''); // strip whitespace
          
          _c3 = "&c3=Gallery";
          _c39 = "&c39=Full%20Page";
          if( nbc.domain == "www.thefeast.com") {
              _c39 = "&c39="+nbc.gallery.tracked_page;
          }
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
        U.log("Mood Module");
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
    
    else if(eventNumber == 6) {
        //alert(eventNumber);
        _v1  = "&v1="  + s.eVar1;
        _v3  = "&v3="  + s.prop3;
        _eventNumber = "event" + eventNumber; 
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
    _srcURL = U.charEncodeSpaces("http://oimg.nbcuni.com/b/ss/" + _reportSuiteID + "/1/H.-2pdv-2/s16571644299919?" + _pe + "pev2=" + _siteName + _ch + _hostname + "&pageName=" + _pageName + _c3 + "&events=" + _eventNumber + _c4 + _c6 + _c7 + _c8 + _c9 + _c10 + _c15 + _c19 + _c20 + _c22 + _c26 + _c30 + _c31 + _c39 + _c57 + _v1 + _v2 + _v3 + _v16 + _v24 + _v28 + _v29 + _v31 + _v32 + _v34 + _v35 + _v39 + _v57 + _trackingForRegstr + _randomValue);
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

/* LEGACY CODE - doPixelTracking */
