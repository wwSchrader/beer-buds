import React, {Component} from 'react';
import SearchForm from './SearchForm.js';
import '../css/App.css';

/**
 * Main App Component
 */
class App extends Component {
  /**
   * Render UI
   * @returns {JSX} returns jsx for app
  */
  render() {
    return (
      <div className="App">
        <h1>Plans tonight?</h1>
        <h4>See which bars are hoppin' tonight and RSVP ahead of time!</h4>
        <h4>Remember: take a cab and drink responsibly.</h4>
        <SearchForm />
      </div>
    );
  }
}

export default App;
