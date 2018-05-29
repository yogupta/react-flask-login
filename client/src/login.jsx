import React, { Component } from "react";
import { Button, HelpBlock, FormGroup, FormControl, ControlLabel } from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

export default class Login extends Component{
  constructor(props){
    super(props);

    this.state = {
      username:"",
      password:""
    }

 }

  handleChange=event=>{
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleRegistration = e =>{
    e.preventDefault() ;
    let url = "http://localhost:5000/register"
    let formData  = new FormData();
    let data = this.state;
    for(let name in data) {
      formData.append(name, data[name]);
    }

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
    .then(data=>{
      localStorage.setItem('access_token', data.access_token);
      
      localStorage.setItem('username', data.username);

      if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
        window.location.replace("/")
      }else{
          alert(data.error)
      }
    }).catch(err => console.log(err));
  }

  handleSignIn = e =>{
    e.preventDefault() ;
    let url = "http://localhost:5000/login"
    let formData  = new FormData();
    let data = this.state;
    for(let name in data) {
      formData.append(name, data[name]);
    }

    fetch(url, {
      method: 'POST',
      body: formData
    }).then( res => res.json())
    .then(data=>{
      localStorage.setItem('access_token', data.access_token);
      
      localStorage.setItem('username', data.username);

      if (localStorage.getItem("access_token") !== null && localStorage.getItem("access_token")!=="undefined") {
        window.location.replace("/")
      }else{
          alert(data.error);
      }
    }).catch(err => console.log(err));
  }
  render(){
    return (
      <div className="LoginForm">
        <form>
          <FieldGroup
            id="formControlsEmail"
            type="email"
            name="username"
            label="Email address"
            value={this.state.username}
            onChange={this.handleChange}
            placeholder="Enter email"
          />
          <FieldGroup 
          id="formControlsPassword" 
          type="password"
          name="password"
          label="Password" 
          value={this.state.password}
          onChange={this.handleChange}
          placeholder="Password"
          help="Password length should be atleast 8 characters long." />

          <Button  onClick={this.handleSignIn}>Log in</Button>
          <Button onClick={this.handleRegistration}  className="pull-right"> Register</Button>
        </form>
      </div>
    );
  }
}