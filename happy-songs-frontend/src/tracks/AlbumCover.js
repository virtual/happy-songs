import React, { Component } from 'react';

export default class AlbumCover extends Component{
  constructor(){
    super();
  }
  render(){
    return(
      <div>
        <a href={this.props.link}><img src={this.props.cover} /></a>
      </div>
    );
  };
}