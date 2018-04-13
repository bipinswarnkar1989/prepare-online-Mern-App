import React, { Component } from 'react';
import '../styles/Pagination.css';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

class Pagination extends Component {
    render() {
        const rangeLength = new Array(this.props.maxButtons);
        return (
            <div>
        <div className="center">{this.props.maxButtons}
<div className="pagination">
<a style={{padding: 3,}} href="#"><ArrowLeft/></a>
  {rangeLength && rangeLength.map(p => 
  <a className="active" href="#">2</a>
 )}
  <a style={{padding: 3,}} href="#"><ArrowRight/></a>
  {this.props.limit}
</div>
</div> 
            </div>
        );
    }
}

export default Pagination;