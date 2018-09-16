import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const apiUrl = `http://localhost:3001/api/videos`;

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            videofiles:[],
            progress:0
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
        
        var request = new XMLHttpRequest();
        request.onreadystatechange = function () {
            if (request.readyState == 4) {
                try {
                    var resp = JSON.parse(request.response);
                    console.log(resp);
                    if (resp.success) {
                        _this.props.mappedsuccessUploadVideo(resp);
                    } else {
                        _this.props.mappedfailedUploadVideo(resp);
                    }
                } catch (error) {
                    var resp = {
                        status: 'error',
                        data: 'Unknown error occurred: [' + request.responseText + ']'
                    };
                }
                console.log(resp.status + ': ' + resp.data);
            }
        }
        request.upload.addEventListener('progress', function(e){
            document.getElementById('_progress').style.width = Math.ceil(e.loaded/e.total) * 100 + '%';
        }, false);

        request.open('POST', apiUrl);
        request.send(data);
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
               <div style={{border:'1px solid #000'}} className='progress_outer'>
               <div style={{width:'20%', backgroundColor:'#DEDEDE', height:20, transition:'width 2.5s ease'}} id='_progress' className='progress'></div>
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
            </div>
        );
    }
}

AddCourse.propTypes = {};

export default AddCourse;
