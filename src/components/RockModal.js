import React from 'react';
import styles from './RockModal.scss';

class RockModal extends React.Component {
  render() {

    const { rock, handleClose } = this.props;
    // now rock refers to this.props.rock
    window.hc = handleClose;
    return  (
      <div className={styles['modal-overlay']}>
        <div className={styles['modal']}>
          <button className={styles['close-button']} onClick={handleClose}>X</button>
          <div className={styles['content']}>

            <section className={styles['link-section']}>
              <a href={rock.url}  >
                <h2>
                  {rock.title}
                </h2>
                <icon>O</icon>
              </a>
            </section>
            <section>
              <p>
                {rock.description}
              </p>


            </section>
            <section>
              thing3
            </section>
          </div>
          Hi!
        </div>
      </div>

    );
  }
}

export default RockModal;
