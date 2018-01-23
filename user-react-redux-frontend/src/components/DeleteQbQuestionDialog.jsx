import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class DeleteQbQuestionDialog extends React.Component {
  render(){
    const DeleteQbQuestionActions = [
      <FlatButton
        label="Confirm"
        primary={true}
        onClick={this.props.deleteQuestion}
      />,
      <FlatButton
        label="Cancel"
        primary={true}
        disabled={false}
        onClick={this.props.closeQbQuestionDelete}
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
              title="Delete Question From Question Bank"
              actions={DeleteQbQuestionActions}
              modal={true}
              open={this.props.DeleteQbQuestion.showDeleteQues || false}
            >
              {this.props.DeleteQbQuestion.questionToDelete &&
                 <div className="QbEditFormDiv">
                   <div style={styles.QbDetailsFormDiv}>
                       <h4>Are you sure want to delete this Question from Question Bank</h4>
                 </div>
               </div>
              }
            </Dialog>
      </div>
    )
  }

}

export default DeleteQbQuestionDialog;
