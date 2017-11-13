// ./user-react-redux-frontend/src/components/Register.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event){
    event.preventDefault();
    const fullname = this.refs.fullname.input.value;
    const email = this.refs.email.input.value;
    const password = this.refs.password.input.value;
    const data = {
      fullname:fullname,
      email:email,
      password:password
    };
    this.props.signUp(data);
  }

  render(){
    const styles = {
        registerContainer: {
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
      <div style={styles.registerContainer}>
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
                 <div className="msgBox">
                   {this.props.mappedUserState.isFetching &&
                    <h4>Registering....</h4>
                   }
                   {!this.props.mappedUserState.isFetching && this.props.mappedUserState.error &&
                    <h4>{ this.props.mappedUserState.error}</h4>
                   }
                 </div>

             </div>
      </div>

    );
  }
}
