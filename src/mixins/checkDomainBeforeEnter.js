import axios from 'axios'
import { getTenantByDomainName } from '@/api/tenant'
import { setTenant } from '@/utils/tenant'
function setTenantInfo(vm,data,obj){
    let reDefinedRel = Object.keys(data).reduce((res,key)=>{
        return { ...res,[key]:key }
    },{})   
    if(obj){
        for(let key in obj){
            if(data.hasOwnProperty(key) && obj[key]){
                reDefinedRel[key] = obj[key]
            }else{
                continue;
            }
        }
    }
    for(let [key,key2] of Object.entries(reDefinedRel)){
        vm.$set(vm,key,data[key2])
    }
    setTenant(data.tenantId)
}
export default {
    beforeRouteEnter (to, from, next) {
        axios.get(document.location).then(response => {
            let domainName = response.headers.tenant || 'intoo'
            if(domainName){
                getTenantByDomainName(domainName).then(response=>{
                    if(response.data.data){
                        next(vm => setTenantInfo(vm,response.data.data))
                    }else if ( response.data.data==0 ){
                    //租户不存在
                        next({path:'/403'})
                    }
                })
            }else{
                next({path:'/403'})
            }
        })
    },
}