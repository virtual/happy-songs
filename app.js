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

app.get("/spotify", (req, res, next)=>{
  console.log('spotify'); 
  
    // const spotifyValues = {
    //   //user: config.spotify.user,
    //   clientId : config.spotify.id,
    //   clientSecret : config.spotify.secret,
    //   redirectUri : 'http://localhost:3000/callback'
    // };

      
  let spotifyApi = new SpotifyWebApi({
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
    res.json(data.body['access_token']);

    

  }, function(err) {
    console.log('Something went wrong when retrieving an access token ' + err.message);
  });

  if (config.debug) console.log('A call was made to the spotify endpoint');
  // spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(function(data) {
  //   //console.log('Artist albums', data.body);
  //  req.json(parse.JSON(data.body));
  // }, function(err) {
  //   console.error(err);
  // });
});
// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       initialized: false,
//       musicData: {}
//     }
//     this.fetchMusicData = this.fetchMusicData.bind(this);
//   }
//   fetchMusicData () {
//     //console.log(city); city was in the params
//     this.setState({
//       initialized: false
//     }); 
//     let spotifyClientId = config.clientid;
//     let spotifySecretId = config.secret;
//     var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=' + markapi;
//     fetch(url).then(function (response) {
//       return response.json();
//     }).then((weatherObj) => {
//       if (weatherObj !== undefined) {
//         this.setState({
//           initialized: true,
//           musicData: weatherObj
//         });
//       } else {
//         this.fetchMusicData();
//       }
//     });
//   }
//   componentDidMount () {
//     this.fetchMusicData();
//   }
//   render() {

//     // fetch goes here

//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

app.listen(5000, ()=>{
  console.log('listening on port 5000 ');
});