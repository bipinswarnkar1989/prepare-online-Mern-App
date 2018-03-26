 // ./user-react-redux-frontend/src/reducers/qBankReducer.js
 //import Pagination from '../middlewares/pagination.jsx';

 const INITIAL_STATE = {
   qBanks:null,
   qBanksToDelete:[],
   showMultipleQbDelete:false,
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
   },
   EditQbQuestion:{
     showEditQues:false,
     questionToEdit:null,
   },
   latestQbanks:{
     Qbanks:null,
     isFetching:false,
     successMsg:null,
     error:null
   },
   qBanksPagination:{
     maxButtons: 5,
     qBanksCount:null,
     currentPage:null,
     buttonsRangeArray:null,
     totalNumberOfPagination:null
   },
   QbSearch:{
     Qbanks:null,
   },
   userBookMarks:{
     isFetching:false,
     qBanks:null
   },
   esSearchResult:null
 }
 
 const qBankReducer = (currentState = INITIAL_STATE, action) => {
   switch (action.type) {
     case 'REQUEST_FETCH_QBANKS':
        return {
          ...currentState, isFetching:true
        }
 
     case 'SUCCESS_FETCH_QBANKS':
     let count = action.paginationData.qBanksCount;
     let maxButtons = 5;
     let page = action.paginationData.currentPage;
     let limit = action.paginationData.limit;
      //const pgObject = new Pagination();
      //let pgState = pgObject.pagination(count,maxButtons,page,limit);
      let noOfQuestions = action.data.noOfQuestions;
        return {
          ...currentState, 
          isFetching:false,
          qBanks:action.data.qb,
          successMsg:action.data.message,
          qBanksToDelete:[],
          qBanksPagination:{
            maxButtons: 5,
            qBanksCount:action.data.count,
            currentPage:pgState.currentPage,
            buttonsRangeArray:pgState.buttonsRangeArray,
            totalNumberOfPagination:pgState.totalNumberOfPagination
          }
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
    const fetchedQbank = {
     noOfQuestions:action.data.noOfQuestions,
     ...action.data.qb,
    }
       return {
         ...currentState,
         isFetching:false,
         fetchedQbank:fetchedQbank,
         successMsg:action.data.message,
         error:null,
         expandQb:true,
         ViewQbQuestions:{
           showViewQDiv:false,
           Questions:null
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
 
   
   case 'ADD_ANSWER_IN_OPTION':console.log(action.op)
       currentState.AddNewQuestion.OptionsArray = currentState.AddNewQuestion.OptionsArray.map((op) => {
         if(op.number === action.op){
           let optAns = {answer:true}
           return {...op, ...optAns}
         }
         let optAns = {answer:false}
         return { ...op, ...optAns };
       });
      
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
 
   case 'SHOW_EDIT_QB_QUESTION':
   action.question.options.map((opt) => {
     opt.mouseOver = false;
     return opt;
   })
     return {
       ...currentState,
       successMsg:null,
       error:null,
       EditQbQuestion:{
         showEditQues:true,
         questionToEdit:Object.assign({}, action.question),
       },
       ViewQbQuestions:{
         showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
         qBid:currentState.ViewQbQuestions.qBid,
         page:currentState.ViewQbQuestions.page,
         Questions:currentState.ViewQbQuestions.Questions
       },
     }
 
 case 'CANCEL_EDIT_QB_QUESTION':
   return {
     ...currentState,
     EditQbQuestion:{
       showEditQues:false,
       questionToEdit:null,
     },
     ViewQbQuestions:{
       showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
       qBid:currentState.ViewQbQuestions.qBid,
       page:currentState.ViewQbQuestions.page,
       Questions:currentState.ViewQbQuestions.Questions
     },
   }
 
   case 'UPDATE_EDIT_QUESTION_STATE':
       if(action.data.fieldname === 'question'){
           currentState.EditQbQuestion.questionToEdit.question = action.data.fieldvalue;
       }
       else{
         currentState.EditQbQuestion.questionToEdit.options = currentState.EditQbQuestion.questionToEdit.options.map((op) => {
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
           showAddQDiv:false,
           Question:null,
           OptionsArray:null,
           QuestionAdded:null,
         },
         EditQbQuestion:{
           showEditQues:true,
           questionToEdit:currentState.EditQbQuestion.questionToEdit,
         },
         ViewQbQuestions:{
           showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
           qBid:currentState.ViewQbQuestions.qBid,
           page:currentState.ViewQbQuestions.page,
           Questions:currentState.ViewQbQuestions.Questions
         },
       }
 
   case 'ADD_NEW_OPTION_IN_EDIT_QUESTION':
     currentState.EditQbQuestion.questionToEdit.options = [
       ...currentState.EditQbQuestion.questionToEdit.options, action.option
     ];
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
          showAddQDiv:false,
          Question:null,
          OptionsArray:null
        },
        EditQbQuestion:{
          showEditQues:true,
          questionToEdit:currentState.EditQbQuestion.questionToEdit,
        }
      }
 
 case 'REQUEST_UPDATE_QB_QUESTION':
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
       isFetching:true,
       QbankToDelete:{
         openDialog:false,
         Qbank:null
       },
       AddNewQuestion:{
         showAddQDiv:false,
         Question:null,
         OptionsArray:null
       },
       EditQbQuestion:{
         showEditQues:true,
         questionToEdit:currentState.EditQbQuestion.questionToEdit,
       }
     }
 
 case 'SUCCESS_UPDATE_QB_QUESTION':
    currentState.ViewQbQuestions.Questions = currentState.ViewQbQuestions.Questions.map((q) => {
      if(q._id === action.data.ques._id){
        return {...q,...action.data.ques}
      }
      return q;
    })
     return{
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
         OptionsArray:null
       },
       EditQbQuestion:{
         showEditQues:false,
         questionToEdit:null,
       },
       ViewQbQuestions:{
         showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
         qBid:currentState.ViewQbQuestions.qBid,
         page:currentState.ViewQbQuestions.page,
         Questions:currentState.ViewQbQuestions.Questions
       },
     }
 
 case 'FAILED_UPDATE_QB_QUESTION':
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
       error:action.message,
       isFetching:false,
       QbankToDelete:{
         openDialog:false,
         Qbank:null
       },
       AddNewQuestion:{
         showAddQDiv:false,
         Question:null,
         OptionsArray:null
       },
       EditQbQuestion:{
         showEditQues:false,
         questionToEdit:null,
       },
       ViewQbQuestions:{
         showViewQDiv:currentState.ViewQbQuestions.showViewQDiv,
         qBid:currentState.ViewQbQuestions.qBid,
         page:currentState.ViewQbQuestions.page,
         Questions:currentState.ViewQbQuestions.Questions
       },
     }
 
 case 'EDIT_QUESTION_OPTION_MOUSE_OVER':
 currentState.EditQbQuestion.questionToEdit.options = currentState.EditQbQuestion.questionToEdit.options.map((opt) => {
   if(opt.number === action.data.option.number){
     return {...opt, ...action.data.option};
   }
 
   return opt;
 })
 
   return {
     ...currentState,
     EditQbQuestion:{
       showEditQues:true,
       questionToEdit:currentState.EditQbQuestion.questionToEdit,
     }
   }
 
 case 'REMOVE_OPTION_IN_EDIT_QUESTION':
   currentState.EditQbQuestion.questionToEdit.options = currentState.EditQbQuestion.questionToEdit.options.filter((item) => {
      return item.number !== action.option.number;
    })
    currentState.EditQbQuestion.questionToEdit.options = currentState.EditQbQuestion.questionToEdit.options.map((item,i) => {
       item.number = i+1;
       return item;
     })
    return {
      ...currentState,
      EditQbQuestion:{
        showEditQues:true,
        questionToEdit:currentState.EditQbQuestion.questionToEdit,
      }
    }
 
 case 'REQUEST_FETCH_LATEST_QBANKS':
   return {
     ...currentState,
     latestQbanks:{
       Qbanks:null,
       isFetching:true,
       successMsg:null,
       error:null
     }
   }
 
 case 'FAILED_FETCH_LATEST_QBANKS':
 return {
   ...currentState,
   latestQbanks:{
     Qbanks:null,
     isFetching:false,
     successMsg:null,
     error:action.message
   }
 }
 
 case 'SUCCESS_FETCH_LATEST_QBANKS':
 return {
   ...currentState,
   latestQbanks:{
     Qbanks:action.data.qb,
     qBanksToDelete:[],
     isFetching:false,
     successMsg:action.data.message,
     error:null
   }
 }
 
 case 'REQUEST_SEARCH_QBANKS':
   return {
     ...currentState,
     isFetching:true,
     successMsg:null,
     error:null,
     QbSearch:{
       Qbanks:null,
     }
   }
 
 case 'SUCCESS_SEARCH_QBANKS':
   return {
     ...currentState,
     isFetching:false,
     successMsg:action.data.message,
     error:null,
     QbSearch:{
       Qbanks:action.data.qb
     }
   }
 
 case 'FAILED_SEARCH_QBANKS':
   return {
     ...currentState,
     isFetching:false,
     successMsg:null,
     error:action.message,
     QbSearch:{
       Qbanks:null
     }
   }
 
 case 'ADD_REMOVE_QBANKS_TO_DELETE':
    const qb = action.qb._id;
     if (currentState.qBanksToDelete.length > 0) {
         const found = currentState.qBanksToDelete.find(function(element){
           return element === qb;
         });
         if (found !== undefined) {
            currentState.qBanksToDelete = currentState.qBanksToDelete.filter((item) => item !== qb);
         }else if (found === undefined) {
           currentState.qBanksToDelete = [...currentState.qBanksToDelete, qb];
         }
     }
     else{
        currentState.qBanksToDelete = [...currentState.qBanksToDelete, qb];
     }
    return {
      ...currentState,
      qBanks:currentState.qBanks,
      qBanksToDelete:currentState.qBanksToDelete,
      successMsg:null,
      error:null
    }
 
 case 'SHOW_MULTIPLE_DELETE_QB':
   return {
     ...currentState,
     qBanks:currentState.qBanks,
     qBanksToDelete:currentState.qBanksToDelete,
     showMultipleQbDelete:action.resp,
     successMsg:null,
     error:null
   }
 
 case 'REQUEST_DELETE_MULTIPLE_QB':
    return {
      ...currentState,
      qBanks:currentState.qBanks,
      qBanksToDelete:currentState.qBanksToDelete,
      showMultipleQbDelete:currentState.showMultipleQbDelete,
      isFetching:true,
      successMsg:null,
      error:null
    }
 
  case 'SUCCESS_DELETE_MULTIPLE_QB':
     let qBanksToDelete = currentState.qBanksToDelete
     const newQbanks = currentState.qBanks.filter((item) => {
        return qBanksToDelete.indexOf(item._id) === -1;
     })
     console.log(action.data)
     return {
       ...currentState,
       qBanks:newQbanks,
       qBanksToDelete:null,
       showMultipleQbDelete:false,
       isFetching:false,
       successMsg:action.data.message,
       error:null
     }
 
   case 'REQUEST_DELETE_MULTIPLE_QB':
      return {
        ...currentState,
        qBanks:currentState.qBanks,
        qBanksToDelete:currentState.qBanksToDelete,
        showMultipleQbDelete:currentState.showMultipleQbDelete,
        isFetching:false,
        successMsg:null,
        error:action.message
      }
 
  case 'REQUEST_BOOKMARK_QB':
     return {
       ...currentState,
       userBookMarks:{
         isFetching:true,
         qBanks:currentState.userBookMarks.qBanks
       },
       successMsg:null,
       error:null
     }
 
 case 'SUCCESS_BOOKMARK_QB':
 let qbB = action.data.bm.qBank;
 const newBookMarks = [...currentState.userBookMarks.qBanks, qbB];
    return {
      ...currentState,
      userBookMarks:{
        isFetching:false,
        qBanks:newBookMarks
      },
      successMsg:action.data.message,
      error:null
    }
 
   case 'FAILED_BOOKMARK_QB':
     return {
       ...currentState,
       userBookMarks:{
         isFetching:false,
         qBanks:null
       },
       successMsg:null,
       error:action.message
     }
 
 case 'REQUEST_GET_BOOKMARKS':
    return {
      ...currentState,
      userBookMarks:{
        isFetching:true,
        qBanks:currentState.userBookMarks.qBanks
      },
      successMsg:null,
      error:null
    }
 
 case 'SUCCESS_GET_BOOKMARKS':
   const bookMarks = action.data.qb.map((item) => {
     return item.qBank;
   })
   return {
     ...currentState,
     userBookMarks:{
       isFetching:false,
       qBanks:bookMarks
     },
     successMsg:action.data.message,
     error:null
   }
 
   case 'FAILED_GET_BOOKMARKS':
      return {
        ...currentState,
        userBookMarks:{
          isFetching:false,
          qBanks:currentState.userBookMarks.qBanks
        },
        successMsg:null,
        error:action.message
      }
 
   case 'REQUEST_RM_BOOKMARK_QB':
     return {
       ...currentState,
       userBookMarks:{
         isFetching:true,
         qBanks:currentState.userBookMarks.qBanks
       },
       successMsg:null,
       error:null
     }
 
   case 'SUCCESS_RM_BOOKMARK_QB':
   const newQbBookmarks = currentState.userBookMarks.qBanks.filter((item) => {
     return item !== action.data.qb.qBank;
   })
     return {
       ...currentState,
       userBookMarks:{
         isFetching:false,
         qBanks:newQbBookmarks
       },
       successMsg:action.data.message,
       error:null
     }
 
     case 'FAILED_REMOVE_BOOKMARK_QB':
       return {
         ...currentState,
         userBookMarks:{
           isFetching:false,
           qBanks:currentState.userBookMarks.qBanks
         },
         successMsg:null,
         error:action.message
       }
 
  case 'REQUEST_ES_SEARCH':
     return {
       ...currentState,
       isFetching:true,
       successMsg:null,
       error:null,
       esSearchResult:null
     }
 
   case 'SUCCESS_ES_SEARCH':
   return {
     ...currentState,
     isFetching:false,
     successMsg:null,
     error:null,
     esSearchResult:action.data
   }
 
   case 'FAILED_ES_SEARCH':
   return {
     ...currentState,
     isFetching:false,
     successMsg:null,
     error:action.data.message,
     esSearchResult:null
   }
 
 
 
     default:
       return currentState;
 
   }
 
 }
 
 export default qBankReducer;
 