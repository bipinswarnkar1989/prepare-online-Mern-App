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


export default class Home extends React.Component {
  // constructor(props){
  //   super(props);
  // }
  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
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
    return(
      <div style={styles.homeContainer}>
        {/*JSON.stringify(this.props.mappedUserState)*/}
      <div styles={styles.qBContainer}>
        {user &&
           <h2>Welcome {user.fullName} </h2>
        }
        <h3>Latest Question Banks</h3>
          <Grid>
           <Row>
              <Col md={4}>
                 <QBankbox Icon={Qlist}
                   color={orange600}
                   title="Chattisgarh G.K"
                   countQuestions="248"
                   username="Bipin Swarnkar"
                   lastUpdated="September 19, 2015"/>
              </Col>
              <Col md={4}>
                <QBankbox Icon={Qlist}
                  color={orange600}
                  title="Indian History"
                  countQuestions="248"
                  username="Manav Shrivastava"
                  lastUpdated="September 19, 2015"/>
              </Col>
              <Col md={4}>
                <QBankbox Icon={Qlist}
                  color={orange600}
                  title="Indian Constitution"
                  countQuestions="248"
                  username="Praveen Agrawal"
                  lastUpdated="September 19, 2015"/>
              </Col>

           </Row>
        </Grid>

      </div>
      </div>
    )
  }
}
