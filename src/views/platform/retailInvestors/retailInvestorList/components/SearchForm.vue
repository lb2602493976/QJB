<template>
  <!-- 查询和其他操作 -->
  <div class="filter-container">
    <div class="filters">
      <div class="filter">
        <label class="label">司机姓名：</label>
        <el-input
          v-model.trim="params.name"
          clearable
          class="filter-item"
          style="width: 200px;"
          size="small"
          placeholder="请输入司机姓名"
          @keyup.enter.native="handleSearch"
        />
      </div>
      <div class="filter">
        <label class="label">车牌号：</label>
        <el-input
          v-model.trim="params.carNum"
          clearable
          class="filter-item"
          style="width: 200px;"
          size="small"
          placeholder="请输入车牌号"
          @keyup.enter.native="handleSearch"
        />
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
</template>
<script>
import searchFormMixins from '@/mixins/searchForm'
export default {
  mixins: [searchFormMixins],
  data() {
    return {
      fleets: [],
      // 参数控制
      params: {
        name: '',
        carNum: ''
      },
      // 用于重置参数为初始值
      initParams: null
    }
  },
  created() {
    // 初始化数据
    this.initParams = { ...this.params }
    this.params = {}
  },
  mounted() {
    this.fleets = []
  },
  methods: {
    // 外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
    getformatdParams(params) {
      return params
    }
  }
}
</script>
<style lang="scss" scoped>
    .filter-container{
      margin:20px;
      margin-bottom:0;
      padding:0 24px 24px 0;
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
</style>
