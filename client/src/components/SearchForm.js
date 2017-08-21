import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

/**
 * Display search bar and search button.
 */
class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchBoxText: '',
    };

    this.onSearchTermTextChange = this.onSearchTermTextChange.bind(this);
    this.onSearchButtonPress = this.onSearchButtonPress.bind(this);
  }

  handleSearchTextSubmit() {
    console.log("handle search text submit");
    this.props.searchTermHandler(this.state.searchBoxText);
  }

  onSearchButtonPress(e) {
    e.preventDefault();
    console.log("Submit button pressed");
    if (this.state.searchBoxText.length > 0) {
      this.handleSearchTextSubmit();
    }
  }

  onSearchTermTextChange(e) {
    this.setState({searchBoxText: e.target.value});
  }

  render() {
    return (
      <Form inline onSubmit={this.onSearchButtonPress}>
        <FormGroup controlId='searchInput'>
          <FormControl
              type='text'
              onChange={this.onSearchTermTextChange}
              value={this.state.searchBoxText}
              placeholder='Where you at?'
          />
        </FormGroup>
        <Button type='submit'>
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchForm;
