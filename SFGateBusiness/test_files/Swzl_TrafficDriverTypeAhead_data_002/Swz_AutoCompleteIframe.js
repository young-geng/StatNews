
if ((navigator.userAgent).indexOf("MSIE") != -1) {
    window.isIE = true;
    window.isIE7 = navigator.appVersion.indexOf("MSIE 7.0;") > -1;
    window.isIE8 = navigator.appVersion.indexOf("MSIE 8.0;") > -1;
    window.isIE6 = navigator.appVersion.indexOf("MSIE 6.0;") > -1;
}
else
    window.isFireFox = true;
var strUrl = location.href;
var strUrlHash = document.location.hash;
var cellHTML = "";
var _ApplicationName = _ApplicationName || "/SalaryWizard";

var psrEventUtility = (function () {


    // it returns an object contain attributes which are appName,appFullVersion,appMajorVersion. For example,
    // appName="Microsoft Internet Explorer"
    // appFullVersion = 7.0 
    // appMajorVersion = 7

    var browser = (function () {

        function _browserDetection() {
            var nVer = navigator.appVersion;
            var nAgt = navigator.userAgent;
            var browserName = navigator.appName;
            var fullVersion = '' + parseFloat(navigator.appVersion);
            var majorVersion = parseInt(navigator.appVersion, 10);
            var nameOffset, verOffset, ix;
            // In MSIE, the true version is after "MSIE" in userAgent
            if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
                browserName = "Microsoft Internet Explorer";
                fullVersion = nAgt.substring(verOffset + 5);
            }
            // In Opera, the true version is after "Opera" 
            else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
                browserName = "Opera";
                fullVersion = nAgt.substring(verOffset + 6);
            }
            // In Chrome, the true version is after "Chrome" 
            else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
                browserName = "Chrome";
                fullVersion = nAgt.substring(verOffset + 7);
            }
            // In Safari, the true version is after "Safari" 
            else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
                browserName = "Safari";
                fullVersion = nAgt.substring(verOffset + 7);
            }
            // In Firefox, the true version is after "Firefox" 
            else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
                browserName = "Firefox";
                fullVersion = nAgt.substring(verOffset + 8);
            }
            // In most other browsers, "name/version" is at the end of userAgent 
            else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                browserName = nAgt.substring(nameOffset, verOffset);
                fullVersion = nAgt.substring(verOffset + 1);
                if (browserName.toLowerCase() == browserName.toUpperCase()) {
                    browserName = navigator.appName;
                }
            }
            // trim the fullVersion string at semicolon/space if present
            if ((ix = fullVersion.indexOf(";")) != -1) fullVersion = fullVersion.substring(0, ix);
            if ((ix = fullVersion.indexOf(" ")) != -1) fullVersion = fullVersion.substring(0, ix);
            majorVersion = parseInt('' + fullVersion, 10);
            if (isNaN(majorVersion)) {
                fullVersion = '' + parseFloat(navigator.appVersion);
                majorVersion = parseInt(navigator.appVersion, 10);
            }
            return {
                appName: browserName,
                appFullVersion: fullVersion,
                appMajorVersion: majorVersion
            };
        }
        return _browserDetection();
    })(); // dectect browser End 




    var EventUtility = function () {//constructor function
        if (typeof (Function.prototype._addParamsToEventHandler) == "undefined") {
            Function.prototype._addParamsToEventHandler = function (objParams) { // bind params to the EvnentHandler
                var objFn = this;
                var _objParams = objParams;
                return function (ev) {
                    var e = ev || window.event;
                    _objParams["event"] = e;
                    objFn.call(null, _objParams);
                };

            }
        }
    }

    EventUtility.prototype = { //--------------------make the IE be more closely to the DOM event--------

        addEventHandler: function (oTarget, sEventType, fnHandler, isCapture, objParams, sfnHandlerName) {
            var eventHandler = fnHandler._addParamsToEventHandler(objParams);
            if (browser.appName == "Firefox") // for DOM-compliant browsers
                oTarget.addEventListener(sEventType, eventHandler, isCapture | false);
            else if (browser.appName = "Microsoft Internet Explorer") { //for IE
                oTarget.attachEvent("on" + sEventType, eventHandler);
            }
            else
                oTarget["on" + sEventType] = eventHandler;

            // store the eventType and eventHandler 
            if (typeof (oTarget.EventTypes) == "undefined")
                oTarget.EventTypes = new Array();
            if (typeof (oTarget.EventTypes[sEventType]) == "undefined")
                oTarget.EventTypes[sEventType] = new Array();
            oTarget.EventTypes[sEventType][sfnHandlerName] = eventHandler;
            //-------------------------

        },
        removeEventHandler: function (oTarget, sEventType, fnHandler, isCapture, sfnHandlerName) {
            if (browser.appName == "Firefox")
                oTarget.removeEventListener(sEventType, oTarget.EventTypes[sEventType][sfnHandlerName], isCapture | false);
            else if (browser.appName = "Microsoft Internet Explorer")
                oTarget.detachEvent("on" + sEventType, oTarget.EventTypes[sEventType][sfnHandlerName]); // must move the fnHandler, do it later.
            else
                oTarget["on" + sEventType] = null;
        },
        adjustEvent: function (e) {
            var oEvent = e;
            if (browser.appName == "Firefox") {
                return oEvent;
            }
            else if (browser.appName = "Microsoft Internet Explorer") {
                oEvent.charCode = (oEvent.type == "keypress") ? oEvent.keyCode : 0;
                oEvent.eventPhase = 2;
                oEvent.isChar = (oEvent.charCode > 0);
                oEvent.pageX = oEvent.clientY + document.documentElement.scrollTop;
                oEvent.pageY = oEvent.clientX + document.documentElement.scrollLeft;
                oEvent.preventDefault = function () {
                    this.returnValue = false;
                };
                if (oEvent.type == "mouseout")
                    oEvent.relatedTarget = oEvent.toElement;
                else if (oEvent.type == "mouseover")
                    oEvent.relatedTarget = oEvent.fromElement;

                oEvent.stopPropagation = function () {
                    this.cancelBubble = true;
                };

                oEvent.target = oEvent.srcElement;
                oEvent.time = (new Date).getTime();

                return oEvent;

            } else { }
        }

    }// prototype End

    return new EventUtility();
})();

