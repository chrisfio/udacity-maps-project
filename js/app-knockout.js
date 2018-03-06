var Establishment = function(data) {
	this.name = ko.observable(data.name);
	this.address = ko.observable(data.address);
	this.city = ko.observable(data.city);
	this.state = ko.observable(data.state);
	this.zip = ko.observable(data.zip);
    this.category = ko.observable(data.category);
    this.location = ko.observable(data.location); 
}

var ViewModel = function() {
	var self = this; 

	this.mapList = ko.observableArray([]);

	defaultList.forEach(function(listItem){
		self.mapList.push(new Establishment(listItem));
	});

	this.currentEstablishment = ko.observable(this.mapList()[0]);

	this.setEstablishment = function(clickedEstablishment) {
		self.currentEstablishment(clickedEstablishment);
	};

	this.incrementCounter = function() {
		self.currentEstablishment().clickCount(self.currentEstablishment().clickCount() + 1);
	};
}

var defaultList = [
	{
		name: "Starbucks",
		address: "1003 E El Camino Real",
		city: "Sunnyvale",
		state: "CA",
		zip: "94087",
		category: "Coffee",
		id: "4b96d346f964a52011e734e3",
		location: {lat: 37.3526168, lng: -122.0077989}
	},
	{
		name: "Sharetea",
		address: "568 El Camino Real - Ste A",
		city: "Sunnyvale",
		state: "CA",
		zip: "94087",
		category: "Coffee",
		id: "56a3e74f498e2d6b3300a1e8",
		location: {lat: 37.362673, lng: -122.026963}
	},
	{
		name: "Paris Baguette",
		address: "3561 El Camino Real - Suite 75",
		city: "Santa Clara",
		state: "CA",
		zip: "95051",
		category: "Coffee",
		id: "4a62aa1af964a5206fc41fe3",
		location: {lat: 37.3537125, lng: -121.994364}
	},
	{
		name: "The Halford",
		address: "1494 Halford Ave",
		city: "Santa Clara",
		state: "CA",
		zip: "95051",
		category: "Restaurant",
		id: "57e582e6498eabc465bf18f6",
		location: {lat: 37.3514476, lng: -122.0000549}
	},
	{
		name: "Chelokababi Persian Cuisine",
		address: "1236 S Wolfe Rd",
		city: "Sunnyvale",
		state: "CA",
		zip: "94086",
		category: "Restaurant",
		id: "4b7e216bf964a520dbe32fe3",
		location: {lat: 37.3537431, lng: -122.0133126}
	},
	{
		name: "Tanto Japanese Restaurant",
		address: "1063 E El Camino Real",
		city: "Sunnyvale",
		state: "CA",
		zip: "94087",
		category: "Restaurant",
		id: "4b32cc85f964a520241425e3",
		location: {lat: 37.3526094, lng: -122.0037127}
	},
	{
		name: "The Patio Bar",
		address: "948 E El Camino Real",
		city: "Sunnyvale",
		state: "CA",
		zip: "94087",
		category: "Bar",
		id: "4bb02d05f964a5200c3b3ce3",
		location: {lat: 37.351960, lng: -122.011840}
	},
	{
		name: "Homestead Lounge",
		address: "3557 Homestead Rd",
		city: "Santa Clara",
		state: "CA",
		zip: "95051",
		category: "Bar",
		id: "4abf24f0f964a520db9020e3",
		location: {lat: 37.337928, lng: -121.994327}
	},
	{
		name: "The Local 102 Lounge",
		address: "102 E Fremont Ave",
		city: "Sunnyvale",
		state: "CA",
		zip: "94087",
		category: "Bar",
		id: "530282a7498ea36474715482",
		location: {lat: 37.351334, lng: -122.031966}
	}
]

ko.applyBindings(new ViewModel()); 



