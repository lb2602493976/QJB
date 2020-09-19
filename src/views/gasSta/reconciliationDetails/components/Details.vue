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
                <el-col :span="labelSpan" class="label">异常原因：</el-col>
                <el-col :span="contentSpan" class="content">
                    <ul v-if="params && params.abnormalReason" class="list">
                        <li v-for="(code,index) of abnormalReasons" :key="index" class="item">
                            {{ params.abnormalReason && unbalancedList.find(item=>item.itemValue == code).itemText }}
                        </li>
                    </ul>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">描述及结果：</el-col>
                <el-col :span="contentSpan" class="content">{{params.processingResults}}</el-col>
            </el-row>
        </div>
    </el-drawer>
</template>

<script>
    import viewModalMixins from '@/mixins/viewModal'
    export default {
        mixins:[ viewModalMixins ],
        props:{
            unbalancedList:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        data() {
            return {
                width:400,
                size:'small',
                labelSpan:8,
                contentSpan:20,
                params:{
                    abnormalReason:'',
                    processingResults:'',
                },
            }
        },
        computed:{
            title(){
                return '处理结果'
            },
            abnormalReasons(){
                return typeof this.params.abnormalReason==='string' ? this.params.abnormalReason.split(',') : []
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
            .list{
                .item:not(:first-child){
                    margin-top:6px;
                }
            }
        }
    }
    
</style>