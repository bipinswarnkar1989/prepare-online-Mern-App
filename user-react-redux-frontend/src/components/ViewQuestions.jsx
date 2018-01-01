// ./user-react-redux-frontend/src/components/ViewQuestions.jsx
import React from 'react';
import Paper from 'material-ui/Paper';

class ViewQuestions extends React.Component {
   render(){
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
     return(
      <Paper style={styles.paperStyle} zDepth={1}>
        <h5>Questions in Question Bank</h5>
      </Paper>
     )
   }
}

export default ViewQuestions;
