import request from '@/utils/request'

// 查询防火巡查记录
export const getFireList = (query) => {
  return request({
    url: '/fire/getList',
    method: 'get',
    params: query
  })
}

// 充值流水list
export const getRechargeFlowList = (query) => {
  return request({
    url: '/recharge/getList',
    method: 'get',
    params: query
  })
}

// 获取车队账户
export const getAllTenantAccount = (query) => {
  return request({
    url: '/account/getAllTenantAccount',
    method: 'get',
    params: query
  })
}
// 保存
export const addFire = (data) => {
  return request({
    url: '/fire/add',
    method: 'post',
    data,
  })
}
// 修改
export const updateFire = (data) => {
  return request({
    url: '/fire/update',
    method: 'post',
    data,
  })
}
// 删除
export const deleteFire = (data) => {
  return request({
    url: '/fire/delete',
    method: 'post',
    data,
  })
}
