import React, {Component} from 'react';
import {Form, ControlLabel, FormControl, FormGroup, Button, HelpBlock}
  from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loginButtonPressed: false,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
  }

  onUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onPasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  onLoginButtonPress(e) {
    e.preventDefault();
    this.setState({
      loginButtonPressed: true,
    });
    console.log('Button Press');
  }

  getValidationState(text) {
    if (this.state.loginButtonPressed) {
      if (text.length > 0) {
        return 'success';
      } else {
        return 'error';
      }
    } else {
      return null;
    }
  }

  showUsernameHelpBlock() {
    if (
      this.state.loginButtonPressed &&
      this.getValidationState(this.state.username) === 'error') {
      return <HelpBlock>Please enter your username</HelpBlock>;
    } else {
      return null;
    }
  }

  showPasswordHelpBlock() {
    if (
      this.state.loginButtonPressed &&
      this.getValidationState(this.state.password) === 'error') {
      return <HelpBlock>Please enter your password</HelpBlock>;
    } else {
      return null;
    }
  }

  render() {
    let usernameHelpBlock = this.showUsernameHelpBlock();
    let passwordHelpBlock = this.showPasswordHelpBlock();
    return (
      <Form onSubmit={this.onLoginButtonPress}>
        <FormGroup
            controlId="userName"
            validationState={this.getValidationState(this.state.username)}
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
              type="text"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onUsernameChange}
          />
          <FormControl.Feedback />
          {usernameHelpBlock}
        </FormGroup>

        <FormGroup
            controlId="password"
            validationState={this.getValidationState(this.state.password)}
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
              type="current-password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onPasswordChange}
          />
          <FormControl.Feedback />
          {passwordHelpBlock}
        </FormGroup>
        <Button
            bsStyle="primary"
            type="submit"
        >
          Login
        </Button>
      </Form>

    );
  }
}

export default LoginForm;
