window.onFbReady = function(fn) {
  if (fbAsyncInitOver)
    fn();
  else
    window.fbInit.push(fn);
}
window.fbInit = [];
window.fbAsyncInitOver = false;
window.fbAsyncInit = function() {
  window.fbAsyncInitOver = true;
  console.log('fbAsyncInit called.');
  FB.init({
    appId      : '179203992484397',
    //xfbml      : true,
    version    : 'v2.7'
  });
  FB.AppEvents.logPageView();
  
  for (var i = 0; i < window.fbInit.length; i++) {
    window.fbInit[i]();
  }
};

// facebook graph api sdk
(function(d, s, id){
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {return;}
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk/debug.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Initialize Firebase
var config = {
  apiKey: "AIzaSyD21dyzv35kCJgiz08KyXGt9kfDrrARzco",
  authDomain: "postlater-837fd.firebaseapp.com",
  databaseURL: "https://postlater-837fd.firebaseio.com",
  storageBucket: "postlater-837fd.appspot.com",
  messagingSenderId: "776050133239"
};
firebase.initializeApp(config);

window.autoRedirect = true;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // logged in
    console.log('Logged in.');
    if (autoRedirect && window.location.pathname === '/')
      window.location.replace('/panel');
    //else {
    //  fillAccountOptions();
    //}
  }
  else {
    // logged out
    console.log('Not logged in.');
    if (window.location.pathname === '/panel'
        || window.location.pathname === '/done')
      window.location.replace('/');
  }
});

function signIn() {
  window.autoRedirect = false;
  
  var provider = new firebase.auth.FacebookAuthProvider();
  provider.addScope('manage_pages');
  provider.addScope('publish_pages');
  
  firebase.auth().signInWithPopup(provider).then(function(result) {
    console.log('signin callback');
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    firebase.database().ref('user/' + firebase.auth().currentUser.uid).update({
      accessToken: token
    }).then(function(res) {
      console.log('success', res);
      window.location.replace('/panel');
    }).catch(function(err) {
      console.log('failure', err);
    });
  }).catch(function(error) {
    console.log('error', error);
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
}

function signOut() {
  firebase.auth().signOut();
}