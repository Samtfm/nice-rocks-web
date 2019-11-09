import React from 'react';
import styles from './RockModal.scss';

class RockModal extends React.Component {
  render() {
    const { rock, handleClose } = this.props;
    // now rock refers to this.props.rock

    return  (
      <div className={styles['modal']}>
        <button className={styles['close-button']} onClick={handleClose}>X</button>
        <div className={styles['content']}>
          <section>
            thing1
          </section>
          <section>
            thing2
            {rock.title}
          </section>
          <section>
            thing3
          </section>
        </div>
        Hi!
      </div>

    )
  }
}

export default RockModal;
