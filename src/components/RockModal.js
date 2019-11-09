import React from 'react';
// import styles from './Browse.scss';

class RockModal extends React.Component {
  render() {
    const {rock} = this.props;
    // now rock refers to this.props.rock

    return  (
      <div>
        Hi!
        {rock.title}
      </div>

    )
  }
}

export default RockModal;
