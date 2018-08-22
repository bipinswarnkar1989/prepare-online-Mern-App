// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import Qlist from 'material-ui/svg-icons/action/view-list';
import { orange600,grey800 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import QBankbox from './QBankbox';
import { Link,browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import QuestionBankSearch from './QuestionBankSearch';
import Checkbox from 'material-ui/Checkbox';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import BookMarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookMarked from 'material-ui/svg-icons/action/bookmark';
//import RaisedButton from 'material-ui/RaisedButton';

class QBanksList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  componentDidMount(){
    let page = this.props.params.page;
    let limit = this.props.params.limit;
    let data = {
      page:page,
      limit:limit
    }
    this.props.mappedfetchQbanks(data).then(() => {
      if(this.props.mappedQbankState.qBanks){
      const qbIds = this.props.mappedQbankState.qBanks.map((item) => {
        return item._id;
      })
      if (this.props.mappedUserState.user) {
        const bmData = {
          userId:this.props.mappedUserState.user._id,
          qbIds:qbIds
        }
        console.log(bmData);
        this.props.mappedgetBookMarks(bmData);
      }
    }
    });
  }

  getQbanksUsingPntn(page,limit){
    browserHistory.push(`/question-banks/${page}/${limit}`);
    let data = {
      page:page,
      limit:limit
    }
    this.props.mappedfetchQbanks(data).then((v) => {
      const qbIds = this.props.mappedQbankState.qBanks.map((item) => {
        return item._id;
      })
      if (this.props.mappedUserState.user) {
        const bmData = {
          userId:this.props.mappedUserState.user._id,
          qbIds:qbIds
        }
        console.log(bmData);
        this.props.mappedgetBookMarks(bmData);
      }
    });
  }

  searchQbank(q){
    this.props.mappedsearchQbanks(q);
  }

  multiSelect(qb){
    this.props.mappedaddQbanksToDelete(qb);
  }

  askDeleteMultipleQb(){
    this.props.mappedshowMultipleDeleteQbanks(true);
  }

  cancelMultipleQbDelete(){
    this.props.mappedshowMultipleDeleteQbanks(false);
  }

  confirmMultipleQbDelete(){
    let qbIds = this.props.mappedQbankState.qBanksToDelete;
    this.props.mappeddeleteMultipleQbanks(qbIds);
  }

  bookMarkQb(userId,qBId){
    const data = {
      userId:userId,
      qbId:qBId
    }
    this.props.mappedbookMarkQb(data);
  }

  removebookMarkedQb(userId,qBId){
    const data = {
      userId:userId,
      qbId:qBId
    }
    this.props.mappedRmbookMarkQb(data);
  }

  countQuestions(qbId){
    
  }

  render(){
    const styles = {
      QBanksList:{

      },
      floatButton:{
        marginRight: 20,
      },
      Checkbox:{
        position:'absolute',
        right:1,
        top:1,
        backgroundColor:'white',
        width:'22px'
      },
      SelectAction:{
        position:'absolute',
        right:20,
        top:0,
        width:'15%'
      },
      BookMarkBorder:{
        left:'20%',
        bottom:10,
        position:'absolute',
        cursor:'pointer',
        color:grey800,

      }
    }

    const { user,isLoggedIn } = this.props.mappedUserState;
    const { qBanks,qBanksPagination,QbSearch,qBanksToDelete,showMultipleQbDelete,successMsg,error,userBookMarks,qbQuestionsCount } = this.props.mappedQbankState;
    const currentPage = parseInt(qBanksPagination.currentPage);
    const paginationLimit = parseInt(this.props.params.limit);
    const totalNumberOfPagination = parseInt(qBanksPagination.totalNumberOfPagination);

    return(
      <div style={styles.QBanksList} className="QBanksList">
        <div style={{position:'relative'}}>
        <div style={styles.SelectAction}>
         {qBanksToDelete && qBanksToDelete.length > 0 &&
           <DropDownMenu
           value={1}
           onChange={this.handleChange}
           style={styles.customWidth}
           autoWidth={false}
         >
           <MenuItem value={1} primaryText="Select Action" />
           <MenuItem value={2} primaryText="Delete" onClick={this.askDeleteMultipleQb.bind(this)}/>
         </DropDownMenu>
         }
        </div>
      </div>
        <h3 align="center">Question Banks </h3>
        <QuestionBankSearch
          search={e => this.searchQbank(e)}
          QbSearch={QbSearch}
          requestSearchQbanks={() => this.props.mappedrequestSearchQbanks()}
          successSearchQbanks={e => this.props.mappedsuccessSearchQbanks(e)}
          failedSearchQbanks={m => this.props.mappedfailedSearchQbanks(m)}
          />
          <Grid>
           <Row>
              {qBanks && qBanks.length > 0 &&
                    qBanks.map((qb,i) =>
                    <Col key={i} md={4}>
                      <div style={{position:'relative'}}>
                      {user && user._id && user._id === qb.author._id &&
                      <Checkbox style={styles.Checkbox} onCheck={(e) => this.multiSelect(qb)}/>
                       }
                      </div>
                       <Link to={`/question-bank/${qb._id}`}>
                         <QBankbox Icon={Qlist}
                           color={orange600}
                           title={qb.title}
                           countQuestions={qb.questions.length}
                           author={qb.author.fullName}
                           lastUpdated={qb.createdAt}/>
                       </Link>
                       <div style={{position:'relative'}}>

                          {user && userBookMarks.qBanks && userBookMarks.qBanks.length > 0 &&  userBookMarks.qBanks.indexOf(qb._id) !== -1 &&
                             <BookMarked
                              style={styles.BookMarkBorder}
                              className="BookMarkBorder"
                              onClick={() => this.removebookMarkedQb(user._id,qb._id)}
                              />
                           }
                           {user && userBookMarks.qBanks && userBookMarks.qBanks.indexOf(qb._id) === -1 &&
                             <BookMarkBorder
                              style={styles.BookMarkBorder}
                              className="BookMarkBorder"
                              onClick={() => this.bookMarkQb(user._id,qb._id)}
                              />
                           }
                       </div>
                    </Col>
                  )
                  }

           </Row>
        </Grid>

        <div className="pagination_div">
          <ul className="pgntion-ui component-pagination">
          {currentPage !== 1 &&
            <li onClick={()=> this.getQbanksUsingPntn(1,paginationLimit)} className="pagination-number">
              <FloatingActionButton backgroundColor="rgba(233,30,99,.12)"  mini={false}  style={styles.floatButton}>
              <span className="paginationNumber">First</span>
              </FloatingActionButton>
            </li>
          }
      	{currentPage !== 1 &&
          <li onClick={()=> this.getQbanksUsingPntn(currentPage-1,paginationLimit)} className="pagination-arrow arrow-left">
            <FloatingActionButton backgroundColor="rgba(233,30,99,.12)" mini={true}  style={styles.floatButton}>
             <ArrowLeft style={{fill:'black !important'}}/>
             </FloatingActionButton>
          </li>
        }
      {qBanksPagination && qBanksPagination.buttonsRangeArray &&
        qBanksPagination.buttonsRangeArray.map((n,i) => {
          return (
            <li key={i} onClick={()=> this.getQbanksUsingPntn(n,paginationLimit)} className="pagination-number">
              <FloatingActionButton backgroundColor="rgba(233,30,99,.12)"  mini={true} secondary={n === currentPage} style={styles.floatButton}>
              <span className={n === currentPage ? 'activePaginationNumber': 'paginationNumber'}>{n}</span>
              </FloatingActionButton>
            </li>
          )
        })
      }

      {totalNumberOfPagination > currentPage &&
          <li onClick={()=> this.getQbanksUsingPntn(currentPage+1,paginationLimit)} className="pagination-arrow arrow-right">
            <FloatingActionButton backgroundColor="rgba(233,30,99,.12)" mini={true}  style={styles.floatButton}>
           <ArrowRight style={{fill:'black !important'}}/>
           </FloatingActionButton>
          </li>
        }
        {currentPage !== totalNumberOfPagination &&
            <li onClick={()=> this.getQbanksUsingPntn(totalNumberOfPagination,paginationLimit)} className="pagination-number">
              <FloatingActionButton backgroundColor="rgba(233,30,99,.12)"  mini={false} style={styles.floatButton}>
              <span className="paginationNumber">Last</span>
              </FloatingActionButton>
            </li>
        }
      </ul>
        </div>
         <MultiDeleteDialog
          showMultipleQbDelete={showMultipleQbDelete}
          cancelMultipleQbDelete={this.cancelMultipleQbDelete.bind(this)}
          qBanksToDelete={qBanksToDelete}
          confirmMultipleQbDelete={this.confirmMultipleQbDelete.bind(this)}
          />
          <div align="center">
            <Snackbar
            message={successMsg !== null ? successMsg : error !== null ? error : 'Loading...'}
            open={successMsg !== null ? true : error !== null ? true : false}
            autoHideDuration={8000}
            onRequestClose={this.handleRequestClose}
          />
          </div>
      </div>
    )
  }
}

const MultiDeleteDialog = (props) => {
  const MultiDeleteActions = [
   <FlatButton
     label="Cancel"
     primary={true}
     onClick={props.cancelMultipleQbDelete}
   />,
   <FlatButton
     label="Confirm"
     primary={true}
     keyboardFocused={true}
     onClick={props.confirmMultipleQbDelete}
   />,
 ];
    return (
      <Dialog
     title="Delete Multiple Question Banks"
     actions={MultiDeleteActions}
     modal={false}
     open={props.showMultipleQbDelete}
     onRequestClose={props.cancelMultipleQbDelete}
    >
    {props.qBanksToDelete && props.qBanksToDelete.length > 0 &&
     `Are you sure want to delete these ${props.qBanksToDelete.length} question banlks?`
   }
    </Dialog>
    )
}

export default QBanksList;
