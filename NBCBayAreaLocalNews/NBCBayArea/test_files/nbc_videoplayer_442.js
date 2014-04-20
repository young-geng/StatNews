/***************************************************************************************
* Last edited by: sabler
* Date modified: 12-02-2013
* CMS Version: 1274
* Ticket No.: 20568
***************************************************************************************/

VK={};VK.isAndroid=false;VK.isHoneyCombOrHigher=false;VK.sniff=function(){var thisUserAgent=navigator.userAgent;var androidIndex=thisUserAgent.indexOf('Android');VK.isAndroid=(androidIndex!=-1)?true:false;if(VK.isAndroid==true){var tmpVer=parseInt(thisUserAgent[androidIndex+8])}VK.isHoneyCombOrHigher=(tmpVer>=3)?true:false;return VK.isHoneyCombOrHigher}

/* 
 jQuery('div.playButtonLarge').click(function() {
 nbcVideoPageUtils.player442('videoCapture','125800648-2IFpIXFhsP9ZMHZ0z2wvXtkkan4_8ANi-true-article-TK-TK',654,368,'[NY] Your Forecast for Tuesday, July 19','articleplayer');
 });
 */

/* Fail-safe - If for some reason the object wasn't created in the head, create it now to prevent JS failures. */
if (!window.nbcVideoPageUtils) {
	var nbcVideoPageUtils = {};
}

nbc.jQueryVersion = $().jquery;

// Initialize object variables

nbcVideoPageUtils.currentClipHomeSection = nbc.section;
nbcVideoPageUtils.currentClipHomeSubsection = nbc.subsection;
nbcVideoPageUtils.currentClipAuthor = null;
nbcVideoPageUtils.currentClipTitle = null;
nbcVideoPageUtils.currentClipRunTime = null;
nbcVideoPageUtils.currentClipAdCampaign = null;
nbcVideoPageUtils.currentClipContentSource = null;
nbcVideoPageUtils.currentClipSummary = null;
nbcVideoPageUtils.isLongForm = null;
nbcVideoPageUtils.RSID = nbc.market.replace("nbc","nbcuots"); //created to get the market value  ex: nbcuotsnewyork
nbcVideoPageUtils.activeHTMLPlayers = new Array();

// Variables specifically for Fall Preview 2012
nbcVideoPageUtils.brightcoveScriptLoaded = null;
nbcVideoPageUtils.brightcoveEngaged = null;
nbcVideoPageUtils.captionState = false;

// Some wildcard variables may come in handy.
nbcVideoPageUtils.universalVarOne = null;
nbcVideoPageUtils.universalVarTwo = null;

// OS Specific fields
nbcVideoPageUtils.isItHoneyComb = VK.sniff();

nbcVideoPageUtils.feedList = {
	"ny" : "44jiovg9p5uKwzEIHLp8RPuSE1uWvnk_",
	"har" : "m11x_Cx49L1btHE8dM7OnugsLqSjeTya",
	"dc" : "iNElwJSkZ8Ps6zR8VG0aZUKvlWjzJs0d",
	"phi" : "U7a79w6j_G4KB4BEXu0n69_MlFyhz9pu",
	"ami" : "r6HLTPT_FLAkg_4telS6CzOWNEnCMRZv",
	"chi" : "fFr0CkxSComPoHQ5vVF9Y4MhtAidEy_T",
	"dfw" : "DkpNaAbtt1Y7UDLW_AL8ow_OwJP_vxNy",
	"bay" : "0qOmnPb_QVmOji5_WKZjC_jsZeM1Plcb",
	"la" : "MchVgFvMDIPPrq4UrbQjaYyPSxNjHxq_",
	"dgo" : "HzF7XNkfANV9gAquRUCHc9rlUnhmYqOq"
};

nbcVideoPageUtils.videoStillSeq = 0;


nbcVideoPageUtils.pageTitleParser = function (preferredTitle) {
	var titlePipeLocation = document.title.indexOf("|");
	var shortPageTitle = document.title.slice(0,(titlePipeLocation-1));

	switch(preferredTitle) {
	case "fullTitle":
		return document.title;
		break;

	
	case "shortTitle":
		return shortPageTitle;
		break;
	}
}

nbcVideoPageUtils.pdkPluginPath = {
		 // A JSON object of file paths to both JS and SWF files.
		 // Swap comments to test an alternate plugin
			"omniture" : nbc.mediaDomain + "/designvideo/omnitureMedia443.swf",
			
			//cypress designvideo/omnitureMedia.swf
			//"omnitureCypress" : nbc.mediaDomain + "/designvideo/omnitureMedia.swf",
			"omnitureCypress" : nbc.mediaDomain + "/designvideo/omnitureMedia_v3.swf",
			
			"f4mparser": "/assets/"+nbc.pdkPath+"/pdk/swf/F4mParser.swf",
			"akamaiHD" : "/assets/"+nbc.pdkPath+"/pdk/swf/akamaiHD.swf",
			"comscore" : "/assets/"+nbc.pdkPath+"/pdk/swf/comScore.swf",
			"chartbeat": "http://static.chartbeat.com/swf/ChartbeatPDK.swf",
			"conviva" : "http://livepassdl.conviva.com/thePlatform/ConvivaThePlatformPlugin_5_0_5.swf",
			"tremor" : "http://objects.tremormedia.com/embed/swf/tpacudeoplugin46.swf",
			// "tremor" : "http://objectsorigin.beta.tremormedia.com/embed/swf/tpacudeoplugin46.swf"
			"closeCaption" : "/assets/"+nbc.pdkPath+"/pdk/swf/liveCaptions.swf"
		};

nbcVideoPageUtils.getVideoMetaData = function(targetContainer, videoIDString,
		width, height, thisTitle, playertype, requestFromRelatedMedia) {
	// If the parameter is missing from the call, default to false.
	if (!requestFromRelatedMedia) {
		requestFromRelatedMedia == false;
	}

	if (requestFromRelatedMedia == true) {
		jQuery('#endcard').hide();
		// tpController.removeEventListener("OnMediaEnd","nbcVideoPageUtils.endCardTest",['*']);
		var videoReleaseID = videoIDString;

	} else {
		var videoIDParams = videoIDString.split("-");
		var videoReleaseID = videoIDParams[0];
	}

	jQuery.ajax( {
				url : nbc.fullDomain + "/i/dispatcher/?id=" + videoReleaseID+ "&thumbWidth=" + width + "&thumbHeight=" + height+ "&h=v3_videoMetadata",
				dataType : "json",
				cache : false,
				success : function(data) {
					nbcVideoPageUtils.currentClipAuthor = data.author;
					nbcVideoPageUtils.currentClipTitle = escape(data.title);
					nbcVideoPageUtils.currentClipRunTime = data.length;
					nbcVideoPageUtils.currentClipPlatformPid = data.videoId;
					nbcVideoPageUtils.currentClipAdCampaign = data.adCampaign;
					nbcVideoPageUtils.currentClipContentSource = data.contentSources;
					nbcVideoPageUtils.currentClipContentCode = nbcVideoPageUtils.currentClipContentSource.split(" -")[0];
					nbcVideoPageUtils.playerPreviewImage = data.thumbnailUrl;
					nbcVideoPageUtils.currentClipSummary = data.fullSummary;
					nbcVideoPageUtils.videoReleaseId = data.contentId;
					nbcVideoPageUtils.videoMediaId = data.videoMediaId;
					nbcVideoPageUtils.runpreroll = data.noPreRollBasedOnCAC;
					nbcVideoPageUtils.omnitureFriendlyTitle = data.omniture_prop22;
					try {
						if(nbcVideoPageUtils.thisIsALiveStream == true) {
							nbcVideoPageUtils.shareUrlForPlatform = document.location.href;
						} else {
							nbcVideoPageUtils.shareUrlForPlatform = data.contentUrl;
						}
					}

					catch (e) {
						/*
						U.log("nbcVideoPageUtils.getVideoMetaData: Attempt to build player-compatible social URL failed.")
						U.log("nbcVideoPageUtils.getVideoMetaData: " + e);
						*/
					}
					
					if(parseInt(nbcVideoPageUtils.currentClipRunTime) >= 22) {
						nbcVideoPageUtils.isLongForm = true;
					} else {
						nbcVideoPageUtils.isLongForm = false;
					}
					
					/*
					if(data.omniture_prop22) {
						nbcVideoPageUtils.currentClipAdCampaign = data.omniture_prop22.replace(/ /g, "-");;
					}
					*/
					
					if(playertype == "multimediaplayer") {
						jQuery('#mmVideoSummary').show();
						jQuery('#mmVideoSummary').html("<p>"+nbcVideoPageUtils.currentClipSummary+"</p>");
					}
					
					if(nbcVideoPageUtils.liveVideoShellTitle) {
						nbcVideoPageUtils.currentClipTitle = escape(nbcVideoPageUtils.liveVideoShellTitle);
					}
				},

				complete : function(data) {
					// U.log(data);
					
					/*
					embeddedPlayerHTML = '<embed width="576" height="324" src="'
						+ nbc.mediaDomain
						+ '/assets/pdk449/pdk/swf/flvPlayer.swf?pid='
						+ nbcVideoPageUtils.currentClipPlatformPid
						+ '" flashvars="v=http%3A%2F%2F'
						+ nbc.domain
						+ '%2Fi%2Fembed_new%2F%3Fcid%3D'
						+ nbcVideoPageUtils.videoReleaseId
						+ '&path=%2F'
						+ nbc.section
						+ '/'
						+ nbc.subsection
						+ '" allowFullScreen="true" AllowScriptAccess="always" /> <p style="font-size:small">View more videos at: <a href="http://'
						+ nbc.host
						+ '/?__source=embedCode">http://'
						+ nbc.host + '</a>.</p>';
						*/
					
						embeddedPlayerHTML = '<scr'+'ipt type="text/javascript" charset="UTF-8" src="http://'+nbc.env+nbc.domain+'/portableplayer/?cmsID='+videoReleaseID+'&videoID={releasePID}&origin='+nbc.host+'&sec='+nbc.section+'&subsec='+nbc.subsection+'&width=600&height=360"></scr'+'ipt>';



					if (requestFromRelatedMedia == true) {
						videoIDString = videoReleaseID + "-"
								+ nbcVideoPageUtils.currentClipPlatformPid
								+ "-true-article-TK-TK";



						if (navigator.userAgent.match(/like Mac OS X/i)) {
							tpController.setRelease("http://link.theplatform.com/s/Yh1nAC/cN0_EtfNKcqgX5d5iKH1dHKZANnBypm2?mbr=true&manifest=m3u",replaceDefault = true)
						} else {
							jQuery('#videoCapture').html('<div id=videoStill' + nbcVideoPageUtils.videoStillSeq + ' style="width:654px; height:368px; overflow:hidden;"></div>');
							nbcVideoPageUtils.player442('videoStill' + nbcVideoPageUtils.videoStillSeq,videoIDString, width, height,thisTitle, playertype);
							nbcVideoPageUtils.videoStillSeq += 1;
						}
					} else {
						nbcVideoPageUtils.player442(targetContainer,videoIDString, width, height, thisTitle,playertype);
					}
				}
			});
}

