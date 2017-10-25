// ./user-react-redux-frontend/src/components/App.js
import React from 'react';
import AppBar from 'material-ui/AppBar';

export default class App extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
      <div className="Top">
      <AppBar
    title="Title"
    iconClassNameRight="muidocs-icon-navigation-expand-more"
  />
      </div>
      <div>
      {this.props.children}
      </div>
      </div>
    )
  }
}
