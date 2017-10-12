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
      playCount: [],
      firstName: 'Name!',
      lastName: ''
    }
    this.fetchPlayCount = this.fetchPlayCount.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    
  }
  fetchPlayCount () { 
    // wrap your
    // logic fetching all the weather api data into a method.
    var url = '/tracks/';
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
  submitSignup(signupObj) {
    var url = '/signup';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            firstName: signupObj.firstName,
            lastName: signupObj.lastName,
            email: signupObj.email,
            password: signupObj.password
          }
        )
      }).then((response)=> { 
        
      
        return response.json();
    }).then((userObj) => { // USE ARROW NOTATION TO KEEP THIS
      //console.log("userObj"+userObj); // echos in app server terminal
      // the thing returned is the thing in the res.json of the app.js save
      if (userObj !== undefined) { 
        this.setState({
          firstName: userObj.firstName,
          lastName: userObj.lastName
        }); 
       
      }  else {
        console.log('user add failed');
      }
    }); 
  }
  render() {
    console.log(this.state.musicData)
    if (this.state.initialized) {
    return (
      
      <div className="App">
       
      
        <Router>
            <div>
            <header><Menu/></header>
            Hi {this.state.firstName}
        <Feature/> 
            <div className="container">
              <Route exact path='/' render={() => <TrackBlock musicData={this.state.musicData} playCount={this.state.playCount} />} />
              <Route path='/login' render={() => <Login />} />
              <Route path='/signup' render={() => <SignUp submitSignup={this.submitSignup} />} />
              <Route path='/about' render={() => <About />} />
              
            </div>
       

        <Footer />
        </div>
        </Router>
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
