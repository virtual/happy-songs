import React, { Component } from 'react';
import { Badge } from 'reactstrap';

export default class Popularity extends Component{
  render(){  
    return(
      <div>
      <Badge color="primary" pill>{this.props.pop}</Badge>
      </div>
    );
  };
}