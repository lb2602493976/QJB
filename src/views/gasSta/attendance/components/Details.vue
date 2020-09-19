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
                <el-col :span="labelSpan" class="label">气卡卡号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.gasCardnum}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">用户类别：</el-col>
                <el-col :span="contentSpan" class="content">{{params.cardType && cardTypes.find(item => item.itemValue == params.cardType).itemText}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">用户名称：</el-col>
                <el-col :span="contentSpan" class="content">
                    {{ params.cardType!='3' ? params.cardName : type3cardName(params.cardId) }}
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">气卡位置：</el-col>
                <el-col :span="contentSpan" class="content">{{params.cardLocation}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
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
            cardTypes:{
                type:Array,
                default(){
                    return []
                },
            },
            thirdPlatForms:{
                type:Array,
                default(){
                    return []
                },
            },
        },
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
                return '气卡详情'
            },
        },
        methods: {
            //当用户类型为3时的name过滤
            type3cardName(cardId){
                if(!cardId) return ''
                return this.thirdPlatForms.find(item=>item.id == cardId ).thirdName
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