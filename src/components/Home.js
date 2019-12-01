import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';
import Spinner from './Spinner';

class Home extends React.Component {
  render() {
    const { currentUser, firestoreConnection, signOut, signInWithRedirect} = this.props.firebase;

    return (
      firestoreConnection ? (
        <div>
          { currentUser ? (
            <div>
              {`Hi ${currentUser.displayName} `}
              <button onClick={signOut}>{"Log out"}</button>
              <Browse />
              <SendRockLink />
            </div>
          ) : (
            <button onClick={signInWithRedirect}>{"login with google"}</button>
          )}
        </div>
      ) : (
        <Spinner />
      )
    );
  }
}

export default withFirebase(Home);
