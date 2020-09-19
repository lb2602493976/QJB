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
        <el-col :span="labelSpan" class="label">试验日期：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.experimentDate }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">试验设备：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.experimentDevice }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">软管名称：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.hoseName }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">型号类别：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.type }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">生产厂家：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.manufacturer }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">出厂日期：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.productionDate }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">启用日期：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.startUsingDate }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">环境温度：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.environmentTemperature }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">工作压力（MPg)：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.workPressure }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">试验压力（MPg)：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.testPressure }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">保压时间：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pressurizeMin }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">检查实况：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspection }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">试验结论意见：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.experimentVerdict }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">试验人签字：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.experimenter }}</el-col>
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
        labelSpan: 10,
        contentSpan: 14,
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
