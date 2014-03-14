var currentRichNavChannel = '';


// JavaScript Document

	
	// Create bookmarklet
		function addBookmark(){
			var title = "Define Financial Terms";
			var url = "http://alert('g')";
			
		if (window.sidebar) // firefox
			window.sidebar.addPanel(title, url, "");
		else if(window.opera && window.print){ // opera
			var elem = document.createElement('a');
			elem.setAttribute('href',url);
			elem.setAttribute('title',title);
			elem.setAttribute('rel','sidebar');
			elem.click();
		} 
		else if(document.all)// ie
			window.external.AddFavorite(url, title);
	}

	function showBrowserWarning() {
		if ($().cookie('browser_warning') == 'true') { return; }
f
		$('.msg-bar.browser').show();
		$('.msg-bar.browser .msg-bar-close').on('click', hideBrowserWarning);
	}

	function hideBrowserWarning() {
		$().cookie('browser_warning', true, { expires: 1 });
		$(this).parents('.msg-bar.browser').remove();
	}

	function trimSpaces(str) {
		str = str.replace(/^\s+/, "");
		str = str.replace(/\s+$/, "");
		return str;
	}

	function dollarToNumber(n, zero) {
		n = Number(n.replace(/[^0-9\.]+/g, ""));
		if (zero == null) { zero = '' }
		if (n == 0) { n = zero; }
		return n;
	}

	function numberToDollar(n, zero, c) {
		if (c == null) {c = 0; }
		d = ".";
		s = n < 0 ? "-" : "";
		t = ",";
		i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
		j = (j = i.length) > 3 ? j % 3 : 0;

		var n = '$' + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		
		if (zero != null && n == '$0') {n = zero; }
		return n;
	}

	function objectLength (obj) {
		var n = 0, key;
		for (key in obj) {
			if (obj.hasOwnProperty(key)) n++;
		}
		return n;
	}

	$().ready(function () {

		$('.ui-button .menu').each(function () {
			var menu = $(this);
			$(this).parent().addClass('dropmenu');

			$(this).parent().find('> .label').bind('click', function () {
				if (menu.css('display') == 'none') {
					menu.show();
				} else {
					menu.hide();
				}
			});
		});

		$('.share_email').bind('click', function () {
			window.open('share_email.html', 'inv_email_share', 'width=560, height=420, toolbar=false, menubar=false, resizable=false');
		});

		if ($().cookie('hide_articles') == 'true') {
			$('.article-image').hide();
			$('.image-collapse').text('Show Article Photo');
		}

		$('.image-collapse').bind('click', function (e) {
			e.preventDefault();
			if ($('.article-image').css('display') == 'block') {
				$('.article-image').slideUp();
				$(this).text('Show Article Photo');
				$().cookie('hide_articles', true, { expires: 90 });
			} else {
				$('.article-image').slideDown();
				$(this).text('Hide Article Photo');
				$().cookie('hide_articles', null);
			}
		});

		// sticky elements
		// Issue 338566 - INV DFP - Develop method so bottom right rail advertisement sticks when scrolling
		$('#SidebarFloat').float({ bottom: $('#Footer') });
		// $('#SidenavFloat').float({ bottom: $('#FloatEnd') });
		// $('#SharingFloat #SharingContent').float({ bottom: $('#Footer'), use_dummy: false });

	});
	
	
	(function($) {
	// Bof Plugins

	$.extend({
		getUrlVars: function() {
			var vars = [], hash;     
			var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');     
			for(var i = 0; i < hashes.length; i++) 
			{
				hash = hashes[i].split('=');       
				vars.push(hash[0]);       
				vars[hash[0]] = hash[1];
			}     
			return vars;
		},   
		getUrlVar: function(name) {
			return $.getUrlVars()[name];
		}
	});
		
	$.fn.onscroll = function(callback) // -------------------------- onscroll (manage scroll event firing)
	{
		return this.each(function()
		{
			var elm = $(this);
			var active = false;
			var event;
			
			elm.scroll(function(e) {
				active = true;
				event = e;
			});

			setInterval(function()
			{
				if (active == true) {
					active = false;
					callback(event);
				}
			}, 1);

		});
	}

	$.fn.keyfilter = function(options) //------------------------- Keyboard Filter
	{
		var defaults = {};
		defaults.allow;
		var options = $.extend(defaults, options);
		var shifted = false;
		
		return this.each(function()
		{
			$(this).on('keydown.keyfilter', function(e)
			{
				var valid = true;
				var keycode = e.keyCode || e.which;
				var char = String.fromCharCode(keycode);

				if (!e.ctrlKey) {
					
					// explicitly allow these keys
					switch(keycode)
					{
						case 37: // left arrow
						case 38: // top arrow
						case 39: // right arrow
						case 40: // bottom arrow
						case 8: // backspace
						case 9: // tab
						case 27: // escape
							valid = true;
							break;

						default:
							valid = false;
					}
					

					// validation rules
					if (valid != true) {
						switch (options.allow)
						{
							case 'numeric':
								if (char.match(/^[0-9.]+/) && e.shiftKey != true) {
									valid = true;
								}

								switch(keycode) {
									// numberpad support
									case 96:		case 97:
									case 98:		case 99:
									case 100:		case 101:
									case 102:		case 103:
									case 104:		case 105:
									case 110:
									case 190: // period
										valid = true;
										break;

									default:
								}

								break;
						
							default:
						}
					}
				
					if (valid != true) { e.preventDefault(); }
					}
			})
		});
	}
	
	$.fn.helptext = function(options) //------------------------- Input help text
	{
		var defaults = {};
		defaults.msg = 'Enter Text Here';
		defaults.help_class = 'input-help';
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			if (this.nodeName.toLowerCase() == 'input' && $(this).attr('type').toLowerCase() == 'text') {
				
				var elm = $(this);
				
				if (elm.val() == '' || elm.val() == options.msg) {
					elm.attr('value', options.msg);
					elm.addClass(options.help_class);
				} else {
					elm.data('entered', true);
				}
				
				elm.bind('focusin.ui', function()
				{
					if (!elm.data('entered')) {
						elm.val('');
						elm.removeClass('input-help');
						elm.data('entered', true);
					}
				});
				
				elm.bind('focusout.ui', function()
				{
					if (elm.val() == '') {
						elm.attr('value', options.msg);
						elm.addClass(options.help_class);
						elm.removeData('entered');
					}
				});
				
				elm.parents('form').bind('submit.ui', function()
				{
					if (elm.val() == options.msg) {
						elm.val('');
					}
				});
			}
		});
	}

	$.fn.tether = function(options) //------------------------- Tether - Links Scrollbars Together
	{
		return this.each(function()
		{
				var from = $(this);
				var to = $(options);

				from.bind('scroll', function()
				{
					to.scrollLeft(from.scrollLeft());
					to.scrollTop(from.scrollTop());
				});

				to.bind('scroll', function()
				{
					from.scrollLeft(to.scrollLeft());
					from.scrollTop(to.scrollTop());
				});
		});
	}

	$.fn.matchProp = function(options) //------------------------- Make two elements the same
	{
		var defaults = {};
		defaults.target;
		defaults.selector;
		defaults.attr = [];

		var options = $.extend(defaults, options);

		return this.each(function()
		{
				var from = $(this);
				var to = $(options.target);

				if (to.size() == null || $(options.selector).size() == null) {
					return;
				}
				
				for (var i=0; i<options.attr.length; i++) {
					switch (options.attr[i])
					{
						case 'width':
							matchWidths();
						break;
					}
				}

				function matchWidths()
				{
					from.find(options.selector).each(function(i)
					{
						a = $(this);
						b = to.find(options.selector + ':eq(' + i + ')');
						
						// sets the smaller value to match the bigger value
						if (a.width() > b.width()) {
							b.css({ width:a.width() + 'px' });
						} else {
							a.css({ width:b.width() + 'px' });
						}
					});
				}
		});
	}

	$.fn.button = function(options) //------------------------- Convert Input Button to Custom Button
	{
		var defaults = {};
		defaults.onclick = null;
		defaults.tooltip = null;
		defaults.width = null;
		defaults.enable_keypress = true;
		defaults.usetabindex = true;
		defaults.tabindex;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
				var elm = $(this);
				var btn;

				if (!elm.is('input[type="button"], input[type="submit"]')) { return; }

				$(elm.data('buttontarget')).remove();

				// Build the styled button HTML:
				var buttonHtml = '<a type="button" class="ui-button"';

				// Add Tooltip
				if (options.tooltip != null) {
					buttonHtml = buttonHtml + ' title="' + options.tooltip + '"';
				}

				// Is Icon or Text?
				if (elm.val().indexOf('ui-icon') == 0) {
					buttonHtml = buttonHtml + '><span class="ui-icon ' + elm.val() + '">';
				} else {
					buttonHtml = buttonHtml + '><span class="label">' + elm.val();
				}
				
				buttonHtml = buttonHtml + '</span></a>';


				btn = $(buttonHtml);
				
				if (options.usetabindex == true) {
					if (options.tabindex != null) {
						btn.attr('tabIndex', options.tabindex);
					} else {
						btn.attr('tabIndex', elm.attr('tabIndex'));
					}
				}
				btn.addClass(elm.attr('class'));

				elm.attr('tabIndex', '-1').hide();
				btn.insertAfter(elm);
				elm.data('buttontarget', btn);
				btn.data('buttonsource', elm);

				if (options.onclick == null) {
					btn.bind('click', function() { elm.trigger('click') });
				} else {
					btn.bind('click', options.onclick);
				}

				if (options.width != null) {
					btn.find('span').css({ width:options.width });
				}

				/*if (options.enable_keypress == true) { // deprecated for global function in inv_apps.js
					btn.bind('focus', function()
					{
						$('html').one('keypress', function(e)
						{
							if (e.keyCode == 13) {
								e.preventDefault();
								e.stopPropagation();

								if (options.onclick == null) {
									elm.trigger('click');
								} else {
									options.onclick();
								}
							}
						});
					});
				}*/

		});
	}

	$.fn.datatable = function(options, params) //------------------------- Data Table
	{
		var command;
		
		switch (options)
		{
			case 'insertRow':
			case 'removeRow':
			case 'blur':
			case 'reset':
				command = options;
				var options = $(this).data('options');
				break;

			default:
				var defaults = {};

				defaults.menu_delimiter = ':';
				defaults.menu_definitions;
				defaults.scroll_subs_right = false;
				defaults.disable_enter_key = true;
				defaults.source_data;
				defaults.iedit_prev_name = 'dt-iedit-prev';
				defaults.iedit_name = 'dt-iedit';

				var options = $.extend(defaults, options);
				$(this).data('options', options);
		}
		
		return this.each(function()
		{
			var parent_table = $(this);
			var current_r;
			var current_trs;
			var current_table;
			var current_td;
			var current_val;
			
			// make sure element is a table.
			if (parent_table[0].nodeName.toLowerCase() != 'table') { return false; }
			
			if (command != null)
			{
				eval(command)(params);
				return;
			}

			init();



			function init()
			{
				$('body').on('click', blurRow);
				$(window).resize(resize);
				
				parent_table.find('tbody > tr.dt-editable').on('keydown.datatable', handleKeys);
				parent_table.find('tbody > tr.dt-editable > td[tabIndex]').each(function()
				{
					var td = $(this);
					var txt = trimSpaces(td.text());

					td.on('focus.datatable', function() { focusRow($(this)); });
					$.data(td[0], 'dt-cur-val', txt);
					if (td.hasClass('dt-dollar')) { td.html(numberToDollar(txt)); }
				});
				parent_table.find('tbody > tr.add-new td:not(.dt-blank)').find('input, select').each(function()
				{
					$(this).data('dt-orig-val', $(this).val());
					$(this).on('blur.datatable', saveNewRowValues);
				});
				parent_table.on('click.datatable', function(e) { e.stopPropagation(); });
				parent_table.find('.add-new *').on('focus.datatable', blurRow);

				// new row identifiers
				parent_table.data('dt-new-id', 1);
				
				// multiple table support
				if (!window['plugin_datatable']) { window['plugin_datatable'] = []; }
				window['plugin_datatable'].push(parent_table);

				setTimeout(resize, 100); // timeout added to fix strange bug.
			}

			function resize()
			{
				var sub = parent_table.find('.dt-sub');
				
				if (sub.size() > 0) {
					sub.each(function()
					{
						var scroll_amount = sub[0].scrollWidth - sub[0].clientWidth;

						if (scroll_amount > 0) {
							sub.addClass('overflow');
						} else {
							sub.removeClass('overflow');
						}
					});
				}
			}


			/* public methods ----------------------------------------------------------------- */

			function blur()
			{
				current_td = parent_table.data('dt-current-td');
				current_r = parent_table.data('dt-current-r');
				blurRow();
			}

			function reset()
			{
				parent_table.find('td.changed').each(function()
				{
					var td = $(this);
					var txt = td.data('dt-orig-val');

					if (td.hasClass('dt-menu') && options.menu_definitions != null) {
						var def = options.menu_definitions;

						for (var i=0; i<def.length; i++) {
							if (td.hasClass(def[i].name)) {
								for (var j=0; j<def[i].data.length; j++) {
									if (def[i].data[j].val == txt) {
										txt = def[i].data[j].txt;
									}
								}
							}
						}
					} else if (td.hasClass('dt-dollar')) {
						txt = numberToDollar(txt);
					}

					td.text(txt);
					td.removeClass('changed');
					parent_table.data('dt-data', null);
					parent_table.trigger('datatable.save', [null]);
					parent_table.find('.new .btn-del').trigger('click');
				});

				parent_table.find('.add-new').find('input, select').each(function()
				{
					$(this).val($(this).data('dt-orig-val'));
				});
			}

			function insertRow(params)
			{
				var tr = parent_table.find('> tbody > tr.dt-editable:last');
				var clone = tr.clone(true, true);
				var table = tr.parents('table:eq(0)');
				var keys = table.find('> tbody > tr.dt-data:eq(0)');

				clone.insertAfter(tr).addClass('new').show();
				clone.find('> td').each(function(i)
				{
					var content = params[i].content;

					if (params[i].data != '') {
						if (!params[i].data) { params[i].data = params[i].content; }
						if ($(this).hasClass('dt-menu')) {
							$(this).data('dt-cur-val', content);
						} else {
							$(this).data('dt-cur-val', params[i].data);
						}
						save($(this), params[i].data);
					}

					if ($(this).hasClass('dt-dollar')) { content = numberToDollar(content); }

					$(this).html(content);
				});

				parent_table.data('dt-new-id', parent_table.data('dt-new-id') + 1); // id for dynamically added rows
				parent_table.trigger('datatable.oninsertrow', [clone]);
			}

			function removeRow(tr)
			{
				var data = parent_table.data('dt-data');
				var table = tr.parents('table:eq(0)');
				var keys = table.find('> tbody > tr.dt-data:eq(0)');
				var primarykey_name = keys.find('> td:eq(0) input').attr('name');
				var key_value = tr.find('> td:eq(0) > input').val();

				if (data != null) {
					for (var i=0; i<data.length; i++) {
						if (data[i][primarykey_name] == key_value) {
							data.splice(i,1);
						}
					}

					parent_table.data('dt-data', data);
					parent_table.trigger('datatable.save', [data]);
				}

				tr.remove();
			}

			function saveNewRowValues()
			{
				var td = $(this).parents('td:eq(0)');
				var tr = td.parent();
				
				tr.find('> td').find('input:not([type="hidden"]):not([type="submit"]):not(.dt-blank), select').each(function(i)
				{
					save($(this).parents('td:eq(0)'), $(this).val(), true);
				});
			}

			function save(td, value, master)
			{
				var elm = parent_table.find(':focus');
				var data = [];
				
				if (td == null) { td = getTd(elm); }
				if (td == false) { return; }
				if (value == null) { value = td.find('input, select').eq(0).val(); }
				
				var tr = td.parent();
				var table = td.parents('table:eq(0)');
				var keys = table.find('> tbody > tr.dt-data:eq(0)');
				var field = keys.find('> td:eq(' + td.index() + ') input');

				var obj = {};
				obj.primarykey_name = keys.find('> td:eq(0) input').attr('name');
				obj.primarykey_value = tr.find('> td.dt-data:eq(0) input').val();
				obj.key_name = field.attr('name');
				obj.key_value = field.val();
				obj.value = value;
				obj.orig_value = td.data('dt-orig-val');
				obj.source = parent_table.data('dt-data');
				obj.group_name;
				obj.group_data;
				
				if (obj.value == null) {
					return;
				} else {
					if (obj.orig_value == obj.value) {
						td.removeClass('changed');
					} else {
						td.addClass('changed');
					}
				}
				
				keys.find('> td').each(function() // search duplicate keys
				{
					var namecount = keys.find('input[name="' + obj.key_name + '"]').size();

					if (namecount > 1) {
						obj.group_name = obj.key_name.charAt(0).toUpperCase() + obj.key_name.slice(1) + 'Group';
						obj.group_data = saveObject(obj, true, master); // turn them into an array
						return false;
					}
				});
				//console.log(obj)
				// save array as a value (thus creating a sub object)
				if (obj.group_data) {
					if (obj.group_data.length > 0) {
						obj.key_name = obj.group_name;
						obj.value = obj.group_data;
					}
				}
				
				data = saveObject(obj, false, master);

				// clears data that was in 'add new row' form (aka, Master)
				if (master != true) {
					for (var i=0; i<data.length; i++) {
						if (data[i]['Master']) {
							data.splice(i,1);
							break;
						}
					}
				}
				
				parent_table.data('dt-data', data);
				parent_table.trigger('datatable.save', [data]);
			}

			function saveObject(obj, is_subobject, master)
			{
					var item = {};
					var found_item;
					var revert = false;
					var data;
					var output;
					
					if (obj.source != null) {
						data = obj.source;
					} else {
						data = [];
					}
					
					// search for existing primary key
					for (var i=0; i<data.length; i++) {
						if (data[i][obj.primarykey_name] == obj.primarykey_value) {
							found_item = i;
							break;
						}
					}
					
					if (is_subobject == true) {

						var subdata;
						var subitem;

						item[obj.key_name] = obj.key_value
						item['value'] = obj.value;

						if (master == true) {
							item['Master'] = true;
						}
						
						if (found_item == null) {
							if (obj.orig_value != obj.value) {
								data = [];
								data.push(item);
								output = data;
							}
						} else {
						
							// remove reverted properties
							for (prop in data[found_item]) {
								if (prop == obj.group_name) {
									subdata = data[found_item][obj.group_name];
									for (var i=0; i<subdata.length; i++) {
										if (subdata[i][obj.key_name] == obj.key_value) {
											subitem = subdata[i];
											if (obj.value == obj.orig_value) {
												revert = true;
												data[found_item][obj.group_name].splice(i,1);
												break;
											}
										}
									}
								}
							}
							
							if (revert == true) {
								
								// clean up empty items
								if (data[found_item][obj.group_name].length == 0) {
									delete data[found_item][obj.group_name];
								}

							} else {
								
								if (subitem != null) {
									data[found_item][obj.group_name][i-1]['value'] = obj.value;
								} else {
									if (obj.value != obj.orig_value) {
										if (!data[found_item][obj.group_name]) { data[found_item][obj.group_name] = []; }
										data[found_item][obj.group_name].push(item);
									}
								}
								output = data[found_item][obj.group_name];

							}
						}

					} else {

						item[obj.primarykey_name] = obj.primarykey_value;
						item[obj.key_name] = obj.value;

						if (master == true) {
							item['Master'] = true;
						}
						
						if (typeof obj.value == "string") {
							if (obj.key_value) {
								item[obj.key_name] = obj.key_value;
								item[obj.key_name + 'Value'] = obj.value;
							}
						}

						if (found_item == null) {
							if (obj.orig_value != obj.value) { data.push(item); }
						} else {
						
							// remove reverted properties
							for (prop in data[found_item]) {
								if (prop == obj.key_name && obj.value == obj.orig_value) {
									delete data[found_item][obj.key_name];
									revert = true;
									break;
								}
							}

							// clean up empty items
							if (objectLength(data[found_item]) == 1) {
								data.splice(found_item, 1);
							}

							if (revert == false) {
								if (data[found_item]) {
									if (item[obj.key_name + 'Value']) {
										data[found_item][obj.key_name + 'Value'] = obj.value;
									} else {
										data[found_item][obj.key_name] = obj.value;
									}
								}
							}
						}
						output = data;

					}

					return output;
			}

			/* private methods ----------------------------------------------------------------- */

			function blurTables()
			{
				for (var i=0; i<window['plugin_datatable'].length; i++) {
					var table = window['plugin_datatable'][i];
					if (table != parent_table) {
						table.datatable('blur');
					}
				}
			}

			function handleKeys(e)
			{
				var elm = $(this).find(':focus');
				var td = getTd(elm);
				
				if (td != false) {
					var tr = td.parent();
					var r = current_trs.index(tr);
					var c = td.index();
					var keycode = (e.which) ? e.which : e.keyCode;
					
					// escape key
					if (keycode == '27') {
						revertValue(elm);
					}

					// enter key
					if (keycode == '13' && options.disable_enter_key == true) {
						e.preventDefault();
						e.stopPropagation();
					}
					
					// abort if on a select menu.
					if (td.hasClass('dt-menu') == false && td.hasClass('dt-custom') == false) {
						if (keycode == '38') {
							if (r > 0) {
								e.preventDefault();
								current_trs.eq(r-1).find('> td:eq(' + c + ')').trigger('focus');
							}
						}
	
						if (keycode == '40') {
							e.preventDefault();
							current_trs.eq(r+1).find('> td:eq(' + c + ')').trigger('focus');
						}
					}
				}
			}

			function getTd(elm)
			{
				var parent = elm.parent();

				if (parent.is('td')) {
					return elm.parent();
				} else if (parent.is('tr')) {
					return elm;
				} else {
					return false;
				}
			}

			function focusRow(td)
			{
				blurTables(); 
				blurRow();
				
				if (td == null) { return; }
				
				current_td = td;
				current_table = current_td.parents('tbody:eq(0)');
				current_trs = current_table.find('> tr.dt-editable');
				current_r = current_trs.index(current_td.parent());

				parent_table.data('dt-current-td', current_td);
				parent_table.data('dt-current-r', current_r);

				parent_table.find('tbody').each(function()
				{
					var tr = $(this).find('> tr.dt-editable:eq(' + current_r + ')');
					tr.prev().addClass(options.iedit_prev_name);
					tr.addClass(options.iedit_name);
				});

				getValue(current_td);
				current_td.removeAttr('tabIndex');
			}

			function blurRow()
			{
				if (current_td == null) { return; }

				current_td.attr('tabIndex', '0');

				parent_table.find('tbody').each(function()
				{
					var table = $(this).parents('table:eq(0)');
					var tr = table.find('> tbody > tr.dt-editable:eq(' + current_r + ')');

					tr.prev().removeClass(options.iedit_prev_name);
					tr.removeClass(options.iedit_name);
				})

				save(current_td);
				setValue(current_td);
				parent_table.trigger('datatable.update', [current_td]);
			}

			function getValue(td)
			{
				var field = $('<input type="text" tabIndex="-1" maxlength="30" />');
				var val = td.data('dt-cur-val');

				current_val = val;
				
				if (td.hasClass('dt-menu') && options.menu_definitions != null) {
				
					var txt = val;
					var def = options.menu_definitions;
					var markup = '<select>';

					for (var i=0; i<def.length; i++) {
						if (td.hasClass(def[i].name)) {
							for (var j=0; j<def[i].data.length; j++) {
								var selected = '';
								
								if (def[i].data[j].txt == txt) {
									selected = ' selected="selected"';
									val = def[i].data[j].val;
								}
								markup += '<option value="' + def[i].data[j].val + '"' + selected + '>' + def[i].data[j].txt + '</option>';
							}
							break;
						}
					}

					markup += '</select>';
					field = $(markup);
					td.html(field);
					field.focus().trigger('click');

				} else if (td.hasClass('dt-dollar')) {
					
					val = dollarToNumber(val, '0');
					field.val(val);
					td.html(field);
					field.focus().select();
					field.keyfilter({ allow:'numeric' });

				} else {
				
					field.val(val);
					td.html(field);
					field.focus().select();

				}
				
				if (!td.data('dt-orig-val')) {
					td.data('dt-orig-val', String(val));
				}
			}

			function setValue(td)
			{
				var field = td.find(':first-child');
				var val = field.val();
				var txt = val;
				
				if (td.hasClass('dt-menu')) {
					txt = field.find(':selected').text();
					td.data('dt-cur-val', txt);
				} else if (td.hasClass('dt-dollar')) {
					txt = numberToDollar(val);
					td.data('dt-cur-val', val);
				} else {
					td.data('dt-cur-val', val);
				}
				
				if (field.size() > 0) {
					td.data('dt-new-val', String(val));
					td.text(txt);
				}
			}

			function revertValue(elm)
			{
				var val = current_val;

				if (elm.is('input[type="text"]')) {
					if (elm.parent().hasClass('dt-dollar')) { val = dollarToNumber(val); }
					elm.blur().val(val).focus().select();
				}
			}

		});
	}
	
	$.fn.compare = function(options) //------------------------- Comparisons
		{
			var defaults = {};
			defaults.details = '#ComparisonDetails';
			var options = $.extend(defaults, options);
			
			return this.each(function()
			{
				var elm = $(this);
				
				elm.bind('change', function(e, i)
				{
					var idx = $(this).parent().index();
					var target = $('#' + $(this).val());
					
					target.find('.source').each(function(i)
					{
						$(options.details).find('tr:eq(' + i + ') .dest:eq(' + idx + ')').html($(this).html());
						$(options.details).show();
					});
				});
				
				elm.trigger('change');
			});
		}

  $.fn.collapsable = function(options) //------------------------- Collapsable
	{
		var defaults = {};
    defaults.collapse_text = '<span class="label">Show Less Content</span>';
    defaults.expand_text = '<span class="label">Show More Content</span>';
    defaults.cookie_key;
    defaults.cookie_expires = 90;
    defaults.trigger;
    defaults.markup = '<div class="collapse-trigger ui1"><div class="btn-collapse"><a class="area"></a></div></div>';
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{ 
      var elm = $(this);
      var trigger;
      var cookiename = 'invprefs';
      var h
      var btn;

      elm.css({ overflow:'hidden' });
      h = elm.height();

      if (options.trigger == null) {
        btn = $(options.markup).insertAfter(elm);
        trigger = btn.find('.area');
      } else {
        trigger = $(options.trigger);
      }

      if (options.cookie_key == null) {
        elm.css({ height:0 });
      } else {
        if ($().cookie(options.cookie_key)) {
          trigger.html(options.collapse_text);
        } else {
          elm.css({ height:0 });
          trigger.html(options.expand_text);
        }
      }

      trigger.css('cursor', 'pointer');
			trigger.bind('click', function (e)
      {
        e.preventDefault();

        if (elm.height() > 0) {
          elm.animate({ height:0 });
          $(this).html(options.expand_text);

          if (options.cookie_key != null) {
           $().cookie(options.cookie_key, null, { path: '/' });
          }

        } else {
          elm.animate({ height:h + 'px' });
          $(this).html(options.collapse_text);

          if (options.cookie_key != null) {
           $().cookie(options.cookie_key, true, { expires: options.cookie_expires, path: '/' });
          }
        }
      });
		});
	}
	
	
	$.fn.selectmenu = function(options) //------------------------- Custom Select Menu
	{
		var defaults = {};
		defaults.opendepth = 90; // z-index when open
		defaults.classname = 'selectmenu';
		defaults.linkmode = false;
		defaults.onSelect;
		defaults.onInit;
		defaults.width;
		defaults.value;
		
		var options = $.extend(defaults, options);
		
		return $(this).each(function()
		{
			var elm = $(this);
			var target = elm;
			var markup = '';
			var markup_id = '';
			var fieldname = elm.attr('name');
			var fieldvalue;
			var selectmenu;
			var size = elm.width();
			var closedepth = elm.css('z-index');
			var menu;
			var keypos = 0;
			var lastkey = '';
			var lockmouseover = false;
			var option;
			
			// set the form value of the field.
			if (options.value != null) {
				fieldvalue = options.value;
			} else {
				option = elm.find('option:selected');
				if (option.attr('value')) {
					fieldvalue = option.attr('value');
				} else {
					fieldvalue = '';
				}
			}
			
			// set the id of the element
			if (elm.attr('id')) {
				markup_id = ' id="' + elm.attr('id') + '"';
			}
			
			// draw the new menu
			markup += '<div class="' + options.classname + '" style="width:' + elm.width() + 'px;"><div class="label"><div class="text"></div></div>';
			markup += '<input type="button" class="keytrigger" style="position:absolute; left:-99999px; width:10px;" /><ul>';
			
			elm.find('option').each(function()
			{
				var id = '';
				if ($(this).attr('id')) { id = ' id="' + $(this).attr('id') + '"'; }
				markup += '<li' + id + '><a href="' + $(this).attr('value') + '">' + $(this).text() + '</a></li>';
			});
			
			markup += '</ul></div>';
			
			// create the new elements and hide the old
			selectmenu = $(markup);
			selectmenu.insertBefore(elm);
			elm.hide();
			
			/// if (fieldvalue != '') { selectmenu.find('.label .text').text(option.text()); }
			selectmenu.find('.label .text').text(option.text());
			
			// initialize the menu elements
			menu = selectmenu.find('ul');
			menu.find('li a').bind('click.selectmenuitem', function(e)
			{
				e.preventDefault();
				if (options.linkmode == true && $(this).attr('href') != '') {
					linkTo($(this).attr('href'));
				} else {
					setValue(menu.find('li a').index($(this)));
				}
			});
			
			menu.find('li a').bind('mouseover.selectmenuitem', function()
			{
				if (lockmouseover == true) { return; };
				$(this).addClass('hover');
			});
			
			menu.find('li a').bind('mouseout.selectmenuitem', function()
			{
				$(this).removeClass('hover');
			});
			
			selectmenu.find('.keytrigger').bind('focus.selectmenu', function()
			{
				selectmenu.find('.label').css({ outline:'3px dotted #aaaaaa' });
				$(document).keydown(function(e)
				{
					e.preventDefault();
					$(document).unbind('keydown');
					
					if (e.keyCode == 30) { showMenu(); }
					if (e.keyCode == 38 || e.keyCode == 40) { if (menu.css('display') == 'none') { showMenu(); } prevItem(); }
				});
			});
			
			selectmenu.find('.keytrigger').bind('blur.selectmenu', function()
			{
				selectmenu.find('.label').css({ outline:'none' });
				$('html').unbind('keypress.triggerselectmenu');
				hideMenu();
			});
			
			// handle show/hide events
			selectmenu.bind('click.selectmenu', function(e)
			{
				e.stopPropagation();
				hideMenus($(this));
					
				if (menu.css('display') == 'none') {
					showMenu();
				} else {
					hideMenu();
				}
			});
			
			if (options.onInit != null) {
				options.onInit();
			}
			
			
			function hideMenus(exempt) // hide all menus except this one
			{
				$('body .selectmenu').each(function()
				{
					if ($(this) != exempt) {
						hideMenu($(this));
					}
				});
			}
			
			function showMenu()
			{
				lockmouseover = false;
				menu.fadeIn('fast');
				selectmenu.css({ zIndex:options.opendepth });
				$('body').bind('click.selectmenu', function() { hideMenu(); });
				enableKeys();
			}
			
			function hideMenu(elm) // hide specified menu
			{
				if (elm == null) { elm = selectmenu; }
				
				elm.find('ul').fadeOut('fast', function() { elm.css({ zIndex:closedepth }); });
				$('body').unbind('click.selectmenu');
				disableKeys();
			}
			
			function linkTo(url)
			{
				document.location.href = url;
			}
			
			function setValue(i)
			{
				var option = target.find('option:eq(' + i + ')');
				var val = option.val();
				
				target.find('option').removeAttr('selected');
				option.attr('selected', 'selected');
				selectmenu.find('.label .text').text(option.text());
				
				if (options.onSelect != null) {
					options.onSelect(val);
				}
			}
			
			function enableKeys()
			{
				$(document).keydown(function(e)
				{
					var char = String.fromCharCode(e.which);
					e.preventDefault();
					lockmouseover = true;
					
					if (e.keyCode == 13) {
						menu.find('li a.hilighted').trigger('click.selectmenuitem');
						hideMenu();
					} else {
						
						if (e.keyCode == 38) {
							prevItem();
						} else if (e.keyCode == 40) {
							nextItem();
						} else {
							findItem(char);
						}
					}
					
					
				});
			}
			
			function disableKeys()
			{
				$(document).unbind('keydown');
			}
			
			function prevItem()
			{
				var i = menu.find('li a').index(menu.find('li a.hilighted'));
				
				if (i > 0) {
					selectItem(i-1);
				} else {
					selectItem(0);
				}
			}
			
			function nextItem()
			{
				var i = menu.find('li a').index(menu.find('li a.hilighted'));
				
				if (i < menu.find('li a').size()-1) {
					selectItem(i+1);
				}
			}
			
			function selectItem(n)
			{
				menu.find('li a').removeClass('hilighted');
				menu.find('li a:eq(' + n + ')').addClass('hilighted');
				menu.scrollTop(0);
				menu.scrollTop(menu.find('li a.hilighted').position().top - menu.position().top - menu.height() + menu.find('li a').parent().height());
				manageMouseover();
			}
			
			function findItem(c)
			{
				var found = false;
				var key;
				
				c = c.toLowerCase();
				
				menu.find('li a').each(function(i)
				{
					var self = $(this);
					
					key = String(self.html().toLowerCase()).substring(0,1);
					self.removeClass('hilighted');
					self.removeClass('hover');
					
					if (key == c) {
						
						if (key != lastkey) { keypos = -1; }
						
						if (i > keypos) {
							found = true;
							menu.scrollTop(0);
							menu.scrollTop($(this).parent().position().top - menu.position().top - menu.height() + self.parent().height());
							keypos = i;
							self.addClass('hilighted');
							
							manageMouseover();
							
							lastkey = key;
							return false;
						}
					}
				});
				
				if (found == false && c == lastkey) {
					lastkey = '';
					findItem(c);
				}
			}
			
			function manageMouseover()
			{
				$('html').bind('mousemove.selectmenu', function()
				{
					keypos = 0;
					lastkey = null;
					menu.find('li a').removeClass('hilighted');
					lockmouseover = false;
					$('html').unbind('mousemove.selectmenu');
				});
			}
			
		});
	}


	$.fn.tabset = function (options) //------------------------- Tabbed Boxes
	{
		var defaults = {};
		defaults.panel;
		defaults.use_history = false;
		defaults.multiple = false; // switches id '#' to class '.' to target multiple panels.

		var options = $.extend(defaults, options);

		return this.each(function () {
			var elm = $(this);
			var default_tab = elm.find('.nav li.selected a');
			var last_h = 40;

			initTabs();

			function initTabs() {
				elm.find('.nav li a').each(function () {
					if (options.use_history != true) {
						$(this).bind('click', triggerTab);
					}
				})
			}

			if (options.use_history == true) {
				$(window).bind('hashchange', triggerTab);
				$(window).hashchange();
			}

			function triggerTab(e) {
				var link;
				var self = $(this);

				if (options.use_history == true) {
					link = elm.find('.nav li a[href="' + window.location.hash + '"]');
					if (link.size() == 0) {
						link = elm.find('.nav li:eq(0) a');
					}
				} else {
					e.preventDefault();
					link = $(this);
				}

				elm.trigger('beforeclick', [self]);

				if (link.attr('href').substring(0, 1) == '#') {
					selectTab(link.parent());
					getPanel(link);
				}

				elm.trigger('afterclick', [self]);
			}

			function deselectTabs() {
				if (options.panel == null) {
					elm.find('.panel').hide();
				} else {
					$(options.panel).hide();
				}

				elm.find('.nav li').removeClass('selected');
			}

			function selectTab(obj) {
				deselectTabs();
				obj.addClass('selected');
			}

			function getPanel(obj) {
				var target = $(obj.attr('href'));

				if (options.multiple == true) {
					str = obj.attr('href').replace('#', '.');
					target = $(str);
				}
				
				target.show();
				last_h = target.height();

				if (target.attr('data-ajax-method')) {
					window[target.attr('data-ajax-method')]();
				}
			}

			default_tab.trigger('click');
		});
	}



  $.fn.colcarousel = function(options) //------------------------- Column Carousel
	{
		var defaults = {};
    defaults.current_slide = 0;
    defaults.delay = 4;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var timer;
      var hover = false;
      var count = 0;

      elm.unbind('mouseenter').bind('mouseenter', function() { hover = true; });
      elm.unbind('mouseleave').bind('mouseleave', function() { hover = false; });
      elm.find('.item').append('<div class="pointer"></div>');
      elm.find('.item-title a').unbind('click').bind('click', selectSlide);
      elm.find('.item-image').each(function()
      {
        var img = $(this).find('.item-image-src');
        elm.find('.ui-colcarousel-screen').append($(this));
        $(this).show();
      });

      function nextSlide()
      {
        if (options.current_slide >= elm.find('.item-title a').size()-1) {
          options.current_slide = 0;
        } else {
          options.current_slide++;
        }

        count = 0;
        getSlide();
      }

      function selectSlide(e)
      {
        e.preventDefault();
        options.current_slide = elm.find('.item-title a').index(this);
        getSlide();
      }

      function getSlide()
      {
        var slide = elm.find('.item:eq(' + options.current_slide + ')');

        elm.find('.item-image').hide();
        elm.find('.item-image:eq(' + options.current_slide + ')').show();
        elm.find('.item').removeClass('selected');
        slide.addClass('selected');
      };

      getSlide();
      timer = setInterval(function()
      {
        count++;
        if (hover == true) { count = 0; }
        if (count > options.delay) {
          nextSlide();
        };
      }, 1000);
		});
	}


  $.fn.boxmenu = function(options) //------------------------- Box Menu
	{
		var defaults = {};
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
      var t = elm.find('.items strong').position().top;
      
      elm.find('.items').scrollTop(t);
			elm.find('.sections > li').unbind('click.boxmenu').bind('click.boxmenu', function(e)
		  {
			  e.stopPropagation();
			
			  $(this).parents().find('.selected').removeClass('selected');
			  $(this).addClass('selected');
			  $(this).find('.sidenav').addClass('selected');
			  $(this).find('.sidenav li:eq(0)').trigger('click');
		  });

      elm.find('.sidenav > li').unbind('click.boxmenu').bind('click.boxmenu', function(e)
		  {
			  e.stopPropagation();
        side = $(this).parents('.sidenav');
			
			  $(this).parents('.sidenav').find('.selected').removeClass('selected');
			  $(this).addClass('selected');
			  $(this).find('.items').addClass('selected');
        resize();
		  });


      function resize()
      {
        var h = elm.find('.sections li.selected .sidenav').outerHeight() + elm.find('.sections').outerHeight();
        elm.css({ height:h + 'px' });
      }

      resize();
    });
	}
	
	
	$.fn.float = function(options) //------------------------- Floating Element
	{
		if (navigator.platform.indexOf("iPad") != -1) { return; }
		
		var defaults = {};
		defaults.bottom;
		defaults.use_dummy = true;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var bound_b;
			var t = elm.position().top;
			var p = elm.css('position');
			var w = elm.width();
			var l = elm.offset().left;
			var s = elm.attr('style');
			var dummy = $('<div class="dummy" style="height:' + elm.outerHeight() + 'px;"></div>');

			if (elm.css('position') == 'absolute') {
				t = elm.offset().top;
			}
			
			if (p == 'absolute') {
				l = elm.position().left;
			}

			$(window).bind('scroll.float', floatElm);
			$(window).bind('resize.float', function()
			{
				w = elm.width();

				if (p == 'absolute') {
					l = elm.position().left;
				} else {
					l = elm.offset().left;
				}
			});

			// fix for ie
			$('<div style="width:' + elm.width() + 'px; height:1px; float:left;"></div>').insertBefore(elm);
			function floatElm()
			{
				if (elm.height() > $(window).height()) {
					elm.css({ position:'static' });
					return;
				}
				var scrolltop = $(window).scrollTop();
				var scrollbottom = 0;
				
				if ($(options.bottom).size() == 1) {
					scrollbottom = $(options.bottom).position().top - elm.outerHeight(true) - $('#Content').offset().top - 20; // added 20px hack for stupid ie8
				}
				
				if (Math.round(scrollbottom) <= Math.round(t)) {
					return;
				};
				
				scrolltop = scrolltop - $('#Content').offset().top;

				if (scrolltop > t || elm.height() > $(window).height()) {
					if (scrolltop > scrollbottom ) {
						if ($('#Content').css('position') == 'relative') {
							lft = l - $('#Content').offset().left;
							tp = scrollbottom - $('#Content').offset().top;
						} else {
							lft = l;
							tp = scrollbottom;
						}
						elm.css({ position:'absolute', top:tp + 'px', left:lft + 'px' });
					} else {
						elm.css({ position:'fixed', top:0, width:w + 'px', left:(l-$(window).scrollLeft()) + 'px' });
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
					// to keep things simple, floated elm cannot have inline styles
				}
			};
			
		});
	}


	$.fn.module_slideshow = function(options) //------------------------- SlideShow Module
	{
		var defaults = {};
		defaults.slides;

		var options = $.extend(defaults, options);
		options.spacing = 20;
		options.peeksize = 20;

		var currentidx = 1;
		var slide;
		var nextslide;
		var lastslide;
		var totalslides = 0;
		
		return this.each(function()
		{
			var elm = $(this);
			var title = $('<div class="module-title">&nbsp;</div>');
			var list = elm.find('.list');
			var totalslides = elm.find('.item').size();
			var tableft = $('<div class="tab tableft"></div>');
			var tabright = $('<div class="tab tabright"></div>');

			list.wrap('<div class="ui-canvas"></div>');
			list.find('.item').css({ margin:'0 ' + options.spacing + 'px' });
			elm.css({ position:'relative' });
			elm.find('.ui-canvas').append(title);
			elm.append(tableft);
			elm.append(tabright);

			getSlide(currentidx);

			tableft.bind('mouseenter', function() { peek(lastslide); });
			tableft.bind('mouseleave click', function() { cover(lastslide); });
			tableft.bind('click', lastSlide);
			tabright.bind('mouseenter', function() { peek(nextslide); });
			tabright.bind('mouseleave click', function() { cover(nextslide); });
			tabright.bind('click', nextSlide);

			function getSlide(n)
			{
				lastslide = elm.find('.item:eq(' + (n-1) + ')');
				slide = elm.find('.item:eq(' + n + ')');
				nextslide = elm.find('.item:eq(' + (n+1) + ')');
				var x = -slide.position().left  + ((list.width()-slide.width()) / 2) - options.spacing;
				
				list.animate({ left:x + 'px' });
				title.html(slide.find('.item-title').html());
			}

			function nextSlide(e)
			{
				e.preventDefault();
				e.stopPropagation();

				if (currentidx < totalslides-1) {
					currentidx++;
					getSlide(currentidx);
				}
			}

			function lastSlide(e)
			{
				e.preventDefault();
				e.stopPropagation();

				if (currentidx > 0) {
					currentidx--;
					getSlide(currentidx);
				}
			}

			function peek(obj)
			{
				var img = obj.find('.item-image');
				var pos = (obj.index())
				var x;

				if (pos > currentidx) {
					x = -options.peeksize;
				} else {
					x = options.peeksize;
				}

				img.animate({ left:x + 'px' }, { queue:false, duration:100 });
			}

			function cover(obj)
			{
				var img = obj.find('.item-image');
				img.stop().animate({ left:'0' }, { queue:false, duration:100 });
			}
		});
	}


  $.fn.slideshow = function(options) //------------------------- SlideShow
	{
		var defaults = {};
    	defaults.slides;

		var options = $.extend(defaults, options);
		
		var currentslide = 0;
    	var totalslides = 0;

		return this.each(function()
		{
			var elm = $(this);
			var nextimgurl = options.slides.last().find('.item-image-src:first').css('background-image');
			nextimgurl = nextimgurl.replace(/"/g,"").replace(/url\(|\)$/ig, "");
			var nextimg = '<img src="' + nextimgurl + '" />';

      options.slides.hide();
      totalslides = options.slides.size();
      elm.find('.num-item:gt(0)').remove();

      elm.find('.prev').unbind('click').bind('click', prevSlide);
      elm.find('.next').unbind('click').bind('click', nextSlide);
			
			options.slides.each(function(i)
			{
				var clone;
				var img = options.slides.eq(i).find('.content-image').html();

				clone = elm.find('.num-item:eq(0)').clone();
				elm.find('.num-item:eq(0)').parent().append(clone);

				// if(i==0) {
				// 	clone.find('.slidenum').text('Intro');
				// 	clone.find('.thumbtip').append(img);
				// } else if (i == options.slides.size()-1) {
				// 	clone.find('.slidenum').text('Related');
				// 	clone.find('.thumbtip').append(nextimg);
				// } else {
				// 	clone.find('.slidenum').text(i);
				// 	clone.find('.thumbtip').append(img);
				// }

				// mcai	
				if(i==0) {
					clone.find('.slidenum').text(i+1);
					clone.find('.thumbtip').append(img);
				} else if (i == options.slides.size()-1) {
					clone.find('.slidenum').text(i+1);
					clone.find('.thumbtip').append(nextimg);
				} else {
					clone.find('.slidenum').text(i+1);
					clone.find('.thumbtip').append(img);
				}



				clone.bind('click', function() { getSlide(i); });
			});

      function getSlide(i)
      {
        var section = options.slides.eq(i);
        var img = section.find('.content-image, .content-related').html();
        var title = section.find('.content-subhead').html();
        var body = section.find('.content-mainbody').html();
        
        if (i < totalslides-1) {
          elm.find('.next').removeClass('disabled');
        } else {
          elm.find('.next').addClass('disabled');          
        }

        if (i > 0) {
          elm.find('.prev').removeClass('disabled');
        } else {
          elm.find('.prev').addClass('disabled');
        }

        elm.find('.num-item').removeClass('selected');
        elm.find('.num-item:eq(' + (i+1) + ')').addClass('selected');
        elm.find('.slide-viewer').html(img);
        elm.find('.slide-title').html(title);
        elm.find('.slide-body').html(body);
        
        //slide-btns arrow margin-top auto set
        var slide_btns_right_margin_top = $('.slide-viewer').height() + 100;
        if (i >= totalslides-1) {
            slide_btns_right_margin_top += 10;
        }
        elm.find('.slide-btns.right').css("margin-top", "-" + slide_btns_right_margin_top + "px");

        currentslide = i;
        triggerGoogleAnalytics();
        refreshAdUnits();
      }

      function nextSlide()
      {
        if (currentslide < totalslides-1) {
          getSlide(currentslide+1);
		 }
      }

      function prevSlide()
      { 
        if (currentslide > 0) {
          getSlide(currentslide-1);
		}
      }

      elm.find('.num-item:eq(0)').hide();
      getSlide(0);
			
		});
	}
	
	
	
	$.fn.carousel = function(options) //------------------------- Carousel
	{
		var defaults = {};
		defaults.speed = 500;
		defaults.autoplay = true;
		
		var options = $.extend(defaults, options);
		
		var currentslide = 0;
		var lock_a = false;
		var lock_b = false;
		
		return this.each(function()
		{
			var elm = $(this);
			var teaser = elm.parent().find('.ui-teaser');
			var w = 0;
			
			elm.find('.slide:gt(0)').hide();
			elm.css({ width:elm.width() + 'px', height:elm.height() + 'px', overflow:'hidden', position:'relative' });
			elm.find('.slide').css({ position:'absolute', top:0, left:0, width:elm.width() + 'px', height:elm.height() + 'px' });
			
			teaser.find('.next').bind('mousedown.carousel', function() { $(this).addClass('down'); nextSlide(); });
			teaser.find('.prev').bind('mousedown.carousel', function() { $(this).addClass('down'); prevSlide(); });
			
			update();
			
			function nextSlide()
			{
				if (lock_a == true || lock_b == true) { return; }
				
				var self = this;
				var lastslide = elm.find('.slide:eq(' + currentslide + ')');
				
				if (currentslide >= elm.find('.slide').size() - 1) {
					currentslide = 0;
				} else {
					currentslide += 1;
				}
				
				var nextslide = elm.find('.slide:eq(' + currentslide + ')');
				var l = lastslide.position().left + lastslide.width();
				
				lock_a = true;
				lock_b = true;
				
				nextslide.css({ left:l + 'px' }).show();
				lastslide.animate({ left:(-l) + 'px' }, options.speed, function() { lock_a = false; });
				nextslide.animate({ left:0 }, options.speed, function() { lock_b = false; teaser.find('.next').removeClass('down'); update(); });
			}
			
			function prevSlide()
			{
				if (lock_a == true || lock_b == true) { return; }
				
				var self = this;
				var lastslide = elm.find('.slide:eq(' + currentslide + ')');
				
				if (currentslide <= 0) {
					currentslide = elm.find('.slide').size() - 1;
				} else {
					currentslide -= 1;
				}
				
				var nextslide = elm.find('.slide:eq(' + currentslide + ')');
				var l = lastslide.position().left + lastslide.width();
				
				lock_a = true;
				lock_b = true;
				
				nextslide.css({ left:(-l) + 'px' }).show();
				lastslide.animate({ left:l }, options.speed, function() { lock_a = false; });
				nextslide.animate({ left:0 + 'px' }, options.speed, function() { lock_b = false; teaser.find('.prev').removeClass('down'); update(); });
			}
			
			function update()
			{
				var totalslides = elm.find('.slide').size();
				var nextslide;
				var text;
				var n = currentslide + 1;
				
				if (currentslide >= totalslides - 1) {
					nextslide = 0;
				} else {
					nextslide = currentslide + 1;
				}
				
				text = '<a href="#">' + elm.find('.slide:eq(' + nextslide + ') .item-title').text() + '</a>';
				
				teaser.find('.teasertitle').html(text);
				teaser.find('.teaserlabel').html(n + ' of ' + totalslides + '&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Up Next: ');
				teaser.find('.teasertitle a').bind('click.carousel', function(e) { e.preventDefault(); nextSlide(); });
				
				if (options.autoplay == true) {
					teaser.find('.timer').timeclock({ time:8, callback:nextSlide, hoverelm:elm });
				}
			}
		});
	}
	
	$.fn.timeclock = function(options) //------------------------- Timer
	{
		var defaults = {};
		defaults.time = 6; // seconds
		defaults.callback;
		defaults.hoverelm; // pauses the timer when hovered over
		defaults.src = "tmr*"; // classname icons. * is replaced by the numerical value.
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var t = $('body').find('.' + elm.attr('class')).index(this);
			var nclass;
			var n = 0;
			var str_n;
			var pause = false;
			
			if (window['timeclock_timer_' + t]) {
				clearInterval(window['timeclock_timer_' + t]);
			}
			
			window['timeclock_timer_' + t] = setInterval(function() { tick(); }, (options.time*1000)/36);
			
			if (options.hoverelm != null) {
				options.hoverelm.bind('mouseover.timeclock', function() { pause = true; });
				options.hoverelm.bind('mouseout.timeclock', function() { pause = false; });
			}
			
			function tick()
			{
				if (pause == true) { return; }
				
				if (n >= 36) {
					if (options.callback != null) {
						options.callback();
					}
					clearInterval(window['timeclock_timer_' + t]);
					return;
				}
				
				n++;
				
				if (n < 10 && n > 0) {
					str_n = '0' + n;
				} else {
					str_n = n;
				}
				
				nclass = defaults.src.replace('*', str_n);
				elm.attr('class', 'carousel_timer timer ' + nclass);
			}
		});
	}
	
	
	$.fn.removeValidationMessages = function(options) //------------------------- Remove Validations (depricated)
	{
		var defaults = {};
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			$('.msg-validate').remove();
			$('.warning').removeClass('warning');
		});
	}

	
	$.fn.clearValidation = function(options) //------------------------- Remove Validations (Form Validator)
	{
		var defaults = {};
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this).find('.warning');

			elm.each(function()
			{
				var wrapper = $(this).parents('.msg-validate');
				
				if (wrapper.size() > 0) {
					$(this).removeClass('warning');
					$(this).insertBefore(wrapper);
					wrapper.remove();
				}
			});
		});
	}

	$.fn.validate = function(options) //------------------------- Form Validator
	{
		var defaults = {};
		defaults.rules;
		defaults.zIndex = 110;
		defaults.pattern;
		defaults.msg;
		defaults.field;
		defaults.show_message = true;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var msg = '';
			var val;
			var result;
			
			if (elm.hasClass('form-hidden')) {
				return;
			}
			
			if (options.field != null) {
				val = elm.find(options.field).val();
			} else {
				val = elm.val();
			}
			
			for (i in options.rules) {
				
				//if (msg.length == 0) {
					
					switch(options.rules[i].type)
					{
						// notempty: field cannot be empty or only spaces
						case 'notempty':
							if(val.replace(/\s/g,"") == ""){
								msg = 'This field cannot be empty.';
							}
							break;
						
						// dropdownlistindexgreaterthan0: The dropdownlist selected index must be greater than 0.
						// This only works if option groups aren't being set.
						case 'dropdownlistindexgreaterthan0':
							if(elm.find('option:selected').index() <= 0){
								msg = 'Please select a value from the dropdownlist.';
							}
							break;

						// dropdownliststringisnot: The selected text of the dropdownlist cannot be equal to the passed in string.
						case 'dropdownliststringisnot':
							if(elm.find('option:selected').text() == options.rules[i].string){
								msg = 'Please select a different value - ' +  options.rules[i].string + ' is not valid.';
							}
							break;
							
						// email: email address only
						case 'email':
							pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
							if (pattern.test(String(val)) != true) {
								msg = 'Please enter a valid email address.';
							}
							
							//email: email length validation
						case 'emaillength':
							if(val.length>128) {
								msg = 'The email address is too long.';
							}
							break;
							
						// phone: phone number only
						case 'phone':
							pattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
							if (pattern.test(String(val)) != true) {
								msg = 'Please enter a number in the format:<br />(xxx) xxx-xxxx.';
							}
							break;
						
						// post: postal or zip code only
						case 'post':
							pattern = /(^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$)|(^\d{5}(-\d{4})?$)/i;
							if (pattern.test(String(val)) != true) {
								msg = 'Please provide a valid zip / post code.';
							}
							break;
						
						// alphanum: letters, numbers, dash and underscores only
						case 'alphanum':
							pattern = /^[a-z0-9-_]+$/i;
							if (pattern.test(String(val)) != true) {
								msg = 'Only letters, numbers, underscores( _ ) and dashes( - ) are allowed.';
							}
							break;
						
						// atleastone: designed for checkboxes contained in a div. Use the div as main element
						case 'atleastone':
							if (elm.find('input:checked').size() < 1) {
								msg = 'At least one item must be checked.';
							}
							break;
							
						// between: value must be between 'from' and 'to' parameters.
						case 'between':
							if (String(val).length < options.rules[i].from || String(val).length > options.rules[i].to) {
								msg = 'Must be ' + options.rules[i].from + ' to ' + options.rules[i].to + ' characters in length.';
							}
							break;
					 
            // minimum: value must be at least the 'min' parameter value.
						case 'minimum':
							if (parseInt(val, '10') < options.rules[i].min) {
								msg = 'A value of ' + options.rules[i].min + ' or more is required.';
							}
							break;
						
						// minimumlength: string value must be at least the 'min' parameter value in length.
						case 'minimumlength':
							if (String(val).length < options.rules[i].min) {
								msg = 'A length of ' + options.rules[i].min + ' or more is required.';
							}
							break;
							
						// alphanum: letters, numbers, dash and underscores only
						case 'numeric':
							val = val.replace(/,/g,'');
							val = val.replace(/\$/g,'');
							if (isNaN(val)) {
								msg = 'Value must be numeric.';
							}
							break;

						// not equal to zero
						case 'notzero':
							if (val == 0) {
								msg = 'Value must be greater or less than 0';
							}
							break;

						// greater than zero
						case 'greaterthanzero':
							val = val.replace(/,/g,'');
							if (val <= 0) {
								msg = 'Value must be greater than 0';
							}
							break;
						  
						// match: value must match a given string (use the value of a given field for confirmations)
						case 'match':
							if (String(val) != String(options.rules[i].matchval)) {
								if (elm.attr('type').toLowerCase() == 'password') {
									msg = 'Must match associated field.';
								} else {
									msg = 'Must match <br />( ' + String(options.rules[i].matchval) + ' ).';
								}
							}
							break;
						
						// regex: use your own custom regular expression
						case 'regex':
							pattern = options.pattern;
							if (pattern.test(String(val)) != true) {
								msg = options.rules[i].msg;
							}
							break;
							
						default:
						
					}
				//}
				
				if (msg != '') { break; }
			}
			
			// override default message.
			if (msg != '' && options.rules[i].msg) {
				msg = options.rules[i].msg;
			}
			
			// remove wrapped elms
			var wrapper = elm.parents('.msg-validate');

			if (wrapper.size() > 0) {
				elm.removeClass('warning');
				elm.insertBefore(wrapper);
				wrapper.remove();
			}
			
			if (msg != '') {
				
				
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

				if (options.show_message == true) {
					
					if (elm.is('select') && elm.prev().is('.selectmenu')) {
						elm = elm.prev('.selectmenu');
					}

					elm.addClass('warning');
					elm.wrap(tooltip);
				
					elm.bind('mouseover.validate focus.validate', function() { content.show(); });
					elm.bind('mouseout.validate blur.validate', function() { content.hide(); });
					tooltip.bind('mouseover.validate', function() { content.show(); });
					tooltip.bind('mouseout.validate', function() { content.hide(); });
				}
				
				result = false;
			} else {
				result = true;
			}

			if (options.onComplete != null) {
				options.onComplete(result, elm);
			}
		});
	}
	
	$.fn.convertTo = function(options) //------------------------- Currency Converter
	{
		var defaults = {};
		defaults.toField;
		defaults.ratio = 1;
		defaults.animate = true;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var timer;
			
			elm.bind('keyup', function(e)
			{
				if (e.keyCode == 38) { $(this).val(Number($(this).val()) + 1); }
				if (e.keyCode == 40) { $(this).val(Number($(this).val()) - 1); }
				
				update();
			});
			
			function update()
			{
				var new_val = elm.val() * options.ratio;
				var old_val = Number(elm.val());
				var steps = 20;
				var incr = (new_val - old_val) / steps;
				var i = 0;
				
				clearInterval(timer);
				incr = Math.round(incr * 1000) / 1000;
				
				if (options.animate == true) {
					timer = setInterval(function()
					{
						new_val = Math.round((old_val + (i*incr)) * 100) / 100;
						
						if (i > steps) {
							clearInterval(timer);
						} else {
							options.toField.val(new_val);
						}
						
						i++;
					}, 20);
				} else {
					new_val = Math.round(new_val * 100) / 100;
					options.toField.val(new_val);
				}
			}
			
			update();
		});
	}
	
	$.fn.fieldgroup = function(options) //------------------------- Field Group - allows you to clone form fields.
	{
		var defaults = {};
		defaults.maxcount = 10;
		defaults.mincount = 1;
		defaults.btn_add = '.btn-add';
		defaults.btn_del = '.btn-del';

		var options = $.extend(defaults, options);
		var count = $(this).size();
		var selector = $(this).selector;
		var has_focus = false;
		var template;
		
		return this.each(function()
		{
			var elm = $(this);
			var first_run = true;
			
			elm.find(options.btn_add).bind('click.fieldgroup', addField);
			elm.find(options.btn_del).bind('click.fieldgroup', removeField);
			elm.find(options.btn_add).bind('keydown.fieldgroup', keyEvent);
			elm.find(options.btn_del).bind('keydown.fieldgroup', keyEvent);

			elm.find('input[type="text"].format-dollar').focus();

			template = elm.clone(true);
			update();
			first_run = false;
			
			function keyEvent(e)
			{
				var keycode = e.keyCode || e.which;
				
				if (keycode == 13 && $(this).is(':focus')) {
					$(this).trigger('click.fieldgroup');
					e.preventDefault();
					e.stopPropagation();
				}
			}
			
			function addField()
			{
				if (count < options.maxcount) {
					var fieldgroup = $(this).parents(selector);
					var clone = template.clone(true);
					
					clone.insertAfter(fieldgroup);
					clone.show();
					findFirstField(clone).focus();

					if (first_run != true) { clearValues(clone); }
					count++;
				}
				
				elm.trigger('fieldgroup.update', [clone]);
				update();
			}
			
			function removeField()
			{
				if (count > options.mincount) {
					var i = $(selector + ' ' + options.btn_del).index(this);
					var fieldgroup = $(selector + ':eq(' + i +')');
					findFirstField(fieldgroup.prev()).focus();
					fieldgroup.remove();
					count--;
				}
				
				update();
			}
			
			function update()
			{
				$(selector + ' ' + options.btn_add).hide();
				$(selector + ' ' + options.btn_del).show();
				
				if ($(selector).size() > options.mincount) {
					if ($(selector).size() < options.maxcount) {
						$(selector + ' ' + options.btn_add + ':last').show();
					}
				} else {
					$(selector + ' ' + options.btn_add).show();
					$(selector + ' ' + options.btn_del).hide();
				}
				
				elm.find(selector).removeClass('last');
				elm.find(selector + ':last').addClass('last');
			}
			
			function clearValues(elm)
			{
				elm.find('input[type="text"], input[type="password"], input[type="hidden"], textarea').val("");
				elm.find('select').each(function() {
					$(this)[0].selectedIndex = 0;
				});
				elm.find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
			}

			function findFirstField(parent)
			{
				return parent.find('input, select').eq(0);
			}
		});
	}

	$.fn.cookie = function (key, value, options) { //------------------------------- Cookies
	
		if (arguments.length > 1 && String(value) !== "[object Object]") {
			
			var options = jQuery.extend({}, options);
	
			if (value === null || value === undefined) {
				options.expires = -1;
			}
	
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
	
			value = String(value);
	
			return (document.cookie = [
				encodeURIComponent(key), '=',
				options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''));
		}
	
		options = value || {};
		var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
	};
	
	$.fn.serializeField = function() //------------------------- Serialize Form Element
	{
		var o = {};
		var a = this.serializeArray();
		$.each(a, function() {
			if (o[this.name] !== undefined) {
				if (!o[this.name].push) {
					o[this.name] = [o[this.name]];
				}
				o[this.name].push(this.value || '');
			} else {
				o[this.name] = this.value || '';
			}
		});
		return o;
	};
	
	$.fn.serializeFieldArray = function()
	{
		var elm = $(this);
		var output = {};
		
		elm.each(function()
		{
			if ($(this).attr('name') !== undefined && $(this).attr('name')) {
				var parts = $(this).attr('name').split('[');
				if (!output[parts[0]]){
					output[parts[0]] = parts[1];
				}
			}
		});
		
		return output;
	}

	$.fn.message = function(options) //------------------------- Alert-Type Message
	{
		var defaults = {};
		defaults.html = 'Nothing to alert!';
		defaults.submit;
		defaults.cancel;
		defaults.style = '';
		defaults.eventElm = $('body');
		defaults.messageId = null;
		
		var options = $.extend(defaults, options);
		
		return this.each(function()
		{
			var elm = $(this);
			var screen;
			var buttons = '';
			var self = this;

			if (options.submit != null) {
						buttons += '<a class="ui-button ui-button-b btn-submit" style="margin-top:20px;" tabindex="0"><span class="label">' + options.submit + '</span></a>';
			}

			if (options.cancel != null) {
						buttons += '<a class="ui-button ui-button-b btn-cancel" style="margin-top:20px;" tabindex="0"><span class="label">' + options.cancel + '</span></a>';
			}

			if (options.messageId != null){
				screen = $('<div id="' + options.messageId + '" class="ui-dialog-screen alert" tabIndex="0"><div class="ui-dialog alert" style="' + options.style + '">' + options.html + '<br />' + buttons + '</div></div>');
			} else {
				screen = $('<div class="ui-dialog-screen alert" tabIndex="0"><div class="ui-dialog alert" style="' + options.style + '">' + options.html + '<br />' + buttons + '</div></div>');
			}

			elm.append(screen);
			screen.focus();
			screen.on('keypress', function(e)
			{
				var keycode = (e.which) ? e.which : e.keyCode;
				
				// escape key
				if (keycode == '27') {
					close();
				}

				// tab key
				if (keycode == '9' && elm.find('.alert .btn-cancel').is(':focus')) {
					e.preventDefault();
					$(this).find('.alert .btn-submit').focus();
				}
			});

			elm.find('.alert .btn-submit').on('click',function() { options.eventElm.trigger('onconfirm'); close(); });
			elm.find('.alert .btn-cancel').on('click', function() { options.eventElm.trigger('oncancel'); close(); });

			function close()
			{
				screen.remove();
				defaults.eventElm.focus();
			}
		});
	}

