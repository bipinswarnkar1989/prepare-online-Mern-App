// ./user-react-redux-frontend/src/components/CreateQbank.jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import { pink300,pink500,white,red300,black,blue500,red400,grey800
 } from 'material-ui/styles/colors';
//import { Grid, Row, Col } from 'react-material-responsive-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Edit from 'material-ui/svg-icons/image/edit';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import {AddQuestion} from './AddQuestion';
import ViewQuestions from './ViewQuestions';
import DeleteQbQuestionDialog from './DeleteQbQuestionDialog';
import EditQuestion from './EditQuestion';
import BookMarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookMarked from 'material-ui/svg-icons/action/bookmark';
import IconButton from 'material-ui/IconButton';

const qbCardstyles = {
  EditQb:{
    top:10,
    right:40,
    position:'absolute',
    cursor:'pointer'
  },
  DeleQb:{
    top:10,
    right:10,
    position:'absolute',
    cursor:'pointer'
  },
  UpdateQbImage:{
    position:'absolute',
    right:10,
    top:10,
    cursor:'pointer',
    verticalAlign: 'middle',
    color:white,
    backgroundColor:'rgba(255, 255, 255, 0.5)',
    MsFilter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#CCFFFFFF, endColorstr=#CCFFFFFF)',
    filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#CCFFFFFF, endColorstr=#CCFFFFFF)',
    fontSize:14,
    textTransform: 'none',
  },
  uploadInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
    zIndex:12
  },
  overRideRaisedButtonUppercase:{
    textTransform: 'none',
    fontSize:12,
  },
  BookMarkBorder:{
    left:'20%',
    bottom:10,
    position:'absolute',
    cursor:'pointer',
    color:grey800,

  }
}

const QuestionBankCard = (props) => {
  let CheckImg = props.qb.image || props.UpdateQbank.imagePreviewUrl || null;
  let { user, userBookMarks, qb } = props;
  return(
  <Card onExpandChange={props.handleExpandChange}>
    {!props.expandQb &&
    <CardHeader
          title={props.qb.title}
          subtitle={`Add Questions to Question Bank ${props.qb.title}`}
          actAsExpander={false}
          showExpandableButton={true}

        />
    }
      {props.expandQb &&
       <div>
         <CardHeader
           title={props.qb.author.fullName}
           textStyle={{verticalAlign:'73%'}}
           subtitle=""
           subtitleStyle={{color:"red"}}
           avatar={props.qb.author.picture}
           style={{borderBottom:'1px solid #CFD8DC'}}
         >
         <Edit style={qbCardstyles.EditQb} color={blue500} onClick={props.OpenQbEdit}/>
         <DeleteForever style={qbCardstyles.DeleQb} color={red300} onClick={props.OpenConfirmQbDel}/>
       </CardHeader>
         {CheckImg  &&
           <CardMedia
             overlay={<CardTitle title={props.qb.title} subtitle={`${props.qb.noOfQuestions} Questions`} />}
           >
             <div style={{textAlign:'right',backgroundColor:'white',position:'absolute',zIndex:11}}>
               {!props.UpdateQbank.imagePreviewUrl &&
               <FlatButton
            label=""
            labelPosition="before"
            primary={true}
            icon={<AddAPhoto color={black}/>}
            style={qbCardstyles.UpdateQbImage}
            labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
             >
               <input type="file"
                  accept="image/*"
                  style={qbCardstyles.uploadInput}
                  name="qBImage"
                  id="qBImage"
                  onChange={e => {props.handleImageChange(e)}}
                  />
               </FlatButton>
             }
             {props.UpdateQbank.imagePreviewUrl &&
               <div style={{position:'absolute',right:4,top:4,padding:2}}>
                 <RaisedButton label="Save" primary={true} labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
                  style={{marginRight:3}}
                  onClick={props.UpdateQbankData}
                    />
                 <RaisedButton label="Cancel" secondary={true} labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
                 onClick={props.CancelQbImage}
                   />
               </div>
             }
               </div>
             {!props.UpdateQbank.imagePreviewUrl &&
               <img src={`//localhost:3001/${props.qb.image.replace('public','')}`} width="200" height="300" alt="" />
             }
             {props.UpdateQbank.imagePreviewUrl &&
               <img src={props.UpdateQbank.imagePreviewUrl} width="200" height="300" alt="" />
             }
           </CardMedia>
         }
         {!props.qb.image &&
            <CardTitle title={props.qb.title} subtitle={`${props.qb.noOfQuestions} Questions`}>
            {!CheckImg &&
              <div style={{textAlign:'right',backgroundColor:'white',position:'absolute',zIndex:11,right:2,top:30,padding:0,margin:0}}>
                <FlatButton
             label=""
             labelPosition="before"
             primary={true}
             icon={<AddAPhoto color={black}/>}
             style={qbCardstyles.UpdateQbImage}
             labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
              >
                <input type="file"
                   accept="image/*"
                   style={qbCardstyles.uploadInput}
                   name="qBImage"
                   id="qBImage"
                   onChange={e => {props.handleImageChange(e)}}
                   />
                </FlatButton>
              </div>
            }
            </CardTitle>
         }
         <CardText>
           {props.qb.summary}
         </CardText>
         <CardActions>
           <FlatButton label="Answer Questions" />
           <FlatButton onClick={props.showAddQuestion} label="Add Questions" />
           <FlatButton onClick={props.viewQuestions} label="View Questions" />
           <div style={{display:'block'}}>
          {user && userBookMarks.qBanks && userBookMarks.qBanks.length > 0 &&  userBookMarks.qBanks.indexOf(qb._id) !== -1 &&
            <IconButton>
            <BookMarked
              style={qbCardstyles.BookMarkBorder}
              className="BookMarkBorder"
              onClick={() => props.removebookMarkedQb(user._id,qb._id)}
              />
              </IconButton>
          }
          {user && userBookMarks.qBanks && userBookMarks.qBanks.indexOf(qb._id) === -1 &&
          <IconButton>
            <BookMarkBorder
              style={qbCardstyles.BookMarkBorder}
              className="BookMarkBorder"
              onClick={() => props.bookMarkQb(user._id,qb._id)}
              />
              </IconButton>
          }
          </div>
         </CardActions>
       </div>
      }
  </Card>
);
}

