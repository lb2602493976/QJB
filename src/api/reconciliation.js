import request from '@/utils/request'

// 查询

export const searchApi = (query) => {
  return request({
    url: '/reconciliation/getList',
    method: 'get',
    params: query,
  })
}

//添加/上传
export const uploadApi = (url,opts) => {
    return request({
        url: '/reconciliation/addCheckFile',
        method: 'post',
        data:{ fileName:url },
        ...opts,
    })
}

//删除
export const deleteApi = (fileId) => {
    return request({
        url: `/reconciliation/delFile/${fileId} `,
        method: 'get',
    })
}

//进行对账
export const doApi = (fileId) => {
  return request({
    url: `/reconciliation/accountChecking/${fileId} `,
    method: 'get',
  })
}

//获取对账结果详情
export const getResApi = (fileId) => {
    return request({
      url:`/reconciliation/getFile/${fileId}`,
      method:'get',
    })
}

//处理对账
export const handleResApi = data => {
  return request({
    url:`/reconciliation/upProcessingResults`,
    method:'post',
    data,
  })
}




