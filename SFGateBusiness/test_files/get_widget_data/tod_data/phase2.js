(function($) {
	// Bof Plugins
	$.fn.float_Phase2 = function(options) // -------------------------
											// Floating Element
	{
		if (navigator.platform.indexOf("iPad") != -1) {
			return;
		}

		var defaults = {};
		defaults.bottom;
		defaults.use_dummy = true;

		var options = $.extend(defaults, options);

		return this.each(function() {
			var elm = $(this);
			var bound_b;
			var t = elm.position().top;
			var p = elm.css('position');
			var w = elm.width();
			var l = elm.offset().left;
			var s = elm.attr('style');
			var dummy = $('<div class="dummy" style="height:'
					+ elm.outerHeight() + 'px;"></div>');

			if (elm.css('position') == 'absolute') {
				t = elm.offset().top;
			}

			if (p == 'absolute') {
				l = elm.position().left;
			}

			$(window).bind('scroll.float', floatElm);
			$(window).bind('resize.float', function() {
				w = elm.width();

				if (p == 'absolute') {
					l = elm.position().left;
				} else {
					l = elm.offset().left;
				}
			});

			// fix for ie
			$(
					'<div style="width:' + elm.width()
							+ 'px; height:1px; float:left;"></div>')
					.insertBefore(elm);

			function floatElm() {
				if (elm.height() > $(window).height()) {
					elm.css({
						position : 'static'
					});
					return;
				}

				var scrolltop = $(window).scrollTop() - 220; // float之后还原位置的top值
																// - Melvon
																// 2013.04.22
				var scrollbottom = 0;

				if ($(options.bottom).size() == 1) {
					scrollbottom = $(options.bottom).position().top
							- elm.outerHeight(true) - 20; // added 20px hack
															// for stupid ie8
				}

				if (Math.round(scrollbottom) <= Math.round(t)) {
					return;
				}
				;

				if (scrolltop > t || elm.height() > $(window).height()) {
					if (scrolltop > scrollbottom) {
						if ($('#Content').css('position') == 'relative') {
							lft = l - $('#Content').offset().left;
							tp = scrollbottom - $('#Content').offset().top;
						} else {
							lft = l;
							tp = scrollbottom;
						}
						elm.css({
							position : 'absolute',
							top : tp + 220 + 'px',
							left : lft + 'px'
						}); // Melvon 2013.04.22
					} else {
						elm.css({
							position : 'fixed',
							top : 0,
							width : w + 'px',
							left : (l - $(window).scrollLeft()) + 'px'
						});
					}

					if (options.use_dummy == true) {
						dummy.insertAfter(elm);
					}

					elm.addClass('floated');
				} else {

					if (options.use_dummy == true) {
						dummy.remove();
					}

					elm.removeAttr('style');
					elm.removeClass('floated');
					// to keep things simple, floated elm cannot have inline
					// styles
				}
			}
			;

		});
	}

})(jQuery);

function drawChart_BBCPH_MCPH_MCPH_QCPH_QuoteChart1(symbol) {
	$
			.ajax({
				type : "POST",
				url : "/vcb_api/markets/" + symbol.toLowerCase() + "/",
				dataType : "text",
				success : function(data) {
					$('#chart_div_BBCPH_MCPH_MCPH_QCPH_QuoteChart1').parents(
							'.richmenu').show().css({
						opacity : 0
					});
					var dt = new google.visualization.DataTable({
						cols : [ {
							id : 'date',
							label : 'Date',
							type : 'datetime'
						}, {
							id : 'last',
							label : symbol,
							type : 'number'
						}, {
							id : 'dummy',
							label : 'dummy',
							type : 'number'
						} ],
						rows : eval(data)
					});

					var id = document
							.getElementById('chart_div_BBCPH_MCPH_MCPH_QCPH_QuoteChart1');
					var chart = new google.visualization.AnnotatedTimeLine(id);
					chart.draw(dt, {
						scaleType : 'allmaximized',
						wmode : 'opaque',
						displayLegendDots : true,
						displayAnnotations : true,
						displayDateBarSeparator : true,
						displayRangeSelector : false,
						colors : [ '#0033FF', '#FFFFFF' ],
						displayZoomButtons : false,
						fill : 15,
						dateFormat : 'MM/dd HH:mm \'EST\'',
						displayExactValues : true
					});

				}
			});
}

