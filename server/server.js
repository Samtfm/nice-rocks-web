const express = require("express");
let  app = express();
var firebaseAdmin = require('firebase-admin');
var firebase = require("firebase/app");
require("firebase/auth");
// require("firebase/firestore");

var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
// var csrf = require('csurf')

import { firebaseConfig } from './util/firebase.js';
const fs = require('fs');
const { google } = require('googleapis');

require('dotenv').config();

const isProd = process.env.NODE_ENV && process.env.NODE_ENV === 'production';

// non-confidential config that identifies the firebase project

firebase.initializeApp(firebaseConfig);

// read confidential account info from env variable
if (isProd) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
    databaseURL: 'https://nice-rocks001.firebaseio.com'
  });
}

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token2.json';
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(cookieParser());
// app.use(csrf({cookie: {
//   httpOnly: true,
//   secure: true
// }}));
// app.use(csrf({cookie: true}));


app.use(function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,POST');
	res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
	next();
});

//this GET must cover all react routes for direct access via url.
app.get(['/', '/login'], (req, res) => {
  console.log('GET /');
	// res.cookie('XSRF-TOKEN', req.csrfToken());
  res.sendFile(global.appRoot + '/public/index.html');
});

// app.get('/login', (req, res) => {
//   console.log('GET /login');
// 	// res.cookie('XSRF-TOKEN', req.csrfToken());
//   res.sendFile(global.appRoot + '/public/login.html');
// });

app.use('/', express.static(global.appRoot + '/public'));
// app.use(express.static(global.appRoot + 'public'));
var port = process.env.PORT || 3000;

app.listen(port,  () => console.log("Example app listening on port " + port + "!"));


app.post('/sessionLogin', (req, res) => {
	console.log("POST /sesionLogin");

  if (!isProd) {
    console.log("Auth not supported in development mode");
    res.status(401).send('auth not supported in development mode');
  }

	const googleIdToken = req.body.idToken.toString();

	// const csrfToken = req.body.csrfToken.toString();
	// console.log(idToken, csrfToken);
	// // Guard against CSRF attacks.
	// if (csrfToken !== req.cookies.csrfToken) {
	// 	res.status(401).send('UNAUTHORIZED REQUEST!');
	// 	return;
	// }

	// Build Firebase credential with the Google ID token.
	var credential = firebase.auth.GoogleAuthProvider.credential(googleIdToken);

	// Sign in with credential from the Google user.
	firebase.auth().signInWithCredential(credential).then(data => {
		data.user.getIdToken().then(idToken => {
			// Set session expiration to 5 days.
			const expiresIn = 60 * 60 * 24 * 5 * 1000;
			// Create the session cookie. This will also verify the ID token in the process.
			// The session cookie will have the same claims as the ID token.
			// To only allow session cookie setting on recent sign-in, auth_time in ID token
			// can be checked to ensure user was recently signed in before creating a session cookie.
			firebaseAdmin.auth().createSessionCookie(idToken, {expiresIn}).then((sessionCookie) => {
			 // Set cookie policy for session cookie.
			 const options = {
				 maxAge: expiresIn,
				 httpOnly: true,
				 // TODO: add secure flag for https!
				 // secure: true,
			 };
			 res.cookie('session', sessionCookie, options);
			 res.end(JSON.stringify({status: 'success'}));
			}, error => {
				console.log(error);
			 res.status(401).send('UNAUTHORIZED REQUEST!');
			});
		});
	});
}, (error) => {
	console.log(error);
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var cred = error.credential;
  // ...
});

app.get('/rocks', (req, res) => {
	console.log('GET /rocks');

	const sessionCookie = req.cookies.session || '';

// Verify the session cookie. In this case an additional check is added to detect
// if the user's Firebase session was revoked, user deleted/disabled, etc.
	firebaseAdmin.auth().verifySessionCookie(
		sessionCookie, true /** checkRevoked */)
		.then((decodedClaims) => {
			res.json({
	      rocks: [decodedClaims.name]
	    });
		})
		.catch(error => {
			console.log(error);
			// Session cookie is unavailable or invalid. Force user to login.
			// res.redirect('/login');
		});
});

//
//
// app.get('/rocks', (req, res) => {
//   console.log('GET /rocks');
//   // Load client secrets from a environment variable.
//   var googleConfig = JSON.parse(process.env.GOOGLE_APP_CREDS);
//   authorize(googleConfig).then(auth => {
//     return readRocks(auth);
//   }).then(rocks => {
//     console.log("rocks", rocks);
//     res.json({
//       rocks: rocks
//     });
//   });
// });

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function readRocks(auth) {
  return new Promise((resolve, reject) => {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1678uOnNSgetdw1wOdZnhkxLnYGOZl4yGk97QJA7Zx_k',
      range: 'Sheet1!A2:E',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
        // Print columns A and E, which correspond to indices 0 and 4.
        const rocks = rows.map((row) => {
          return row[0];
        });
        console.log("rocks in readRocks", rocks);
        resolve(rocks);
      } else {
        console.log('No data found.');
      }
    });
  });
}
