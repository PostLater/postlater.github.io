var config = {
  apiKey: "AIzaSyD21dyzv35kCJgiz08KyXGt9kfDrrARzco",
  authDomain: "postlater-837fd.firebaseapp.com",
  databaseURL: "https://postlater-837fd.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "776050133239"
};
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    if (window.location.pathname.indexOf('/panel') !== 0)
      window.location.replace('/panel');
  } else {
    // No user is signed in.
    if ('/'.indexOf(window.location.pathname) < 0)
      window.location.replace('/');
  }
});

function login() {
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('publish_pages');
  provider.addScope('publish_actions');
  provider.addScope('manage_pages');

  firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    console.log('Logged in.');
    console.log(token);
    console.log(user);
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    window.alert('Failed to log-in. Please try again later.');
    console.log(errorCode);
    console.log(errorMessage);
    console.log(email);
    console.log(credential);
  });
}

function logout() {
  firebase.auth().signOut();
}
  