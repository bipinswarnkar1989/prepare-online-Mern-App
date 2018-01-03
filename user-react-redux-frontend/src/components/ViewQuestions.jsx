// ./user-react-redux-frontend/src/components/ViewQuestions.jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Edit from 'material-ui/svg-icons/image/edit';
import { pink300,pink500,white,red300,black,blue500,red400
 } from 'material-ui/styles/colors';
 import Delete from 'material-ui/svg-icons/content/clear';

class ViewQuestions extends React.Component {
  handleOptionChange(e,qbId){
    alert(e.target.value);alert(qbId)
  }
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

      },
      refresh:{
        display: 'inline-block',
        position: 'relative',
        padding:5
      },
      qActionsDiv:{
        right:0,
        top:10,
        zIndex:13,
        float:'right',
        width:'auto',
        margin:0
      },
      iconStyles:{
        cursor:'pointer'
      }
     }
     let { Questions } = this.props.ViewQbQuestionsState;
     return(
      <Paper style={styles.paperStyle} zDepth={1}>
        <h5>Questions in Question Bank</h5>
        {/*JSON.stringify(Questions)*/}
        <div style={styles.QuestionsDiv} className="QuestionsDiv">
          {!Questions &&
            <RefreshIndicator
               size={40}
               left={10}
               top={0}
               status="loading"
               style={styles.refresh}
               />
          }
           {Questions &&
              Questions.map((q,i) => {
                return (
                   <Paper key={i} style={styles.paperStyle} zDepth={3}>
                     <Grid>
                  <Row>
                <Col xs6={4} sm6={4} md6={4} style={{maxWidth:'90%',minWidth:'90%'}}>
                     <div style={styles.questionDiv} className="questionDiv">
                       Q.{i+1}: {q.question}
                </div>
              </Col>
              <Col xs6={3}  md6={3} sm6={3} style={{maxWidth:'10%',minWidth:'10%'}}>
                <div style={{position:'relative',float:'right'}}>
                  <div style={styles.qActionsDiv} className="qActionsDiv">
                 <Edit color={blue500} style={styles.iconStyles} onClick={() => this.props.editQuestion(q)}/>
                 <Delete color={red400} style={styles.iconStyles} onClick={() => this.props.showDelQuestion(q)}/>
                  </div>
                </div>
              </Col>
            </Row>
          </Grid>

                     <div className="optionsDiv">
                             <RadioButtonGroup onChange={e => this.handleOptionChange(e,q._id)}  name={`${q}option`} labelPosition="right" style={styles.block}>
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
