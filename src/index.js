import React from 'react';
import ReactDOM from 'react-dom';
import styles from './index.scss';
import RockList from './RockList';
import Browse from './components/Browse';
import Auth from './Auth';
import Home from './components/Home';

import FirebaseProvider from './components/FirebaseProvider';

const Index = () => {
  return (
    <FirebaseProvider>
      <Home />
    </FirebaseProvider>
  );
};


window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
