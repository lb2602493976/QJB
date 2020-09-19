import request from '@/utils/request'

// 查询 GasolinePrice
export const getGasolinePriceList = (query) => {
  return request({
    url: '/gasPrices/getList',
    method: 'get',
    params: query
  })
}

// 获取气站信息
export const getGasoline = (query) => {
  return request({
    url: '/gasPrices/getGasPrices',
    method: 'get',
    params: query
  })
}

// 保存
export const addGasolinePrice = (data) => {
  return request({
    url: '/gasPrices/add',
    method: 'post',
    data,
  })
}
// 修改
export const updateGasolinePrice = (data) => {
  return request({
    url: '/tankUnloading/update',
    method: 'post',
    data,
  })
}
// 删除
export const deleteGasolinePrice = (data) => {
  return request({
    url: '/tankUnloading/delete',
    method: 'post',
    data,
  })
}
