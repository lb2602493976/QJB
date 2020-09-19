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
                <el-col :span="labelSpan" class="label">单位名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.companyName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">演习参加人员：</el-col>
                <el-col :span="contentSpan" class="content">{{params.participants}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">开始时间：</el-col>
                <el-col :span="contentSpan" class="content">{{params.startTime}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">结束时间：</el-col>
                <el-col :span="contentSpan" class="content">{{params.endTime}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">内容及步骤：</el-col>
                <el-col :span="contentSpan" class="content">{{params.exerciseContent}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">效果评价及完善措施：</el-col>
                <el-col :span="contentSpan" class="content">{{params.exerciseEffect}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">加气站长：</el-col>
                <el-col :span="contentSpan" class="content">{{params.lpgStations}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">公司安全部门：</el-col>
                <el-col :span="contentSpan" class="content">{{params.securityDept}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">公司经理：</el-col>
                <el-col :span="contentSpan" class="content">{{params.companyManager}}</el-col>
            </el-row>
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
                labelSpan:10,
                contentSpan:14,
                params:{},
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
        }
    }
    
</style>