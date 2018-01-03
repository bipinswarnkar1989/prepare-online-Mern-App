// ./user-react-redux-frontend/src/reducers/qBankReducer.js
const INITIAL_STATE = {
  qBanks:null,
  isFetching:false,
  error:null,
  successMsg:null,
  CreateQbank:{
    imagePreviewUrl:null,
    openDialog:false,
    QbankToEdit:null
  },
  newQbank:null,
  fetchedQbank:null,
  expandQb:true,
  UpdateQbank:{
    imagePreviewUrl:null
  },
  QbankToDelete:{
    openDialog:false,
    Qbank:null
  },
  AddNewQuestion:{
    showAddQDiv:false,
    Question:null,
    OptionsArray:[
      {
        number:1,
        value:null
      },
      {
        number:2,
        value:null
      },
      {
        number:3,
        value:null
      },
       {
        number:4,
        value:null
      }
    ],
    isFetching:false,
    QuestionAdded:null
  },
  ViewQbQuestions:{
    showViewQDiv:false,
    Questions:null
  },
  DeleteQbQuestion:{
    showDeleteQues:false,
    questionToDelete:null,
  }
}

const qBankReducer = (currentState = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REQUEST_FETCH_QBANKS':
       return {
         ...currentState, isFetching:true
       }

    case 'SUCCESS_FETCH_QBANKS':
       return {
         ...currentState, isFetching:false,qBanks:action.data.qb,successMsg:action.data.message
       }

    case 'FAILED_FETCH_QBANKS':
       return {
         ...currentState, isFetching:false,qBanks:null,successMsg:null,error:action.message
       }

    case 'QBANK_IMAGE_PREVIEW':
       return {
         ...currentState,
         error:null,
         successMsg:null,
         CreateQbank:{
           imagePreviewUrl:action.imagePreviewUrl
         }
       }

   case 'REQUEST_CREATE_QBANK':
      return {
       ...currentState,
       isFetching:true
      }

  case 'SUCCESS_CREATE_QBANK':
     return {
       ...currentState,
       isFetching:false,
       newQbank:action.data.qb,
       successMsg:action.data.message,
       error:null
     }

  case 'FAILED_CREATE_QBANK':
    return {
      ...currentState,
      isFetching:false,
      newQbank:null,
      successMsg:null,
      error:action.message
    }

    case 'REQUEST_FETCH_QBANK':
       return {
        ...currentState,
        isFetching:true
       }

   case 'SUCCESS_FETCH_QBANK':
      return {
        ...currentState,
        isFetching:false,
        fetchedQbank:action.data.qb,
        successMsg:action.data.message,
        error:null
      }

   case 'FAILED_FETCH_QBANK':
     return {
       ...currentState,
       isFetching:false,
       fetchedQbank:null,
       successMsg:null,
       error:action.message
     }

  case 'TOGGLE_EXPAND_QB_CARD':
     return {
       ...currentState,
       expandQb: !currentState.expandQb
     }

 case 'UPDATE_QB_IMAGE_PREVIEW':
    return {
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:{
        imagePreviewUrl:action.image
      },
      error:null,
      success:null,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      }
    }

case 'FAILED_UPDATE_QB_IMAGE_PREVIEW':
  return {
    ...currentState,
    expandQb:currentState.expandQb,
    UpdateQbank:currentState.UpdateQbank,
    error:action.message,
    success:null,
    QbankToDelete:{
      openDialog:false,
      Qbank:null
    }
  }

