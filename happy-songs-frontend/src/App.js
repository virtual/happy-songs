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
import {Provider} from 'mobx-react';
import UserStore from './stores/UserStore';
import Favorites from './tracks/Favorites';
var axios = require('axios');

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      musicData: '',
      playCount: [],
      firstName: '',
      lastName: '',
      email: '',
      user: { firstName: "", lastName: "", email: "" },
      success: null
    }
    this.fetchPlayCount = this.fetchPlayCount.bind(this);
    // this.submitSignup = this.submitSignup.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
     
    this.setUser = this.setUser.bind(this);
    this.getUser = this.getUser.bind(this);

  }

  setUser(user) {
    this.setState({
      user: user
    });
  }
  getUser() {
    return this.state.user;
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
  

  
  render() { 
    if (this.state.initialized) {
    return (
      <div className="App">
        <Provider userStore={new UserStore()}>
        <Router>
            <div>
            <header><Menu /></header>
            
        <Feature/> 
            <div className="container">
              <Route exact path='/' render={() => <TrackBlock getUser={this.getUser} musicData={this.state.musicData} playCount={this.state.playCount} />} />
              <Route path='/login' render={() => <Login history={this.props.history}  />} />
              <Route path='/signup' render={() => <SignUp history={this.props.history} />} />
              <Route path='/about' render={() => <About />} />
              <Route path='/favorites' render={()=> <Favorites getUser={this.getUser} musicData={this.state.musicData} playCount={this.state.playCount} />} />
            </div>
        <Footer />
        </div>
        </Router>
        </Provider>
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