import request from '@/utils/request'

// 查询司机

export const searchDriver = (query) => {
  return request({
    url: '/driver/selTd',
    method: 'get',
    params: query,
  })
}

//添加司机
export const createDriver = (data) => {
  return request({
    url: '/driver/addDriver',
    method: 'post',
    data,
  })
}

//修改司机
export const updateDriver = (data) => {
  return request({
    url: '/driver/upDriver',
    method: 'post',
    data,
  })
}

//删除司机
export const deleteDriver = id => {
  return request({
    url: '/driver/delDriver',
    method: 'post',
    data:{ id },
  })
}



