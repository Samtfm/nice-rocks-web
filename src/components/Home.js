import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';
import { friendRocks } from '../demoData';

const Home = (props) => {
  const { user, firebaseLoaded, signOut, signInWithRedirect } = props.firebase;
  return (
    <div>
      { firebaseLoaded ? (
        <div>
          { user ? (
            <div>
              {`Hi ${user.displayName} `}
              <button onClick={signOut}>{"Log out"}</button>
            </div>
          ) : (
            <button onClick={signInWithRedirect}>{"login with google"}</button>
          )}
          <Browse friendRocks={friendRocks} />
          <SendRockLink />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default withFirebase(Home);
