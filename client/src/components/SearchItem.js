import React, {Component} from 'react';
import {Thumbnail, Col} from 'react-bootstrap';
import '../css/SearchItem.css';

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: props.searchItem,
    };
  }

  componentWillUpdate(newProps) {
    this.setState({searchItem: newProps.searchItem});
  }

  render() {
    return (
      <Col xs={12} sm={6} md={4} lg={2}>
        <Thumbnail src={this.state.searchItem.image_url}>
          <h3>{this.state.searchItem.name}</h3>
          <p>{this.state.searchItem.categories[0].title}</p>
        </Thumbnail>
      </Col>
    );
  }
}

export default SearchItem;
