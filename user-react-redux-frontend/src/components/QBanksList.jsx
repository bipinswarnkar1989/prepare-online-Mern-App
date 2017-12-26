// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import Qlist from 'material-ui/svg-icons/action/view-list';
import { orange600 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import QBankbox from './QBankbox';
import { Link,browserHistory } from 'react-router';

class QBanksList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.props.mappedfetchUserIfLoggedIn();
  }

  componentDidMount(){
    this.props.mappedfetchQbanks();
  }

  render(){
    const styles = {
      QBanksList:{

      }
    }

    const { user,isLoggedIn } = this.props.mappedUserState;
    const {qBanks} = this.props.mappedQbankState;
    return(
      <div style={styles.QBanksList} className="QBanksList">
        <h3 align="center">Question Banks </h3>
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

      </div>
    )
  }
}

export default QBanksList;
