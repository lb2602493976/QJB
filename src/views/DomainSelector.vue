<template>
    <div class="c">
        <el-select :disabled="loading" @change="handleSelect" v-model.trim="domainName">
            <el-option label="测试平台" value="intoo"/>
            <el-option label="测试气站" value="qizhan"/>
            <el-option label="qizhan105" value="qizhan105"/>
            <el-option label="测试车队" value="chedui"/>
            <el-option label="测试车队_个人" value="wcfsss"/>
            <el-option label="白龙马车队" value="blm"/>
            <el-option label="dfjqz" value="dfjqz"/>
        </el-select>
    </div>
</template>

<script>
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
        data() {
            return {
                loading:false,
                domainName:'intoo',
            }
        },
        mounted(){
            this.$parent.loginForm.username = 'admin'
            this.$parent.loginForm.password = '123456'
        },
        methods: {
            handleSelect(val) {
                console.log(val)
                let domainName = this.domainName
                if(domainName){
                    this.loading=true
                    getTenantByDomainName(domainName).then(response=>{
                        if(response.data.data){
                            setTenantInfo(this.$parent,response.data.data)
                            let obj = { intoo:'admin',qizhan:'qizhan',chedui:'chedui',wcfsss:'wcfsss',qizhan105:'qizhan105' }
                            this.$parent.loginForm.username = obj[domainName]
                            this.$parent.loginForm.password = '123456'
                        }else if ( response.data.data==0 ){
                            //租户不存在
                            this.$router.push('/403')
                        }
                    }).finally(()=>{
                        this.loading=false
                    })
                }
            }
        },
    }
</script>

<style lang="scss" scoped>
    .c{
        // position:fixed;
        // top:24;
        // right:24;
    }
</style>
