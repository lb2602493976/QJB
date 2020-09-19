import request from '@/utils/request'

// 查询安全巡查记录
export const getSafetyList = (query) => {
  return request({
    url: '/safety/getList',
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
export const addSafety = (data) => {
  return request({
    url: '/safety/add',
    method: 'post',
    data,
  })
}
// 修改
export const updateSafety = (data) => {
  return request({
    url: '/safety/update',
    method: 'post',
    data,
  })
}
// 删除
export const deleteSafety = (data) => {
  return request({
    url: '/safety/delete',
    method: 'post',
    data,
  })
}
