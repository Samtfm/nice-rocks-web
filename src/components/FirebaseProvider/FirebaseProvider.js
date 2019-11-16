import React, { PropTypes, Children } from 'react';
import { initFirebase, signOut, signInWithRedirect } from './util';

import { FirebaseContext } from './firebase-context';
export default class FirebaseProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      firebaseLoaded: false,
      db: null,
      signOut: signOut,
      signInWithRedirect: signInWithRedirect,
      localStore: {
        users: {}
      }
    };
  }

  componentDidMount(){
    initFirebase((firebase, user) => {
      window.fb = firebase
      this.setState({
        user: user,
        firebaseLoaded: true,
        db: firebase.firestore(),
      });
    });
  }



  render() {
    return (
      <FirebaseContext.Provider value={{
          firebase: {...this.state}
       }}>
        {this.props.children}
      </FirebaseContext.Provider>
    )
  }
}
