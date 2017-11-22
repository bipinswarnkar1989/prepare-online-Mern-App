// ./user-react-redux-frontend/src/components/Login.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {grey500, white} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import FbLoginBtn from './Fblogin'

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
  }

  componentWillMount(){
    this.props.mappedUserState.error = null;
    this.props.mappedUserState.successMsg = null;
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

  // fb sd code begins
  componentDidMount() {

	  window.fbAsyncInit = function() {
	    window.FB.init({
	      appId      : '1250815578279698',
	      cookie     : true,  // enable cookies to allow the server to access
	                        // the session
	      xfbml      : true,  // parse social plugins on this page
	      version    : 'v2.1' // use version 2.1
	    });

	    // Now that we've initialized the JavaScript SDK, we call
	    // FB.getLoginStatus().  This function gets the state of the
	    // person visiting this page and can return one of three states to
	    // the callback you provide.  They can be:
	    //
	    // 1. Logged into your app ('connected')
	    // 2. Logged into Facebook, but not your app ('not_authorized')
	    // 3. Not logged into Facebook and can't tell if they are logged into
	    //    your app or not.
	    //
	    // These three cases are handled in the callback function.
      //window.FB.Event.subscribe('auth.statusChange', this.statusChangeCallback());
	    window.FB.getLoginStatus(function(response) {
	      this.statusChangeCallback(response);
	    }.bind(this));
	  }.bind(this);

	  // Load the SDK asynchronously
	  (function(d, s, id) {
	    var js, fjs = d.getElementsByTagName(s)[0];
	    if (d.getElementById(id)) return;
	    js = d.createElement(s); js.id = id;
	    js.src = "//connect.facebook.net/en_US/sdk.js";
	    fjs.parentNode.insertBefore(js, fjs);
	  }(document, 'script', 'facebook-jssdk'));

	}

	// Here we run a very simple test of the Graph API after login is
	// successful.  See statusChangeCallback() for when this call is made.
	testAPI() {
	  console.log('Welcome!  Fetching your information.... ');
	  window.FB.api('/me', function(response) {
	  console.log('Successful login for: ' + response.name);
	  document.getElementById('status').innerHTML =
	    'Thanks for logging in, ' + response.name + '!';
	  });
	}

	// This is called with the results from from FB.getLoginStatus().
	statusChangeCallback(response) {
	  console.log('statusChangeCallback');
	  console.log(response);
	  // The response object is returned with a status field that lets the
	  // app know the current login status of the person.
	  // Full docs on the response object can be found in the documentation
	  // for FB.getLoginStatus().
	  if (response.status === 'connected') {
	    // Logged into your app and Facebook.
	    this.testAPI();
      window.FB.Event.subscribe('auth.statusChange', this.fbAuthStatusChangeCallback);
      // Reload the same page
           //window.location.reload();
	  } else if (response.status === 'not_authorized') {
	    // The person is logged into Facebook, but not your app.
	    document.getElementById('status').innerHTML = 'Please log ' +
	      'into this app.';
	  } else {
	    // The person is not logged into Facebook, so we're not sure if
	    // they are logged into this app or not.
	    document.getElementById('status').innerHTML = 'Please log ' +
	    'into Facebook.';
	  }
	}

  fbAuthStatusChangeCallback = (response) => {
  console.log("auth_status_change_callback: " + response.status);
  window.FB.api('/me', function(response) {
  console.log('Successful login for: ' + response.name);
  this.props.mappedUserState.isLoggedIn = true;
  this.props.mappedUserState.user.fullName = response.name;
  document.getElementById('status').innerHTML =
    'Thanks for logging in, ' + response.name + '!';
  });
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

  onSuccess(response){
    document.getElementById('status').innerHTML =
	    'Thanks for logging in, ' + response.name + '!';
	     console.log('Success')
  }

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
        marginTop:50,
        backgroundColor:'green',
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
      marginLeft: 5
    }
};
     const { isFetching,error,successMsg } = this.props.mappedUserState;
    return(
      <div style={styles.loginContainer}>
      <div>


                 <h1>Login</h1>

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
                <Col md={6}>
            <a href="#" onClick={this.handleClick} style={{...styles.btn, ...styles.btnFacebook}}>
              <i className="fa fa-facebook fa-lg"/>
              <span style={styles.btnSpan}>Log in with Facebook</span>
            </a>
          </Col>
          <Col md={6}>
            <Link to="/" style={{...styles.btn, ...styles.btnGoogle}}>
              <i className="fa fa-google-plus fa-lg"/>
              <span style={styles.btnSpan}>Log in with Google</span>
            </Link>
          </Col>
        </Row>
      </Grid>
          </div>
             </div>
             <FbLoginBtn
  width="250"
  dataScope="public_profile,email"
  onSuccess={this.onSuccess}
  onFailure={() => {}}
  afterLogin={() => {}}
/>
      </div>

    );
  }
}
