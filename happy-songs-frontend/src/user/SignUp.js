import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
export default class SignUp extends Component{
  constructor() {
    super();
    this.submitSignup = this.submitSignup.bind(this);
    this.inputfirstnameChange = this.inputfirstnameChange.bind(this);
    this.inputlastnameChange = this.inputlastnameChange.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      password: ''
    }
  }
  /// stuff
  inputfirstnameChange(event) {
    this.setState({firstname: event.target.value});
  }
  inputlastnameChange(event) {
    this.setState({lastname: event.target.value});
  }
  inputemailChange(event) {
    this.setState({email: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  submitSignup() {
    var url = 'http://localhost:3000/signup';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            email: this.state.email,
            password: this.state.password
          }
        )
      }).then(function (response) { 
        return response.json();
    }).then((userObj) => {
      if (userObj !== undefined) { 
        //console.log(userObj); // echos in app server terminal
 
        this.setState({
          // playCount: userObj
        });
      }  else {
        console.log('user add failed');
      }
    }); 
  }
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Signup</h1>
        
        
        <FormGroup>
          <Label for="firstname">First Name</Label>{' '}
          <Input type="text" onChange={this.inputfirstnameChange} value={this.state.firstname} name="firstname" id="firstname" />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>{' '}
          <Input type="text" onChange={this.inputlastnameChange} value={this.state.lastname} name="lastname" id="lastname" />
        </FormGroup>

        <FormGroup>
        <Label for="email">Email</Label>{' '}
        <Input type="email" onChange={this.inputemailChange} value={this.state.email} name="email" id="email" placeholder="you@something.com" />
      </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password"  />
        </FormGroup>
        {' '}
        <a href="/"><Button onClick={this.submitSignup}>Submit</Button></a>
      </div>
    );
  };
}