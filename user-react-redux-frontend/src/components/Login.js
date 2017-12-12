// ./user-react-redux-frontend/src/components/Login.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {grey500, white} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
//import FbLoginBtn from './Fblogin';
import { browserHistory } from 'react-router';
import GoogleLogin from './GoogleLogin';
import LinkedinLogin from './LinkedinLogin';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
     this.handleClick = this.handleClick.bind(this);
    // this.onSuccess = this.onSuccess.bind(this);
  }

  componentWillMount(){
    this.props.mappedUserState.error = null;
    this.props.mappedUserState.successMsg = null;
    this.props.mappedfetchUserIfLoggedIn();
  }

  handleSubmit(event){
    event.preventDefault();
    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    const data = {
      email:email,
      password:password
    };
    this.props.signIn(data);
  }

  componentDidUpdate(w){
   console.log('loads when same router clicked again');
  }

  // fb sd code begins
  componentDidMount() {

	  window.fbAsyncInit = function() {
	    window.FB.init({
	      appId      : '1250815578279698',
	      cookie     : true,  // enable cookies to allow the server to access
	                        // the session
	      xfbml      : true,  // parse social plugins on this page
	      version    : 'v2.11' // use version 2.1
	    });

      //window.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback());
      /* comment by bipin: it redirect if user is logged in fb */
	    // window.FB.getLoginStatus(function(response) {
	    //   this.statusChangeCallback(response);
	    // }.bind(this));
	  }.bind(this);

    // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;js.async = true;
	    js.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.11";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));
	}

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
    console.log('response.status: '+response.status);
    window.FB.Event.subscribe('auth.statusChange', this.fbAuthStatusChangeCallback.bind(this));

	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
    if (response.status === 'connected') {
  // the user is logged in and has authenticated your
  // app, and response.authResponse supplies
  // the user's ID, a valid access token, a signed
  // request, and the time the access token
  // and signed request each expire
  var uid = response.authResponse.userID;
  var accessToken = response.authResponse.accessToken;
  this.fbAuthStatusChangeCallback(response);
} else if (response.status === 'not_authorized') {
  // the user is logged in to Facebook,
  // but has not authenticated your app
} else {
  // the user isn't logged in to Facebook.
}
	}

  fbAuthStatusChangeCallback = (response) => {
      var self = this;
  console.log("auth_status_change_callback: " + response.status);
  window.FB.api('/me',{fields:'email,name,first_name,last_name,link,gender,locale,picture,id,age_range'}, function(response) {
  console.log('Successful login for: ' + response.name);
  response.provider = 'facebook';
  response.picture = `https://graph.facebook.com/${response.id}/picture?type=large`
  console.log(response);
  self.signUpSocialUser(response);
  });
}

signUpSocialUser(u){
  this.props.mappedSignUpSocialUser(u);
}

	// This function is called when someone finishes with the Login
	// Button.  See the onlogin handler attached to it in the sample
	// code below.
	checkLoginState() {
	  window.FB.getLoginStatus(function(response) {
	    this.statusChangeCallback(response);
	  }.bind(this));
	}

	handleClick(event) {
    event.preventDefault();
	  window.FB.login(this.checkLoginState());
	}
  //
  // onSuccess(response){
  //   document.getElementById('status').innerHTML =
	//     'Thanks for logging in, ' + response.name + '!';
	//      console.log('Success')
  // }



  render(){
    const styles = {
        loginContainer: {
          height: 'auto',
          top: '10%',
          left: 0,
          right: 0,
          margin: 'auto',
          textAlign:'center',
          maxWidth:600
        },
        loginButton: {
          marginTop:20
        },
        buttonLabel:{
          textDecoration:'none'
        },
        buttonsDiv: {
        textAlign: 'center',
        padding: 10,
        marginTop:50
        },
        btn: {
      background: '#4f81e9',
      color: white,
      padding: 7,
      borderRadius: 2,
      fontSize: 13,
      textDecoration:'none',
      display:'block'
    },
    btnFacebook: {
      background: '#4f81e9'
    },
    btnGoogle: {
      background: '#e14441'
    },
    btnSpan: {
      marginLeft: 5,
      padding:'14px'
    }
};

     const { isFetching,error,successMsg } = this.props.mappedUserState;
     const user = this.props.mappedUserState.user;

    return(
      <div style={styles.loginContainer}>
      <div>


                 <h1>Login </h1>

                 <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                   <div className="row collapse">

                     <TextField
                       ref="email"
                       name="email"
                       required={true}
                       errorText=""
                       type="email"
                       floatingLabelText="Email"
                       fullWidth={true} />

                     <TextField
                       ref="password"
                       name="password"
                       required={true}
                       errorText=""
                       type="password"
                       floatingLabelText="Password"
                        fullWidth={true} />

                     <RaisedButton style={styles.loginButton} type="submit" label="Submit" primary={true} fullWidth={true} labelStyle={styles.buttonLabel}/>
                   </div>
                 </form>
                 <div className="msgBox">
                   {isFetching &&
                    <h4>   <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /><br/>Logging in....</h4>
                   }
                   {!isFetching && error &&
                    <h4 className="errorText">{error}</h4>
                   }
                   {!isFetching && !error && successMsg &&
                    <h4 className="successText">{ successMsg}</h4>
                   }
                 </div>

          <div style={styles.buttonsDiv}>

       <div id="status">
       </div>
            <Grid>
             <Row>
                <Col md={4}>
                  <a href="#" onClick={this.handleClick} style={{...styles.btn, ...styles.btnFacebook}}>
               <i className="fa fa-facebook fa-lg"/>
               <span style={styles.btnSpan}>Log in with Facebook</span>
             </a>
                  {/*
                    <div
                      className="fb-login-button"
                      data-width=""
                      data-max-rows="1"
                      data-size="large"
                      data-button-type="login_with"
                      data-show-faces="false"
                      data-auto-logout-link="false"
                      data-use-continue-as="true"
                      data-scope="public_profile,email"
                    >
                  </div>
                  */}
          </Col>
          <Col md={4}>
            <GoogleLogin signUpSocialUser = {(u) => this.signUpSocialUser(u)}/>
          </Col>
          <Col md={4}>
            <LinkedinLogin signUpSocialUser = {(u) => this.signUpSocialUser(u)}/>
          </Col>
        </Row>
      </Grid>
          </div>
             </div>

      </div>

    );
  }
}
