import React, { Component } from 'react';
import './App.css';
import TrackBlock from './tracks/TrackBlock.js';
import Feature from './features/Feature';
import Menu from './menu/Menu';
import Footer from './features/Footer';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Login from './user/Login';
import SignUp from './user/SignUp';
import About from './features/About';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      musicData: '',
      playCount: []
    }
    this.fetchPlayCount = this.fetchPlayCount.bind(this);
  }
  fetchPlayCount () { 
    // wrap your
    // logic fetching all the weather api data into a method.
    var url = 'http://localhost:3000/tracks/';
    fetch(url).then(function (response) {
      return response.json();
    }).then((trackObj) => {
      if (trackObj !== undefined) {
        console.log(trackObj);
        this.setState({ 
          playCount: trackObj
        });
      }  else {
        console.log('defined');
      }
    });
  }
  componentDidMount(){
    
    fetch('/test').then(function(webObj){
      return  webObj.json();
    }).then(function(data){
      // console.log(data)
    });
    fetch('/spotify').then((webObj)=>{
      return webObj.json(); // auth token
    }).then((data)=>{
      this.setState({
        initialized: true,
        musicData: data
      }); 
      //  console.log("27"+data);
    }); 
    this.fetchPlayCount();
  }
  render() {
    console.log(this.state.musicData)

    if (this.state.initialized) {
    return (
      
      <div className="App">
       
      
        <Router>
            <div>
            <header><Menu/></header>

        <Feature/>
            <div className="container">
              <Route exact path='/' render={() => <TrackBlock musicData={this.state.musicData} playCount={this.state.playCount} />} />
              <Route path='/login' render={() => <Login />} />
              <Route path='/signup' render={() => <SignUp />} />
              <Route path='/about' render={() => <About />} />
              
            </div></div>
          </Router>

      
        
        

        <Footer />
      </div>
    );
  } else {
    return (
      <div className="loading"><img alt="Loading..." src="./music.gif" /></div>
    )
  }

  }
}

export default App;
