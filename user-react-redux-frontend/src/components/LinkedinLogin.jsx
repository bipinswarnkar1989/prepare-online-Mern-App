import React from 'react';


class LinkedinLogin extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        (function() {
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "http://platform.linkedin.com/in.js?async=true";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        })();
    }

    //Trigger Login for LinkedIn
    linkedinLogin = () => {
        window.IN.init({
            api_key : 'config.linkedin'
        });
        setTimeout(function(){
                this.getUserDetails()
            }.bind(this),1000);
        console.log( "Loaded" )
    }

    getUserDetails = () => {
        window.IN.User.authorize( function(){
            window.IN.API.Profile("me")
                .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl"])
                .result(function(result) {
                    console.log(result);
                    alert("Successfull login from linkedin : "+ result.values[0].firstName + " " + result.values[0].lastName);
                })
                .error(function(err) {
                    console.log('Import error - Error occured while importing data')
                });
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
    btnLinkedIn: {
      background: '#0075BA'
    },
    btnSpan: {
      marginLeft: 5,
      padding:'14px'
    }
      }
        return(
          <div>
            <a href="#" style={{...styles.btn, ...styles.btnLinkedIn}} onClick={ (event) => this.handleSignInClick(event) }>
              <i className="fa fa-linkedin fa-lg"/>
              <span style={styles.btnSpan}>Log in with LinkedIn</span>
            </a>

          </div>
        )
    }
}

export default LinkedinLogin;
