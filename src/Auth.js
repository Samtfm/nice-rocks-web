import React from 'react';

function getCookie(cname) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

const onGoogleSignIn = (googleUser) => {

  console.log('onGoogleSignIn');

  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

  var idToken = googleUser.getAuthResponse().id_token;
  const csrfToken = getCookie('XSRF-TOKEN');
  fetch('/sessionLogin', {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({idToken: idToken}),
  });

};

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  componentDidMount(){
    // firebase.initializeApp({
    //   apiKey: 'AIza…',
    //   authDomain: '<PROJECT_ID>.firebasepp.com'
    // });

    window.onGoogleSignIn = onGoogleSignIn;
    window.getCookie = getCookie;


    // googleSignIn();
  }

  showGoogle = () => {
    console.log('hey!!')
    this.setState({
      visible: true
    })
  }

  render() {
    return (
      <div>
        google login
        <button onClick={this.showGoogle}>show google</button>
        <div class="g-signin2" data-onsuccess="onGoogleSignIn" style={{display: 'none'}}></div>
        {this.state.visible && (
          <div>
          </div>
        )}

      </div>
    );
  }
}


// const googleSignIn = () => {
//   //TODO: use signInWithRedirect for mobile browsers!
//   var provider = new firebase.auth.GoogleAuthProvider();
//   provider.addScope('https://www.googleapis.com/auth/spreadsheets.readonly');
//   firebase.auth().signInWithPopup(provider).then(function(result) {
//     // This gives you a Google Access Token. You can use it to access the Google API.
//     var token = result.credential.accessToken;
//     // The signed-in user info.
//     var user = result.user;
//
//
//     return result.user.getIdToken().then(idToken => {
//       // Session login endpoint is queried and the session cookie is set.
//       // CSRF protection should be taken into account.
//       // ...
//       const csrfToken = getCookie('csrfToken');
//       fetch('/sessionLogin', {
//         method: 'post',
//         body: JSON.stringify({idToken: idToken, csrfToken: csrfToken})
//       });
//     });
//
//     // ...
//   }).catch(function(error) {
//     // Handle Errors here.
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     // The email of the user's account used.
//     var email = error.email;
//     // The firebase.auth.AuthCredential type that was used.
//     var credential = error.credential;
//     // ...
//   }).then(() => {
//     return firebase.auth().signOut();
//   }).then(() => {
//     window.location.assign('#profile');
//   });
// };


export default Auth;
