import request from '@/utils/request'

// 查询

export const searchApi = (query) => {
  return request({
    url: '/third/getList',
    method: 'get',
    params: query,
  })
}

//添加
export const createApi = (data) => {
  return request({
    url: '/third/add',
    method: 'post',
    data,
  })
}

//修改
export const updateApi = (data) => {
  return request({
    url: '/third/update',
    method: 'post',
    data,
  })
}

//删除
export const deleteApi = (id) => {
  return request({
    url: '/third/delete',
    method: 'post',
    data:{ id },
  })
}

//设置优惠
export function getTenantHistory(id) {
    return request({
      url: `/third/findPreferential/${id}`,
      method: 'get',
    })  
}


