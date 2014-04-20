//////// nbc_gpt_renderengine.js ///////////////////////////////////
//////// version 1.0
//////// last modified by: Toby Spinks
//////// last modified: 01/17/2014
//////// ticket no. 21027 ////////////////////////////////////////////


/*
 SAMPLE INTEGRATION
 <div id="myLeaderboard" class="adSlot" data-sizes="728,90|900,66" data-ord="1" data-pos="top" data-module="ModuleNameIfAny" data-gptcollapse="true" style="width: 728px; height: 90px;"></div>
 <div id="myRectangle" class="adSlot" data-sizes="300,250|300,600" data-ord="1" data-pos="top" data-module="ModuleNameIfAny" data-gptcollapse="true" style="width: 300px; height: 250px;"></div>
 <div id="mySponsoredSlot" class="adSlot" data-sizes="88,31" data-ord="1" data-pos="top" data-module="ModuleNameIfAny" data-gptcollapse="false" style="width: 88px; height: 31px;"></div>
 <div id="myOtherRectangle" class="adSlot" data-sizes="300,250|300,600" data-pos="bottom" data-ord="2" data-module="ModuleNameIfAny" data-gptcollapse="false" style="width: 300px; height: 250px;"></div>
 *
 * NOTES:
 * data-sizes: Easily manage the sizes allowed in the ad slot. Exposing this is more for the sake of removing complexity from the templates.
 * data-ord: Based on individual counters for each size class.
 *
 */

nbcgptengine = {};
nbcgptengine.slotDefinitions = {};
nbcgptengine.dynamicCount = 0;


/*
 * nbcgptengine.init()
 * Starts the party...
 */

nbcgptengine.init = function() {

	googletag.cmd.push(function() {
		// Set default background color of ad placements.
		googletag.pubads().set("adsense_background_color", "ffffff");

		
		if(nbc.gptParams.pageData.sensitive == "true") {
			googletag.pubads().setCategoryExclusion("Sensitive");
		}
		if(nbc.gptParams.pageData.partner == "xfinity"){
            googletag.pubads().setCategoryExclusion("xfinity");
		}
		
		if(nbc.gptParams.pageData.feature == "Olympics-Winter") {
			googletag.pubads().setCategoryExclusion("olympics");
		}
		
		if(nbc.gptParams.pageData.category == "olympics") {
			googletag.pubads().setCategoryExclusion("olympics");
		}

		googletag.pubads().enableAsyncRendering();
		googletag.pubads().collapseEmptyDivs(true);
		googletag.enableServices();
	
	
		// Set OOP slot
		nbcgptengine.slotDefinitions.gptoop = googletag.defineOutOfPageSlot("/"+nbc.gptParams.suitenumber+"/"+nbc.gptParams.suitename+"/"+nbc.gptParams.gptZone, 'gptoop')
		.setTargeting("pos",['top'])
		.setTargeting("module",[''])
		.setTargeting("feature",[nbc.gptParams.pageData.feature])
		.setTargeting("contentid",[nbc.gptParams.pageData.contentid])
		.setTargeting("pagetype",[nbc.gptParams.pageData.pagetype])
		.setTargeting("sponsor",[nbc.gptParams.pageData.sponsor])
		.setTargeting("adtest",[nbc.gptParams.pageData.adtest])
		.setTargeting("stage",[nbc.gptParams.pageData.stage])
		.setTargeting("kw",[nbc.gptParams.pageData.searchkw])
		.setTargeting("zc",[nbc.gptParams.pageData.zipcode])
		.setTargeting("partner",[nbc.gptParams.pageData.partner])
		.setTargeting("category",[nbc.gptParams.pageData.category])
		.addService(googletag.pubads());
 	});
	

	

	jQuery(document).ready(function() {
		U.log("**** nbcgptengine | initialized and waiting ****");
		nbcgptengine.collectSlots();
	});
	
}


/*
 * nbcgptengine.slotRefresh(divID)
 * Refresh a GPT ad that's already loaded.
 *
 * usage: nbcgptengine.slotRefresh("nbcad_300x250_iframe_gallery")
 */

