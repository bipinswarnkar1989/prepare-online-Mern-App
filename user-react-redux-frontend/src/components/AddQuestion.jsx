import React from 'react'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import RaisedButton from 'material-ui/RaisedButton';
import AddCirle from 'material-ui/svg-icons/content/add-circle-outline';
import {fullWhite,grey800} from 'material-ui/styles/colors';

export const AddQuestion = (props) => {
  const styles = {
      paperStyle: {
      height: '100%',
     width: '100%',
     textAlign: 'center',
     display: 'inline-block',
     marginTop:10
   },
   summaryfloatingLabelStyle:{
     textAlign:'left'
   },
   overRideRaisedButtonUppercase:{
     textTransform: 'none',
     fontSize:16
   },
   AddQFormDiv:{
     width:'90%',
     margin:'0 auto',
     paddingBottom:13
   }
  }

const AddOption = () => {
   let optionNumber = props.AddNewQuestion.OptionsArray[props.AddNewQuestion.OptionsArray.length-1].number;
   optionNumber = optionNumber+1;
   let newOption = {
     number:optionNumber,
     value:null
   };
   props.AddNewOption(newOption);
}

  return (
    <Paper style={styles.paperStyle} zDepth={1}>
    <div>
      <h5>Add New Question</h5>
  <div style={styles.AddQFormDiv}>
    <form onSubmit={props.saveNewQuestion} id='AddNewQuestionForm'>
      <TextField
        name='question'
        required={true}
        floatingLabelText='Question'
        hintText="Enter Question"
        fullWidth={true}
        multiLine={true}
        style={styles.summaryfloatingLabelStyle}
        onChange={e => props.handleAddNewQuestionChange(e)}
        optionnumber=""
        value={props.AddNewQuestion.Question === null ? '' : props.AddNewQuestion.Question}
        />
        <Grid>
         <Row id="AddQOptionsRow">
           {
             props.AddNewQuestion.OptionsArray &&
             props.AddNewQuestion.OptionsArray.map((opt,i) => {
               return (
                 <Col key={i} md={6}>
                   {/*JSON.stringify(opt)*/}
                   <TextField
                     name={`${opt.number}`}
                     required={true}
                     floatingLabelText={`Option: ${opt.number}`}
                     hintText={`Enter Option: ${opt.number}`}
                     fullWidth={true}
                     multiLine={true}
                     style={styles.summaryfloatingLabelStyle}
                     onChange={e => props.handleAddNewQuestionChange(e)}
                     value={opt.value === null ? '' : opt.value}
                     />
                 </Col>
               )
             })
           }
         </Row>
         <Row>
           <Col md={6}>
             <RaisedButton
               icon={<AddCirle color={grey800} />}
               style={styles.overRideRaisedButtonUppercase}
               onClick={AddOption}
               />
           </Col>
          </Row>
          <div style={{marginTop:12}}>
        <RaisedButton
          type="submit"
          label="Submit & Next"
          primary={true}
          labelStyle={styles.overRideRaisedButtonUppercase}
          fullWidth={true}
          onClick={props.saveNewQuestion}
          />
        {props.AddNewQuestion.QuestionAdded &&
          <div align="center">
           <h5>Question Added Successfully.<br/>View</h5>
          </div>
        }
          </div>
        </Grid>
    </form>
  </div>
    </div>
    </Paper>
  );
}
