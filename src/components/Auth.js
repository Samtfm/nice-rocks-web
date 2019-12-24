import React from 'react';
import { withFirebase } from './FirebaseProvider';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
  render() {
    const { signOut, signInWithRedirect, currentUser} = this.props.firebase;

    return (
      currentUser ? (
        <Redirect to='/' />
      ) : (
        <button onClick={signInWithRedirect}>{"login with google"}</button>
      )
    );
  }
}

export default withFirebase(Auth);
