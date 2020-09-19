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
    <div v-if="page === 'details'" class="drawer-content">
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">巡检时间：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspectionDate }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">器材名称：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.equipmentName }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">位置：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.place }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">型号规格：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.typeSpecification }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">数量：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.amount }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">有效日期：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.effectiveDate }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">检查结果：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspectionResult === '1' ? '正常' : '异常'}}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">巡查人员：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspectionPersonnel }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">备注：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.remark }}</el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
  import viewModalMixins from '@/mixins/viewModal'
  import commonMixins from '../mixins'
  export default {
    components: {
    },
    mixins: [viewModalMixins, commonMixins],
    data() {
      return {
        page: 'details',
        width: 400,
        size: 'small',
        labelSpan: 4,
        contentSpan: 20,
        params: {}
      }
    },
    computed: {
      title() {
        // return this.page === 'poiDetails' ? '位置详情' : '车队账户'
        return '防火巡查记录详情'
      },
      poi() {
        if (this.params.lat && this.params.lng) {
          return { lat: this.params.lat, lng: this.params.lng }
        }
        return null
      }
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
