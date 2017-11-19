// ./user-react-redux-frontend/src/components/Register.js
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


export default class Register extends React.Component {
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
                    <h4>   <img alt="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" /><br/>Registering....</h4>
                   }
                   {!this.props.mappedUserState.isFetching && this.props.mappedUserState.error &&
                    <h4 className="errorText">{ this.props.mappedUserState.error}</h4>
                   }
                   {!this.props.mappedUserState.isFetching && !this.props.mappedUserState.error && this.props.mappedUserState.successMsg &&
                    <h4 className="successText">{ this.props.mappedUserState.successMsg}</h4>
                   }
                 </div>

             </div>
      </div>

    );
  }
}
