import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {
  Redirect
} from 'react-router-dom';
export default class SignUp extends Component{
  constructor() {
    super();
    this.inputfirstNameChange = this.inputfirstNameChange.bind(this);
    this.inputlastNameChange = this.inputlastNameChange.bind(this);
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
    this.handleSignup = this.handleSignup.bind(this);
  }
  /// stuff
  handleSignup() {
    // this makes an obj to retun
    this.props.submitSignup({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
  }
  inputfirstNameChange(event) {
    this.setState({firstName: event.target.value});
  }
  inputlastNameChange(event) {
    this.setState({lastName: event.target.value});
  }
  inputemailChange(event) {
    this.setState({email: event.target.value});
  }
  inputpasswordChange(event) {
    this.setState({password: event.target.value});
  }
  render(){ 
    return(
      <div>
        <h1 className="mb-3">Signup</h1>
        <FormGroup>
          <Label for="firstName">First Name</Label>{' '}
          <Input type="text" onChange={this.inputfirstNameChange} value={this.state.firstName} name="firstName" id="firstName" />
        </FormGroup>
        <FormGroup>
          <Label for="lastName">Last Name</Label>{' '}
          <Input type="text" onChange={this.inputlastNameChange} value={this.state.lastName} name="lastName" id="lastName" />
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
        <a href="/"><Button onClick={this.handleSignup}>Submit</Button></a>
      </div>
    );
  };
}