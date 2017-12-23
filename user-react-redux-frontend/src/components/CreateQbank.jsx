// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import {white} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';

class CreateQbank extends React.Component{
  constructor(props){
    super(props);
    this.handleQbSubmit = this.handleQbSubmit.bind(this);
  }
  componentWillMount(){
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
     if(qBform.qBImage.value !== ''){
       let qBImageName = document.getElementById('qBImage').files[0].name;
       let qBImageExt = qBImageName.split('.').pop();
       if(qBImageExt == 'jpg' || qBImageExt == 'jpeg' || qBImageExt == 'png' || qBImageExt == 'JPG' || qBImageExt == 'JPEG' || qBImageExt === 'bmp'){
         data.append('qBImage', document.getElementById('qBImage').files[0]);
       }
     }
     this.props.mappedCreateQbank(data);
     qBform.reset();
   }
  }

  handleImageChange(e){
    console.log(e.target.files[0]);
      let reader = new FileReader();
      let file = e.target.files[0];

      reader.onload = (e) => {
        let imagePreviewUrl = e.target.result;
        this.props.mappedpreviewQbImagePreview(imagePreviewUrl);
      }
      reader.readAsDataURL(file);
      //this.imagePreviewUrl = reader.result;
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
       }
    }

    const { CreateQbank } = this.props.mappedQbankState;
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
                  <div style={{display:'block'}}>
                    {CreateQbank.imagePreviewUrl &&
                     <img src={CreateQbank.imagePreviewUrl} width="200" height="200"/>
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
       </div>
    )
  }
}



export default CreateQbank;
