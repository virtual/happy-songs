import React, { Component } from 'react';
import Play from './Play';

export default class TrackName extends Component{
  render(){ 
    return(
      <div>
        <Play trackid={this.props.trackid} link={this.props.link} playCount={this.props.playCount} />
        <p> {this.props.name}</p> 
      </div>
    );
  };
}