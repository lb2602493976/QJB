import request from '@/utils/request'

// 查询

export const searchRecord = (query) => {
  return request({
    url: '/equipment/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createRecord = (data) => {
  return request({
    url: '/equipment/add',
    method: 'post',
    data,
  })
}

//修改
export const updateRecord = (data) => {
  return request({
    url: '/equipment/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteRecord = (id) => {
  return request({
    url: '/equipment/delete',
    method: 'post',
    data:{ id },
  })
}



