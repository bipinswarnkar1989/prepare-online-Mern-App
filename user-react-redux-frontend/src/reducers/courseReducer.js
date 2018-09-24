const INITIAL_STATE = {
    loadingCourse:false,
    course:null,
    courses:null,
    courseError:null,
    courseSuccess:null
};

const courseReducer = (currentState = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'REQUEST_ADD_COURSE':
            return {
                ...currentState,
                loadingCourse:true,
            }
        case 'REQUEST_ADD_COURSE_SUCCESS':
            var resp = action.response;
            return {
                ...currentState,
                loadingCourse:false,
                course:resp.course,
                courseError:null,
                courseSuccess:resp.message
            }
        case 'REQUEST_ADD_COURSE_SUCCESS':
            var resp = action.response;
            return {
                ...currentState,
                loadingCourse:false,
                course:null,
                courseError:resp.message,
                courseSuccess:null
            }
        default:
            return currentState;
    }
}

export default courseReducer;

