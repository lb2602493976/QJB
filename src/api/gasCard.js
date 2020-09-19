import request from '@/utils/request'

// 查询

export const searchApi = (query) => {
  return request({
    url: '/cardmsg/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createApi = (data) => {
  return request({
    url: '/cardmsg/add',
    method: 'post',
    data,
  })
}

//修改
export const updateApi = (data) => {
  return request({
    url: '/cardmsg/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteApi = (id) => {
  return request({
    url: '/cardmsg/delete',
    method: 'post',
    data:{ id },
  })
}



