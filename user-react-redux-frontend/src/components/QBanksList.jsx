// ./user-react-redux-frontend/src/components/QBanksList.jsx
import React from 'react';
import Qlist from 'material-ui/svg-icons/action/view-list';
import { orange600 } from 'material-ui/styles/colors';
import { Grid, Row, Col } from 'react-material-responsive-grid';
import QBankbox from './QBankbox';

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
        <h3>Question Banks </h3>isLoggedIn:{JSON.stringify(isLoggedIn)}
          <Grid>
           <Row>
              {qBanks && qBanks.length > 0 &&
                    qBanks.map((qb,i) =>
                    <Col key={i} md={4}>
                       <QBankbox Icon={Qlist}
                         color={orange600}
                         title={qb.title}
                         countQuestions="248"
                         author={qb.author.fullName}
                         lastUpdated={qb.createdAt}/>
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
