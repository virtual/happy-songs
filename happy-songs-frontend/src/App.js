import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      auth: ''
    }
  }
  componentDidMount(){
    fetch('/test').then(function(webObj){
      return  webObj.json();
    }).then(function(data){
      console.log(data)
    });
    fetch('/spotify').then((webObj)=>{
      return webObj.json(); // auth token
    }).then((data)=>{
      this.setState({
        initialized: true,
        auth: data
      }); 
      console.log(data);
    });
  }
  render() {
    
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Happy Songs</h1>
        </header>
        <p className="App-intro">
          {this.state.auth} 
          {this.state.musicData}
        </p>
      </div>
    );
  }
}

export default App;