$.fn.focusForm = function(params) //-------------------------------------- Focus Form Field
	{

		var defaults = {};
		defaults.field = 'input:not([type="hidden"]):first';

		var options = $.extend(defaults, params);

		return this.each(function()
		{
			$(this).find(options.field).focus();
		});
}

$.fn.dialog = function(params) //-------------------------------------- Dialog Window
	{

		var defaults = {};
		var options = {};

		defaults.modal = false;
		defaults.overlay = '<div class="ui-dialog-screen" style="display:none;"></div>';
		defaults.btn_close = '.ui-btn-cancel';
		defaults.zbase = 30;
		defaults.x;
		defaults.y = 200;
		defaults.draggable = true;

		options = $.extend(defaults, params);
		
		var _pad = 10;
		var _mousex = 0;
		var _mousey = 0;
		var _boundl = _pad;
		var _boundr = $(window).width() - _pad;
		var _boundt = _pad;
		var _boundb = $(window).height() - _pad;
		var _methods = { init:_init, reset:_reset, fill:_fill, clear:_clear }
		var _args = arguments;

		var elm = $(this);
		var overlay = elm;

		return this.each(function()
		{
			if (!elm.data('dialog')) {
				elm.data('dialog', options);
			} else {
				options = elm.data('dialog');
			}

			if (_methods[params]) {
				return _methods[params].apply(this, Array.prototype.slice.call( _args, 1 ));
			} else {
				_methods.init();
			}
		});

		function _init()
		{
			if (options.modal == false) {
				// Note: id attribute required for modeless windows.
				overlay = $(options.overlay);
				overlay.attr('id', elm.attr('id'));
				elm.removeAttr('id').show();
				elm.wrap(overlay);
				overlay = elm.parent();
			}

			if (options.btn_close != null) {
				elm.find(options.btn_close).live('click', function() { overlay.hide(); });
			}

			elm.css({ zIndex:options.zbase });

			if (options.draggable == true) {
				elm.find('.ui-title').css({ cursor:'move' }).bind('mousedown.dialog', startDrag);
			}
			$(window).bind('resize.dialog', function() { rePosition(); });

			setPosition(options.x, options.y);
			updateDepth();
			getDefaults();
		}

		/* ------------------------------------------------------- */

		function setPosition(x, y)
		{
			if (x == null) { x = ($(window).width() - elm.width()) / 2; }
			if (y == null) { y = ($(window).height() - elm.height()) / 2; }
				
			elm.css({ left:x + 'px', top:y + 'px' });
		}

		function rePosition()
		{
			var r = elm.position().left + elm.width();
			var b = elm.position().top + elm.height();
			_boundb = $(window).height() - _pad;
			_boundr = $(window).width() - _pad;
				
			if (r > _boundr) {
				elm.css({ left:(_boundr - elm.width() - _pad) + 'px' });
			}

			if (b > _boundb) {
				elm.css({ top:(_boundb - elm.height() - _pad) + 'px' });
			}
		}

		/* ------------------------------------------------------- */

		function updateDepth()
		{
			var top;
			var elm_depth = elm.css('z-index');
			var windows = $('.ui-dialog');
			var j=0;
			
			windows.sort(function(a, b)
			{
				var z = $(a).css('z-index') - $(b).css('z-index');
				return z;
			});
			
			top = $(windows[windows.length-1]).css('z-index');
			
			for (var i=0; i<windows.length; i++) {
				if (!$(windows[i]).is(elm)) {
					$(windows[i]).css({ zIndex:options.zbase + j });
					j++;
				}
			}
			
			elm.css({ zIndex:top });
		}

		/* ------------------------------------------------------- */

		function startDrag(e)
		{
			_mousex = e.pageX - elm.position().left + $(window).scrollLeft();
			_mousey = e.pageY - elm.position().top + $(window).scrollTop();

			updateDepth();
			$(window.document).bind('mouseup.dialog', endDrag);
			$('html').live('mousemove.dialog', doDrag);
			elm.addClass('user-drag');
			document.onselectstart = function() { return false; }
		}

		function doDrag(e)
		{
			var x = e.pageX - _mousex;
			var y = e.pageY - _mousey;
				
			_b = _boundb + $(window).scrollTop();
				
			if (x < _boundl) { x = _boundl; }
			if ((x + elm.width()) > _boundr) { x = _boundr - elm.width(); }
			if (y < _boundt) { y = _boundt; }
			if ((y + elm.height()) > _b) { y = _b - elm.height(); }
				
			elm.css({ left:x+'px', top:y+'px' });
		}

		function endDrag()
		{
			$('html').die('mousemove.dialog');
			$(window.document).unbind('mouseup.dialog');
			elm.removeClass('user-drag');
			document.onselectstart = null;
		}

		/* ------------------------------------------------------- */

		function getDefaults()
		{
			elm.find('input[type="text"], input[type="password"], input[type="hidden"], textarea').each(function()
			{
				$(this).data('default_val', $(this).val());
			});

			elm.find('option').each(function()
			{
				if ($(this).attr('selected') == 'selected') {
					$(this).data('default_val', 1);
				}
			});

			elm.find('input[type="radio"], input[type="checkbox"]').each(function()
			{
				if ($(this).attr('checked') == 'checked') {
					$(this).data('default_val', 1);
				}
			});
		}

		/* ------------------------------------------------------- */

		function _reset()
		{
			elm.find('input[type="text"], input[type="password"], input[type="hidden"], textarea').each(function()
			{
				$(this).val($(this).data('default_val'));
			});

			elm.find('option').each(function()
			{
				if ($(this).data('default_val') == 1) {
					$(this).attr('selected','selected');
				}
			});

			elm.find('input[type="radio"], input[type="checkbox"]').each(function()
			{
				if ($(this).data('default_val') == 1) {
					$(this).attr('selected','selected');
				}
			});
		}

		function _fill(source)
		{
			var field;
			_methods.clear();
			elm.clearValidation();
				
			elm.find('input').each(function()
			{
				field = source.find('.' + $(this).attr('id'));
					
				if ($(this).is('input[type="text"]') || $(this).is('input[type="password"]') || $(this).is('input[type="hidden"]')) {
					$(this).val(field.val());
				}

				if ($(this).is('input[type="checkbox"]')) {
					if (field.val() == 'true') {
						$(this).attr('checked', 'checked');
					} else {
						$(this).removeAttr('checked');
					}
				}

				if ($(this).is('input[type="radio"]')) {
					field = source.find('.' + $(this).attr('name'));

					if ($(this).val() == field.val()) {
						$(this).attr('checked', 'checked');
					} else {
						$(this).removeAttr('checked');
					}
				}
			});

			elm.find('option').each(function()
			{
				field = source.find('.' + $(this).parent().attr('id'));
				if ($(this).val() == field.val()) {
					$(this).attr('selected', 'selected');
				} else {
					if (!$(this).parent().attr('multiple')) {
						$(this).removeAttr('selected');
					}
				}
			});

			elm.find('textarea').each(function()
			{
				field = source.find('.' + $(this).attr('id'));
				$(this).val(field.val());
			});

			overlay.show();
		}

		function _clear()
		{
			elm.find('input[type="text"], input[type="password"], input[type="hidden"], textarea').val("");
			if (elm.find('select').size() > 0) { elm.find('select')[0].selectedIndex = 0; }
			elm.find('input[type="checkbox"], input[type="radio"]').removeAttr('checked');
		}
	}
	

	$.fn.slider = function(options) //------------------------- Slider
	{
		var defaults = {};
		defaults.label = 'Label';
		defaults.min = 0;
		defaults.max = 100;;
		defaults.value = 0;
		defaults.step = 1;
		defaults.separatorString = ' - ';
		defaults.wholeNumbers = true;
		
		var options = $.extend(defaults, options);
		var _mouseX;
		var _boundLeft;
		var _boundRight;
		var _pos1;
		var _pos2;
		var _range = options.max - options.min;
		
		return this.each(function()
		{
			var elm = $(this);
			var slider = $('<div class="slider" id="' + elm.attr('id') + '"></div>');
			var label = $('<label class="control-label">' + options.label + '</label>');
			var field = $('<div class="slider-field"></div>');
			var bar = $('<div class="slider-bar" style="position:relative;"></div>');
			var gutter = $('<div class="slider-gutter"></div>');
			var ind = $('<div class="slider-ind"></div>');
			var handle1 = $('<div class="slider-handle" style="position:absolute; top:0; left:0;"></div>');
			var handle2;

			options.min = Number(options.min);
			options.max = Number(options.max);

			slider.append(label);
			slider.append(field);
			slider.append(bar);
			gutter.append(ind);
			bar.append(gutter);
			bar.append(handle1);
			elm.html(slider);

			gutter.css({width:gutter.width() + 'px' });

			var val = String(options.value).split(',');
			val = val.sort(function(a,b){return a - b});
			val[0] = Number(val[0]);
			val[1] = Number(val[1]);

			if (val[0] < options.min) { val[0] = options.min; }
			if (val[0] > options.max) { val[0] = options.max; }
			if (val[1] < options.min) { val[1] = options.min; }
			if (val[1] > options.max) { val[1] = options.max; }
			
			_pos1 = Math.round(((val[0] - options.min) / (options.max - options.min)) * gutter.width());
			setValue(handle1, _pos1);
			
			if (!isNaN(val[1])) {
				handle2 = handle1.clone();
				handle2.insertAfter(handle1);
				_pos2 = Math.round(((val[1] - options.min) / (options.max - options.min)) * gutter.width());
				setValue(handle2, _pos2);
			}
			
			slider.find('.slider-handle').bind('mousedown touchstart', startDrag);
			slider.find('.slider-gutter').bind('click', jumpTo);

			function jumpTo(e)
			{
				if(e.originalEvent.touches && e.originalEvent.touches.length) {
					e = e.originalEvent.touches[0];
				} else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					e = e.originalEvent.changedTouches[0];
				}

				var hx = e.pageX - $(this).offset().left;
				var dist1 = Math.abs(handle1.position().left - hx);
				var dist2 = 0;
				var dist = dist1;

				if (handle2 != null) {
					dist2 = Math.abs(handle2.position().left - hx);
					dist = Math.min(dist1, dist2);
				}

				if (dist == dist1) {
					setValue(handle1, hx);
				} else {
					setValue(handle2, hx);
				}
			}

			function startDrag(e)
			{
				e.preventDefault();

				if(e.originalEvent.touches && e.originalEvent.touches.length) {
					e = e.originalEvent.touches[0];
				} else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					e = e.originalEvent.changedTouches[0];
				}

				var hdl = $(this);
				if (handle2 != null) {

					if (hdl.index() == 1) {
						_boundLeft = 0;
						_boundRight = handle2.position().left + (handle2.width()/2)
					} else {
						_boundLeft = handle1.position().left + (handle2.width()/2);
						_boundRight = gutter.width();
					}

				} else {
					_boundLeft = 0;
					_boundRight = gutter.width();
				}
				
				_mouseX = e.pageX - hdl.position().left - (hdl.width()/2);

				$('html').live('mousemove.slider touchmove.slider', function(e) { doDrag(e, hdl); });
				$(window.document).bind('mouseup.slider touchend.slider', function() { stopDrag(e); });
				$('html').get(0).ondrag = function () { return false; };
				$('html').get(0).onselectstart = function () { return false; };
			}

			function doDrag(e, hdl)
			{
				e.preventDefault();

				if(e.originalEvent.touches && e.originalEvent.touches.length) {
					e = e.originalEvent.touches[0];
				} else if(e.originalEvent.changedTouches && e.originalEvent.changedTouches.length) {
					e = e.originalEvent.changedTouches[0];
				}
				
				x = e.pageX - _mouseX;

				if (x > _boundRight) { x = _boundRight; }
				if (x < _boundLeft) { x = _boundLeft; }

				x = Math.round(x/options.step)*options.step;
				setValue(hdl, x);
			}

			function stopDrag()
			{
				$('html').die('mousemove.slider touchmove.slider');
				$(window.document).unbind('mouseup.slider touchend.slider');
				$('html').get(0).ondrag = null;
				$('html').get(0).onselectstart = null;
			}

			function setValue(hdl, pos)
			{
				var l;
				var w;
				var val1;
				var val2;

				if (handle2 != null) {

					l = pos;
					w = handle2.position().left - pos + (handle1.width()/2);

					if (hdl.index() == 2) {
						l = handle1.position().left + (handle1.width()/2);
						w = pos - handle1.position().left - (handle1.width()/2);
					}

					val1 = (l/gutter.width()) * _range + options.min;
					val2 = ((l+w)/gutter.width() * _range) + options.min;

					if (options.wholeNumbers == true) {
						val1 = Math.round(val1);
						val2 = Math.round(val2);
					} else {
						val1 = Math.round(val1*100)/100;
						val2 = Math.round(val2*100)/100;
					}

					field.text(val1 + options.separatorString + val2);

				} else {

					l = 0;
					w = pos;

					val1 = (w/gutter.width()) * _range + options.min;

					if (options.wholeNumbers == true) {
						val1 = Math.round(val1);
					} else {
						val1 = Math.round(val1*100)/100;
					}
					
					field.text(val1);

				}
				
				ind.css({ marginLeft:l + 'px', width:w + 'px', height:'100%' });
				hdl.css({ left:(pos - Math.round(hdl.width()/2)) + 'px' });
				elm.trigger('slider-change', [val1, val2]);
			}
		});
	}
	

