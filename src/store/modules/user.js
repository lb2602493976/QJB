import { loginByUsername, logout, getUserInfo, loginByUserPhone } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { removeTenant } from '@/utils/tenant'
import Vue from 'vue'
const user = {
  state: {
    status: '',
    code: '',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: [],
    setting: {
      articlePlatform: []
    },
    tenantId:'',
    tenantType:'',
    userId:'',
  },

  mutations: {
    SET_CODE: (state, code) => {
      Vue.set(state,'code',code)
    },
    SET_TOKEN: (state, token) => {
      Vue.set(state,'token',token)
    },
    SET_SETTING: (state, setting) => {
      Vue.set(state,'setting',setting)
    },
    SET_STATUS: (state, status) => {
      Vue.set(state,'status',status)   
    },
    SET_NAME: (state, name) => {
      Vue.set(state,'name',name)
    },
    SET_AVATAR: (state, avatar) => {
      Vue.set(state,'avatar',avatar)
    },
    SET_ROLES: (state, roles) => {
      Vue.set(state,'roles',roles)
    },
    SET_TENANTID: (state, tenantId) => {
      Vue.set(state,'tenantId',tenantId)
    },
    SET_TENANTNAME: (state, tenantName) => {
      Vue.set(state,'tenantName',tenantName)
    },
    SET_TENANTTYPE: (state, tenantType) => {
      Vue.set(state,'tenantType',tenantType)
    },
    SET_USERID: (state, userId) => {
      Vue.set(state,'userId',userId)
    },
    SET_DEPTID: (state, deptId) => {
      Vue.set(state,'deptId',deptId)
    },
    SET_DEPTLIST: (state, deptList) => {
      Vue.set(state,'deptList',deptList)
    },
    SET_NATURE_TYPE: (state,natureType) => {
      Vue.set(state,'natureType',natureType)
    }
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password, userInfo.code, userInfo.token, userInfo.key).then(response => {
          console.log(response)
          const data = response.data
          commit('SET_TOKEN', data.data)
          setToken(data.data)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LoginByUserPhone({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUserPhone(userInfo.phone, userInfo.code).then(response => {
          console.log(response)
          const data = response.data
          commit('SET_TOKEN', data.data)
          setToken(data.data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          // 由于mockjs 不支持自定义状态码只能这样hack
          // if (!response.data) {
          //   reject('Verification failed, please login again.')
          // }
          const data = response.data.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            // 角色
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array!')
          }
          // 名称
          commit('SET_NAME', data.name)
          // 头像
          commit('SET_AVATAR', data.avatar)
          // 用户租户类型
          commit('SET_TENANTTYPE', data.tenantType)
          // 用户租户ID
          commit('SET_TENANTID', data.tenantId)
          // 租户名称
          commit('SET_TENANTNAME', data.tenantName)
          // 用户ID
          commit('SET_USERID', data.userId)
          //部门ID
          commit('SET_DEPTID', data.deptId)
          commit('SET_DEPTLIST', data.deptList)   
          //车队类型
          commit('SET_NATURE_TYPE',data.natureType)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 第三方验证登录
    // LoginByThirdparty({ commit, state }, code) {
    //   return new Promise((resolve, reject) => {
    //     commit('SET_CODE', code)
    //     loginByThirdparty(state.status, state.email, state.code).then(response => {
    //       commit('SET_TOKEN', response.data.token)
    //       setToken(response.data.token)
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },

    // 登出
    LogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        removeTenant()
        resolve()
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        removeTenant()
        resolve()
      })
    },

    // 动态修改权限
    ChangeRoles({ commit, dispatch }, role) {
      return new Promise(resolve => {
        commit('SET_TOKEN', role)
        setToken(role)
        getUserInfo(role).then(response => {
          const data = response.data
          commit('SET_ROLES', data.roles)
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          dispatch('GenerateRoutes', data) // 动态修改权限后 重绘侧边菜单
          resolve()
        })
      })
    }
  }
}

export default user