nbcVideoPageUtils.player442 = function(targetContainer, videoIDString, width, height, thisTitle, playertype) {
	var videoIDParams = videoIDString.split("-");

	var videoReleaseID = videoIDParams[0];
	var videoIDForThePlatform = videoIDParams[1];
	var syndy = videoIDParams[2];
	var originModule = videoIDParams[3];
	var videoCategorization = videoIDParams[4];
	var videoContentSource = videoIDParams[5];
	nbcVideoPageUtils.videoReleaseId = videoReleaseID;
	
	var now = jQuery.now();
	

	// nbcVideoPageUtils.getVideoMetaData(videoReleaseID);


	
	if(playertype == "slideshowplayer") {
		var tremorExclusion = "slideshow";
	} else {
		var tremorExclusion = playertype;
	}

	if (syndy == "true") {
		var syndy = "y";
	}
	
	if(playertype == "livePlayer") {
		nbcVideoPageUtils.thisIsALiveStream = true;
	} else {
		nbcVideoPageUtils.thisIsALiveStream = false;
	}

	if (nbc.section == "shows") {
		nbcVideoPageUtils.omniChannel = nbc.subsection;
	} else {
		nbcVideoPageUtils.omniChannel = nbc.section;
	}

	if (playertype == "multimediaplayer") {
		nbcVideoPageUtils.omniChannel = "multimedia_home";
	} else if (playertype == "franchiseplayer") {
		nbcVideoPageUtils.omniChannel = "franchise_home";
	} else if (playertype == "weatherplayer") {
		nbcVideoPageUtils.omniChannel = "Weather";
	} 
	
	

	 player = new Player(targetContainer, width, height, syndy);
	// player.logLevel = "debug";
	//player.fp.bgcolor = "0xffffff";
	player.fp.wmode = "opaque";
	player.logLevel = "warn";
	player.allowFullScreen = "true";
	player.width = width;
	player.height = height;
	player.showAdCountdown = true;

	if (nbc.omniture.pageType == "article") {
		var nbcSubSection = nbc.subsection;

		
		if( (typeof nbc.subsectionPageTitle !="undefined") && (nbc.subsectionPageTitle !="" && nbc.subsectionPageTitle !="Investigations") ) {
			nbcVideoPageUtils.seriesFlag = "series";
			} else {
			nbcVideoPageUtils.seriesFlag = "investigations_landing";
			}
		
		if(nbc.section != "investigations") {
			nbcVideoPageUtils.seriesFlag = nbc.subsection;
		}
		
		var encodedSeriesName = "";
		if(nbc.subsection == "series"){
			seriesName = nbc.subsectionPageTitle;
			encodedSeriesName = seriesName.replace(/ /g,"-").toLowerCase();
		}
		//player.pluginOmniture = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop5,prop3,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ nbcVideoPageUtils.currentClipTitle + "|channel="+ nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4=" + nbcVideoPageUtils.seriesFlag + "|prop5="+ encodedSeriesName+ "|prop6=" + document.location.href+ "|prop10=" + nbc.brand+ "|prop26=D=g|prop37=TK1|eVar39=VideoPlayer|eVar40="+ nbcVideoPageUtils.currentClipTitle + "|prop48=" + playertype+ "|eVar48=" + playertype + "|prop49="+ nbcVideoPageUtils.currentClipTitle + "|frequency=25%25";
		player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		player.pluginTremor = "type=adcomponent|URL=" +nbcVideoPageUtils.pdkPluginPath.tremor+ "|progId="+nbc.tremorKey+"|videoDescriptionUrl="+location.href+"|AdUnit1stLevel="+nbc.gptParams.suitename+"|AdUnit2nd-5thLevel="+nbc.gptParams.gptZone+"|videoplatform=flash|feature="+nbc.gptParams.pageData.feature+"|contentid="+nbcVideoPageUtils.videoMediaId+"|cid="+nbcVideoPageUtils.videoMediaId+"|pagetype="+nbc.gptParams.pageData.pagetype+"|sponsor="+nbc.gptParams.pageData.sponsor+"|pt="+nbc.omniture.playerType+"|stage="+nbc.gptParams.pageData.stage+"|sensitive="+nbc.gptParams.pageData.sensitive+"|nopreroll="+nbcVideoPageUtils.runpreroll+"|adtest="+nbc.gptParams.pageData.adtest+"|TIMESTAMP="+now;
		
		if (nbc.siteKey == "test") {
			player.pluginAkamaiHD = "type=player|URL=http://www.nbcnewyork.com/assets/pdk449/pdk/swf/akamaiHD.swf|priority=4|hosts=-f.akamaihd.net";
		} else {
			player.pluginAkamaiHD = "type=player|URL=" +nbcVideoPageUtils.pdkPluginPath.akamaiHD+ "|priority=4|hosts=-f.akamaihd.net";
		}
		
		/*  if(nbcVideoPageUtils.thisIsALiveStream == true) {
			//player.pluginFlashManifestParser = "type=Format|URL=http://"+nbc.domain+"/assets/pdk449/pdk/swf/F4mParser.swf|priority=5";
		} */
		
		
	} else if (nbc.omniture.pageType == "home" && nbc.siteKey != "ami") {
		//player.pluginOmniture = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle + "|channel=" + nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4="+ nbcVideoPageUtils.omniChannel + "|prop6="+ document.location.href+ "|prop26=D=g|prop37=TK2|eVar39=VideoPlayer|prop10="+nbc.brand+"|eVar40=" + thisTitle+ "|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
		player.pluginTremor = "type=adcomponent|URL=" +nbcVideoPageUtils.pdkPluginPath.tremor+ "|progId="+nbc.tremorKey+"|videoDescriptionUrl="+location.href+"|AdUnit1stLevel="+nbc.gptParams.suitename+"|AdUnit2nd-5thLevel="+nbc.gptParams.gptZone+"|videoplatform=flash|feature="+nbc.gptParams.pageData.feature+"|contentid="+nbcVideoPageUtils.videoMediaId+"|cid="+nbcVideoPageUtils.videoMediaId+"|pagetype="+nbc.gptParams.pageData.pagetype+"|sponsor="+nbc.gptParams.pageData.sponsor+"|pt="+nbc.omniture.playerType+"|stage="+nbc.gptParams.pageData.stage+"|sensitive="+nbc.gptParams.pageData.sensitive+"|nopreroll="+nbcVideoPageUtils.runpreroll+"|adtest="+nbc.gptParams.pageData.adtest+"|TIMESTAMP="+now;
		player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		if (nbc.siteKey == "test") {
			player.pluginAkamaiHD = "type=player|URL=http://www.nbcnewyork.com/assets/pdk449/pdk/swf/akamaiHD.swf|priority=4|hosts=-f.akamaihd.net";
			
		} else {
			player.pluginAkamaiHD = "type=player|URL=" +nbcVideoPageUtils.pdkPluginPath.akamaiHD+ "|priority=4|hosts=-f.akamaihd.net";
			
		}

	} else if (nbc.omniture.pageType == "home" && nbc.siteKey == "ami") {
		//player.pluginOmniture = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ nbcVideoPageUtils.currentClipTitle + "|channel="+ nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4="+ nbcVideoPageUtils.omniChannel + "|prop6="+ document.location.href+ "|prop26=D=g|prop37=TK3|eVar39=VideoPlayer|prop10="+nbc.brand+"|eVar40="+ nbcVideoPageUtils.currentClipTitle + "|prop48=" + playertype+ "|eVar48=" + playertype + "|prop49="+ nbcVideoPageUtils.currentClipTitle + "|frequency=25%25";
		player.pluginTremor = "type=adcomponent|URL=" +nbcVideoPageUtils.pdkPluginPath.tremor+ "|progId="+nbc.tremorKey+"|videoDescriptionUrl="+location.href+"|AdUnit1stLevel="+nbc.gptParams.suitename+"|AdUnit2nd-5thLevel="+nbc.gptParams.gptZone+"|videoplatform=flash|feature="+nbc.gptParams.pageData.feature+"|contentid="+nbcVideoPageUtils.videoMediaId+"|cid="+nbcVideoPageUtils.videoMediaId+"|pagetype="+nbc.gptParams.pageData.pagetype+"|sponsor="+nbc.gptParams.pageData.sponsor+"|pt="+nbc.omniture.playerType+"|stage="+nbc.gptParams.pageData.stage+"|sensitive="+nbc.gptParams.pageData.sensitive+"|nopreroll="+nbcVideoPageUtils.runpreroll+"|adtest="+nbc.gptParams.pageData.adtest+"|TIMESTAMP="+now;
		player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		
		
		if (nbc.siteKey == "test") {
			player.pluginAkamaiHD = "type=player|URL=http://www.nbcnewyork.com/assets/pdk449/pdk/swf/akamaiHD.swf|priority=4|hosts=-f.akamaihd.net";
			
		} else {
			player.pluginAkamaiHD = "type=player|URL=" +nbcVideoPageUtils.pdkPluginPath.akamaiHD+ "|priority=4|hosts=-f.akamaihd.net";
			
		}

	} else {
		if ((nbc.omniture.pageType == "blog")) {
			//player.pluginOmniture = "type=tracking|URL="+ nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,prop10,prop19,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle+ "|channel=blogs|prop2=VideoPlayer|prop3=Video|prop4="+ nbc.subsection + "|prop6=" + document.location.href+ "|prop10=" + nbc.brand + "|prop19=" + nbc.subsection+ "|prop26=D=g|prop37=TK4|eVar39=VideoPlayer|eVar40=" + thisTitle+ "|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
			
			player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		} else if (nbc.omniture.pageType == "feature") {
			
			//player.pluginOmniture = "type=tracking|URL="+ nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop6,prop22,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle + "|channel=" + nbc.section+ "|prop2=VideoPlayer|prop3=Video|prop4=" + nbc.subsection+ "|prop6=" + document.location.href+ "|prop22="+ nbcVideoPageUtils.omnitureFriendlyTitle +"|prop37=TK5|eVar39=VideoPlayer|eVar40=" + thisTitle+ "|prop26=D=g|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
			
			player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		} else {
			var nbcSubSection = nbcVideoPageUtils.omniChannel;
			

				if(nbc.omniture.pageSubType == "series-landing-page"){
					nbcSubSection = "series";
				} else {
					nbcSubSection = "investigations_landing";
				}
				
				
			}
		
		if(nbc.omniture.pageType == "investigations") {
			if( (typeof nbc.subsectionPageTitle !="undefined") && (nbc.subsectionPageTitle !="" && nbc.subsectionPageTitle!="Investigations") ) {
				nbcVideoPageUtils.seriesTitle = nbc.subsectionPageTitle;
				
			} else {
				nbcVideoPageUtils.seriesTitle = "";
			}
			
			if (playertype == "invTeamPagePlayer") {
				nbcSubSection = "the-team";
				nbcVideoPageUtils.seriesTitle = "";
			}
			
			
			//player.pluginOmniture = "type=tracking|URL="+ nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop5,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle + "|channel=" + nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4="+ nbcSubSection + "|prop5="+nbcVideoPageUtils.seriesTitle+"|prop6="+ document.location.href+ "|prop10=" + nbc.brand+ "|prop26=D=g|prop37=TK6|eVar39=VideoPlayer|eVar40=" + thisTitle+ "|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
			
		}
		
		if(nbc.section == "weather" && nbc.subsection =="") {
			//player.pluginOmniture = "type=tracking|URL="+ nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop5,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle + "|channel=" + nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4=weather_landing|prop6="+ document.location.href+ "|prop10=" + nbc.brand+ "|prop26=D=g|prop37=TK7|eVar39=VideoPlayer|eVar40=" + thisTitle+ "|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
		} else {
			//player.pluginOmniture = "type=tracking|URL="+ nbcVideoPageUtils.pdkPluginPath.omniture+ "|account="+ mmModule.omni+ "|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|trackVars=pageName,channel,prop2,prop4,prop3,prop5,prop6,prop10,prop26,eVar36,prop37,eVar39,eVar40,prop48,eVar48,prop49|pageName="+ thisTitle + "|channel=" + nbcVideoPageUtils.omniChannel+ "|prop2=VideoPlayer|prop3=Video|prop4="+ nbc.subsection + "|prop5="+nbcVideoPageUtils.seriesTitle+"|prop6="+ document.location.href+ "|prop26=D=g|prop10=" + nbc.brand+ "|prop37=TK8|eVar39=VideoPlayer|eVar40=" + thisTitle+ "|prop48=" + playertype + "|eVar48=" + playertype+ "|prop49=" + thisTitle + "|frequency=25%25";
		}
		
		
		
		player.pluginTremor = "type=adcomponent|URL=" +nbcVideoPageUtils.pdkPluginPath.tremor+ "|progId="+nbc.tremorKey+"|videoDescriptionUrl="+location.href+"|AdUnit1stLevel="+nbc.gptParams.suitename+"|AdUnit2nd-5thLevel="+nbc.gptParams.gptZone+"|videoplatform=flash|feature="+nbc.gptParams.pageData.feature+"|contentid="+nbcVideoPageUtils.videoMediaId+"|cid="+nbcVideoPageUtils.videoMediaId+"|pagetype="+nbc.gptParams.pageData.pagetype+"|sponsor="+nbc.gptParams.pageData.sponsor+"|pt="+nbc.omniture.playerType+"|stage="+nbc.gptParams.pageData.stage+"|sensitive="+nbc.gptParams.pageData.sensitive+"|nopreroll="+nbcVideoPageUtils.runpreroll+"|adtest="+nbc.gptParams.pageData.adtest+"|TIMESTAMP="+now;
		player.pluginComScore = "type=tracking|URL=" +nbcVideoPageUtils.pdkPluginPath.comscore+ "|priority=8|trackEachChapter=true|c1=1|c2=13846865|c3="+nbcVideoPageUtils.videoReleaseId+"|c4="+nbc.brand+"|c6="+escape(nbc.brand)+"|c7="+document.location.href+"|c8="+escape(document.title)+"c10=";
		
		if(nbcVideoPageUtils.thisIsALiveStream == true) {
			//player.pluginFlashManifestParser = "type=Format|URL=http://"+nbc.domain+"/assets/pdk449/pdk/swf/F4mParser.swf|priority=5";
			player.pluginCloseCaption="type=Captions|URL=" +nbcVideoPageUtils.pdkPluginPath.closeCaption+ "|priority=6";
		}

		if (nbc.siteKey == "test") {
			player.pluginAkamaiHD = "type=player|URL=http://www.nbcnewyork.com/assets/pdk449/pdk/swf/akamaiHD.swf|priority=4|hosts=-f.akamaihd.net";
		} else {
			player.pluginAkamaiHD = "type=player|URL=" +nbcVideoPageUtils.pdkPluginPath.akamaiHD+ "|priority=4|hosts=-f.akamaihd.net";
		}
		
		
	}

	if (nbc.siteKey == "test") {
		//player.pluginFlashManifestParser = "type=Format|URL=http://www.nbcnewyork.com/assets/pdk449/pdk/swf/F4mParser.swf|priority=5";
	}	else {
		//player.pluginFlashManifestParser = "type=Format|URL=http://"+nbc.domain+"/assets/pdk449/pdk/swf/F4mParser.swf|priority=5";
		player.pluginCloseCaption="type=Captions|URL=" +nbcVideoPageUtils.pdkPluginPath.closeCaption+ "|priority=6";
	}
	
	
	try {
		player.playerURL = nbcVideoPageUtils.shareUrlForPlatform;
	}

	catch (e) {
		// U.log("nbcVideoPageUtils.player442: Attempt to build player-compatible social URL failed.")
		// U.log("nbcVideoPageUtils.player442: " + e);
	}

	if(nbcVideoPageUtils.thisIsALiveStream == true ) {
		
		
		player.embeddedPlayerHTML = '<scr'+'ipt type="text/javascript" charset="UTF-8" src="http://'+nbc.env+nbc.domain+'/portableplayer/?cmsID='+videoReleaseID+'&videoID={releasePID}&lvshell='+nbcVideoPageUtils.liveVideoShellId+'&origin='+nbc.host+'&sec='+nbc.section+'&subsec='+nbc.subsection+'&width=600&height=360"></scr'+'ipt>';
		

		
		} else {

			player.embeddedPlayerHTML = '<scr'+'ipt type="text/javascript" charset="UTF-8" src="http://'+nbc.env+nbc.domain+'/portableplayer/?cmsID='+videoReleaseID+'&videoID={releasePID}&origin='+nbc.host+'&sec='+nbc.section+'&subsec='+nbc.subsection+'&width=600&height=360"></scr'+'ipt>';
						
		}
	player.wmode = "opaque";

	player.backgroundColor = "0x131313";
	player.controlBackgroundColor = "0x131313";
	player.controlColor = "0xBEBEBE";
	player.controlFrameColor = "0x545759";
	player.controlHoverColor = "0xBEBEBE";
	player.controlSelectedColor = "0x00CCFF";
	player.frameColor = "0x545759";
	player.pageBackgroundColor = "0x131313";
	player.playProgressColor = "0x00CCFF";
	player.scrubberColor = "0xBEBEBE";
	player.scrubTrackColor = "0xBEBEBE";
	player.textBackgroundColor = "0x383838";
	player.textColor = "0xFFFFFF";
	player.loadProgressColor = "0x5D9070";
	player.videoScalingMethod = "fit";
	player.useDefaultPlayOverlay = false;
	


	
	if(nbc.env !="") {
		player.mute = true;
	}
	

	if (nbcVideoPageUtils.playerPreviewImage) {
		player.previewImageURL = nbcVideoPageUtils.playerPreviewImage;
	}

	if ( (playertype == "onairplayer") || (playertype=="weatherplayer") ) {
		player.layoutUrl = nbc.fullDomain + '/templates/nbc_metaLayout_glass?weather=y';
		} else if (playertype == "slideshowplayer") {
		player.layoutUrl = nbc.fullDomain + '/templates/nbc_metaLayout_glass?layout=slideshow';
		} else {
		player.layoutUrl = nbc.fullDomain + '/templates/nbc_metaLayout_glass';	
		}


	player.skinUrl = nbc.mediaDomain + '/designvideo/nbc_443_skinGlass.swf';
	
	if(nbcVideoPageUtils.thisIsALiveStream == true ) {
		player.previewImageURL =  nbcVideoPageUtils.liveVideoThumb;
		player.liveServers = "wnbclive-f.akamaihd.net";
		U.log("Live stream...");
			
			if( (navigator.userAgent.match(/mobile/i)) ) {
				
				if(navigator.userAgent.match(/Android/i)) {
					player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+nbcVideoPageUtils.liveVideoPIDMobile;
				
				} else if (navgiator.userAgent.match(/Blackberry/i)) {
					player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+nbcVideoPageUtils.liveVideoPIDMobile;
				} else {
					player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+nbcVideoPageUtils.liveVideoPIDMobile;
				}
			
			} else {
				
				player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+nbcVideoPageUtils.liveVideoPID;
			}
			
	} else {
	
	if (navigator.userAgent.match(/Android/i) && nbcVideoPageUtils.isItHoneyComb == true) {
		
		player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+videoIDForThePlatform+"?switch=http&mbr=true";
	} else {
		player.releaseURL = "http://link.theplatform.com/s/Yh1nAC/"+videoIDForThePlatform+"?mbr=true&assetTypes=LegacyRelease";
	}
	
	}

	
		if ( (playertype=="promoplayer" && nbc.omniture.pageType == "home") || (nbc.omniture.pageType == "blog" && playertype == "livePlayer") ) {
		player.autoPlay = false;
		} else {
		player.autoPlay = true;
		}
		
		/*
		if(nbc.contentType == "franchise_landing" && nbcVideoPageUtils.thisIsALiveStream == true) {
			player.autoPlay = false;
		} else if (playertype=="promoplayer" && nbc.omniture.pageType == "home") {
			player.autoPlay = false;
		} else {
			player.autoPlay = true;
		}
		*/
		
		
		//var cypressString = "type=tracking|priority=8|URL="+nbcVideoPageUtils.pdkPluginPath.omniture+"|account=nbcuglobal|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|eVar27=Flash|mediaCategoryVars=eVar36|eVar39=Video Player|eVar48=Embedded Video Player|a.media.name=eVar40|mediaGuidVars=eVar50,prop42|mediaIdVars=eVar50,prop43|adViewEvent=event70|adCompleteEvent=event71|a.media.timePlayed=event73|a.media.view=event74|a.media.complete=event78|prop2=Video Player|frequency=60|trackVars=eVar11,eVar12,eVar13,eVar14,eVar27,eVar36,eVar37,eVar38,eVar39,eVar40,eVar41,eVar42,eVar43,eVar45,eVar47,eVar48,eVar50,prop2,prop8,prop9,prop20,prop42,prop43,prop44,prop45,prop46,prop50,products|trackEvents=event70,event71,event72,event73,event74,event75,event76,event77,event78,event79,event80|useJS=true|jsInstanceName=nbcu";
		//additionalTrackingValues = "|prop2=|prop8=|prop9=|eVar9="+nbc.siteKey+"|eVar10="+nbc.callLetters+"|prop20=rsid|eVar36=Video|eVar37="+nbcVideoPageUtils.currentClipTitle+"|eVar41=|eVar42=|eVar45="+nbc.brand+"|prop50="+nbcVideoPageUtils.currentClipTitle+"|eVar48="+playertype+"|pageName=" + nbcu.pageName;
		additionalTrackingValues="|trackVars=eVar11,eVar12,eVar13,eVar14,eVar27,eVar36,eVar37,eVar38,eVar39,eVar40,eVar41,eVar42,eVar43,eVar45,eVar47,eVar48,eVar50,prop2,prop8,prop9,prop20,prop42,prop43,prop44,prop45,prop46,prop50,products,eVar9,eVar10|trackEvents=event20,event21,event22,event23,event24,event25,event26,event27,event28,event29,event30,event31,event81,event82,event70,event71,event72,event73,event74,event75,event76,event77,event78,event79,event80|prop2=none|prop8=none|prop9=none|eVar9="+nbc.siteKey+"|eVar10="+nbc.callLetters+"|prop20="+nbcVideoPageUtils.RSID+"|eVar36=Video|eVar27=Flash|eVar37="+nbcVideoPageUtils.currentClipTitle+"|eVar39=Video Player|eVar41=|eVar42=|eVar45="+nbc.brand+"|eVar47=normal|prop50="+nbcVideoPageUtils.currentClipTitle+"|eVar48="+playertype+"|eVar42=|a.media.name=eVar40|mediaCategoryVars=eVar36|mediaIdVars=eVar50|trackMilestones=25%25,50%25,75%25|pageName=" + nbcu.pageName;
		NBCUOmniture.getStandardParameter(nbcVideoPageUtils.isLongForm, true, "eVar9,eVar10");
		if(nbcVideoPageUtils.thisIsALiveStream) {	
		cypressString = "type=tracking|priority=8|URL="+nbcVideoPageUtils.pdkPluginPath.omnitureCypress+"|account="+ nbc.omniture.suite +"|jsInstanceName=nbcu|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com|eVar27=Flash|mediaCategoryVars=eVar36|eVar37="+nbcVideoPageUtils.currentClipTitle+"|eVar39=Video Player|eVar48=liveplayer|a.media.name=eVar40|mediaGuidVars=eVar42,prop42|mediaIdVars=eVar50,prop43|prop50="+nbcVideoPageUtils.currentClipTitle+"adViewEvent=event70|adCompleteEvent=event71|a.media.timePlayed=event73|a.media.view=event74|a.media.complete=event78|prop2=Video Player|frequency=10|trackVars=eVar11,eVar12,eVar13,eVar14,eVar27,eVar36,eVar37,eVar38,eVar39,eVar40,eVar41,eVar42,eVar43,eVar45,eVar47,eVar48,eVar50,prop2,prop8,prop9,prop20,prop42,prop43,prop44,prop45,prop46,prop50,products|trackEvents=event70,event71,event72,event73,event74,event75,event76,event77,event78,event79,event80|useJS=true|pageName=" + nbcu.pageName;
		} else {
		cypressString = "type=tracking|priority=8|URL="+nbcVideoPageUtils.pdkPluginPath.omnitureCypress+"|account="+ nbc.omniture.suite +"|jsInstanceName=nbcu|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com" + additionalTrackingValues;
		}
		switch(nbc.omniture.pageType){
			case "home":
				player.pluginOmniture = cypressString;
			break;
			case "article":
				if(playertype != "slideshowplayer") {
					player.pluginOmniture = cypressString;
				}
			break;
			case "blog":
				player.pluginOmniture = cypressString;
			break;
			case "multimedia":
				player.pluginOmniture = cypressString;
			break;
			case "live":
				player.pluginOmniture = cypressString;
			break;
			case "franchise":
				player.pluginOmniture = cypressString;
			break;
			case "weather":
				player.pluginOmniture = cypressString;
			break;
			case "investigations":
				player.pluginOmniture = cypressString;
			break;
			case "promo":
				player.pluginOmniture = cypressString;
			break;
			case "video":
				player.pluginOmniture = cypressString;
			break;
			case "slideshow":
				// DO NOTHING
			break;
			default: 
				player.pluginOmniture = cypressString;
			
		}
	
	
		player.pluginChartbeat="type=tracking|URL="+nbcVideoPageUtils.pdkPluginPath.chartbeat+"|acctId=15527|appId=video@"+nbc.host+"|priority=9";
		player.pluginConviva = "type=reporting|url="+nbcVideoPageUtils.pdkPluginPath.conviva+"?customerId=c3.theplatform|customerId=c3.TP-NbcUniversal|priority=10|cdnName=AKAMAI|serviceUrl=http%3A%2F%2Flivepass.conviva.com";
		player.bind(targetContainer);
		
		if(nbc.env == "stage." || nbc.env == "dev.") {
			$pdk.controller.setVolume(nbc.video.config.volume);
			console.log("**** nbcVideoPageUtils.player442 | Forcing volume for demonstration purposes only. ****");
		}
		
		if(nbcVideoPageUtils.thisIsALiveStream == false){
		
			//initialize Omniture plug in
			NBCUOmniture.initialize('nbcu',['*']);
if(console && console.log) {console.log("Initialized Omniture Cypress Plug in");}
			// PDK 5.2 STOCK PLAY BUTTON IS ON BY DEFAULT; THIS DISABLES IT.
			if( (playertype != "promoplayer") || (playertype !="weatherplayer") || (playertype !="onairplayer") )
			$pdk.controller.useDefaultPlayOverlay(false);
		}
		
		
		if(nbc.omniture.pageType == "article") {
		nbcVideoPageUtils.modalRestore();
		}
	}

