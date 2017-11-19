// ./user-react-redux-frontend/src/components/Login.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {Link} from 'react-router';
import {grey500, white} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
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
            <Grid>
             <Row>
                <Col md={6}>
            <a href="http://localhost:3001/login/facebook" style={{...styles.btn, ...styles.btnFacebook}}>
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
      </div>

    );
  }
}
