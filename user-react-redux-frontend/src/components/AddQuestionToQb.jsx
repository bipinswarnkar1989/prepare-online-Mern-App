// ./user-react-redux-frontend/src/components/CreateQbank.jsx
import React from 'react';
import Paper from 'material-ui/Paper';
import { pink300,pink500,white,red300 } from 'material-ui/styles/colors';
//import { Grid, Row, Col } from 'react-material-responsive-grid';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';

const qbCardstyles = {
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
    backgroundColor:'rgba(255, 255, 255, 0.2)',
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
    fontSize:12
  }
}

const CardExampleWithAvatar = () => (
  <Card>
    <CardHeader
      title="Bipin Kumar Swarnkar"
      textStyle={{verticalAlign:'73%'}}
      subtitle=""
      subtitleStyle={{color:"red"}}
      avatar="https://graph.facebook.com/1148192005214274/picture?type=large"
    >
    <DeleteForever style={qbCardstyles.DeleQb} color={red300}/>
  </CardHeader>
    <CardMedia
      overlay={<CardTitle title="Overlay title" subtitle="" />}
    >
      <div style={{textAlign:'right',backgroundColor:'white',position:'absolute'}}>
        <FlatButton
     label="Update Image"
     labelPosition="before"
     primary={true}
     icon={<AddAPhoto color={white}/>}
     style={qbCardstyles.UpdateQbImage}
     labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
      >
        <input type="file" style={qbCardstyles.uploadInput} />
        </FlatButton>
        </div>
      <img src="https://graph.facebook.com/1148192005214274/picture?type=large" width="200" height="300" alt="" />
    </CardMedia>
    <CardText>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
      Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
      Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
      Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
    </CardText>
    <CardActions>
      <FlatButton label="Answer Questions" />
      <FlatButton label="Add Questions" />
      <FlatButton label="Search Questions" />
      <FlatButton label="BookMark"/>
    </CardActions>
  </Card>
);

class AddQuestionToQb extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  componentDidMount(){
    this.props.mappedfetchQuestionBank(this.props.params.id);
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
    const { isFetching,successMsg,error,fetchedQbank } = this.props.mappedQbankState;
    return(
      <div style={styles.AddQuestionToQbDiv} className="AddQuestionToQbDiv">
          <h3>Add Questions to Question Bank</h3>
          {!fetchedQbank &&
             <div>
        <CardExampleWithAvatar/>
             </div>
          }
      </div>
    )
  }
}

export default AddQuestionToQb;
