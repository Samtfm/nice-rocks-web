import * as React from 'react';
import { FirebaseContext } from './firebase-context';

export function withFirebase(Component) {
  return (props) => {
    return (
      <FirebaseContext.Consumer>
        {
          (contexts) => <Component {...props} {...contexts} />
        }
      </FirebaseContext.Consumer>
    );
  };
}