case 'FAILED_UPDATE_QB':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:null
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:action.message,
     isFetching:false,
     QbankToDelete:{
       openDialog:false,
       Qbank:null
     }
   }

 case 'REQUEST_UPDATE_QB':
    return {
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:currentState.UpdateQbank,
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:true,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      }
    }

    case 'SUCCESS_UPDATE_QB':
       return {
         ...currentState,
         expandQb:currentState.expandQb,
         UpdateQbank:{
           imagePreviewUrl:null
         },
         fetchedQbank:action.data.qb,
         successMsg:action.data.message,
         error:null,
         isFetching:false,
         QbankToDelete:{
           openDialog:false,
           Qbank:null
         }
       }

   case 'OPEN_QB_EDIT':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
       openDialog:true,
       QbankToEdit:action.qbToEdit
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:null,
     isFetching:false,
     QbankToDelete:{
       openDialog:false,
       Qbank:null
     }
   }

   case 'CLOSE_QB_EDIT':
   return {
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
       openDialog:false,
       QbankToEdit:null
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:null,
     isFetching:false,
     QbankToDelete:{
       openDialog:false,
       Qbank:null
     }
   }

  case 'OPEN_QB_DELETE':
     return{
       ...currentState,
       expandQb:currentState.expandQb,
       UpdateQbank:{
         imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
         openDialog:false,
         QbankToEdit:null
       },
       fetchedQbank:currentState.fetchedQbank,
       successMsg:null,
       error:null,
       isFetching:false,
       QbankToDelete:{
         openDialog:true,
         Qbank:action.qbToDelete
       }
     }

 case 'CLOSE_QB_DELETE':
    return{
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      }
    }

case 'REQUEST_DELETE_QB':
   return{
     ...currentState,
     expandQb:currentState.expandQb,
     UpdateQbank:{
       imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
       openDialog:false,
       QbankToEdit:null
     },
     fetchedQbank:currentState.fetchedQbank,
     successMsg:null,
     error:null,
     isFetching:true,
     QbankToDelete:{
       openDialog:true,
       Qbank:action.qbToDelete
     }
   }

 case 'SUCCESS_DELETE_QB':
    return{
      ...currentState,
      expandQb:currentState.expandQb,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:action.data.message,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      }
    }

    case 'FAILED_DELETE_QB':
       return{
         ...currentState,
         expandQb:currentState.expandQb,
         UpdateQbank:{
           imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
           openDialog:false,
           QbankToEdit:null
         },
         fetchedQbank:currentState.fetchedQbank,
         successMsg:null,
         error:action.message,
         isFetching:false,
         QbankToDelete:{
           openDialog:true,
           Qbank:action.qbToDelete
         }
       }

  case 'SHOW_ADD_QUESTION':
    return{
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:true,
        Question:null,
        OptionsArray:[
          {
            number:1,
            value:null
          },
          {
            number:2,
            value:null
          },
          {
            number:3,
            value:null
          },
           {
            number:4,
            value:null
          }
        ]
      }
    }

  case 'ADD_NEW_OPTION_IN_NEW_QUESTION':
  const NewOptionsArray = [
    ...currentState.AddNewQuestion.OptionsArray, action.option
  ];
  //currentState.AddNewQuestion.OptionsArray.push(action.option);
       return{
         ...currentState,
         expandQb:false,
         UpdateQbank:{
           imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
           openDialog:false,
           QbankToEdit:null
         },
         fetchedQbank:currentState.fetchedQbank,
         successMsg:null,
         error:null,
         isFetching:false,
         QbankToDelete:{
           openDialog:false,
           Qbank:null
         },
         AddNewQuestion:{
           showAddQDiv:true,
           Question:currentState.AddNewQuestion.Question,
           OptionsArray:NewOptionsArray
         }
       }

  case 'UPDATE_NEW_QUESTION_STATE':
  console.log(action.data)
      if(action.data.fieldname === 'question'){
          currentState.AddNewQuestion.Question = action.data.fieldvalue;
      }
      else{
        currentState.AddNewQuestion.OptionsArray = currentState.AddNewQuestion.OptionsArray.map((op) => {
          if(op.number === action.data.number){
            let newOpt = {number:action.data.number,value:action.data.fieldvalue}
            return {...op, ...newOpt}
          }
          return op;
        })
      }
      return{
        ...currentState,
        expandQb:false,
        UpdateQbank:{
          imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
          openDialog:false,
          QbankToEdit:null
        },
        fetchedQbank:currentState.fetchedQbank,
        successMsg:null,
        error:null,
        isFetching:false,
        QbankToDelete:{
          openDialog:false,
          Qbank:null
        },
        AddNewQuestion:{
          showAddQDiv:true,
          Question:currentState.AddNewQuestion.Question,
          OptionsArray:currentState.AddNewQuestion.OptionsArray,
          QuestionAdded:null,
        }
      }


  case 'REQUEST_ADD_NEW_QUESTION':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:true,
        Question:currentState.AddNewQuestion.Question,
        OptionsArray:currentState.AddNewQuestion.OptionsArray,
        isFetching:true,
        QuestionAdded:null,
      }
    }

  case 'SUCCESS_ADD_NEW_QUESTION':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:action.data.message,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:true,
        Question:null,
        OptionsArray:INITIAL_STATE.AddNewQuestion.OptionsArray,
        isFetching:false,
        QuestionAdded:action.data.ques
      },
    }

    case 'FAILED_ADD_NEW_QUESTION':
      return {
        ...currentState,
        expandQb:false,
        UpdateQbank:{
          imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
          openDialog:false,
          QbankToEdit:null
        },
        fetchedQbank:currentState.fetchedQbank,
        successMsg:null,
        error:action.message,
        isFetching:false,
        QbankToDelete:{
          openDialog:false,
          Qbank:null
        },
        AddNewQuestion:{
          showAddQDiv:true,
          Question:currentState.AddNewQuestion.Question,
          OptionsArray:currentState.AddNewQuestion.OptionsArray,
          isFetching:false,
          QuestionAdded:null
        },
        ViewQbQuestions:{
          showViewQDiv:false,
          Questions:null
        }
      }

  case 'REQUEST_FETCH_QB_QUESTIONS':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:true,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:false,
        Question:currentState.AddNewQuestion.Question,
        OptionsArray:currentState.AddNewQuestion.OptionsArray,
        isFetching:false,
        QuestionAdded:null
      },
      ViewQbQuestions:{
        showViewQDiv:true,
        qBid:action.qBid,
        page:action.page,
        Questions:null
      }
    }


