import React from 'react';
import styles from './RockModal.scss';
import Modal from './Modal';

const TitleUrlHeadline = ({rock}) => (
  <a href={rock.url} target="_blank" className={styles['link-headline']}>
    <h2>{rock.title}</h2>
    <div className={styles['open-icon']}>{"Open"}</div>
  </a>
)

const UrlHeadline = ({rock}) => (
  <a href={rock.url} target="_blank" className={styles['link-headline']}>
    <p className={styles['url']}>{rock.url}</p>
    <div className={styles['open-icon']}>{"Open"}</div>
  </a>
)

const TitleHeadline = ({rock}) => (
  <h2 className={styles['basic-headline']}>{rock.title}</h2>
)


class RockModal extends React.Component {

  render() {
    const { rock, visible, handleClose } = this.props;

    let HeadlineComp = () => "";
    if (rock.url && rock.title) {
      HeadlineComp = TitleUrlHeadline
    } else if (rock.url) {
      HeadlineComp = UrlHeadline
    } else if (rock.title) {
      HeadlineComp = TitleHeadline
    }

    return  (
      <Modal visible={visible} handleClose={handleClose}>
        <div className={styles['content']}>
          <HeadlineComp rock={rock}/>
          <section>
            <p>
              {rock.note}
            </p>
          </section>
        </div>
      </Modal>
    );
  }
}

export default RockModal;
