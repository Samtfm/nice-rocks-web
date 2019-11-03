import React from 'react';
import ReactDOM from 'react-dom';
import './basicStyles.scss';
import RockList from './RockList';
import Browse from './components/Browse';
import Auth from './Auth';
import { friendRocks } from './demoData';
import FilterButtons from './components/FilterButtons';

// add this button to the page to enable login:
//    <button onClick={() => location.assign('/login')}>login</button>

const Index = () => {
  return (
    <div>
      <FilterButtons />
      <Browse friendRocks={friendRocks} />
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
