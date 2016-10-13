var Director = function(_name) {
	var name = _name;
	var arrayQuotes = [];

	return {
	  getName: function() {
	   return name;
	 },

	  setName: function(_name) {
	   name = _name;
	 },

	 	set: function(attribute, value) {
		 arrayQuotes[attribute] = value;
	 },

		get: function(attribute) {
			return arrayQuotes[attribute];
		},

	 	speak: function(){
	    console.log(name + " says: '" + arrayQuotes['quotes'] + "'");
	  }
	}

};

module.exports = Director;
