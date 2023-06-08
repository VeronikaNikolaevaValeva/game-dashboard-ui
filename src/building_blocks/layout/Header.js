import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import React, { Component }  from 'react';
import { useStopwatch  } from 'react-timer-hook';
import { useAuth0 } from "@auth0/auth0-react";
import userManager from '../../managers/user-manager';

function Header(){ 
  const { isAuthenticated, loginWithRedirect, logout, getAccessTokenSilently, user } = useAuth0();
  const { seconds } = useStopwatch({ autoStart: true });
  const openInNewTab = (url) => {
    window.open(url, '_blank', 'noreferrer');
  };
  async function DeleteUserData (){
    const token = await getAccessTokenSilently();
    await userManager.deleteUser(user.nickname, user.email, token).then(response=>{
      if(response){
        var secs = seconds
        alert("Your data was deleted, you will be logged out in 10 seconds");
        if(seconds = secs + 10){
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      }
      else{
        alert(response);
      }

    });
  }
  return (
        <>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">QUIZ QUEST</Navbar.Brand>
          <Nav className="justify-content-end">
          {!isAuthenticated && (
            <Nav.Item>
              <Nav.Link>
                <button onClick={() => loginWithRedirect()}>Log In</button>
              </Nav.Link>
            </Nav.Item>
          )}
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
          {isAuthenticated && (
            <Nav.Item>
              <Nav.Link>
                <button onClick={() => DeleteUserData()}>
                  Delete account data
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