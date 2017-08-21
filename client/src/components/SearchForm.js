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
  }

  onSearchTermTextChange(e) {
    this.setState({searchBoxText: e.target.value});
  }

  render() {
    return (
      <Form inline>
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
