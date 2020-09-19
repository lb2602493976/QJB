import request from '@/utils/request'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { getTenant } from '@/utils/tenant'
// 查询车辆

export const searchCar = (query) => {
  return request({
    url: '/tenantmsg/selCar',
    method: 'get',
    params: query,
  })
}

//添加车辆
export const createCar = (data) => {
  return request({
    url: '/tenantmsg/addCar',
    method: 'post',
    data,
  })
}

//修改车辆
export const updateCar = (data) => {
  return request({
    url: '/tenantmsg/upCar',
    method: 'post',
    data,
  })
}

//删除车辆
export const deleteCar = truckinfoId => {
  return request({
    url: '/tenantmsg/delCar',
    method: 'post',
    data:{ truckinfoId },
  })
}

//获取所有车辆
export const getAllCars = () => {
  return request({
    url:'/driver/selOkCar',
    method:'get',
  })
} 

//导出车队车辆模板
export const exportTemp = () => {
  return axios({
    url:process.env.BASE_API + '/tenantmsg/export',
    method:'post',
    responseType:'blob',
    headers:{
      // 'Authorization':'Bearer ' + getToken(),
      // 'TENANT_ID':getTenant(),
    },
  })
}

//添加
export const uploadApi = ({url,deptId},opts) => {
  return request({
      url: '/tenantmsg/excelCar',
      method: 'post',
      data:{ fileName:url,deptId },
      ...opts,
  })
}


