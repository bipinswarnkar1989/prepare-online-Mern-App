import React from 'react';
import PropTypes from 'prop-types';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import DeleteForever from 'material-ui/svg-icons/action/delete-forever';
import AddAPhoto from 'material-ui/svg-icons/image/add-a-photo';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import {Menu, MenuItem} from 'material-ui/Menu';
import IconButton from 'material-ui/IconButton';
import { pink300,pink500,white,red300,black,blue500,red400,grey800
} from 'material-ui/styles/colors';
import Edit from 'material-ui/svg-icons/image/edit';
import BookMarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookMarked from 'material-ui/svg-icons/action/bookmark';
import AlertDialog from './AlertDialog';
class QuestionBankCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openImageMPopOver: false,
            ImgManchorEl:null,
            ImgManchorOrigin: {
              horizontal: 'left',
              vertical: 'bottom',
            },
            ImgMtargetOrigin: {
              horizontal: 'left',
              vertical: 'top',
            },
            removeImgModel:false
        };
    }

    ImgMhandleRequestClose(){
        this.setState({
          openImageMPopOver: false,
        });
      }
    
      ImgMhandleClick(event){
          // This prevents ghost click.
          event.preventDefault();
          this.setState({
            openImageMPopOver: true,
            ImgManchorEl: event.currentTarget,
          });
      }

    render() {
        const qbCardstyles = {
            EditQb:{
              top:10,
              right:40,
              position:'absolute',
              cursor:'pointer'
            },
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
              backgroundColor:'rgba(255, 255, 255, 0.5)',
              MsFilter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr=#CCFFFFFF, endColorstr=#CCFFFFFF)',
              filter:'progid:DXImageTransform.Microsoft.gradient(startColorstr=#CCFFFFFF, endColorstr=#CCFFFFFF)',
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
              fontSize:12,
            },
            BookMarkBorder:{
              left:'20%',
              bottom:10,
              position:'absolute',
              cursor:'pointer',
              color:grey800,
          
            }
          }
        let CheckImg = this.props.qb.image || this.props.UpdateQbank.imagePreviewUrl || null;
        let { user, userBookMarks, qb } = this.props;
        return (
            <div>
                <Card onExpandChange={this.props.handleExpandChange}>
    {!this.props.expandQb &&
    <CardHeader
          title={this.props.qb.title}
          subtitle={``}
          actAsExpander={false}
          showExpandableButton={true}

        />
    }
      {this.props.expandQb &&
       <div>
         <CardHeader
           title={this.props.qb.author.fullName}
           textStyle={{verticalAlign:'73%'}}
           subtitle=""
           subtitleStyle={{color:"red"}}
           avatar={this.props.qb.author.picture}
           style={{borderBottom:'1px solid #CFD8DC'}}
         > 
         {user && this.props.qb.author._id === user._id && 
            <div>
               <Edit style={qbCardstyles.EditQb} color={blue500} onClick={this.props.OpenQbEdit}/>
          <DeleteForever style={qbCardstyles.DeleQb} color={red300} onClick={this.props.OpenConfirmQbDel}/>
              </div>
           }
         
       </CardHeader>
         {CheckImg  &&
           <CardMedia
             overlay={<CardTitle title={this.props.qb.title} subtitle={`${this.props.qb.noOfQuestions} Questions`} />}
           >
             <div style={{textAlign:'right',backgroundColor:'white',position:'absolute',zIndex:11}}>
               {user && this.props.qb.author._id === user._id && !this.props.UpdateQbank.imagePreviewUrl &&
               <div>
               <FlatButton
            label=""
            labelPosition="before"
            primary={true}
            icon={<AddAPhoto color={black} />}
            style={qbCardstyles.UpdateQbImage}
            labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
            onClick={(event) => this.ImgMhandleClick(event)}
             >
               </FlatButton>
               <Popover
          open={this.state.openImageMPopOver}
          anchorEl={this.state.ImgManchorEl}
          anchorOrigin={this.state.ImgManchorOrigin}
          targetOrigin={this.state.ImgMtargetOrigin}
          onRequestClose={() => this.ImgMhandleRequestClose()}
          onClick={() => this.ImgMhandleRequestClose()}
        >
          <Menu>
            <MenuItem primaryText="Upload Photo" >
            <input type="file"
                  accept="image/*"
                  style={qbCardstyles.uploadInput}
                  name="qBImage"
                  id="qBImage"
                  onChange={e => {
                      this.ImgMhandleRequestClose();this.props.handleImageChange(e)}
                    }
                  />
            </MenuItem>
            <MenuItem onClick={() => this.setState({
              openImageMPopOver: false,
              removeImgModel:true
            })} primaryText="Remove Photo" />
           
          </Menu>
        </Popover>

        {/* Re-usable Alert Dialog Component */}
        <AlertDialog 
        open={this.state.removeImgModel}
        handleConfirm={() => this.props.RemoveQbImage()}
        message="Are you sure you want to remove Question Bank Image ?"
        handleClose={() => this.setState({
          removeImgModel:false
        })}
        />
               </div>
             }
             {this.props.UpdateQbank.imagePreviewUrl &&
               <div style={{position:'absolute',right:4,top:4,padding:2}}>
                 <RaisedButton label="Save" primary={true} labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
                  style={{marginRight:3}}
                  onClick={() => this.props.UpdateQbankData()}
                    />
                 <RaisedButton label="Cancel" secondary={true} labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
                 onClick={() => this.props.CancelQbImage()}
                   />
               </div>
             }
               </div>
             {!this.props.UpdateQbank.imagePreviewUrl &&
               <img src={`//localhost:3001/${this.props.qb.image.replace('public','')}`} width="200" height="300" alt="" />
             }
             {this.props.UpdateQbank.imagePreviewUrl &&
               <img src={this.props.UpdateQbank.imagePreviewUrl} width="200" height="300" alt="" />
             }
           </CardMedia>
         }
         {user && this.props.qb.author._id === user._id && !this.props.qb.image &&
            <CardTitle title={this.props.qb.title} subtitle={`${this.props.qb.noOfQuestions} Questions`}>
            {!CheckImg &&
              <div style={{textAlign:'right',backgroundColor:'white',position:'absolute',zIndex:11,right:2,top:30,padding:0,margin:0}}>
                <FlatButton
             label=""
             labelPosition="before"
             primary={true}
             icon={<AddAPhoto color={black}/>}
             style={qbCardstyles.UpdateQbImage}
             labelStyle={qbCardstyles.overRideRaisedButtonUppercase}
              >
                <input type="file"
                   accept="image/*"
                   style={qbCardstyles.uploadInput}
                   name="qBImage"
                   id="qBImage"
                   onChange={e => {this.props.handleImageChange(e)}}
                   />
                </FlatButton>
              </div>
            }
            </CardTitle>
         }
         <CardText>
           {this.props.qb.summary}
         </CardText>
         <CardActions>
           <FlatButton label="Answer Questions" />
           { user && this.props.qb.author._id === user._id && 
           <FlatButton onClick={this.props.showAddQuestion} label="Add Questions" />
           }
           <FlatButton onClick={this.props.viewQuestions} label="View Questions" />
           <div style={{display:'block'}}>
          {user && userBookMarks.qBanks && userBookMarks.qBanks.length > 0 &&  userBookMarks.qBanks.indexOf(qb._id) !== -1 &&
            <IconButton>
            <BookMarked
              style={qbCardstyles.BookMarkBorder}
              className="BookMarkBorder"
              onClick={() => this.props.removebookMarkedQb(user._id,qb._id)}
              />
              </IconButton>
          }
          {user && userBookMarks.qBanks && userBookMarks.qBanks.indexOf(qb._id) === -1 &&
          <IconButton>
            <BookMarkBorder
              style={qbCardstyles.BookMarkBorder}
              className="BookMarkBorder"
              onClick={() => this.props.bookMarkQb(user._id,qb._id)}
              />
              </IconButton>
          }
          </div>
         </CardActions>
       </div>
      }
  </Card>
            </div>
        );
    }
}

QuestionBankCard.propTypes = {};

export default QuestionBankCard;
