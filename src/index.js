import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';
import RockList from './RockList';

const Index = () => {
  return (
    <RockList/>
  );
};

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Index />, document.getElementById('root'));
});
