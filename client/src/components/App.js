import React, {Component} from 'react';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.js';
import '../css/App.css';

/**
 * Main App Component
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
    };

    this.onSearchTermUpdate = this.onSearchTermUpdate.bind(this);
  }

  onSearchTermUpdate(newSearchTerm) {
    this.setState({searchTerm: newSearchTerm});
  }

  render() {
    return (
      <div className="App">
        <h1>Plans tonight?</h1>
        <h4>See which bars are hoppin' tonight and RSVP ahead of time!</h4>
        <h4>Remember: take a cab and drink responsibly.</h4>
        <SearchForm searchTermHandler={this.onSearchTermUpdate} />
        <SearchResults searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default App;
