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
            <div class="step-container"> 
                <label class="label">接车阶段</label>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">车牌号：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.carNum}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">铅封号：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.sealNo}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">司机姓名：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.driverName}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">司机电话：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.driverTel}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">押运员姓名：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.mobilizationName}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">押运员电话：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.mobilizationTel}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">填表日期：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.dateFilling}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">出厂时间：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.factoryTime}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">进站时间：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.stationTime}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">出厂总重</el-col>
                    <el-col :span="contentSpan" class="content">{{params.totalWeight}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">出厂净重：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.netWeight}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车负责人：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingSupervisor}}</el-col>
                </el-row>
            </div>
            <div class="step-container">
                <label class="label">开始卸车</label>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车员：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingMemberOns}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">泵池温度2：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.poolTemperature}} ℃</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐压力：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingPressure}} MPa</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐液位：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingTankLevel}} m</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐质量：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingTankQuality}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">槽车压力：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingTankLorry}} MPa</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">开始卸车时间：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingTime}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">总重：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingTotalWeight}} kg</el-col>
                </el-row> 
            </div>
            <div class="step-container">
                <label class="label">卸车中</label>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车员：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingMemberInp}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">泵池温度：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.poolTemperature2}} ℃</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">加气密度：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.densityOfGasFillingInProgress}} kg/m³</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">加气温度：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.temperatureOfGasFillingInProgress}} ℃</el-col>
                </el-row>
            </div>
            <div class="step-container">
                <label class="label">卸车后</label>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车员：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingMember}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐压力：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.afterPressure}} MPa</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐液位：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.afterTankLevel}} m</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">储罐质量：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.afterTankQuality}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">槽车压力：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.afterTankLorry}} MPa</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">加气密度：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.densityOfGasFilling}} kg/m³</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">加气温度：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.temperatureOfGasFilling}} ℃</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">泵池温度3：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.poolTemperature3}} ℃</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">车重：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.carWeight}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">净重：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingNetWeight}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">损耗量：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.wastage}} kg</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车结束时间：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingEndtime}}</el-col>
                </el-row>
                <el-row type="flex" justify="space-between" class="row">
                    <el-col :span="labelSpan" class="label">卸车总结：</el-col>
                    <el-col :span="contentSpan" class="content">{{params.unloadingConclusion}}</el-col>
                </el-row>
            </div>
        </div>
    </el-drawer>
</template>

<script>
    import { getTenantById } from '@/api/tenant'
    import viewModalMixins from '@/mixins/viewModal'
    export default {
        mixins:[ viewModalMixins ],
        data() {
            return {
                width:400,
                size:'small',
                labelSpan:8,
                contentSpan:20,
                params:{},
                fleet:{},
            }
        },
        computed:{
            title(){
                return '记录详情'
            },
        },
    }
</script>
<style lang="scss" scoped>
    .drawer-content{
        overflow-y:auto;
    }
    .label{
        font-size:14px;
        font-weight:bold;
    }
    .row{
        &:not(:first-child){
            margin-top:12px;
        }
        .content{
            font-size:14px;
            color:rgba(0,0,0,0.65);
            font-weight:normal;
            text-align:left;
            padding-left:8px;
        }
    }
    .step-container{
        &:not(:first-child){
            border-top:1px solid #DDD;
        }
        padding:24px 0 24px 24px;
    }
    
</style>