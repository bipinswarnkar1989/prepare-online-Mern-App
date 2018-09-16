import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';

const apiUrl = `http://localhost:3001/api/videos`;

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            videofiles:[],
            progress:0,
            success:null,
            snackOpen:false
        }
        this.uploadVideo = this.uploadVideo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }

      uploadVideoThroughFetch(event){
      this.props.mappedrequestUploadVideo();
      let file = event.target.files[0];
      const data = new FormData();
      data.append('video', file);
      data.append('author',this.props.mappedUserState.user._id);
      console.log(file);
      const token = localStorage.getItem('userToken');
       fetch(apiUrl, {
           method:'post',
           body:data,
           headers: { 'authorization':token }
       }).then((resp) => {
           if (resp.ok) {
               resp.json().then((json) => {
                   console.log(json)
                   if (json.success) {
                       this.props.mappedsuccessUploadVideo(json);
                   } else {
                       this.props.mappedfailedUploadVideo(json);
                   }
               })
           } else {
               let json = {
                   message:resp.statusText
               }
               this.props.mappedfailedUploadVideo(json);
           }
       })
      }

      uploadVideo(event){
        var _this = this;
        this.props.mappedrequestUploadVideo();
        let file = event.target.files[0];
        const data = new FormData();
        data.append('video', file);
        data.append('author',this.props.mappedUserState.user._id);
        console.log(file);
        const token = localStorage.getItem('userToken');
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                try {
                    if (xhr.status === 200) {
                    var resp = JSON.parse(xhr.response);
                    console.log(resp);
                    if (resp.success) {
                        _this.props.mappedsuccessUploadVideo(resp);
                    } else {
                        _this.props.mappedfailedUploadVideo(resp);
                    }
                  }
                } catch (error) {
                    alert(error.message);
                }
            }
        }
        xhr.upload.addEventListener('progress', function(e){
            document.getElementById('_progress').style.width = Math.ceil(e.loaded/e.total) * 100 + '%'; //  loaded is a value of how much data has been sent to the server, and the total value is the overall amount of data to be sent, therefore we can use these two to work out a percentage, and set the progress bar to that width
        }, false);

        xhr.upload.addEventListener('load', function (e) {
            console.log(e)
            _this.setState({
                snackOpen:true,
                success:'Video Uploaded Successfully'
            })
        }, false);

        xhr.ontimeout = function () {
            console.error("The request for " + apiUrl + " timed out.");
            alert(("The request for " + apiUrl + " timed out."))
        };

        xhr.onerror = function (e) {
            console.error(xhr.statusText);
            alert(xhr.statusText);
          };

        xhr.open('POST', apiUrl, true);
        xhr.send(data);
      }
      
      handleSubmit(event){
        event.preventDefault();
        let data = {
            name:this.state.name,
            author:this.props.mappedUserState.user._id,
            description:this.state.description,
            videos:[]

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
            addContainer:{
               display: 'flex',
               alignContent: 'center',
               flexDirection: 'column',
            },
            formDiv:{
              display:'flex',
              flexDirection: 'column',
              padding: 50,
              
              
            },
            fileBtnCss:{
                position:'relative',
                backgroundColor:'#E64A65',
                color:'white',
                textAlign:'center',
                padding: 2,
                borderRadius: 4,
                width:80,
                
            },
            inputFile:{
                position:'absolute',
                opacity:0,
                filter:'alpha(opacity=0)',
                width:'100%',
                height:'100%',
                display: 'block',
                top: 0,
                right: 0,
            }
        }
        const { name, description } = this.state;
        const { isLoading, error, successMsg, video } = this.props.mappedVideoState;
        return (
            <div style={styles.container}>
            <div style={styles.addContainer}>
            <Card>
            <CardHeader
      title="Add Course"
    />
             <div style={styles.formDiv}>
             <form onSubmit={this.handleSubmit}>
             <TextField
             required
             fullWidth
             hintText="Course name"
             floatingLabelText="Enter course name"
             defaultValue={name}
             onChange={value => this.setState({
                 name:value
             })}
             />
              <TextField
             multiline
             fullWidth
             hintText="Description"
             floatingLabelText="Enter course description"
            value={this.state.description}
             onChange={value => this.setState({
                 description:value
             })}
             />
             <div style={styles.fileBtnCss}>
               <Add  color={white}/>
               <span style={{ height:'100%', display:'block'}}>Video</span>
               <input type="file" 
               style={styles.inputFile} 
               onChange={this.uploadVideo}
               multiple={true}
               accept="video/mp4,video/x-m4v,video/*"
               />
            </div>
            <div style={{display:'block', textAlign:'center'}}>
               <div>
               {isLoading && 
                   <span style={{}}>Uploading....</span>
               }
               {successMsg && 
                  successMsg
               }
               <div style={{border:'1px solid #77B5EE'}} className='progress_outer'>
               <div style={{width:'0%', backgroundColor:'#77B5EE', height:20, transition:'width 2.5s ease'}} id='_progress' className='progress'></div>
               </div>
               </div>
            
            </div>
            <div style={{display:'block', padding:20}}>
            <RaisedButton type="submit" primary={true} label="Submit" fullWidth={true} />
            </div>
             </form>
            
             </div>
            </Card>
            </div>
            <Snackbar
          open={this.state.snackOpen}
          message={this.state.success}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
          style={{textAlign:'center'}}
        />
            </div>
        );
    }
}

AddCourse.propTypes = {};

export default AddCourse;
