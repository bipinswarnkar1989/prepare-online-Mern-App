// ./user-react-redux-frontend/src/reducers/videoReducer.js
const INITIAL_STATE = {
    isLoading:false,
    error:null,
    successMsg:null,
    videos:[],
    video:null
}

const videoReducer = ( currentState = INITIAL_STATE, action ) => {
    switch (action.type) {
        case 'REQUEST_UPLOAD_VIDEO':
           return {
               ...currentState,
               isLoading:true,
               error:null,
               successMsg:null,
           }
            
        case 'SUCCESS_UPLOAD_VIDEO':
           return {
               ...currentState,
               isLoading:false,
               video:action.response.video.videoAddress,
               successMsg:action.response.message,
               error:null
           } 
           
        case 'FAILED_UPLOAD_VIDEO':
           return {
            ...currentState,
            isLoading:false,
            video:null,
            successMsg:null,
            error:action.response.message
         }
         
     
    
        default:
            return currentState;
    }
}

export default videoReducer;