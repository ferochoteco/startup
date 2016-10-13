var Director = require('./director.js');
var $ = require('jquery');

var Movie = function() {
	var arrayOfAttributes = [];

	return {
		play: function(){
			console.log("Playing " + arrayOfAttributes["title"]);
		},

		stop: function(){
			console.log("Stopped " + arrayOfAttributes["title"]);
		},

		get: function(attribute) {
		 return arrayOfAttributes[attribute];
	 },

		set: function(attribute, value) {
		 arrayOfAttributes[attribute] = value;
	 }
 }

};

var alien = new Movie();
var ridleyScott = new Director("Ridley Scott");
ridleyScott.set('quotes', ['Cast is everything. ', 'Do what ...']);
alien.set('director', ridleyScott);
alien.get('director').speak(); //output: Ridley Scott says: 'Cast is...'

$('p').html(alien.get('director').get('quotes'));
