import React from 'react';
import styles from './RockModal.scss';
import Modal from './Modal';

class RockModal extends React.Component {
  render() {

    const { rock, visible, handleClose } = this.props;
    return  (
      <Modal visible={visible} handleClose={handleClose}>
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
      </Modal>
    );
  }
}

export default RockModal;
