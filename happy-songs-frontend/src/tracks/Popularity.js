import React, { Component } from 'react';

export default class Popularity extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <div>
        <p>{this.props.pop}</p>
      </div>
    );
  };
}