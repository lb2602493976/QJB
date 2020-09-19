import request from '@/utils/request'

// 租户模块

export const fetchList = (query) => {
  return request({
    url: '/tenantmsg/selTenant',
    method: 'get',
    params: query
  })
}

// 更新租户
export const updateTenant = (data) => {
  return request({
    url: '/tenant',
    method: 'put',
    data: data
  })
}
// 删除租户
export const deleteTenant = (id) => {
  return request({
    url: '/tenant/' + id,
    method: 'delete'
  })
}

// 新增用户
export function addTenant(data) {
  return request({
    url: '/tenant/add',
    method: 'post',
    data: data
  })
}

// 设置租户
export function settingTenant(id) {
  return request({
    url: '/tenant/setting/' + id,
    method: 'post'
  })
}

// 获取租户集合
export function getTenantList(data) {
  return request({
    url: '/tenant/list',
    method: 'get'
  })
}

// 设置优惠
export function setTenantCoupon(data) {
  return request({
    url: '/tenantmsg/upPreferentialVal',
    method: 'post',
    data
  })
}
// 查询优惠历史
export function getTenantHistory(associatedId) {
  return request({
    url: `/tenantmsg/findPreferentialLs/${associatedId}`,
    method: 'get'
  })
}

// 根据域名查询租户信息
export function getTenantByDomainName(domainName) {
  return request({
    url: `/tenantmsg/selDomainName/${domainName}`,
    method: 'get'
  })
}

// 查找租户
export function getTenantById(tenantId) {
  return request({
    url: `/tenantmsg/findFleet/${tenantId}`,
    method: 'get'
  })
}

// 获取可见所有租户列表
export function getAllTenants({ tenantId, tenantType }) {
  return request({
    url: `/tenantmsg/selectMotorCade`,
    method: 'post',
    data: { tenantId, tenantType }
  })
}

// 添加合作伙伴关系
export function addAssociated(params) {
  return request({
    url: `/tenantmsg/addAssociatedId`,
    method: 'post',
    data: params
  })
}
// 解除合作伙伴关系
export function delAssociated(associatedId) {
  return request({
    url: `/tenantmsg/delAssociatedId/${associatedId}`,
    method: 'get'
  })
}
// 生成邀请码
export function generateInviteCode(tenantId) {
  return request({
    url: `/tenantmsg/inviteCode/${tenantId}`,
    method: 'get'
  })
}

//审核完发送通知
export function sendMsgAtFinish(data) {
  return request({
    url: `/tenantmsg/auditResult`,
    method: 'post',
    data,
  })
}

//查询气站挂牌价修改历史
export function gasPriceHistory(tenantId) {
  return request({
    url: `/tenantmsg/selGasPricesList/${tenantId} `,
    method: 'get',
  })
}

