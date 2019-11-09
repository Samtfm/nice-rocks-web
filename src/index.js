import React from 'react';
import ReactDOM from 'react-dom';
import './basicStyles.scss';
import RockList from './RockList';
import Browse from './components/Browse';
import Auth from './Auth';
import Welcome from './components/Welcome';

import FirebaseProvider from './components/FirebaseProvider';

const Index = () => {
  return (
    <FirebaseProvider>
      <Welcome />
    </FirebaseProvider>
  );
};


window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
