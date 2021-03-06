import React from 'react';
import {Link} from 'react-router';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Menu from 'material-ui/svg-icons/navigation/menu';
import ViewModule from 'material-ui/svg-icons/action/view-module';
import {white} from 'material-ui/styles/colors';
import Add from 'material-ui/svg-icons/content/add';
import SearchBox from './SearchBox';
import Search from 'material-ui/svg-icons/action/search';

const Title = (props) => {
  return (
    <div>
      <div id="appTitle" style={{}}>MockOnline</div>
      <div id="searchBox" style={{display:'none'}}>
      <SearchBox search={(q) => props.search(q)} esSearchResults={props.esSearchResults}/>
      </div>
    </div>
  )
}

class Header extends React.Component {

  showSearch(){
    this.props.esSearch('');
    document.getElementById("esInputField").value = '';
    document.getElementById("esInputField").focus();
    let appTitle = document.getElementById("appTitle");
    let searchBox = document.getElementById("searchBox");
    if (appTitle.style.display !== 'none') {
      appTitle.style.display = 'none';
      searchBox.style.display = '';
    }else{
      appTitle.style.display = '';
      searchBox.style.display = 'none';
    }
  }

  search(q){
    this.props.esSearch(q);
  }

  render() {
    const {styles, handleChangeRequestNavDrawer} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}}
              title={
                <Title  search={(q) => this.search(q)} esSearchResults={this.props.esSearchResults}/>
              }
              iconElementLeft={
                  <IconButton style={style.menuButton} onClick={handleChangeRequestNavDrawer}>
                    <Menu color={white} />
                  </IconButton>
              }
              iconElementRight={
                <div style={style.iconsRightContainer}>
                  {/*
                    <IconMenu color={white}
                              iconButtonElement={
                                <IconButton><ViewModule color={white}/></IconButton>
                              }
                              targetOrigin={{horizontal: 'right', vertical: 'top'}}
                              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem key={1} primaryText="Application 1"/>
                      <MenuItem key={2} primaryText="Application 2"/>
                      <MenuItem key={3} primaryText="Application 3"/>
                    </IconMenu>
                     */}
                  <IconButton onClick={() => this.showSearch()} style={styles.iconButton} >
                  <Search color={white} />
                  </IconButton>
                  {this.props.isLoggedIn &&
                    <Link to='/question-bank/create'><IconButton><Add color={white}/></IconButton></Link>
                  }
                  <IconMenu color={white}
                            iconButtonElement={
                              <IconButton><MoreVertIcon color={white}/></IconButton>
                            }
                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                  >
                    <MenuItem primaryText="Sign out" onClick={this.props.logout} containerElement={<Link to="/"/>}/>
                  </IconMenu>
                </div>
              }
            />
          </div>
      );
  }
}

// Header.propTypes = {
//   styles: PropTypes.object,
//   handleChangeRequestNavDrawer: PropTypes.func
// };

export default Header;
