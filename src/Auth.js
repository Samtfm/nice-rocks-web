import React from 'react'

class Auth extends React.Component {
  constructor(props) {
    super(props);
    window.onGoogleSignIn = (googleUser) => {
      var profile = googleUser.getBasicProfile();
      console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
      console.log('Name: ' + profile.getName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
      var id_token = googleUser.getAuthResponse().id_token;
    }
  }

  render() {
    const { rocks } = this.state;
    console.log(rocks)
    window.rocks = rocks
    return (
      <div>
        google login
        <div class="g-signin2" data-onsuccess="onGoogleSignIn"></div>
      </div>
    );
  }
}

export default Auth;
