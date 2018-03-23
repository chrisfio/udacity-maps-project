// Map variable
var map;
var markers = []; 
var marker, bounds, largeInfoWindow;
var initLaunch = true; 
var isHidden = false; 

var fourSquareDate = "20180322";
var fourSquareBaseURL = "https://api.foursquare.com/v2/venues/";
var apiKeyFourSquare = "RLYHCNDHNQF3TZLGQQ5CXWRBVRQX5YPSGCHGALECU2BI0RGZ";
var apiClientFourSquare = "VRQPDNPRC4MJ2SB3VC0CT5H21CHXRI4UIMTYV5WI4XT1ONSU";

// Function to initialize the map
function initMap() {

	// Constructor to create a new map JS object. 
	map = new google.maps.Map(document.getElementById('map'), {
	  center: {lat: 37.348865, lng: -122.017846},
	  zoom: 14
	});

	largeInfoWindow = new google.maps.InfoWindow(); 
	bounds = new google.maps.LatLngBounds(); 
	
	my.viewModel.mapList().forEach(function(establishment){ 

		var self = this; 

		marker = new google.maps.Marker({
			position: establishment.location,
			map: map,
			id: establishment.id,
			category: establishment.category,
			title: establishment.name,
			animation: google.maps.Animation.DROP  
		});	
		markers.push(marker); 

		marker.addListener('click', function(){
			populateInfoWindow(establishment);
		});

		bounds.extend(marker.position);

	});
	map.fitBounds(bounds);
}

function populateInfoWindow(establishment) {

	for(var i = 0; i < markers.length; i++){
		if(markers[i].id == establishment.id){
			marker = markers[i];
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
				establishment.id + '" target="_blank">' + establishment.name + '</a></div>' +
				'<div class="infoWindow-rating">' + "Rating: " + establishment.rating + '</div>' +
				'<div class="infoWindow-phone">' + establishment.phoneNumber + '</div>' +
				'<div class="infoWindow-address">' + establishment.address + '</div>' +
				'<div class="infoWindow-cityStateZip">' + establishment.city + ", " +
				establishment.state + " " + establishment.zip + '</div>'
				);
			if(isHidden){
				hideListings();
			}
			if (initLaunch===false){
				largeInfoWindow.open(map, marker);
				toggleBounce(marker);
				marker.setMap(map);
			}
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
		}, 700);
	}
}

function showListings(){
	initLaunch = true; 
	setTimeout(function(){
		initLaunch = false;
	},500); 
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(map);
		bounds.extend(markers[i].position); 
	}
	my.viewModel.mapList().forEach(function(establishment){ 
		establishment.show(true);
	});

	isHidden = false; 
	if(bounds){
		map.fitBounds(bounds); 
	}
	my.viewModel.showButtonHighlight(true); 
}

function hideListings() {
	for(var i = 0; i < markers.length; i++){
		markers[i].setMap(null); 
	}
	my.viewModel.mapList().forEach(function(establishment){ 
		establishment.show(false);
	});
	isHidden = true; 
	my.viewModel.showButtonHighlight(false); 
}

function filterRestaurants() {
	bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < markers.length; i++){
		if (markers[i].category === "Restaurant"){
			markers[i].setMap(map);
			bounds.extend(markers[i].position); 
		}
		else {
			markers[i].setMap(null); 
		}
	}
	initLaunch = true; 
	setTimeout(function(){
		initLaunch = false;
	},500);
	my.viewModel.mapList().forEach(function(establishment){ 
		if(establishment.category=="Restaurant"){
			establishment.show(true);
		} 
		else{
			establishment.show(false);
		} 
	});
	isHidden = false; 
	map.fitBounds(bounds); 
	my.viewModel.showButtonHighlight(true); 
}

function filterBars() {
	bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < markers.length; i++){
		if (markers[i].category === "Bar"){
			markers[i].setMap(map);
			bounds.extend(markers[i].position); 
		}
		else {
			markers[i].setMap(null); 
		}
	}
	initLaunch = true; 
	setTimeout(function(){
		initLaunch = false;
	},500);
	my.viewModel.mapList().forEach(function(establishment){ 
		if(establishment.category=="Bar"){
			establishment.show(true);
		} 
		else{
			establishment.show(false);
		} 
	});
	isHidden = false; 
	map.fitBounds(bounds); 
	my.viewModel.showButtonHighlight(true); 
}

function filterCoffee() {
	bounds = new google.maps.LatLngBounds();
	for(var i = 0; i < markers.length; i++){
		if (markers[i].category === "Coffee"){
			markers[i].setMap(map);
			bounds.extend(markers[i].position); 
		}
		else { 
			markers[i].setMap(null); 
		}
	}
	initLaunch = true; 
	setTimeout(function(){
		initLaunch = false;
	},500);
	my.viewModel.mapList().forEach(function(establishment){ 
		if(establishment.category=="Coffee"){
			establishment.show(true);
		} 
		else{
			establishment.show(false);
		} 
	});
	isHidden = false; 
	map.fitBounds(bounds); 
	my.viewModel.showButtonHighlight(true); 
}

function updateList(category){

	initLaunch = true; 
	setTimeout(function(){
		initLaunch = false;
	},500); 
	if(category==='All'){
		showListings();
	}
	else if(category==='Restaurants'){
		filterBars();
	}
	else if(category==='Bars'){
		filterRestaurants();
	}
	else if(category==='Coffee'){
		filterCoffee(); 
	}
	else{
		alert(category); 
	}
}

// Catch Google Error
function googleError() {
	alert("Unable to connect to Google Maps, check your internet connection or go to maps.google.com to check if it's a Google error");
}

window.onload = function () { 
 	initLaunch = false;
}; 

function testing(selectedCategory, category) {
	if (selectedCategory === "All"){

		showListings();
		return true; 
	}
	else if (selectedCategory === category){
		if(selectedCategory==='Coffee'){
			filterCoffee();
			return true; 
		}
		else if(selectedCategory==='Restaurant'){
			filterRestaurants();
			return true; 
		}
		else if(selectedCategory==='Bar'){
			filterBars();
			return true; 
		}
	}
	else {
		return false; 
	}
}