//--------------------make the IE be more closely to the DOM event (END)----




//------------------------------Element's Dimension [Begin]-------------------------------
// JScript File

var psrElementDimension = (function () {

    var d = document, w = window;
    var getOffset = function (el) {
        var top = 0, left = 0;
		if(el){
			do {
				top += el.offsetTop || 0;
				if (strUrl.indexOf("homl_default") != -1 && el.tagName.toLowerCase() == "body")
					left += 0;
				else
					left += el.offsetLeft || 0;
			} while (el = el.offsetParent);
		}
        return {
            left: left,
            top: top
        };
    }

    var ElementDimension = {
        getElementCoordinate: function (el) {
            var left = 0, right = 0, top = 0, bottom = 0;
			if(el){
				var offset = getOffset(el);
				left = offset.left;
				top = offset.top;

				right = left + el.offsetWidth;
				bottom = top + el.offsetHeight;
			}
            return {
                left: left,
                right: right,
                top: top,
                bottom: bottom
            };
        },

        getElementSize: function (el) {
			var width = 0, height = 0;
		    if(el){
				width = el.offsetWidth;
				height = el.offsetHeight;
			}
            return {
                width: width,
                height: height
            };

        }

    }// object End

    return ElementDimension;

})();

//----------------------------------------------------------------------------------------



/* auto complete swz
*   
*/


