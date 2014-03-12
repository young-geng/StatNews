/*************************************************** 
* Last edited by: Ray Shahriar
* Date modified: 12-12-2012
* CMS Version: 29
* Ticket No.: SSO for all markets
***************************************************/
// GLOBAL SOCIAL VAR
var USER_NAME = null;
var userClickedLogin = false;
function showUserInfoLoginState(response){
	// alert("Login");
	if(response.user != null && response.user.isLoggedIn){
		loginStatus();
		// alert("Login Status");
	} else{
		jQuery('#socializeLoggedoutState').fadeIn('fast');
		// alert("Logged Out State");	
	}
}
// On Body load
function initSocialize(){
	// alert("Init Login");
	gigya.socialize.getUserInfo({callback:showUserInfoLoginState});
	jQuery('.tipsLink').after(' | ');
	// alert("ShowUserInfo");
	// register for login event
	gigya.socialize.addEventHandlers({
		onLogin: loginStatus,
		onLogout: logoutStatus
	});
}
function loginStatus(){
	// alert('logging in');
	jQuery('#socializeLoggedoutState').fadeOut('fast');
	gigya.socialize.getUserInfo({callback:getName});
	function getName(response){
		if(response.errorCode == 0){
			var user = response['user'];
			var msg = 'Welcome ' + user['firstName'] + ' ' + user['lastName'];
			var gigyaUserID = user['UID'];
			// alert(msg);
			// Length to cut name
			var lengthToCut = 11;
			// Assign User Name
			var socializeUsernameLong = user['firstName'];
			USER_NAME = socializeUsernameLong; 
			if(socializeUsernameLong.length > 11){
				var socializeUsername = socializeUsernameLong.substr(0, lengthToCut)+'...';
			}else{
				var socializeUsername = socializeUsernameLong;
			}
			jQuery('#socializeLoggedinState').fadeIn('fast');
			jQuery('#socializeLoggedinState #myAccount').html(socializeUsername+'<span></span>');
			
			// Try to set social profile's firstname to site profile firstname when first time or when the site firstname is empty
			if(userClickedLogin == true || USER_NAME == null || USER_NAME == ""){
				jQuery.ajax({url: '/i/dispatcher/?h=gigya_login_set_account&gigyaUID=' + gigyaUserID + '&rand=' + Math.random()});
				console.log('User clicked login. Ajax call invoked for user ID: ' + gigyaUserID);
			}
		}
	}
}

function logoutStatus(){
	USER_NAME = null;
	socializeDropDown();
	jQuery('#socializeLoggedinState').fadeOut('fast');
	jQuery('#socializeLoggedoutState').fadeIn('fast');
}

function socializeDropDown(){
	if(jQuery('#socializeLoggedinState #myAccount span').hasClass('active')){
		jQuery('#socializeLoggedinState #myAccount span').removeClass('active');
	} else{
		jQuery('#socializeLoggedinState #myAccount span').addClass('active');
	}
	jQuery('.profileDropDown').fadeToggle('fast');
}

// Load screen-sets
function socializeLogin(loginScreenParam){
	//writeLoginScreensToBody();
	gigya.accounts.showScreenSet(loginScreenParam); // Login Screen-set
	userClickedLogin = true;
};
function socializeSignup(signupScreenParam){
	//writeLoginScreensToBody();
	gigya.accounts.showScreenSet(signupScreenParam); // Sign Up Screen-set
};
function socializeProfile(profileScreenParam){
	//writeProfileScreensToBody();
	socializeDropDown();
	gigya.accounts.showScreenSet(profileScreenParam); // Profile Screen-set
};
function socializeLogout(){
	//alert("Log Out Clicked");
	gigya.accounts.logout({forceProvidersLogout:'true'}); // Logout from Gigya platform
};

/////////////////////// SHARE BAR FUNCTIONALITY //////////////////////////////
// Parses the activityContext to make sure we do appropriate truncation
// If total length is > total_length_threshold char, then truncate the title to 100 char
// Assumed that the format is username + action + : + title + : + description
function activityContextParser(evt, activityContext) {
	var total_length_threshold = 92;
	var truncate_title_to = 46;
	var actTitle = activityContext["ACTION_CONTENT_TITLE"];
	var actDescription = activityContext["ACTION_CONTENT_DESCRIPTION"];
	var actLink = activityContext["ACTION_CONTENT_LINK"];
	var actName = "";	
	var provider = evt.providers;
	var userInfo = gigya.socialize.getUserInfo();
	var username =	USER_NAME + "";  // From global variable

	if (provider == "facebook-like"){
		actName = "recommended"
	} else if (provider == "facebook-send"){
		actName = "shared";
	} else if (provider == "twitter-tweet"){
		actName = "tweeted";
	} else if (provider == "google-plusone"){
		actName = "recommended";
	}	
	var total_string = username + " " + actName + ":" + actTitle + ":" + actDescription;
	// Do some string unescape to get better approximation of length
	total_string = total_string.replace(/&quot;/g, "'");
	total_string = total_string.replace(/&rsquo;/g, "'");
	
	if (total_string.length > total_length_threshold) {
		activityContext["ACTION_CONTENT_TITLE"] = actTitle.substring(0, truncate_title_to) + "...";
	}
}

function showShareBar(shareBarParams,activityContext) {
	if(SHARE_BAR_PLUGIN_ENABLED) {	
		shareBarParams["context"] = activityContext;
		
		// Check what activity so that we can register appropriate handler
		// no space between assignment and function names
		shareBarParams["onSendDone"] =publishDefaultActivitiesForActivityPlugin;
		
		// TODO: Do we need to create a dummy handler for on onShareButtonClicked?
			
		// Depending on the context of the action, allows us to "inject" certain event handlers 
		if (activityContext["ACTION_CONTEXT"] == "subsection_stories") {
			// no space between assignment and function names
			shareBarParams["onSendDone"] =publishSubSectionActivitiesForActivityPlugin;
		}
	
		gigya.socialize.showShareBarUI(shareBarParams);
	}
}

// Handlers for sharebar to publish useractions to the appropriate activities
function publishDefaultActivitiesForActivityPlugin(evt) {
	if(SHARE_BAR_PLUGIN_ENABLED) {	
		// TODO: Build useractivities string depending on the type of social network features
		var actContext = evt.context; // This is the ActivityContext which gives you content id and the place where the share bar was called
		var eventNameSpace = evt.eventName + "-" + evt.providers + "-" + actContext["ACTION_CONTENT_ID"];
		var hiddenDiv = document.getElementById(eventNameSpace);
	
		// Find the hidden div to see if this specific content/context has already fired once as an event	
		if(hiddenDiv == null){
			// Must mark fire event first as event handlers are quite fast
			markEventHasFired(evt, actContext);
			var provider = evt.providers // This tells you which provider was used for sharebar
			if (provider != null) {
				activityContextParser(evt, actContext);
				// Constructing a UserAction Object
				var act = new gigya.socialize.UserAction();
				var actTitle = actContext["ACTION_CONTENT_TITLE"];
				var actDescription = actContext["ACTION_CONTENT_DESCRIPTION"];
				var actLink = actContext["ACTION_CONTENT_LINK"];
				var actFeedID = actContext["ACTION_ACTIVITY_FEED_ID"];
				
				// Make sure we don't have escape values
				if (actTitle != null) {
					actTitle = unescape(actTitle);
				}
				
				if (actDescription != null) {
					actDescription = unescape(actDescription);
				}
												
				act.setTitle(actTitle);  // Setting the Title
				act.setDescription(actDescription);   // Setting Description
				act.setLinkBack(actLink);
									
				if (provider == "facebook-like"){
					act.setActionName("recommended");
				} else if (provider == "facebook-send"){
					act.setActionName("shared");
				} else if (provider == "twitter-tweet"){
					act.setActionName("tweeted");
				} else if (provider == "google-plusone"){
					act.setActionName("recommended");
				}
	
				var params1 = 
				{
				    userAction:act,
				    scope:'both', // Goes out to both social networks and the activities feed
				    privacy:'public', // Me and public tabs are showing same info
				    feedID: actFeedID  
				};			
				// Publishing the User Action to Activities Feed		
				gigya.socialize.publishUserAction(params1);			
			}
			
			//alert('publishDefaultActivitiesForActivityPlugin --> provider:' + provider + ' activitycontext:' + actContext["ACTION_CONTEXT"]);
		} // END IF enabled
	}
}
// Publish feed to activity for subsection area
function publishSubSectionActivitiesForActivityPlugin(evt) {
	if(SHARE_BAR_PLUGIN_ENABLED) {	
		// TODO: Build useractivities string depending on the type of social network features	
		var actContext = evt.context; // This is the ActivityContext which gives you content id and the place where the share bar was called	
		var eventNameSpace = evt.eventName + "-" + evt.providers + "-" + actContext["ACTION_CONTENT_ID"];
		var hiddenDiv = document.getElementById(eventNameSpace);
		
		// Find the hidden div to see if this specific content/context has already fired once as an event
		if (hiddenDiv == null){
			// Must mark fire event first as event handlers are quite fast
			markEventHasFired(evt, actContext);
			var provider = evt.providers // This tells you which provider was used for sharebar	
			if (provider != null) {
				activityContextParser(evt, actContext);		
				// Constructing a UserAction Object
				var act = new gigya.socialize.UserAction();
				var actTitle = actContext["ACTION_CONTENT_TITLE"];
				var actDescription = actContext["ACTION_CONTENT_DESCRIPTION"];
				var actLink = actContext["ACTION_CONTENT_LINK"];
				var actFeedID = actContext["ACTION_ACTIVITY_FEED_ID"];

				// Make sure we don't have escape values
				if (actTitle != null) {
				alert("title before: " + actTitle);
					actTitle = unescape(actTitle);
				alert("title after: " + actTitle);
				}
				
				if (actDescription != null) {
				alert("description before: " + actDescription);
					actDescription = unescape(actDescription);
				alert("description after: " + actDescription);
				}
								
				act.setTitle(actTitle);  // Setting the Title
				act.setDescription(actDescription);   // Setting Description
				act.setLinkBack(actLink);			
									
				if (provider == "facebook-like"){
					act.setActionName("recommended");
				} else if (provider == "facebook-send"){
					act.setActionName("shared");
				} else if (provider == "twitter-tweet"){
					act.setActionName("tweeted");
				} else if (provider == "google-plusone"){
					act.setActionName("recommended");
				}
	
				var params1 = 
				{
				    userAction:act,
				    scope:'both', // Goes out to both social networks and the activities feed
				    privacy:'public', // Me and public tabs are showing same info
				    feedID: actFeedID  
				};			
				// Publishing the User Action to Activities Feed		
				gigya.socialize.publishUserAction(params1);			
			}
			//alert('publishSubSectionActivitiesForActivityPlugin --> provider:' + provider + ' activitycontext:' + actContext["ACTION_CONTEXT"]);	
		}
	} // END if enabled
}