class EditQbDialog extends React.Component {
  render(){
    const EditQbActions = [
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.props.SaveQbEdit}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        disabled={false}
        onClick={this.props.CloseQbEdit}
      />,
    ];

    const styles = {
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

    return(
      <div>
        <Dialog
              title="Edit Question Bank"
              actions={EditQbActions}
              modal={true}
              open={this.props.UpdateQbank.openDialog || false}
            >
              {this.props.UpdateQbank.QbankToEdit &&
                 <div className="QbEditFormDiv">
                   <div style={styles.QbDetailsFormDiv}>
                       <form onSubmit={this.props.SaveQbEdit} id='qbEditForm' >
                          <TextField
                            ref='title'
                            name='title'
                            required={true}
                            floatingLabelText='Title'
                            hintText="Enter Question Bank Title"
                            fullWidth={true}
                            defaultValue={this.props.UpdateQbank.QbankToEdit.title}
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
                              defaultValue={this.props.UpdateQbank.QbankToEdit.summary}
                              rows={3}
                              />
                       </form>
                 </div>
               </div>
              }
            </Dialog>
      </div>
    )
  }

}

class DeleteQbDialog extends React.Component {
  render(){
    const DeleteQbActions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={this.props.ConfirmDeleteQb}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        disabled={false}
        onClick={this.props.CloseQbDelete}
      />,
    ];

    const styles = {
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

    return(
      <div>
        <Dialog
              title="Delete Question Bank"
              actions={DeleteQbActions}
              modal={true}
              open={this.props.QbankToDelete.openDialog || false}
            >
              {this.props.QbankToDelete.Qbank &&
                 <div className="QbEditFormDiv">
                   <div style={styles.QbDetailsFormDiv}>
                       <h4>Are you sure want to delete QuestionBank <span style={{color:black
}}>{this.props.QbankToDelete.Qbank.title}?</span></h4>
                 </div>
               </div>
              }
            </Dialog>
      </div>
    )
  }

}