$.fn.richmenu = function(options) { //------------------------- Rich Menu
	var defaults = {};
	defaults.menu = ".richmenu";
	defaults.menu_layout = ".richmenu-layout";

	var options = $.extend(defaults, options);
	
	return $(this).each(function() {
		var elm = $(this);
		var is_touchdevice = 'ontouchstart' in document.documentElement;
		var trigger = 'mouseover';

		if (is_touchdevice) { trigger = 'click'; }

		elm.find('.hlist li a').unbind(trigger);
		elm.find('.hlist li a').bind(trigger, function(e) {
			var self = $(this);
			if (trigger == 'click') {
				if ($(this).attr('class').indexOf('Menu') == 0) {
					e.preventDefault();
					;
					if ($(options.menu + ':visible').size() > 0) {
						hideMenu($(this));
					} else {
						showMenu($(this));
					}
				}

			} else {

				if ($(options.menu + ':visible').size() > 0) {
					showMenu(self);
				} else {
					clearTimeout(window.rmtimer);
					window.rmtimer = setTimeout(function() {
						showMenu(self);
					}, 300);
				}

			}
		});

		elm.unbind('mouseleave');
		elm.bind('mouseleave', function() {
			clearTimeout(window.rmtimer);
			hideMenu($(this));
		});

		function hiliteTab(obj) {
			var target = $('#' + obj.attr('class'));

			elm.find('li.selected').addClass('dim');
			if (obj.parent().hasClass('selected')) {
				obj.parent().removeClass('dim');
			}

			$('.mainnav li.hilite').removeClass('hilite');
			if (target.size() == 0) {
				$('.richmenu').hide();
				return;
			}
			obj.parent().addClass('hilite');
		}

		function dimTab(obj) {
			obj.find('.hilite').removeClass('hilite');
			obj.find('.dim').removeClass('dim');
		}

		function showMenu(obj) {
			
			var h;
			var target = $('#' + obj.attr('class'));

			if (target.size() > 0) {
				hiliteTab(obj);
			} else {
				hideMenu(elm);
			}

			if ($(options.menu + ':visible').size() > 0) {
				$(options.menu).hide();
				//target.find(options.menu_layout).css({ opacity: 0 }).animate({ opacity: 1 });
				target.show();
			} else {
				$(options.menu).hide();
				target.show();
				h = target.height();
				target.css({ height: 0 });
				target.animate({ height: h + 'px' }, 200);
			}
			currentRichNavChannel = obj.html();
			setTimeout(function() {
				richNavEvent(obj);
			}, 500);
		}
		function richNavEvent(obj) {
			if ($(options.menu + ':visible').size() > 0) {
				var mousedOverChannelName = obj.html();
				if (mousedOverChannelName == currentRichNavChannel)
					_gaq.push(['_trackEvent', 'Richnav', 'hover', mousedOverChannelName]);
			} 
		}
		function hideMenu(obj) {
			dimTab(obj);
			$(options.menu).hide()
		}
	});
}

