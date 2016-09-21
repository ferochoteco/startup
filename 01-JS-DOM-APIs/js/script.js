$(document).ready(function() {

  var showSection = $("#hidden").fadeIn(1500);

  $.when(showSection).done(function() { //exercise 6
    $(".alias").focus();
  });

  function highlightChuckNorris(){     //exercise 10
    var joke = $("#joke").html();
    joke = joke.replace(/Chuck/g, '<span id="chuck">Chuck</span>'); // Uso /g porque a veces aparece mas de una vez Chuck Norris.
    joke = joke.replace(/Norris/g, '<span id="norris">Norris</span>'); //Los hice por separado ya que a veces no esta el nombre completo junto.
    $("#joke").html(joke);
  }

  $("#getRandomJoke").click(function(){ //exercise 7
    $.get("http://api.icndb.com/jokes/random", function(data, status) {
      if (status === 'success') {
      var id = data.value["id"];
      var joke = data.value["joke"];
      var category = data.value["categories"];
      if (category == '')
        category = "Without category";
      $("#hidden").html('<p>ID: ' + id + '</p><p id="joke">Joke: ' + joke + '</p><p>Category: ' + category + '</p>');
      highlightChuckNorris();
      }
      else {
        alert("Error");
      }
    });
  });

  function showAlbum(albumItems, releaseData) {
    var name = albumItems.name;
    var type = albumItems.type;
    var linkToSpotify = albumItems.external_urls.spotify;
    var img = albumItems.images["2"].url;

    $("#artistAlbums").append(
    '<article class="sideArticle">Nombre del album: ' + name +
    ' <p>Fecha de lanzamiento: '+ releaseData +
    ' </p><p>Tipo: ' + type +
    ' <a href="'+linkToSpotify+'">Link to spotify</a>' +
    ' <img src="'+ img + '" alt="Album image"></p></article>'
    );
  };

  function getReleaseData(albumItems){
    var albumDataURL = albumItems.href;
    $.ajax({
      type: "GET",
      url: albumDataURL,
      dataType: 'JSON',
      success: function(data) {
        var releaseData = data.release_date;
        showAlbum(albumItems, releaseData)
      },
      error: function() {
        $("#artistAlbums").html('<p class="serverError">Server error</p>');
      }
    });
  };

  function getAlbums(){
    $.ajax({
    type: "GET",
    url: "https://api.spotify.com/v1/search",
    dataType: 'JSON', //data type expected of the server response
    contentType: 'application/json; charset=utf-8', //content type used when sending data to the server
    data: {q: 'Rolling Stones', type: 'album'},
    success: function(data) {
      $.each(data.albums.items, function(iterator, albumItems) { //For each album show: name, type, image, release_date, and a link to spotify for that album.
        getReleaseData(albumItems);
      });
    },
    error: function() {
      $("#artistAlbums").html('<p class="serverError">Server error</p>');
    }
    });
  };

  getAlbums();

});
