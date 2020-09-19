<template>
  <!-- 查询和其他操作 -->
  <div>
    <div class="filter-container">
      <div class="filters">
        <div class="filter">
          <label class="label">平台名称：</label>
          <el-input
            v-model.trim="params.name"
            clearable
            class="filter-item"
            style="width: 200px;"
            size="small"
            placeholder="请输入账户名称"
            @keyup.enter.native="handleSearch"
          />
          <label class="label" style="margin-left: 10px">是否欠款：</label>
          <el-select clearable placeholder="类型"  v-model="params.ifOwe" size="small" style="width: 230px;margin-left: 10px">
            <el-option label="未欠款" value="0"/>
            <el-option label="欠款" value="1"/>
          </el-select>
        </div>
      </div>
      <div class="buttons">
        <el-button
          :loading="searchLoading"
          class="filter-item"
          size="small"
          type="primary"
          icon="el-icon-search"
          @click="handleSearch"
        >
          查询
        </el-button>
        <el-button
          :loading="searchLoading"
          class="filter-item"
          type="primary"
          icon="el-icon-refresh"
          size="small"
          @click="handleReset"
        >
          重置
        </el-button>
      </div>
    </div>
<!--    <div class="filter-container1">-->
<!--      <template v-if="show">-->
<!--        <div class="filter">-->
<!--          <span class="label">账户余额：</span>-->
<!--          <span class="label">￥{{ this.recharge }}</span>-->
<!--          <el-link type="primary" style="margin-left: 10px" @click="editButton">充值申请</el-link>-->
<!--        </div>-->
<!--        <div class="filter">-->
<!--          <span class="label">车队编号：</span>-->
<!--          <span class="label">{{ code }}</span>-->
<!--        </div>-->
<!--        <div class="filter">-->
<!--          <span class="label">企业代码：</span>-->
<!--          <span class="label">{{ enterpriseCode }}</span>-->
<!--        </div>-->
<!--      </template>-->
<!--    </div>-->
  </div>
</template>
<script>
import searchFormMixins from '@/mixins/searchForm'
export default {
  mixins: [searchFormMixins],
  data() {
    return {
      params: {
        name:'',
        ifOwe:''
      },
      show: false,
      // 用于重置参数为初始值
      options: [],
      orgId: '',
      enterpriseCode: '', // 企业代码
      code: '', // 车队编号
      recharge: '', // 账户余额
      tenantId: ''
    }
  },
  created() {
    // 初始化数据
  },
  methods: {
    getformatdParams(params) {
      return params
    },
    editButton() {
      this.$parent.editButton()
    },
    changevalue(value) {
      const data = this.options.filter((item) => item.value === value)
      if (data.length === 1) {
        this.parentTenantId = data[0].parentTenantId
        this.enterpriseCode = data[0].enterpriseCode
        this.code = data[0].code
        this.recharge = data[0].recharge
        this.$parent.handleSearch()
        this.show = true
      }
    },
  }
}
</script>
<style lang="scss" scoped>
    .filter-container{
      margin:20px;
      margin-bottom:0;
      padding:24px 0;
      background:#FFF;
      display:flex;
      justify-content: space-between;
      align-items: stretch;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    .filter-container1{
      margin:0 20px 20px 20px;
      margin-bottom:0;
      padding:0 0 24px 0;
      background:#FFF;
      display:flex;
      align-items: stretch;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
    }
    .el-icon-arrow-down {
      font-size: 12px;
    }
</style>
