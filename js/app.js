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
	name: "Turing",
	category: "img/turing1.png",
	img: "https://",
	location: "Sunnyvale, CA"
},
{
	name: "Turing",
	category: "img/turing1.png",
	img: "https://",
	location: "Sunnyvale, CA"
},
{
	name: "Turing",
	category: "img/turing1.png",
	img: "https://",
	location: "Sunnyvale, CA"
}
]

ko.applyBindings(new ViewModel()); 



