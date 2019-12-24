import React, { PropTypes, Children } from 'react';
import { initFirebase, signOut, signInWithRedirect } from './util';
import FirestoreConnection from './FirestoreConnection';
import { FirebaseContext } from './firebase-context';
import Spinner from './Spinner';


export default class FirebaseProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
      signOut: signOut,
      signInWithRedirect: signInWithRedirect,
      firestoreConnection: null,
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
        currentUser: firebase.auth().currentUser,
        firestoreConnection: new FirestoreConnection(firebase, localStore),
        localStore: localStore,
      });
    });
  }



  render() {
    return this.state.firestoreConnection ? (
      <FirebaseContext.Provider value={{
          firebase: {...this.state}
       }}>
        {this.props.children}
      </FirebaseContext.Provider>
    ) : (
      <Spinner />
    )
  }
}
