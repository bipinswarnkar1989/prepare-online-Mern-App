import React, { Component } from 'react';
import '../styles/Pagination.css';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

class Pagination extends Component {
    render() {
        return (
            <div>
        <div className="center">
<div className="pagination">
<a style={{padding: 3,}} href="#"><ArrowLeft/></a>
  <a href="#">1</a>
  <a className="active" href="#">2</a>
  <a href="#">3</a>
  <a href="#">4</a>
  <a href="#">5</a>
  <a style={{padding: 3,}} href="#"><ArrowRight/></a>
</div>
</div> 
            </div>
        );
    }
}

export default Pagination;