// ./user-react-redux-frontend/src/components/App.js
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import { Link,browserHistory } from 'react-router';

let  menuRoutes =  [
    { text: 'Home', icon: <Assessment/>, link: '/' },
    { text: 'Question Banks', icon: <Web/>, link: '/question-banks/1/10' },
    { text: 'Mock Tests', icon: <GridOn/>, link: '/table' },
    { text: 'Login', icon: <PermIdentity/>, link: '/login' },
    { text: 'Register', icon: <PermIdentity/>, link: '/register' }
  ];

let loggedInMenuRoutes = menuRoutes.filter((m) => m.text !== 'Login' && m.text !== 'Register')


 class App extends React.Component {
  constructor(props){
    super(props);
    this.props.mappedAppState.navDrawerOpen = true;
    this.logout = this.logout.bind(this);
  }

  componentDidMount(){

  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      //this.setState({navDrawerOpen: nextProps.width === LARGE});
      this.props.mappedAppState.navDrawerOpen = nextProps.width === LARGE;
      //alert(this.props.mappedAppState.navDrawerOpen);
    }
    if (nextProps.isLoggedIn !== this.props.mappedUserState.isLoggedIn) {

    }
  }

  handleChangeRequestNavDrawer() {
     this.props.mappedToggleNav();
    // this.setState({
    //   navDrawerOpen: !this.state.navDrawerOpen
    // });
  }

logout(event){
  event.preventDefault();
  this.props.mappedLogOut();
}

esSearch(q){
  this.props.mappedesSearch(q);
}

selectEsResult(title){
  this.props.mappedesSearch('');
  document.getElementById("esInputField").value = title;
}

  render(){
    let { navDrawerOpen } = this.props.mappedAppState;
    let { user, isLoggedIn } = this.props.mappedUserState;
    let { esSearchResult } = this.props.mappedQbankState;
   const paddingLeftDrawerOpen = 236;

   const styles = {
     header: {
       paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
     },
     container: {
       margin: '80px 20px 20px 15px',
       paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
     },
     results:{
      position:'relative',
      top:-10,
      width: '73%',
      marginLeft:35
    },
    autoComplete:{
      position:'absolute',
      left:0,
      top:-10,
      zIndex:20,
      backgroundColor:'#EBF0F8',
      minWidth:'100%',
      minHeight:'auto',
      padding:0,
      margin:0,
      color:'black'
    },
    autoCompleteItem:{
      padding:'0 .5em',
      lineHeight:'2em',
       fontSize:'.9em',
       cursor:'pointer',
       left:0
    },
    acUl:{
      listStyle:'none',
      margin:0,
      padding:0
    }
   };
    return(
      <MuiThemeProvider muiTheme={ThemeDefault}>
         <div>
           <Header styles={styles.header}
                   handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                   logout={this.logout} isLoggedIn={isLoggedIn}
                   esSearch={(q) => this.esSearch(q)}
                   esSearchResults={esSearchResult}
                   />

             <LeftDrawer navDrawerOpen={navDrawerOpen}
                         menus={user ? loggedInMenuRoutes : menuRoutes}
                         username={user  ? user.fullName : 'Guest User'}
                         userprofilepic={user ? user.picture : 'http://www.material-ui.com/images/uxceo-128.jpg'}/>

             <div style={styles.container}>
             <div id="esresults" style={styles.results}>
             {esSearchResult && esSearchResult.hits   && esSearchResult.hits.hits && esSearchResult.hits.hits.length  > 0 &&
       <div style={styles.autoComplete}>
       <ul style={styles.acUl}>
       {
          esSearchResult.hits.hits.map((qb,i) => {
            return (
              <Link key={i} to={`/question-bank/${qb._id}`} onClick={() =>this.selectEsResult(qb._source.title)}>
                <li className="autoCompleteItem" style={styles.autoCompleteItem}>{qb._source.title}</li>
              </Link>
            )
          })
       }
       {esSearchResult && esSearchResult.hits && esSearchResult.hits.hits.length  <= 0  &&
        <li>loading esSearchResults...</li>
       }
       </ul>
       </div>
          }
       </div>
               {this.props.children}
             </div>
         </div>
       </MuiThemeProvider>
    )
  }
}

export default withWidth()(App);
