import React, { Component } from 'react';
import Popularity from "./Popularity";
var FontAwesome = require('react-fontawesome');
export default class Play extends Component{
  constructor(){
    super();
    this.recordPlay = this.recordPlay.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      playCount: 0
    }
  } 
  recordPlay(){
    var win = window.open(this.props.link, '_blank'); // if we don't want the window open
    
    // do a fetch to a route, maybe pass in the track id to the route
    // find current count in db and up one
    var url = 'http://localhost:3000/tracks/' + this.props.trackid;
    fetch(url, {
        method: "PUT"
      }).then(function (response) {
        //debugger;
      return response.json();
      //commented out for JSON error thing. we are now more sane.
    }).then((trackObj) => {
      if (trackObj !== undefined) { 
        this.setState({
          playCount: trackObj.playCount
        });
      }  else {
      }
    });
    return false;
  }
  componentDidMount() {
    this.setState ({
      playCount: this.props.playCount
    })
  }
  handleClick() { 
    this.recordPlay();
  }
  render(){
    return( 
      <div>
        <a onClick={this.handleClick}><FontAwesome name='play-circle' /></a>
        <Popularity pop={this.state.playCount}/>
      </div>
    );
  };
}