nbcgptengine.slotRefresh = function(idx) {
    googletag.pubads().refresh([nbcgptengine.slotDefinitions[idx]]);
//console.log("**** nbcgptengine.slotRefresh | COMPLETE | " + idx + " |");
}	



/*
 * nbcgptengine.buildAnAdSlot('hostDiv','width,height',number,'top','top video');
 * Dynamically build a <div> element to be parsed into a GPT ad. PLEASE NOTE: Anything
 * you may have in your host element will be erased.
 */


nbcgptengine.buildAnAdSlot = function(host,size,posNum,posString,module,hidden) {
	if(!module) {
		module = "";
	}
	jQuery(host).html('');
	nbcgptengine.dynamicCount = (nbcgptengine.dynamicCount + 1);
	
	if(size == "300,250") {
		var slotName = "dyn"+ nbcgptengine.dynamicCount;
	} else if ( (size =="970,66") || (size =="728,90") ) {
		var slotName = "dynlb-"+ nbcgptengine.dynamicCount;
	} else if ( size == "88,31" ) {
		var slotName = "dynmicro"+ nbcgptengine.dynamicCount;
	} else if (size == "300,160") {
		var slotName = "dynonesixty"+ nbcgptengine.dynamicCount;
	}
	
	
	
	newAdSlot = document.createElement('div');
	newAdSlot.setAttribute('id',slotName);
	newAdSlot.setAttribute('className','adSlot');
	newAdSlot.setAttribute('class','adSlot');
	newAdSlot.setAttribute('data-sizes',size);
	newAdSlot.setAttribute('data-ord',posNum);
	newAdSlot.setAttribute('data-pos',posString);
	newAdSlot.setAttribute('data-gptcollapse','false');
	
	if(hidden == true) {
		newAdSlot.style.visibility = "hidden";
	}

	newAdSlot.setAttribute('data-module',module);
	//console.log("New ad slot created!");
	//console.log(newAdSlot);
	jQuery(host).append(newAdSlot);
	//console.log("New ad appended");
	nbcgptengine.collectSlots('#'+slotName);
	
}

/*
 * nbcgptengine.collectSlots()
 * 
 * Scan the page for <div> elements tagged with class .adSlot, extract their
 * data attributes, and store it all in an array.
 * 
 * Usage: 
 * nbcgptengine.collectSlots() - Invoked during runtime,
 * collects all the .adSlot elements on the page for parsing
 * 
 * nbcgptengine.collectSlots('#someElementID') - Invoked when
 * dynamically creating an ad slot, collects data about just that one.
 * 
 */

