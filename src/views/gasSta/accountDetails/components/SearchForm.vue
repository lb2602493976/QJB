<template>
  <!-- 查询和其他操作 -->
  <div class="prev-info-container">
    <el-row type="flex" justify="space-between" class="row">
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">平台名称：</label>
        <span class="content">{{params.name}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">企业代码：</label>
        <span class="content">{{params.enterpriseCode}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">账户编号：</label>
        <span class="content">{{params.accountCode}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">账户余额：</label>
        <span class="content">￥{{params.amount}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">欠款余额：</label>
        <span class="content">￥{{params.oweBalance}}</span>
      </el-col>
<!--      <el-col class="col" style="margin-top: -7px;">-->
<!--        <el-button-->
<!--          class="filter-item"-->
<!--          size="small"-->
<!--          type="primary"-->
<!--          @click="handleSearch"-->
<!--        >-->
<!--          还款-->
<!--        </el-button>-->
<!--      </el-col>-->
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
      labelWidth:80,
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
  .prev-info-container{
    margin:24px;
    padding:12px 24px 24px 24px;
    background:#FFF;
    .row{
      margin-top:20px;
      .col{
        display:flex;
        justify-content: flex-start;
        align-items: stretch;
        .label{
          text-align:right;
          font-weight:bold;
          display: inline-block;
        }
        .content{
          font-size:14px;
          color:rgba(0,0,0,0.65);
        }
      }
    }
  }

</style>
