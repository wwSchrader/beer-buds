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
      registrationState: props.registrationState,
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onLoginButtonPress = this.onLoginButtonPress.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      registrationState: newProps.registrationState,
      username: '',
      password: '',
      loginButtonPressed: false,
    });
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
    if (
      this.state.username.length > 0 &&
      this.state.password.length > 0) {
        console.log('fetch request');
        let userRoute = '';
        let method = '';

        if (this.state.registrationState) {
          userRoute = 'register';
          method = 'PUT';
        } else {
          userRoute = 'login';
          method = 'POST';
        }
        let data = {
          username: this.state.username,
          password: this.state.password,
        };
        fetch('/api/users/' + userRoute, {
          method: method,
          body: JSON.stringify(data),
          headers: {'Content-Type': 'application/json'},
        })
      .then((resp) => resp.json())
      .then((res) => {
        console.log(res);
        if (res.isLoggedIn) {
          this.props.onOpenLoginAlert();
          this.props.closeLoginModal();
        }
      })
      .catch((ex) => console.log('Registration failed: ' + ex));
    }
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

  returnButtonText() {
    if (this.state.registrationState) {
      return 'Register';
    } else {
      return 'Login';
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
          {this.returnButtonText()}
        </Button>
      </Form>

    );
  }
}

export default LoginForm;