nbcgptengine.collectSlots = function(dynamicElement) {
	// If you generate an ad slot after the page is loaded, this will push that new element into the *.slotData array
	if(dynamicElement) {
		var internalID = dynamicElement.substr(1,length);
		var gptDataPoints = [];
		var retrievedDivName = jQuery(dynamicElement).attr('id');
		var dimensions = jQuery(dynamicElement).data('sizes');
		var retrievedOrd = jQuery(dynamicElement).data('ord');
		var retrievedPos = jQuery(dynamicElement).data('pos');
		var retrievedModule = jQuery(dynamicElement).data('module');
		
		
		
		var calculatedSizes = nbcgptengine.sizeParser(dimensions);
		gptDataPoints.push(retrievedDivName);
		gptDataPoints.push(calculatedSizes);
		gptDataPoints.push(retrievedOrd);
		gptDataPoints.push(retrievedPos);
		gptDataPoints.push(retrievedModule);
		
		nbc.gptParams.slotData.push(gptDataPoints);
		
		var newSlotData = nbc.gptParams.slotData.pop();
		
		googletag.cmd.push(function(){
		nbcgptengine.slotDefinitions[internalID] = googletag.defineSlot("/"+nbc.gptParams.suitenumber+"/"+nbc.gptParams.suitename+"/"+nbc.gptParams.gptZone,[newSlotData[1][0]],newSlotData[0])
		.setTargeting("pos",[newSlotData[3]])
		.setTargeting("module",[newSlotData[4]])
		.setTargeting("feature",[nbc.gptParams.pageData.feature])
		.setTargeting("contentid",[nbc.gptParams.pageData.contentid])
		.setTargeting("pagetype",[nbc.gptParams.pageData.pagetype])
		.setTargeting("sponsor",[nbc.gptParams.pageData.sponsor])
		.setTargeting("adtest",[nbc.gptParams.pageData.adtest])
		.setTargeting("stage",[nbc.gptParams.pageData.stage])
		.setTargeting("kw",[nbc.gptParams.pageData.searchkw])
		.setTargeting("zc",[nbc.gptParams.pageData.zipcode])
		.setTargeting("partner",[nbc.gptParams.pageData.partner])
		.setTargeting("category",[nbc.gptParams.pageData.category])
		.addService(googletag.pubads());
		});
		
		
		nbcgptengine.manualDisplay(internalID);
	
	
	} else {
	
	var adSlots = jQuery('div.adSlot');
		jQuery.each(adSlots,function(idx,val) {
			var gptDataPoints = [];
			var retrievedDivName = jQuery(val).attr('id');
			var dimensions = jQuery(val).data('sizes');
			var retrievedOrd = jQuery(val).data('ord');
			var retrievedPos = jQuery(val).data('pos');
			var retrievedModule = jQuery(val).data('module');
			if(jQuery(val).data('gptcollapse') !=undefined) {
				var retrievedcollapse = jQuery(val).data('gptcollapse');
			}
			var calculatedSizes = nbcgptengine.sizeParser(dimensions);
			gptDataPoints.push(retrievedDivName);
			gptDataPoints.push(calculatedSizes);
			gptDataPoints.push(retrievedOrd);
			gptDataPoints.push(retrievedPos);
			gptDataPoints.push(retrievedModule);
			gptDataPoints.push(retrievedcollapse);
			nbc.gptParams.slotData.push(gptDataPoints);
		});
	
	if(typeof U == "object" && typeof U.log == "function") {
		U.log("**** nbcgptengine.collectSlots | success! ****");
		U.log(nbc.gptParams.slotData);
	}
	if(nbc.gptParams.slotData.length > 0) {
U.log("Calling Prime...");
	nbcgptengine.primeGPT();
	}
	
	}
}

/*
 * nbcgptengine.sizeParser()
 * 
 * Doubleclick's GPT tags require an array with numbers for size data;
 * jQuery.data() returns a string in all circumstances.
 * 
 * This function converts the size attributes in the HTML to the correct format
 * and datatype. In other words: DO NOT TOUCH UNLESS YOU REALLY, REALLY MEAN IT!
 *
 */

nbcgptengine.sizeParser = function(szData) {
	var sizeSplit = szData.split('|');
	var spArray = [];
		jQuery.each(sizeSplit,function(idx,val) {
		var tmpArray = sizeSplit[idx].split(',');
		var conversionArray = [Number(tmpArray[0]),Number(tmpArray[1])];
		spArray.push(conversionArray);
	});
	
	return spArray;
	
}


/*
 * nbcgptengine.validateData()
 * Simple output of all ad slots found on the page
 * at run-time. Use to sanity check against the 
 * Google GPT console.
 */

nbcgptengine.validateData = function() {
	jQuery.each(nbc.gptParams.slotData,function(idx,val) {
		U.log("SLOT | " + (idx + 1));
		U.log("NAME | " + nbc.gptParams.slotData[idx][0]);
		U.log("SIZES | "+ nbc.gptParams.slotData[idx][1]);
		U.log("SIZE CLASS ORDER | " + nbc.gptParams.slotData[idx][2]);
		U.log("AD POSITION | " + nbc.gptParams.slotData[idx][3] + "\n");
	});
}


	
	// For testing purposes only.
	nbcgptengine.manualDisplay = function(hostElement) {
		
		googletag.cmd.push(function(){
			googletag.display(hostElement);
		});
	}


/*
 * nbcgptengine.callAds()
 * Render the newly-defined ad slots.
 */
	
nbcgptengine.callAds = function () {
	jQuery.each(nbc.gptParams.slotData,function(idx,val) {
		U.log("\n Call ads loop counter | " + idx);
		googletag.cmd.push(function(){
			googletag.display(nbc.gptParams.slotData[idx][0]);
			if(typeof U == "object" && typeof U.log == "function") {
				U.log("\n **** nbcgptengine.callAds | display method called for | "+nbc.gptParams.slotData[idx][0]+ " ****");
			}
		});
	});
}


