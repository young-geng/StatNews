$(document).ready(function(){
	var show_news;
	var hide_news;
	var show_entertainment;
	var hide_entertainment;
	var show_scene;
	var hide_scene;
	var show_sports;
	var hide_sports;
	var show_on_air;
	var hide_on_air;
	var show_traffic;
	var hide_traffic;
	var show_weather;
	var hide_weather;
	var show_offers;
	var hide_offers;
	var show_contact;
	var hide_contact;
	var show_video;
	var hide_video;
	var show_aca;
	var hide_aca;

	function showDD_news() {show_news = setTimeout(function(){$("div.dd_news").show();},500);}
	function hideDD_news() {hide_news = setTimeout(function(){$("div.dd_news").hide();},50);}
	function showDD_entertainment() {show_entertainment = setTimeout(function(){$("div.dd_entertainment").show();},500);}
	function hideDD_entertainment() {hide_entertainment = setTimeout(function(){$("div.dd_entertainment").hide();},50);}
	function showDD_scene() {show_scene = setTimeout(function(){$("div.dd_the-scene").show();},500);}
	function hideDD_scene() {hide_scene = setTimeout(function(){$("div.dd_the-scene").hide();},50);}
	function showDD_sports() {show_sports = setTimeout(function(){$("div.dd_sports").show();},500);}
	function hideDD_sports() {hide_sports = setTimeout(function(){$("div.dd_sports").hide();},50);}
	function showDD_on_air() {show_on_air = setTimeout(function(){$("div.dd_on-air").show();},500);}
	function hideDD_on_air() {hide_on_air = setTimeout(function(){$("div.dd_on-air").hide();},50);}
	function showDD_traffic() {show_traffic = setTimeout(function(){$("div.dd_traffic").show();},500);}
	function hideDD_traffic() {hide_traffic = setTimeout(function(){$("div.dd_traffic").hide();},50);}
	function showDD_weather() {show_weather = setTimeout(function(){$("div.dd_weather").show();},500);}
	function hideDD_weather() {hide_weather = setTimeout(function(){$("div.dd_weather").hide();},50);}
	function showDD_offers() {show_offers = setTimeout(function(){$("div.dd_offers").show();},500);}
	function hideDD_offers() {hide_offers = setTimeout(function(){$("div.dd_offers").hide();},50);}
	function showDD_contact() {show_contact = setTimeout(function(){$("div.dd_contact").show();},500);}
	function hideDD_contact() {hide_contact = setTimeout(function(){$("div.dd_contact").hide();},50);}
	function showDD_video() {show_video = setTimeout(function(){$("div.dd_video").show();},500);}
	function hideDD_video() {hide_video = setTimeout(function(){$("div.dd_video").hide();},50);}
	function showDD_aca() {show_aca = setTimeout(function(){$("div.dd_aca").show();},500);}
	function hideDD_aca() {hide_aca = setTimeout(function(){$("div.dd_aca").hide();},50);}
	function runNavjax(section) {
		jQuery.ajax({
			url: "/i/dispatcher/?h=subsection_nav&path=/" + section,
			cache: true,
			success: function(html){
			if (section == "around-town") {
				section = "the-scene"
			}
			if (section == "somycity") {
				section = "traffic"
			}
			//alert(html);
			var trimHtml = $.trim(html);
			//alert("after trim "+trimHtml);
			$(".dd_" + section).html("");
			$(".dd_" + section).append(trimHtml); 
			}
		});
	}

	/* News */ 
	$("#nav .news").hover(function(){
		showDD_news();
		if (hide_news) {
        	clearTimeout(hide_news);
		}
	}, function(){
		if (show_news) {
			clearTimeout(show_news);
		}
		hideDD_news();
	});
	
	$("div.dd_news").bind("mouseenter",function(){
		clearTimeout(hide_news);
	}).bind("mouseleave",function(){
		hideDD_news();
	});

	/* Entertainment */
	$("#nav .entertainment").hover(function(){
		showDD_entertainment();
		if (hide_entertainment) {
			clearTimeout(hide_entertainment);
		}
	}, function(){
		if (show_entertainment) {
			clearTimeout(show_entertainment);
		}
		hideDD_entertainment();
	});

	$("div.dd_entertainment").bind("mouseenter",function(){
		clearTimeout(hide_entertainment);
	}).bind("mouseleave",function(){
		hideDD_entertainment();
	});

	/* The-scene */ 
	$("#nav .the-scene").hover(function(){
		showDD_scene();
		if (hide_scene) {
			clearTimeout(hide_scene);
		}
	}, function(){      
		if (show_scene) {
			clearTimeout(show_scene);
		}
		hideDD_scene();
	});

	$("div.dd_the-scene").bind("mouseenter",function(){
		clearTimeout(hide_scene);
	}).bind("mouseleave",function(){
		hideDD_scene();
	});
	
	/* Sports */ 
	$("#nav .sports").hover(function(){
		showDD_sports();
		if (hide_sports) {
			clearTimeout(hide_sports);
		}
	}, function(){      
		if (show_sports) {
			clearTimeout(show_sports);
		}
		hideDD_sports();
	});

	$("div.dd_sports").bind("mouseenter",function(){
		clearTimeout(hide_sports);
	}).bind("mouseleave",function(){
		hideDD_sports();
	});

	/* On-air */
	$("#nav .on-air").hover(function(){
		showDD_on_air();
		if (hide_on_air) {
			clearTimeout(hide_on_air);
		}
	}, function(){      
		if (show_on_air) {
			clearTimeout(show_on_air);
		}
		hideDD_on_air();
	});

	$("div.dd_on-air").bind("mouseenter",function(){
		clearTimeout(hide_on_air);
	}).bind("mouseleave",function(){
		hideDD_on_air();
	});

	/* Traffic */
	$("#nav .traffic").hover(function(){
		showDD_traffic();
		if (hide_traffic) {
			clearTimeout(hide_traffic);
		}
	}, function(){      
		if (show_traffic) {
			clearTimeout(show_traffic);
		}
		hideDD_traffic();
	});

	$("div.dd_traffic").bind("mouseenter",function(){
		clearTimeout(hide_traffic);
	}).bind("mouseleave",function(){
		hideDD_traffic();
	});
	
	/* Traffic w/ACA class */
	$("#nav .aca").hover(function(){
		showDD_aca();
		if (hide_aca) {
			clearTimeout(hide_aca);
		}
	}, function(){      
		if (show_aca) {
			clearTimeout(show_aca);
		}
		hideDD_aca();
	});

	$("div.dd_aca").bind("mouseenter",function(){
		clearTimeout(hide_aca);
	}).bind("mouseleave",function(){
		hideDD_aca();
	});
  
	/* Weather */
	$("#nav .weather").hover(function(){
		showDD_weather();
		if (hide_weather) {
			clearTimeout(hide_weather);
		}
	}, function(){
		if (show_weather) {
			clearTimeout(show_weather);
		}
		hideDD_weather();
	});

	$("div.dd_weather").bind("mouseenter",function(){
		clearTimeout(hide_weather);
	}).bind("mouseleave",function(){
		hideDD_weather();
	});

	/* Offers & Goods */
	$("#nav .offers, #nav .the-goods").hover(function(){
		showDD_offers();
		if(hide_offers) {
			clearTimeout(hide_offers);
		}
	}, function(){      
		if(show_offers) {
			clearTimeout(show_offers);
		}
		hideDD_offers();
	});

	$("div.dd_offers").bind("mouseenter",function(){
		clearTimeout(hide_offers);
	}).bind("mouseleave",function(){
		hideDD_offers();
	});
	
	/* Contact Us */
	$("#nav .contact").hover(function(){
		showDD_contact();
		if(hide_contact) {
			clearTimeout(hide_contact);
		}
	}, function(){      
		if(show_contact) {
			clearTimeout(show_contact);
		}
		hideDD_contact();
	});

	$("div.dd_contact").bind("mouseenter",function(){
		clearTimeout(hide_contact);
	}).bind("mouseleave",function(){
		hideDD_contact();
	});
	
	/* Video */
	$("#nav .video").hover(function(){
		showDD_video();
		if(hide_video) {
			clearTimeout(hide_video);
		}
	}, function(){      
		if(show_video) {
			clearTimeout(show_video);
		}
		hideDD_video();
	});

	$("div.dd_video").bind("mouseenter",function(){
		clearTimeout(hide_video);
	}).bind("mouseleave",function(){
		hideDD_video();
	});
	
});
