// ./user-react-redux-frontend/src/components/App.js
import React from 'react';
// import PropTypes from 'prop-types';
// import {GridList, GridTile} from 'material-ui/GridList';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Qlist from 'material-ui/svg-icons/action/view-list';
import QBankbox from './QBankbox';
import {cyan600, pink600, purple600, orange600,grey800} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import { Link } from 'react-router';
import BookMarkBorder from 'material-ui/svg-icons/action/bookmark-border';
import BookMarked from 'material-ui/svg-icons/action/bookmark';

export default class Home extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  componentDidMount(){
    this.props.mappedgetLatestqBanks().then(
      () => {
         if (this.props.mappedQbankState.latestQbanks.Qbanks) {
          const qbIds = this.props.mappedQbankState.latestQbanks.Qbanks.map((item) => {
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
      }
    );
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

  render(){
    const styles = {
      homeContainer:{
        textAlign:'center'
      },
      qBContainer:{

      },
      BookMarkBorder:{
        left:'20%',
        bottom:10,
        position:'absolute',
        cursor:'pointer',
        color:grey800,

      }
    }
      const user = this.props.mappedUserState.user;
      const { latestQbanks, qbQuestionsCount, userBookMarks } = this.props.mappedQbankState;
    return(
      <div style={styles.homeContainer}>
      <div styles={styles.qBContainer}>
        {user &&
           <h2>Welcome {user.fullName} </h2>
        }
        <h3>Latest Question Banks</h3>
          <Grid>
           <Row>
              {latestQbanks.Qbanks && latestQbanks.Qbanks.length > 0 &&
                    latestQbanks.Qbanks.map((qb,i) =>
                    <Col key={i} md={4}>
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

      </div>
      </div>
    )
  }
}
