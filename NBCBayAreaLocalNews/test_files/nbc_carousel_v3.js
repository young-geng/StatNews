/* 
 * General usage:
 *
 * Attach this to an end card's play button so the script knows which end card is currently being viewed. 
 * nbcCarousel.init(nbcVideoPageUtils.targetEndCard,'videoBox',false);
 *
 * Attach these to the click events of the navigation elements
 * nbcCarousel.pressedRightArrow()
 * nbcCarousel.pressedLeftArrow()
*/

var nbcCarousel = {};

	nbcCarousel.stories = null; // Stores result of jQuery element scan. DOM elements should be able to be safely removed without affecting this.
	nbcCarousel.storyCount = null; // Calculated dynamically
	nbcCarousel.storyWidth = null; // Number in pixels. Calculated based on first story in the HTML structure, all assumed to be uniform.
	nbcCarousel.storyHeight = null; // Number in pixels. Calculated based on first story in the HTML structure, all assumed to be uniform.
	nbcCarousel.storyLeftMargin = null; // The left margin space seperating each <li>. Calculated based on first story in the HTML structure, all assumed to be uniform.
	nbcCarousel.storyRightMargin = null; // The right margin space seperating each <li>. Calculated based on first story in the HTML structure, all assumed to be uniform.
	nbcCarousel.completeWidth = null; // Width of inner <div> to be set
	nbcCarousel.howManyToDisplay = 3; // How many stories should be in the visible region. Sets width of carousel.
	nbcCarousel.carouselWidth = null; // Width of the visible portion of the carousel. 
	nbcCarousel.widthOfOneStory = null;
	nbcCarousel.initalOffset = null; // TK, possibly X % widthOfOneStory
	nbcCarousel.scrollBy = null;
	nbcCarousel.arrowPadding = 0; // Hard coded for now, calculate dynamically later.
	nbcCarousel.snapStatus = null;
	currentScrollPos = 0;

	nbcCarousel.init = function(targetContainer,targetList,snapStatus) {
	
		//U.log('nbcCarousel.init initialized');
		nbcCarousel.snapStatus = snapStatus;
		nbcCarousel.limiter = jQuery(targetContainer).parent().attr('id');
		nbcCarousel.stories = jQuery(targetContainer).find('.'+targetList+' li');
		//nbcCarousel.stories = jQuery(targetContainer + '.'+targetList+' li');
		
		nbcCarousel.storyCount = nbcCarousel.stories.length;
		nbcCarousel.storyWidth = parseInt(jQuery(nbcCarousel.stories.get(0)).width());
		nbcCarousel.storyHeight = parseInt(jQuery(nbcCarousel.stories.get(0)).height());
		nbcCarousel.storyLeftMargin = parseInt(jQuery(nbcCarousel.stories.get(0)).css('margin-left'));
		nbcCarousel.storyRightMargin = parseInt(jQuery(nbcCarousel.stories.get(0)).css('margin-right'));
		nbcCarousel.widthOfOneStory = (nbcCarousel.storyWidth + nbcCarousel.storyLeftMargin + nbcCarousel.storyRightMargin);
		nbcCarousel.completeWidth = ((nbcCarousel.storyWidth + nbcCarousel.storyLeftMargin + nbcCarousel.storyRightMargin)) * (nbcCarousel.storyCount);
		nbcCarousel.carouselWidth = (nbcCarousel.howManyToDisplay * nbcCarousel.widthOfOneStory);
		nbcCarousel.scrollBy = nbcCarousel.carouselWidth;
		nbcCarousel.limiter = jQuery(targetContainer).parent().attr('id');
		nbcCarousel.totalPages = Math.ceil((nbcCarousel.storyCount / nbcCarousel.howManyToDisplay));
		nbcCarousel.currentPage = 1;
		nbcCarousel.status = "nbcCarousel found "+nbcCarousel.storyCount+" videos to scroll.";

		jQuery('.videoBox').css ({'width':nbcCarousel.completeWidth+'px'});
		
		//jQuery(targetContainer).css ({'width':(nbcCarousel.carouselWidth + nbcCarousel.arrowPadding)+'px'});
		//jQuery('#popular_stories_mod').css ({'width':nbcCarousel.carouselWidth+'px','overflow':'hidden'});
		if(nbcCarousel.totalPages == 0){
			jQuery(nbcVideoPageUtils.targetEndCard).find('p.related').html('More videos (1 of 1)');
		}	else{
				jQuery(nbcVideoPageUtils.targetEndCard).find('p.related').html('More videos (1 of '+nbcCarousel.totalPages+')');	
		}
		
		return nbcCarousel.status;
		
	
	}


nbcCarousel.pressedRightArrow = function() {
	var tmpTarget = jQuery(nbcVideoPageUtils.targetEndCard).get(0);
	var useThisRelatedVideos = jQuery(tmpTarget).find('.videoBox');
	if((jQuery(useThisRelatedVideos).position().left * -1) + (nbcCarousel.scrollBy) >= nbcCarousel.completeWidth) {
		jQuery('.next').one('click',nbcCarousel.pressedRightArrow);
	} else {
		jQuery(useThisRelatedVideos).animate({'left':'-='+(nbcCarousel.scrollBy) +'px'},{complete:function() {jQuery('.next').one('click',nbcCarousel.pressedRightArrow);}});
		nbcCarousel.currentPage+=1;
		jQuery(nbcVideoPageUtils.targetEndCard).find('p.related').html('More videos ('+nbcCarousel.currentPage+' of '+nbcCarousel.totalPages+')');
		if(nbcCarousel.currentPage > 1){
			$('#multimedia-module .prev').removeClass('noArrow');
		}
		if(nbcCarousel.currentPage == nbcCarousel.totalPages){
			$('#multimedia-module .next').addClass('noArrow');
		}
	}
}

nbcCarousel.pressedLeftArrow = function() {
	var tmpTarget = jQuery(nbcVideoPageUtils.targetEndCard).get(0);
	var useThisRelatedVideos = jQuery(tmpTarget).find('.videoBox');
	if(((jQuery(useThisRelatedVideos).position().left * -1) - nbcCarousel.scrollBy) < 0) {
		jQuery('.prev').one('click',nbcCarousel.pressedLeftArrow);
	} else {
		jQuery(useThisRelatedVideos).animate({'left':'+='+(nbcCarousel.scrollBy) +'px'},{complete:function() {jQuery('.prev').one('click',nbcCarousel.pressedLeftArrow);}});
		nbcCarousel.currentPage-=1;
		jQuery(nbcVideoPageUtils.targetEndCard).find('p.related').html('More videos ('+nbcCarousel.currentPage+' of '+nbcCarousel.totalPages+')');
		if(nbcCarousel.currentPage == 1){
			$('#multimedia-module .prev').addClass('noArrow');
		}
		if(nbcCarousel.currentPage != nbcCarousel.totalPages){
			$('#multimedia-module .next').removeClass('noArrow');
		}
	}
} //END nbcCarousel.pressedLeftArrow
