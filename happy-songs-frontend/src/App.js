import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TrackBlock from './tracks/TrackBlock.js';

class App extends Component {
  constructor() {
    super();
    this.state = {
      initialized: false,
      musicData: ''
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
        musicData: data
      }); 
       console.log("27"+data);
    });
  }
  render() {
    console.log(this.state.musicData)

    if (this.state.initialized) {
    return (
      
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Happy Songs</h1>
        </header>
        <p className="App-intro">
        </p>
        <TrackBlock musicData={this.state.musicData} />
      </div>
    );
  } else {
    return (
      <div>try again</div>
    )
  }

  }
}

export default App;
