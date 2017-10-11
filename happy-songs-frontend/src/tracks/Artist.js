import React, { Component } from 'react';

export default class AlbumCover extends Component{
  render(){ 
    return(
      <div>
        <a href={this.props.link}>{this.props.name}</a> 
      </div>
    );
  };
}