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
                <el-col :span="labelSpan" class="label">气站名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.tenantName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">常规优惠：</el-col>
                <el-col :span="contentSpan" class="content">
                    <div v-show="!isCouponUpdate">
                        按单价优惠{{ initialVal | preferentialVal }}元
                        <div v-show="!isCouponUpdate">
                            <el-button @click="updateButton" :loading="confirmLd" type="text" ghost>修改</el-button>
                            <el-button @click="showHitoryButton" :loading="historyLoading" type="text" ghost>修改历史</el-button>
                        </div>
                    </div>
                    <div v-show="isCouponUpdate">
                        <el-input v-model.trim="preferentialVal" placeholder="保留两位小数">
                            <template slot="append">元</template>
                        </el-input>
                        <div>
                            <el-button @click="saveButton" :loading="confirmLd" type="text" ghost>保存</el-button>
                            <el-button @click="isCouponUpdate = false" type="text" ghost>取消</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div v-show="page==='history'" class="drawer-content" style="padding:0 24px">
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
                            <p style="font-size:16px;">单价优惠{{activity.preferentialVal}}元</p>
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
    import { getTenantHistory } from '@/api/tenant'
    import editFormMixins from '@/mixins/editForm'
    export default {
        mixins:[ editFormMixins ],
        data() {
            return {
                page:'set',
                isCouponUpdate:false,
                timeLineReverse:false,
                historyLoading:false,
                initialVal:'0.00',
                preferentialVal:'0.00',
                params:{
                    tenantName:'',
                },
                activities: [],
                width:400,
                size:'small',
                tabName:'气站信息',
                labelSpan:6,
                contentSpan:18,
            }
        },
        methods: {
            reset(){
                this.page = 'set'
                this.timeLineReverse = false
                this.isCouponUpdate = false
            },
            updateButton(){
                this.preferentialVal = this.initialVal
                this.isCouponUpdate = true
            },
            saveButton(){
                let { associatedId } = this.params
                let { preferentialVal } = this
                let num = parseFloat(preferentialVal)
                if(Number.isNaN(num)) return this.$message.error('优惠值只能为数字类型！')
                if(num < 0) return this.$message.error('优惠值不能为负数！')
                if(preferentialVal === this.initialVal) return this.$message.error('优惠值不能与初始值相同！')
                this.$emit('setCoupon',{ associatedId,preferentialVal:Math.round(num*100)/100 },this)
            },
            showHitoryButton(){
                this.historyLoading = true
                getTenantHistory(this.params.associatedId).then(response=>{
                    this.activities = response.data.data
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
                    this.preferentialVal = params.preferentialVal
                    this.initialVal = params.preferentialVal
                }
                return params
            },
        },
        filters:{
            preferentialVal(val){
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