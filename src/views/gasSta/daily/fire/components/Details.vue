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
        <el-col :span="labelSpan" class="label">巡查时间：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspectionTime }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">有无违章用火用电：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.fireElectric === '1' ? '有' : '无' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">安全出口疏散通道是否通畅：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.safetyExit === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">安全疏散标志、应急照明是否完好：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.safetyEvacuation === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">消防设施器材是否完好 ：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.fireFidevice === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">常闭式防火门是否处于关闭状态 ：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.fireDoor === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">防火卷帘下是否堆放物品影响使用 ：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.fireCurtain === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">消防安全重点人员是否在位：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.fireSafety === '1' ? '是' : '否' }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">巡查人员：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.inspectionPersonnel }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">主管人员：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.executive }}</el-col>
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
      labelSpan: 24,
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
