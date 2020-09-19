<template>
  <!-- 新增修改界面 -->
  <el-drawer :title="title" :size="`${width}px`" :visible.sync="dialogVisible" :close-on-click-modal="false"
    :custom-class="'drawer-body'" @close="handleClose">
    <div v-if="page === 'details'" class="drawer-content">
      <div class="drawer-view">
        <el-row type="flex" justify="start">
          <el-col style="padding:0 24px;">
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">用户名：</el-col>
              <el-col :span="contentSpan" class="content">{{params.userName}}</el-col>
            </el-row>
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
              <el-col :span="contentSpan" class="content">
                <el-button v-show="params.location" class="text-wrap" type="text" ghost @click="positionDetailsButton"
                  style="padding:0;text-align:left">
                  {{ params.location }}>
                </el-button>
                <div v-show="params.location" style="margin-top:4px;">
                  {{ `纬度:${params.lat},经度:${params.lng}` }}
                </div>
              </el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">气站负责人：</el-col>
              <el-col :span="contentSpan" class="content">{{params.contacts}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">手机号码：</el-col>
              <el-col :span="contentSpan" class="content">{{params.contactsTel}}</el-col>
            </el-row>
            <!-- <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">微信号：</el-col>
              <el-col :span="contentSpan" class="content">{{params.contactsWx}}</el-col>
            </el-row>
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">QQ号：</el-col>
              <el-col :span="contentSpan" class="content">{{params.contactsQq}}</el-col>
            </el-row> -->
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">域名：</el-col>
              <el-col :span="contentSpan" class="content">{{ params.domainName }}.ucarline.com</el-col>
            </el-row>
            <template v-if="params.auditStatus==='1'">
              <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">生效日期：</el-col>
                <el-col :span="contentSpan" class="content">{{ params.startTime }}</el-col>
              </el-row>
              <el-row type="flex" justify="space-between" class="row">
                <el-col :span="labelSpan" class="label">结束日期：</el-col>
                <el-col :span="contentSpan" class="content">{{ params.endTime }}</el-col>
              </el-row>
            </template>
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">气站状态：</el-col>
              <el-col :span="contentSpan" class="content">
                <span class="status-box" :class="{ green:params.status==0 }" style="float:left">
                  {{ params.status | status }}
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
                                  ref="el-image"
                                  v-for="(pic,picIndex) of item.certPc.split(',')"
                                  :key="picIndex"
                                  style="width: 32px; height: 32px"
                                  :src="pic || defaultPic" 
                                  :preview-src-list="pic ? getPreViewList(index,picIndex) : []"
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
            <el-row type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">审核结果：</el-col>
              <el-col :span="contentSpan" class="content">{{params.auditStatus | auditStatus}}</el-col>
            </el-row>
            <el-row v-if="params.auditStatus!='0'" type="flex" justify="space-between" class="row">
              <el-col :span="labelSpan" class="label">审核描述：</el-col>
              <el-col :span="contentSpan" class="content">{{params.auditRemark}}</el-col>
            </el-row>
          </el-col>
          <el-col style="padding:0 24px;">
            <el-form :ref="formName" :model="formData" :rules="rules" :size="size" style="text-align:left;margin-top:24px;"
              :label-position="'top'" @keyup.enter.native="handleConfirm">
              <el-form-item v-if="params.auditStatus==='0'" label="审核结论" prop="auditStatus" :label-width="formLabelWidth">
                <el-radio-group v-model.trim="formData.auditStatus">
                  <el-radio label="1">审核通过</el-radio>
                  <el-radio label="2">审核拒绝</el-radio>
                </el-radio-group>
              </el-form-item>
              <template v-if="params.auditStatus==='1' || formData.auditStatus==='1'">
                <el-form-item label="生效日期" prop="startTime" :label-width="formLabelWidth">
                    <el-date-picker @change="handleDateChange" v-model.trim="formData.startTime" style="width:100%" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择生效日期" />
                </el-form-item>
                <el-form-item label="结束日期" prop="endTime" :label-width="formLabelWidth">
                    <el-date-picker @change="handleDateChange" v-model.trim="formData.endTime" style="width:100%" type="datetime" format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期时间" />
                </el-form-item>
                <el-form-item label="平台状态" prop="status" :label-width="formLabelWidth">
                    <el-radio-group v-model.trim="formData.status">
                    <el-radio label="0">正常</el-radio>
                    <el-radio label="9">冻结</el-radio>
                    </el-radio-group>
                </el-form-item>
              </template>
              <el-form-item v-if="params.auditStatus != '2'" label="审核描述" prop="auditRemark" :label-width="formLabelWidth">
                <el-input v-model.trim="formData.auditRemark" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入" />
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </div>
      <div class="edit-footer end" v-if="params.auditStatus != '2'">
        <el-button :size="size" @click="handleClose">取消</el-button>
        <el-button :size="size" type="primary" :loading="confirmLoading" @click="handleConfirm">提交</el-button>
      </div>
    </div>
    <div v-else-if="page === 'poiDetails'" class="drawer-content">
      <div style="padding:0 30px;">
        <el-button style="padding:0;float:right" type="text" ghost @click="page = 'details'">
          返回
        </el-button>
      </div>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="poiLabelSpan" class="label">企业代码：</el-col>
        <el-col :span="poiContentSpan" class="content">{{params.enterpriseCode}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="poiLabelSpan" class="label">气站名称：</el-col>
        <el-col :span="poiContentSpan" class="content">{{params.tenantName}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="poiLabelSpan" class="label">气站位置：</el-col>
        <el-col :span="poiContentSpan" class="content">{{params.location}}</el-col>
      </el-row>
      <el-row class="row">
        <BMapPoiDisplay :dataSource="poi"
          :custom-style="{height:`${poiWidth - 48}px`,padding:'24px',boxSizing:'border-box'}" 
        />
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
  import viewModalMixins from '@/mixins/viewModal'
  import commonMixins from '../mixins'
  import BMapPoiDisplay from '@/components/BMapPoiDisplay'
  import moment from 'moment'
  export default {
    mixins: [viewModalMixins, commonMixins],
    props:{
        confirmLoading:{
          type:Boolean,
          default:false,
        },
    },
    data() {
      const timeValidator = (rule,val,callback) =>{
        if(this.formData.startTime && this.formData.endTime){
          if(moment(this.formData.startTime) < moment(this.formData.endTime)){
            return callback()
          }else{
            return callback(new Error('生效日期不能大于结束日期'))
          }
        }else{
          callback()
        }
      }
      return {
        formName: 'form',
        formLabelWidth: '120px',
        page: 'details',
        poiWidth:400,
        width: 800,
        size: 'small',
        labelSpan: 6,
        contentSpan: 18,
        poiLabelSpan:3,
        poiContentSpan:21,
        params: {
            enterpriseCode:'',
            tenantName:'',
            contacts:'',
            contactsTel:'',
            contactsWx:'',
            contactsQq:'',
            domainName:'',
            certificates:'',
            startTime:'',
            endTime:'',
            status:'',
            location:'',
            lat:'',
            lng:'',
        },
        formData: {
          auditStatus: '',
          startTime: '',
          endTime: '',
          status: '',
          auditRemark: '',
        },
        rules: {
          auditStatus: [{
            required: true,
            message: '请选择审核结论'
          },{
            pattern:/(?!0)[0-9]/,
            message:'请选择审核结论',
          }],
          startTime: [{
            required: true,
            message: '生效日期不能为空'
          },{
            validator:timeValidator,
            trigger:'',
          }],
          endTime: [{
            required: true,
            message: '结束日期不能为空'
          },{
            validator:timeValidator,
            trigger:'',
          }],
          status: [{
            required: true,
            message: '平台状态不能为空'
          }],
          // auditRemark: [{
          //   required: true,
          //   message: '审核描述不能为空'
          // }],
        },
      }
    },
    computed: {
      title() {
        return '租户审核'
      },
      defaultPic(){
        return require('@/assets/avatar/595ba7b05f2e485eb50565a50cb6cc3c.jpeg')
      },
      poi() {
        if (this.params.lat && this.params.lng) {
          return {
            lat: this.params.lat,
            lng: this.params.lng
          }
        }
        return null
      },
    },
    methods: {
      afterOpen(params){
        this.formData = { ...params }
        this.formData.auditStatus = params.auditStatus
        this.formData.startTime = params.startTime
        this.formData.endTime = params.endTime
        this.formData.status = params.status
        this.formData.auditRemark = params.auditRemark
      },
      handleConfirm() {
          this.$refs[this.formName].validate(passed=>{
              if(passed){
                  this.$emit('ok',{...this.formData,id:this.params.tenantId})
              }
          })
      },
      positionDetailsButton() {
        this.page = 'poiDetails'
      },
      handleDateChange(){
        let form = this.$refs[this.formName]
        if(form){
          form.validateField('startTime')
          form.validateField('endTime')
        }
      },
      //获取预览列表
      getPreViewList(index,picIndex){
        let list = [...this.params.certList[index].certPc.split(',')]
        let slice = list.splice(picIndex)
        return [ ...slice,...list ]
      },
    },
    components: {
      BMapPoiDisplay,
    },
  }

</script>
<style lang="scss" scoped>
  .max {
    height: 100%;
  }
  .row {
    &:not(:first-child) {
      margin-top: 12px;
    }

    .label {
      font-size: 14px;
      font-weight: bold;
    }

    .content {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
      font-weight: normal;
      text-align: left;
      padding-left: 8px;
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
