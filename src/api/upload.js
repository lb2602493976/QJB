import request from 'axios'

//上传文件
export const uploadFile = file => {
    let data = new FormData()
    data.append('file',file)
    return request({
        url: `${process.env.BASE_API}/upload/uploadPic`,
        method: 'post',
        data,
        headers:{
            'Content-Type':'multipart/form-data',
        },
    })
}

//上传excel
export const uploadExcelFile = (file,opts) => {
    let data = new FormData()
    data.append('file',file)
    return request({
        url: `${process.env.BASE_API}/upload/uploadFile`,
        method: 'post',
        data,
        headers:{
            'Content-Type':'multipart/form-data',
        },
        ...opts,
    })
}


