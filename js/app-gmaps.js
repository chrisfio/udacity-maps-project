// Map variable
var map;
var markers = []; 
var marker, bounds, largeInfoWindow, fourSquareDate, fourSquareBaseURL;
var apiKeyFourSquare;
var apiClientFourSquare

// Function to initialize the map
function initMap() {

	fourSquareDate = formatDate(new Date());
	fourSquareBaseURL = "https://api.foursquare.com/v2/venues/";
	apiKeyFourSquare = "RLYHCNDHNQF3TZLGQQ5CXWRBVRQX5YPSGCHGALECU2BI0RGZ";
	apiClientFourSquare = "VRQPDNPRC4MJ2SB3VC0CT5H21CHXRI4UIMTYV5WI4XT1ONSU";

	// Constructor to create a new map JS object. 
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.348865, lng: -122.017846},
	  zoom: 14
	});

	largeInfoWindow = new google.maps.InfoWindow(); 
	bounds = new google.maps.LatLngBounds(); 
	
	defaultList.forEach(function(establishment){ 

		var self = this; 

		marker = new google.maps.Marker({
			position: establishment.location,
			map: map,
			id: establishment.id,
			title: establishment.name,
			animation: google.maps.Animation.DROP  
		});	
		markers.push(marker); 

		marker.addListener('click', function(){
			toggleBounce(this);
			populateInfoWindow(establishment);
		});

		bounds.extend(marker.position);

	});
	map.fitBounds(bounds);

	document.getElementById("show-button").addEventListener('click', showListings);
	document.getElementById("hide-button").addEventListener('click', hideListings);
}

function populateInfoWindow(establishment) {

	
	for(var i = 0; i < markers.length; i++){
		if(markers[i].id == establishment.id){
			marker.id = establishment.id; 
		} 
	}
	var fourSquareFullURL = fourSquareBaseURL + 
					establishment.id + 
					"?client_id=" + 
					apiClientFourSquare + 
					"&client_secret=" + 
					apiKeyFourSquare + 
					"&v=" +
					fourSquareDate;
	$.getJSON(fourSquareFullURL).done(function(data){
		establishment.rating = data.response.venue.rating; 
		establishment.ratingColor = data.response.venue.ratingColor; 
		establishment.phoneNumber = data.response.venue.contact.formattedPhone ? data.response.venue.contact.formattedPhone : "";
			// Check to make sure the infowindow is not already opened on this marker.
		if (largeInfoWindow.marker != marker) {
			largeInfoWindow.marker = marker;
			largeInfoWindow.setContent(
				'<div class="infoWindow-title"><a href="https://foursquare.com/v/' + 
					establishment.id + '">' + establishment.title + '</a></div>' +
				'<div class="infoWindow-rating">' + "Rating: " + establishment.rating + '</div>' +
				'<div class="infoWindow-phone">' + establishment.phoneNumber + '</div>' +
				'<div class="infoWindow-address">' + establishment.address + '</div>' +
				'<div class="infoWindow-cityStateZip">' + establishment.city + ", " +
				establishment.state + " " + establishment.zip + '</div>'
				);
			largeInfoWindow.open(map, marker);
			// Make sure the marker property is cleared if the infowindow is closed.
			largeInfoWindow.addListener('closeclick',function(){
				largeInfoWindow.setMarker = null;
			});
		}
	}).fail(function(){
		alert("Failure connecting to Four Square Database"); 
	});
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

