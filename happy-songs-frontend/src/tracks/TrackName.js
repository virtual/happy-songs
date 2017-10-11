import React, { Component } from 'react';
import Play from './Play';

export default class TrackName extends Component{
  render(){ 
    return(
      <div>
        <p><Play trackid={this.props.trackid} link={this.props.link} playCount={this.props.playCount} /> {this.props.name}</p>
      </div>
    );
  };
}