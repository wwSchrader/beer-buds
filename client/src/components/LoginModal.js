import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import LoginForm from './LoginForm.js';

class LoginModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };

    this.closeLoginModal = this.closeLoginModal.bind(this);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      showModal: newProps.showModal,
    });
  }

  closeLoginModal() {
    this.props.closeModal();
  }

  render() {
    return (
      <Modal
          show={this.state.showModal}
          onHide={this.closeLoginModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <LoginForm />
        </Modal.Body>
      </Modal>
    );
  }
}

export default LoginModal;