case 'SUCCESS_FETCH_QB_QUESTIONS':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:action.data.message,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:false,
        Question:currentState.AddNewQuestion.Question,
        OptionsArray:currentState.AddNewQuestion.OptionsArray,
        isFetching:false,
        QuestionAdded:null
      },
      ViewQbQuestions:{
        showViewQDiv:true,
        qBid:currentState.ViewQbQuestions.qBid,
        page:currentState.ViewQbQuestions.page,
        Questions:action.data.ques
      }
    }

case 'FAILED_FETCH_QB_QUESTIONS':
  return {
    ...currentState,
    expandQb:false,
    UpdateQbank:{
      imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
      openDialog:false,
      QbankToEdit:null
    },
    fetchedQbank:currentState.fetchedQbank,
    successMsg:null,
    error:action.data.message,
    isFetching:false,
    QbankToDelete:{
      openDialog:false,
      Qbank:null
    },
    AddNewQuestion:{
      showAddQDiv:false,
      Question:currentState.AddNewQuestion.Question,
      OptionsArray:currentState.AddNewQuestion.OptionsArray,
      isFetching:false,
      QuestionAdded:null
    },
    ViewQbQuestions:{
      showViewQDiv:false,
      qBid:currentState.ViewQbQuestions.qBid,
      page:currentState.ViewQbQuestions.page,
      Questions:null
    }
  }

  case 'SHOW_DELETE_QB_QUESTION':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:null,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:false,
        Question:null,
        OptionsArray:null,
        isFetching:false,
        QuestionAdded:null
      },
      ViewQbQuestions:{
        showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
        qBid:currentState.ViewQbQuestions.qBid,
        page:currentState.ViewQbQuestions.page,
        Questions:currentState.ViewQbQuestions.Questions
      },
      DeleteQbQuestion:{
        showDeleteQues:true,
        questionToDelete:action.question
      }
    }

