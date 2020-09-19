<template>
    <el-drawer
        :title="title"
        :size="`${width}px`"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        :custom-class="'drawer-body'"
        @close="handleClose"
    >
        <div v-show="page==='details'" class="drawer-content">
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车牌号码：</el-col>
                <el-col :span="contentSpan" class="content">{{params.carNum}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车型：</el-col>
                <el-col :span="contentSpan" class="content">{{params.carType}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">出厂日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.factoryDate}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">所属车队：</el-col>
                <el-col :span="contentSpan" class="content">
                    <el-button :loading="fleetDetailsloading" style="padding:0" type="text" ghost @click="underFleetButton">
                        {{ params.tenantName }}     
                    </el-button>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">加入车队日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.joinDate}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车牌颜色代码：</el-col>
                <el-col :span="contentSpan" class="content">
                    {{params && params.colorCode && colorTypes.find(item=>item.itemValue == params.colorCode).itemText}}
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车辆所有人：</el-col>
                <el-col :span="contentSpan" class="content">{{params.owner}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">使用性质：</el-col>
                <el-col :span="contentSpan" class="content">{{params.useCharacter}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车辆类型：</el-col>
                <el-col :span="contentSpan" class="content">{{params.vehicleType}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车辆识别代号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.vin}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">发证机关：</el-col>
                <el-col :span="contentSpan" class="content">{{params.issuingOrganizations}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">注册日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.registerDate}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">发证日期：</el-col>
                <el-col :span="contentSpan" class="content">{{params.issueDate}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车辆能源类型：</el-col>
                <el-col :span="contentSpan" class="content">{{params.vehicleEnergyType}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">核定载质量：</el-col>
                <el-col :span="contentSpan" class="content">{{params.vehicleTonnage}}t</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">吨位：</el-col>
                <el-col :span="contentSpan" class="content">{{params.grossMass}}t</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">道路运输证号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.certificateNum}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">挂车牌照号：</el-col>
                <el-col :span="contentSpan" class="content">{{params.plateNum}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车辆状态：</el-col>
                <el-col :span="contentSpan" class="content">
                    <span class="status-box" :class="{ green:params.status==0 }" style="float:left">
                        {{params.status | status}}
                    </span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">备注：</el-col>
                <el-col :span="contentSpan" class="content">{{params.remark}}</el-col>
            </el-row>
        </div>
        <div v-show="page==='fleetDetails'" class="drawer-content">
            <div style="padding:0 30px;">
                <el-button style="padding:0;float:right" type="text" ghost @click="page = 'details'">
                    返回
                </el-button>
            </div>
            <el-row v-if="fleet.natureType=='0'" type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">身份证号：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.idCard}}</el-col>
            </el-row>
            <el-row v-else-if="fleet.natureType=='1'" type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">企业代码：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.enterpriseCode}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队名称：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.tenantName}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队负责人：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.contacts}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">手机号码：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.contactsTel}}</el-col>
            </el-row>
            <!-- <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">微信号：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.contactsWx}}</el-col>
            </el-row> -->
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队域名：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.domainName}}.ucarline.com</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">附件：</el-col>
                <el-col :span="contentSpan" class="content pic">
                    <div v-for="(item,index) of fleet.selectCertList" :key="index" class="content-pic-item">
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
                <el-col :span="labelSpan" class="label">生效日期：</el-col>
                <el-col :span="contentSpan" class="content">{{moment(fleet.startTime).format('YYYY-MM-DD HH:mm:ss')}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">结束日期：</el-col>
                <el-col :span="contentSpan" class="content">{{moment(fleet.endTime).format('YYYY-MM-DD HH:mm:ss')}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">车队状态：</el-col>
                <el-col :span="contentSpan" class="content" >
                    <span class="status-box" :class="{ green:fleet.status==0 }" style="float:left">
                        {{fleet.status | status}}
                    </span>
                </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">描述：</el-col>
                <el-col :span="contentSpan" class="content">{{fleet.remark}}</el-col>
            </el-row> 
        </div>
    </el-drawer>
</template>

<script>
    import { getTenantById } from '@/api/tenant'
    import viewModalMixins from '@/mixins/viewModal'
    import commonMixins from '../mixins'
    import moment from 'moment'
    export default {
        props:{
            colorTypes:{
                type:Array,
                default(){
                    return []
                },
            },
        },
        mixins:[ viewModalMixins,commonMixins ],
        filters:{
            status(val){
                if(val == 0) return '正常'
                if(val == 9) return '冻结'
            },
        },
        data() {
            return {
                moment,
                showImage:false,
                fleetDetailsloading:false,
                page:'details',
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
                return this.page==='details' ? '车辆信息' : '车队信息'
            },
        },
        methods: {
            reset(){
                this.params = {}
                this.fleet = {}
                this.page = 'details'
            },
            underFleetButton(){
                this.fleetDetailsloading = true
                getTenantById(this.params.tenantId).then(res => {
                    let data = res.data.data
                    this.fleet = data
                    this.fleetDetailsloading=false
                    this.page = 'fleetDetails'
                    this.showImage = true
                })
            },
            //获取预览列表
            getPreViewList(index,picIndex){
                let list = [...this.fleet.selectCertList[index].certPc.split(',')]
                let slice = list.splice(picIndex)
                return [ ...slice,...list ]
            },
        },
    }
</script>
<style lang="scss" scoped>
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