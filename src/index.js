import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import RockList from './RockList';
import Auth from './Auth';

const Index = () => {
  return (
    <div>
      <button onClick={() => location.assign('/login')}>login</button>
      <RockList />
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
