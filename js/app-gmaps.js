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
	
	var fourSquareBaseURL = "https://api.foursquare.com/v2/venues/";
	var apiKeyFourSquare = "RLYHCNDHNQF3TZLGQQ5CXWRBVRQX5YPSGCHGALECU2BI0RGZ";
	var apiClientFourSquare = "VRQPDNPRC4MJ2SB3VC0CT5H21CHXRI4UIMTYV5WI4XT1ONSU";
	var fourSquareDate = formatDate(new Date());

	defaultList.forEach(function(establishment){ 

		var self = this; 

		marker = new google.maps.Marker({
			position: establishment.location,
			map: map,
			title: establishment.name,
			animation: google.maps.Animation.DROP  
		});	
		markers.push(marker); 

		marker.addListener('click', function(){
			var fourSquareFullURL = fourSquareBaseURL + 
									establishment.id + 
									"?client_id=" + 
									apiClientFourSquare + 
									"&client_secret=" + 
									apiKeyFourSquare + 
									"&v=" +
									fourSquareDate;

			$.getJSON(fourSquareFullURL).done(function(data){
				self.fourSquareRating = data.response.venue.rating; 
				self.fourSquareColor = data.response.venue.ratingColor; 
			}).fail(function(){
				alert("Failure connecting to Four Square Database"); 
			});
			toggleBounce(this);
			populateInfoWindow(this, largeInfoWindow, self.fourSquareRating);
		});

		bounds.extend(marker.position);

	});
	map.fitBounds(bounds);
}

function populateInfoWindow(marker, infoWindow, fourSquareRating) {
	// Check to make sure the infowindow is not already opened on this marker.
	if (infoWindow.marker != marker) {
	  infoWindow.marker = marker;
	  infoWindow.setContent(
		'<div class="infoWindow-title">' + marker.title + '</div>' +
		'<div>' + fourSquareRating + '</div>'
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