/*
 * nbcgptengine.primeGPT()
 * Parse the collected slot data and define the ad units
 */

nbcgptengine.primeGPT = function() {

googletag.cmd.push(function() {

	jQuery.each(nbc.gptParams.slotData,function(idx,val) {
		// If the slot only has one size attributed to it.
		if (nbc.gptParams.slotData[idx][1].length == 1) {
			
			
			// Slot-level attributes
			nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]] = googletag.defineSlot("/"+nbc.gptParams.suitenumber+"/"+nbc.gptParams.suitename+"/"+nbc.gptParams.gptZone,[nbc.gptParams.slotData[idx][1][0]],nbc.gptParams.slotData[idx][0])
			.setTargeting("pos",[nbc.gptParams.slotData[idx][3]])
			.setTargeting("module",[nbc.gptParams.slotData[idx][4]])
			.setTargeting("feature",[nbc.gptParams.pageData.feature])
			.setTargeting("contentid",[nbc.gptParams.pageData.contentid])
			.setTargeting("pagetype",[nbc.gptParams.pageData.pagetype])
			.setTargeting("sponsor",[nbc.gptParams.pageData.sponsor])
			.setTargeting("adtest",[nbc.gptParams.pageData.adtest])
			.setTargeting("stage",[nbc.gptParams.pageData.stage])
			.setTargeting("kw",[nbc.gptParams.pageData.searchkw])
			.setTargeting("zc",[nbc.gptParams.pageData.zipcode])
			.setTargeting("partner",[nbc.gptParams.pageData.partner])
			.setTargeting("category",[nbc.gptParams.pageData.category])
			.addService(googletag.pubads());
				
			// If the slot is flagged to collapse if nothing is targeted...
				if(nbc.gptParams.slotData[idx][5] == true) {
					nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]].setCollapseEmptyDiv(true,true);
				}
			
			console.warn("\n**** nbcgptengine.primegpt | CONFIRM .defineSlot POPULATION (One size class) **** \n");
			console.warn('googletag.defineSlot("/'+nbc.gptParams.suitenumber+'/'+nbc.gptParams.suitename+'/'+nbc.gptParams.gptZone+'",['+nbc.gptParams.slotData[idx][1]+'],"'+nbc.gptParams.slotData[idx][0]+'").setTargeting("pos",["'+nbc.gptParams.slotData[idx][3]+'"]).addService(googletag.pubads()))');
		
		// If the slot has more than one size attributed to it.
		} else if (nbc.gptParams.slotData[idx][1].length == 2) {
			
			// Slot-level attributes
			nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]] = googletag.defineSlot("/"+nbc.gptParams.suitenumber+"/"+nbc.gptParams.suitename+"/"+nbc.gptParams.gptZone,[nbc.gptParams.slotData[idx][1][0], nbc.gptParams.slotData[idx][1][1] ],nbc.gptParams.slotData[idx][0])
			.setTargeting("pos",[nbc.gptParams.slotData[idx][3]])
			.setTargeting("module",[nbc.gptParams.slotData[idx][4]])
			.setTargeting("feature",[nbc.gptParams.pageData.feature])
			.setTargeting("contentid",[nbc.gptParams.pageData.contentid])
			.setTargeting("pagetype",[nbc.gptParams.pageData.pagetype])
			.setTargeting("sponsor",[nbc.gptParams.pageData.sponsor])
			.setTargeting("adtest",[nbc.gptParams.pageData.adtest])
			.setTargeting("stage",[nbc.gptParams.pageData.stage])
			.setTargeting("kw",[nbc.gptParams.pageData.searchkw])
			.setTargeting("zc",[nbc.gptParams.pageData.zipcode])
			.setTargeting("partner",[nbc.gptParams.pageData.partner])
			.setTargeting("category",[nbc.gptParams.pageData.category])
			.addService(googletag.pubads());
			
			// If the slot is flagged to collapse if nothing is trafficked.
			if(nbc.gptParams.slotData[idx][5] == true) {
				nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]].setCollapseEmptyDiv(true,true);
				//console.log(nbc.gptParams.slotData[idx][0] + " will collapse!");
			}
			console.warn("\n**** nbcgptengine.primegpt | CONFIRM .defineSlot POPULATION (Multiple size classes) ****");
			console.warn('googletag.defineSlot("/'+nbc.gptParams.suitenumber+'/'+nbc.gptParams.suitename+'/'+nbc.gptParams.gptZone+'",[['+nbc.gptParams.slotData[idx][1][0]+'],'+'['+nbc.gptParams.slotData[idx][1][1]+']],"'+nbc.gptParams.slotData[idx][0]+'").setTargeting("pos",["'+nbc.gptParams.slotData[idx][3]+'"]).addService(googletag.pubads()))');
			
		} else if (nbc.gptParams.slotData[idx][1].length == 3) {
			
			// Slot-level attributes
			nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]] = googletag.defineSlot("/"+nbc.gptParams.suitenumber+"/"+nbc.gptParams.suitename+"/"+nbc.gptParams.gptZone,[nbc.gptParams.slotData[idx][1][0], nbc.gptParams.slotData[idx][1][1],nbc.gptParams.slotData[idx][1][2] ],nbc.gptParams.slotData[idx][0])
			.setTargeting("pos",[nbc.gptParams.slotData[idx][3]])
			.setTargeting("module",[nbc.gptParams.slotData[idx][4]])
			.setTargeting("feature",[nbc.gptParams.pageData.feature])
			.setTargeting("contentid",[nbc.gptParams.pageData.contentid])
			.setTargeting("pagetype",[nbc.gptParams.pageData.pagetype])
			.setTargeting("sponsor",[nbc.gptParams.pageData.sponsor])
			.setTargeting("adtest",[nbc.gptParams.pageData.adtest])
			.setTargeting("stage",[nbc.gptParams.pageData.stage])
			.setTargeting("kw",[nbc.gptParams.pageData.searchkw])
			.setTargeting("zc",[nbc.gptParams.pageData.zipcode])
			.setTargeting("partner",[nbc.gptParams.pageData.partner])
			.setTargeting("category",[nbc.gptParams.pageData.category])
			.addService(googletag.pubads());
			
			// If the slot is flagged to collapse if nothing is trafficked.
			if(nbc.gptParams.slotData[idx][5] == true) {
				nbcgptengine.slotDefinitions[nbc.gptParams.slotData[idx][0]].setCollapseEmptyDiv(true,true);
				//console.log(nbc.gptParams.slotData[idx][0] + " will collapse!");
			}
			console.warn("\n**** nbcgptengine.primegpt | CONFIRM .defineSlot POPULATION (Multiple size classes) ****");
			console.warn('googletag.defineSlot("/'+nbc.gptParams.suitenumber+'/'+nbc.gptParams.suitename+'/'+nbc.gptParams.gptZone+'",[['+nbc.gptParams.slotData[idx][1][0]+'],'+'['+nbc.gptParams.slotData[idx][1][1]+'],'+'['+nbc.gptParams.slotData[idx][1][2]+']],"'+nbc.gptParams.slotData[idx][0]+'").setTargeting("pos",["'+nbc.gptParams.slotData[idx][3]+'"]).addService(googletag.pubads()))');
			
		}
		
		
		
			if ( top.__nbcudigitaladops_inject && top.__nbcudigitaladops_inject.getGPT ){
				var _GPT_params = top.__nbcudigitaladops_inject.getGPT();
					for ( var _key in _GPT_params ){
						if( _GPT_params.hasOwnProperty(_key) ){
							googletag.pubads().setTargeting( _key, _GPT_params[_key] );
						}
					}
		    
					
					console.warn("**** nbcgptengine.primeGPT | PixelMan bound successfully.");
					
			}
		
		
			console.warn ("**** nbcgptengine.primeGPT | Slot " + (idx + 1) + " configured ****");
		
	
	// End of .each cycling through the array.
	});

/// End of Google command queue push.
});

	// Render all discovered ads.
U.log("Calling ads...");
	nbcgptengine.callAds();
}



//////// RUN INIT ONCE SCRIPT IS IN MEMORY. ///////////////////////////////////
nbcgptengine.init();
