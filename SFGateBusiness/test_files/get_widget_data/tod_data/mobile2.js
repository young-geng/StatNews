;jQuery(function($){



	//Search
	$('.m_search_icon').toggle(function(){
		$('.mobile_search').animate({ height: '74px'}, 200);
		//$('.m_search_icon').css('background-position', '-48px 3px');
	}, function(){
		$('.mobile_search').animate({ height: '0px'}, 200);
		//$('.m_search_icon').css('background-position', '-100px 3px');
	});


	//Navigation
	$('.m_nav_icon').toggle(function(){
		$('#Header, #Content, #Footer').animate({ left: '-286px'},  {easing:'swing'});
		$('.mobile_nav').animate({ right: '0'}, {easing:'swing'});
		$('.m_nav_icon').css('background-position', '-48px 3px');
	}, function(){
		$('#Header, #Content, #Footer').animate({ left: 0 },  {easing:'swing'});
		$('.mobile_nav').animate({ right: '-286px'},  {easing:'swing'});
		$('.m_nav_icon').css('background-position', '0px 3px');
	});

	

});
