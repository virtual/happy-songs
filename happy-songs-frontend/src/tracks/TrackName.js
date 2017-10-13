import React, { Component } from 'react';
import Play from './Play';

export default class TrackName extends Component{
  render(){ 
    return(
      <div>
        <p> {this.props.name}</p> 
      </div>
    );
  };
}