class QuestionBank extends React.Component {
  updateQbformData ;
  constructor(props) {
    super(props);
    this.showAddQuestion = this.showAddQuestion.bind(this);
    this.handleExpandChange = this.handleExpandChange.bind(this);
    this.CancelQbImageUpdate = this.CancelQbImageUpdate.bind(this);
    this.UpdateQbankData = this.UpdateQbankData.bind(this);
    this.OpenQbEdit = this.OpenQbEdit.bind(this);
    this.closeQbDelete = this.closeQbDelete.bind(this);
    this.confirmDeleteQb = this.confirmDeleteQb.bind(this);
    this.saveNewQuestion = this.saveNewQuestion.bind(this);
    this.viewQuestions = this.viewQuestions.bind(this);
  }

  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  componentDidMount(){
    this.props.mappedfetchQuestionBank(this.props.params.id).then(
      () => {
        if (this.props.mappedUserState.user) {
          const qbIds = [this.props.params.id];
          const bmData = {
            userId:this.props.mappedUserState.user._id,
            qbIds:qbIds
          }
          console.log(bmData);
          this.props.mappedgetBookMarks(bmData);
        }
      }
    );
    let location = browserHistory.getCurrentLocation();
    if(location.pathname === `/question-bank/${this.props.params.id}/add-question`){
      this.props.mappedshowAddQuestion();
    }
    else if (location.pathname === `/question-bank/${this.props.params.id}/view-questions/${this.props.params.page}/${this.props.params.limit}`) {
      let qBid = this.props.params.id;
      let page = this.props.params.page;
      let limit = this.props.params.limit;
      this.props.mappedFetchQbQuestions(qBid,page,limit);
    }
  }
  
  bookMarkQb(userId,qBId){
    const data = {
      userId:userId,
      qbId:qBId
    }
    this.props.mappedbookMarkQb(data);
  }

  removebookMarkedQb(userId,qBId){
    const data = {
      userId:userId,
      qbId:qBId
    }
    this.props.mappedRmbookMarkQb(data);
  }

  showAddQuestion(id){
    this.props.mappedshowAddQuestion();
    browserHistory.push(`/question-bank/${id}/add-question`);
  }

  handleExpandChange(){
    this.props.mappedToggleExpandQbCard();
  }

  handleQbImageChange(e){
     if(e.target.files[0]){
       let qBImageName = e.target.files[0].name;
       let qBImageSize = e.target.files[0].size;
       let qBImageExt = qBImageName.split('.').pop();
       if(qBImageExt === 'jpg' || qBImageExt === 'jpeg' || qBImageExt === 'png' || qBImageExt ==='JPG' || qBImageExt === 'JPEG' || qBImageExt === 'bmp'){
         if(qBImageSize < 5389864){ //grater than 5MB
       console.log(e.target.files[0]);
       let reader = new FileReader();
       let file = e.target.files[0];
       reader.onload = (e) => {
         let imagePreviewUrl = e.target.result;
         this.updateQbformData = new FormData()
         this.updateQbformData.append('qBImage',file);
         this.updateQbformData.append('id',this.props.params.id);
         this.props.mappedUpdateQbImagePreview(imagePreviewUrl);
       }
       reader.readAsDataURL(file);
     }
     else{
       this.props.mappedfailedUpdateQbImagePreview('Image size should be less then 5MB');
     }
   }
   else{
     this.props.mappedfailedUpdateQbImagePreview('Only Image Files Allowed');
     return;
   }
 }
  }

  CancelQbImageUpdate(){
     this.props.mappedUpdateQbImagePreview(null);
  }

  UpdateQbankData(){
    console.log(this.updateQbformData);
    this.props.mappedupdateQuestionBank(this.updateQbformData);
  }

  OpenQbEdit(qb){
     this.props.mappedOpenQbEdit(qb);
  }

  CloseQbEdit(){
     this.props.mappedCloseQbEdit();
  }

  OpenConfirmQbDelete(qb){
    this.props.mappedopenConfirmDeleteQb(qb);
  }

  saveQbEdit(){
    let form = document.getElementById('qbEditForm');
    let formData = new FormData();
    formData.append('title', form.title.value);
    formData.append('summary',form.summary.value);
    formData.append('id', this.props.params.id);
    this.props.mappedupdateQuestionBank(formData);
  }

  closeQbDelete(){
    this.props.mappedcloseConfirmDeleteQb();
  }

  confirmDeleteQb(){
     this.props.mappeddeleteQb(this.props.mappedQbankState.QbankToDelete.Qbank);
  }

  AddNewOption(option){
    this.props.mappedAddNewOptionInNewQuestion(option);
  }

