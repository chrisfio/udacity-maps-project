var Establishment = function(data) {
	this.name = data.name;
	this.address = data.address;
	this.city = data.city;
	this.state = data.state;
	this.zip = data.zip;
    this.category = data.category;
    this.show = ko.observable(data.show);
    this.location = data.location;
    this.id = data.id;   
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

my = { viewModel: new ViewModel() };
ko.applyBindings(my.viewModel);



