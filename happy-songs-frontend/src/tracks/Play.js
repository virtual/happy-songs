import React, { Component } from 'react';
import Popularity from "./Popularity";
var FontAwesome = require('react-fontawesome');
var axios = require('axios');

export default class Play extends Component{

  constructor(props){
    super(props);
    this.recordPlay = this.recordPlay.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      playCount: 0
    }
  } 

  recordPlay(){   
    //var win = window.open(this.props.link, '_blank'); // if we don't want the window open
    var url = '/tracks/' + this.props.trackid;
      axios.put(url).then((trackObj) => {
        this.setState({
          playCount: trackObj.data.playCount
        });
      });      
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
        <p><a onClick={this.handleClick}><FontAwesome name='play-circle' /></a></p>
        <Popularity pop={this.state.playCount}/>
      </div>
    );
  };
}