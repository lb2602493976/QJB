<template>
    <div class="container">
        <h2 class="header">用户注册</h2>
        <div class="tabs-container">
            <el-tabs :stretch="true" v-model.trim="activeName">
                <el-tab-pane label="气站" name="1"/>
                <el-tab-pane label="车队" name="2"/>
            </el-tabs>
        </div>
        <GasStaForm v-if="activeName==1" ref="form"/>
        <FleetForm v-if="activeName==2" ref="form"/>
        <div class="buttons">
            <el-button :loading="loading" class="button" @click="handleSubmit" type="primary" ghost>注册</el-button>
            <el-button class="button" @click="$router.push('/login')" ghost>返回</el-button>
        </div>
    </div>
</template>

<script>
    import { addTenant } from '@/api/tenant'
    import FleetForm from './components/fleet'
    import GasStaForm from './components/gasSta'
    import beforeEnterMixins from '@/mixins/checkDomainBeforeEnter'
    import moment from 'moment'
    export default {
        mixins:[beforeEnterMixins],
        data() {
            return {
                loading:false,
                tenantId:'',
                tenantType:'',
                tenantName:'',
                activeName:'1',
            }
        },
        methods: {
            handleSubmit() {
                const form = this.$refs['form'].$refs['form']
                form.validate(passed => {
                    if(passed){
                        this.loading = true
                        let params = this.$refs['form'].getParams()
                        params = { ...params,createTime:moment() }
                        params.certList = params.certList.reduce((res,item)=>{
                            return item.certPc ? [ ...res,item] : res
                        },[])
                        addTenant(params).then(response => {
                            if(response.data.data){
                                this.$router.replace('/registerSuccess')
                            }else{
                                this.$message.error(response.data.msg)
                            }
                        }).finally(()=>{
                            this.loading = false
                        })
                    }
                })
            }
        },
        components:{
            FleetForm,
            GasStaForm,
        },
    }
</script>

<style lang="scss" scoped>
    .container{
        padding:24px;
        width:486px;
        margin:auto;
        .tabs-container{
            width:200px;
            margin:24px auto 0 auto;
        }
        
        .header{
            margin-top:24px;
            text-align:center;
        }
        .buttons{
            display:flex;
            justify-content: space-between;
            align-items:center;
            .button{
                width:30%;
            }
        }
    }
</style>