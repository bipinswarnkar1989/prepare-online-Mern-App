/// ./user-react-redux-frontend/src/components/GoogleLogin.jsx
import React from 'react';

class GoogleLogin extends React.Component{
  componentDidMount(){
    this.handleClientLoad();
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "https://apis.google.com/js/client:platform.js?onload=gPOnLoad";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        });

        // Load the SDK asynchronously
        (function(d, s, id) {
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) return;
          js = d.createElement(s); js.id = id;js.async = true;
          js.src = "https://apis.google.com/js/client:platform.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script'));

    }

    handleClientLoad() {
       // Loads the client library and the auth2 library together for efficiency.
       // Loading the auth2 library is optional here since `gapi.client.init` function will load
       // it if not already loaded. Loading it upfront can save one network request.
       window.gapi.load('client:auth2', this.initClient());
     }

      initClient() {
       // Initialize the client with API key and People API, and initialize OAuth with an
       // OAuth 2.0 client ID and scopes (space delimited string) to request access.
       window.gapi.client.init({
           apiKey: 'kSa6D8sIMUAg1ZwXKF3iCTUv',
           discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
           clientId: '589604253674-6ht3ue6eeqsui6142cvc96sr9pdcljot.apps.googleusercontent.com',
           scope: 'profile'
       }).then(function () {
         // Listen for sign-in state changes.
         window.gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus());

         // Handle the initial sign-in state.
         this.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
       });
     }

      updateSigninStatus(isSignedIn) {
       // When signin status changes, this function is called.
       // If the signin status is changed to signedIn, we make an API call.
       if (isSignedIn) {
         this.makeApiCall();
       }
     }

      handleSignInClick(event) {
       // Ideally the button should only show up after gapi.client.init finishes, so that this
       // handler won't be called before OAuth is initialized.
       window.gapi.auth2.getAuthInstance().signIn();
     }

      handleSignOutClick(event) {
       window.gapi.auth2.getAuthInstance().signOut();
     }

      makeApiCall() {
       // Make an API call to the People API, and print the user's given name.
       window.gapi.client.people.people.get({
         'resourceName': 'people/me',
         'requestMask.includeField': 'person.names'
       }).then(function(response) {
         console.log('Hello, ' + response.result.names[0].givenName);
       }, function(reason) {
         console.log('Error: ' + reason.result.error.message);
       });
     }



    render(){
      const styles = {
        btn: {
      background: '#4f81e9',
      color: 'white',
      padding: 7,
      borderRadius: 2,
      fontSize: 13,
      textDecoration:'none',
      display:'block'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5,
      padding:'14px'
    }
      }
      return(
        <div>
          <a href="#" style={{...styles.btn, ...styles.btnGoogle}} onClick={ (event) => this.googleLogin(event) }>
            <i className="fa fa-google-plus fa-lg"/>
            <span style={styles.btnSpan}>Log in with Google</span>
          </a>

        </div>
      )
    }
}

export default GoogleLogin;
