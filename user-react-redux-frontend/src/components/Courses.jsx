import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Loading from './Loading';
import '.././styles/Courses.css';

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
            coursesDiv:{
            //   display:'flex',
            //   flexDirection: 'row',
            //   flexWrap: 'wrap',
            },
            courseDiv:{
                // flex:'25%',
                // maxWidth:'25%',
                // backgroundColor: '#f1f1f1',
                // margin: 10,
                // textAlign: 'center',
                // height: 200,
                // fontSize: 30
            }
          
        }
        const { snackOpen, success } = this.state;
        const { isLoading, error, successMsg, video, } = this.props.mappedVideoState;
        const { loadingCourse, courseSuccess, courseError } = this.props.mappedcourseState;
        return (
            <div style={styles.container}>
            <div style={styles.innerContainer}>
            <h3 align="center">Courses </h3>
            <div className='coursesDiv' style={styles.coursesDiv}>
            <div className='courseDiv' style={styles.courseDiv}>
            <div className='courseContainer'>
            <div className='imgDiv'>
            <img src='https://d2eip9sf3oo6c2.cloudfront.net/series/square_covers/000/000/228/square_480/EGH_ReactStorybook_Final.png' />
            </div>
            <div className='courseTypeDiv'>
            <h5>COURSE <span>:</span> REACT</h5>
            </div>
            <div className='courseNameDiv'>
                <span>Design Systems with React and Typescript in Storybook</span>
            </div>
            <div className='userDiv'>
                <div className='userLeft'>
                   <img src='https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/211/square_64/swyx_ski.jpg'/>
                   <span>
                       Bipin Swarnkar
                   </span>
                </div>
                <div className='userRight'>
                    <img src='https://egghead.io/webpack/953a4599ba2243418484ce73333fb9c1.svg'/>
                </div>
            </div>
            </div>
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            <div className='courseDiv' style={styles.courseDiv}>
            1
            </div>
            </div>
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