nbcVideoPageUtils.modalRestore = function() {
	var currentVersionOfJquery = $().jquery;

	if (currentVersionOfJquery != nbc.jQueryVersion) {
		if (console && console.warn) {
			console.warn("NBC OTS base install of jQuery overwritten!");
			console.warn("Attempting to restore critical jQuery plugins...")
		}

		jQuery.ajax( {
			url : '/includes/jqModal.js',
			dataType : 'script',
			cache : false
		});
		jQuery.ajax( {
			url : '/includes/jquery.easing.1.3.js',
			dataType : 'script',
			cache : false
		});
	}

}


nbcVideoPageUtils.brightcoveCCSwap = function(reset) {
/* THIS FUNCTION IS ONLY FOR THE PRIME TIME PREVIEW 2012 PAGE. */
	
	if(reset == undefined) {
	
	if(nbcVideoPageUtils.captionState == true) {
		jQuery('#leadBordermask').html(nbcVideoPageUtils.universalVarTwo);
		jQuery('#leadCCToggle').html('<p>Watch without English [CC]<p>');
	} else if (nbcVideoPageUtils.captionState == false) {
		jQuery('#leadBordermask').html(nbcVideoPageUtils.universalVarOne);
		jQuery('#leadCCToggle').html('<p>Watch with English [CC]<p>');
	}
	
	brightcove.createExperiences();
	
	return false;
	
	} else {
		jQuery('#leadCCToggle').html('<p>Watch with English [CC]<p>');
		jQuery('#leadCCToggle').attr('class','ccOff');
		nbcVideoPageUtils.captionState == false;
	}
}

