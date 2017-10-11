import React, { Component } from 'react';
import { Media } from 'reactstrap';

export default class AlbumCover extends Component{
  render(){
    return( 
      <Media left top href={this.props.link}>
        <Media object src={this.props.cover} alt="Generic placeholder image" />
      </Media> 
    );
  };
}