import request from '@/utils/request'
// 平台车队账户
// 车队账户统计list
export const getCarAccountList = (query) => {
  return request({
    url: '/account/getAllAccount',
    method: 'get',
    params: query
  })
}

// 保存充值申请
export const addCarAccountList = (data) => {
  return request({
    url: '/recharge/recharge',
    method: 'post',
    data,
  })
}
