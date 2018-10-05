export const requestAddCourse = () => {
    return {
        type:'REQUEST_ADD_COURSE'
    }
}

export const requestAddCourseSuccess = (response) => {
    return {
        type:'REQUEST_ADD_COURSE_SUCCESS',
        response
    }
}

export const requestAddCourseFailed = (response) => {
    return {
        type:'REQUEST_ADD_COURSE_FAILED',
        response
    }
}

export const requestGetCourses = () => {
    return {
        type:'REQUEST_GET_COURSES'
    }
}

export const requestGetCoursesSuccess = (response) => {
    return {
        type:'REQUEST_GET_COURSES_SUCCESS',
        response,
    }
}

export const requestGetCoursesFailed = (response) => {
    return {
        type:'REQUEST_GET_COURSES_FAILED',
        response,
    }
}