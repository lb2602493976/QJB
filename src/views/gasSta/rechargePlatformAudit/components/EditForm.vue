<template>
  <!-- 新增修改界面 -->
  <el-drawer
    :title="title"
    :size="`${width}px`"
    :visible.sync="dialogVisible"
    :close-on-click-modal="false"
    :custom-class="'drawer-body'"
    @close="handleClose"
  >
    <div class="drawer-content">
      <div class="drawer-view">
        <h2 style="border-bottom: 1px solid #1890FF;margin-left: -1em;font-size: 0.8em;color: #1890FF">申请信息</h2>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">申请时间：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.createTime }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">申请方：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.payTenantName }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">充值金额：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.amount }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">充值方式：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.rechargeWay }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">交易流水号：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.serialNumber }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">打款账户：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.cashAccount }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">打款时间：</el-col>
           <el-col :span="contentSpan" class="content">{{params.paymentTime !== null ? moment(params.paymentTime).format('YYYY-MM-DD') : '-'}}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">附件照片：</el-col>
        <viewer style="z-index: 99999999">
            <img :src="params.photo" style="width: 50%">
          </viewer>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">备注：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.remark }}</el-col>
        </el-row>
        <br/>
        <div v-if="params.sta==='0'">
          <h2 style="border-bottom: 1px solid #1890FF;margin-left: -1em;color: #1890FF;font-size: 0.8em">审核信息</h2>
          <br/>
          <div >
            <el-form
              :ref="formName"
              :model="params"
              :rules="rules"
              :size="size"
              style="text-align:left;"
              :label-position="'top'"
              @keyup.enter.native="handleConfirm"
            >
              <el-form-item label="审核结论" prop="status" :label-width="formLabelWidth">
                <el-radio-group v-model.trim="params.status">
                  <el-radio label="1">审核通过</el-radio>
                  <el-radio label="2">审核拒绝</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
                <el-col>
                  <label class="el-form-item__label">
                    <span>审核描述</span>
                  </label>
                  <el-form-item prop="reason" :label-width="formLabelWidth">
                    <el-input v-model.trim="params.reason" placeholder="请输入" style="width: 280px"/>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </div>
        </div>
      </div>
      <div class="edit-footer end">
        <el-button :size="size" @click="handleClose">取消</el-button>
        <el-button :size="size" type="primary" @click="handleConfirm">确定</el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
  import viewModalMixins from '@/mixins/viewModal'
  import editFormMixins from '@/mixins/editForm'
  import moment from 'moment'
  export default {
    mixins: [viewModalMixins,editFormMixins],
    data() {
      return {
        moment,
        formName: 'form',
        width: 400,
        size: 'small',
        labelSpan: 6,
        contentSpan: 18,
        gutter: 50,
        formLabelWidth: '120px',
        params: {},
        rules: {
          status: [{
            required: true,
            message: '审核结论不能为空'
         }],
        },
      }
    },
    computed:{
      title(){
        // return this.page === 'poiDetails' ? '位置详情' : '车队账户'
        return '审核'
      },
    },
    mounted() {
      this.initParams = { ...this.params }
      if (this.isUpdate) {
        this.params = this.dataSource
      }
    },
    methods: {
      afterOpen(params){
        this.params.status = '1';
      },
      positionDetailsButton() {
        this.page = 'poiDetails'
      },
      // 外部最终获取到的内容
      getFormattedParams(params) {
        return {
          ...params,
        }
      },
    }
  }
</script>
<style lang="scss" scoped>
  .max{
    height:100%;
  }
  .drawer-content{
    height:calc(100vh - 44px);
    display:flex;
    flex-flow:column nowrap;
    align-items: stretch;
    overflow:auto;
    padding:0 24px 24px 24px;
    word-wrap: break-word !important;
    word-break:break-all !important;
    white-space: normal !important;
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
