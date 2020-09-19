import request from '@/utils/request'
import axios from "axios";
import { getToken } from '@/utils/auth'
import { getTenant } from '@/utils/tenant'

// 获取充值list
export const getRechargeList = (query) => {
  return request({
    url: '/recharge/getListsGas',
    method: 'get',
    params: query
  })
}
// 获取充值card
export const getRechargeCard = (query) => {
  return request({
    url: '/recharge/getRechargeInfoGas',
    method: 'get',
    params: query
  })
}

//导出车队账户统计
export const exportTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/recharge/export/exRechargeRecordsGas?tenantId='+data.tenantId+'&accountType='+data.accountType+'&startDate='+data.startDate+'&endDate='+data.endDate,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
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



//导出充值流水
export const exportInTemp = (data) => {
  return axios({
    url:process.env.BASE_API + '/recharge/export/exFleAccRecharge?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&status='+data.status,
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
    url:process.env.BASE_API + '/sysOrder/export/exportOrdersFleet?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate,
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
    url:process.env.BASE_API + '/recharge/export/exFleAccRecharge?tenantId='+data.tenantId+'&orgId='+data.orgId+'&startDate='+data.startDate+'&endDate='+data.endDate+'&status='+data.status,
    // url:process.env.BASE_API + '/account/export/exportAllAccount',
    method:'get',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      'TENANT_ID':getTenant(),
    },
  })
}
