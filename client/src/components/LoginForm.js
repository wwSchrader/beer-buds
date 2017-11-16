import React, {Component} from 'react';
import {Form, ControlLabel, FormControl} from 'react-bootstrap';

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
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

  render() {
    return (
      <Form>
        <ControlLabel>Username</ControlLabel>
        <FormControl
            id="username"
            type="text"
            placeholder="Enter Username"
            value={this.state.username}
            onChange={this.onUsernameChange}
        />
        <ControlLabel>Password</ControlLabel>
        <FormControl
            id="password"
            type="password"
            placeholder="Enter password"
            value={this.state.password}
            onChange={this.onPasswordChange}
        />
      </Form>
    );
  }
}

export default LoginForm;