nbcVideoPageUtils.runBrightcovePlayer = function(contentTitle, contentSummary, contentEmbedCode, contentAltEmbedCode, scrollPreference) {
/* THIS FUNCTION IS ONLY FOR THE PRIME TIME PREVIEW 2012 PAGE. */
	
	// Automatically set these values if they're left undefined.
	if(scrollPreference == undefined) {
		var scrollPreference = false;
	}
	

	
	if(contentEmbedCode == "") {
		var contentEmbedCode = "<span>NO EMBED CODE PRESENT!</span>";
	}
	
	nbcVideoPageUtils.brightcoveEngaged = true;
	
    // Closed captioned embed code for swapping on-the-fly.
    nbcVideoPageUtils.universalVarOne = contentEmbedCode;
    
    // Store the original embed code for swapping on-the-fly.
    nbcVideoPageUtils.universalVarTwo = contentAltEmbedCode;
	
    

    	jQuery('#leadBordermask').html("");
	
    		if(nbcVideoPageUtils.brightcoveScriptLoaded != true) {
    			jQuery('#leadBordermask').html(contentEmbedCode);
    			jQuery('span.topSpotTitle').text(contentTitle);
    			jQuery('span.topSpotDesc').text(contentSummary);
    				jQuery.ajax( {
    					url : 'http://admin.brightcove.com/js/BrightcoveExperiences.js',
    					dataType : 'script',
    					cache : true,
    					success : function(data) {
    						nbcVideoPageUtils.brightcoveScriptLoaded = true;
    						brightcove.createExperiences();
    					}
    				});
	
	
    		} else {
    			jQuery('#leadBordermask').html(contentEmbedCode);
    			jQuery('span.topSpotTitle').text(contentTitle);
    			jQuery('span.topSpotDesc').text(contentSummary);
    			brightcove.createExperiences();
    		}
	
    		if(scrollPreference == true) {
    			jQuery('html,body').animate({ 'scrollTop': jQuery('body').offset().top }, { 'duration': 'slow', 'easing': 'swing'});
    		}
    // Reset the CC button and JS-level flag.
    nbcVideoPageUtils.brightcoveCCSwap(true);	
    return true;
}



