import React from 'react';
import Paper from 'material-ui/Paper';
import {white, grey800, lightBlue900, blueGrey500} from 'material-ui/styles/colors';
import {typography} from 'material-ui/styles';

class QBankbox extends React.Component {
  maintainTextLength(text,maxLength){
    if(text.length >= maxLength){
      let shortedText = text.substr(0,maxLength);
      return `${shortedText}...`;
    }
    else{
      return text;
    }
  }

  dateFormat(date){
    let d = new Date(date);
    let month = d.getMonth();
    let year = d.getFullYear();
    let day = d.getUTCDay();
    return `${month} ${day}, ${year}`;   // September 19, 2015
  }

  render() {
    const {color, title, countQuestions, Icon, author, lastUpdated} = this.props;

    const styles = {
      paperStyle:{
        marginRight:5,
        marginLeft:5,
        marginTop:5,

      },
      QbBox:{

      },
      title:{
        fontSize:17,
        color: lightBlue900,
        display:'block',
        fontWeight: typography.fontWeightBold,
        minWidth:'90%',
        maxWidth:'50px',
        maxHeight:'40px',
        minHeight:'40px',
        overflow:'hidden',
        padding:2,
        wordWrap:'break'
      },
      content: {
        padding: '5px 10px',
        marginLeft: 90,
        minHeight: 100,
        width:'auto'
      },
      lastUpdatedDiv:{

      },
      lastUpdated:{
        fontSize:12,
        color:blueGrey500,
        textAlign:'center'
      },
      number: {
        display: 'block',
        fontWeight: typography.fontWeightMedium,
        fontSize: 15,
        color: grey800
      },
      text: {
        fontSize: 16,
        fontWeight: typography.fontWeightLight,
        color: grey800
      },
      iconSpan: {
        float: 'left',
        minHeight: 110,
        width: 90,
        textAlign: 'center',
        backgroundColor: color,
        height:'100%'
      },
      icon: {
        minHeight: 60,
        height:'100%',
        width: 48,
        marginTop: 20,
        maxWidth: '100%'
      },
      maxTextLength:{

      }
    };

    return (
      <Paper style={styles.paperStyle}>
      <div className="QbBox" style={styles.QbBox}>
        <span style={styles.iconSpan}>
          <Icon color={white}
                style={styles.icon}
          />
        </span>

        <div style={styles.content}>
          <span style={{...styles.title,...styles.maxTextLength}}>{this.maintainTextLength(title,20)}</span>
          <span style={styles.number}>{countQuestions} Questions</span>
          <span>Author: <span style={{...styles.username,...styles.maxTextLength}} >{this.maintainTextLength(author,20)}</span></span>
          <div className="lastUpdatedDiv" style={styles.lastUpdatedDiv}><div style={styles.lastUpdated} className="lastUpdated">{this.dateFormat(lastUpdated)}</div></div>
        </div>
      </div>
      </Paper>
      );
  }
}

// Qbox.propTypes = {
//   // color: PropTypes.string,
//   // title: PropTypes.string,
//   // value: PropTypes.string
// };

export default QBankbox;
