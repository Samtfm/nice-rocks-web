import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import styles from './UserSelector.scss';
import { withFirebase } from './FirebaseProvider'


const UserSelector = ({onSet, firebase}) => {
  const allUsers = useSelector(
    state => state.users,
  );
  const inputRef = useRef(null);
  const [suggestions, setSuggestions] = useState(Object.values(allUsers));
  const [selectedUser, setSelectedUser] = useState(null);
  const [recipientInput, setRecipientInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  let emailCheckTimeout = null;

  const resetState = () => {
    setSuggestions(Object.values(allUsers))
    setSelectedUser(null);
    setErrorMessage(null);
    inputRef.current.focus()
  }

  const selectUser = (user) => {
    setSelectedUser(user);
    setSuggestions([]);
    setErrorMessage(null);
    // call the onSet function to alert whatever is using this component that a user has been selected
    onSet(user)
  }

  const handleChange = (event) => {
    const email = event.target.value
    setRecipientInput(email);

    //simple regex to test if a string might be a valid email address
    if (/\S+@\S+\.\S+/.test(email)){
      clearTimeout(emailCheckTimeout)
      emailCheckTimeout = setTimeout(() => {
        firebase.firestoreConnection.getUser(email).then(user => {
          selectUser(user);
        }).catch(() => {
          setErrorMessage('user not found');
        })
      }, 800);
    }
  }

  return (
    <div className={styles['user-selector']} >
      <p className={styles['error-message']}>{errorMessage}</p>
      <input
        ref={inputRef}
        style={selectedUser ? {display: 'none'} : {}}
        onFocus={() => setFocused(true)}
        onBlur={() => setTimeout(() => setFocused(false), 200)}
        className={styles['recipient-input']}
        placeholder={focused ? "example@bestmail.net" : "Select contact"}
        type="text"
        name="recipientInput"
        autoComplete="off"
        value={recipientInput}
        onChange={handleChange}
      />
      {selectedUser && (
        <div className={styles['filled-input']}>
          <span>{selectedUser.displayName}</span>
          <button className={styles['x-button']} onClick={resetState}>X</button>
        </div>
      )}
      {focused && suggestions.length > 0 && (
        <div className={styles['dropdown-container']}>
        <ul className={styles['dropdown']}>
        {suggestions.map(suggestion => (
          <li key={suggestion.id} onClick={() => selectUser(suggestion)}>
            {suggestion.displayName}
          </li>
        ))}
        </ul>
        </div>
      )}
    </div>
  );
}

export default withFirebase(UserSelector);
