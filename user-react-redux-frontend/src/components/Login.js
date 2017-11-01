// ./user-react-redux-frontend/src/components/Login.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Login extends React.Component {
  // constructor(props) {
  //   super(props);
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
        }
};
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

             </div>
      </div>

    );
  }
}
