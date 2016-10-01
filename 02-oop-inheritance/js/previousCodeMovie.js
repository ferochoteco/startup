function Movie () {
	this.arrayOfAttributes = [];
	this.observers = new ObserverList();
};

Movie.prototype.play = function(){
	var context = "Playing " + this.arrayOfAttributes['title'];
	this.notify(context);
};

Movie.prototype.stop =  function(){
	var context = "Stopped " + this.arrayOfAttributes['title'];
	this.notify(context);
};

Movie.prototype.get = function(attribute) {
 return this.arrayOfAttributes[attribute];
};

Movie.prototype.set = function(attribute, value) {
	this.arrayOfAttributes[attribute] = value;
	console.log("Attribute: " + attribute + ", Valor: " + value);
};

Movie.prototype.addObserver = function(observer){
  this.observers.add( observer );
  console.log("Observer added");
};

Movie.prototype.removeObserver = function(observer){
  this.observers.removeAt(this.observers.indexOf(observer, 0));
  console.log("Observer removed");
};

Movie.prototype.notify = function(context){
  var observerCount = this.observers.count();
  for(var i=0; i < observerCount; i++){
    this.observers.get(i).update(context);
  }
};
