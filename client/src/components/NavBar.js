import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: props.isLoggedIn,
      userName: '',
    };

    this.checkLoginStatus = this.checkLoginStatus.bind(this);
    this.displayLoginOrLogout = this.displayLoginOrLogout.bind(this);
    this.logoutUserSession = this.logoutUserSession.bind(this);
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  componentWillReceiveProps(newProp) {
    if (!newProp.updateLoginStatus) {
      this.checkLoginStatus();
    }
  }

  displayLoginOrLogout() {
    if (this.state.isLoggedIn) {
      return (
        <Nav pullRight>
          <NavItem>
            Welcome {this.state.userName}!
          </NavItem>
          <NavItem onClick={this.logoutUserSession}>
            Logout
          </NavItem>
        </Nav>
      );
    } else {
      return (
        <Nav pullRight>
          <NavItem onClick={this.props.openLoginModal}>
           Login
          </NavItem>
        </Nav>
      );
    }
  }

  checkLoginStatus() {
    fetch('/api/users/checkStatus', {
          method: 'GET',
          credentials: 'include',
        })
    .then((resp) => resp.json())
    .then((res) => {
      this.setState({'isLoggedIn': res.isLoggedIn});
      if (res.isLoggedIn) {
        this.setState({'userName': res.userName});
      } else {
        this.setState({'userName': ''});
      }
    })
    .catch((ex) => {
      console.log('Fetch Error: ' + ex);
    });
  }

  logoutUserSession() {
    fetch('/api/users/logout', {
          method: 'GET',
          credentials: 'include',
    })
    .then((resp) => resp.json())
    .then((res) => {
      if (!res.isLoggedIn) {
        this.checkLoginStatus();
      }
    });
  }

  render() {
    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            Beer Buds
          </Navbar.Brand>
        </Navbar.Header>
        {this.displayLoginOrLogout()}
      </Navbar>
    );
  }
}

export default NavBar;
