import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
import RockList from './RockList';
import Browse from './components/Browse';
import Auth from './components/Auth';
import Home from './components/Home';
import PrivateRoute from './components/PrivateRoute';

import FirebaseProvider from './components/FirebaseProvider';
import { BrowserRouter, Route, Link } from "react-router-dom";


// each route path must also be defined in the server as an alias for GET('/')

const Index = () => {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Route exact path='/login' component={Auth} />
        <PrivateRoute exact path='/' component={Home} />
      </BrowserRouter>
    </FirebaseProvider>
  );
};


window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
