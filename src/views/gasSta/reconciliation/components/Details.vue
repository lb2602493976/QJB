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
                <el-col :span="labelSpan" class="label">时间：</el-col>
                <el-col :span="contentSpan" class="content">{{params.meetingDate}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">地点：</el-col>
                <el-col :span="contentSpan" class="content">{{params.meetingPlace}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">主持人：</el-col>
                <el-col :span="contentSpan" class="content">{{params.host}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">参加人：</el-col>
                <el-col :span="contentSpan" class="content">{{params.participants}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">会议内容：</el-col>
                <el-col :span="contentSpan" class="content">{{params.meetingContent}}</el-col>
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
                labelSpan:8,
                contentSpan:20,
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