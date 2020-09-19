<template>
    <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">邀请码</h3>
    <div class="main">
        <div class="buttons">
            <el-button :loading="generateLoading" @click="mode = 'get'">我的专属邀请码</el-button>
            <el-button @click="mode='set'">填写邀请码</el-button>
        </div>
        <div v-if="mode==='get'" class="get-code">
            <p class="row1">已为您生成专属邀请码，邀请码有效期为 3 天，推荐给身边的朋友，一键成为伙伴关系～</p>
            <div class="row2">
                <label v-html="inviteCodeLabel" class="label"></label>
                <span style="font-weight:bold;color:#000;">{{selfCode}}</span>
                <el-button @click="clipboard(selfCode,$event)" type="text" ghost>复制邀请码</el-button>
            </div>
            <div class="row3">
                <label class="label">失效时间：</label>
                <span>{{invalidTime|invalidTime}}</span>
            </div>
        </div>
        <div v-else-if="mode==='set'" class="set-code">
            <label class="label">邀请码：</label>
            <div class="row2">
                <el-input style="width:400px" type="text" v-model.trim="partnerCode" placeholder="请输入"></el-input>
            </div>
            <el-button @click="handleBePartner" type="text" ghost>成为伙伴</el-button>
        </div>
        <div class="desc1">
            <p>&gt;邀请码能做什么？</p>
            <p>邀请码能帮助您一键建立和合作伙伴之间的关系，无需平台审核，快速建立关系，享受各种优惠</p>
        </div>
        <div class="desc2">
            <p>&gt;使用方法</p>
            <p>1.生成专属邀请码</p>
            <p>2.复制邀请码，发送给我的伙伴</p>
            <p>3.伙伴在自己的系统平台中，填写邀请码</p>
            <p>4.建立伙伴关系</p>
        </div>
        <div class="desc3">
            <p>&gt;伙伴要求</p>
            <p>1.伙伴已在平台注册成为租户</p>
            <p>2.您是气站，可与平台或车队建立伙伴关系</p>
            <p>3.您是车队，可与气站或平台建立伙伴关系</p>
            <p>4.您是平台，可与气站或车队建立伙伴关系</p>
        </div>
    </div>
  </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { addAssociated,generateInviteCode } from '@/api/tenant'
    import clipboard from '@/utils/clipboard'
    import moment from 'moment'
    export default {
        data() {
            return {
                generateLoading:false,
                bePartnerLoading:false,
                mode:'',
                invalidTime:'',
                selfCode:'',
                partnerCode:'',
                clipboard,
                inviteCodeLabel:'',
            }
        },
        computed:{
            ...mapGetters(['tenantId','tenantType']),
        },
        mounted(){
            this.handleGenerateCode()
        },
        methods: {
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
    .app-container{
        font-size:14px;
        color:rgba(0,0,0,0.65);
        margin:0;
        padding:0;
        background:transparent;
        .title{
            margin:0;
            padding:12px 20px;
            background:#FFF;
        }
        .main{
            padding-left:48px;
            .buttons{
                padding:24px;
                margin-top:24px;
            }
            .get-code,.set-code,.desc1,.desc2,.desc3{
                margin:0 24px 24px 24px;
            }
            .get-code{
                .row2{
                    margin-top:24px;
                    &>*:not(:first-child){
                        margin-left:12px;
                    }
                }
                .row3{
                    margin-top:12px;
                    &>*:not(:first-child){
                        margin-left:12px;
                    }
                }
            }
            .set-code{
                .row2{
                    margin-top:24px;
                    &>*:not(:first-child){
                        margin-left:12px;
                    }
                }
                .row3{
                    margin-top:12px;
                    &>*:not(:first-child){
                        margin-left:12px;
                    }
                }
            }
            .desc1{
                margin-top:40px;
            }
            .desc2,.desc3{
            
            }
        }
    }
</style>