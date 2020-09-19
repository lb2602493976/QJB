<template>
    <el-drawer
        :title="title"
        :size="`${width}px`"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :custom-class="'drawer-body'"
        @close="handleClose"
    >
        <div class="drawer-content">
            <div v-if="activeName==='mine'" class="mine">
                <p>已为您生成专属邀请码，邀请码有效期为 3 天，推荐给身边的朋友，一键成为伙伴关系～</p>
                <div v-loading="generateLoading" style="margin-top:8px;">
                    <label v-html="inviteCodeLabel" class="label"></label>
                    <span style="font-weight:bold;">{{selfCode}}</span>
                    <el-button @click="clipboard(selfCode,$event)" style="margin-left:8px;" type="text" ghost>
                        复制邀请码
                    </el-button>
                </div>
                <div style="margin-top:8px;">
                    <label class="label">失效时间：</label>
                    <span>{{invalidTime|invalidTime}}</span>
                </div>
                <div v-html="descComponent"></div>
            </div>   
            <div v-else-if="activeName==='input'" class="input">
                <div>
                    <label class="label">邀请码：</label>
                    <div style="margin-top:8px;">
                        <el-input v-model.trim.trim="partnerCode" type="text" placeholder="请填写"/>
                    </div>
                    <el-button @click="handleBePartner" type="text" ghost>成为伙伴</el-button>
                </div>
                <div v-html="descComponent"></div>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import Vue from 'vue'
    import viewModalMixins from '@/mixins/viewModal'
    import commonMixins from '../mixins'
    import { mapGetters } from 'vuex'
    import { addAssociated,generateInviteCode } from '@/api/tenant'
    import clipboard from '@/utils/clipboard'
    import moment from 'moment'
    export default {
        props:{
            activeName:{
                type:String,
                default:'',
            },
        },
        mixins:[ viewModalMixins,commonMixins ],
        data() {
            return {
                showDesc:false,
                generateLoading:false,
                descComponent:
                `<div style="margin-top:50px;">
                    <div>
                        <p>> 邀请码能做什么？</p>
                        <p>邀请码能帮助您一键建立和合作伙伴之间的关系，无需平台审核，快速建立关系，享受各种优惠</p>
                    </div>
                    <p style="margin-top:24px;">注意：建立伙伴关系后，无法删除伙伴关系</p>
                    <div style="margin-top:24px;">
                        <p>> 使用方法</p>
                        <p>1.生成专属邀请码</p>
                        <p>2.复制邀请码，发送给我的伙伴</p>
                        <p>3.伙伴在自己的系统平台中，填写邀请码</p>
                        <p>4.建立伙伴关系</p>
                    </div>
                    <div style="margin-top:24px;">
                        <p>> 伙伴要求</p>
                        <p>1.伙伴已在平台注册成为租户</p>
                        <p>2.您是气站，可与平台或车队建立伙伴关系</p>
                        <p>3.您是车队，可与气站或平台建立伙伴关系</p>
                        <p>4.您是平台，可与气站或车队建立伙伴关系</p>
                    </div>
                </div>`,
                selfCode:'',
                partnerCode:'',
                invalidTime:'',
                inviteCodeLabel:'',
                width:450,
                size:'small',
                params:{},
                clipboard,
            }
        },
        computed:{
            ...mapGetters(['tenantId','tenantType']),
            title(){
                return ({
                    mine:'我的专属邀请码',
                    input:'填写邀请码',
                })[this.activeName]
            },
        },
        methods: {
            //封装的生命周期
            afterOpen(){
                this.handleGenerateCode()
                this.showDesc = true
            },
            reset(){
                this.partnerCode = ''
                this.params = {};
            },
             //生成我的邀请码
            handleGenerateCode() {
                this.generateLoading = true
                generateInviteCode(this.tenantId).then(response =>{
                    if(response.data.data){
                        let codeHtml = ''
                        this.selfCode = response.data.data.inviteCode
                        this.inviteCodeLabel = '邀请码：'.split('').map(str => {
                            return `<span style="color:${this.getRandomColor()};font-weight:bold;">${str}</span>`
                        }).join('')
                        this.invalidTime = response.data.data.overdue
                        this.mode = 'get'
                    }else{
                        this.$message.error(response.data.msg)
                    }
                }).finally(()=>{
                    this.generateLoading = false
                })
            },
            //成为伙伴
            handleBePartner(){
                if(!this.partnerCode) return this.$message.error('邀请码不能为空')
                this.bePartnerLoading = true
                let params = { 
                    mainTenantId:this.tenantId,
                    tenantType:this.tenantType,
                    inviteCode:this.partnerCode,
                }
                addAssociated(params).then(response => {
                    if(response.data.data){
                        this.partnerCode = ''
                        this.$message.success('绑定成功！')
                        this.$emit('search')
                    }else{
                        this.$message.error(response.data.msg)
                    }
                }).finally(()=>{
                    this.bePartnerLoading = false
                })
            },
            getRandomColor(){
                let r = Math.round(Math.random()*255)
                let g = Math.round(Math.random()*255)
                let b =Math.round(Math.random()*255)
                return `rgba(${r},${g},${b},${1})`
            },
        },
        filters:{
            invalidTime(val){
                return (moment(moment.duration(val,'hours').asMilliseconds() + moment())).format('YYYY-MM-DD HH:mm:ss')
            },
        },
    }
</script>
<style lang="scss" scoped>
    .max{
        height:100%;
    }
    .drawer-content{
        color:rgba(0,0,0,0.65);
        font-size:14px;
        padding:0 24px;
        line-height:1.5;
    }
    
</style>