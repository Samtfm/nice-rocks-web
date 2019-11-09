import React, { PropTypes, Children } from 'react';
import { initFirebase, signOut, signInWithRedirect } from './util';

import { FirebaseContext } from './firebase-context';
export default class FirebaseProvider extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null,
      firebaseLoaded: false,
      signOut: signOut,
      signInWithRedirect: signInWithRedirect,
    };
  }

  componentDidMount(){
    initFirebase(user => {
      console.log(user);
      this.setState({
        user: user,
        firebaseLoaded: true,
      });
    });
  }

  setColor(color) {
     this.setState({color});
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
