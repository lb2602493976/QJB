import request from '@/utils/request'

// 查询
export const getTankUnLoadingList = (query) => {
  return request({
    url: '/tankUnloading/getList',
    method: 'get',
    params: query
  })
}

// 保存
export const addTankUnLoading = (data) => {
  return request({
    url: '/tankUnloading/add',
    method: 'post',
    data,
  })
}
// 修改
export const updateTankUnLoading = (data) => {
  return request({
    url: '/tankUnloading/update',
    method: 'post',
    data,
  })
}
// 删除
export const deleteTankUnLoading = (data) => {
  return request({
    url: '/tankUnloading/delete',
    method: 'post',
    data,
  })
}
