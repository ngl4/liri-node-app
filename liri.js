//read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file
var keys = require("./keys");

//request npm
var request = require("request");
//moment npm
var moment = require("moment");

//---1-----------------------------------------------
//node-spotify-api npm
//`node liri.js spotify-this-song '<song name here>'`
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);


function searchSong(songName) {
  if (songName !== "") {
    spotify
      .request(
        "https://api.spotify.com/v1/search?type=track&q=" +
          songName +
          "&limit=5"
      )
      .then(function(data) {
        data.tracks.items.forEach(function(element) {
          console.log(
            "Artist Name: " +
              element.artists[0].name +
              "\nAlbum Name: " +
              element.album.name +
              "\nSong Name: " +
              element.name +
              "\nPreview Url: " +
              element.preview_url +
              "\n-------------------------------------"
          );
        });
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });
  } else {
    songName = "the+sign";
    var artistName = "ace+of+base";

    spotify
      .request(
        "https://api.spotify.com/v1/search?type=track&q=" +
          songName +
          "%20artist:" +
          artistName +
          "&limit=1"
      )
      .then(function(data) {
        data.tracks.items.forEach(function(element) {
          console.log(
            "Artist Name: " +
              element.artists[0].name +
              "\nAlbum Name: " +
              element.album.name +
              "\nSong Name: " +
              element.name +
              "\nPreview Url: " +
              element.preview_url +
              "\n-------------------------------------"
          );
        });
      })
      .catch(function(err) {
        console.error("Error occurred: " + err);
      });
  }
}

if (process.argv[2] === "spotify-this-song") {
  var nodeArgs = process.argv;
  var songName = "";
 //logic for artist name with more than one word
 for (var i = 3; i < nodeArgs.length; i++) {
   if (i > 3 && i < nodeArgs.length) {
     songName = songName + "+" + nodeArgs[i];
   } else {
     songName += nodeArgs[i];
   }
 }
  searchSong(songName);
}
//---2-----------------------------------------------
//Bands in Towns API: `node liri.js concert-this <artist/band name here>`
//var artist = process.argv[3]
if (process.argv[2] === "concert-this") {
  var nodeArgs = process.argv;
  var artistName = "";

  //logic for artist name with more than one word
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      artistName = artistName + "+" + nodeArgs[i];
    } else {
      artistName += nodeArgs[i];
    }
  }

  var query_Bands_URL =
    "https://rest.bandsintown.com/artists/" +
    artistName +
    "/events?app_id=codingbootcamp";

  request(query_Bands_URL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      console.log(JSON.parse(body).length);
      for (i = 0; i < JSON.parse(body).length; i++) {
        console.log(
          "\u2B19 Name of Venue: " +
            JSON.parse(body)[i].venue.name +
            "\n Venue Location: " +
            JSON.parse(body)[i].venue.city +
            ", " +
            JSON.parse(body)[i].venue.country +
            "\n Date of the Event: " +
            moment(JSON.parse(body)[i].datetime).format("MM/DD/YYYY") +
            "\n-------------------------------------"
        );
      }
    }
  });
}
//---3-----------------------------------------------
//`node liri.js movie-this '<movie name here>'`
if (process.argv[2] === "movie-this") {
  var nodeArgs = process.argv;
  var movieName = "";

  //logic for movie name with more than one word
  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      movieName = movieName + "+" + nodeArgs[i];
    } else {
      movieName += nodeArgs[i];
    }
  }

  var query_OMDB_URL =
    "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

  request(query_OMDB_URL, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      //console.log(JSON.parse(body));
      //console.log(query_OMDB_URL);
      console.log(
        "\x1b[35m\x1b[5m%s\x1b[0m",
        "Here is the movie you are looking for:"
      );
      console.log(
        "\u2B19 Movie Title: " +
          JSON.parse(body).Title +
          "\n\u27EB Release Year: " +
          JSON.parse(body).Year +
          "\n\u27EB IMDB Rating: " +
          JSON.parse(body).imdbRating +
          "\n\u27EB Rotten Tomatoes Rating: " +
          JSON.parse(body).Ratings[1].Value +
          "\n\u27EB Country where the movie was produced: " +
          JSON.parse(body).Country +
          "\n\u27EB Language: " +
          JSON.parse(body).Language +
          "\n\u27EB Plot: " +
          JSON.parse(body).Plot +
          "\n\u27EB Actors/Actresses: " +
          JSON.parse(body).Actors +
          "\n--------------------------------------------------------------------\n"
      );
    }
  });
}
//---4-----------------------------------------------
//`node liri.js do-what-it-says`
// Core node package for reading and writing files

if (process.argv[2] === "do-what-it-says") {
  var fs = require("fs");
  fs.readFile("random.txt", "utf8", function(error, data) {
    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    console.log(data);
    var dataArr = data.split(",");
    console.log(dataArr);

    var command = process.argv[2] = dataArr[0]; 
    var newSearch = process.argv[3] = dataArr[1]; 
    if (command === "spotify-this-song"){
      searchSong(newSearch);
    }else if (command === "movie-this"){

    }else if (command === "concert-this"){
      
    }

    
  });
}
