import request from '@/utils/request'

// 查询
export const getFireFightList = (query) => {
  return request({
    url: '/fireFight/getList',
    method: 'get',
    params: query
  })
}

// 保存
export const addFireFight = (data) => {
  return request({
    url: '/fireFight/add',
    method: 'post',
    data,
  })
}
// 修改
export const updateFireFight = (data) => {
  return request({
    url: '/fireFight/update',
    method: 'post',
    data,
  })
}
// 删除
export const deleteFireFight = (data) => {
  return request({
    url: '/fireFight/delete',
    method: 'post',
    data,
  })
}
