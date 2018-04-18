import React, { Component } from 'react';
import '../styles/Pagination.css';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';
import ArrowLeft from 'material-ui/svg-icons/hardware/keyboard-arrow-left';

class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            maxButtons:this.props.maxButtons,
            countFromDb:this.props.countFromDb,
            currentPage:parseInt(this.props.currentPage),
            resultsLimit:parseInt(this.props.limit),
            loopStart:1,
            loopEnd:2,
            range:[],
            totalPagination:parseInt(this.props.countFromDb/this.props.limit)
        }
    }

    async componentDidMount(){
       await this.setPagination();
       await this.loopPagination();
    }

    setPagination(){console.log('this.state.loopEnd: '+this.state.loopEnd)
       if (this.state.currentPage < this.state.maxButtons && this.state.totalPagination <= this.state.maxButtons) {
           this.setState((prevState,props) => {
               return {
                loopStart:1,
                loopEnd:parseInt(prevState.totalPagination)
            }
           })
       }else {
           console.log('----TOP ELSE IN SETPAGINATION---');
           if (this.state.currentPage + 2 <= this.state.totalPagination && this.state.currentPage >= this.state.maxButtons - 2) {
               this.setState((prevState,props) => {
                   return {
                       loopStart:prevState.currentPage-2,
                       loopEnd:prevState.currentPage+2
                   }
               })
           }else if (this.state.currentPage >= this.state.maxButtons) {
              console.log('-------0000000-'+parseInt(this.state.totalPagination-this.state.maxButtons));
              this.setState((prevState,props) => {
                  return {
                      loopStart:this.state.totalPagination-this.state.maxButtons + 1,
                      loopEnd:this.state.totalPagination
                  }
              })
           } else {
            this.setState((prevState,props) => {
                return {
                    loopStart:this.state.loopStart,
                    loopEnd:this.state.maxButtons
                }
            })
           }
       }

    }

    loopPagination(){
        var i = this.state.loopStart;
        for (var index = this.state.loopStart; index <= this.state.loopEnd; ++index) {
            this.setState((prevState,props) => {
                return {
                    range:[...prevState.range, i]
                }
            });
            i++;
        }
    }
    
    render() {
        return (
            <div>
        <div className="center">
<div className="pagination">
<a style={{padding: 3,}} href="#"><ArrowLeft/></a>
  {this.state.range.length > 0  && this.state.range.map((p,i) => 
  <a key={i} className={this.state.currentPage === p ? "active" : ""} href="#">{p}</a>
 )}
  <a style={{padding: 3,}} href="#"><ArrowRight/></a>
</div>
<p>{this.state.totalPagination && this.state.totalPagination}</p>
<p>{JSON.stringify(this.state.range)}</p>
</div> 
            </div>
        );
    }
}

export default Pagination;