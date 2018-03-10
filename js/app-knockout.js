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
	
	self.populateInfoWindow = populateInfoWindow;
}

ko.applyBindings(ViewModel);




