
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
	self.showButtonHighlight = ko.observable(true); 
	self.availableCategories = ko.observableArray(['All', 'Restaurants', 'Coffee', 'Bars']); 
	self.selectedCategory = ko.observable("All");

	self.mapList = ko.observableArray([]);

	defaultList.forEach(function(listItem){
		self.mapList.push(new Establishment(listItem));
	});

}

my = { viewModel: new ViewModel() };
ko.applyBindings(my.viewModel);