function drawChart_BBCPH_MCPH_MCPH_QuoteChart2(symbol) {
	$.ajax({
		type : "POST",
		url : "/vcb_api/markets/" + symbol.toLowerCase() + "/",
		dataType : "text",
		success : function(data) {
			$('#chart_div_BBCPH_MCPH_MCPH_QuoteChart2').parents('.richmenu')
					.show().css({
						opacity : 0
					});
			var dt = new google.visualization.DataTable({
				cols : [ {
					id : 'date',
					label : 'Date',
					type : 'datetime'
				}, {
					id : 'last',
					label : symbol,
					type : 'number'
				}, {
					id : 'dummy',
					label : 'dummy',
					type : 'number'
				} ],
				rows : eval(data)
			});

			var id = document
					.getElementById('chart_div_BBCPH_MCPH_MCPH_QuoteChart2');
			var chart = new google.visualization.AnnotatedTimeLine(id);
			chart.draw(dt, {
				scaleType : 'allmaximized',
				wmode : 'opaque',
				displayLegendDots : true,
				displayAnnotations : true,
				displayDateBarSeparator : true,
				displayRangeSelector : false,
				colors : [ '#0033FF', '#FFFFFF' ],
				displayZoomButtons : false,
				fill : 15,
				dateFormat : 'MM/dd HH:mm \'EST\'',
				displayExactValues : true
			});

		}
	});
}

function drawChart_BBCPH_MCPH_MCPH_SectorQuoteChart(industry_group, industry) {
	var url = "/vcb_api/markets/sector_chart/" + industry_group + '/';
	if (industry) {
		url = url + industry + '/';
	}
	$
			.ajax({
				type : "POST",
				url : url.toLowerCase(),
				dataType : "text",
				success : function(data) {
					if (data == '[]') {
						$('#QuoteChartContainer').hide();
					}
					$('#chart_div_BBCPH_MCPH_MCPH_SectorQuoteChart').parents(
							'.richmenu').show().css({
						opacity : 0
					});
					var dt = new google.visualization.DataTable({
						cols : [ {
							id : 'date',
							label : 'Date',
							type : 'datetime'
						}, {
							id : 'last',
							label : '',
							type : 'number'
						}, {
							id : 'dummy',
							label : 'dummy',
							type : 'number'
						} ],
						rows : eval(data)
					});

					var id = document
							.getElementById('chart_div_BBCPH_MCPH_MCPH_SectorQuoteChart');
					var chart = new google.visualization.AnnotatedTimeLine(id);
					chart.draw(dt, {
						scaleType : 'allmaximized',
						wmode : 'opaque',
						displayLegendDots : true,
						displayAnnotations : true,
						displayDateBarSeparator : true,
						displayRangeSelector : false,
						colors : [ '#0033FF', '#FFFFFF' ],
						displayZoomButtons : false,
						fill : 15,
						dateFormat : 'MM/dd HH:mm \'EST\'',
						displayExactValues : true
					});

				}
			});
}

function validate_input_elements($element, msg) {
	if(typeof $element.attr("id") == 'undefined')
	return true;
	
	var message = '';
	message += '<a class="tooltip msg-validate">';
	message += '<div></div>';
	message += '	<span class="content">';
	message += '		' + msg + '<br />';
	message += '		<span class="pointer"></span>';
	message += '	</span>';

	message += '</a>';

	var tooltip = $(message);
	var content = tooltip.find('.content');

	$element.addClass('warning');
	$element.wrap(tooltip);
	$element.focus();

	$element.bind('mouseover.validate focus.validate', function() {
		content.show();
	});
	$element.bind('mouseout.validate blur.validate', function() {
		content.hide();
	});
	tooltip.bind('mouseover.validate', function() {
		content.show();
	});
	tooltip.bind('mouseout.validate', function() {
		content.hide();
	});
	
	return false;
}

/**
 * draw Chart Calculator
 * @param {type} chart_data
 * @param {type} chart_label
 * @param {type} x_max_value
 * @param {type} y_max_value
 * @param {type} chart_vAxis_ticks
 * @returns {undefined}
 */
function drawChartCalculator(chart_data, chart_label, x_max_value, y_max_value, chart_vAxis_ticks) {
 // Create and populate the data table.    
 var data = google.visualization.arrayToDataTable(chart_data);
 
 //get y_value_array
 var y_values = Array();
 
 var min = chart_data[1][1];
 var max = chart_data[chart_data.length-1][1]; 
 if(chart_data.length-1 < 10 || min == max) {
    for (var i = 0+1; i < chart_data.length; i++) {
       y_values.push(chart_data[i][1]);
    }
 } else {
    //from min to max, 10 values
    for (var i = 1; i <= 10; i++) {
       var this_value = min + (max-min)/10*i;
       y_values.push(this_value);
    }
 }
 //check if the first y value to last y value is too small
 //if(Math.abs(y_values[0] - y_values.slice(y_values.length-1)) < 2) {
 chart_vAxis_ticks = y_values;
 //}
 
 var vAxis_array = {title: chart_label.y_title, maxValue: y_max_value};
 if(chart_vAxis_ticks) {
    vAxis_array = {title: chart_label.y_title, ticks: chart_vAxis_ticks};
 }
 
 // Create and draw the visualization.
 new google.visualization.LineChart(document.getElementById('chart')).
   draw(data, {
     title: chart_label.title,
     curveType: "none",
     width: 600, height: 600,
     hAxis: {title: chart_label.x_title, maxValue: x_max_value},
     vAxis: vAxis_array
   }
  );
}

//head search start

//head search end