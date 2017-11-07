import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import {
  Redirect, Link
} from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

var Login = observer (class extends Component{
  constructor(){
    super();
    this.inputemailChange = this.inputemailChange.bind(this);
    this.inputpasswordChange = this.inputpasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    
    this.state = { 
      email: '',

      password: ''
      // message: '',
      // link: "",
      // success: null

    }
  }


  handleLogin() {
    // this makes an obj to retun
    return new Promise ((resolve, reject) => {
      this.props.userStore.submitLogin({
      email: this.state.email,
      password: this.state.password
    }).then((res)=>{

      if (this.props.userStore.success){
        this.props.history.push("/"); 
      }  
      resolve(res) ;
      });

    });
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
        <h1 className="mb-3">Login</h1>
        {this.props.userStore.message} - {this.props.userStore.success}
        <FormGroup>
        <Label for="email">Email</Label>{' '}
        <Input type="email" onChange={this.inputemailChange} name="email" id="email" placeholder="you@something.com" />
      </FormGroup>
        {' '}
        <FormGroup>
          <Label for="password">Password</Label>{' '}
          <Input type="password" onChange={this.inputpasswordChange} value={this.state.password} name="password" id="password"  />
        </FormGroup>
        {' '}
        <Button onClick={this.handleLogin}>Submit</Button>
        {this.state.link}
      </div>
    );
  };
});

export default withRouter(inject("userStore")(Login));