function SwzAutoCompleteIframe(et) {
    var e = psrEventUtility.adjustEvent(et);
    var source = e.target;
    var initValue = source.value;


    if (source.value.length < 2) {
        cleanAutoComplete();
        return (false);
    }

    if (e.keyCode == 9) {// for TAB key

        if (typeof (source.hideTimer) != "undefined" && source.hideTimer !== null) {
            clearTimeout(source.hideTimer);
        }
        source.hideTimer = setTimeout("cleanAutoComplete()", 100);

        source.style.color = "#000000";
        if (source.onfocus == null)
            source.select();
        return;
    }

    if (e.keyCode == 38) {
        cancelAutoCompleteTimer();
        var tbl = document.getElementById("tblAutoCompleteOptions");
        if (!tbl)
            return (false);

        if (typeof (tbl.currentSelection) == "undefined") {
            tbl.currentSelection = tbl.rows.length;
        }
        if (typeof (tbl.initailValue) == "undefined") {
            tbl.initailValue = initValue;
        }
        if (tbl.currentSelection < 0)
            tbl.currentSelection = tbl.rows.length;

        var index = tbl.currentSelection - 1;
        if (index < 0) {
            index = 0;
            tbl.currentSelection = index;

            changeAutoCompleteOption(e, tbl, tbl.rows[index].cells[0]);
            initializeTextBox(e, tbl.initailValue);
            tbl.currentSelection = tbl.rows.length;

            return (false);
        }
        changeAutoCompleteOption(e, tbl, tbl.rows[index].cells[0]);
        return (false);
    }

    if (e.keyCode == 40) {
        cancelAutoCompleteTimer();
        var tbl = document.getElementById("tblAutoCompleteOptions");
        if (!tbl)
            return (false);

        if (typeof (tbl.currentSelection) == "undefined") {
            tbl.currentSelection = -1;
        }
        if (typeof (tbl.initailValue) == "undefined") {
            tbl.initailValue = initValue;
        }

        if (tbl.currentSelection == tbl.rows.length) {
            tbl.currentSelection = -1;
        }

        var index = tbl.currentSelection + 1;
        if (index >= tbl.rows.length) {
            tbl.currentSelection = index - 1;
            changeAutoCompleteOption(e, tbl, tbl.rows[index - 1].cells[0]);
            initializeTextBox(e, tbl.initailValue);

            index = 0;
            tbl.currentSelection = -1;
            return (false);
        }
        changeAutoCompleteOption(e, tbl, tbl.rows[index].cells[0]);
        return (false);
    }

    if (e.keyCode == 27) {
        cleanAutoComplete();
    }

    if (e.keyCode == 13) {
        var tbl = document.getElementById("tblAutoCompleteOptions");
        if (!tbl)
            return (false);
        selectAutoCompleteOption(tbl);
        window.initialLocationValue = "";
        return (false);
    }

    window.clearTimeout(source.autoCompleteTimer);


    source.onkeydown = function () {
        if (e.keyCode == 13) { return (false); }
    }

    window.autoCompleteObject = source;
    source.style.background = "white url('http://swz.salary.com/SalaryWizard/Graphics/spinner.gif') 98% center no-repeat";
    source.autoCompleteTimer = window.setTimeout("AutoCompleteFromIframe()", 400);


    document.body.onclick = function () {

        var source = window.autoCompleteObject;
        if (typeof (source.hideTimer) != "undefined" && source.hideTimer !== null) {
            clearTimeout(source.hideTimer);
        }
        source.hideTimer = setTimeout("cleanAutoComplete()", 200);
    }

}
function AutoCompleteFromIframe() {
    var iframe = document.getElementById('Swzl_TrafficDriverTypeAhead');
    var source = window.autoCompleteObject;
    if (source)
        xdc.postMessage("autoComp||" + source.value, iframe.src, iframe.contentWindow);
}

function initializeTextBox(e, initValue) {
    document.getElementById(e.target.id).value = initValue;
}

function changeAutoCompleteOption(ev, table, td) {
    var e = null;
    if (window.event)
        e = window.event;
    else
        e = changeAutoCompleteOption.caller.arguments[0];

    if (e.type != "mouseover") {
        var targetObj = window.autoCompleteObject;
        var cellobj = table.rows[td.index].cells[0];
        var cellText = cellobj.innerHTML.replace("<B>", "").replace("</B>", "").replace("<b>", "").replace("</b>", "");
        if (cellText !== "(more than 20)") {
            targetObj.value = cellText;
        }
        else {
            targetObj.value = "";
        }
    }

    table.rows[td.index].cells[0].style.backgroundColor = '#B2B4BF';
    table.rows[td.index].cells[0].style.color = "#FFFFFF";
    if (table.currentSelection >= 0 && table.currentSelection < table.rows.length) {
        table.rows[table.currentSelection].cells[0].style.backgroundColor = '#FFFFFF';
        table.rows[table.currentSelection].cells[0].style.color = '#000000';
    }
    table.currentSelection = td.index;
}

