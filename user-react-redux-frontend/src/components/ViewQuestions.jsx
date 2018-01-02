// ./user-react-redux-frontend/src/components/ViewQuestions.jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

class ViewQuestions extends React.Component {
   render(){
     const styles = {
         paperStyle: {
         height: '100%',
        width: '100%',
        textAlign: 'center',
        display: 'inline-block',
        marginTop:1
      },
      summaryfloatingLabelStyle:{
        textAlign:'left'
      },
      overRideRaisedButtonUppercase:{
        textTransform: 'none',
        fontSize:16
      },
      QuestionsDiv:{

      },
      AddQFormDiv:{
        width:'90%',
        margin:'0 auto',
        paddingBottom:13
      },
      radioButton: {
        marginBottom: 16,
      },
      block: {
   maxWidth: 250,
      },
      questionDiv:{
        textAlign:'left',
        fontSize:15,
        display:'block',
        padding:10,
        fontWeight:'bold',

      }
     }
     let { Questions } = this.props.ViewQbQuestionsState;
     return(
      <Paper style={styles.paperStyle} zDepth={1}>
        <h5>Questions in Question Bank</h5>
        {/*JSON.stringify(Questions)*/}
        <div style={styles.QuestionsDiv} className="QuestionsDiv">
           {Questions &&
              Questions.map((q,i) => {
                return (
                   <Paper key={i} style={styles.paperStyle} zDepth={3}>
                     <div style={styles.questionDiv} className="questionDiv">
                       Q.{i+1}: {q.question}
                     </div>
                     <div className="optionsDiv">
                             <RadioButtonGroup  name={`${q}option`} labelPosition="right" style={styles.block}>
                            {
                                q.options.map((opt,j) => {
                                    return (
                                        <RadioButton
                                          key={j}
                                          value={opt.value}
                                          label={opt.value}
                                          style={styles.radioButton}
                                          labelStyle={{backgroundColor:'green',color:'white'}}
                                          />
                                    )
                              })
                          }
                        </RadioButtonGroup>
                     </div>
                   </Paper>
                )
              })
           }
        </div>
      </Paper>
     )
   }
}

export default ViewQuestions;