nbcVideoPageUtils.populateRelatedMedia = function(targetMedia) {
	/*if (nbc.omniture.pageType == "home") {
		sectionForRelatedMedia = "news";
		subsectionForRelatedMedia = "top-stories"
	} else {
		sectionForRelatedMedia = nbc.section;
		subsectionForRelatedMedia = nbc.subsection;
	} */
	
	sectionForRelatedMedia = "home";
	subsectionForRelatedMedia = "top-videos";
	
	jQuery.getJSON(nbc.fullDomain+ '/i/dispatcher/?h=v3_videoPlaylist&show=yes&id='+ targetMedia + '&embedding_parent_path=/'+ sectionForRelatedMedia + '/'+ subsectionForRelatedMedia,
					function(response) {
						for ( var i = 0; i < response.length; i++) {
							if (i == 0) {
								nbcVideoPageUtils.shareUrl = nbc.fullDomain+ '/video/#!'+ response[i].path+ '/'+ response[i].esctitle.split(" ").join("_") + '/'+ response[i].contentId;
							} else {
								jQuery('.videoBox').append('<li><span><a href="'+ nbc.fullDomain+ '/video/#!'+ response[i].path+ '/'+ response[i].esctitle.split(" ").join("_")+ '/'+ response[i].contentId+ '" onclick="s.linkTrackVars=\'eVar50,events\';s.linkTrackEvents=\'event55\';s.eVar50=\''+ escape(response[i].title)+ '\'; s.events=\'event55\';s.tl(this, \'o\',\'More Video Click\');">'+ '<span class="icon">'+ '</span><img src="'+ response[i].thumbUrl+ '" width="136" height="76" alt="'+ response[i].esctitle+ '" />'+ response[i].trunctitle+ '&nbsp;&nbsp;'+ response[i].length+ '</a></span></li>');
							}
						}

						/* 
						try {
						jQuery('.shareBoxes').html('<div id="linkBox" class="boxContainer" style="display:none;"><span></span><div class="boxCopy boxBtn"><div class="transparency"></div><span>Copy</span></div><div class="boxClose boxBtn"><div class="transparency"></div><span>Close</span></div><p class="boxLabel">Link to this video</p><form action="#"><fieldset><textarea rows="1" cols="2" readonly="readonly">'+nbcVideoPageUtils.shareUrl+'</textarea></fieldset></form></div><div id="embedBox" class="boxContainer" style="display:none;"><span></span><div class="boxCopy boxBtn"><div class="transparency"></div><span>Copy</span></div><div class="boxClose boxBtn"><div class="transparency"></div><span>Close</span></div><p class="boxLabel">Embed this video</p><form action="#"><fieldset><textarea rows="1" cols="2" readonly="readonly">'+embeddedPlayerHTML+'</textarea></fieldset></form></div></div>');
						}

						catch(e) {
						U.log(e);
						}
						 */

						try {
							jQuery('#multimedia-module #linkField').val(nbcVideoPageUtils.shareUrl);
							jQuery('#multimedia-module #embedField').val(embeddedPlayerHTML);


						}

						catch (e) {
							// U.log(e);
						}
						nbcCarousel.init(nbcVideoPageUtils.targetEndCard,'videoBox', false);
					});
}

