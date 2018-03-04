var Establishment = function(data) {
	this.name = ko.observable(data.name);
	this.category = ko.observable(data.category);
    this.img = ko.observable(data.img);
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
	Address: "Coffee",
	location: {lat: 37.3526168, lng: -122.0077989}
},
{
	name: "Tesla Store",
	category: "Automotives",
	location: {lat: 37.3575545, lng: -122.0207452}
},
{
	name: "Petsmart",
	category: "Pet Food",
	location: {lat: 37.3558834, lng: -122.0191908}
}
]

ko.applyBindings(new ViewModel()); 



