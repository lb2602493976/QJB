<template>
    <div class="app-container"> 
        <h3 class="title">基础信息</h3>
        <div class="main">
            <div class="button-container">
                <div class="buttons" v-if="!isUpdate">
                    <el-button @click="modifyButton" type="primary" ghost>修改信息</el-button>
                </div>
                <div class="buttons" v-else>
                    <el-button @click="isUpdate = false" ghost>返回</el-button>
                    <el-button :loading="saveLoading" @click="handleSave" type="primary" ghost>保存</el-button>
                </div>
            </div>
            <!-- 平台 -->
            <div v-if="tenantType==='0'" class="platform">
                <ul v-if="!isUpdate" class="info-list">
                    <li class="info-item">
                        <label class="label">企业代码：</label>
                        <p class="content text-wrap">{{params.enterpriseCode}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">平台名称：</label>
                        <p class="content text-wrap">{{params.tenantName}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">负责人：</label>
                        <p class="content text-wrap">{{params.contacts}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">手机号：</label>
                        <p class="content text-wrap">{{params.contactsTel}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">平台域名：</label>
                        <p class="content text-wrap">{{params.domainName}}.ucarline.com</p>
                    </li>
                    <li class="info-item">
                        <label class="label">生效日期：</label>
                        <p class="content text-wrap">{{params.startTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">结束日期：</label>
                        <p class="content text-wrap">{{params.endTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">状态：</label>
                        <p class="content text-wrap status-box" :class="{green:params.status=='0'}">
                            {{params.status|status}}
                        </p>
                    </li>
                    <!-- <li class="info-item">
                        <label class="label">微信号：</label>
                        <p class="content text-wrap">{{params.contactsWx}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">QQ号：</label>
                        <p class="content text-wrap">{{params.contactsQq}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">邮箱：</label>
                        <p class="content text-wrap">{{params.email}}</p>
                    </li> -->
                    <li class="info-item">
                        <label class="label">描述：</label>
                        <p class="content text-wrap">{{params.remark}}</p>
                    </li>
                </ul>
                <platEditForm :ref="formName" v-else :dataSource="currentEditParams"/>
            </div>
            <!-- 气站 -->
            <div v-else-if="tenantType==='1'" class="gasSta">
                <ul v-if="!isUpdate" class="info-list">
                    <li class="info-item">
                        <label class="label">企业代码：</label>
                        <p class="content text-wrap">{{params.enterpriseCode}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">气站名称：</label>
                        <p class="content text-wrap">{{params.tenantName}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">气站位置：</label>
                        <div class="content text-wrap">
                            <p class="text-wrap">
                                <el-button @click="handleGasLocationClick" class="text-wrap poi-button" type="text" ghost>{{params.location}}></el-button>
                            </p>
                            <p class="text-wrap">{{`纬度:${params.lat},经度:${params.lng}`}}</p>
                        </div>
                    </li>
                    <li class="info-item">
                        <label class="label">气站负责人：</label>
                        <p class="content text-wrap">{{params.contacts}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">手机号：</label>
                        <p class="content text-wrap">{{params.contactsTel}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">气站域名：</label>
                        <p class="content text-wrap">{{params.domainName}}.ucarline.com</p>
                    </li>
                    <li class="info-item">
                        <label class="label">生效日期：</label>
                        <p class="content text-wrap">{{params.startTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">结束日期：</label>
                        <p class="content text-wrap">{{params.endTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">状态：</label>
                        <p class="content text-wrap status-box" :class="{green:params.status=='0'}">
                            {{params.status|status}}
                        </p>
                    </li>
                    <!-- <li class="info-item">
                        <label class="label">微信号：</label>
                        <p class="content text-wrap">{{params.contactsWx}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">QQ号：</label>
                        <p class="content text-wrap">{{params.contactsQq}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">邮箱：</label>
                        <p class="content text-wrap">{{params.email}}</p>
                    </li> -->
                    <li class="info-item">
                        <label class="label" style="padding-top:4px;">附件：</label>
                        <ul class="content pic text-wrap">
                            <li v-for="(item,index) of params.selectCertList" :key="index" class="content-pic-item">
                                <div class="content-row">
                                    <label>名称：</label>
                                    <p>{{item.certName}}</p>
                                </div>
                                <!-- <div class="content-row">
                                    <label>编码：</label>
                                    <p>{{item.certCode}}</p>
                                </div> -->
                                <div class="content-row">
                                    <label>照片：</label>
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
                            </li>
                        </ul>
                    </li>
                    <li class="info-item">
                        <label class="label">描述：</label>
                        <p class="content text-wrap">{{params.remark}}</p>
                    </li>
                </ul>
                <gasStaEditForm :ref="formName" v-else :dataSource="currentEditParams"/>
            </div>
            <!-- 车队 -->
            <div v-else-if="tenantType==='2'" class="fleet">   
                <ul v-if="!isUpdate" class="info-list">
                    <li v-if="natureType=='0'" class="info-item">
                        <label class="label">身份证号：</label>
                        <p class="content text-wrap">{{params.idCard}}</p>
                    </li>
                    <li v-else-if="natureType=='1'" class="info-item">
                        <label class="label">企业代码：</label>
                        <p class="content text-wrap">{{params.enterpriseCode}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">车队名称：</label>
                        <p class="content text-wrap">{{params.tenantName}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">车队负责人：</label>
                        <p class="content text-wrap">{{params.contacts}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">手机号：</label>
                        <p class="content text-wrap">{{params.contactsTel}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">车队域名：</label>
                        <p class="content text-wrap">{{params.domainName}}.ucarline.com</p>
                    </li>
                    <li class="info-item">
                        <label class="label">生效日期：</label>
                        <p class="content text-wrap">{{params.startTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">结束日期：</label>
                        <p class="content text-wrap">{{params.endTime|time}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">状态：</label>
                        <p class="content text-wrap status-box" :class="{green:params.status=='0'}">
                            {{params.status|status}}
                        </p>
                    </li>
                    <!-- <li class="info-item">
                        <label class="label">微信号：</label>
                        <p class="content text-wrap">{{params.contactsWx}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">QQ号：</label>
                        <p class="content text-wrap">{{params.contactsQq}}</p>
                    </li>
                    <li class="info-item">
                        <label class="label">邮箱：</label>
                        <p class="content text-wrap">{{params.email}}</p>
                    </li> -->
                    <li class="info-item">
                        <label class="label" style="padding-top:4px;">附件：</label>
                        <ul class="content pic text-wrap">
                            <li v-for="(item,index) of params.selectCertList" :key="index" class="content-pic-item">
                                <div class="content-row">
                                    <label>名称：</label>
                                    <p>{{item.certName}}</p>
                                </div>
                                <!-- <div class="content-row">
                                    <label>编码：</label>
                                    <p>{{item.certCode}}</p>
                                </div> -->
                                <div class="content-row">
                                    <label>照片：</label>
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
                            </li>
                        </ul>
                    </li>
                    <li class="info-item">
                        <label class="label">描述：</label>
                        <p class="content text-wrap">{{params.remark}}</p>
                    </li>
                </ul>
                <fleetEditForm :ref="formName" v-else :dataSource="currentEditParams"/>
            </div>
        </div>
        <GasStaPoiDetails :visible.sync="gasStaPoiVisible" :dataSource.sync="poiDisplayParams" />
    </div>
</template>

<script>
    import { getTenantById,updateTenant } from '@/api/tenant'
    import { mapGetters } from 'vuex'
    import platEditForm from './components/platEditForm'
    import gasStaEditForm from './components/gasStaEditForm'
    import fleetEditForm from './components/fleetEditForm'
    import GasStaPoiDetails from './components/GasStaPoiDetails'
    import commonMixins from './mixins'
    export default {
        mixins:[commonMixins],
        data() {
            return {
                showImage:false,
                isUpdate:false,
                gasStaPoiVisible:false,
                saveLoading:false,
                formName:'form',
                currentEditParams:{},
                params:{},
                poiDisplayParams:{},
            }
        },
        computed:{
            ...mapGetters(['tenantId','tenantType','natureType']),
        },
        mounted(){
            this.handleSearch()
        },
        methods: {
            //修改按钮
            modifyButton(){ 
                this.currentEditParams = { ...this.params }
                this.isUpdate = true;
            },
            //查询信息
            handleSearch(){
                getTenantById(this.tenantId).then(response => {
                    this.params = response.data.data
                    this.currentEditParams = { ...this.params }
                    this.showImage = true
                })
            },
            //保存
            handleSave(){
                const editForm = this.$refs[this.formName]
                const form = editForm.$refs[editForm.formName]
                form.validate(valid => {
                    if(valid){
                        this.saveLoading = true
                        let params = editForm.getParams()
                        updateTenant(params).then(response => {
                            if(response.data.data){
                                this.$message.success('保存成功')
                                this.isUpdate = false
                                // 判断当前用户是否已拉取完user_info信息
                                this.$store.dispatch('GetUserInfo').then(()=>{
                                    this.handleSearch()
                                })
                            }else{
                                this.$message.error(response.data.msg)
                            }
                        }).finally(()=>{
                            this.saveLoading = false
                        })
                    }
                })
            },
            //气站位置点击
            handleGasLocationClick(){
                this.poiDisplayParams = this.params
                this.gasStaPoiVisible = true
            },
            //获取预览列表
            getPreViewList(index,picIndex){
                let list = [...this.params.selectCertList[index].certPc.split(',')]
                let slice = list.splice(picIndex)
                return [ ...slice,...list ]
            },
        },
        components:{
            platEditForm,
            gasStaEditForm,
            fleetEditForm,
            GasStaPoiDetails,
        },
    }
</script>

<style lang="scss" scoped>
    .app-container{
        font-size:14px;
        color:rgba(0,0,0,0.65);
        margin:0;
        padding:0;
        background:transparent;
        .main{
            padding:24px;
            margin:24px;
            background:#FFF;
            .button-container{
                .buttons{
                    float: right;
                }
            }
            .info-list{
                color:rgba(0,0,0,0.65);
                clear:both;
                .info-item{
                    display:flex;
                    justify-content: flex-start;
                    align-items: stretch;
                    &:not(:first-child){
                        margin-top:24px;
                    }
                    .label{
                        width:100px;
                    }
                    .content{
                        &>*:not(:first-child){
                            margin-top:4px;
                        }
                        flex-grow:1;
                        justify-content: flex-start;
                        &.pic{
                            display:flex;
                            flex-flow:row wrap;
                            justify-content: flex-start;
                            align-items: stretch;
                            margin:0;
                            &>*{
                                margin-left:8px;
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
            }
        }
        .title{
            margin:0;
            padding:12px 20px;
            background:#FFF;
        }
        .poi-button{
            margin-bottom:12px;
            padding:0;
        }
    }
    
</style>