nbcVideoPageUtils.endCardDisplay = function(evt) {
	nbc.endcardTwitterID = nbc.market;
	if (nbc.market == "nbclosangeles") {
		nbc.endcardTwitterID = "nbcla"
	}

	if (evt.data.baseClip.isAd == false) {

		if ((!nbcVideoPageUtils.targetEndCard)
				|| nbcVideoPageUtils.targetEndCard.length == 0) {
		} else {

			jQuery(nbcVideoPageUtils.targetEndCard)
					.find('li.twitter')
					.html(
							'<a href="http://twitter.com/share" class="twitter-share-button" data-text="'
									+ unescape(nbcVideoPageUtils.currentClipTitle)
									+ '" data-via="' + nbc.endcardTwitterID
									+ '" data-count="horizontal" data-url="'
									+ nbcVideoPageUtils.shareUrl
									+ '" data-counturl="'
									+ nbcVideoPageUtils.shareUrl
									+ '">Tweet</a></span>');
			jQuery.ajax( {
				url : 'http://platform.twitter.com/widgets.js',
				dataType : 'script',
				cache : false
			});

			jQuery(nbcVideoPageUtils.targetEndCard)
					.find('li.fbRecommend')
					.html('<div class="fb-like" data-href="'+nbcVideoPageUtils.shareUrl+'" data-send="false" data-layout="button_count" data-width="90" data-height="22" data-show-faces="false" data-action="recommend" data-font="arial" style="text-align:left;"></div>');
			FB.XFBML.parse(jQuery(nbcVideoPageUtils.targetEndCard).get(0));
		}
		nbcVideoPageUtils.targetEndCard.toggle();
	}
}

nbcVideoPageUtils.videoReplay = function(targetScope) {
	if (targetScope == null) {
		targetScope == "*";

		U.log("nbcVideoPageUtils.videoReplay: WARNING: Scope not defined, defaulting to wildcard.")
	}
	jQuery(nbcVideoPageUtils.targetEndCard).hide();
	tpController.clickPlayButton(targetScope);
}

jQuery(document).ready(function(){
	embeddedPlayerHTML = '<embed width="576" height="324" src="'
	+ nbc.mediaDomain
	+ '/assets/pdk449/pdk/swf/flvPlayer.swf?pid='
	+ nbcVideoPageUtils.currentClipPlatformPid
	+ '" flashvars="v=http%3A%2F%2F'
	+ nbc.domain
	+ '%2Fi%2Fembed_new%2F%3Fcid%3D'
	+ nbcVideoPageUtils.videoReleaseId
	+ '&path=%2F'
	+ nbc.section
	+ '/'
	+ nbc.subsection
	+ '" allowFullScreen="true" AllowScriptAccess="always" /> <p style="font-size:small">View more videos at: <a href="http://'
	+ nbc.host
	+ '/?__source=embedCode">http://'
	+ nbc.host + '</a>.</p>';
});

if(nbc.omniture.pageType == "article"){
	// Play button activated functions for endcard items
	function playerButtonPressed(){
		// Link toggle
		$('.shareLink').click( function() {
			if($('.shareEmbed').hasClass('active')) {
				$('.shareEmbed').removeClass('active');
				$('.embedBox').hide();
			};
			$(this).addClass('active');
			$('.linkBox').show();
			if($('.shareLink').hasClass('zclipActive')){
				// do nothing
			} else {
				$('.linkBox .boxCopy').zclip({
					path:nbc.mediaDomain+'/designvideo/ZeroClipboard.swf',
					copy:jQuery('#endcard .linkBox textarea').text(),
					afterCopy:function(){
						if($('.shareLink').hasClass('zclipActive')){
							//do nothing
						}else{
							$('.shareLink').addClass('zclipActive');
						}
						alert('Copied link to clipboard.');
					}
				});
			}
		});
		$('.linkBox .boxClose').click( function() {
			$('.linkBox').hide();
			$('.shareLink').removeClass('active');
		});
		// Embed toggle
		$('.shareEmbed').click( function() {
			if ($('.shareLink').hasClass('active')) {
				$('.shareLink').removeClass('active');
				$('.linkBox').hide();
			};
			$(this).addClass('active');
			$('.embedBox').show();
			if($('.shareEmbed').hasClass('zclipActive')){
				// do nothing
			} else {
				$('.embedBox .boxCopy').zclip({
					path:nbc.mediaDomain+'/designvideo/ZeroClipboard.swf',
					copy:$('#endcard .embedBox textarea').text(),
					afterCopy:function(){
						if($('.shareEmbed').hasClass('zclipActive')){
							//do nothing
						}else{
							$('.shareEmbed').addClass('zclipActive');
						}
						alert('Copied embed code to clipboard.');
					}
				});
			}
		});
		$('.embedBox .boxClose').click( function() {
			$('.embedBox').hide();
			$('.shareEmbed').removeClass('active');
		});
	
		// Carousel arrows
		jQuery('.prev').one('click', nbcCarousel.pressedLeftArrow);
		jQuery('.next').one('click', nbcCarousel.pressedRightArrow);
		$('.linkBox').css( {
			'visibility' : 'visible',
			'display' : 'none',
			'z-index' : '8'
		});
		$('.embedBox').css( {
			'visibility' : 'visible',
			'display' : 'none',
			'z-index' : '8'
		});
	};
} else {
	jQuery(document).ready( function() {
		//Link toggle
		$('.shareLink').click( function() {
			if ($('.shareEmbed').hasClass('active')) {
				$('.shareEmbed').removeClass('active');
				$('.embedBox').fadeOut('fast');
			}
			;
			$(this).addClass('active');
			$('.linkBox').fadeIn('fast');
		});
		$('.linkBox .boxClose').click( function() {
			$('.linkBox').fadeOut('fast');
			$('.shareLink').removeClass('active');
		});
		// Embed toggle
		$('.shareEmbed').click( function() {
			if ($('.shareLink').hasClass('active')) {
				$('.shareLink').removeClass('active');
				$('.linkBox').fadeOut('fast');
			}
			;
			$(this).addClass('active');
			$('.embedBox').fadeIn('fast');
		});
		$('.embedBox .boxClose').click( function() {
			$('.embedBox').fadeOut('fast');
			$('.shareEmbed').removeClass('active');
		});

		// Carousel arrows
		jQuery('.prev').one('click', nbcCarousel.pressedLeftArrow);
		jQuery('.next').one('click', nbcCarousel.pressedRightArrow);

		$('#endcard').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
		$('.endcard-mm').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
		$('.endcard-small').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
		$('.endcard-blog').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
		$('.linkBox').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
		$('.embedBox').css( {
			'visibility' : 'visible',
			'display' : 'none'
		});
	});
}