  handleAddNewQuestionChange(e){
    let fieldname = e.target.name;
    let fieldvalue = e.target.value;
    var data = {};
    if(fieldname !== 'question'){
      fieldname = parseInt(fieldname);
       data = {
        number:fieldname,
        fieldvalue:fieldvalue,
        fieldname:'option'
      }
    }else{
       data = {
        fieldname:fieldname,
        fieldvalue:fieldvalue
      }
    }
    //alert(JSON.stringify(data))
    this.props.mappedupdateNewQuestionState(data);
  }

  saveNewQuestion(event){
    event.preventDefault();
    let form = document.getElementById('AddNewQuestionForm');
    let question = this.props.mappedQbankState.AddNewQuestion.Question;
    let options = this.props.mappedQbankState.AddNewQuestion.OptionsArray;
    let qBId = this.props.params.id;
    let authorId = this.props.mappedUserState.user._id;
    const data = {
      question:question,
      options:options,
      qbank:qBId,
      author:authorId
    }
    console.log(data);
    this.props.mappedaddNewQuestion(data);
    form.reset();
  }

  viewQuestions(qBid,page,limit){
    this.props.mappedFetchQbQuestions(qBid,page,limit);
    browserHistory.push(`/question-bank/${qBid}/view-questions/${page}/${limit}`);
  }

  showDeleteQuestion(q){
    this.props.mappedshowDeleteQbQuestion(q);
  }
  deleteQuestion(){
    let ques = this.props.mappedQbankState.DeleteQbQuestion.questionToDelete;
    this.props.mappeddeleteQbQuestion(ques);
  }
  canceldeleteQuestion(){
    this.props.mappedcancelDeleteQbQuestion();
  }

  showEditQuestion(q){
    this.props.mappedshowEditQbQuestion(q);
  }
  cancelQuestionUpdate(){
    this.props.mappedcancelEditQbQuestion();
  }
  handleEditQuestionChange(e){
    let fieldname = e.target.name;
    let fieldvalue = e.target.value;
    var data = {};
    if(fieldname !== 'question'){
      fieldname = parseInt(fieldname);
       data = {
        number:fieldname,
        fieldvalue:fieldvalue,
        fieldname:'option'
      }
    }else{
       data = {
        fieldname:fieldname,
        fieldvalue:fieldvalue
      }
    }
    //alert(JSON.stringify(data))
    //alert(JSON.stringify(this.props.mappedQbankState.ViewQbQuestions.Questions));
    this.props.mappedupdateEditQuestionState(data);
  }

  AddNewOptionInEditQuestion(option){
    this.props.mappedAddNewOptionInEditQuestion(option);
  }

  updateQuestion(){
    let isValid = true;
    let question = this.props.mappedQbankState.EditQbQuestion.questionToEdit.question;
    let options = this.props.mappedQbankState.EditQbQuestion.questionToEdit.options;
    if (question === '' || question === undefined || question.length < 5) {
      this.props.mappedfailedUpdateQuestion('Failed.Enter a valid question to update.');
    }
    else if(options.length < 2){
      this.props.mappedfailedUpdateQuestion('Failed.Question must have 2 options to update.');
    }
    else{
      options.map((opt) => {
        if(opt.value === '' || opt.value === undefined || opt.value === null){
          isValid = false;
          this.props.mappedfailedUpdateQuestion('Failed.Options must have values to update.');
          return;
        }
      })
      if (isValid) {
        this.props.mappedupdateQuestion(this.props.mappedQbankState.EditQbQuestion.questionToEdit);
      }
    }
  }

  onMouseOverTextField(data){
    this.props.mappededitQoptionMouseOver(data);
  }

  removeOptionInEditQuestion(option){
    this.props.mappedremoveOptionInEditQuestion(option);
  }

  addAnswerInOption(op){
    this.props.mappedaddAnswerInOption(op);
  }

