import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from "@auth0/auth0-react";
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <Auth0Provider 
  domain="dev-he67eqpc846lev05.us.auth0.com"
  clientId="748D2GkhkzSpr5F2Yi7DaaKSM0bgJeGk"
    authorizationParams={{
      redirect_uri: window.location.origin,
      audience: "https://gamelogicservice.azurewebsites.net/api",
      scope: "openid profile email"
    }}
  >
    <BrowserRouter>
      <App /> 
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById('root')
);