// Helper method to keep track of fired-event on the page using hidden div tags
// No need to process this function if the ACTION_SINGLE_STORY is not true in the context
function markEventHasFired(evt, actContext){
	var singleStory = false;
	if (actContext != null && actContext["ACTION_SINGLE_STORY"] != null && actContext["ACTION_SINGLE_STORY"] + "" == "true")
	{
		singleStory = true;
	}
	
	if (singleStory == true) {
		var eventNameSpace = evt.eventName + "-" + evt.providers + "-" + actContext["ACTION_CONTENT_ID"];
		var hiddenDiv = document.getElementById(eventNameSpace);
		if (hiddenDiv == null){
			// Write to html body
			jQuery("body").append("<div id='" + eventNameSpace + "' style='display:none'>true</div>")
			// var eventFiredStatus = "<div id='" + eventNameSpace+ "' style='display:none'>true</div>";
			// document.body.innerHTML = eventFiredStatus + document.body.innerHTML;
		}
	}
}

/////////////////////// END SHARE BAR FUNCTIONALITY //////////////////////////////

// SCREENSETS
// You can do export of the UI Builder code and then go to:
// http://www.accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/
// To convert it to the strVar format you see below
function writeLoginScreensToBody(){
return;
	var loginScreensExist = document.getElementById("loginScreensWrote");
	// Only write screenset once per page load
	if (loginScreensExist == null)
	{
		// Don't change this as it will be written out with the screenset
		// Which allows us to make sure we only write out screens once
		var screensWroteStatusDiv = "<div id='loginScreensWrote'></div>";
		
		// Start of screenset exported code
		var strVar="";
		// Keep these comments 
		strVar += "<!-- START LOGIN SCREENSET -->";
				
		strVar += "<div class=\"gigya-screen-set\" id=\"login-web-nbcv1\" style=\"\" data-on-existing-login-identifier-screen=\"gigya-link-account-screen\"";
		strVar += "data-on-pending-registration-screen=\"gigya-complete-registiration-screen\" data-on-pending-verification-screen=\"gigya-email-verification-screen\"";
		strVar += "data-width=\"760\">";
		strVar += "  <div class=\"gigya-screen\" id=\"gigya-login-screen\" data-caption=\"Login\" style=\"width: 700px; \"";
		strVar += "  data-width=\"700\">";
		strVar += "    <form class=\"gigya-login-form\">";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <h2 class=\"gigya-composite-control gigya-composite-control-header\">Login with your social network:<\/h2>";
		strVar += "          <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "          data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-social-login\"";
		strVar += "          style=\"display: block; \">";
		strVar += "            <div class=\"gigya-social-login\">";
		strVar += "              <param name=\"width\" value=\"280\">";
		strVar += "              <param name=\"height\" value=\"172\">";
		strVar += "              <param name=\"enabledProviders\" value=\"facebook,Twitter,google\">";
		strVar += "              <param name=\"buttonsStyle\" value=\"fullLogo\">";
		strVar += "              <param name=\"buttonSize\" value=\"54\">";
		strVar += "              <param name=\"showWhatsThis\" value=\"false\">";
		strVar += "              <param name=\"showTermsLink\" value=\"false\">";
		strVar += "              <param name=\"hideGigyaLink\" value=\"true\">";
		strVar += "            <\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <h2 class=\"gigya-composite-control gigya-composite-control-header\">Or, login with your NBC account:<\/h2>";
		strVar += "          <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "          data-units=\"2\" style=\"height: 20px; \"><\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input name=\"loginID\" class=\"gigya-input-text\" tabindex=\"1\" style=\"width: 320px; \"";
		strVar += "            type=\"text\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"loginID\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Password: <a style=\"float: right; font-weight: normal; margin-right: 7px;\" data-switch-screen=\"gigya-forgot-password-screen\">Forgot password <\/a>";
		strVar += "              <\/span>";
		strVar += "            <\/label>";
		strVar += "            <input name=\"password\" class=\"gigya-input-password\" tabindex=\"2\" style=\"width: 320px; \"";
		strVar += "            type=\"password\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"password\"><\/span>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "              data-bound-to=\"gigya-login-form\">";
		strVar += "                <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-login-form\"";
		strVar += "                style=\"\"><\/div>";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-submit\">";
		strVar += "                <input class=\"gigya-input-submit\" value=\"Submit\" tabindex=\"3\" type=\"submit\">";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-composite-control gigya-spacer\" data-units=\"2\" style=\"height: 20px; \"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"text-align: right; display: block; \">Don't have an account yet? <a data-switch-screen=\"gigya-register-screen\">Click here <\/a> ";
		strVar += "          <\/label>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/form>";
		strVar += "  <\/div>";
		strVar += "  <div data-caption=\"Registration\" id=\"gigya-register-screen\" class=\"gigya-screen\"";
		strVar += "  style=\"width: 700px; \" data-width=\"700\">";
		strVar += "    <form class=\"gigya-register-form\">";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-layout-row\">";
		strVar += "          <div class=\"gigya-layout-cell\">";
		strVar += "            <div class=\"gigya-layout-row\">";
		strVar += "              <h2 class=\"gigya-composite-control gigya-composite-control-header\" style=\"display: block; \">Register with your social network<\/h2>";
		strVar += "              <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "              data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-social-login\"";
		strVar += "              style=\"display: block; \">";
		strVar += "                <div class=\"gigya-social-login\">";
		strVar += "                  <param value=\"280\" name=\"width\">";
		strVar += "                  <param value=\"172\" name=\"height\">";
		strVar += "                  <param name=\"enabledProviders\" value=\"facebook,Twitter,google\">";
		strVar += "                  <param name=\"buttonsStyle\" value=\"fullLogo\">";
		strVar += "                  <param name=\"buttonSize\" value=\"54\">";
		strVar += "                  <param name=\"showWhatsThis\" value=\"false\">";
		strVar += "                  <param name=\"showTermsLink\" value=\"false\">";
		strVar += "                  <param name=\"hideGigyaLink\" value=\"true\">";
		strVar += "                <\/div>";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-row\">";
		strVar += "              <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "              <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "              <div class=\"gigya-clear\"><\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-row\"><\/div>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-layout-cell\">";
		strVar += "            <div class=\"gigya-layout-row\">";
		strVar += "              <h2 class=\"gigya-composite-control gigya-composite-control-header\" style=\"display: block; \">Or, create a new NBC account<\/h2>";
		strVar += "              <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "              data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-row\">";
		strVar += "              <div class=\"gigya-layout-cell\">";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">First name:<\/span>";
		strVar += "                    <span class=\"gigya-required\">*<\/span>";
		strVar += "                  <\/label>";
		strVar += "                  <input class=\"gigya-input-text\" name=\"firstName\" data-display-name=\"\" tabindex=\"1\"";
		strVar += "                  type=\"text\">";
		strVar += "                  <span class=\"gigya-error-msg\" data-bound-to=\"firstName\"><\/span>";
		strVar += "                <\/div>";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-dropdown\">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">Country<\/span>";
		strVar += "                    <span class=\"gigya-required\">*<\/span>";
		strVar += "                  <\/label> <select tabindex=\"3\" name=\"country\" data-display-name=\"\"><option value=\"United States\">United States<\/option><option value=\"Afghanistan\">Afghanistan<\/option><option value=\"Albania\">Albania<\/option><option value=\"Algeria\">Algeria<\/option><option value=\"American Samoa\">American Samoa<\/option><option value=\"Andorra\">Andorra<\/option><option value=\"Angola\">Angola<\/option><option value=\"Anguilla\">Anguilla<\/option><option value=\"Antarctica\">Antarctica<\/option><option value=\"Antigua and Barbuda\">Antigua and Barbuda<\/option><option value=\"Argentina\">Argentina<\/option><option value=\"Armenia\">Armenia<\/option><option value=\"Armenia\">Armenia<\/option><option value=\"Aruba\">Aruba<\/option><option value=\"Australia\">Australia<\/option><option value=\"Austria\">Austria<\/option><option value=\"Azerbaijan\">Azerbaijan<\/option><option value=\"Azerbaijan\">Azerbaijan<\/option><option value=\"Bahamas\">Bahamas<\/option><option value=\"Bahrain\">Bahrain<\/option><option value=\"Bangladesh\">Bangladesh<\/option><option value=\"Barbados\">Barbados<\/option><option value=\"Belarus\">Belarus<\/option><option value=\"Belgium\">Belgium<\/option><option value=\"Belize\">Belize<\/option><option value=\"Benin\">Benin<\/option><option value=\"Bermuda\">Bermuda<\/option><option value=\"Bhutan\">Bhutan<\/option><option value=\"Bolivia\">Bolivia<\/option><option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina<\/option><option value=\"Botswana\">Botswana<\/option><option value=\"Bouvet Island\">Bouvet Island<\/option><option value=\"Brazil\">Brazil<\/option><option value=\"British Indian Ocean Territory\">British Indian Ocean Territory<\/option><option value=\"Brunei Darussalam\">Brunei Darussalam<\/option><option value=\"Bulgaria\">Bulgaria<\/option><option value=\"Burkina Faso\">Burkina Faso<\/option><option value=\"Burundi\">Burundi<\/option><option value=\"Cambodia\">Cambodia<\/option><option value=\"Cameroon\">Cameroon<\/option><option value=\"Canada\">Canada<\/option><option value=\"Cape Verde\">Cape Verde<\/option><option value=\"Cayman Islands\">Cayman Islands<\/option><option value=\"Central African Republic\">Central African Republic<\/option><option value=\"Chad\">Chad<\/option><option value=\"Chile\">Chile<\/option><option value=\"China\">China<\/option><option value=\"Christmas Island\">Christmas Island<\/option><option value=\"Cocos (Keeling) Islands\">Cocos (Keeling) Islands<\/option><option value=\"Colombia\">Colombia<\/option><option value=\"Comoros\">Comoros<\/option><option value=\"Congo\">Congo<\/option><option value=\"Congo, The Democratic Republic of The\">Congo, The Democratic Republic of The<\/option><option value=\"Cook Islands\">Cook Islands<\/option><option value=\"Costa Rica\">Costa Rica<\/option><option value=\"Cote Divoire\">Cote Divoire<\/option><option value=\"Croatia\">Croatia<\/option><option value=\"Cuba\">Cuba<\/option><option value=\"Cyprus\">Cyprus<\/option><option value=\"Cyprus\">Cyprus<\/option><option value=\"Czech Republic\">Czech Republic<\/option><option value=\"Denmark\">Denmark<\/option><option value=\"Djibouti\">Djibouti<\/option><option value=\"Dominica\">Dominica<\/option><option value=\"Dominican Republic\">Dominican Republic<\/option><option value=\"Easter Island\">Easter Island<\/option><option value=\"Ecuador\">Ecuador<\/option><option value=\"Egypt\">Egypt<\/option><option value=\"El Salvador\">El Salvador<\/option><option value=\"Equatorial Guinea\">Equatorial Guinea<\/option><option value=\"Eritrea\">Eritrea<\/option><option value=\"Estonia\">Estonia<\/option><option value=\"Ethiopia\">Ethiopia<\/option><option value=\"Falkland Islands (Malvinas)\">Falkland Islands (Malvinas)<\/option><option value=\"Faroe Islands\">Faroe Islands<\/option><option value=\"Fiji\">Fiji<\/option><option value=\"Finland\">Finland<\/option><option value=\"France\">France<\/option><option value=\"French Guiana\">French Guiana<\/option><option value=\"French Polynesia\">French Polynesia<\/option><option value=\"French Southern Territories\">French Southern Territories<\/option><option value=\"Gabon\">Gabon<\/option><option value=\"Gambia\">Gambia<\/option><option value=\"Georgia\">Georgia<\/option><option value=\"Georgia\">Georgia<\/option><option value=\"Germany\">Germany<\/option><option value=\"Ghana\">Ghana<\/option><option value=\"Gibraltar\">Gibraltar<\/option><option value=\"Greece\">Greece<\/option><option value=\"Greenland\">Greenland<\/option><option value=\"Greenland\">Greenland<\/option><option value=\"Grenada\">Grenada<\/option><option value=\"Guadeloupe\">Guadeloupe<\/option><option value=\"Guam\">Guam<\/option><option value=\"Guatemala\">Guatemala<\/option><option value=\"Guinea\">Guinea<\/option><option value=\"Guinea-bissau\">Guinea-bissau<\/option><option value=\"Guyana\">Guyana<\/option><option value=\"Haiti\">Haiti<\/option><option value=\"Heard Island and Mcdonald Islands\">Heard Island and Mcdonald Islands<\/option><option value=\"Honduras\">Honduras<\/option><option value=\"Hong Kong\">Hong Kong<\/option><option value=\"Hungary\">Hungary<\/option><option value=\"Iceland\">Iceland<\/option><option value=\"India\">India<\/option><option value=\"Indonesia\">Indonesia<\/option><option value=\"Indonesia\">Indonesia<\/option><option value=\"Iran\">Iran<\/option><option value=\"Iraq\">Iraq<\/option><option value=\"Ireland\">Ireland<\/option><option value=\"Israel\">Israel<\/option><option value=\"Italy\">Italy<\/option><option value=\"Jamaica\">Jamaica<\/option><option value=\"Japan\">Japan<\/option><option value=\"Jordan\">Jordan<\/option><option value=\"Kazakhstan\">Kazakhstan<\/option><option value=\"Kazakhstan\">Kazakhstan<\/option><option value=\"Kenya\">Kenya<\/option><option value=\"Kiribati\">Kiribati<\/option><option value=\"Korea, North\">Korea, North<\/option><option value=\"Korea, South\">Korea, South<\/option><option value=\"Kosovo\">Kosovo<\/option><option value=\"Kuwait\">Kuwait<\/option><option value=\"Kyrgyzstan\">Kyrgyzstan<\/option><option value=\"Laos\">Laos<\/option><option value=\"Latvia\">Latvia<\/option><option value=\"Lebanon\">Lebanon<\/option><option value=\"Lesotho\">Lesotho<\/option><option value=\"Liberia\">Liberia<\/option><option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya<\/option><option value=\"Liechtenstein\">Liechtenstein<\/option><option value=\"Lithuania\">Lithuania<\/option><option value=\"Luxembourg\">Luxembourg<\/option><option value=\"Macau\">Macau<\/option><option value=\"Macedonia\">Macedonia<\/option><option value=\"Madagascar\">Madagascar<\/option><option value=\"Malawi\">Malawi<\/option><option value=\"Malaysia\">Malaysia<\/option><option value=\"Maldives\">Maldives<\/option><option value=\"Mali\">Mali<\/option><option value=\"Malta\">Malta<\/option><option value=\"Marshall Islands\">Marshall Islands<\/option><option value=\"Martinique\">Martinique<\/option><option value=\"Mauritania\">Mauritania<\/option><option value=\"Mauritius\">Mauritius<\/option><option value=\"Mayotte\">Mayotte<\/option><option value=\"Mexico\">Mexico<\/option><option value=\"Micronesia, Federated States of\">Micronesia, Federated States of<\/option><option value=\"Moldova, Republic of\">Moldova, Republic of<\/option><option value=\"Monaco\">Monaco<\/option><option value=\"Mongolia\">Mongolia<\/option><option value=\"Montenegro\">Montenegro<\/option><option value=\"Montserrat\">Montserrat<\/option><option value=\"Morocco\">Morocco<\/option><option value=\"Mozambique\">Mozambique<\/option><option value=\"Myanmar\">Myanmar<\/option><option value=\"Namibia\">Namibia<\/option><option value=\"Nauru\">Nauru<\/option><option value=\"Nepal\">Nepal<\/option><option value=\"Netherlands\">Netherlands<\/option><option value=\"Netherlands Antilles\">Netherlands Antilles<\/option><option value=\"New Caledonia\">New Caledonia<\/option><option value=\"New Zealand\">New Zealand<\/option><option value=\"Nicaragua\">Nicaragua<\/option><option value=\"Niger\">Niger<\/option><option value=\"Nigeria\">Nigeria<\/option><option value=\"Niue\">Niue<\/option><option value=\"Norfolk Island\">Norfolk Island<\/option><option value=\"Northern Mariana Islands\">Northern Mariana Islands<\/option><option value=\"Norway\">Norway<\/option><option value=\"Oman\">Oman<\/option><option value=\"Pakistan\">Pakistan<\/option><option value=\"Palau\">Palau<\/option><option value=\"Palestinian Territory\">Palestinian Territory<\/option><option value=\"Panama\">Panama<\/option><option value=\"Papua New Guinea\">Papua New Guinea<\/option><option value=\"Paraguay\">Paraguay<\/option><option value=\"Peru\">Peru<\/option><option value=\"Philippines\">Philippines<\/option><option value=\"Pitcairn\">Pitcairn<\/option><option value=\"Poland\">Poland<\/option><option value=\"Portugal\">Portugal<\/option><option value=\"Puerto Rico\">Puerto Rico<\/option><option value=\"Qatar\">Qatar<\/option><option value=\"Reunion\">Reunion<\/option><option value=\"Romania\">Romania<\/option><option value=\"Russia\">Russia<\/option><option value=\"Russia\">Russia<\/option><option value=\"Rwanda\">Rwanda<\/option><option value=\"Saint Helena\">Saint Helena<\/option><option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis<\/option><option value=\"Saint Lucia\">Saint Lucia<\/option><option value=\"Saint Pierre and Miquelon\">Saint Pierre and Miquelon<\/option><option value=\"Saint Vincent and The Grenadines\">Saint Vincent and The Grenadines<\/option><option value=\"Samoa\">Samoa<\/option><option value=\"San Marino\">San Marino<\/option><option value=\"Sao Tome and Principe\">Sao Tome and Principe<\/option><option value=\"Saudi Arabia\">Saudi Arabia<\/option><option value=\"Senegal\">Senegal<\/option><option value=\"Serbia and Montenegro\">Serbia and Montenegro<\/option><option value=\"Seychelles\">Seychelles<\/option><option value=\"Sierra Leone\">Sierra Leone<\/option><option value=\"Singapore\">Singapore<\/option><option value=\"Slovakia\">Slovakia<\/option><option value=\"Slovenia\">Slovenia<\/option><option value=\"Solomon Islands\">Solomon Islands<\/option><option value=\"Somalia\">Somalia<\/option><option value=\"South Africa\">South Africa<\/option><option value=\"South Georgia and The South Sandwich Islands\">South Georgia and The South Sandwich Islands<\/option><option value=\"Spain\">Spain<\/option><option value=\"Sri Lanka\">Sri Lanka<\/option><option value=\"Sudan\">Sudan<\/option><option value=\"Suriname\">Suriname<\/option><option value=\"Svalbard and Jan Mayen\">Svalbard and Jan Mayen<\/option><option value=\"Swaziland\">Swaziland<\/option><option value=\"Sweden\">Sweden<\/option><option value=\"Switzerland\">Switzerland<\/option><option value=\"Syria\">Syria<\/option><option value=\"Taiwan\">Taiwan<\/option><option value=\"Tajikistan\">Tajikistan<\/option><option value=\"Tanzania, United Republic of\">Tanzania, United Republic of<\/option><option value=\"Thailand\">Thailand<\/option><option value=\"Timor-leste\">Timor-leste<\/option><option value=\"Togo\">Togo<\/option><option value=\"Tokelau\">Tokelau<\/option><option value=\"Tonga\">Tonga<\/option><option value=\"Trinidad and Tobago\">Trinidad and Tobago<\/option><option value=\"Tunisia\">Tunisia<\/option><option value=\"Turkey\">Turkey<\/option><option value=\"Turkey\">Turkey<\/option><option value=\"Turkmenistan\">Turkmenistan<\/option><option value=\"Turks and Caicos Islands\">Turks and Caicos Islands<\/option><option value=\"Tuvalu\">Tuvalu<\/option><option value=\"Uganda\">Uganda<\/option><option value=\"Ukraine\">Ukraine<\/option><option value=\"United Arab Emirates\">United Arab Emirates<\/option><option value=\"United Kingdom\">United Kingdom<\/option><option value=\"United States\">United States<\/option><option value=\"United States Minor Outlying Islands\">United States Minor Outlying Islands<\/option><option value=\"Uruguay\">Uruguay<\/option><option value=\"Uzbekistan\">Uzbekistan<\/option><option value=\"Vanuatu\">Vanuatu<\/option><option value=\"Vatican City\">Vatican City<\/option><option value=\"Venezuela\">Venezuela<\/option><option value=\"Vietnam\">Vietnam<\/option><option value=\"Virgin Islands, British\">Virgin Islands, British<\/option><option value=\"Virgin Islands, U.S.\">Virgin Islands, U.S.<\/option><option value=\"Wallis and Futuna\">Wallis and Futuna<\/option><option value=\"Western Sahara\">Western Sahara<\/option><option value=\"Yemen\">Yemen<\/option><option value=\"Yemen\">Yemen<\/option><option value=\"Zambia\">Zambia<\/option><option value=\"Zimbabwe\">Zimbabwe<\/option><\/select> ";
		strVar += "                  <span";
		strVar += "                  class=\"gigya-error-msg\" data-bound-to=\"country\"><\/span>";
		strVar += "                <\/div>";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-dropdown\">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">Year of Birth<\/span>";
		strVar += "                  <\/label> <select tabindex=\"5\" name=\"birthYear\" data-display-name=\"\" style=\"width: 152px; \"><option value=\"1920\">1920<\/option><option value=\"1921\">1921<\/option><option value=\"1922\">1922<\/option><option value=\"1923\">1923<\/option><option value=\"1924\">1924<\/option><option value=\"1925\">1925<\/option><option value=\"1926\">1926<\/option><option value=\"1927\">1927<\/option><option value=\"1928\">1928<\/option><option value=\"1929\">1929<\/option><option value=\"1930\">1930<\/option><option value=\"1931\">1931<\/option><option value=\"1932\">1932<\/option><option value=\"1933\">1933<\/option><option value=\"1934\">1934<\/option><option value=\"1935\">1935<\/option><option value=\"1936\">1936<\/option><option value=\"1937\">1937<\/option><option value=\"1938\">1938<\/option><option value=\"1939\">1939<\/option><option value=\"1940\">1940<\/option><option value=\"1941\">1941<\/option><option value=\"1942\">1942<\/option><option value=\"1943\">1943<\/option><option value=\"1944\">1944<\/option><option value=\"1945\">1945<\/option><option value=\"1946\">1946<\/option><option value=\"1947\">1947<\/option><option value=\"1948\">1948<\/option><option value=\"1949\">1949<\/option><option value=\"1950\">1950<\/option><option value=\"1951\">1951<\/option><option value=\"1952\">1952<\/option><option value=\"1953\">1953<\/option><option value=\"1954\">1954<\/option><option value=\"1955\">1955<\/option><option value=\"1956\">1956<\/option><option value=\"1957\">1957<\/option><option value=\"1958\">1958<\/option><option value=\"1959\">1959<\/option><option value=\"1960\">1960<\/option><option value=\"1961\">1961<\/option><option value=\"1962\">1962<\/option><option value=\"1963\">1963<\/option><option value=\"1964\">1964<\/option><option value=\"1965\">1965<\/option><option value=\"1966\">1966<\/option><option value=\"1967\">1967<\/option><option value=\"1968\">1968<\/option><option value=\"1969\">1969<\/option><option value=\"1970\">1970<\/option><option value=\"1971\">1971<\/option><option value=\"1972\">1972<\/option><option value=\"1973\">1973<\/option><option value=\"1974\">1974<\/option><option value=\"1975\">1975<\/option><option value=\"1976\">1976<\/option><option value=\"1977\">1977<\/option><option value=\"1978\">1978<\/option><option value=\"1979\">1979<\/option><option value=\"1980\">1980<\/option><option value=\"1981\">1981<\/option><option value=\"1982\">1982<\/option><option value=\"1983\">1983<\/option><option value=\"1984\">1984<\/option><option value=\"1985\">1985<\/option><option value=\"1986\">1986<\/option><option value=\"1987\">1987<\/option><option value=\"1988\">1988<\/option><option value=\"1989\">1989<\/option><option value=\"1990\">1990<\/option><option value=\"1991\">1991<\/option><option value=\"1992\">1992<\/option><option value=\"1993\">1993<\/option><option value=\"1994\">1994<\/option><option value=\"1995\">1995<\/option><option value=\"1996\">1996<\/option><option value=\"1997\">1997<\/option><option value=\"1998\">1998<\/option><option value=\"1999\">1999<\/option><option value=\"2000\">2000<\/option><option value=\"2001\">2001<\/option><option value=\"2002\">2002<\/option><option value=\"2003\">2003<\/option><option value=\"2004\">2004<\/option><\/select> ";
		strVar += "                  <span";
		strVar += "                  class=\"gigya-error-msg\" data-bound-to=\"birthYear\"><\/span>";
		strVar += "                <\/div>";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-layout-cell\">";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">Last name:<\/span>";
		strVar += "                  <\/label>";
		strVar += "                  <input class=\"gigya-input-text\" name=\"lastName\" data-display-name=\"\" tabindex=\"2\"";
		strVar += "                  type=\"text\">";
		strVar += "                  <span class=\"gigya-error-msg\" data-bound-to=\"lastName\"><\/span>";
		strVar += "                <\/div>";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">Zip:<\/span>";
		strVar += "                  <\/label>";
		strVar += "                  <input class=\"gigya-input-text\" tabindex=\"4\" name=\"zip\" style=\"width: 152px; \"";
		strVar += "                  data-display-name=\"\" type=\"text\">";
		strVar += "                  <span class=\"gigya-error-msg\" data-bound-to=\"zip\"><\/span>";
		strVar += "                <\/div>";
		strVar += "                <div class=\"gigya-composite-control gigya-composite-control-dropdown\" style=\"display: block; \">";
		strVar += "                  <label class=\"gigya-label\">";
		strVar += "                    <span class=\"gigya-label-text\">Gender:<\/span>";
		strVar += "                    <span class=\"gigya-required\">*<\/span>";
		strVar += "                  <\/label> <select tabindex=\"6\" name=\"gender\" data-display-name=\"\" style=\"width: 152px; \"><option value=\"Male\">Male<\/option><option value=\"Female\">Female<\/option><\/select> ";
		strVar += "                  <span";
		strVar += "                  class=\"gigya-error-msg\" data-bound-to=\"gender\"><\/span>";
		strVar += "                <\/div>";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-clear\"><\/div>";
		strVar += "              <div class=\"gigya-clear\"><\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-row\">";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "                <label class=\"gigya-label\">";
		strVar += "                  <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "                <\/label>";
		strVar += "                <input class=\"gigya-input-text\" name=\"email\" data-display-name=\"\" tabindex=\"7\"";
		strVar += "                type=\"text\">";
		strVar += "                <span class=\"gigya-error-msg\" data-bound-to=\"email\"><\/span>";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "                <label class=\"gigya-label\">";
		strVar += "                  <span class=\"gigya-label-text\">Password:<\/span>";
		strVar += "                <\/label>";
		strVar += "                <input name=\"password\" class=\"gigya-input-password\" data-display-name=\"\" tabindex=\"8\"";
		strVar += "                type=\"password\">";
		strVar += "                <span class=\"gigya-error-msg\" data-bound-to=\"password\"><\/span>";
		strVar += "                <div class=\"gigya-password-strength\" data-bound-to=\"password\" data-on-focus-bubble=\"true\"><\/div>";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "                <label for=\"password\" class=\"gigya-label\">";
		strVar += "                  <span class=\"gigya-label-text\">Re-enter Password:<\/span>";
		strVar += "                <\/label>";
		strVar += "                <input class=\"gigya-input-password\" name=\"passwordRetype\" tabindex=\"9\" data-display-name=\"\"";
		strVar += "                type=\"password\">";
		strVar += "                <span class=\"gigya-error-msg\" data-bound-to=\"passwordRetype\"><\/span>";
		strVar += "              <\/div>";
		strVar += "              <div style=\"display: block; \" class=\"gigya-captcha gigya-composite-control gigya-composite-control-captcha-widget\">";
		strVar += "                <param name=\"theme\" value=\"white\">";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-checkbox\" style=\"display: block; \">";
		strVar += "                <input name=\"data.terms\" class=\"gigya-input-checkbox\" data-display-name=\"\" tabindex=\"NaN\"";
		strVar += "                type=\"checkbox\">";
		strVar += "                <label class=\"gigya-label\">";
		strVar += "                  <span class=\"gigya-label-text\">I have read and understood the <a href=\"#\">Terms of Use<\/a> ";
		strVar += "                  <\/span>";
		strVar += "                <\/label>";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-composite-control gigya-spacer\" data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "          <input class=\"gigya-input-submit\" value=\"Submit\" tabindex=\"10\" type=\"submit\">";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-spacer\" data-units=\"2\" style=\"height: 20px; \"><\/div>";
		strVar += "        <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"text-align: right; \">Have an account already? <a data-switch-screen=\"gigya-login-screen\">Click here<\/a> ";
		strVar += "        <\/label>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/form>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-screen\" id=\"gigya-complete-registiration-screen\" data-caption=\"Complete your registration\"";
		strVar += "  style=\"width: 350px; \" data-width=\"350\">";
		strVar += "    <form class=\"gigya-profile-form\">";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <h2 class=\"gigya-composite-control gigya-composite-control-header\">Your almost done!<\/h2>";
		strVar += "        <label class=\"gigya-composite-control gigya-composite-control-label\"";
		strVar += "        style=\"display: block; \">NBC will never share your personal information with any third party without your";
		strVar += "          consent.<\/label>";
		strVar += "        <div class=\"gigya-composite-control gigya-spacer\" data-units=\"1\"";
		strVar += "        style=\"height: 10px; \"><\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "          <label class=\"gigya-label\">";
		strVar += "            <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "          <\/label>";
		strVar += "          <input value=\"\" name=\"email\" class=\"gigya-input-text\" tabindex=\"1\">";
		strVar += "          <span class=\"gigya-error-msg\" data-bound-to=\"email\"><\/span>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Postcode:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input value=\"\" name=\"zip\" class=\"gigya-input-text\" tabindex=\"2\" type=\"text\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"zip\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "          data-bound-to=\"gigya-complete-registiration-form\" style=\"display: block; \">";
		strVar += "            <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-complete-registiration-screen\"";
		strVar += "            style=\"\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-dropdown\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Year of birth:<\/span>";
		strVar += "            <\/label> <select name=\"birthYear\" tabindex=\"3\"><option value=\"1920\">1920<\/option><option value=\"1921\">1921<\/option><option value=\"1922\">1922<\/option><option value=\"1923\">1923<\/option><option value=\"1924\">1924<\/option><option value=\"1925\">1925<\/option><option value=\"1926\">1926<\/option><option value=\"1927\">1927<\/option><option value=\"1928\">1928<\/option><option value=\"1929\">1929<\/option><option value=\"1930\">1930<\/option><option value=\"1931\">1931<\/option><option value=\"1932\">1932<\/option><option value=\"1933\">1933<\/option><option value=\"1934\">1934<\/option><option value=\"1935\">1935<\/option><option value=\"1936\">1936<\/option><option value=\"1937\">1937<\/option><option value=\"1938\">1938<\/option><option value=\"1939\">1939<\/option><option value=\"1940\">1940<\/option><option value=\"1941\">1941<\/option><option value=\"1942\">1942<\/option><option value=\"1943\">1943<\/option><option value=\"1944\">1944<\/option><option value=\"1945\">1945<\/option><option value=\"1946\">1946<\/option><option value=\"1947\">1947<\/option><option value=\"1948\">1948<\/option><option value=\"1949\">1949<\/option><option value=\"1950\">1950<\/option><option value=\"1951\">1951<\/option><option value=\"1952\">1952<\/option><option value=\"1953\">1953<\/option><option value=\"1954\">1954<\/option><option value=\"1955\">1955<\/option><option value=\"1956\">1956<\/option><option value=\"1957\">1957<\/option><option value=\"1958\">1958<\/option><option value=\"1959\">1959<\/option><option value=\"1960\">1960<\/option><option value=\"1961\">1961<\/option><option value=\"1962\">1962<\/option><option value=\"1963\">1963<\/option><option value=\"1964\">1964<\/option><option value=\"1965\">1965<\/option><option value=\"1966\">1966<\/option><option value=\"1967\">1967<\/option><option value=\"1968\">1968<\/option><option value=\"1969\">1969<\/option><option value=\"1970\">1970<\/option><option value=\"1971\">1971<\/option><option value=\"1972\">1972<\/option><option value=\"1973\">1973<\/option><option value=\"1974\">1974<\/option><option value=\"1975\">1975<\/option><option value=\"1976\">1976<\/option><option value=\"1977\">1977<\/option><option value=\"1978\">1978<\/option><option value=\"1979\">1979<\/option><option value=\"1980\">1980<\/option><option value=\"1981\">1981<\/option><option value=\"1982\">1982<\/option><option value=\"1983\">1983<\/option><option value=\"1984\">1984<\/option><option value=\"1985\">1985<\/option><option value=\"1986\">1986<\/option><option value=\"1987\">1987<\/option><option value=\"1988\">1988<\/option><option value=\"1989\">1989<\/option><option value=\"1990\">1990<\/option><option value=\"1991\">1991<\/option><option value=\"1992\">1992<\/option><option value=\"1993\">1993<\/option><option value=\"1994\">1994<\/option><option value=\"1995\">1995<\/option><option value=\"1996\">1996<\/option><option value=\"1997\">1997<\/option><option value=\"1998\">1998<\/option><option value=\"1999\">1999<\/option><option value=\"2000\">2000<\/option><option value=\"2001\">2001<\/option><option value=\"2002\">2002<\/option><option value=\"2003\">2003<\/option><option value=\"2004\">2004<\/option><\/select> ";
		strVar += "            <span";
		strVar += "            class=\"gigya-error-msg\" data-bound-to=\"birthYear\"><\/span>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "                <input class=\"gigya-input-submit\" value=\"Submit\" type=\"submit\" tabindex=\"4\">";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/form>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-screen\" id=\"gigya-link-account-screen\" data-caption=\"Already a member\"";
		strVar += "  style=\"width: 400px; \" data-width=\"400\">";
		strVar += "    <form class=\"gigya-link-accounts-form\">";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <h2 class=\"gigya-composite-control gigya-composite-control-header\">We found your email in our system.<\/h2>";
		strVar += "        <label class=\"gigya-composite-control gigya-composite-control-label\"";
		strVar += "        style=\"display: block; \">Please provide your site password to link to your existing account:<\/label>";
		strVar += "        <div";
		strVar += "        class=\"gigya-composite-control gigya-spacer\" data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "      <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "        <label class=\"gigya-label\">";
		strVar += "          <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "        <\/label>";
		strVar += "        <input name=\"loginID\" class=\"gigya-input-text\" type=\"text\" tabindex=\"1\">";
		strVar += "        <span class=\"gigya-error-msg\" data-bound-to=\"loginID\"><\/span>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "        <label class=\"gigya-label\">";
		strVar += "          <span class=\"gigya-label-text\">Password: <a style=\"float: right; font-weight: normal; margin-right: 5px;\" data-switch-screen=\"gigya-forgot-password-screen\">Forgot password<\/a>";
		strVar += "          <\/span>";
		strVar += "        <\/label>";
		strVar += "        <input name=\"password\" class=\"gigya-input-password\" type=\"password\" tabindex=\"2\">";
		strVar += "        <span class=\"gigya-error-msg\" data-bound-to=\"password\"><\/span>";
		strVar += "      <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-row\">";
		strVar += "    <div class=\"gigya-layout-cell\">";
		strVar += "      <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "      data-bound-to=\"gigya-link-account-form\" style=\"display: block; \">";
		strVar += "        <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-link-account-form\"";
		strVar += "        style=\"\"><\/div>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-cell\">";
		strVar += "      <div class=\"gigya-composite-control gigya-spacer\" data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "      <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "        <input class=\"gigya-input-submit\" value=\"Submit\" type=\"submit\" tabindex=\"3\">";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-row \">";
		strVar += "    <div class=\"gigya-layout-cell \">";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-cell \">";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-row\"><\/div>";
		strVar += "  <div class=\"gigya-layout-row \">";
		strVar += "    <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "    <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-row \">";
		strVar += "    <div class=\"gigya-layout-cell \">";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-cell \">";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-row\"><\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/form>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-screen\" id=\"gigya-forgot-password-screen\" data-caption=\"Forgot password\"";
		strVar += "style=\"width: 350px; \" data-width=\"350\">";
		strVar += "  <form class=\"gigya-reset-password-form\" data-on-success-screen=\"gigya-forgot-paxssword-success-screen\">";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"display: block; \">Please enter your email address to reset your password:<\/label>";
		strVar += "      <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "      data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "      <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "        <label class=\"gigya-label\">";
		strVar += "          <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "        <\/label>";
		strVar += "        <input name=\"loginID\" class=\"gigya-input-text\" tabindex=\"0\" type=\"text\">";
		strVar += "        <span class=\"gigya-error-msg\" data-bound-to=\"loginID\"><\/span>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <div class=\"gigya-layout-cell\">";
		strVar += "        <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "        data-bound-to=\"gigya-reset-password-form\" style=\"display: block; \">";
		strVar += "          <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-reset-password-form\"";
		strVar += "          style=\"\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell\">";
		strVar += "        <div class=\"gigya-composite-control gigya-spacer\" data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "          <input class=\"gigya-input-submit\" value=\"Submit\" tabindex=\"0\" type=\"submit\">";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <div class=\"gigya-composite-control gigya-spacer\" data-units=\"4\" style=\"height: 40px; display: block; \"><\/div>";
		strVar += "      <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"text-align: right; display: block; \">To login with a different account <a data-switch-screen=\"gigya-login-screen\">click here                    <\/a> ";
		strVar += "      <\/label>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\"><\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/form>";
		strVar += "<\/div>";
		strVar += "<div data-width=\"300\" style=\"width: 300px; \" data-caption=\"Password reset\" id=\"gigya-forgot-password-success-screen\"";
		strVar += "class=\"gigya-screen\">";
		strVar += "  <div class=\"gigya-layout-row\">";
		strVar += "    <div style=\"height: 40px; \" data-units=\"4\" class=\"gigya-composite-control gigya-spacer\"><\/div>";
		strVar += "    <label class=\"gigya-composite-control gigya-composite-control-label gigya-message\">An email regarding your password change has been sent to your email address.<\/label>";
		strVar += "    <div";
		strVar += "    class=\"gigya-composite-control gigya-spacer\" data-units=\"5\" style=\"height: 50px; \"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\">";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\"><\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\"><\/div>";
		strVar += "<div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-screen\" id=\"gigya-email-verification-screen\" data-caption=\"Your email was not verified\"";
		strVar += "style=\"width: 350px; \" data-width=\"350\">";
		strVar += "  <form class=\"gigya-resend-verification-code-form\" data-on-success-screen=\"gigya-thank-you-screen\">";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"display: block; \">Please enter your email address and check your inbox<\/label>";
		strVar += "      <div class=\"gigya-composite-control gigya-spacer\"";
		strVar += "      data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "      <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "        <label class=\"gigya-label\">";
		strVar += "          <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "          <span class=\"gigya-required\"><\/span>";
		strVar += "        <\/label>";
		strVar += "        <input name=\"loginID\" class=\"gigya-input-text\" tabindex=\"0\" type=\"text\">";
		strVar += "        <span class=\"gigya-error-msg\" data-bound-to=\"loginID\"><\/span>";
		strVar += "      <\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <div class=\"gigya-layout-cell\">";
		strVar += "        <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "        data-bound-to=\"gigya-resend-verification-code-form\" style=\"display: block; \">";
		strVar += "          <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-resend-verification-code-form\"";
		strVar += "          style=\"\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell\">";
		strVar += "        <div class=\"gigya-composite-control gigya-spacer\" data-units=\"1\" style=\"height: 10px; \"><\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "          <input class=\"gigya-input-submit\" value=\"Submit\" type=\"submit\">";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\">";
		strVar += "      <div class=\"gigya-composite-control gigya-spacer\" data-units=\"4\" style=\"height: 40px; display: block; \"><\/div>";
		strVar += "      <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"text-align: right; display: block; \">To login with a different account <a data-switch-screen=\"gigya-login-screen\">click here                    <\/a> ";
		strVar += "      <\/label>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-cell \">";
		strVar += "        <div class=\"gigya-layout-row \">";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "          <div class=\"gigya-clear\"><\/div>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "    <div class=\"gigya-layout-row\"><\/div>";
		strVar += "    <div class=\"gigya-clear\"><\/div>";
		strVar += "  <\/form>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-screen\" id=\"gigya-thank-you-screen\" data-caption=\"Thank You for registering!\"";
		strVar += "style=\"width: 300px; \" data-width=\"300\">";
		strVar += "  <div class=\"gigya-layout-row\">";
		strVar += "    <div class=\"gigya-composite-control gigya-spacer\" data-units=\"4\" style=\"height: 40px; display: block; \"><\/div>";
		strVar += "    <label class=\"gigya-composite-control gigya-composite-control-label gigya-message\">A confirmation email has been sent to you with a link to activate the account.<\/label>";
		strVar += "    <div";
		strVar += "    class=\"gigya-composite-control gigya-spacer\" data-units=\"5\" style=\"height: 50px; display: block; \"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\">";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\"><\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row \">";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-layout-cell \">";
		strVar += "    <div class=\"gigya-layout-row \">";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/div>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<div class=\"gigya-layout-row\"><\/div>";
		strVar += "<div class=\"gigya-clear\"><\/div>";
		strVar += "<\/div>";
		strVar += "<\/div>";
		// Keep these comments
		strVar += "<!-- END LOGIN SCREENSET -->";
		
		document.body.innerHTML = strVar + document.body.innerHTML + screensWroteStatusDiv;
	} 
}

