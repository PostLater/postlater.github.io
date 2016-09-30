function getAccounts(token, callback) {
  
}

function facebookRequest(token, path, callback, isPost) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
     if (xmlhttp.status == 200) {
       callback && callback(xmlhttp.responseText);
     }
     else if (xmlhttp.status == 400) {
       console.log('There was an error 400');
     }
     else {
       console.log('something else other than 200 was returned');
     }
    }
  };

  xmlhttp.open(isPost ? "POST" : "GET", "https://graph.facebook.com/v2.7" + path, true);
  xmlhttp.send();
}