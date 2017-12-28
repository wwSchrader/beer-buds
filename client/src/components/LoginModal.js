import React, {Component} from 'react';
import {Modal, Button} from 'react-bootstrap';
import LoginForm from './LoginForm.js';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      registrationMode: false,
    };

    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.flipRegistrationModeState = this.flipRegistrationModeState.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal,
    });
  }

  closeLoginModal() {
    this.props.closeModal();
  }

  getModalTitle() {
    if (this.state.registrationMode) {
      return 'Register';
    } else {
      return 'Login';
    }
  }

  flipRegistrationModeState() {
    this.setState({registrationMode: !this.state.registrationMode});
  }

  getRegistrationModeButtonText() {
    if (this.state.registrationMode) {
      return 'Cancel';
    } else {
      return 'Register';
    }
  }

  render() {
    return (
      <Modal
          show={this.state.showModal}
          onHide={this.closeLoginModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>{this.getModalTitle()}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm
              registrationState={this.state.registrationMode}
              onOpenLoginAlert={this.props.onOpenLoginAlert}
              closeLoginModal={this.closeLoginModal}
          />
          <Button
              onClick={this.flipRegistrationModeState}
          >
              {this.getRegistrationModeButtonText()}
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default LoginModal;