$.fn.selectmenu = function(options) //------------------------- Custom Select Menu
	{
		var defaults = {};
		defaults.opendepth = 90; // z-index when open
		defaults.classname = 'selectmenu';
		defaults.linkmode = false;
		defaults.onSelect;
		defaults.onInit;
		defaults.width;
		defaults.value;
		
		var options = $.extend(defaults, options);
		
		return $(this).each(function()
		{
			var elm = $(this);
			var target = elm;
			var markup = '';
			var markup_id = '';
			var fieldname = elm.attr('name');
			var fieldvalue;
			var selectmenu;
			var size = elm.width();
			var closedepth = elm.css('z-index');
			var menu;
			var keypos = 0;
			var lastkey = '';
			var lockmouseover = false;
			var option;
			
			// set the form value of the field.
			if (options.value != null) {
				fieldvalue = options.value;
			} else {
				option = elm.find('option:selected');
				if (option.attr('value')) {
					fieldvalue = option.attr('value');
				} else {
					fieldvalue = '';
				}
			}
			
			// set the id of the element
			if (elm.attr('id')) {
				markup_id = ' id="' + elm.attr('id') + '"';
			}
			
			// draw the new menu
			markup += '<div class="' + options.classname + '" style="width:' + elm.width() + 'px;"><div class="label"><div class="text"></div></div>';
			markup += '<input type="button" class="keytrigger" style="position:absolute; left:-99999px; width:10px;" /><ul>';
			
			elm.find('option').each(function()
			{
				var id = '';
				if ($(this).attr('id')) { id = ' id="' + $(this).attr('id') + '"'; }
				markup += '<li' + id + '><a href="' + $(this).attr('value') + '">' + $(this).text() + '</a></li>';
			});
			
			markup += '</ul></div>';
			
			// create the new elements and hide the old
			selectmenu = $(markup);
			selectmenu.insertBefore(elm);
			elm.hide();
			
			/// if (fieldvalue != '') { selectmenu.find('.label .text').text(option.text()); }
			selectmenu.find('.label .text').text(option.text());
			
			// initialize the menu elements
			menu = selectmenu.find('ul');
			menu.find('li a').bind('click.selectmenuitem', function(e)
			{
				e.preventDefault();
				if (options.linkmode == true && $(this).attr('href') != '') {
					linkTo($(this).attr('href'));
				} else {
					setValue(menu.find('li a').index($(this)));
				}
			});
			
			menu.find('li a').bind('mouseover.selectmenuitem', function()
			{
				if (lockmouseover == true) { return; };
				$(this).addClass('hover');
			});
			
			menu.find('li a').bind('mouseout.selectmenuitem', function()
			{
				$(this).removeClass('hover');
			});
			
			selectmenu.find('.keytrigger').bind('focus.selectmenu', function()
			{
				selectmenu.find('.label').css({ outline:'3px dotted #aaaaaa' });
				$(document).keydown(function(e)
				{
					e.preventDefault();
					$(document).unbind('keydown');
					
					if (e.keyCode == 30) { showMenu(); }
					if (e.keyCode == 38 || e.keyCode == 40) { if (menu.css('display') == 'none') { showMenu(); } prevItem(); }
				});
			});
			
			selectmenu.find('.keytrigger').bind('blur.selectmenu', function()
			{
				selectmenu.find('.label').css({ outline:'none' });
				$('html').unbind('keypress.triggerselectmenu');
				hideMenu();
			});
			
			// handle show/hide events
			selectmenu.bind('click.selectmenu', function(e)
			{
				e.stopPropagation();
				hideMenus($(this));
					
				if (menu.css('display') == 'none') {
					showMenu();
				} else {
					hideMenu();
				}
			});
			
			if (options.onInit != null) {
				options.onInit();
			}
			
			
			function hideMenus(exempt) // hide all menus except this one
			{
				$('body .selectmenu').each(function()
				{
					if ($(this) != exempt) {
						hideMenu($(this));
					}
				});
			}
			
			function showMenu()
			{
				lockmouseover = false;
				menu.fadeIn('fast');
				selectmenu.css({ zIndex:options.opendepth });
				$('body').bind('click.selectmenu', function() { hideMenu(); });
				enableKeys();
			}
			
			function hideMenu(elm) // hide specified menu
			{
				if (elm == null) { elm = selectmenu; }
				
				elm.find('ul').fadeOut('fast', function() { elm.css({ zIndex:closedepth }); });
				$('body').unbind('click.selectmenu');
				disableKeys();
			}
			
			function linkTo(url)
			{
				document.location.href = url;
			}
			
			function setValue(i)
			{
				var option = target.find('option:eq(' + i + ')');
				var val = option.val();
				
				target.find('option').removeAttr('selected');
				option.attr('selected', 'selected');
				selectmenu.find('.label .text').text(option.text());
				
				if (options.onSelect != null) {
					options.onSelect(val);
				}
			}
			
			function enableKeys()
			{
				$(document).keydown(function(e)
				{
					var char = String.fromCharCode(e.which);
					e.preventDefault();
					lockmouseover = true;
					
					if (e.keyCode == 13) {
						menu.find('li a.hilighted').trigger('click.selectmenuitem');
						hideMenu();
					} else {
						
						if (e.keyCode == 38) {
							prevItem();
						} else if (e.keyCode == 40) {
							nextItem();
						} else {
							findItem(char);
						}
					}
					
					
				});
			}
			
			function disableKeys()
			{
				$(document).unbind('keydown');
			}
			
			function prevItem()
			{
				var i = menu.find('li a').index(menu.find('li a.hilighted'));
				
				if (i > 0) {
					selectItem(i-1);
				} else {
					selectItem(0);
				}
			}
			
			function nextItem()
			{
				var i = menu.find('li a').index(menu.find('li a.hilighted'));
				
				if (i < menu.find('li a').size()-1) {
					selectItem(i+1);
				}
			}
			
			function selectItem(n)
			{
				menu.find('li a').removeClass('hilighted');
				menu.find('li a:eq(' + n + ')').addClass('hilighted');
				menu.scrollTop(0);
				menu.scrollTop(menu.find('li a.hilighted').position().top - menu.position().top - menu.height() + menu.find('li a').parent().height());
				manageMouseover();
			}
			
			function findItem(c)
			{
				var found = false;
				var key;
				
				c = c.toLowerCase();
				
				menu.find('li a').each(function(i)
				{
					var self = $(this);
					
					key = String(self.html().toLowerCase()).substring(0,1);
					self.removeClass('hilighted');
					self.removeClass('hover');
					
					if (key == c) {
						
						if (key != lastkey) { keypos = -1; }
						
						if (i > keypos) {
							found = true;
							menu.scrollTop(0);
							menu.scrollTop($(this).parent().position().top - menu.position().top - menu.height() + self.parent().height());
							keypos = i;
							self.addClass('hilighted');
							
							manageMouseover();
							
							lastkey = key;
							return false;
						}
					}
				});
				
				if (found == false && c == lastkey) {
					lastkey = '';
					findItem(c);
				}
			}
			
			function manageMouseover()
			{
				$('html').bind('mousemove.selectmenu', function()
				{
					keypos = 0;
					lastkey = null;
					menu.find('li a').removeClass('hilighted');
					lockmouseover = false;
					$('html').unbind('mousemove.selectmenu');
				});
			}
			
		});
	}

	// Eof Plugins
	})(jQuery);