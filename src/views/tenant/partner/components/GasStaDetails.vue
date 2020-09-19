<template>
    <!-- 新增修改界面 -->
    <el-drawer
        :title="title"
        :size="`${width}px`"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :custom-class="'drawer-body'"
        @close="handleClose"
    >
        <div v-if="page === 'details'" class="drawer-content">
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">企业代码：</el-col>
                <el-col :span="contentSpan" class="content">{{params.enterpriseCode}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.tenantName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站挂牌价：</el-col>
                <el-col :span="contentSpan" class="content">
                    <el-button 
                        v-show="params.gasPrices"
                        class="text-wrap"
                        type="text"
                        ghost 
                        @click="showHitoryButton"
                        style="padding:0;text-align:left"
                        :loading="historyLoading"
                    >
                        {{'￥'+params.gasPrices}}>
                    </el-button>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站位置：</el-col>
                <el-col :span="contentSpan" class="content">
                    <el-button 
                        v-show="params.location"
                        class="text-wrap"
                        type="text"
                        ghost 
                        @click="positionDetailsButton"
                        style="padding:0;text-align:left"
                    >
                        {{params.location}}>
                    </el-button>
                    <div v-show="params.location" style="margin-top:4px;">
                        {{`纬度:${params.lat},经度:${params.lng}`}}
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站负责人：</el-col>
                <el-col :span="contentSpan" class="content">{{params.contacts}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">手机号码：</el-col>
                <el-col :span="contentSpan" class="content">{{params.contactsTel}}</el-col>
            </el-row>
            <!-- <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">微信号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.contactsWx}}</el-col>
            </el-row> -->
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">域名：</el-col>
                <el-col :span="contentSpan" class="content">{{params.domainName}}.ucarline.com</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">生效日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.startTime}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">结束日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.endTime}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站状态：</el-col>
                <el-col :span="contentSpan" class="content" >
                    <span class="status-box" :class="{ green:params.status==0 }" style="float:left">
                        {{params.status | status}}
                    </span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">附件：</el-col>
                <el-col :span="contentSpan" class="content pic">
                    <div v-for="(item,index) of params.certList" :key="index" class="content-pic-item">
                        <div class="content-row">
                            <label class="text-nowrap">名称：</label>
                            <p class="text-wrap">{{item.certName}}</p>
                        </div>
                        <!-- <div class="content-row">
                            <label class="text-nowrap">编码：</label>
                            <p class="text-wrap">{{item.certCode}}</p>
                        </div> -->
                        <div class="content-row">
                            <label class="text-nowrap">照片：</label>
                            <div class="pic-container">
                                <el-image 
                                    v-for="(pic,picIndex) of item.certPc.split(',')"
                                    :key="picIndex"
                                    style="width: 32px; height: 32px"
                                    :src="pic" 
                                    :preview-src-list="getPreViewList(index,picIndex)"
                                ></el-image>
                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">描述：</el-col>
                <el-col :span="contentSpan" class="content">{{params.remark}}</el-col>
            </el-row> 
        </div>
        <div v-else-if="page === 'poiDetails'" class="drawer-content">
            <div style="padding:0 30px;">
                <el-button style="padding:0;float:right" type="text" ghost @click="page = 'details'">
                    返回
                </el-button>
            </div>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">企业代码：</el-col>
                <el-col :span="contentSpan" class="content">{{params.enterpriseCode}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.tenantName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气站位置：</el-col>
                <el-col :span="contentSpan" class="content">{{params.location}}</el-col>
            </el-row>
            <el-row class="row">
                <BMapPoiDisplay :dataSource="poi" :custom-style="{height:`${width - 48}px`,padding:'24px',boxSizing:'border-box'}"/>
            </el-row>
        </div>
        <div v-else-if="page === 'priceHistory'" class="drawer-content">
            <div class="buttons">
                <el-radio-group v-model.trim="timeLineReverse">
                    <el-radio :label="false">倒序</el-radio>
                    <el-radio :label="true">正序</el-radio>
                </el-radio-group>
                <el-button @click="page = 'details'" type="text" ghost>返回</el-button>
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
                            <p style="font-size:16px;">挂牌价{{activity.gasPrices}}元/公斤</p>
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
    import viewModalMixins from '@/mixins/viewModal'
    import commonMixins from '../mixins'
    import BMapPoiDisplay from '@/components/BMapPoiDisplay'
    import { gasPriceHistory } from '@/api/tenant'
    import moment from 'moment'
    export default {
        mixins:[ viewModalMixins,commonMixins ],
        data() {
            return {
                historyLoading:false,
                page:'details',
                width:400,
                size:'small',
                labelSpan:6,
                contentSpan:18,
                params:{},
                timeLineReverse:false,
                activities: [],
            }
        },
        computed:{
            title(){
                return this.page==='poiDetails' ? '位置详情' : '气站详情'
            },
            poi(){
                if(this.params.lat && this.params.lng){
                    return { lat:this.params.lat,lng:this.params.lng }
                }
                return null
            },
        },
        methods: {
            positionDetailsButton(){
                this.page = 'poiDetails'
            },
            //获取预览列表
            getPreViewList(index,picIndex){
                let list = [...this.params.certList[index].certPc.split(',')]
                let slice = list.splice(picIndex)
                return [ ...slice,...list ]
            },
            //获取气站挂牌价历史优惠
            showHitoryButton(){
                this.historyLoading = true
                gasPriceHistory(this.params.tenantId).then(response=>{
                    this.activities = response.data.data
                    this.activities.forEach(item=>{
                        item.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')
                    })
                    this.page = 'priceHistory'
                }).finally(()=>{
                    this.historyLoading = false
                })
            }
        },
        components:{
            BMapPoiDisplay,
        },
    }
</script>
<style lang="scss" scoped>
    .time-line-container{
        height:calc(100% - 48px);
        overflow-y:auto;
    }
    .buttons{
        display:flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom:12px;
    }
    .max{
        height:100%;
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
            &.pic{
                &>*:not(:first-child){
                    margin-top:8px;
                }
            }
            .content-pic-item{
                border:1px dashed rgba(0,0,0,0.45);
                padding:8px;
                .content-row{
                    &:not(:first-child){
                        margin-top:4px;
                    }
                    display:flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    .pic-container{
                        &>*{
                            margin-top:8px;
                            margin-left:8px;
                        }
                    }
                }
            }
        }
    }
    
</style>