//to read and set any environment variables with the dotenv package
require("dotenv").config();

//import keys.js file 
var keys = require("keys.js");

//request npm
var request = require("request");

//node-spotify-api npm
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);