import React from 'react';
import styles from './FilterButtons.scss';

class FilterButtons extends React.Component {

  render() {
    console.log(styles)
    return (
      <div> 
        <button className={styles['cool-button']}>Ayo click me!</button>
      </div>
    );
  }
}

export default FilterButtons;
