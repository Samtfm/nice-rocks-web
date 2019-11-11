import React from 'react';
import styles from './Modal.scss';

class Modal extends React.Component {
  render() {
    const { visible, handleClose } = this.props;
    return visible ? (
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <button className={styles['close-button']} onClick={handleClose}>X</button>
          {this.props.children}
        </div>
      </div>
    ) : (
      null
    );
  }
}

export default Modal;
