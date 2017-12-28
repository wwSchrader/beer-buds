import React, {Component} from 'react';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import LoginModal from './LoginModal.js';
import LoginAlert from './LoginAlert.js';
import {Button} from 'react-bootstrap';
import '../css/App.css';

/**
 * Main App Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      loginModal: false,
      loginAlert: false,
    };

    this.onSearchTermUpdate = this.onSearchTermUpdate.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
    this.closeLoginModal = this.closeLoginModal.bind(this);
    this.onOpenLoginAlert = this.onOpenLoginAlert.bind(this);
    this.onCloseLoginAlert = this.onCloseLoginAlert.bind(this);
  }

  onSearchTermUpdate(newSearchTerm) {
    this.setState({searchTerm: newSearchTerm});
  }

  openLoginModal() {
    this.setState({
      loginModal: true,
    });
  }

  closeLoginModal() {
    this.setState({
      loginModal: false,
    });
  }

  onOpenLoginAlert() {
    this.setState({
      loginAlert: true,
    });
  }

  onCloseLoginAlert() {
    this.setState({
      loginAlert: false,
    });
  }

  render() {
    return (
      <div className="App">
        <LoginAlert
            showAlert={this.state.loginAlert}
            closeAlert={this.onCloseLoginAlert}
        />
        <h1>Plans tonight?</h1>
        <h4>See which bars are hoppin' tonight and RSVP ahead of time!</h4>
        <h4>Remember: take a cab and drink responsibly.</h4>
        <Button onClick={this.openLoginModal}>Login Modal</Button>
        <LoginModal
            showModal={this.state.loginModal}
            closeModal={this.closeLoginModal}
            onOpenLoginAlert={this.onOpenLoginAlert}
        />
        <SearchForm searchTermHandler={this.onSearchTermUpdate} />
        <SearchResults searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
