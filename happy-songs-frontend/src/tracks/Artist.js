import React, { Component } from 'react';

export default class AlbumCover extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <div>
        <a href={this.props.link}>{this.props.name}</a> 
      </div>
    );
  };
}