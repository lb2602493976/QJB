import request from '@/utils/request'

//根据租户id 查询枪号
export function getGunsByTenantId(tenantId){
    return request({
        url:`/loglog/selGun/${tenantId}`,
        method: 'get',
    })
}

//根据租户id 查询支付类型
export function getPayTypeByTenantId(tenantId){
    return request({
        url:`/loglog/selpayType/${tenantId}`,
        method: 'get',
    })
}

//获取交班日志
export function getlogList(query){
    return request({
        url:`/loglog/getLogList`,
        method: 'get',
        params:query,
    })
}

//获取上次交班日志
export function getlogList2(tenantId){
    return request({
        url:`/loglog/getLogList2/${tenantId}`,
        method: 'get',
    })
}

//编辑上次交班日志
export function updatePrevLog(data){
    return request({
        url:`/loglog/upLogLog`,
        method: 'post',
        data,
    })
}

//交班
export function doShiftOver(data){
    return request({
        url:`/loglog/addLogLog`,
        method: 'post',
        data,
    })
}

//获取交班数据
export function getLogData(tenantId){
    return request({
        url:`/loglog/selBaseOrder/${tenantId}`,
        method: 'get',
    })
}