/* nbcVideoPageUtils.getAdHocVideoMetaData
 * Metadata request compatible with the nbcVideoPageUtils.createAdHocPlayer
 * ONLY CALL IN HTML5 ENVIRONMENTS
 */

nbcVideoPageUtils.getAdHocVideoMetaData = function(playerName,width,height,videoID,scopeID,hostElem,startAfterDataRequest,extID) {
    if(!startAfterDataRequest) {
        var startAfterDataRequest = false;
    }
    
    //nbcVideoPageUtils.targetForEndCard = targetContainer;
    nbcVideoPageUtils.playerWidth = width;
    nbcVideoPageUtils.playerHeight = height;
    //tpController.removeEventListener("OnMediaEnd","nbcVideoPageUtils.generateEndCard",['*']);
    
        jQuery.ajax( {
                url : "/i/dispatcher/?id=" + videoID + "&thumbWidth=" + width + "&thumbHeight=" + height+ "&h=v3_videoMetadata",
                dataType : "json",
                cache : false,
                
                success : function(data) {
                    nbcVideoPageUtils.currentClipAuthor = data.author;
                    nbcVideoPageUtils.currentClipTitle = escape(data.title);
                    nbcVideoPageUtils.currentClipSubTitle = escape(data.subtitle);
                    nbcVideoPageUtils.currentClipRunTime = data.length;
                    nbcVideoPageUtils.currentClipPlatformPid = data.videoId;
                    nbcVideoPageUtils.currentClipAdCampaign = data.adCampaign;
                    nbcVideoPageUtils.currentClipContentSource = data.contentSources;
                    nbcVideoPageUtils.currentClipContentCode = nbcVideoPageUtils.currentClipContentSource.split(" -")[0];
                    nbcVideoPageUtils.playerPreviewImage = data.thumbnailUrl;
                    nbcVideoPageUtils.currentClipSummary = data.fullSummary;
                    nbcVideoPageUtils.videoReleaseId = data.contentId;
                    nbcVideoPageUtils.videoMediaId = data.videoMediaId;
                    nbcVideoPageUtils.runpreroll = data.noPreRollBasedOnCAC;
                    
                    nbcVideoPageUtils.currentClipTitleDashed = data.title.replace(/ /g,"-");
                    nbcVideoPageUtils.currentClipSubTitleDashed = data.subtitle.replace(/ /g,"-");
                    
                    // This will eventually have to be wrapped in an IF statement to support the city sites as well.
                    nbcVideoPageUtils.shareUrlForPlatform = "http://www.cozitv.com/video/"+nbcVideoPageUtils.currentClipTitleDashed+"/"+nbcVideoPageUtils.currentClipSubTitleDashed+"/"+nbcVideoPageUtils.videoReleaseId;
                    // Wrap this in an IF statement; BE only delivers if available.
                        // nbcVideoPageUtils.omnitureFriendlyTitle = data.omniture_prop22;

                },

                complete : function(data) {
                	
                    nbcVideoPageUtils.didMetaDataHandlerFire = "YES| VIDEO ID REQUESTED: "+videoID;
                    //nbcVideoPageUtils.writeThepdkPluginParams();
                    
                    // MOVE THIS SOMEPLACE ELSE ASAP.
                    
                   
                    if(document.getElementById('currentlyPlayingSummary')) {
                        jQuery('#currentlyPlayingSummary').text(nbcVideoPageUtils.currentClipSummary);
                    }

                    
                    if(startAfterDataRequest) {
                    	if( (playerName == "carousel" && nbcVideoPageUtils.adHocPlayerExists == true) || typeof window['player'+playerName] == "object") {
                    	nbcVideoPageUtils.resetPreroll();
                    	nbcVideoPageUtils.forceNewVideoSource(extID,scopeID);
                    	} else {
                    	nbcVideoPageUtils.createAdHocPlayer(playerName,width,height,extID,scopeID,hostElem);
                    	}
                    } else {
                        // console.log("nbcVideoPageUtils.getVideoMetaData | Player can't start, make sure a target <div> is specified and startAfterDataRequest is set to true.");
                    }

                }
        });
}

/* nbcVideoPageUtils.createAdHocPlayer
 * Create an ad-hoc HTML5 player with the variable name and scope ID of your choice.
 * NOTE: nbcVideoPageUtils.createAdHocPlayer('ArticleLead','leadPlayer') will create
 * player instance playerArticleLead with scope ID 'leadPlayer'. ONLY CALL IN HTML5
 * ENVIRONMENTS.
 */

