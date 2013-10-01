// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

var getCurrentTime = function(offset) {
	var currentTime = new Date();
	currentTime.setHours(currentTime.getHours()-offset/*-(currentTime.getTimezoneOffset()/60)*/);
	return currentTime.getHours() + ":" + currentTime.getMinutes() + ":" + currentTime.getSeconds();
}

var updateClocks = function() {
    $(".time").each(function(i){
        offset = parseInt(this.getAttribute('data-offset'),10)
        t = this
        t.innerHTML = getCurrentTime(offset)
    });
}

$(document).ready(function(){
	Gmaps.map.callback = function() {
    for (i=0;i<Gmaps.map.markers.length;i++) {
        marker = Gmaps.map.markers[i]
        marker.infowindow.open(Gmaps.map.map, Gmaps.map.markers[i].serviceObject);
        google.maps.event.addListener(marker.serviceObject, 'click', (function(i) {updateClocks()})(i));
    }
    google.maps.event.addListenerOnce(Gmaps.map.map, 'idle', function(){
    	updateClocks()
        setInterval(function(){updateClocks()}, 250)
    });
  }
});