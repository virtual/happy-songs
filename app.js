let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
var config = require('./config.js');
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/happysongs");
var User = require("./models/User");
var Track = require("./models/Track");
let db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
  console.log("connected to db");
});
app.use(bodyParser.json({
  type: "application/json"
}));
app.use(bodyParser.urlencoded ({
  extended: true
}));

// ALL THINGS TRACKS
app.get("/tracks", (req, res, next)=>{
  Track.find((err, tracks)=>{
    if(err){
      console.log(err);
      next(err);
    }else{
      res.json(tracks);
    }
  });
});
app.post("/tracks", (req, res, next)=>{
  var track = new Track();
  track.id = req.body.id;
  track.playCount = req.body.playCount;
  // res.json("Yay");
  track.save((error, trackReturned)=>{
    if(error){
      console.log(error);
      next(error);
    }else{
      res.json("Track added " + trackReturned.id);
    }
  });
});
app.put("/tracks/:trackId", (req, res, next)=>{
  Track.findOneAndUpdate({
    trackId: req.params.trackId 
  }, {
    $inc: {playCount: 1}
  }, {upsert:true, new: true}, (error, doc)=>{ // the new option returns the updated obj instead of the orig
    if(error){
      console.log(error);
      next(error);
    }else{
      console.log(doc);
      res.json(doc);
    }
  });
});
app.get("/playCount/:id", (req, res, next)=>{
  if(error){
    console.log(error);
    next(error);
  }else{

  }
})
app.get("/tracks/:id", function(req, res) {
  Track.find({id: req.params.id}, function(err, foundTrack) {
    if (err) {
      console.log('error');
    } else {
      //console.log('show' + foundTrack);
      res.json({trackData: foundTrack})
    }
  }); 
});
// ALL THINGS USERS
app.post("/signup", (req, res, next)=>{
  //console.log(req.body);
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password;
  
  user.save((error, userReturned)=>{
    if(error){
      console.log(error);
      next(error);
    }else{
      res.json(userReturned);
    }
  });
})

app.post("/login", (req, res, next)=>{
  User.find({email: req.body.email, password: req.body.password}, (userObj)=>{
    if(userObj){
      console.log("Welcome");
    }else{
      console.log("LOSER");
    }
  })
});

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
  //spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(function(data){
    spotifyApi.getPlaylist('satinflame', '2TOOXGh88YHh2keEr66fMu').then(function(data){
    //https://open.spotify.com/user/satinflame/playlist/2TOOXGh88YHh2keEr66fMu
    //console.log('Artist albums', data.body);
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

