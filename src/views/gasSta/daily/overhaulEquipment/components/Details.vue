<template>
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
        <el-col :span="labelSpan" class="label">故障部件：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.faultyParts }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">故障部件照片：</el-col>
        <el-col :span="contentSpan" class="content">
          <el-image
            style="width: 50px; height: 50px;cursor:pointer;"
            :src="params.faultyPic"
            :preview-src-list="[params.faultyPic]"
          />
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">报（检）修时间：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.repairTime }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">接报人：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.criminalPeople }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">故障原因：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.faultCause }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">原因及检修结果：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.faultResults }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">检修结果照片：</el-col>
        <el-col :span="contentSpan" class="content">
          <el-image
            style="width: 50px; height: 50px;cursor:pointer;"
            :src="params.resultPic"
            :preview-src-list="[params.resultPic]"
          />
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">检修人员：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.maintenancePeople }}</el-col>
      </el-row>
      <el-row type="flex" justify="space-between" class="row">
        <el-col :span="labelSpan" class="label">检修时间：</el-col>
        <el-col :span="contentSpan" class="content">{{ params.maintenanceTime }}</el-col>
      </el-row>
    </div>
  </el-drawer>
</template>

<script>
import { getTenantById } from '@/api/tenant'
import viewModalMixins from '@/mixins/viewModal'
export default {
  mixins: [viewModalMixins],
  data() {
    return {
      width: 400,
      size: 'small',
      labelSpan: 10,
      contentSpan: 18,
      params: {}
    }
  },
  computed: {
    title() {
      return '记录详情'
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
