import React, { Component } from 'react';

export default class AlbumCover extends Component{
  constructor(){
    super();
  }
  render(){
    console.log("x",this.props);
    return(
      <div>
        <img src={this.props.cover} />
      </div>
    );
  };
}