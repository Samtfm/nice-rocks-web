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
    }
  }
  componentDidMount(){
    this.inputRef.focus();
  }

  handleChange = (event) => {
    this.setState({
      recipientInput: event.target.value,
    });

  }

  selectUser = (user) => {
    this.setState({
      selectedUser: user,
      suggestions: [],
    })
  }

  resetState = () => {
    this.setState({
      suggestions: Object.values(this.props.firebase.localStore.users),
      selectedUser: null,
      recipientInput: '',
    }, () => {
      this.inputRef.focus();
    });
  }

  render() {
    const { suggestions, selectedUser, focused } = this.state;
    return  (
      <div className={styles['component']} >
        {selectedUser ? (
          <div className={styles['filled-input']}>
            <span>{selectedUser.displayName}</span>
            <button className={styles['x-button']} onClick={this.resetState}>X</button>
          </div>
        ) : (
          <input
            ref={(ref) => { this.inputRef = ref; }}
            onFocus={() => this.setState({focused: true})}
            onBlur={() => setImmediate(() => this.setState({focused: false}))}
            className={styles['recipient-input']}
            type="text"
            name="recipientInput"
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
