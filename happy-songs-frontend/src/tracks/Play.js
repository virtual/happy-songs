import React, { Component } from 'react';
var FontAwesome = require('react-fontawesome');
export default class Play extends Component{
  constructor(){
    super();
    this.recordPlay = this.recordPlay.bind(this);
  }
  recordPlay(event){
    console.log("Track played: " + this.props.trackid);
    var win = window.open(this.props.link, '_blank');
    if (win) {
        //Browser has allowed it to be opened
        win.focus();
    } else {
        //Browser has blocked it
        alert('Please allow popups for this website');
    }
    // do a fetch to a route, maybe pass in the track id to the route
    // find current count in db and up one
    var url = 'http://localhost:3000/tracks/' + this.props.trackid;
    console.log(typeof(this.props.playCount));
    console.log("LOOK UP^^^^^");
    fetch(url, {
        method: "PUT",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            playCount: this.props.playCount
          }
        )
      }).then(function (response) {
        //debugger;
      // return response.json();
      //commented out for JSON error thing. we are now more sane.
    }).then((trackObj) => {
      if (trackObj !== undefined) {
        console.log("trackObj vvv");
        console.log(trackObj);
        this.setState({
          // playCount: trackObj
        });
      }  else {
        console.log('defined');
      }
    });
    return false;
  }
  render(){
    // (this.props.trackid)
    console.log(this.props);
    return( 
        <a onClick={this.recordPlay}><FontAwesome name='play-circle' /></a>
    );
  };
}