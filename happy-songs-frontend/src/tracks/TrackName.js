import React, { Component } from 'react';
import Play from './Play';

export default class TrackName extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <div>
        <p><Play link={this.props.link}/> {this.props.name}</p>
      </div>
    );
  };
}