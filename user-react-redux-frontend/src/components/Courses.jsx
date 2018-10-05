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
            success:'',
            snackOpen:false,
        }
        this.token = localStorage.getItem('userToken');
    }

    componentDidMount(){
        this.getCourses();
    }
    
     componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }
      
      async getCourses(){
          try {
              let page = this.props.params.page;
              let limit = this.props.params.limit;
              this.props.mappedrequestGetCourses();
              let resp = await fetch(`${apiUrl}/courses/${page}/${limit}`, {
                  method:'get',
                  headers: {
                    'authorization':this.token
                  }
              });
              let json = await resp.json(); 
               if (json.success) {
                   this.props.mappedrequestGetCoursesSuccess(json);
               } else {
                   this.props.mappedrequestGetCoursesFailed(json);
               }
          } catch (error) {
              let response = {
                  message:error.message,
                  success:false
              }
              alert(error.message);
              this.props.mappedrequestGetCoursesFailed(response);
          }
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
        const { loadingCourse, courseSuccess, courseError, courses } = this.props.mappedcourseState;
        return (
            <div style={styles.container}>
            <div style={styles.innerContainer}>
            <h3 align="center">Courses </h3>
            <div className='coursesDiv' style={styles.coursesDiv}>
            {courses && courses.length !== 0 &&
            courses.map(c => {
                return (
                    <div key={c._id} className='courseDiv' style={styles.courseDiv}>
                    <div className='courseContainer'>
                    <div className='imgDiv'>
                    <img src={`//localhost:3001/${c.image.replace('public', '')}`} />
                    </div>
                    <div className='courseTypeDiv'>
                    <h5 className='courseType'>COURSE <span>:</span> REACT</h5>
                    </div>
                    <div className='courseNameDiv'>
                        <span className='courseTitle' align='center'>{c.name}</span>
                    </div>
                    <div className='userDiv'>
                        <div className='userLeft'>
                           <img className='avatar' src='https://d2eip9sf3oo6c2.cloudfront.net/instructors/avatars/000/000/211/square_64/swyx_ski.jpg'/>
                           <div style={{display:'flex', flexDirection:'column'}}>
                           <div>
                           <span className='userFullName'>
                               Bipin Swarnkar
                           </span>
                           </div>
                           <div>
                               <span className='lessonsNumber'>9 lessons</span>
                           </div>
                           </div>
                        </div>
                        <div className='userRight'>
                            <img title='Free To Watch' alt='Free To Watch' src='https://egghead.io/webpack/953a4599ba2243418484ce73333fb9c1.svg'/>
                        </div>
                    </div>
                    </div>
                    </div> 
                )
            })
            
            }
            
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
