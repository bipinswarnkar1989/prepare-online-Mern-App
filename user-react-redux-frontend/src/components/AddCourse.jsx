import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class AddCourse extends React.Component {
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }
    render() {
        const styles = {
            container:{
              flex: 1,
            },
            addContainer:{
               display: 'flex',
               alignContent: 'center',
               
            },
            formDiv:{
              display:'flex',
              flexDirection: 'column',
              padding: 50,
              
              
            },
            fileBtnCss:{
                position:'relative',
                backgroundColor:'blue',
                color:'white',
                textAlign:'center',
                padding: 2,
                borderRadius: 4,
                width:70,
            },
            inputFile:{
                position:'absolute',
                opacity:0,
                filter:'alpha(opacity=0)',
                width:'100%',
                height:'100%',
                display: 'block',
                top: 0,
                right: 0,
            }
        }
        return (
            <div style={styles.container}>
            <div style={styles.addContainer}>
            <Card>
            <CardHeader
      title="Add Course"
    />
             <div style={styles.formDiv}>
             <TextField
             hintText="Course name"
             floatingLabelText="Enter course name"
            
             />
             <span style={styles.fileBtnCss}>
               <Add color={white}/><br/> Video<input type="file" style={styles.inputFile}/>
            </span>
            <div style={{display:'block', padding:20}}>
            <RaisedButton primary={true} label="Submit" fullWidth={true} />
            </div>
             </div>
            </Card>
            </div>
            </div>
        );
    }
}

AddCourse.propTypes = {};

export default AddCourse;
