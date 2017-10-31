let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var SpotifyWebApi = require('spotify-web-api-node');
//var config = require('./config.js');
//var mongoose = require('mongoose');
//mongoose.connect("mongodb://localhost/happysongs");
var User = require("./models/User");
var Track = require("./models/Track");
var path = require('path');
app.use(express.static('./happy-songs-frontend/build'));
//let db = mongoose.connection;
//db.on("error", console.error.bind(console, "connection error: "));
//db.once("open", () => {
//  console.log("connected to db");
//});


// app.get('*', (req, res) => {
//   console.log('achoo')
//   res.sendFile(path.join(__dirname, './happy-songs-frontend/build/index.html'));
// });

app.use(bodyParser.json({
  type: "application/json"
}));

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res)=>{
  res.sendfile('index.html')
});

// ALL THINGS TRACKS
app.get("/tracks", (req, res, next) => {
  Track.find((err, tracks) => {
    if (err) {
      console.log(err);
      next(err);
    } else {
      res.json(tracks);
    }
  });
});

app.post("/tracks", (req, res, next) => {
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
});



app.put("/tracks/:trackId", (req, res, next) => {
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
      console.log(doc);
      res.json(doc);
    }
  });
});

app.get("/tracks/:id", function (req, res) {
  Track.find({
    id: req.params.id
  }, function (err, foundTrack) {
    if (err) {
      console.log('error');
    } else {
      res.json({
        trackData: foundTrack
      })
    }
  });
});

// ALL THINGS USERS
app.post("/signup", (req, res, next) => {
  var user = new User();
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  user.password = req.body.password; 
 
  // user.save((error, userReturned) => {
  //   if (error) {
  //     console.log(error);
  //     next(error);
  //   } else {
  //     res.json(userReturned);
  //   }
  // });
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
      
      console.log(user);
      user.save((error, userReturned) => {
        // currently crashes if user exists
        if (error) {
          console.log(error);
          next(error);
          //this.setState({message: message});
        } else {
          //res.json(userReturned);
          res.json({
            userReturned: userReturned,
            found: true,
            message: "Success",
            success: true
          });

        //this.props.history.push("/");
        }
      });


      // if (user) {
      //   if (email === user.email) {
      //     res.json({
      //       found: true,
      //       message: "Get the F**k out of here! that email is in use.",
      //       success: false
      //     });
      //   } else {

      //   }
      // } else {
      //   res.json({
      //     found: false,
      //     message: "No such user",
      //     success: false
      //   });
      // }


    }
  });
    
});

// borrowed from ekk
app.post('/login', function (req, res, next) { 
  var email = req.body.email;
  var password = req.body.password;
  User.findOne({
    email: email
  }, function (err, user) {
    if (err) {
      res.json({
        found: false,
        message: err,
        success: false
      });
    } else {
      if (user) {
        if (password === user.password) {
          res.json({
            found: true,
            message: "Successful Login, Welcome " + user.firstName,
            success: true,
            user: user
          });
        } else {
          res.json({
            found: true,
            message: "Bad password",
            success: false
          });
        }
      } else {
        res.json({
          found: false,
          message: "No such user",
          success: false
        });
      }
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
  //  spotifyApi.getPlaylist('satinflame', '2TOOXGh88YHh2keEr66fMu').then(function (data) {
  //    res.json(data.body);
  //  });
  res.json('aint no sunshine');
});

app.listen(5000, () => {
  console.log('listening on port 5000 ');
//  getSpotify();
});