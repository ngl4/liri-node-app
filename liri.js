//to read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file ????
//var keys = require("keys.js");

//request npm
var request = require("request");

//node-spotify-api npm
//var Spotify = require('node-spotify-api');
//var spotify = new Spotify(keys.spotify);

//Bands in Towns API: `node liri.js concert-this <artist/band name here>`
//var artist = process.argv[3]
//var query_Bands_URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

//`node liri.js movie-this '<movie name here>'`
if (process.argv[2] === "movie-this") {

  var nodeArgs = process.argv;
  var movieName = "";

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
      console.log("\x1b[35m\x1b[5m%s\x1b[0m", "Here is the movie you are looking for:");
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
          JSON.parse(body).Actors
      );
    }
  });
}
