import store from '@/store'

const TenantKey = 'tenantId'

export function getTenant() {
  return store.getters[TenantKey]
}

export function setTenant(tenantId) {
  return store.commit('SET_TENANTID',tenantId)
}

export function removeTenant() {
  return store.commit('SET_TENANTID','')
}
