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
import TrackStore from './stores/TrackStore';
import Favorites from './tracks/Favorites';
var axios = require('axios');

class App extends Component {
  constructor() {
    super();
     
    // this.submitSignup = this.submitSignup.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
      
  }


  render() {  
      console.log(this.props.trackStore)
    return (
      <div className="App">
        <Provider userStore={new UserStore()} trackStore={new TrackStore()}>
        <Router>
            <div>
            <header><Menu /></header>
            
        <Feature/> 
            <div className="container">
              <Route exact path='/' render={() => <TrackBlock />} />
              <Route path='/login' render={() => <Login history={this.props.history}  />} />
              <Route path='/signup' render={() => <SignUp history={this.props.history} />} />
              <Route path='/about' render={() => <About />} />
              <Route path='/favorites' render={()=> <Favorites />} />
            </div>
        <Footer />
        </div>
        </Router>
        </Provider>
      </div>
      );
    
  }
}

export default App;