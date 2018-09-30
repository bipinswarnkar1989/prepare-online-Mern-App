import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Loading from './Loading';

const apiUrl = `http://localhost:3001/api`;

class Courses extends React.Component {
    token;
    constructor(props) {
        super(props);
        this.state = {
            success:null,
            snackOpen:false,
        }
        this.token = localStorage.getItem('userToken');
    }
    
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }

     
      handleRequestClose = () => {
        this.setState({
            snackOpen: false,
        });
      };

    render() {
        const styles = {
            container:{
              flex: 1,
            },
            innerContainer:{
               display: 'flex',
               alignContent: 'center',
               flexDirection: 'column',
            },
            formDiv:{
              display:'flex',
              flexDirection: 'column',
              padding: 50,
            },
          
        }
        const { snackOpen, success } = this.state;
        const { isLoading, error, successMsg, video, } = this.props.mappedVideoState;
        const { loadingCourse, courseSuccess, courseError } = this.props.mappedcourseState;
        return (
            <div style={styles.container}>
            <div style={styles.innerContainer}>
            <h3 align="center">Courses </h3>
            
            </div>
            <Snackbar
          open={snackOpen}
          message={success}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          style={{textAlign:'center'}}
        />
            </div>
        );
    }
}

Courses.propTypes = {};

export default Courses;
