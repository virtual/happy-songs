import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

export default class Popularity extends Component{
  constructor(){
    super();
  }
  render(){ 
    return(
      <div>
        <Badge color="primary" pill>{this.props.pop}</Badge>
      </div>
    );
  };
}