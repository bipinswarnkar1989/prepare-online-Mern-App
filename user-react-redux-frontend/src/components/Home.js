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
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import { Link } from 'react-router';


export default class Home extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
    this.props.mappedgetLatestqBanks().then(
      () => {
        const qbIds = this.props.mappedQbankState.latestQbanks.Qbanks.map((item) => {
          return item._id;
        })
        const countData = {
          qbIds:qbIds
        }
        this.props.mappedcountQbQuestions(countData);
      }
    );
  }

  render(){
    const styles = {
      homeContainer:{
        textAlign:'center'
      },
      qBContainer:{

      }
    }
      const user = this.props.mappedUserState.user;
      const { latestQbanks,qbQuestionsCount } = this.props.mappedQbankState;
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
                           countQuestions={
                            qbQuestionsCount && qbQuestionsCount.filter(item => item.qbank === qb._id).length
                           }
                           author={qb.author.fullName}
                           lastUpdated={qb.createdAt}/>
                       </Link>
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
