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
            <el-row v-if="params.natureType=='0'" type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">身份证号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.idCard}}</el-col>
            </el-row>
            <el-row v-else-if="params.natureType=='1'" type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">企业代码：</el-col>
                <el-col :span="contentSpan" class="content">{{params.enterpriseCode}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队名称：</el-col>
                <el-col :span="contentSpan" class="content">{{params.tenantName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队负责人：</el-col>
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
                <el-col :span="labelSpan" class="label">车队域名：</el-col>
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
                <el-col :span="labelSpan" class="label">车队状态：</el-col>
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
    </el-drawer>
</template>

<script>
    import viewModalMixins from '@/mixins/viewModal'
    import commonMixins from '../mixins'
    export default {
        mixins:[ viewModalMixins,commonMixins ],
        data() {
            return {
                showImage:false,
                width:400,
                size:'small',
                labelSpan:6,
                contentSpan:18,
                params:{},
            }
        },
        computed:{
            title(){
                return '车队详情'
            },
        },
        methods: {
            positionDetailsButton(){
                this.page = 'poiDetails'
            },
            afterOpen(){
                this.showImage = true
            },
            //获取预览列表
            getPreViewList(index,picIndex){
                let list = [...this.params.certList[index].certPc.split(',')]
                let slice = list.splice(picIndex)
                return [ ...slice,...list ]
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
                        &>*:not(:first-child){
                            margin-left:8px;
                        }
                    }
                }
            }
        }
    }
    
</style>