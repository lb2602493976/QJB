<template>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <div class="filters">
        <div class="filter">
          <label class="label">文件名：</label>
          <el-input
            v-model.trim="params.fileName"
            clearable
            class="filter-item"
            style="width: 200px;"
            size="small"
            placeholder="请输入文件名"
            @keyup.enter.native="handleSearch"
          />
        </div>
        <div class="filter">
          <label class="label">对账日期：</label>
          <el-date-picker
            v-model.trim="params.checkTime"
            style="width: 200px;"
            class="filter-item"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择对账日期"
            @keyup.enter.native="handleSearch"
          />
        </div>
        <div class="filter">
          <label class="label">对账结果：</label>
          <el-select v-model.trim="params.checkResult" clearable filterable placeholder="请选择" size="small" class="filter-item" style="width: 200px;">
            <el-option
              v-for="item in reConciliationRes"
              :key="item.id"
              :label="item.itemText"
              :value="String(item.itemValue)"
            />
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
</template>
<script>
    import searchFormMixins from '@/mixins/searchForm'
    export default {
        mixins:[ searchFormMixins ],
        props:{
          reConciliationRes:{
            type:Array,
            default(){
              return []
            }
          }
        },
        data(){
          return {
            //参数控制
            params:{
              fileName:'',
              checkTime:'',
              checkResult:'',
            },
            //用于重置参数为初始值
            initParams:null,
          }
        },
        created(){
            // 初始化数据
            this.initParams = { ...this.params }
        },
        methods: {
            //外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
            getformatdParams(params){
                return params
            },
        },
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