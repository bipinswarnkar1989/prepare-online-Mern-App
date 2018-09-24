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