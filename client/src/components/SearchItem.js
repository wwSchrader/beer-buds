import React, {Component} from 'react';
import {Thumbnail, Col, Button} from 'react-bootstrap';
import '../css/SearchItem.css';

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: props.searchItem,
    };
  }

  componentReceiveProps(newProps) {
    this.setState({searchItem: newProps.searchItem});
  }

  render() {
    return (
      <Col xs={12} sm={6} md={4} lg={2}>
          <Thumbnail src={this.state.searchItem.image_url}>
            <h3>{this.state.searchItem.name}</h3>
            <p>Category: {this.state.searchItem.categories[0].title}</p>
            <p>Rating: {this.state.searchItem.rating}</p>
            <p>Price: {this.state.searchItem.price}</p>
            <p>
              <Button bsStyle='primary'>Going? % others are</Button>&nbsp;
              <Button>Visit Website</Button>
            </p>
          </Thumbnail>
      </Col>
    );
  }
}


export default SearchItem;
