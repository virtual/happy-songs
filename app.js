let express = require("express");
let app = express();
let bodyParser = require("body-parser");
var config = require('./config.js');
// so this the api fetch server
app.get("/test", (req, res, next)=>{
  res.json('hello');
})

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
  console.log('listening on port 5000 ' + config.spotify.id );
});