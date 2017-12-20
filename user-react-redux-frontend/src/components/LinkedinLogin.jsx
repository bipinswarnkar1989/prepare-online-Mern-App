import React from 'react';


class LinkedinLogin extends React.Component{
    constructor(props) {
        super(props)
    }

    componentDidMount(){
            var e = document.createElement("script");
            e.type = "text/javascript";
            e.async = true;
            e.src = "http://platform.linkedin.com/in.js";
            e.text = "api_key: 81s9xziqg4fhlb";
            document.body.appendChild(e);
    }

    getUserDetails = () => {
      var self = this;
        window.IN.User.authorize( function(){
            window.IN.API.Profile("me")
                .fields(["id", "firstName", "lastName", "pictureUrl", "publicProfileUrl","email-address"])
                .result(function(resp) {
                    console.log(resp.values[0]);
                    resp = resp.values[0];
                    if(resp.id){
                      let fullName = resp.firstName+' '+resp.lastName;
                      const userData = {
                        name:fullName,
                        email:resp.emailAddress,
                        id:resp.id,
                        provider:'linkedin',
                        gender: '',
                        picture: resp.pictureUrl,
                        password: resp.id
                      }
                        self.props.signUpSocialUser(userData);
                      }
                })
                .error(function(err) {
                    console.log('Import error - Error occured while importing data')
                });
        });
    }

   handleSignInClick = (event) => {
     event.preventDefault();
     this.getUserDetails();
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
      background: '#0077B5'
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
