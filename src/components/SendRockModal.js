import React from 'react';
import styles from './SendRockModal.scss';
import Modal from './Modal';
import { withFirebase } from './FirebaseProvider';
import UserSelector from './UserSelector';

class SendRockModal extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      url: '',
      note: '',
      disableSubmit: false,
    }
  }

  sendRock = () => {
    const { url, note, recipient } = this.state;
    const { firestoreConnection } = this.props.firebase;
    const newRock = {
      'url': url,
      'note': note,
      'toUser': recipient.id,
    }
    this.setState({
      disableSubmit: true,
    })
    firestoreConnection.postRock(newRock)
  }

  handleFormChange = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
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
    const { note, url } = this.state;

    return note.length > 0 || url.length > 0;
  }


  render() {
    const { visible, handleClose } = this.props;
    const { disableSubmit } = this.state;
    const formNotReady = !this.validateForm()

    return  (
      <Modal visible={visible} handleClose={handleClose}>
        <section className={styles['form']}>
          <h2>Send rock</h2>
          <UserSelector onSet={this.setRecipient} />
          <label htmlFor="note">Note:</label>
          <textarea id="note" name="note" value={this.state.note} onChange={this.handleFormChange} />
          <br/>
          <span className={styles['tag-buttons']}>
            <button disabled>Read</button>
            <button disabled>Listen</button>
            <button disabled>Watch</button>
          </span>
          <br/>

          <label htmlFor="url">Url:</label>
          <input type="text" id="url" name="url" value={this.state.url} onChange={this.handleUrlChange} />
          <br/>
          <label htmlFor="title">Title:</label>
          <input type="text" id="title" name="title" value={this.state.title} onChange={this.handleFormChange} />
          <br/>
          <button disabled={formNotReady || disableSubmit} onClick={this.sendRock}>Send!</button>
        </section>
      </Modal>
    );
  }
}

export default withFirebase(SendRockModal);
