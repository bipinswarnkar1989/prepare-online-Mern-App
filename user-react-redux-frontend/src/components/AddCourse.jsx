import React from 'react';
import PropTypes from 'prop-types';
import TextField from 'material-ui/TextField';
import Add from 'material-ui/svg-icons/content/add';
import {white} from 'material-ui/styles/colors';
import {Card, CardHeader} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

class AddCourse extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            description:'',
            videofiles:[]
        }
        this.uploadFile = this.uploadFile.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentWillMount(){
        this.props.mappedfetchUserIfLoggedIn();
      }

      uploadFile(event){
      let file = event.target.files[0];
      console.log(file)
      }
      
      handleSubmit(event){
        event.preventDefault();
        let data = {
            name:this.state.name,
            author:this.props.mappedUserState.user._id,
            description:this.state.description,
            videos:[]

        }
      }

    render() {
        const styles = {
            container:{
              flex: 1,
            },
            addContainer:{
               display: 'flex',
               alignContent: 'center',
               flexDirection: 'column',
            },
            formDiv:{
              display:'flex',
              flexDirection: 'column',
              padding: 50,
              
              
            },
            fileBtnCss:{
                position:'relative',
                backgroundColor:'#E64A65',
                color:'white',
                textAlign:'center',
                padding: 2,
                borderRadius: 4,
                width:80,
                
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
        const { name, description } = this.state;
        return (
            <div style={styles.container}>
            <div style={styles.addContainer}>
            <Card>
            <CardHeader
      title="Add Course"
    />
             <div style={styles.formDiv}>
             <form onSubmit={this.handleSubmit}>
             <TextField
             required
             fullWidth
             hintText="Course name"
             floatingLabelText="Enter course name"
             defaultValue={name}
             onChange={value => this.setState({
                 name:value
             })}
             />
              <TextField
             multiline
             fullWidth
             hintText="Description"
             floatingLabelText="Enter course description"
            value={this.state.description}
             onChange={value => this.setState({
                 description:value
             })}
             />
             <div style={styles.fileBtnCss}>
               <Add  color={white}/>
               <span style={{ height:'100%', display:'block'}}>Video</span>
               <input type="file" 
               style={styles.inputFile} 
               onChange={this.uploadFile}
               multiple={true}
               accept="video/mp4,video/x-m4v,video/*"
               />
            </div>
            <div style={{display:'block', padding:20}}>
            <RaisedButton type="submit" primary={true} label="Submit" fullWidth={true} />
            </div>
             </form>
            
             </div>
            </Card>
            </div>
            </div>
        );
    }
}

AddCourse.propTypes = {};

export default AddCourse;
