import request from '@/utils/request'

// 获取当前登陆人可充值的气卡
export const getAppointCurrentList = (query) => {
  return request({
    url: '/cardmsg/getAppointCurrentList',
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
