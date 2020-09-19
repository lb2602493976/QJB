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
            <div style="padding:0 30px;">
                <el-button style="padding:0;float:right" type="text" ghost @click="handleClose">
                    关闭
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
    </el-drawer>
</template>

<script>
    import viewModalMixins from '@/mixins/viewModal'
    import BMapPoiDisplay from '@/components/BMapPoiDisplay'
    export default {
        mixins:[ viewModalMixins ],
        data() {
            return {
                width:400,
                size:'small',
                labelSpan:6,
                contentSpan:18,
                params:{},
            }
        },
        computed:{
            title(){
                return '位置详情'
            },
            poi(){
                if(this.params.lat && this.params.lng){
                    return { lat:this.params.lat,lng:this.params.lng }
                }
                return null
            },
        },
        components:{
            BMapPoiDisplay,
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