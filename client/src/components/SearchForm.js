import React, {Component} from 'react';
import {Form, FormGroup, FormControl, Button} from 'react-bootstrap';

/**
 * Display search bar and search button.
 */
class SearchForm extends Component {
  /**
  * Render search bar and submit button
  * @returns {JSX} JSX for search bar and button
  */
  render() {
    return (
      <Form inline>
        <FormGroup controlId='searchInput'>
          <FormControl type='text' placholder='Where you at?' />
        </FormGroup>
        <Button type='submit'>
          Search
        </Button>
      </Form>
    );
  }
}

export default SearchForm;
