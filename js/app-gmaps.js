// Map variable
var map;
var markers = []; 
var marker; 
var bounds; 
var largeInfoWindow; 

// Function to initialize the map
function initMap() {

	// Constructor to create a new map JS object. 
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.348865, lng: -122.017846},
	  zoom: 14
	});

	largeInfoWindow = new google.maps.InfoWindow(); 
	bounds = new google.maps.LatLngBounds(); 
	
	var fourSquareBaseURL = "https://api.foursquare.com/v2/venues/";
	var apiKeyFourSquare = "RLYHCNDHNQF3TZLGQQ5CXWRBVRQX5YPSGCHGALECU2BI0RGZ";
	var apiClientFourSquare = "VRQPDNPRC4MJ2SB3VC0CT5H21CHXRI4UIMTYV5WI4XT1ONSU";
	var fourSquareDate = formatDate(new Date());

	my.viewModel.mapList().forEach(function(establishment){ 

		var self = this; 

		marker = new google.maps.Marker({
			position: establishment.location,
			map: map,
			title: establishment.name,
			animation: google.maps.Animation.DROP  
		});	
		markers.push(marker); 

		marker.addListener('click', function(){
			toggleBounce(this);
			populateInfoWindow(this, largeInfoWindow, establishment.rating, establishment.phoneNumber, establishment.address, formattedCityStateZip, establishment.id);
		});

		bounds.extend(marker.position);

	});
	map.fitBounds(bounds);

	document.getElementById("show-button").addEventListener('click', showListings);
	document.getElementById("hide-button").addEventListener('click', hideListings);
}

function populateInfoWindow(marker, infoWindow, fourSquareRating, phoneNumber, address, cityStateZip, id) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infoWindow.marker != marker) {
	  infoWindow.marker = marker;
	  infoWindow.setContent(
		'<div class="infoWindow-title"><a href="https://foursquare.com/v/' + 
			id + '">' + marker.title + '</a></div>' +
		'<div class="infoWindow-rating">' + "Rating: " + fourSquareRating + '</div>' +
		'<div class="infoWindow-phone">' + phoneNumber + '</div>' +
		'<div class="infoWindow-address">' + address + '</div>' +
		'<div class="infoWindow-cityStateZip">' + cityStateZip + '</div>'
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
		}, 700)
	}
}

function formatDate(date) {
	var day = ("0" + date.getDate()).slice(-2).toString(); 
	var month = ("0" + (date.getMonth()+1)).slice(-2).toString();
	var year = date.getFullYear().toString();
	return year + month + day;
}

function showListings(){
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(map);
		bounds.extend(markers[i].position); 
	}
	map.fitBounds(bounds); 
	document.getElementById("show-button").style["font-weight"] = "500";
	document.getElementById("hide-button").style["font-weight"] = "100";
}

function hideListings() {
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(null); 
	}
	document.getElementById("show-button").style["font-weight"] = "100";
	document.getElementById("hide-button").style["font-weight"] = "500";
}