case 'CANCEL_DELETE_QB_QUESTION':
  return {
    ...currentState,
    expandQb:false,
    UpdateQbank:{
      imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
      openDialog:false,
      QbankToEdit:null
    },
    fetchedQbank:currentState.fetchedQbank,
    successMsg:null,
    error:null,
    isFetching:false,
    QbankToDelete:{
      openDialog:false,
      Qbank:null
    },
    AddNewQuestion:{
      showAddQDiv:false,
      Question:null,
      OptionsArray:null,
      isFetching:false,
      QuestionAdded:null
    },
    ViewQbQuestions:{
      showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
      qBid:currentState.ViewQbQuestions.qBid,
      page:currentState.ViewQbQuestions.page,
      Questions:currentState.ViewQbQuestions.Questions
    },
    DeleteQbQuestion:{
      showDeleteQues:false,
      questionToDelete:null
    }
  }


case 'REQUEST_DELETE_QB_QUESTION':
  return {
    ...currentState,
    expandQb:false,
    UpdateQbank:{
      imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
      openDialog:false,
      QbankToEdit:null
    },
    fetchedQbank:currentState.fetchedQbank,
    successMsg:null,
    error:null,
    isFetching:true,
    QbankToDelete:{
      openDialog:false,
      Qbank:null
    },
    AddNewQuestion:{
      showAddQDiv:false,
      Question:null,
      OptionsArray:null,
      isFetching:false,
      QuestionAdded:null
    },
    ViewQbQuestions:{
      showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
      qBid:currentState.ViewQbQuestions.qBid,
      page:currentState.ViewQbQuestions.page,
      Questions:currentState.ViewQbQuestions.Questions
    },
    DeleteQbQuestion:{
      showDeleteQues:true,
      questionToDelete:action.question
    }
  }

case 'SUCCESS_DELETE_QB_QUESTION':
  const QuestionsAfterDeleted = currentState.ViewQbQuestions.Questions.filter((item) => {return item._id !== action.data.ques._id})
  return {
    ...currentState,
    expandQb:false,
    UpdateQbank:{
      imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
      openDialog:false,
      QbankToEdit:null
    },
    fetchedQbank:currentState.fetchedQbank,
    successMsg:action.data.message,
    error:null,
    isFetching:false,
    QbankToDelete:{
      openDialog:false,
      Qbank:null
    },
    AddNewQuestion:{
      showAddQDiv:false,
      Question:null,
      OptionsArray:null,
      isFetching:false,
      QuestionAdded:null
    },
    ViewQbQuestions:{
      showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
      qBid:currentState.ViewQbQuestions.qBid,
      page:currentState.ViewQbQuestions.page,
      Questions:QuestionsAfterDeleted
    },
    DeleteQbQuestion:{
      showDeleteQues:false,
      questionToDelete:null
    }
  }

case 'FAILED_DELETE_QB_QUESTION':
    return {
      ...currentState,
      expandQb:false,
      UpdateQbank:{
        imagePreviewUrl:currentState.UpdateQbank.imagePreviewUrl,
        openDialog:false,
        QbankToEdit:null
      },
      fetchedQbank:currentState.fetchedQbank,
      successMsg:null,
      error:action.message,
      isFetching:false,
      QbankToDelete:{
        openDialog:false,
        Qbank:null
      },
      AddNewQuestion:{
        showAddQDiv:false,
        Question:null,
        OptionsArray:null,
        isFetching:false,
        QuestionAdded:null
      },
      ViewQbQuestions:{
        showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
        qBid:currentState.ViewQbQuestions.qBid,
        page:currentState.ViewQbQuestions.page,
        Questions:currentState.ViewQbQuestions.Questions
      },
      DeleteQbQuestion:{
        showDeleteQues:false,
        questionToDelete:null
      }
    }

    default:
      return currentState;

  }

}

export default qBankReducer;
