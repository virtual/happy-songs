import React, { Component } from 'react';
import './App.css';
import TrackBlock from './tracks/TrackBlock.js';
import Feature from './features/Feature';
import Menu from './menu/Menu';
import Footer from './features/Footer';
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';

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
    this.state = {
      user:null
    }
    this.submitSignup = this.submitSignup.bind(this);
    // this.submitLogin = this.submitLogin.bind(this);
    this.logout = this.logout.bind(this);
  }

  submitSignup(signupObj) {
    return new Promise((resolve, reject)=>{
      var url = '/signup';
      axios.post(url, {
              firstName: signupObj.firstName,
              lastName: signupObj.lastName,
              email: signupObj.email,
              password: signupObj.password
            }).then((userObj) => {
               if (userObj) { 
                this.setState({
                  user:userObj.data
                }); 
                 resolve();
                } else {
                reject();
          }
      }); 
    })
  }

  logout(){
    return new Promise((resolve, reject)=>{
      axios.post('/logout').then((res)=>{
        if (res.error){
          reject(res.error);
        } else {
          resolve(res);
        }
      });
    });
  }

   
  render() { 
    return (
      <div className="App">
        <Provider userStore={new UserStore()}>
        <Router>
            <div>
              {/* here's how we are passing our user into the navbar - anytime
                a user changes from a login, the <Menu /> will get rerendered with
                the new user. No other state is handled here now. 
            */}
            <header><Menu logout={this.logout} user={this.state.user}/></header>
        <Feature/> 
            <div className="container">
              <Route exact path='/' render={() => <About />} />
              <Route path='/login' render={() => <Login history={this.props.history}  />} />
                <Route path='/signup' render={() => <SignUp submitSignup={this.submitSignup} />} />
              <Route path='/findSongs' render={() =>  <TrackBlock musicData={this.state.musicData} playCount={this.state.playCount} />} />
              <Route path='/favorites' render={()=> <Favorites musicData={this.state.musicData} playCount={this.state.playCount} />} />

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