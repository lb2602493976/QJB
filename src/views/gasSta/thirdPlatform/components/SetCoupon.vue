<template>
    <!-- 新增修改界面 -->
    <el-drawer
        title="设置优惠"
        :size="`${width}px`"
        :visible.sync="dialogVisible"
        :custom-class="'drawer-body'"
        @close="handleClose"
    >
        <div v-show="page==='set'" class="drawer-content">
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">平台名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.thirdName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">挂牌优惠：</el-col>
                <el-col :span="contentSpan" class="content">
                    <div v-show="!isCouponUpdate">
                        按单价优惠{{ initialVal | preferential }}元
                        <div v-show="!isCouponUpdate">
                            <el-button @click="updateButton" :loading="confirmLd" type="text" ghost>修改</el-button>
                            <el-button @click="showHitoryButton" :loading="historyLoading" type="text" ghost>修改历史</el-button>
                        </div>
                    </div>
                    <div v-show="isCouponUpdate">
                        <el-input v-model.trim="preferential" placeholder="保留两位小数">
                            <template slot="append">元</template>
                        </el-input>
                        <div>
                            <el-button @click="saveButton" :loading="confirmLd" type="text" ghost>保存</el-button>
                            <el-button @click="isCouponUpdate = false" type="text" ghost>取消</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">真实优惠：</el-col>
                <el-col :span="contentSpan" class="content">
                    <div v-show="!isCouponUpdate2">
                        按单价优惠{{ initialVal2 | preferential }}元
                        <div v-show="!isCouponUpdate2">
                            <el-button @click="updateButton2" :loading="confirmLd" type="text" ghost>修改</el-button>
                            <el-button @click="showHitoryButton2" :loading="historyLoading" type="text" ghost>修改历史</el-button>
                        </div>
                    </div>
                    <div v-show="isCouponUpdate2">
                        <el-input v-model.trim="realPreferential" placeholder="保留两位小数">
                            <template slot="append">元</template>
                        </el-input>
                        <div>
                            <el-button @click="saveButton" :loading="confirmLd" type="text" ghost>保存</el-button>
                            <el-button @click="isCouponUpdate2 = false" type="text" ghost>取消</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="page==='history'" class="drawer-content" style="padding:0 24px">
            <div>{{historyTitle}}</div>
            <div class="buttons">
                <el-radio-group v-model.trim="timeLineReverse">
                    <el-radio :label="false">倒序</el-radio>
                    <el-radio :label="true">正序</el-radio>
                </el-radio-group>
                <el-button @click="page = 'set'" type="text" ghost>返回设置</el-button>
            </div>
            <div class="time-line-container">
                <el-timeline :reverse="timeLineReverse">
                    <el-timeline-item
                        v-for="(activity, index) in activities"
                        :key="index"
                        :timestamp="activity.createTime"
                        :hide-timestamp="true"
                    >
                        <div>
                            <p style="font-size:16px;">单价优惠{{activity.preferential||activity.realPreferential}}元</p>
                            <p style="color:rgba(0,0,0,0.65);margin-top:8px;">
                                <span>{{activity.createTime}}</span>,
                                <span>{{activity.name}}</span>
                            </p>
                        </div>
                    </el-timeline-item>
                </el-timeline>
            </div>
             
        </div>
    </el-drawer>
</template>

<script>
    import moment from 'moment'
    import { getTenantHistory } from '@/api/thirdPlatform'
    import editFormMixins from '@/mixins/editForm'
    export default {
        mixins:[ editFormMixins ],
        data() {
            return {
                page:'set',
                isCouponUpdate:false,
                isCouponUpdate2:false,
                timeLineReverse:false,
                historyLoading:false,
                historyKey:0,
                initialVal:'0.00',
                initialVal2:'0.00',
                preferential:'0.00',
                realPreferential:'0.00',
                params:{
                    tenantName:'',
                },
                activities: [],
                width:400,
                size:'small',
                tabName:'平台信息',
                labelSpan:6,
                contentSpan:18,
            }
        },
        computed:{
            historyTitle(){
                let historyKey = this.historyKey
                return ['挂牌优惠历史','真实优惠历史'][historyKey]
            },
        },
        methods: {
            reset(){
                this.page = 'set'
                this.timeLineReverse = false
                this.isCouponUpdate = false
                this.isCouponUpdate2 = false
                this.params = { }
            },
            updateButton(){
                this.isCouponUpdate2 = false
                this.preferential = this.initialVal
                this.isCouponUpdate = true
            },
            updateButton2(){
                this.isCouponUpdate = false
                this.realPreferential = this.initialVal2
                this.isCouponUpdate2 = true
            },
            saveButton(){
                let { associatedId } = this.params
                let { preferential,realPreferential } = this
                let num;
                console.log(realPreferential,this.initialVal2,this.historyKey)
                if(this.isCouponUpdate) num = parseFloat(preferential)
                if(this.isCouponUpdate2) num = parseFloat(realPreferential)
                if(Number.isNaN(num)) return this.$message.error('优惠值只能为数字类型！')
                if(num < 0) return this.$message.error('优惠值不能为负数！')
                if(this.isCouponUpdate && preferential === this.initialVal) return this.$message.error('优惠值不能与初始值相同！')
                if(this.isCouponUpdate2 && realPreferential === this.initialVal2) return this.$message.error('优惠值不能与初始值相同！')
                if(this.isCouponUpdate ) this.$emit('setCoupon',{ ...this.params,preferential:Math.round(num*100)/100 },this)
                if(this.isCouponUpdate2) this.$emit('setCoupon',{ ...this.params,realPreferential:Math.round(num*100)/100 },this)
            },
            showHitoryButton(){
                this.historyKey = 0
                this.historyLoading = true
                this.handleGetHostory()
            },
            showHitoryButton2(){
                this.historyKey = 1
                this.historyLoading = true
                this.handleGetHostory()
            },
            handleGetHostory(){
                return getTenantHistory(this.params.id).then(response=>{
                    if(this.historyKey == 0) this.activities = response.data.data.filter(item => ![null,undefined,''].includes(item.preferential))
                    if(this.historyKey == 1) this.activities = response.data.data.filter(item => ![null,undefined,''].includes(item.realPreferential))
                    this.activities.forEach(item=>{
                        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.page = 'history'
                }).finally(()=>{
                    this.historyLoading = false
                })
            },
            //赋值到内部的内容
            formatBeforeSet(params){
                if(params){
                    this.preferential = params.preferential
                    this.realPreferential = params.realPreferential
                    this.initialVal = params.preferential
                    this.initialVal2 = params.realPreferential
                }
                return params
            },
        },
        filters:{
            preferential(val){
                if(!val) return '0.00'
                return val
            }
        },
    }
</script>
<style lang="scss" scoped>
    .time-line-container{
        height:calc(100% - 48px);
        overflow-y:auto;
    }
    .row{
        &:not(:first-child){
            margin-top:12px;
        }
        .label{
            font-size:14px;
            font-weight:bold;
        }
        .content{
            font-size:14px;
            color:rgba(0,0,0,0.65);
            font-weight:normal;
            text-align:left;
            padding-left:8px;
        }
    }
    .buttons{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:12px;
    }
    
</style>