function _AutoCompleteIframe(strKeyword) {
    var strAjaxPage = "";
    try {
        var strKeyword;
        var iframeobj;
        strAjaxPage = _ApplicationName +"/LayoutScripts/Swzl_LocationTypeHead.aspx";
        strKeyword = trim(strKeyword);
        strAjaxPage = strAjaxPage + "?keyword=" + strKeyword + "&pagetitle=location";

        var ajaxRequest;
        try {
            ajaxRequest = new XMLHttpRequest();
        }
        catch (e) {
            try {
                ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
            }
            catch (e) {
                try {
                    ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
                }
                catch (e) {
                    alert("Your browser doesn't support ajax!");
                    return false;
                }
            }
        }
        if (window.isIE) {
            ajaxRequest.open("GET", strAjaxPage, false);
            ajaxRequest.onreadystatechange = function () { AutoComplete_CallBack(ajaxRequest); };
            ajaxRequest.send(null);
        }
        else {
            ajaxRequest.open("GET", strAjaxPage, false);
            ajaxRequest.send(null);
            ajaxRequest.onreadystatechange = AutoComplete_CallBack(ajaxRequest);
        }
    }
    catch (e) {
        cleanAutoComplete();
    }
}
if (self == parent) {
    xdc.receiveMessage(
    function (e) {

        if (window.isIE7)
            document.location.hash = '.';
		if(e){
        ShowAutoCompleteIframe(e.data.substr(10));
		}
    },
    document.getElementById('Swzl_TrafficDriverTypeAhead').src.replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
}
else {
    xdc.receiveMessage(
    function (e) {
        if (e && e.data.indexOf("autoComp||") >= 0) {
            _AutoCompleteIframe(e.data.substr(10));
        }
    },
    decodeURIComponent(strUrlHash.replace(/^#/, '')).replace(/([^:]+:\/\/[^\/]+).*/, '$1'));
}

function AutoComplete_CallBack(ajaxRequest) {
    var str_dopeResult = "";
    var arrreturn = [];
    var leftPosition, auto_divobj;
    var parent_url = decodeURIComponent(strUrlHash.replace(/^#/, ''));
    if (ajaxRequest.readyState == 4) {
        str_dopeResult = ajaxRequest.responseText;
        if (str_dopeResult != "") {
            arrreturn = str_dopeResult.split("||||");
            str_dopeResult = arrreturn[1];
        }

        xdc.postMessage("autoComp||" +str_dopeResult, parent_url, parent);
    }
}

function isDisplayHScroll() {
    if (document.body.scrollWidth - document.body.clientWidth > 0)
        return true;
    return false;
}


function ShowAutoCompleteDivIframe(strResult) {

    var div = document.getElementById("dvAutoComplete");
    var source = window.autoCompleteObject;
	var topPosition = 0,leftPosition = 0,srcWidth = 0,srcHeight = 0,intDivWidth = 0;
	if (source) {
		topPosition = parseInt(psrElementDimension.getElementCoordinate(source).top) - 2;
		leftPosition = parseInt(psrElementDimension.getElementCoordinate(source).left);
		srcWidth = psrElementDimension.getElementSize(source).width;
		srcHeight = psrElementDimension.getElementSize(source).height;
		intDivWidth = parseInt(srcWidth);
		source.style.background = "";
    }

    if (div == null) {
        div = document.createElement("DIV");
        div.id = "dvAutoComplete";
        div.style.position = "absolute";
        div.style.borderColor = "#94A6C6";
        div.style.backgroundColor = "#FFFFFF";
        div.style.borderStyle = "solid";
        div.style.borderWidth = "1px";
        div.targetObj = source;
        if (document.all) {
            div.onmouseenter = cancelAutoCompleteTimer;
        }
        else {
            div.onmouseover = cancelAutoCompleteTimer;
        }
        div.onmouseout = function () {
            window.isInAutoCompleteClick = false;
        }
        document.body.appendChild(div);

    }
    div.style.width = intDivWidth + "px";
    if (window.isIE8)
        div.style.top = topPosition + srcHeight + "px";
    else
        div.style.top = topPosition + (srcHeight + 1) + "px";
    div.style.left = leftPosition + "px";

    div.innerHTML = strResult;
    if (div.innerHTML == "" || div.innerText == "") {
        document.body.removeChild(div);
        return;
    }
    var tbl = document.getElementById("tblAutoCompleteOptions");
    if (!tbl)
        return;
    if (tbl.rows.length < 1) {
        cleanAutoComplete();
        return (false);
    }

    if (tbl.rows.length == 1) {
        cellHTML = tbl.rows[0].cells[0].innerHTML.replace("<B>", "").replace("</B>", "").replace("<b>", "").replace("</b>", "").toLowerCase();
    }

    if (tbl.clientWidth != "") {
        if (parseInt(tbl.clientWidth) > intDivWidth && intDivWidth > 0) {
            div.style.width = parseInt(tbl.clientWidth) + "px";
        }
    }
    var tblRowLen = tbl.rows.length;
    for (var i = 0; i < tblRowLen; i++) {
        var row = tbl.rows[i];
        row.cells[0].targetObj = div.targetObj;
        row.cells[0].autoCompleteMenu = div;
        row.cells[0].className = "sal_autocomplete";
        row.cells[0].style.cursor = "pointer";
        row.cells[0].index = i;
        row.cells[0].tableObject = tbl;

        row.cells[0].onmouseover = new Function("changeAutoCompleteOption('" + div.targetObj.id + "',this.tableObject, this);");

        row.cells[0].onclick = function (e) {
            var e = psrEventUtility.adjustEvent(e || window.event);
            var cellText = this.innerHTML.replace("<B>", "").replace("</B>", "").replace("<b>", "").replace("</b>", "");
            e.stopPropagation();
            if (cellText !== "(more than 20)") {
                this.targetObj.value = cellText;
            }
            else {
                this.targetObj.value = "";
            }
            this.targetObj.style.fontStyle = "normal";
            this.targetObj.focus();
            cleanAutoComplete();
            window.initialLocationValue = "";
        }
    }

    div.style.zIndex = 999999;
}


function cancelAutoCompleteTimer() {
    var source = window.autoCompleteObject;
    if (typeof (source.hideTimer) != "undefined" && source.hideTimer !== null) {
        clearTimeout(source.hideTimer);
    }
}

function cleanAutoComplete() {

    var div = document.getElementById("dvAutoComplete");
    if (div != null) {
        document.body.removeChild(div);
    }
}


function selectAutoCompleteOption(table) {
    var source = window.autoCompleteObject;
    if (typeof (table.currentSelection) != "undefined" && table.currentSelection > 0) {
        var cellobj = table.rows[table.currentSelection].cells[0];
        var cellText = cellobj.innerHTML.replace("<B>", "").replace("</B>", "").replace("<b>", "").replace("</b>", "");
        if (cellText !== "(more than 20)") {
            source.value = cellText;
        }
        else {
            source.value = "";
        }
    }
    cleanAutoComplete();
}

function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}


function ShowAutoCompleteIframe(strResult) {
    var leftPosition, auto_divobj;
    ShowAutoCompleteDivIframe(strResult);
    var source = window.autoCompleteObject;
    auto_divobj = document.getElementById("dvAutoComplete");
    if (auto_divobj) {
        leftPosition = parseInt(psrElementDimension.getElementCoordinate(source).left);
        auto_divobj.style.left = leftPosition + "px";
    }
}
function emptySearchText(obj, isblack, havestyle) {
    if (obj) {
        if (isblack)
            obj.style.color = "black";
        var spanobj;
        spanobj = document.getElementById("errormessage");
        if (spanobj)
            spanobj.innerHTML = "";
        var InitText = obj.defaultvalue ? obj.defaultvalue : obj.getAttribute("defaultvalue");
        if (obj.value == InitText) {
            if (havestyle)
                obj.style.fontStyle = "";
            obj.value = "";
        }
    }
}
function defaultSearchText(obj, isgray, havestyle) {
    if (obj) {

        var InitText = obj.defaultvalue ? obj.defaultvalue : obj.getAttribute("defaultvalue");
        if (obj.value == "" || obj.value == InitText) {
            if (isgray)
                obj.style.color = "gray";
            if (havestyle)
                obj.style.fontStyle = "italic";
            obj.value = InitText;
        }
    }
}