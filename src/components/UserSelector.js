import React from 'react';
import styles from './UserSelector.scss';
import { withFirebase } from './FirebaseProvider'

class UserSelector extends React.Component {
  constructor(props){
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      suggestions: Object.values(this.props.firebase.localStore.users),
      selectedUser: null,
      recipientInput: '',
      focused: false,
    }
    this.emailCheckTimeout = null;
  }
  componentDidMount(){
    this.inputRef.focus();
  }

  handleChange = (event) => {
    const email = event.target.value
    this.setState({
      recipientInput: email,
    });
    if (/\S+@\S+\.\S+/.test(email)){
      clearTimeout(this.emailCheckTimeout)
      this.emailCheckTimeout = setTimeout(() => {
        this.props.firebase.firestoreConnection.getUser(email).then(user => {
          this.selectUser(user)
        }).catch(() => {
          this.setState({
            errorMessage: 'user not found'
          });
        })
      }, 800);
    }
  }

  selectUser = (user) => {
    this.setState({
      selectedUser: user,
      suggestions: [],
      focused: false,
      errorMessage: null,
    })
    // call the onSet function to alert whatever is using this component that a user has been selected
    this.props.onSet(user)
  }

  resetState = () => {
    this.setState({
      suggestions: Object.values(this.props.firebase.localStore.users),
      selectedUser: null,
    }, () => {
      this.inputRef.focus();
    });
  }

  render() {
    const { suggestions, selectedUser, focused, errorMessage } = this.state;
    return  (
      <div className={styles['user-selector']} >
        <p className={styles['error-message']}>{errorMessage}</p>
        {selectedUser ? (
          <div className={styles['filled-input']}>
            <span>{selectedUser.displayName}</span>
            <button className={styles['x-button']} onClick={this.resetState}>X</button>
          </div>
        ) : (
          <input
            ref={(ref) => { this.inputRef = ref; }}
            onFocus={() => this.setState({focused: true})}
            onBlur={() => setTimeout(() => this.setState({focused: false}), 200)}
            className={styles['recipient-input']}
            placeholder={focused ? "example@bestmail.net" : "Select contact"}
            type="text"
            name="recipientInput"
            autoComplete="off"
            value={this.state.recipient}
            onChange={this.handleChange}
          />
        )}
        {focused && suggestions.length > 0 && (
          <div className={styles['dropdown-container']}>
          <ul className={styles['dropdown']}>
          {suggestions.map(suggestion => (
            <li key={suggestion.id} onClick={() => this.selectUser(suggestion)}>
              {suggestion.displayName}
            </li>
          ))}
          </ul>
          </div>
        )}
      </div>
    );
  }
}

export default withFirebase(UserSelector);
