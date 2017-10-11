import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');
export default class Play extends Component{
  constructor(){
    super();
    this.recordPlay = this.recordPlay.bind(this);
  }
  recordPlay(event){
    console.log("Track played: " + this.props.trackid);
    // do a fetch to a route, maybe pass in the track id to the route
    // find current count in db and up one
  }
  render(){
    // (this.props.trackid)
    return( 
        <a target="_blank" href={this.props.link} onClick={this.recordPlay}><FontAwesome name='play-circle' /></a>
    );
  };
}