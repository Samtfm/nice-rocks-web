import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';
// import { friendRocks } from '../demoData';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      browseRocks: { rocks: []},
      firestoreReady: false,
    };
  }

  componentDidUpdate(){
    if (this.props.firebase.firestoreConnection && !this.state.firestoreReady) {
      this.setState({
        firestoreReady: true,
      }, this.onFirestoreReady);
    }
  }

  onFirestoreReady(){
    const { firestoreConnection, user, localStore } = this.props.firebase;
    if (!user) {
      return;
    }
    firestoreConnection.getRocks("toUser", "==", user.uid).then(rocks => {
      this.setState({
        browseRocks: { rocks: rocks}
      });
    });
  }

  render() {
    const { user, firestoreConnection, signOut, signInWithRedirect} = this.props.firebase;
    const { browseRocks } = this.state;
    return (
      <div>
        { firestoreConnection ? (
          <div>
            { user ? (
              <div>
                {`Hi ${user.displayName} `}
                <button onClick={signOut}>{"Log out"}</button>
              </div>
            ) : (
              <button onClick={signInWithRedirect}>{"login with google"}</button>
            )}
            <Browse rocks={browseRocks.rocks} />
            <SendRockLink />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

export default withFirebase(Home);
