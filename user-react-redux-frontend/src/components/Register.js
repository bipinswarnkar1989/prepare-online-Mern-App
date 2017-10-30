// ./user-react-redux-frontend/src/components/Register.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
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
        registerButton: {
          marginTop:20
        },
        buttonLabel:{
          textDecoration:'none'
        }
};
    return(
      <div style={styles.loginContainer}>
      <div>


                 <h1>Register</h1>

                 <form onSubmit={this.handleSubmit} onChange={this.clearErrors}>
                   <div className="row collapse">
                     <TextField
                       ref="fullname"
                       name="fullname"
                       required={true}
                       errorText=""
                       type="text"
                       floatingLabelText="Fullname"
                       fullWidth={true} />
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

                     <RaisedButton style={styles.registerButton} type="submit" label="Submit" primary={true} fullWidth={true} labelStyle={styles.buttonLabel}/>
                   </div>
                 </form>

             </div>
      </div>

    );
  }
}
