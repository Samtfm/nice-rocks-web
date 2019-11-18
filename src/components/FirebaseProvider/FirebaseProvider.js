import React, { PropTypes, Children } from 'react';
import { initFirebase, signOut, signInWithRedirect } from './util';
import FirestoreConnection from './FirestoreConnection';

import { FirebaseContext } from './firebase-context';
export default class FirebaseProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
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
      const localStore = {
        users: {}
      }
      this.setState({
        user: user,
        firestoreConnection: new FirestoreConnection(firebase, localStore),
        localStore: localStore,
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
