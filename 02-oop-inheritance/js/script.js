//--------------------------------------------------------------------//
//-------------------------------Movie--------------------------------//
function Movie () {
	this.arrayOfAttributes = [];
	this.observers = new ObserverList();
	this.cast = {};
};

Movie.prototype = {

    play: function(){
      var context = "Playing " + this.arrayOfAttributes['title'];
      this.notify(context);
    },

    stop: function(){
      var context = "Stopped " + this.arrayOfAttributes['title'];
      this.notify(context);
    },

    get: function(attribute) {
		 //console.log(arrayOfAttributes[attribute]); exercise 6
     return this.arrayOfAttributes[attribute];
   },

    set: function(attribute, value) {
     this.arrayOfAttributes[attribute] = value;
		 console.log("Attribute: " + attribute + ", Valor: " + value);
   },

   addObserver: function(observer){
     this.observers.add(observer);
		 console.log("Observer added");
   },

   removeObserver: function(observer){
     this.observers.removeAt(this.observers.indexOf(observer, 0));
		 console.log("Observer removed");
   },

   notify: function(context){
     var observerCount = this.observers.count();
     for(var i=0; i < observerCount; i++){
       this.observers.get(i).update(context);
     }
   },

	 addActors: function(actors){
		 this.cast = actors;
	 },

	 getActors: function() {
		 this.cast.showActors();
	 }
};
//--------------------------------------------------------------------//
//------------------------------Actor---------------------------------//

function Actor (_firstName, _lastName, _nationality){
	var firstName = _firstName;
	var lastName = _lastName;
	var nationality = _nationality;

	return {
		getFirstName: function () {
			return firstName;
		},
		getLastName: function () {
			return lastName;
		},
		getNationality: function () {
			return nationality;
		}
	};
};

//--------------------------------------------------------------------//
//-----------------------------Actors---------------------------------//

function Actors(){
	var actors = [];

	return {
		addActor: function(actor) {
			actors.push(actor);
			console.log(actor.getFirstName() + " " + actor.getLastName() + " added");
		},

		showActors: function() {
			for (var i = 0; i < actors.length; i++) {
				console.log(actors[i].getFirstName() + " " + actors[i].getLastName() + ", " + actors[i].getNationality());
			}
		}
	}
}

//--------------------------------------------------------------------//
//-----------------------------Observer-------------------------------//

function ObserverList(){
  this.observerList = [];
}

ObserverList.prototype.add = function(obj){
  return this.observerList.push(obj);
};

ObserverList.prototype.removeAt = function( index ){
  this.observerList.splice(index, 1);
};

ObserverList.prototype.count = function(){
  return this.observerList.length;
};

ObserverList.prototype.get = function(index){
  if( index > -1 && index < this.observerList.length ){
    return this.observerList[index];
  }
};

ObserverList.prototype.indexOf = function(obj, startIndex){
  var i = startIndex;
  while( i < this.observerList.length ){
    if( this.observerList[i] === obj ){
      return i;
    }
    i++;
  }
  return -1;
};

function Observer(){
  this.update = function(ctx){
    console.log(ctx);
  };
}

//--------------------------------------------------------------------//
//------------------------DownloadableMovie---------------------------//

function DownloadableMovie() {
	// Call the parent constructor
	Movie.call(this);
};

DownloadableMovie.prototype = Object.create(Movie.prototype); // inherit Movie

DownloadableMovie.prototype.download = function(){
  console.log("Download: " + this.get("title"));
}

//--------------------------------------------------------------------//
//--------------------------Mixin Social------------------------------//

var Social = function () {};

Social.prototype = {
    share: function (friendName) {
        console.log("Sharing " + this.get("title") + " with " + friendName);
    },

    like: function () {
        console.log("Like");
    }
};

function augment(Movie, Social) {
    // only provide certain methods
    if ( arguments[2] ) {
        for ( var i = 2, len = arguments.length; i < len; i++ ) {
            Movie.prototype[arguments[i]] = Social.prototype[arguments[i]];
        }
    }
    // provide all methods
    else {
        for ( var methodName in Social.prototype ) {
            if ( !Object.hasOwnProperty.call(Movie.prototype, methodName) ) {
                Movie.prototype[methodName] = Social.prototype[methodName];
            }
        }
    }
}

augment(Movie, Social);

//--------------------------------------------------------------------//
//--------------------------------------------------------------------//

var movieObserver = new Observer();
var terminator = new Movie();
var arrayOfActors = new Actors();
var morganFreeman = new Actor("Morgan", "Freeman", "American");
var jimCarrey = new Actor("Jim", "Carrey", "Canadian");
var emmaWatson = new Actor("Emma", "Watson", "English");
var ricardoDarin = new Actor("Ricardo", "Darin", "Argentinian");
terminator.set('title', 'Terminator');
terminator.addObserver(movieObserver);
