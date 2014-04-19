// Site Specific Omniture Settings
// Desc: This file is used to store site specific settings
// Note: Please enter the site name on the line below to identify the site.
// Site: The Sacramento Bee
////////////////////////////////////////////////////////////////////////////

// MI Stats Function 
function miStatsObject(){}

// MI Stats Object
var mistats = new miStatsObject();

// Site specific variables
mistats.sitename    = "Sacramento Bee";           // Site Name
mistats.account     = "nmsacramento";             // Report Suite ID
mistats.bizunit     = "SAC";                      // Business Unit
mistats.pubname     = "SB";                       // Publication Code
mistats.regcookie   = "sacbee_user_auth";     	  // Insite Cookie Name
mistats.segcookie   = "segments";                 // Insite Segments Cookie Name
mistats.sitefile    = "sacbee.js";		  // Site File Name

// Third Party
mistats.tacoda      = "11684";                    		// Tacoda ID
mistats.tyntid	    = "user=dqUn_ubiWr36gxadbiUzgI&s=122";	// Tynt ID

// Call custom .js file for sites use (uncomment to use)
document.write("\n<" + "script type='text/javascript' src='http://www.sacbee.com/static/includes/omniture_custom/custom.js'>" + "</" + "script>");

// For AJAX use
function mistats_resend() {
	s.t();
}

// Yahoo Variables
if( typeof(miyahoo) != 'undefined' ) {
	miyahoo.ads.live.yahoo.request_type = "ac";
	miyahoo.ads.preview.yahoo.request_type = "ac";
	miyahoo.ads.live.yahoo.enabled = false;
	miyahoo.ads.live.dart.enabled = true;
	miyahoo.ads.preview.yahoo.enabled = false;
	miyahoo.ads.preview.dart.enabled = true;

	misite = {};
	misite.yahoo_pub_id = "22713423741";
	misite.yahoo_site_name = "SacBee";
}
