// ./user-react-redux-frontend/src/components/App.js
import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import data from '../materialData';


 class App extends React.Component {
  constructor(props){
    super(props);
    this.props.mappedAppState.navDrawerOpen = true;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      //this.setState({navDrawerOpen: nextProps.width === LARGE});
      this.props.mappedAppState.navDrawerOpen = nextProps.width === LARGE;
      //alert(this.props.mappedAppState.navDrawerOpen);
    }
  }

  handleChangeRequestNavDrawer() {
     this.props.mappedToggleNav();
    // this.setState({
    //   navDrawerOpen: !this.state.navDrawerOpen
    // });
  }

  render(){
    let { navDrawerOpen } = this.props.mappedAppState;
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
                   handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

             <LeftDrawer navDrawerOpen={navDrawerOpen}
                         menus={data.menus}
                         username="Guest User"/>

             <div style={styles.container}>
               {this.props.children}
             </div>
         </div>
       </MuiThemeProvider>
    )
  }
}

export default withWidth()(App);