  render(){
    const styles = {
      AddQuestionToQbDiv:{
        textAlign:'center',
        maxWidth:680,
        margin:'0 auto'
      },
      QbDetailsPaper:{
        height: '100%',
         width: '100%',
         textAlign: 'center',
         padding:6
      },
      QbTop:{

      },
      QbData:{
        display:'block',
        backgroundColor:'green',

      },
      QbImageDiv:{
        textAlign:'center',
        display:'block',
        backgroundColor:'',
        padding:10,
        marginTop:20
      },
      QbImage:{

      },
      QbAuthorDiv:{
        display:'block',
        color:pink500,
        fontSize:16,
        padding:10
      },
      AuthorLabel:{
        color:pink300
      },
      QbSummary:{
        borderBottom:'1px solid yellow',
        borderTop:'1px solid yellow',
        paddingTop:5,
        paddingBottom:5
      }
    }
    const { isFetching,successMsg,error,fetchedQbank,expandQb,UpdateQbank,QbankToDelete,AddNewQuestion,ViewQbQuestions,DeleteQbQuestion,EditQbQuestion,userBookMarks } = this.props.mappedQbankState;
    const { user,isLoggedIn } = this.props.mappedUserState;
    return(
      <div style={styles.AddQuestionToQbDiv} className="AddQuestionToQbDiv">
          <h3>Question Bank</h3>
          {fetchedQbank &&
             <div>
        <QuestionBankCard
          qb = {fetchedQbank}
          showAddQuestion = {() => this.showAddQuestion(fetchedQbank._id)}
          expandQb={expandQb}
          handleExpandChange={() => this.handleExpandChange()}
          handleImageChange={(e) => this.handleQbImageChange(e)}
          UpdateQbank={UpdateQbank}
          CancelQbImage={this.CancelQbImageUpdate}
          UpdateQbankData={this.UpdateQbankData}
          OpenQbEdit={() => this.OpenQbEdit(fetchedQbank)}
          OpenConfirmQbDel={() => this.OpenConfirmQbDelete(fetchedQbank)}
          viewQuestions={() => this.viewQuestions(fetchedQbank._id,1,10)}
          user={user}
          userBookMarks={userBookMarks}
          bookMarkQb={(userId,qBId) => this.bookMarkQb(userId,qBId)}
          removebookMarkedQb={(userId,qBId) => this.removebookMarkedQb(userId,qBId)}
          />
             </div>
          }

          <EditQbDialog
             UpdateQbank={UpdateQbank}
             CloseQbEdit={() => this.CloseQbEdit()}
             SaveQbEdit={() => this.saveQbEdit()}
             />
           <DeleteQbDialog
             QbankToDelete={QbankToDelete}
             ConfirmDeleteQb={() => this.confirmDeleteQb()}
             CloseQbDelete={() => this.closeQbDelete()}
             />
           {AddNewQuestion.showAddQDiv &&
               <AddQuestion
                 AddNewQuestion={AddNewQuestion}
                  AddNewOption={(option)=>this.AddNewOption(option)}
                  handleAddNewQuestionChange={(e) => this.handleAddNewQuestionChange(e)}
                  saveNewQuestion={this.saveNewQuestion}
                  addAnswerInOption={(opt) => this.addAnswerInOption(opt)}
                  />
           }

           {ViewQbQuestions.showViewQDiv && ViewQbQuestions.Questions &&
             <ViewQuestions
               ViewQbQuestionsState={ViewQbQuestions}
               showDelQuestion={(q) => this.showDeleteQuestion(q)}
               showEditQbQuestion={(q) => this.showEditQuestion(q)}
               />
           }

           <DeleteQbQuestionDialog
            DeleteQbQuestion={DeleteQbQuestion}
            deleteQuestion={this.deleteQuestion.bind(this)}
            closeQbQuestionDelete={this.canceldeleteQuestion.bind(this)}
              />
            <EditQuestion
              EditQbQuestion={EditQbQuestion}
              closeQbQuestionEdit={this.cancelQuestionUpdate.bind(this)}
              handleQuestionChange={(e) => this.handleEditQuestionChange(e)}
              AddNewOption={(option) => this.AddNewOptionInEditQuestion(option)}
              updateQuestion={this.updateQuestion.bind(this)}
              onMouseOverTextField={(e) => this.onMouseOverTextField(e)}
              removeOption={(e) => this.removeOptionInEditQuestion(e)}
              />

          <div align="center">
            <Snackbar
            message={successMsg !== null ? successMsg : error !== null ? error : 'Loading...'}
            open={successMsg !== null ? true : error !== null ? true : false}
            autoHideDuration={8000}
            onRequestClose={this.handleRequestClose}
          />
          </div>
      </div>
    )
  }
}

export default QuestionBank;
