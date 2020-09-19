
import request from '@/utils/request'

// 查询散户列表
export const fetchRetailInvestorList = (query) => {
  return request({
    url: '/tenantmsg/selCustomer',
    method: 'get',
    params: query
  })
}

//查询散户明细
export const fetchRetailInvestorDetails = id => {
  return request({
    url: `/tenantmsg/selCustomerDetail/${id}`,
    method: 'get',
  })
}

