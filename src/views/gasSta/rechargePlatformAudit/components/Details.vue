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
      <h2 style="border-bottom: 1px solid #1890FF;margin-left: 0em;font-size: 0.8em;color: #1890FF">申请信息</h2>
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
      <br/>
      <div v-if="params.sta!=='0'">
        <h2 style="border-bottom: 1px solid #1890FF;margin-left: -1em;color: #1890FF;font-size: 0.8em">审核信息</h2>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">审核状态：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.status ==='0' ? '待确认' : params.status ==='1' ? '审核通过' : '审核不通过' }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">审核说明：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.reason }}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">审核时间：</el-col>
          <el-col :span="contentSpan" class="content">{{ params.auditTime }}</el-col>
        </el-row>
      </div>
    </div>
  </el-drawer>
</template>

<script>
import viewModalMixins from '@/mixins/viewModal'
import moment from 'moment'
export default {
  mixins: [viewModalMixins],
  data() {
    return {
      moment,
      width: 400,
      size: 'small',
      labelSpan: 6,
      contentSpan: 18,
      params: {},
      id: ''
    }
  },
  computed:{
    title(){
      // this.getDetail(this.params.id);
      // return this.page === 'poiDetails' ? '位置详情' : '车队账户'
      return '申请审核信息'
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    // getDetail(id) {
    //   getCarAccountDetail({id}).then(response => {
    //
    //   })
    // },
    positionDetailsButton() {
      this.page = 'poiDetails'
    }
  }
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
