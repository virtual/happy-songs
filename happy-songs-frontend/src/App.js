import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TrackBlock from './tracks/TrackBlock.js';
import Feature from './features/Feature';
import Menu from './menu/Menu';
import Footer from './features/Footer';

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
  }
  render() {
    console.log(this.state.musicData)

    if (this.state.initialized) {
    return (
      
      <div className="App">
        <header> 
          <Menu/>
        </header>
      
        <Feature/>
        <div className="container">
        <TrackBlock musicData={this.state.musicData} />
          </div>
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="loading"><img src="./music.gif" /></div>
    )
  }

  }
}

export default App;
