import request from '@/utils/request'
import axios from "axios";
import { getToken } from '@/utils/auth'
import { getTenant } from '@/utils/tenant'

// 平台账户统计list
export const getCarAccountList = (query) => {
  return request({
    url: '/account/getAllFlatAccountFlat',
    method: 'get',
    params: query
  })
}

// 获取消费card
export const getConsumptionCard = (query) => {
  return request({
    url: '/account/getFlatAccConsumeInfoFlat',
    method: 'get',
    params: query
  })
}

// 获取充值card
export const getRechargeCard = (query) => {
  return request({
    url: '/account/getFlatAccountInfoFlat',
    method: 'get',
    params: query
  })
}

// 获取还款card
export const getHkCard = (query) => {
  return request({
    url: '/account/getFlatAccRepayInfoFlat',
    method: 'get',
    params: query
  })
}

// 获取消费list
export const getConsumptionList = (query) => {
  return request({
    url: '/sysOrder/getFlatOrderListFlat',
    method: 'get',
    params: query
  })
}

// 获取充值list
export const getRechargeList = (query) => {
  return request({
    url: '/recharge/getFlatListFlat',
    method: 'get',
    params: query
  })
}

// 获取还款list
export const getHkList = (query) => {
  return request({
    url: '/repayment/getFlatListFlat',
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

// 还款申请
export const addHKAccountList = (data) => {
  return request({
    url: '/repayment/repayment',
    method: 'post',
    data,
  })
}

//导出平台账户统计
export const exportTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/account/export/exportAllFlatAccountFlat?tenantId='+data.tenantId+'&name='+data.name,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
  })
}

//导出充值流水
export const exportInTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/recharge/export/exFlatFleAccRechargeFlat?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&status='+data.status,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
  })
}

//导出消费
export const exportOutTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/sysOrder/export/exportFlatOrdersFleetFlat?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
  })
}

//导出还款
export const exportHkTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/repayment/export/exFlatRepaymentRecordsFlat?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&status='+data.status,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
  })
}
