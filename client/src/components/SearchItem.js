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
    this.onOpenLoginModal = this.onOpenLoginModal.bind(this);
    this.flipCurrentUserIsGoing = this.flipCurrentUserIsGoing.bind(this);
  }

  componentReceiveProps(newProps) {
    this.setState({searchItem: newProps.searchItem});
  }

  onOpenLoginModal() {
    this.props.onOpenLoginModal();
  }

  flipCurrentUserIsGoing() {
    this.props.flipCurrentUserIsGoing(this.props.index);
  }

  onButtonPress() {
    console.log(this.state);
    let fetchUrl;
    if (this.state.searchItem.currentUserGoing) {
      fetchUrl = '/api/vote/decreasevote';
    } else {
      fetchUrl = '/api/vote/add';
    }
    console.log(this.state.searchItem.id);
    fetch(fetchUrl, {
      method: 'PUT',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({barId: this.state.searchItem.id}),
    })
    .then((response) => {
      console.log(response);
      if (response.status === 401) {
        this.onOpenLoginModal();
      } else {
        this.flipCurrentUserIsGoing();
      }
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
