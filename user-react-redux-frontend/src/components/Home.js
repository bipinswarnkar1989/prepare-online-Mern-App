// ./user-react-redux-frontend/src/components/App.js
import React from 'react';
// import PropTypes from 'prop-types';
// import {GridList, GridTile} from 'material-ui/GridList';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import Qbox from './Qbox';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';


export default class Home extends React.Component {
  // constructor(props){
  //   super(props);
  // }

  render(){
    const styles = {
      homeContainer:{
        textAlign:'center'
      },
      qBContainer:{

      }
    }
    return(
      <div style={styles.homeContainer}>
      <div styles={styles.qBContainer}>
        <h3>Latest Question Banks</h3>
          <Grid>
           <Row>
              <Col md={3}>
                 <p>This column consumes the entire row for extra-small,
                 small, and medium screens.  For large and extra-large
                 screens, it consumes half of the row.</p>
              </Col>
              <Col md={3}>
                 <p>This column isn't visible for extra-small, small,
                 and medium screens, but is visible for large and
                 extra-large screens.  It consumes half of the row.</p>
              </Col>
              <Col md={3}>
                 <p>This column is only visible for medium and large
                 screens and consumes the entire row.</p>
              </Col>
              <Col md={3}>
                 <p>This column is hidden for small and large screens
                 and consumes the entire row.</p>
              </Col>
           </Row>
        </Grid>
          <div className="row">

        <div className="col s12 m6 l3">
          <Qbox Icon={ShoppingCart}
                   color={pink600}
                   title="Total Profit"
                   value="1500k"
          />
        </div>


        <div className="col s12 m6 l3">
          <Qbox Icon={ThumbUp}
                   color={cyan600}
                   title="Likes"
                   value="4231"
          />
        </div>

        <div className="col s12 m6 l3">
          <Qbox Icon={Assessment}
                   color={purple600}
                   title="Sales"
                   value="460"
          />
        </div>

        <div className="col s12 m6 l3">
          <Qbox Icon={Face}
                   color={orange600}
                   title="New Members"
                   value="248"
          />
        </div>
      </div>
      </div>
      </div>
    )
  }
}
