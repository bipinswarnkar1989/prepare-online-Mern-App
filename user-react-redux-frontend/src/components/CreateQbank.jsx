// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import {white,blueGrey500} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import Snackbar from 'material-ui/Snackbar';
import Clear from 'material-ui/svg-icons/content/clear';

class CreateQbank extends React.Component{
  constructor(props){
    super(props);
    this.handleQbSubmit = this.handleQbSubmit.bind(this);
    this.removeQbImage = this.removeQbImage.bind(this);
  }
  componentDidMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  handleQbSubmit(event){
    event.preventDefault();
    var qBform = document.getElementById('qbAddForm');
    if(qBform.title.value === '' || qBform.summary.value === ''){
     this.props.mappedfailedCreateQbank('Fill all required fields');
     return;
   }
   else{
       let data = new FormData();
       data.append('title',qBform.title.value);
       data.append('summary',qBform.summary.value);
       data.append('author',this.props.mappedUserState.user._id);
     if(qBform.qBImage.value !== ''){
       let qBImageName = document.getElementById('qBImage').files[0].name;
       let qBImageSize = document.getElementById('qBImage').files[0].size;
       let qBImageExt = qBImageName.split('.').pop();console.log('qBImageSize: '+qBImageSize)
       if(qBImageExt === 'jpg' || qBImageExt === 'jpeg' || qBImageExt === 'png' || qBImageExt ==='JPG' || qBImageExt === 'JPEG' || qBImageExt === 'bmp'){
         if(qBImageSize > 5389864){ //grater than 5MB
           this.props.mappedfailedCreateQbank('Image size should be less then 5MB');
           return;
         }
         data.append('qBImage', document.getElementById('qBImage').files[0]);
       }
       else{
         this.props.mappedfailedCreateQbank('Only Image Files Allowed');
         return;
       }
     }
     this.props.mappedCreateQbank(data);
     this.props.mappedpreviewQbImagePreview(null);
     qBform.reset();
   }
  }

  handleImageChange(e){
    let qBImageName = document.getElementById('qBImage').files[0].name;
    let qBImageSize = document.getElementById('qBImage').files[0].size;
    let qBImageExt = qBImageName.split('.').pop();
    if(qBImageExt === 'jpg' || qBImageExt === 'jpeg' || qBImageExt === 'png' || qBImageExt === 'JPG' || qBImageExt === 'JPEG' || qBImageExt === 'bmp'){
      if(qBImageSize > 5389864){
        this.props.mappedfailedCreateQbank('Image size should be less then 5MB');
      }
    }
    else{
      this.props.mappedfailedCreateQbank('Only Image Files Allowed');
      return;
    }
    console.log(e.target.files[0]);
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onload = (e) => {
        let imagePreviewUrl = e.target.result;
        this.props.mappedpreviewQbImagePreview(imagePreviewUrl);
      }
      reader.readAsDataURL(file);
  }

  removeQbImage(){
     this.props.mappedpreviewQbImagePreview(null);
  }

  render(){
    const styles = {
       CreateQbankDiv:{
         textAlign:'center',
         maxWidth:680,
         margin:'0 auto'
       },
       QbDetailsFormDiv:{
         textAlign:'center'
       },
       summaryfloatingLabelStyle:{
         textAlign:'left'
       },
       overRideRaisedButtonUppercase:{
         textTransform: 'none',
         fontSize:18
       },
       imagePreviewDiv:{
         position:'relative',
         width:200,
         height:200,
         textAlign:'center',
         margin:'0 auto',
         border:'1px solid #FF66B0'
       },
       removeImage:{
         top:0,
         right:0,
         position:'absolute',
         backgroundColor:'white',
         cursor:'pointer'
       }
    }

    const { CreateQbank,isFetching,successMsg,error } = this.props.mappedQbankState;
    return(
       <div align="center" style={styles.CreateQbankDiv}>
         <h3>Create New Question Bank</h3>
         <div style={styles.QbDetailsFormDiv}>
             <form onSubmit={this.handleQbSubmit} id='qbAddForm' >
                <TextField
                  ref='title'
                  name='title'
                  required={true}
                  floatingLabelText='Title'
                  hintText="Enter Question Bank Title"
                  fullWidth={true}
                  />
                  <TextField
                    ref='summary'
                    name='summary'
                    required={true}
                    floatingLabelText='Summary'
                    hintText="Enter Question Bank Summary"
                    fullWidth={true}
                    multiLine={true}
                    style={styles.summaryfloatingLabelStyle}
                    />
                  <div style={{display:'block',textAlign:'center'}}>
                    {CreateQbank.imagePreviewUrl &&
                      <div style={styles.imagePreviewDiv}>
                        <span style={styles.removeImage}><Clear onClick={this.removeQbImage} color={blueGrey500}/></span>
                        {CreateQbank.imagePreviewUrl &&
                         <img src={CreateQbank.imagePreviewUrl} width="200" height="200"/>
                        }
                      </div>
                    }
                  </div>
                  <div style={{display:'block'}}>
                    <RaisedButton
                      secondary={true}
                      label="Choose an Image"
                      labelPosition="before"
                      style={{margin: 12,textTransform: 'none'}}
                      containerElement="label"
                      icon={<FileUpload color={white} />}
                      labelStyle={{textTransform: 'none'}}
                      >
                      <input
                        onChange={e => {this.handleImageChange(e);}}
                        style={{ display: 'none' }}
                        type="file"
                        name="qBImage"
                        id="qBImage"
                        accept="image/*"
                      />
                    </RaisedButton>
                  </div>
                  <RaisedButton
                    label="Create"
                    primary={true}
                    style={{margin:12}}
                    labelStyle={styles.overRideRaisedButtonUppercase}
                    type="submit"
                      />
             </form>
         </div>

        <div align="center">
          <Snackbar
          open={successMsg != null ? true : error != null ? true : false}
          message={successMsg != null ? successMsg : error != null ? error : 'Loaded'}
          autoHideDuration={8000}
          onRequestClose={this.handleRequestClose}
        />
        </div>

       </div>
    )
  }
}



export default CreateQbank;
