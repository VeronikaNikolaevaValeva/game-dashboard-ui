import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component }  from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import userManager from '../../managers/user-manager';

function Header(){ 
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">QUIZ</Navbar.Brand>
          <Nav className="justify-content-end">
          {!isAuthenticated && (
            <Nav.Item>
              <Nav.Link>
                <button onClick={() => loginWithRedirect()}>Log In</button>
              </Nav.Link>
            </Nav.Item>
          )}
          <Nav.Item>
            <Nav.Link href="/">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => openInNewTab('https://game-scoreboard.azurewebsites.net/')}>
            Scoreboard
      </Nav.Link>
          </Nav.Item>
          {isAuthenticated && (
            <Nav.Item>
              <Nav.Link>
                <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Log Out
                </button>
              </Nav.Link>
            </Nav.Item>
          )}
          </Nav>
        </Container>
      </Navbar>
      </>
    );
}

export default Header;