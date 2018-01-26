import React from 'react';
import TextField from 'material-ui/TextField';
import {white, blue500,black} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Search from 'material-ui/svg-icons/action/search';
import Clear from 'material-ui/svg-icons/content/clear';

const QuestionBankSearch = (props) => {
  const styles = {
    main:{
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
    }
  }

  const handleChange = (e)=> {
    let q = e.target.value;
    document.getElementById("clear").style.visibility = q !== '' ? 'visible' : 'hidden';
  }

  const clearSearch = () => {
    document.getElementById("searchForm").q.value = "";
    document.getElementById("clear").style.visibility = 'hidden';
  }

  return (
    <div style={styles.main}>

        <Search style={styles.iconButton} color={black} />

      <form id="searchForm">
        <TextField
          hintText="Search..."
          underlineShow={true}
          fullWidth={true}
          style={styles.textField}
          inputStyle={styles.inputStyle}
          hintStyle={styles.hintStyle}
          onChange={e => handleChange(e)}
          name="q"
        />
      </form>

    <Clear onClick={() => clearSearch()} id="clear" style={styles.clear}/>
    </div>
  );
}

export default QuestionBankSearch;
