import request from '@/utils/request'

// 查询

export const searchRecord = (query) => {
  return request({
    url: '/liquid/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createRecord = (data) => {
  return request({
    url: '/liquid/add',
    method: 'post',
    data,
  })
}

//修改
export const updateRecord = (data) => {
  return request({
    url: '/liquid/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteRecord = (id) => {
  return request({
    url: '/liquid/delete',
    method: 'post',
    data:{ id },
  })
}



