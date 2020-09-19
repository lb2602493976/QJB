<template>
  <!-- 查询和其他操作 -->
    <div class="filter-container">
      <el-row :gutter="0">
        <el-col :span="4">
          <div class="grid-content">
            <div class="filter">
              <label class="label">车队名称：{{params.name}}</label>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="filter">
              <label class="label">车队编号：{{params.code}}</label>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content">
            <div class="filter">
              <label class="label">账户余额：{{params.amount}}</label>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
</template>
<script>
import searchFormMixins from '@/mixins/searchForm'
export default {
  mixins: [searchFormMixins],
  data() {
    return {
      params: this.$parent.fleetList,
      show: false,
      // 用于重置参数为初始值
      options: [],
      orgId: '',
      enterpriseCode: '', // 企业代码
      code: '', // 车队编号
      recharge: '', // 账户余额
      tenantId: '',
      // fleetList: this.$parent.fleetList
    }
  },
  created() {
    // 初始化数据
    // console.log(this.$parent.fleetList)
  },
  methods: {
    getformatdParams(params) {
      return params
    },
  }
}
</script>
<style lang="scss" scoped>
    .filter-container{
      width: 100%;
      margin:20px;
      margin-bottom:0;
      padding:0px 0;
      background:#FFF;
      /*display:flex;*/
      /*justify-content: space-between;*/
      align-items: stretch;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    /*.grid-content {*/
    /*  min-height: 36px;*/
    /*}*/

    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      border-radius: 4px;
      margin-left: -6%;
    }
    .grid-content {
      border-radius: 4px;
      min-height: 36px;
    }
</style>
