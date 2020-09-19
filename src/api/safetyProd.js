import request from '@/utils/request'

// 查询

export const searchRecord = (query) => {
  return request({
    url: '/production/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createRecord = (data) => {
  return request({
    url: '/production/add',
    method: 'post',
    data,
  })
}

//修改
export const updateRecord = (data) => {
  return request({
    url: '/production/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteRecord = (id) => {
  return request({
    url: '/production/delete',
    method: 'post',
    data:{ id },
  })
}



