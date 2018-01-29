// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import Qlist from 'material-ui/svg-icons/action/view-list';
import { orange600 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import QBankbox from './QBankbox';
import { Link,browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import QuestionBankSearch from './QuestionBankSearch';
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
    this.props.mappedfetchQbanks(data);
  }

  getQbanksUsingPntn(page,limit){
    browserHistory.push(`/question-banks/${page}/${limit}`);
    let data = {
      page:page,
      limit:limit
    }
    this.props.mappedfetchQbanks(data);
  }

  searchQbank(q){
    this.props.mappedsearchQbanks(q);
  }

  render(){
    const styles = {
      QBanksList:{

      },
      floatButton:{
        marginRight: 20,
      },

    }

    const { user,isLoggedIn } = this.props.mappedUserState;
    const { qBanks,qBanksPagination,QbSearch } = this.props.mappedQbankState;
    const currentPage = parseInt(qBanksPagination.currentPage);
    const paginationLimit = parseInt(this.props.params.limit);
    const totalNumberOfPagination = parseInt(qBanksPagination.totalNumberOfPagination);
    return(
      <div style={styles.QBanksList} className="QBanksList">
        <h3 align="center">Question Banks </h3>
        <QuestionBankSearch
          search={e => this.searchQbank(e)}
          QbSearch={QbSearch}
          />
          <Grid>
           <Row>
              {qBanks && qBanks.length > 0 &&
                    qBanks.map((qb,i) =>
                    <Col key={i} md={4}>
                       <Link to={`/question-bank/${qb._id}`}>
                         <QBankbox Icon={Qlist}
                           color={orange600}
                           title={qb.title}
                           countQuestions="248"
                           author={qb.author.fullName}
                           lastUpdated={qb.createdAt}/>
                       </Link>
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

      </div>
    )
  }
}

export default QBanksList;
