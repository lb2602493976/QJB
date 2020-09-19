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
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">交班人：</el-col>
                <el-col :span="contentSpan" class="content">{{params.includingPeople}}</el-col>
            </el-row>
            <el-divider>
                <span style="color:rgba(0,0,0,0.65)">加液机累计读数/kg</span>
            </el-divider>
            <el-row type="flex" justify="space-between" class="row">
                <el-col>
                    <el-row v-for="(gun,index) of params.logGunReading" :key="index" class="row">
                        <el-col :span="innerLabelSpan" class="label">加气枪 - {{gun.gunNum}}：</el-col>
                        <el-col :span="innerContentSpan" class="content">{{Number(gun.gunReading)}}</el-col>
                    </el-row>
                </el-col>
                <el-col>
                    <el-row class="row">
                        <el-col :span="innerLabelSpan" class="label">气枪总读数：</el-col>
                        <el-col :span="innerContentSpan" class="content">{{Number(params.gasTotal)}}</el-col>
                    </el-row>
                    <el-row class="row">
                        <el-col :span="innerLabelSpan" class="label">本班销售气量/kg：</el-col>
                        <el-col :span="innerContentSpan" class="content">{{Number(params.salesVolume)}}</el-col>
                    </el-row>
                    <el-row class="row">
                        <el-col :span="innerLabelSpan" class="label">储罐剂余量/kg：</el-col>
                        <el-col :span="innerContentSpan" class="content">{{Number(params.surplus)}}</el-col>
                    </el-row>
                    <el-row class="row">
                        <el-col :span="innerLabelSpan" class="label">备用金（元）：</el-col>
                        <el-col :span="innerContentSpan" class="content">{{Number(params.pettyCash)}}</el-col>
                    </el-row>
                </el-col>
            </el-row>
            <el-divider>
                <span style="color:rgba(0,0,0,0.65);margin-top:24px;">销售数据</span>
            </el-divider>
            <el-row type="flex" justify="space-between" class="salesInfo row header">
                <el-col class="col">款项</el-col>
                <el-col class="col">金额（元）</el-col>
            </el-row>
            <el-row v-for="(item,index) of params.logPay" :key="index" type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">
                    {{ item.name }}
                </el-col>
                <el-col class="col">
                    <el-popover
                    v-if="item.logPayType"
                    placement="top"
                    title="支付明细"
                    width="400"
                    trigger="hover"
                    >
                        <span slot="reference">{{item.money}}</span>
                        <el-row type="flex" justify="space-between" align="center">
                        <el-col v-for="(payType,index) of item.logPayType" :key="index">
                            {{payTypes.find(item=>item.itemValue==payType.payType).itemText}}
                        </el-col>
                        </el-row>
                        <el-row type="flex" justify="space-between" align="center">
                        <el-col v-for="(payType,index) of item.logPayType" :key="index">
                            {{Number(payType.payMoney)}}
                        </el-col>
                        </el-row>
                    </el-popover>
                    <span v-else>{{Number(item.money)}}</span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">合计</el-col>
                <el-col class="col">{{Number(params.totalAmount)}}</el-col>
            </el-row>
            <el-divider>
                <span style='color:rgba(0,0,0,0.65);margin-top:24px;'>预充值数据</span>
            </el-divider>
            <el-row type="flex" justify="space-between" class="salesInfo row header">
                <el-col class="col">款项</el-col>
                <el-col class="col">金额（元）</el-col>
            </el-row>
            <el-row v-for="(item,index) of params.logRecharge" :key="index+'l2'" type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">
                    {{ item.name }}
                </el-col>
                <el-col class="col">
                    {{ Number(item.money) }}
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">合计</el-col>
                <el-col class="col">{{Number(params.totalRecharge)}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row" style="margin-top:24px;">
                <el-col :span="labelSpan" class="label">备注：</el-col>
                <el-col :span="contentSpan" class="content">{{params.remark}}</el-col>
            </el-row>
        </div>
    </el-drawer>
</template>

<script>
    import { getTenantById } from '@/api/tenant'
    import viewModalMixins from '@/mixins/viewModal'
    export default {
        mixins:[ viewModalMixins ],
        props:{
            payTypes:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                width:600,
                size:'small',
                labelSpan:4,
                contentSpan:20,
                innerLabelSpan:10,
                innerContentSpan:14,
                params:{},
            }
        },
        computed:{
            title(){
                return '交班详情'
            },
        },
    }
</script>
<style lang="scss" scoped>

    .max{
        height:100%;
    }
    .row{
        &:not(:first-child){
            margin-top:12px;
        }
        .label{
            font-size:14px;
        }
        .content{
            font-size:14px;
            color:rgba(0,0,0,0.65);
            font-weight:normal;
            text-align:left;
            padding-left:8px;
        }
    }
    .salesInfo.row{
        border-bottom:1px solid #DDD;
        margin-top:0;
        &.header{
            border:1px solid #DDD;
            background:#FAFAFA;
            padding:4px 0;
        }
        .col{
            text-align:center;
            font-size:14px;
            color:rgba(0,0,0,0.65);
            line-height:2.8;
        }
    }

</style>
