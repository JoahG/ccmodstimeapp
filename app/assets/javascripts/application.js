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
    // Get current time with appropriate offset
	var currentTime = new Date();
	currentTime.setHours(currentTime.getHours()+offset+(currentTime.getTimezoneOffset()/60));
    // Format time with HH:MM:SS format
    return (currentTime.getHours().toString().length > 1 ? currentTime.getHours() : "0" + currentTime.getHours()) + ":" + (currentTime.getMinutes().toString().length > 1 ? currentTime.getMinutes() : "0" + currentTime.getMinutes()) + ":" + (currentTime.getSeconds().toString().length > 1 ? currentTime.getSeconds() : "0" + currentTime.getSeconds()) + " (" + (offset >= 0 ? "+" + offset.toString(): offset.toString()) + ")";
}

var updateClocks = function() {
    $(".time").each(function(i){
        // Use data-offset attribute from each .time DOM element to getCurrentTime and set innerHTML to time
        this.innerHTML = getCurrentTime(parseInt(this.getAttribute('data-offset'),10))
    });
}

$(document).ready(function(){
	Gmaps.map.callback = function() {
    for (i=0;i<Gmaps.map.markers.length;i++) {
        // Open all marker infowindows on load
        marker = Gmaps.map.markers[i]
        marker.infowindow.open(Gmaps.map.map, Gmaps.map.markers[i].serviceObject);
        // Set to updateClocks() when marker is clicked
        google.maps.event.addListener(marker.serviceObject, 'click', (function(i) {updateClocks()})(i));
    }
    google.maps.event.addListenerOnce(Gmaps.map.map, 'idle', function(){
        // Once maps object is idle, update clocks, and setInterval to updateClocks every 250ms
    	updateClocks()
        setInterval(function(){updateClocks()}, 250)
    });
  }
});