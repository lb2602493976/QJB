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
        <el-col :span="contentSpan" class="content">{{ params.inspectTime }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">储罐液位表/mm：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.tankLevelGauge }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">储罐后压表1/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.tankBackPressure1 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">储罐后压表2/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.tankBackPressure2 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">1#泵前压力/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pressureBeforePump1 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">1#泵后压力/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pressureAfterPump1 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">2#泵前压力/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pressureBeforePump2 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">2#泵后压力/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pressureAfterPump2 }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">仪表风压/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.airPressure }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">泵撬是否正常：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.pumpSkid === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">发电机房/变压器是否正常：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.generatorRoom === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">空压机压力/MPa：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.airCompressorPressure }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">监控设备是否正常：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.watchdog === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">巡查人员：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspector }}</el-col>
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
        labelSpan: 16,
        contentSpan: 18,
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
