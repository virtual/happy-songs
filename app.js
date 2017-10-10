let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
var config = require('./config.js');
// var spotifyApi = new SpotifyWebApi({
//   clientId : config.spotify.id,
//   clientSecret : config.spotify.secret,
//   redirectUri : 'http://localhost:3000/callback'
// });
// so this the api fetch server
var auth = '';

app.get("/test", (req, res, next)=>{
  res.json('hello');
});

var spotifyApi;
let getSpotify = function(){
  spotifyApi = new SpotifyWebApi({
    clientId : config.spotify.id,
    clientSecret : config.spotify.secret,
    redirectUri: 'http://localhost:3000/callback'
  });
  // Retrieve an access token
  spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
    //res.json(data.body['access_token']);
    auth = data.body['access_token'];
  }, function(err) {
    console.log('Something went wrong when retrieving an access token ' + err.message);
  });

  if (config.debug) console.log('A call was made to the spotify endpoint');
}

app.get("/spotify", (req, res, next)=>{
  spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(function(data){
    console.log('Artist albums', data.body);
    res.json(data.body);
  //  req.json(parse.JSON(data.body));
  // }, function(err) {
  //   console.error(err);
   });
}); 

app.listen(5000, ()=>{
  console.log('listening on port 5000 ');
  getSpotify();
});

