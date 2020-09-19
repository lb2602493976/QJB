<template>
  <!-- 查询和其他操作 -->
  <div class="filter-container">
    <div class="filters">
      <div class="filter">
        <label class="label">巡查时间：</label>
        <el-date-picker
          v-model.trim="params.inspectionDate"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="选择日期">
        </el-date-picker>
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
      <!--        <el-button-->
      <!--          :loading="searchLoading"-->
      <!--          class="filter-item"-->
      <!--          type="primary"-->
      <!--          icon="el-icon-refresh"-->
      <!--          size="small"-->
      <!--          @click="handleReset"-->
      <!--        >-->
      <!--          重置-->
      <!--        </el-button>-->
    </div>
  </div>
</template>
<script>
  import searchFormMixins from '@/mixins/searchForm'
  export default {
    mixins: [searchFormMixins],
    data() {
      return {
        params: {
          inspectionDate:""
        },
        show: false,
        // 用于重置参数为初始值
        value: '',
      }
    },
    created(){
      // 初始化数据
      this.initParams = { ...this.params }
      this.params = {}
    },
    methods: {
      getformatdParams(params) {
        return params
      },
      // 外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
      editButton() {
        this.$parent.editButton()
      },
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
