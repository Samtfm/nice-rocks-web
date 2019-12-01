import React from 'react';
import styles from './SendRockModal.scss';
import Modal from './Modal';
import { withFirebase } from './FirebaseProvider';
import UserSelector from './UserSelector';


const charLimits = {
  url: 280,
  note: 1000,
  title: 200,
}

const CharLimit = ({limit, current}) => {
  if (current > limit) {
    return (
      <span className={'char-limit'}>{`0/${limit}`}</span>
    )
  } else if (current > limit*.66) {
    return (
      <span className={'char-limit'}>{`${limit - current}/${limit}`}</span>
    )
  } else return null;
}

const defaultState = {
  url: '',
  note: '',
  title: '',
  disableSubmit: false,
  errorMessage: null,
  submitted: false,
}

class SendRockModal extends React.Component {
  constructor(props){
    super(props);
    this.state = defaultState;
  }

  sendRock = () => {
    const { url, note, title, recipient } = this.state;
    const { firebase, handleClose } = this.props;

    const newRock = {
      'url': url,
      'note': note,
      'toUser': recipient.id,
      'title': title,
    }
    this.setState({
      disableSubmit: true,
    });
    firebase.firestoreConnection.postRock(newRock).then(() => {
      this.setState({
        submitted: true,
        errorMessage: null,
      });
      setTimeout(() => {
        handleClose();
        this.setState(defaultState);
      }, 1500)
    }).catch(error => {
      this.setState({
        disableSubmit: false,
        errorMessage: 'Something went wrong, please try again',
      });
    });
  }

  handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if (!charLimits[name] || value.length > charLimits[name]) {
      this.setState({
        errorMessage: `exceeded character limit for ${name}`,
      });
    } else {
      this.setState({
        errorMessage: null,
        [name]: value,
      });
    }
  }

  handleUrlChange = (event) => {
    const url = event.target.value
    // get share title


    // update title input with the share title


    // do the usual form update
    this.handleFormChange(event)
  }

  setRecipient = (user) => {
    this.setState({
      recipient: user,
    });
  }

  validateForm = () => {
    const { note, title, recipient } = this.state;
    return Boolean(recipient) && (note.length > 0 || title.length > 0);
  }


  render() {
    const { visible, handleClose } = this.props;
    const { disableSubmit, errorMessage, submitted } = this.state;
    const formNotReady = !this.validateForm()

    return  (
      <Modal visible={visible} handleClose={handleClose}>
        <section className={styles['form']}>
          <h2>Send rock</h2>
          <p className={styles['error-message']}>{errorMessage}</p>
          <input
            autocomplete="off"
            type="text"
            placeholder="URL (optional)"
            name="url"
            value={this.state.url}
            onChange={this.handleUrlChange}
          />
          <input type="text"
            autocomplete="off"
            placeholder="Title"
            name="title"
            value={this.state.title}
            onChange={this.handleFormChange}
          />
          <textarea
            autocomplete="off"
            placeholder="Say something about your rock..."
            name="note"
            value={this.state.note}
            onChange={this.handleFormChange}
          />
          <CharLimit current={this.state.note.length} limit={charLimits.note} />
          <br/>
          <UserSelector onSet={this.setRecipient} />
          <span className={styles['tag-buttons']}>
            <button disabled>Read</button>
            <button disabled>Listen</button>
            <button disabled>Watch</button>
          </span>
          <br/>
          <button disabled={formNotReady || disableSubmit} onClick={this.sendRock}>Send!</button>
          {submitted && (
            <div className={styles['success-overlay']}>
              <div>Sent!</div>
            </div>
          )}
        </section>
      </Modal>
    );
  }
}

export default withFirebase(SendRockModal);
