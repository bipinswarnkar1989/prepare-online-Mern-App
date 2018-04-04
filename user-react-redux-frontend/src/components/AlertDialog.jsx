import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AlertDialog extends Component {
    handleConfirm(){
        this.props.handleConfirm();
    }
    handleClose(){
        this.props.handleClose();
    }
    render() {
        const actions = [
            <FlatButton
              label="Confirm"
              primary={true}
              onClick={this.handleConfirm.bind(this)}
            />,
            <FlatButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose.bind(this)}
            />,
          ];
        return (
            <div>
               <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.handleClose.bind(this)}
        >
          {this.props.message}
        </Dialog>  
            </div>
        );
    }
}

export default AlertDialog;