nbcVideoPageUtils.adHocPlayerExists = false;
nbcVideoPageUtils.createAdHocPlayer = function(playerName,width,height,releaseID,scopeID,hostElem) {
	
var now = jQuery.now();

	// TEMPORARY TO SUPPORT ALREADY-DEPLOYED CODE
	if(!hostElem) {
		hostElem = 'VODPlayer';
	}
	
	if(!nbcVideoPageUtils.thisIsALiveStream) {
		nbcVideoPageUtils.thisIsALiveStream = false;
	}
	
window['player'+playerName] = new Player(hostElem, width,height);
window['player'+playerName].scopes = scopeID;
	//window['player'+playerName].pluginOmniture = nbcVideoPageUtils.pdkPluginPath.omniture + '';
if(nbc.video.config.htmlOmniture == true) {
try {
    console.warn("nbcVideoPageUtils.createAdHocPlayer | Trying to build and execute Omniture plugin...");
    var hlsAdditionalTrackingValues="|trackVars=eVar11,eVar12,eVar13,eVar14,eVar27,eVar36,eVar37,eVar38,eVar39,eVar40,eVar41,eVar42,eVar43,eVar45,eVar47,eVar48,eVar50,prop2,prop8,prop9,prop20,prop42,prop43,prop44,prop45,prop46,prop50,products,eVar9,eVar10|trackEvents=event20,event21,event22,event23,event24,event25,event26,event27,event28,event29,event30,event31,event81,event82,event70,event71,event72,event73,event74,event75,event76,event77,event78,event79,event80|prop2=|prop8=|prop9=|eVar9="+nbc.siteKey+"|eVar10="+nbc.callLetters+"|prop20="+nbcVideoPageUtils.RSID+"|eVar36=Video|eVar27=Flash|eVar37="+nbcVideoPageUtils.currentClipTitle+"|eVar39=Video Player|eVar41=|eVar42=|eVar45="+nbc.brand+"|eVar47=normal|prop50="+nbcVideoPageUtils.currentClipTitle+"|eVar48=fullplayer|eVar42=|a.media.name=eVar40|mediaCategoryVars=eVar36|mediaIdVars=eVar50|trackMilestones=25%25,50%25,75%25|pageName=" + nbcu.pageName;
    
    window['player'+playerName].pluginOmniture = "type=tracking|priority=1|URL=/includes/omnitureMedia.js|account="+ nbc.omniture.suite +"|jsInstanceName=nbcu|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com" + hlsAdditionalTrackingValues;
    //window['player'+playerName].pluginOmniture = "type=tracking|priority=1|URL=/includes/omnitureMedia.js|account="+ nbc.omniture.suite +"|jsInstanceName=nbcu|visitorNamespace=nbcuniversal|dc=122|host=oimg.nbcuni.com|secureHost=osimg.nbcuni.com" + window['player'+playerName].additionalTrackingValues;
    console.warn("nbcVideoPageUtils.createAdHocPlayer | Omniture seems OK!");
    console.warn("nbcVideoPageUtils.createAdHocPlayer | OMNITURE CONFIGURATION STRING:\n" + window['player'+playerName].pluginOmniture);
    
    }
    


catch(e) {
	console.warn("createAdHocPlayer | Omniture init failed.");
}
}


if(nbc.htmlPreroll == true) {
try {
	
	window['player'+playerName].pluginTremor = "type=adcomponent|URL=http://objects.tremormedia.com/embed/sjs/html5/plugins/theplatform/tpAcudeoPlugIn.js|policy="+nbc.tremorHTMLKey+"|contentData.AdUnit1stLevel="+nbc.gptParams.suitename+"|contentData.AdUnit2nd-5thLevel="+nbc.gptParams.gptZone+"|contentData.videoplatform=html5|contentData.feature="+nbc.gptParams.pageData.feature+"|contentData.contentid="+nbcVideoPageUtils.videoMediaId+"|contentData.cid="+nbcVideoPageUtils.videoMediaId+"contentData.pagetype="+nbc.gptParams.pageData.pagetype+"|contentData.sponsor="+nbc.gptParams.pageData.sponsor+"|contentData.pt="+nbc.omniture.playerType+"|contentData.stage="+nbc.gptParams.pageData.stage+"|contentData.sensitive="+nbc.gptParams.pageData.sensitive+"|nopreroll="+nbcVideoPageUtils.runpreroll+"|contentData.adtest="+nbc.gptParams.pageData.adtest+"|contentData.TIMESTAMP="+now;
	
	//window['player'+playerName].pluginTremor = "type=adcomponent|URL=http://objects.tremormedia.com/embed/sjs/html5/plugins/theplatform/tpAcudeoPlugIn.js|priority=2|policy=4fce2b2fe20f9|contentData.device=html5|contentData.site="+nbc.siteKey+"|contentData.pt=articleplayer|contentData.id="+nbcVideoPageUtils.videoMediaId+"|contentData.zone="+nbc.zone+"|contentData.url="+nbc.fullDomain+"|contentData.title=TK|contentData.descriptionUrl="+nbc.fullDomain+"|contentData.description=TK|contentData.contentgroup="+nbcVideoPageUtils.currentClipAdCampaign+"|contentData.sect="+nbc.section+"|contentData.sub="+nbc.subsection;
	console.warn("nbcVideoPageUtils.createAdHocPlayer | Tremor HTML5 plugin active.");
}

catch(e) {
alert("nbcVideoPageUtils.createAdHocPlayer | "+ e);
}
}
window['player'+playerName].pluginConviva = "type=reporting|url=http://livepassdl.conviva.com/thePlatform/ConvivaThePlatformPlugin.js|customerId=c3.TP-NbcUniversal|priority=5|cdnName=AKAMAI|serviceUrl=http%3A%2F%2Flivepass.conviva.com";
window['player'+playerName].fp.bgcolor = "0x131313";
window['player'+playerName].fp.wmode = "opaque";
window['player'+playerName].logLevel = "warn";
window['player'+playerName].allowFullScreen = "true";
window['player'+playerName].width = width;
window['player'+playerName].height = height;
window['player'+playerName].backgroundColor = "0x131313";
window['player'+playerName].controlBackgroundColor = "0x131313";
window['player'+playerName].controlColor = "0xBEBEBE";
window['player'+playerName].controlFrameColor = "0x545759";
window['player'+playerName].controlHoverColor = "0xBEBEBE";
window['player'+playerName].controlSelectedColor = "0x00CCFF";
window['player'+playerName].frameColor = "0x545759";
window['player'+playerName].pageBackgroundColor = "0x131313";
window['player'+playerName].playProgressColor = "0x00CCFF";
window['player'+playerName].scrubberColor = "0xBEBEBE";
window['player'+playerName].scrubberFrameColor = "0x00CCFF";
window['player'+playerName].scrubTrackColor = "0xBEBEBE";
window['player'+playerName].textBackgroundColor = "0x383838";
window['player'+playerName].textColor = "0xBEBEBE";
window['player'+playerName].loadProgressColor = "0x5D9070";
window['player'+playerName].layoutUrl = nbc.fullDomain + '/templates/nbc_mobileplayer_layout';
window['player'+playerName].skinUrl = nbc.fullDomain + '/assets/pdk449/pdk/skins/glass/glass.json';
window['player'+playerName].logLevel = "error";
window['player'+playerName].endCard = "none";
window['player'+playerName].useDefaultPlayOverlay = true;

if( (typeof nbcVideoPageUtils.thisIsALiveStream !=undefined) && (nbcVideoPageUtils.thisIsALiveStream == true) ) {
	window['player'+playerName].previewImageURL = nbcVideoPageUtils.liveVideoThumb;
	window['player'+playerName].releaseUrl = "http://link.theplatform.com/s/Yh1nAC/"+nbcVideoPageUtils.liveVideoPIDHLS;
} else {
	window['player'+playerName].previewImageURL = nbcVideoPageUtils.playerPreviewImage;
	window['player'+playerName].releaseUrl = "http://link.theplatform.com/s/Yh1nAC/"+releaseID+"?manifest=m3u&format=SMIL";
}
window['player'+playerName].autoPlay = false;
window['player'+playerName].bind();
console.log("player"+playerName+" instantiated.");
console.log("player"+playerName+" attempting to load release: "+window['player'+playerName].releaseUrl);

if((nbc.env == "dev.") || (nbc.env == "stage.")){
	try {
	//initialize Omniture plug in
	NBCUOmniture.initialize('nbcu',[scopeID]);
	console.warn("nbcVideoPageUtils.createAdHocPlayer | Initialized Omniture Cypress Plug in");
	}
	
	catch(e) {
		console.log('Ratio script failed.');
	}
	

	nbcVideoPageUtils.activeHTMLPlayers.push('player'+playerName);
	console.log("**** NBCOTS | ACTIVE HTML VIDEO PLAYER(S) ON THE PAGE ****\n"+nbcVideoPageUtils.activeHTMLPlayers);
}

nbcVideoPageUtils.adHocPlayerExists = true;

}


nbcVideoPageUtils.resetPreroll = function() {
	var content = {
			id:nbcVideoPageUtils.videoReleaseId,
			title:nbcVideoPageUtils.currentClipTitle,
			site:nbc.siteKey,
			device:'html5',
			zone:nbc.zone,
			descriptionUrl:location.href,
			sect:nbc.section,
			sub:nbc.subsection,
			contentgroup:nbcVideoPageUtils.currentClipAdCampaign,
			pid:nbcVideoPageUtils.currentClipContentCode,
			hascompanion:"companion",
			companionexists:true,
			pt:nbc.omniture.playerType,
			catetory:nbc.omniture.playerType
	}
	
	try {
	if(console) {
	console.warn("Attempting to re-write Tremor plugin data...");
	}
	AcudeoSetContentData(content);
	}
	
	catch(e) {
		if(console) {
			console.warn("nbcVideoPageUtils.resetPreroll | Call to AcudeoSetContentData(content) | " + e);
		}
	}
}

/* nbcVideoPageUtils.forceNewVideoSource
 * Force a new video source into a player instantiation.
 * NOTE: ONLY USE THIS ON HTML5 PLAYERS
 */

nbcVideoPageUtils.forceNewVideoSource = function(videoID,scopeID) {
 // Room for potential plugin reset.
	console.log("Trying to force a new video. Passed ID is"+ videoID);
	$pdk.controller.setReleaseURL("http://link.theplatform.com/s/Yh1nAC/"+videoID+"?manifest=m3u&format=SMIL",true,[scopeID]);
	console.warn('nbcVPU.forceNewVideoSource | Attempting to execute: $pdk.controller.setReleaseURL("http://link.theplatform.com/s/Yh1nAC/'+videoID+'?manifest=m3u&format=SMIL",replaceDefault=true,["'+scopeID+'"]);');
}

if (navigator.userAgent.match(/like Mac OS X/i)) {

} else {
	if(nbc.omniture.pageType !="feature") {
tpController.addEventListener("OnMediaEnd","nbcVideoPageUtils.endCardDisplay");
	}
}
