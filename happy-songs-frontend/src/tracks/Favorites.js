import React, { Component } from 'react';
import TrackBlock from './TrackBlock';

export default class Favorites extends Component{
  render(){ 
    return(
      <div>
        <h1>Favoritos</h1>
        <p>{this.props.getUser().firstName}</p>
        <TrackBlock musicData={this.props.musicData} playCount={this.props.playCount} />

      </div>
    );
  };
}