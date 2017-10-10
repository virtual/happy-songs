import React, { Component } from 'react';

export default class Play extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <div>
        <a href={this.props.link}>Play</a> 
      </div>
    );
  };
}