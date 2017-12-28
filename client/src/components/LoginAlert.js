import React, {Component} from 'react';
import {Alert, Button} from 'react-bootstrap';

class LoginAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
    };

    this.hideLoginAlert = this.hideLoginAlert.bind(this);
    this.displayAlert = this.displayAlert.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showAlert: newProps.showAlert,
    });
  }

  hideLoginAlert() {
    this.props.closeAlert();
  }

  displayAlert() {
    if (this.state.showAlert) {
      return (
        <Alert
            bsStyle="success"
            onDismiss={this.hideLoginAlert}
        >
          You have successfuly logged in!
        </Alert>
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <div>
        {this.displayAlert()}
      </div>
    );
  }
}

export default LoginAlert;
