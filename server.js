let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
var config = require('./config.js');
var mongoose = require('mongoose');
var session = require('express-session');
var hash = require('password-hash');
mongoose.connect("mongodb://localhost/happysongs");
var User = require("./models/User");
var Track = require("./models/Track");
let db = mongoose.connection;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
app.use(bodyParser.json({
  type: "application/json"
}));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(session({ secret: 'assport'}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
  {email:'username', password:'password'}, 
  function(email, password, done) {
    User.findOne({ email: email }, function(error, user) {
      if (hash.verify(password, user.password)) {
        console.log('we are hereererere')
        done(null, user);
      } else if (user || !error) {
        done(error, null);
      } else {
        done(error, null);
      }
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("connected to db");
});
app.post('/getUser', (req, res, next) => {
  User.findById( req.body.user.id, (err, userObj)=>{
    if (err) {
      console.log(err);
    } else {
      console.log(userObj);
      done(null, userObj);
    }
  }) 
});


app.post("/tracks", function(req, res, next){
  if (req.user){
    var track = new Track();
    track.id = req.body.id;
    track.playCount = req.body.playCount;
    track.save((error, trackReturned) => {
      if (error) {
        next(error);
      } else {
        res.json("Track added " + trackReturned.id);
      }
    }); 
  } else {
    res.json('user not authenticated');
  }
});

app.post('/logout', (req, res)=>{
  if (req.user){
    req.logOut();
    res.json('user logged out')
  } else {
    res.json({err:{msg:"you ain't logged in", code:1}});
  }
})
  
app.post('/login',function(req, res, next){
  passport.authenticate('local', function(err, user){
    console.log(user);
    if (err){
      console.log(err);
    }
    req.logIn(user, function(error) {
      if (error) return next(error);
        res.json(user);
      });
  })(req,res, next);
});

app.get('/user', (req, res)=>{
  if (req.user){
    User.findById(req.user._id).populate('favoriteTracks').exec((err, user)=>{
      res.json(user)
    })
  } else {
    res.json({err: {msg:'aint noone signed in', code:1}});
  }
});

app.put("/tracks/:trackId", (req, res, next) => {
  if (req.user){
    Track.findOneAndUpdate({
      trackId: req.params.trackId
    }, {
      $inc: {
        playCount: 1
      }
    }, {
      upsert: true,
      new: true
    }, (error, doc) => { // the new option returns the updated obj instead of the orig
      if (error) {
        console.log(error);
        next(error);
      } else {
        User.findById(req.user._id,(err, user)=>{ 
          if (err){
            console.log(err);
          } else {
           user.favoriteTracks.push({_id: doc._id});
           user.save(function(err, user){
             res.json(user)
           });
          }
        });
      }
    });
  } else {
    res.json('you are not authenticated');
  }
});

app.get("/tracks/:id", function (req, res) {
  if (req.user){
    Track.find({
      id: req.params.id
    }, function (err, foundTrack) {
      if (err) {
        console.log('error');
      } else {
        res.json({
          trackData: foundTrack
        });
      }
    });
  } else {
    res.json('you are not authenticated');
  }
});

app.get("/tracks", (req, res, next) => {
  if(req.user){
    Track.find((err, tracks) => {
      if (err) {
        console.log(err);
        next(err);
      } else {
        res.json(tracks);
      }
    });
  } else {
    res.json('you are not authenticated');
  }
});

app.post("/tracks", (req, res, next) => {
  if (req.user){
    var track = new Track();
    track.id = req.body.id;
    track.playCount = req.body.playCount;
    track.save((error, trackReturned) => {
      if (error) {
        console.log(error);
        next(error);
      } else {
        res.json("Track added " + trackReturned.id);
      }
    });
  } else {
    res.json('you are not authenticated');
  }
});

app.post("/signup", (req, res, next) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password; 
 
  User.findOne({
    email: user.email
  },  (err, foundUser)=> { // changed to arrow notation to ref user
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      user.save((error, userReturned) => {
        if (error) {
          console.log(error);
          next(error);
        } else {
          res.json({
            userReturned: userReturned,
            found: true,
            message: "Success",
            success: true
          });
        }
      });
    }
  }); 
});

var spotifyApi;
let getSpotify = function () {
  spotifyApi = new SpotifyWebApi({
    clientId: config.spotify.id,
    clientSecret: config.spotify.secret,
    redirectUri: 'http://localhost:3000/callback'
  });

  // Retrieve an access token
  spotifyApi.clientCredentialsGrant()
    .then(function (data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
      auth = data.body['access_token'];
    }, function (err) {
      console.log('Something went wrong when retrieving an access token ' + err.message);
    });
  if (config.debug) console.log('A call was made to the spotify endpoint');
}

app.get("/spotify", (req, res, next) => {
  if (req.user){
   spotifyApi.getPlaylist('satinflame', '2TOOXGh88YHh2keEr66fMu').then(function (data) {
     res.json(data.body);
   });
  } else {
    res.json({err: {msg:"yged in", code:1}});
  }
});

app.listen(5000, () => {
  console.log('listening on port 5000 ');
  getSpotify();
});