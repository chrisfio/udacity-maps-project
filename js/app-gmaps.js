// Map variable
var map;
var markers = []; 
var marker; 

// Function to initialize the map
function initMap() {
	// Constructor to create a new map JS object. 
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.348865, lng: -122.017846},
	  zoom: 14
	});

	var largeInfoWindow = new google.maps.InfoWindow(); 
	var bounds = new google.maps.LatLngBounds(); 

	defaultList.forEach(function(establishment){
		var marker = new google.maps.Marker({
			position: establishment.location,
			map: map,
			title: establishment.name,
			animation: google.maps.Animation.DROP  
		});

		markers.push(marker); 

		marker.addListener('click', function(){
			populateInfoWindow(this, largeInfoWindow);
			toggleBounce(this);
		});

		bounds.extend(marker.position);
	});
	map.fitBounds(bounds);
}

function populateInfoWindow(marker, infoWindow) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infoWindow.marker != marker) {
	  infoWindow.marker = marker;
	  infoWindow.setContent(
	  	'<div class="infoWindow-title">' + marker.title + '</div>' +
	  	'<div>' + marker.title + '</div>'
	  	);
	  infoWindow.open(map, marker);
	  // Make sure the marker property is cleared if the infowindow is closed.
	  infoWindow.addListener('closeclick',function(){
	    infoWindow.setMarker = null;
	  });
	}
}

function toggleBounce(marker) {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
		setTimeout(function(){
			marker.setAnimation(null); 
		}, 2800)
	}
}