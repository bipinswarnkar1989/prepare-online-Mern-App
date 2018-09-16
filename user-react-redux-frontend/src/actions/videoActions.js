export const requestUploadVideo = () => {
    return {
        type:'REQUEST_UPLOAD_VIDEO',
    }
}

export const successUploadVideo = (response) => {
    return {
        type:'SUCCESS_UPLOAD_VIDEO',
        response
    }
}

export const failedUploadVideo = (response) => {
    return {
        type:'FAILED_UPLOAD_VIDEO',
        response
    }
}

