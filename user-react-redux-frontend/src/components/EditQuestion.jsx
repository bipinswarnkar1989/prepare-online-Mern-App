import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import RaisedButton from 'material-ui/RaisedButton';
import AddCirle from 'material-ui/svg-icons/content/add-circle-outline';
import {fullWhite,grey800} from 'material-ui/styles/colors';
import ClearIcon from 'material-ui/svg-icons/content/clear'

class EditQuestion extends React.Component {
  constructor(props){
    super(props);
    this.AddOption = this.AddOption.bind(this);
  }
  AddOption = () => {
     let optionNumber = this.props.EditQbQuestion.questionToEdit.options[this.props.EditQbQuestion.questionToEdit.options.length-1].number;
     optionNumber = optionNumber+1;
     let newOption = {
       number:optionNumber,
       value:null
     };
     this.props.AddNewOption(newOption);
  }

  removeOption = (opt) => {
    this.props.removeOption(opt);
  }

  onMouseOverTextField = (opt) => {
    const data = {
      option:opt
    }
    opt.mouseOver = true;
    this.props.onMouseOverTextField(data);
  }

  oMouseOutTextField = (opt) => {
    const data = {
      option:opt
    }
    opt.mouseOver = false;
    this.props.onMouseOverTextField(data);
  }

  render(){
    const EditQbQuestionActions = [
      <FlatButton
        label="Save"
        primary={true}
        onClick={this.props.updateQuestion}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        disabled={false}
        onClick={this.props.closeQbQuestionEdit}
      />,
    ];

    const styles = {
      QesDetailsFormDiv:{
        textAlign:'center'
      },
      summaryfloatingLabelStyle:{
        textAlign:'left'
      },
      overRideRaisedButtonUppercase:{
        textTransform: 'none',
        fontSize:18
      },
      clearIcon:{
        position: 'absolute',
        right: 0,
        top: 15,
        width: 20,
        height: 20,
        cursor:'pointer',
        color:'red',
        zIndex:12
      }
    }

    return(
      <div>
        <Dialog
              title="Edit Question"
              actions={EditQbQuestionActions}
              modal={true}
              open={this.props.EditQbQuestion.showEditQues || false}
            >
              {this.props.EditQbQuestion.questionToEdit &&
                 <div className="QbEditFormDiv">
                   <div style={styles.QesDetailsFormDiv}>
                     <form onSubmit={this.props.updateQuestion} id='updateQuestionForm'>
                       <TextField
                         name='question'
                         required={true}
                         floatingLabelText='Question'
                         hintText="Enter Question"
                         fullWidth={true}
                         multiLine={true}
                         style={styles.summaryfloatingLabelStyle}
                         onChange={e => this.props.handleQuestionChange(e)}
                         optionnumber=""
                         value={this.props.EditQbQuestion.questionToEdit.question === null ? '' : this.props.EditQbQuestion.questionToEdit.question}
                         />
                         <Grid>
                          <Row id="AddQOptionsRow">
                            {
                              this.props.EditQbQuestion.questionToEdit.options &&
                              this.props.EditQbQuestion.questionToEdit.options.map((opt,i) => {
                                return (
                                  <Col key={i} md={6}>
                                    {/*JSON.stringify(opt)*/}
                                    <div style={{position: 'relative'}} onMouseLeave={() => this.oMouseOutTextField(opt)} onMouseEnter={() => this.onMouseOverTextField(opt)}>
                                    {opt.mouseOver && opt.mouseOver === true &&
                                      <ClearIcon onClick={() => this.removeOption(opt)} style={styles.clearIcon}/>
                                    }
                                    <TextField
                                      name={`${opt.number}`}
                                      required={true}
                                      floatingLabelText={`Option: ${opt.number}`}
                                      hintText={`Enter Option: ${opt.number}`}
                                      fullWidth={true}
                                      multiLine={true}
                                      style={styles.summaryfloatingLabelStyle}
                                      onChange={e => this.props.handleQuestionChange(e)}
                                      value={opt.value === null ? '' : opt.value}

                                      />
                                  </div>
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
                                onClick={this.AddOption}
                                />
                            </Col>
                           </Row>
                           <div style={{display:'none'}}>
                         <input type="submit"/>
                           </div>
                         </Grid>
                     </form>
                 </div>
               </div>
              }
            </Dialog>
      </div>
    )
  }

}

export default EditQuestion;
