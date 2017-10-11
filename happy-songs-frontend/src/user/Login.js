import React, { Component } from 'react'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class Login extends Component{
  constructor(){
    super();
    this.handleUpdateEmail = this.handleUpdateEmail.bind(this);
    this.handleUpdatePassword = this.handleUpdatePassword.bind(this);
    this.state = {
      email: '',
      password: ''
    }
  }
  handleUpdateEmail(event){
    this.setState({email: event.target.value});    
  }
  handleUpdatePassword(event){
    this.setState({password: event.target.value});    
  }
  submitLogin() {
    var url = 'http://localhost:3000/login';
   
    fetch(url, {
        method: "POST",
        headers:{"Content-Type":"application/json"}, 
        body: JSON.stringify(
          {
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
        <h1 className="mb-3">Login</h1>
        
          <Label for="email">Email</Label>{' '}
          <Input value={this.state.email} onChange={this.handleUpdateEmail} type="email" name="email" id="email" placeholder="you@something.com" />
        {' '}
          <Label for="password">Password</Label>{' '}
          <Input value={this.state.password} onChange={this.handleUpdatePassword} type="password" name="password" id="password"  />
        {" "}
        <Button>Submit</Button>
    
      </div>
    );
  };
}