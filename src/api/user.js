import request from '@/utils/request'

// 新增用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

// 获取用户列表
export function getUserList(parms) {
  return request({
    url: '/user',
    method: 'get',
    params: parms
  })
}

// 编辑用户
export function editUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// 编辑用户(个人中心)
export function editUserBySelf(data) {
  return request({
    url: '/tenantmsg/upUserInfo',
    method: 'post',
    data: data
  })
}

// 重置密码
export function restPass(id) {
  return request({
    url: '/user/' + id,
    method: 'put'
  })
}

// 删除用户
export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

// 获取用户个人信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 修改密码
export function updatePass(parms) {
  return request({
    url: '/user/updatePass',
    method: 'put',
    params: parms
  })
}

// 发送短信验证码
export function sendSms(contactsTel) {
  return request({
    url: `/tenantmsg/findVerificationCode`,
    method: 'post',
    data:{contactsTel:String(contactsTel) },
  })
}

// 绑定用户
export function bindUser(data) {
  return request({
    url: '/bind',
    method: 'post',
    data: data
  })
}
// 绑定用户
export function registerUser(data) {
  return request({
    url: '/register',
    method: 'post',
    data: data
  })
}

