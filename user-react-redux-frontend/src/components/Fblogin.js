import React from 'react';

class FbLoginBtn extends React.Component {
  r = {};
  dataScope;
  constructor(props) {
    super(props);
     this.dataScope = this.props.dataScope;
    // post login behavior should be defined at a higher level
    this.onSuccess = this.props.onSuccess;
    this.onFailure = this.props.onFailure || (() => {});
    //this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  componentDidMount() {console.log('dataScope: '+this.dataScope);
    // This is the meat of the component
    // create a script tag, load FB SDK
    // then after script is loaded, set related behavior
    // If you have other components that rely on the FB SDK
    // I recommend extracting this into its own module
    let self = this;
    let scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=1250815578279698&fields=id,name";
    scriptTag.addEventListener('load', function (e) {
      self.FB = window.FB;
      // I don't like exposing the SDK to global scope
      //window.FB = null;

      // This subscribe the callback when login status change
      // Full list of events is here
      // https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v2.9
      self.FB.Event.subscribe('auth.statusChange', self.onStatusChange.bind(self));
      //self.FB.Event.subscribe('auth.login', self.login.bind(self));
    });
    document.body.appendChild(scriptTag);
  }

  onStatusChange(response) {
    console.log('response.authResponse: '+response.authResponse);
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse;
      //window.FB.login(function(response) {
    if (response.authResponse) {
     console.log('Welcome!  Fetching your information.... ');
     window.FB.api('/me',{fields:'name,email'}, function(res) {
       console.log(res);
       console.log('Good to see you, ' + res.name + '.');
       this.r = res;
       document.getElementById('status').innerHTML =
   	    'Thanks for logging in, ' + res.name + '!';
     });

    } else {
     console.log('User cancelled login or did not fully authorize.');
    }
//});
      // I have a afterLogin optional callback
      // which takes care of ads landing, invitation or any other custom behavior
      //this.onSuccess(accessToken, this.props.afterLogin);

    } else {
      document.getElementById('status').innerHTML = 'Please log ' +
	      'into this app.';
      this.onFailure();
    }
  }





  render() {
    const styles = {
      spinner:{

      }
    }
    return (
      <div
        className="fb-login-button"
        data-width={this.props.width}
        data-max-rows="1"
        data-size="medium"
        data-button-type="login_with"
        data-show-faces="false"
        data-auto-logout-link="true"
        data-use-continue-as="false"
        data-scope={this.props.dataScope}
      >
      </div>
    );
  }
}

export default FbLoginBtn;
