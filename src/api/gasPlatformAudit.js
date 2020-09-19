import request from '@/utils/request'
// 气站端充值审核
// 获取列表等待审核的车队充值记录
export const getInAccountList = (query) => {
  return request({
    url: '/recharge/getListVerifyFlatGas',
    method: 'get',
    params: query
  })
}

// 车队还款记录
export const getHkAccountList = (query) => {
  return request({
    url: '/repayment/getListVerifyFlatGas',
    method: 'get',
    params: query
  })
}
// 获取详情
export const getCarAccountDetail = (query) => {
  return request({
    url: '/recharge/getDetailFlat',
    method: 'get',
    params: query
  })
}

// 保存充值申请
export const addCarAccountList = (data) => {
  return request({
    url: '/recharge/examineGas',
    method: 'post',
    data,
  })
}
// 保存还款申请
export const addHkCarAccountList = (data) => {
  return request({
    url: '/repayment/examineGas',
    method: 'post',
    data,
  })
}
