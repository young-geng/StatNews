
/*
function addLoadEvent(func) {
          var oldonload = window.onload;
          if (typeof window.onload != 'function') {
            window.onload = func;
          } else {
            window.onload = function() {
              if (oldonload) {
                oldonload();
              }
              func();
            }
          }
        } 
*/

// Create IE + others compatible event handler
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";

// Listen to message from child window
eventer(messageEvent,function(e) {
  console.log('parent received message!:  ',e.data);
  var iframe_h = e.data;
  if(iframe_h.indexOf("excitem") !== -1) { 
  var excitem_h = iframe_h.replace("excitem","");
  document.getElementById('excite_s').height = excitem_h + 'px';
  }
  
},false);

function show_poll(){

if(0 == 0) {
  var excitem_content = '<iframe id=\"excite_s\" src="https://excitem.com/nbc/web/form_new.php?station_id=c96272d77e78534c899d2d16efa837d4&id=0" width="305" height="477" style=\"border:0px;margin-bottom: 20px;\" frameborder=\"0\" allowtransparency=\"true\"></iframe>';
} else {
  var excitem_content = '<iframe id=\"excite_s\" src="https://excitem.com/nbc/web/form_new.php?station_id=c96272d77e78534c899d2d16efa837d4&id=0" width="305" height="477" style=\"border:0px;margin-bottom: 20px;\" frameborder=\"0\" allowtransparency=\"true\"></iframe>';
}
if(document.getElementById('excitemInfo')) { 
document.getElementById('excitemInfo').innerHTML = excitem_content;
document.getElementById('excitemInfo').style.paddingTop = "5px";
document.getElementById('excitemInfo').style.paddingBottom = "5px";
}
}
//window.onload = show_poll;

if(0 == 1) {
//addLoadEvent(show_poll);
show_poll();
}
