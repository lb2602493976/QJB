import request from '@/utils/request'

// 查询

export const searchApi = (query) => {
  return request({
    url: '/gun/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createApi = (data) => {
  return request({
    url: '/gun/add',
    method: 'post',
    data,
  })
}

//修改
export const updateApi = (data) => {
  return request({
    url: '/gun/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteApi = (id) => {
  return request({
    url: '/gun/delete',
    method: 'post',
    data:{ id },
  })
}



