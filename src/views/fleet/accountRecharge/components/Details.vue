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
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">车队编号：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.enterpriseCode }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">企业代码：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.name }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">车队名称：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.contacts }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">卡号/账户：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.contactsTel }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">余额：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.contactsWx }}</el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import viewModalMixins from '@/mixins/viewModal'
export default {
  mixins: [viewModalMixins],
  data() {
    return {
      width: 400,
      size: 'small',
      labelSpan: 6,
      contentSpan: 18,
      params: {}
    }
  },
  computed:{
    title(){
      // return this.page === 'poiDetails' ? '位置详情' : '车队账户'
      return '车队账户'
    },
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    positionDetailsButton() {
      this.page = 'poiDetails'
    }
  }
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
        }
    }

</style>
