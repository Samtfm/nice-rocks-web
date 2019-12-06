import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';

class Home extends React.Component {
  render() {
    const { currentUser, firestoreConnection, signOut, signInWithRedirect} = this.props.firebase;

    return (
      <div>
        <div>
          {`Hi ${currentUser.displayName} `}
          <button onClick={signOut}>{"Log out"}</button>
          <Browse />
          <SendRockLink />
        </div>
      </div>
    );
  }
}

export default withFirebase(Home);
