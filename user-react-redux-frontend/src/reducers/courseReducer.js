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
        case 'REQUEST_ADD_COURSE_FAILED':
            var resp = action.response;
            return {
                ...currentState,
                loadingCourse:false,
                course:null,
                courseError:resp.message,
                courseSuccess:null
            }
        case 'REQUEST_GET_COURSES':
            return {
                ...currentState,
                loadingCourse:true,
            }
        case 'REQUEST_GET_COURSES_SUCCESS':
            return {
                ...currentState,
                courses:action.response.courses,
                loadingCourse:false,
                courseError:null,
                courseSuccess:action.response.message
            }
        case 'REQUEST_GET_COURSES_FAILED':
            return {
                ...currentState,
                courses:[],
                loadingCourse:false,
                courseError:action.response.message,
                courseSuccess:null
            }
        default:
            return currentState;
    }
}

export default courseReducer;

