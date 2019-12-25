import React from 'react';
import { withFirebase } from './FirebaseProvider';
import Browse from './Browse';
import SendRockLink from './SendRockLink';
import { useSelector } from "react-redux";
import { signOut } from '../firebase/util';

const Home = () => {
  const currentUser = useSelector(
    state => state.session.currentUser,
  );

  return (
    <div>
      {currentUser && (
        <div>
          <div style={{'float': 'right'}}>
            {`Hi ${currentUser.displayName} `}
            <button onClick={signOut}>{"Log out"}</button>
          </div>
          <Browse />
          <SendRockLink />
        </div>
      )}
    </div>
  );
}

export default Home;
