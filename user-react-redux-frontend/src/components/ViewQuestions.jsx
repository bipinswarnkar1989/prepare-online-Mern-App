// ./user-react-redux-frontend/src/components/ViewQuestions.jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import Edit from 'material-ui/svg-icons/image/edit';
import { pink300,pink500,white,red300,red900,black,blue500,red400,green500,blue300, indigo900
 } from 'material-ui/styles/colors';
 import Delete from 'material-ui/svg-icons/content/clear';
 import Done from 'material-ui/svg-icons/action/done';
 import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import Pagination from './Pagination';

class ViewQuestions extends React.Component {
  vlsArray;
  constructor(props) {
    super(props);
    this.state = {vsState:null};
  }
  componentDidMount(){
    this.vlsArray = this.props.ViewQbQuestionsState.Questions.map((q) => {
      return {
        id:q._id,
        valueSelected:null
      }
    });
      this.setState({
        vsState:this.vlsArray
      });
  }
  handleOptionChange(e,qbId){
    let v = e.target.value;
    this.setState((prevState,props) => ({
      vsState:prevState.vsState.map((q) => {
        if (q.id === qbId) {
          return {
            ...q,
            valueSelected:v
          }
        }
        return q;
      })
    }))
    
    document.getElementById(`answerDiv${qbId}`).style.display = '';
    //document.getElementsByClassName("answerDiv").style.display = 'none';
  }
  handleRequestDelete(qbId) {
    document.getElementById(`answerDiv${qbId}`).style.display = 'none';
    this.setState((prevState,props) => ({
      vsState:prevState.vsState.map((q) => {
        if (q.id === qbId) {
          return {
            ...q,
            valueSelected:null
          }
        }
        return q;
      })
    }));
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
      },
      answerText:{
        margin:3,
        color:white,
        backgroundColor:'none',
        paddingLeft: 3,
        paddingRight: 10,
        paddingTop:3 ,
        paddingBottom: 3,
      },
      answerDiv:{
        padding: 5,
        display:'none'
      }
     }
     let { Questions } = this.props.ViewQbQuestionsState;
     let user = this.props.user;
     return(
      <div>
      <Paper style={styles.paperStyle} zDepth={1}>
        <h5>Questions in Question Bank</h5>
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
                       Q.  {q.question}
                </div>
              </Col>
              <Col xs6={3}  md6={3} sm6={3} style={{maxWidth:'10%',minWidth:'10%'}}>
              {q.author && user && user._id === q.author &&
                <div style={{position:'relative',float:'right'}}>
                  <div style={styles.qActionsDiv} className="qActionsDiv">
                 <Edit color={blue500} style={styles.iconStyles} onClick={() => this.props.showEditQbQuestion(q)}/>
                 <Delete color={red400} style={styles.iconStyles} onClick={() => this.props.showDelQuestion(q)}/>
                  </div>
                </div>
                }
              </Col>
            </Row>
          </Grid>

                     <div style={{width:'auto'}} className="optionsDiv">
                             <RadioButtonGroup onChange={e => this.handleOptionChange(e,q._id)}  name={`${q}option`} labelPosition="right" style={styles.block}
                             valueSelected= {this.state.vsState && 
                              this.state.vsState.filter(item => item.id === q._id)[0].valueSelected
                                             } 
                             id={`RadioButtonGroup${q._id}`}
                             >
                            {
                                q.options.sort(function(a,b){
                                  return a.number - b.number;
                                }).map((opt,j) => {
                                    return (
                                        <RadioButton
                                          key={j}
                                          checkedIcon={<Avatar color={white} backgroundColor={opt.answer === true ? indigo900 : red900} size={28}>{opt.number}</Avatar>}
                                          uncheckedIcon={<Avatar color={white}  size={28}>{opt.number}</Avatar>}
                                          value={opt._id !== false ? opt._id : false}
                                          label={opt.value !== null ? opt.value : ''}
                                          style={styles.radioButton}
                                          labelStyle={{backgroundColor:'',color:black,textAlign:'left',paddingLeft:10}}
                                          id={`option${q._id}`}
                                          disabled= {this.state.vsState && 
                                            this.state.vsState.filter(item => item.id === q._id)[0].valueSelected !== null ? true : false 
                                                           } 
                                          />
                                          
                                    )
                              })
                          }
                        </RadioButtonGroup>
                     </div>
     <div style={styles.answerDiv} id={`answerDiv${q._id}`} className="answerDiv">
          <div style={styles.correctAnswer}>
          <Chip 
           onClick={this.handleClick} 
           style={styles.chip} 
           backgroundColor={blue300}
           onRequestDelete={() => this.handleRequestDelete(q._id)}
           >
          Correct Answer is 
          <Avatar style={{margin:2}} color={blue300} backgroundColor={indigo900} size={28}>
          {q && q.options &&
              q.options.filter(item => item.answer !== false)[0].number
             }
          </Avatar>
           <span style={styles.answerText}>
             {q && q.options &&
              q.options.filter(item => item.answer !== false)[0].value
             } 
             </span>
        </Chip>
          </div>
     </div>
                   </Paper>
                )
              })
           }
        </div>
      </Paper>
      <div style={{margin:20}}>
      <Pagination/>
      </div>
      </div>
     )
   }
}

export default ViewQuestions;