// SCREENSETS
// You can do export of the UI Builder code and then go to:
// http://www.accessify.com/tools-and-wizards/developer-tools/html-javascript-convertor/
// To convert it to the strVar format you see below
function writeProfileScreensToBody(){
return;
	var profileScreensExist = document.getElementById("profileScreensWrote");
	// Only write screenset once per page load
	if (profileScreensExist == null)
	{
		// Don't change this as it will be written out with the screenset
		// Which allows us to make sure we only write out screens once
		var screensWroteStatusDiv = "<div id='profileScreensWrote'></div>";
		
		// Start of screenset exported code
		var strVar="";
		// Keep these comments		
		strVar += "<!-- START PROFILE SCREENSET -->";
		
		strVar += "<div class=\"gigya-screen-set\" id=\"profile-web-nbcv1\" style=\"\" data-on-existing-login-identifier-screen=\"gigya-link-account-screen\"";
		strVar += "data-on-pending-registration-screen=\"gigya-complete-registiration-screen\" data-on-pending-verification-screen=\"gigya-email-verification-screen\"";
		strVar += "data-width=\"760\">";
		strVar += "  <div class=\"gigya-screen\" id=\"gigya-update-profile-screen\" data-caption=\"Edit Your Profile Details\"";
		strVar += "  style=\"width: 700px; \" data-width=\"700\">";
		strVar += "    <form class=\"gigya-profile-form\" data-on-success-screen=\"_finish\">";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Email:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input type=\"text\" name=\"email\" class=\"gigya-input-text\" tabindex=\"1\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"email\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">First name:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input type=\"text\" name=\"firstName\" class=\"gigya-input-text\" tabindex=\"2\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"firstName\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Last name:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input type=\"text\" name=\"lastName\" class=\"gigya-input-text\" tabindex=\"3\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"lastName\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-dropdown\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Country:<\/span>";
		strVar += "            <\/label> <select name=\"country\" tabindex=\"0\"> <option value=\"Afghanistan\">Afghanistan<\/option> <option value=\"Albania\">Albania<\/option> <option value=\"Algeria\">Algeria<\/option> <option value=\"American Samoa\">American Samoa<\/option> <option value=\"Andorra\">Andorra<\/option> <option value=\"Angola\">Angola<\/option> <option value=\"Anguilla\">Anguilla<\/option> <option value=\"Antarctica\">Antarctica<\/option> <option value=\"Antigua and Barbuda\">Antigua and Barbuda<\/option> <option value=\"Argentina\">Argentina<\/option> <option value=\"Armenia\">Armenia<\/option> <option value=\"Armenia\">Armenia<\/option> <option value=\"Aruba\">Aruba<\/option> <option value=\"Australia\">Australia<\/option> <option value=\"Austria\">Austria<\/option> <option value=\"Azerbaijan\">Azerbaijan<\/option> <option value=\"Azerbaijan\">Azerbaijan<\/option> <option value=\"Bahamas\">Bahamas<\/option> <option value=\"Bahrain\">Bahrain<\/option> <option value=\"Bangladesh\">Bangladesh<\/option> <option value=\"Barbados\">Barbados<\/option> <option value=\"Belarus\">Belarus<\/option> <option value=\"Belgium\">Belgium<\/option> <option value=\"Belize\">Belize<\/option> <option value=\"Benin\">Benin<\/option> <option value=\"Bermuda\">Bermuda<\/option> <option value=\"Bhutan\">Bhutan<\/option> <option value=\"Bolivia\">Bolivia<\/option> <option value=\"Bosnia and Herzegovina\">Bosnia and Herzegovina<\/option> <option value=\"Botswana\">Botswana<\/option> <option value=\"Bouvet Island\">Bouvet Island<\/option> <option value=\"Brazil\">Brazil<\/option> <option value=\"British Indian Ocean Territory\">British Indian Ocean Territory<\/option> <option value=\"Brunei Darussalam\">Brunei Darussalam<\/option> <option value=\"Bulgaria\">Bulgaria<\/option> <option value=\"Burkina Faso\">Burkina Faso<\/option> <option value=\"Burundi\">Burundi<\/option> <option value=\"Cambodia\">Cambodia<\/option> <option value=\"Cameroon\">Cameroon<\/option> <option value=\"Canada\">Canada<\/option> <option value=\"Cape Verde\">Cape Verde<\/option> <option value=\"Cayman Islands\">Cayman Islands<\/option> <option value=\"Central African Republic\">Central African Republic<\/option> <option value=\"Chad\">Chad<\/option> <option value=\"Chile\">Chile<\/option> <option value=\"China\">China<\/option> <option value=\"Christmas Island\">Christmas Island<\/option> <option value=\"Cocos (Keeling) Islands\">Cocos (Keeling) Islands<\/option> <option value=\"Colombia\">Colombia<\/option> <option value=\"Comoros\">Comoros<\/option> <option value=\"Congo\">Congo<\/option> <option value=\"Congo, The Democratic Republic of The\">Congo, The Democratic Republic of The<\/option> <option value=\"Cook Islands\">Cook Islands<\/option> <option value=\"Costa Rica\">Costa Rica<\/option> <option value=\"Cote Divoire\">Cote Divoire<\/option> <option value=\"Croatia\">Croatia<\/option> <option value=\"Cuba\">Cuba<\/option> <option value=\"Cyprus\">Cyprus<\/option> <option value=\"Cyprus\">Cyprus<\/option> <option value=\"Czech Republic\">Czech Republic<\/option> <option value=\"Denmark\">Denmark<\/option> <option value=\"Djibouti\">Djibouti<\/option> <option value=\"Dominica\">Dominica<\/option> <option value=\"Dominican Republic\">Dominican Republic<\/option> <option value=\"Easter Island\">Easter Island<\/option> <option value=\"Ecuador\">Ecuador<\/option> <option value=\"Egypt\">Egypt<\/option> <option value=\"El Salvador\">El Salvador<\/option> <option value=\"Equatorial Guinea\">Equatorial Guinea<\/option> <option value=\"Eritrea\">Eritrea<\/option> <option value=\"Estonia\">Estonia<\/option> <option value=\"Ethiopia\">Ethiopia<\/option> <option value=\"Falkland Islands (Malvinas)\">Falkland Islands (Malvinas)<\/option> <option value=\"Faroe Islands\">Faroe Islands<\/option> <option value=\"Fiji\">Fiji<\/option> <option value=\"Finland\">Finland<\/option> <option value=\"France\">France<\/option> <option value=\"French Guiana\">French Guiana<\/option> <option value=\"French Polynesia\">French Polynesia<\/option> <option value=\"French Southern Territories\">French Southern Territories<\/option> <option value=\"Gabon\">Gabon<\/option> <option value=\"Gambia\">Gambia<\/option> <option value=\"Georgia\">Georgia<\/option> <option value=\"Georgia\">Georgia<\/option> <option value=\"Germany\">Germany<\/option> <option value=\"Ghana\">Ghana<\/option> <option value=\"Gibraltar\">Gibraltar<\/option> <option value=\"Greece\">Greece<\/option> <option value=\"Greenland\">Greenland<\/option> <option value=\"Greenland\">Greenland<\/option> <option value=\"Grenada\">Grenada<\/option> <option value=\"Guadeloupe\">Guadeloupe<\/option> <option value=\"Guam\">Guam<\/option> <option value=\"Guatemala\">Guatemala<\/option> <option value=\"Guinea\">Guinea<\/option> <option value=\"Guinea-bissau\">Guinea-bissau<\/option> <option value=\"Guyana\">Guyana<\/option> <option value=\"Haiti\">Haiti<\/option> <option value=\"Heard Island and Mcdonald Islands\">Heard Island and Mcdonald Islands<\/option> <option value=\"Honduras\">Honduras<\/option> <option value=\"Hong Kong\">Hong Kong<\/option> <option value=\"Hungary\">Hungary<\/option> <option value=\"Iceland\">Iceland<\/option> <option value=\"India\">India<\/option> <option value=\"Indonesia\">Indonesia<\/option> <option value=\"Indonesia\">Indonesia<\/option> <option value=\"Iran\">Iran<\/option> <option value=\"Iraq\">Iraq<\/option> <option value=\"Ireland\">Ireland<\/option> <option value=\"Israel\">Israel<\/option> <option value=\"Italy\">Italy<\/option> <option value=\"Jamaica\">Jamaica<\/option> <option value=\"Japan\">Japan<\/option> <option value=\"Jordan\">Jordan<\/option> <option value=\"Kazakhstan\">Kazakhstan<\/option> <option value=\"Kazakhstan\">Kazakhstan<\/option> <option value=\"Kenya\">Kenya<\/option> <option value=\"Kiribati\">Kiribati<\/option> <option value=\"Korea, North\">Korea, North<\/option> <option value=\"Korea, South\">Korea, South<\/option> <option value=\"Kosovo\">Kosovo<\/option> <option value=\"Kuwait\">Kuwait<\/option> <option value=\"Kyrgyzstan\">Kyrgyzstan<\/option> <option value=\"Laos\">Laos<\/option> <option value=\"Latvia\">Latvia<\/option> <option value=\"Lebanon\">Lebanon<\/option> <option value=\"Lesotho\">Lesotho<\/option> <option value=\"Liberia\">Liberia<\/option> <option value=\"Libyan Arab Jamahiriya\">Libyan Arab Jamahiriya<\/option> <option value=\"Liechtenstein\">Liechtenstein<\/option> <option value=\"Lithuania\">Lithuania<\/option> <option value=\"Luxembourg\">Luxembourg<\/option> <option value=\"Macau\">Macau<\/option> <option value=\"Macedonia\">Macedonia<\/option> <option value=\"Madagascar\">Madagascar<\/option> <option value=\"Malawi\">Malawi<\/option> <option value=\"Malaysia\">Malaysia<\/option> <option value=\"Maldives\">Maldives<\/option> <option value=\"Mali\">Mali<\/option> <option value=\"Malta\">Malta<\/option> <option value=\"Marshall Islands\">Marshall Islands<\/option> <option value=\"Martinique\">Martinique<\/option> <option value=\"Mauritania\">Mauritania<\/option> <option value=\"Mauritius\">Mauritius<\/option> <option value=\"Mayotte\">Mayotte<\/option> <option value=\"Mexico\">Mexico<\/option> <option value=\"Micronesia, Federated States of\">Micronesia, Federated States of<\/option> <option value=\"Moldova, Republic of\">Moldova, Republic of<\/option> <option value=\"Monaco\">Monaco<\/option> <option value=\"Mongolia\">Mongolia<\/option> <option value=\"Montenegro\">Montenegro<\/option> <option value=\"Montserrat\">Montserrat<\/option> <option value=\"Morocco\">Morocco<\/option> <option value=\"Mozambique\">Mozambique<\/option> <option value=\"Myanmar\">Myanmar<\/option> <option value=\"Namibia\">Namibia<\/option> <option value=\"Nauru\">Nauru<\/option> <option value=\"Nepal\">Nepal<\/option> <option value=\"Netherlands\">Netherlands<\/option> <option value=\"Netherlands Antilles\">Netherlands Antilles<\/option> <option value=\"New Caledonia\">New Caledonia<\/option> <option value=\"New Zealand\">New Zealand<\/option> <option value=\"Nicaragua\">Nicaragua<\/option> <option value=\"Niger\">Niger<\/option> <option value=\"Nigeria\">Nigeria<\/option> <option value=\"Niue\">Niue<\/option> <option value=\"Norfolk Island\">Norfolk Island<\/option> <option value=\"Northern Mariana Islands\">Northern Mariana Islands<\/option> <option value=\"Norway\">Norway<\/option> <option value=\"Oman\">Oman<\/option> <option value=\"Pakistan\">Pakistan<\/option> <option value=\"Palau\">Palau<\/option> <option value=\"Palestinian Territory\">Palestinian Territory<\/option> <option value=\"Panama\">Panama<\/option> <option value=\"Papua New Guinea\">Papua New Guinea<\/option> <option value=\"Paraguay\">Paraguay<\/option> <option value=\"Peru\">Peru<\/option> <option value=\"Philippines\">Philippines<\/option> <option value=\"Pitcairn\">Pitcairn<\/option> <option value=\"Poland\">Poland<\/option> <option value=\"Portugal\">Portugal<\/option> <option value=\"Puerto Rico\">Puerto Rico<\/option> <option value=\"Qatar\">Qatar<\/option> <option value=\"Reunion\">Reunion<\/option> <option value=\"Romania\">Romania<\/option> <option value=\"Russia\">Russia<\/option> <option value=\"Russia\">Russia<\/option> <option value=\"Rwanda\">Rwanda<\/option> <option value=\"Saint Helena\">Saint Helena<\/option> <option value=\"Saint Kitts and Nevis\">Saint Kitts and Nevis<\/option> <option value=\"Saint Lucia\">Saint Lucia<\/option> <option value=\"Saint Pierre and Miquelon\">Saint Pierre and Miquelon<\/option> <option value=\"Saint Vincent and The Grenadines\">Saint Vincent and The Grenadines<\/option> <option value=\"Samoa\">Samoa<\/option> <option value=\"San Marino\">San Marino<\/option> <option value=\"Sao Tome and Principe\">Sao Tome and Principe<\/option> <option value=\"Saudi Arabia\">Saudi Arabia<\/option> <option value=\"Senegal\">Senegal<\/option> <option value=\"Serbia and Montenegro\">Serbia and Montenegro<\/option> <option value=\"Seychelles\">Seychelles<\/option> <option value=\"Sierra Leone\">Sierra Leone<\/option> <option value=\"Singapore\">Singapore<\/option> <option value=\"Slovakia\">Slovakia<\/option> <option value=\"Slovenia\">Slovenia<\/option> <option value=\"Solomon Islands\">Solomon Islands<\/option> <option value=\"Somalia\">Somalia<\/option> <option value=\"South Africa\">South Africa<\/option> <option value=\"South Georgia and The South Sandwich Islands\">South Georgia and The South Sandwich Islands<\/option> <option value=\"Spain\">Spain<\/option> <option value=\"Sri Lanka\">Sri Lanka<\/option> <option value=\"Sudan\">Sudan<\/option> <option value=\"Suriname\">Suriname<\/option> <option value=\"Svalbard and Jan Mayen\">Svalbard and Jan Mayen<\/option> <option value=\"Swaziland\">Swaziland<\/option> <option value=\"Sweden\">Sweden<\/option> <option value=\"Switzerland\">Switzerland<\/option> <option value=\"Syria\">Syria<\/option> <option value=\"Taiwan\">Taiwan<\/option> <option value=\"Tajikistan\">Tajikistan<\/option> <option value=\"Tanzania, United Republic of\">Tanzania, United Republic of<\/option> <option value=\"Thailand\">Thailand<\/option> <option value=\"Timor-leste\">Timor-leste<\/option> <option value=\"Togo\">Togo<\/option> <option value=\"Tokelau\">Tokelau<\/option> <option value=\"Tonga\">Tonga<\/option> <option value=\"Trinidad and Tobago\">Trinidad and Tobago<\/option> <option value=\"Tunisia\">Tunisia<\/option> <option value=\"Turkey\">Turkey<\/option> <option value=\"Turkey\">Turkey<\/option> <option value=\"Turkmenistan\">Turkmenistan<\/option> <option value=\"Turks and Caicos Islands\">Turks and Caicos Islands<\/option> <option value=\"Tuvalu\">Tuvalu<\/option> <option value=\"Uganda\">Uganda<\/option> <option value=\"Ukraine\">Ukraine<\/option> <option value=\"United Arab Emirates\">United Arab Emirates<\/option> <option value=\"United Kingdom\">United Kingdom<\/option> <option value=\"United States\">United States<\/option> <option value=\"United States Minor Outlying Islands\">United States Minor Outlying Islands<\/option> <option value=\"Uruguay\">Uruguay<\/option> <option value=\"Uzbekistan\">Uzbekistan<\/option> <option value=\"Vanuatu\">Vanuatu<\/option> <option value=\"Vatican City\">Vatican City<\/option> <option value=\"Venezuela\">Venezuela<\/option> <option value=\"Vietnam\">Vietnam<\/option> <option value=\"Virgin Islands, British\">Virgin Islands, British<\/option> <option value=\"Virgin Islands, U.S.\">Virgin Islands, U.S.<\/option> <option value=\"Wallis and Futuna\">Wallis and Futuna<\/option> <option value=\"Western Sahara\">Western Sahara<\/option> <option value=\"Yemen\">Yemen<\/option> <option value=\"Yemen\">Yemen<\/option> <option value=\"Zambia\">Zambia<\/option> <option value=\"Zimbabwe\">Zimbabwe<\/option> <\/select> ";
		strVar += "            <span";
		strVar += "            class=\"gigya-error-msg\" data-bound-to=\"country\"><\/span>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Zip code:<\/span>";
		strVar += "            <\/label>";
		strVar += "            <input type=\"text\" name=\"zip\" class=\"gigya-input-text\" tabindex=\"0\">";
		strVar += "            <span class=\"gigya-error-msg\" data-bound-to=\"zip\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-textbox\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Year of birth:<\/span>";
		strVar += "            <\/label> <select name=\"birthYear\" tabindex=\"0\"> <option value=\"1920\">1920<\/option> <option value=\"1921\">1921<\/option> <option value=\"1922\">1922<\/option> <option value=\"1923\">1923<\/option> <option value=\"1924\">1924<\/option> <option value=\"1925\">1925<\/option> <option value=\"1926\">1926<\/option> <option value=\"1927\">1927<\/option> <option value=\"1928\">1928<\/option> <option value=\"1929\">1929<\/option> <option value=\"1930\">1930<\/option> <option value=\"1931\">1931<\/option> <option value=\"1932\">1932<\/option> <option value=\"1933\">1933<\/option> <option value=\"1934\">1934<\/option> <option value=\"1935\">1935<\/option> <option value=\"1936\">1936<\/option> <option value=\"1937\">1937<\/option> <option value=\"1938\">1938<\/option> <option value=\"1939\">1939<\/option> <option value=\"1940\">1940<\/option> <option value=\"1941\">1941<\/option> <option value=\"1942\">1942<\/option> <option value=\"1943\">1943<\/option> <option value=\"1944\">1944<\/option> <option value=\"1945\">1945<\/option> <option value=\"1946\">1946<\/option> <option value=\"1947\">1947<\/option> <option value=\"1948\">1948<\/option> <option value=\"1949\">1949<\/option> <option value=\"1950\">1950<\/option> <option value=\"1951\">1951<\/option> <option value=\"1952\">1952<\/option> <option value=\"1953\">1953<\/option> <option value=\"1954\">1954<\/option> <option value=\"1955\">1955<\/option> <option value=\"1956\">1956<\/option> <option value=\"1957\">1957<\/option> <option value=\"1958\">1958<\/option> <option value=\"1959\">1959<\/option> <option value=\"1960\">1960<\/option> <option value=\"1961\">1961<\/option> <option value=\"1962\">1962<\/option> <option value=\"1963\">1963<\/option> <option value=\"1964\">1964<\/option> <option value=\"1965\">1965<\/option> <option value=\"1966\">1966<\/option> <option value=\"1967\">1967<\/option> <option value=\"1968\">1968<\/option> <option value=\"1969\">1969<\/option> <option value=\"1970\">1970<\/option> <option value=\"1971\">1971<\/option> <option value=\"1972\">1972<\/option> <option value=\"1973\">1973<\/option> <option value=\"1974\">1974<\/option> <option value=\"1975\">1975<\/option> <option value=\"1976\">1976<\/option> <option value=\"1977\">1977<\/option> <option value=\"1978\">1978<\/option> <option value=\"1979\">1979<\/option> <option value=\"1980\">1980<\/option> <option value=\"1981\">1981<\/option> <option value=\"1982\">1982<\/option> <option value=\"1983\">1983<\/option> <option value=\"1984\">1984<\/option> <option value=\"1985\">1985<\/option> <option value=\"1986\">1986<\/option> <option value=\"1987\">1987<\/option> <option value=\"1988\">1988<\/option> <option value=\"1989\">1989<\/option> <option value=\"1990\">1990<\/option> <option value=\"1991\">1991<\/option> <option value=\"1992\">1992<\/option> <option value=\"1993\">1993<\/option> <option value=\"1994\">1994<\/option> <option value=\"1995\">1995<\/option> <option value=\"1996\">1996<\/option> <option value=\"1997\">1997<\/option> <option value=\"1998\">1998<\/option> <option value=\"1999\">1999<\/option> <option value=\"2000\">2000<\/option> <option value=\"2001\">2001 <\/option> <option value=\"2002\">2002 <\/option> <option value=\"2003\">2003 <\/option> <option value=\"2004\">2004 <\/option> <\/select> ";
		strVar += "            <span";
		strVar += "            class=\"gigya-error-msg\" data-bound-to=\"birthYear\"><\/span>";
		strVar += "          <\/div>";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-dropdown\" style=\"display: block; \">";
		strVar += "            <label class=\"gigya-label\">";
		strVar += "              <span class=\"gigya-label-text\">Gender:<\/span>";
		strVar += "            <\/label> <select tabindex=\"0\" name=\"gender\" data-display-name=\"\"><option value=\"Male\">Male<\/option><option value=\"Female\">Female<\/option><\/select> ";
		strVar += "            <span";
		strVar += "            class=\"gigya-error-msg\" data-bound-to=\"gender\"><\/span>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "              data-bound-to=\"gigya-profile-form\">";
		strVar += "                <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-profile-form\"";
		strVar += "                style=\"\"><\/div>";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-layout-cell\">";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "                <input type=\"submit\" class=\"gigya-input-submit\" value=\"Update Details\" tabindex=\"0\">";
		strVar += "              <\/div>";
		strVar += "              <div class=\"gigya-composite-control gigya-composite-control-submit\">";
		strVar += "                <input type=\"submit\" class=\"gigya-input-submit\" value=\"Submit\" tabindex=\"0\">";
		strVar += "              <\/div>";
		strVar += "            <\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/form>";
		strVar += "  <\/div>";
		strVar += "  <div class=\"gigya-screen\" id=\"gigya-change-password-screen\" data-caption=\"Change Password\"";
		strVar += "  style=\"width: 350px; \" data-width=\"350\">";
		strVar += "    <form class=\"gigya-profile-form\" data-on-success-screen=\"gigya-update-profile-screen\">";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <label class=\"gigya-composite-control gigya-composite-control-label\" style=\"display: block; \">Please update your password<\/label>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-password\"";
		strVar += "        style=\"display: block; \">";
		strVar += "          <label class=\"gigya-label\">";
		strVar += "            <span class=\"gigya-label-text\">Current:<\/span>";
		strVar += "          <\/label>";
		strVar += "          <input type=\"password\" name=\"oldPassword\" class=\"gigya-input-password\">";
		strVar += "          <span class=\"gigya-error-msg\" data-bound-to=\"oldPassword\"><\/span>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "          <label class=\"gigya-label\">";
		strVar += "            <span class=\"gigya-label-text\">New:<\/span>";
		strVar += "          <\/label>";
		strVar += "          <input type=\"password\" name=\"password\" class=\"gigya-input-password\">";
		strVar += "          <span class=\"gigya-error-msg\" data-bound-to=\"password\"><\/span>";
		strVar += "          <div class=\"gigya-password-strength\" data-bound-to=\"password\" data-on-focus-bubble=\"true\"><\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-composite-control gigya-composite-control-password\" style=\"display: block; \">";
		strVar += "          <label class=\"gigya-label\">";
		strVar += "            <span class=\"gigya-label-text\">Re-enter new:<\/span>";
		strVar += "          <\/label>";
		strVar += "          <input type=\"password\" name=\"passwordRetype\" class=\"gigya-input-password\">";
		strVar += "          <span class=\"gigya-error-msg\" data-bound-to=\"passwordRetype\"><\/span>";
		strVar += "        <\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\">";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-error-display gigya-composite-control gigya-composite-control-form-error\"";
		strVar += "          data-bound-to=\"gigya-profile-form\" style=\"display: block; \">";
		strVar += "            <div class=\"gigya-error-msg gigya-form-error-msg\" data-bound-to=\"gigya-profile-form\"";
		strVar += "            style=\"\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell\">";
		strVar += "          <div class=\"gigya-composite-control gigya-composite-control-submit\" style=\"display: block; \">";
		strVar += "            <input type=\"submit\" class=\"gigya-input-submit\" value=\"Submit\">";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row \">";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-layout-cell \">";
		strVar += "          <div class=\"gigya-layout-row \">";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-layout-cell\"><\/div>";
		strVar += "            <div class=\"gigya-clear\"><\/div>";
		strVar += "          <\/div>";
		strVar += "        <\/div>";
		strVar += "        <div class=\"gigya-clear\"><\/div>";
		strVar += "      <\/div>";
		strVar += "      <div class=\"gigya-layout-row\"><\/div>";
		strVar += "      <div class=\"gigya-clear\"><\/div>";
		strVar += "    <\/form>";
		strVar += "  <\/div>";
		strVar += "<\/div>";

		
		// Keep these comments		
		strVar += "<!-- END PROFILE SCREENSET -->";
		
		document.body.innerHTML = strVar + document.body.innerHTML + screensWroteStatusDiv;
	} 
}
