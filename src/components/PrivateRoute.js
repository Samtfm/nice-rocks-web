import React from 'react';
import {
  Route,
  Link,
  Redirect,
} from 'react-router-dom'

import { withFirebase } from './FirebaseProvider';

const PrivateRoute = ({ component: Component, firebase, ...rest }) => {
  return (
    <Route {...rest} render={(props) => (
      firebase.currentUser ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    )} />
  )
}


export default withFirebase(PrivateRoute);
