import React from 'react';
import { Link,browserHistory } from 'react-router';
import TextField from 'material-ui/TextField';
import {white, blue500,black} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import Clear from 'material-ui/svg-icons/content/clear';

import{ Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
 import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import { searchQbanks } from '../middlewares/api';

export default class QuestionBankSearch extends React.Component{
  searchObj;
  constructor(props){
    super(props);
    this.searchObj = new Subject();
  }

  componentDidMount(){
    this.clearSearch();

    this.searchObj
    .debounceTime(400)
    .distinctUntilChanged()
    .do(() => this.props.requestSearchQbanks())
    .switchMap(term => {
      if(term.length > 0) {
        let promise = searchQbanks(term);
        return Observable.fromPromise(promise);
      }
      return Observable.of({success:true})
    })
    .subscribe(
      resp => {
      console.log(resp);
      if (resp.success) {
        this.props.successSearchQbanks(resp);
      }
      else if (!resp.success && resp.message) {
        this.props.failedSearchQbanks(resp.message);
      }
      else {
        this.props.failedSearchQbanks('Something going wrong!');
      }
    },
    error => {
      console.log(error);
      this.props.failedSearchQbanks(error);
    }
  )
  }

  handleChange = (e)=> {
    let q = e.target.value;
    document.getElementById("clear").style.visibility = q !== '' ? 'visible' : 'hidden';
    document.getElementById("results").style.display = q !== '' ? '' : 'none';
    this.searchObj.next(q);

  }

  clearSearch = () => {
    document.getElementById("searchForm").q.value = "";
    document.getElementById("clear").style.visibility = 'hidden';
    document.getElementById("results").style.display = 'none';
  }

 render(){
   const styles = {
     mainSearch:{
       backgroundColor:'white',
       position:'relative'
     },
     textField:{
       width:'95%'
     },
     inputStyle:{

     },
     hintStyle:{

     },
     iconButton: {
       float: 'left',
       paddingTop: 12
     },
     clear:{
       cursor:'pointer',
       visibility:'hidden',
       position:'absolute',
       top:4,
       right:2
     },
     results:{
       position:'relative',
       top:0
     },
     autoComplete:{
       listStyle:'none',
       position:'absolute',
       left:20,
       top:0,
       zIndex:15,
       backgroundColor:'white',
       minWidth:'95%',
       minHeight:'100%',
       padding:0,
       margin:0,

     },
     autoCompleteItem:{
       padding:'0 .5em',
       lineHeight:'2em',
        fontSize:'.9em',
        cursor:'pointer',

     }
   }
   const { Qbanks } = this.props.QbSearch;
   return (
     <div>
       <div style={styles.mainSearch}>
         <Search style={styles.iconButton} color={black} />
         <form id="searchForm">
           <TextField
             autoComplete="off"
             hintText="Search..."
             underlineShow={true}
             fullWidth={true}
             style={styles.textField}
             inputStyle={styles.inputStyle}
             hintStyle={styles.hintStyle}
             onChange={e => this.handleChange(e)}
             name="q"
           />
         </form>
       <Clear onClick={() => this.clearSearch()} id="clear" style={styles.clear}/>
       </div>
       <div id="results" style={styles.results}>
       <ul style={styles.autoComplete}>
       {Qbanks && Qbanks.length > 0 && Qbanks !== null  &&
          Qbanks.map((qb,i) => {
            return (
              <Link key={i} to={`/question-bank/${qb._id}`}>
                <li className="autoCompleteItem" style={styles.autoCompleteItem}>{qb.title}</li>
              </Link>
            )
          })
       }
       {Qbanks && Qbanks.length <= 0 || Qbanks === null &&
        <li>loading...</li>
       }
       </ul>
       </div>
     </div>
   );
 }
}
