import React from 'react';
import ReactDOM from 'react-dom';
// import './styles.scss';
import RockList from './RockList';
import Browse from './Browse';
import Auth from './Auth';
import { friendRocks } from './demoData';
import FilterButtons from './components/FilterButtons';

const Index = () => {
  return (
    <div>
      <FilterButtons />
      <button onClick={() => location.assign('/login')}>login</button>
      <RockList />
      <Browse friendRocks={friendRocks} />
    </div>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
