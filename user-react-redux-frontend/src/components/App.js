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

let  menuRoutes =  [
    { text: 'Home', icon: <Assessment/>, link: '/' },
    { text: 'Question Banks', icon: <Web/>, link: '/question-banks' },
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

  render(){
    let { navDrawerOpen } = this.props.mappedAppState;
    let { user, isLoggedIn } = this.props.mappedUserState;
   const paddingLeftDrawerOpen = 236;

   const styles = {
     header: {
       paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
     },
     container: {
       margin: '80px 20px 20px 15px',
       paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
     }
   };
    return(
      <MuiThemeProvider muiTheme={ThemeDefault}>
         <div>
           <Header styles={styles.header}
                   handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}
                   logout={this.logout} isLoggedIn={isLoggedIn}/>

             <LeftDrawer navDrawerOpen={navDrawerOpen}
                         menus={user ? loggedInMenuRoutes : menuRoutes}
                         username={user  ? user.fullName : 'Guest User'}
                         userprofilepic={user ? user.picture : 'http://www.material-ui.com/images/uxceo-128.jpg'}/>

             <div style={styles.container}>
               {this.props.children}
             </div>
         </div>
       </MuiThemeProvider>
    )
  }
}

export default withWidth()(App);
