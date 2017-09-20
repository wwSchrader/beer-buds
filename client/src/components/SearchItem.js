import React, {Component} from 'react';
import {Thumbnail, Col, Button} from 'react-bootstrap';
import '../css/SearchItem.css';

class SearchItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchItem: props.searchItem,
    };

    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componentReceiveProps(newProps) {
    this.setState({searchItem: newProps.searchItem});
  }

  onButtonPress() {
    console.log(this.state);
    let fetchUrl;
    if (this.state.searchItem.currentUserGoing) {
      console.log("user is not going");
      fetchUrl = '/api/vote/decreasevote';
    } else {
      console.log("user is going");
      fetchUrl = '/api/vote/add';
    }
    fetch(fetchUrl, {
      method: 'PUT',
      body: {barId: this.state.searchItem.id},
    })
    .then((response) => {

    });
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
              <Button
                  bsStyle={this.state.searchItem.currentUserGoing ?
                    'success' : 'primary'}
                  onClick={this.onButtonPress}
              >
                {this.state.searchItem.usersGoing} others are going
              </Button>&nbsp;
              <Button>Visit Website</Button>
            </p>
          </Thumbnail>
      </Col>
    );
  }
}


export default SearchItem;
