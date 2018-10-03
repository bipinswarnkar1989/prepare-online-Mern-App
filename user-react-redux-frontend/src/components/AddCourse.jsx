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

class AddCourse extends React.Component {
    token;
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            videofiles:[],
            progress:0,
            success:null,
            snackOpen:false,
            image:null,
            imagePreview:null,
            imgUploadProgress:0
        }
        this.uploadVideo = this.uploadVideo.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.token = localStorage.getItem('userToken');
        this.handleImageChange = this.handleImageChange.bind(this);
        this.removeImage = this.removeImage.bind(this);
    }
    
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }

      handleImageChange(event){
        var _this = this;
        const file = event.target.files[0];console.log(file)
        this.setState({
            image:file,
        });
        const fileReader = new FileReader();
        fileReader.onload = (r) => {
            let preview = r.target.result;
            console.log(preview);
            _this.setState({
               imagePreview:preview
            });
        }
        fileReader.readAsDataURL(file);
        this.uploadImage(file);
      }

      

      removeImage(){
          this.setState({
            image:null,
            imagePreview:null,
          })
      }

      uploadVideoThroughFetch(event){
      this.props.mappedrequestUploadVideo();
      let file = event.target.files[0];
      const data = new FormData();
      data.append('video', file);
      data.append('author',this.props.mappedUserState.user._id);
      console.log(file);
      
       fetch(`${apiUrl}/videos`, {
           method:'post',
           body:data,
           headers: { 'authorization':this.token }
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

      handleChange(event){
        let file = event.target.files[0];
        let fileId = file.lastModified + file.size;
        let newElement = {
            fileId:fileId,
            file:file,
            uploadProgress:0,
            processed:false,
            src:null,
            isLoading:false
        };
        let newFile = [...this.state.videofiles, newElement];
        this.setState({
            videofiles:newFile
        }, () => {
            console.log(this.state.videofiles);
            var numFiles = this.state.videofiles;
            for (var i = 0; i < numFiles.length; i++) {
                var file = numFiles[i];
                if (!file.processed) {
                    let fileObject = { ...file, processed:true, isLoading:true }
        console.log(fileObject)
        let newVideofiles = this.state.videofiles.map((item) => {
            if (item.fileId === fileObject.fileId) {
                return fileObject;
            }
            return item;
        })
        this.setState({
            videofiles:newVideofiles
        }, () => {
            console.log(this.state.videofiles);
            this.uploadVideo(fileObject);
        });
                    
                }
              }
        })
        
      }

      uploadVideo(f){
       const fileElement = f;
       console.log(fileElement);//return;
        var _this = this;
        let file = fileElement.file;
        this.props.mappedrequestUploadVideo();
        
        // var source = document.getElementById('video_here');
        // source.src = window.URL.createObjectURL(file);
        //source.parent()[0].load();
        const src = window.URL.createObjectURL(file);

        const data = new FormData();
        data.append('video', file);
        data.append('author',this.props.mappedUserState.user._id);
        data.append('status', 'draft');
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
                        setTimeout(function(){
                            _this.setState({
                                snackOpen:true,
                                success:resp.message
                            })
                        }, 1000)
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
            console.log('fileElement: '+ JSON.stringify(fileElement))
            //document.getElementById('_progress').style.width = Math.ceil(e.loaded/e.total) * 100 + '%'; //  loaded is a value of how much data has been sent to the server, and the total value is the overall amount of data to be sent, therefore we can use these two to work out a percentage, and set the progress bar to that width
            var percentCompleted = Math.ceil(e.loaded/e.total) * 100; 
            const fileObject = { ...fileElement, uploadProgress: percentCompleted, src: src, isLoading: false }
              _this.setState({
                  uploadProgress:percentCompleted
              })
              console.log(fileObject)
        let newVideofiles = _this.state.videofiles.map((item) => {
            if (item.fileId === fileObject.fileId) {
                return fileObject;
            }
            return item;
        })
        _this.setState({
            videofiles:newVideofiles
        });
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

        xhr.open('POST', `${apiUrl}/videos`, true);
        xhr.send(data);
      }

      uploadImage(image){
          let data = new FormData();
          const token = localStorage.getItem('userToken');
          data.append('image', image);
          var xhr = new XMLHttpRequest();
          
    }
      
      handleSubmit(event){
        event.preventDefault();
        const data = {
            name:this.state.name,
            author:this.props.mappedUserState.user._id,
            description:this.state.description,
            videos:this.props.mappedVideoState.videoIds
        };console.log(data)
        if (this.state.name && data.author && this.props.mappedVideoState.videoIds.length > 0) {
            this.props.mappedrequestAddCourse();
            fetch(`${apiUrl}/courses`, {
                method:'post',
                body:JSON.stringify(data),
                headers:{ 
                    'authorization':this.token,
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                 }
            }).then(resp => {
                if (resp.ok) {
                    resp.json().then(json => {
                        if(json.success){
                       this.props.mappedrequestAddCourseSuccess(json);
                       this.setState({
                        snackOpen:true,
                        success:json.message,
                        name:'',
                        description:'',
                        videofiles:[],
                    })
                        } else {
                            this.props.mappedrequestAddCourseFailed(json);
                        }
                    })
                } else {
                    alert(resp.statusText);
                    
                }
            })
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
        const { name, description, videofiles, imagePreview, imgUploadProgress } = this.state;
        const { isLoading, error, successMsg, video, } = this.props.mappedVideoState;
        const { loadingCourse, courseSuccess, courseError } = this.props.mappedcourseState;
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
             onChange={event => this.setState({
                name:event.target.value
            })}
            value={this.state.name}
             />
              <TextField
             multiline
             fullWidth
             hintText="Description"
             floatingLabelText="Enter course description"
             defaultValue={this.state.description}
             onChange={event => this.setState({
                 description:event.target.value
             })}
             value={this.state.description}
             />
            <div style={{textAlign:'center', display:'block', padding:5, marginBottom:10}}>
            {imagePreview && 
              <div style={{position:"relative", width:'99%'}}>
                 <span onClick={this.removeImage} style={{position:'absolute', right:1,top:1, cursor:'pointer'}}>X</span>
                  <img src={imagePreview} />
                  <div style={{position:'absolute', top:'50%', width:'99%', margin:'0 auto'}}>
                  <div style={{border:'1px solid #77B5EE'}} className='progress_outer'>
                <div style={{width:`${imgUploadProgress}%`, backgroundColor:'#77B5EE', height:20, transition:'width 2.5s ease'}} id='_progress' className='progress'></div>
                </div>
                </div>
                  </div>
            }
            <label for="file-upload" class="custom-file-upload">
                <i class="fa fa-cloud-upload"></i> Browse Course Image
            </label>
            <input id="file-upload" type="file" onChange={this.handleImageChange}/>
            </div>
            
             <div style={styles.fileBtnCss}>
               <Add  color={white}/>
               <span style={{ height:'100%', display:'block'}}>Video</span>
               <input type="file" 
               style={styles.inputFile} 
               onChange={this.handleChange}
               multiple={true}
               accept="video/mp4,video/x-m4v,video/*"
               />
            </div>
            {loadingCourse && 
                   <div>
                   <Loading/>
                   </div>
               }
           <div style={{display:'flex', flexDirection:'row', flexWrap:'wrap'}}>
           {videofiles && videofiles.length !== 0 && 
             videofiles.map((v) => {
                return (
                    <div style={{display:'block', textAlign:'center', padding:10, width:310, height:'auto'}}>
                <div>
                <div style={{position:'relative', width:'99%'}}>
                {v.isLoading && 
                <div style={{position:'absolute', zIndex:9, width:'100%', height:'100%', backgroundColor:'rgb(255,0,0,0.5)'}}></div>
                }
                <video src={v.src} width="300" controls id="video_here">
                 <source />
                  Your browser does not support HTML5 video.
               </video>
                </div>
                <div style={{border:'1px solid #77B5EE'}} className='progress_outer'>
                <div style={{width:`${v.uploadProgress}%`, backgroundColor:'#77B5EE', height:20, transition:'width 2.5s ease'}} id='_progress' className='progress'></div>
                </div>
                </div>
             </div>
                )
             })
           }
           </div>
{this.state.author}
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
