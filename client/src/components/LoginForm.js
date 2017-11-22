import React, {Component} from 'react';
import {Form, ControlLabel, FormControl, FormGroup, Button}
  from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
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
    console.log('Button Press');
  }

  render() {
    return (
      <Form onSubmit={this.onLoginButtonPress}>
        <FormGroup
            controlId="userName"
        >
          <ControlLabel>Username</ControlLabel>
          <FormControl
              type="text"
              placeholder="Enter Username"
              value={this.state.username}
              onChange={this.onUsernameChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup
            controlId="password"
        >
          <ControlLabel>Password</ControlLabel>
          <FormControl
              type="current-password"
              placeholder="Enter password"
              value={this.state.password}
              onChange={this.onPasswordChange}
          />
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
