/// ./user-react-redux-frontend/src/components/GoogleLogin.jsx
import React from 'react';

class GoogleLogin extends React.Component{

  componentDidMount(){
        let self = this;
        let scriptTag = document.createElement('script');
        scriptTag.type = 'text/javascript';
        scriptTag.src = "https://apis.google.com/js/client:platform.js?onload=onLoadCallback";
        scriptTag.async = true;

        document.body.appendChild(scriptTag);
        //this.handleClientLoad();
        window.onLoadCallback = function(){
             window.gapi.load('client:auth2', self.initClient());
           }
     this.updateSigninStatus = this.updateSigninStatus.bind(this);

    }

    handleClientLoad() {
       // Loads the client library and the auth2 library together for efficiency.
       // Loading the auth2 library is optional here since `gapi.client.init` function will load
       // it if not already loaded. Loading it upfront can save one network request.
       window.gapi.load('client:auth2', this.initClient());
     }

      initClient() {
        const self = this;
       // Initialize the client with API key and People API, and initialize OAuth with an
       // OAuth 2.0 client ID and scopes (space delimited string) to request access.
       window.gapi.client.init({
           apiKey: 'AIzaSyDwIfkn-PbCZiNfL8QUAVAbHNfy2H5ll98',
           discoveryDocs: ["https://people.googleapis.com/$discovery/rest?version=v1"],
           clientId: '589604253674-5p72onvt84t9l3ev7lrav6i9c1je9i5t.apps.googleusercontent.com',
           scope: 'profile'
       }).then(function () {
         // Listen for sign-in state changes.
         window.gapi.auth2.getAuthInstance().isSignedIn.listen(self.updateSigninStatus);

         // Handle the initial sign-in state. But not needed . by bipin. so commenting
         //self.updateSigninStatus(window.gapi.auth2.getAuthInstance().isSignedIn.get());
       });
     }

      updateSigninStatus(isSignedIn) {
       // When signin status changes, this function is called.
       // If the signin status is changed to signedIn, we make an API call.
       if (isSignedIn) {console.log('updateSigninStatus')
         window.gapi.client.load('plus','v1',function(){
           var request = window.gapi.client.plus.people.get({
             'userId':'me'
           });
           request.execute(function(resp){
             console.log(resp);
             console.log('Retrieved profile for: '+resp.displayName);
           })
         })
       }
     }

      handleSignInClick(event) {
        event.preventDefault();
       // Ideally the button should only show up after gapi.client.init finishes, so that this
       // handler won't be called before OAuth is initialized.
       this.googleLogin();
       //window.gapi.auth2.getAuthInstance().signIn();
     }

      handleSignOutClick(event) {
       window.gapi.auth2.getAuthInstance().signOut();
     }

      makeApiCall() {console.log('makeApiCall')
       // Make an API call to the People API, and print the user's given name.
       window.gapi.client.people.people.get({
         'resourceName': 'people/me',
         'requestMask.includeField': 'person.names,person.emailAddresses,person.phoneNumbers',
       }).then(function(response) {
         console.log(response.result)
         console.log('Hello, ' + response.result.names[0].givenName);
       }, function(reason) {
         console.log('Error: ' + reason.result.error.message);
       });
     }

     //Triggering login for google
    googleLogin = () => {
        window.gapi.auth.signIn({
            callback: function(authResponse) {
                this.googleSignInCallback( authResponse )
            }.bind( this ),
            clientid: '589604253674-5p72onvt84t9l3ev7lrav6i9c1je9i5t.apps.googleusercontent.com', //Google client Id
            cookiepolicy: "single_host_origin",
            requestvisibleactions: "http://schema.org/AddAction",
            scope: "https://www.googleapis.com/auth/plus.login email"
        });
    }

    googleSignInCallback = (e) => {
        console.log( e )
        if (e["status"]["signed_in"]) {
            window.gapi.client.load("plus", "v1", function() {
                if (e["access_token"]) {
                    this.getUserGoogleProfile( e["access_token"] )
                } else if (e["error"]) {
                    console.log('Import error', 'Error occured while importing data')
                }
            }.bind(this));
        } else {
            console.log('Oops... Error occured while importing data')
        }
    }

    getUserGoogleProfile = accesstoken => {
        var e = window.gapi.client.plus.people.get({
            userId: "me"
        });
        e.execute(function(e) {
            if (e.error) {
                console.log(e.message);
                console.log('Import error - Error occured while importing data')
                return

            } else if (e.id) {
                //Profile data
                console.log(e)
                //alert("Successfull login from google : "+ e.displayName );
                const userData = {
                  name:e.displayName,
                  email:e.emails[0].value,
                  id:e.id,
                  provider:'google',
                  gender: e.gender,
                  picture: e.image.url,
                  password: e.id
                }
                this.props.signUpSocialUser(userData);
                return;
            }
        }.bind(this));
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
          <a href="#" style={{...styles.btn, ...styles.btnGoogle}} onClick={ (event) => this.handleSignInClick(event) }>
            <i className="fa fa-google-plus fa-lg"/>
            <span style={styles.btnSpan}>Log in with Google</span>
          </a>

        </div>
      )
    }
}

export default GoogleLogin;
