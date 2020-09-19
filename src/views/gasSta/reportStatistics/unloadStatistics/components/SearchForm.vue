<template>
    <!-- 查询和其他操作 -->
    <div class="filter-container">
      <div class="filters">
        <div class="filter">
          <label class="label">日期：</label>
          <el-date-picker
            v-model.trim="params.inspectionTime"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="filter">
          <label class="label">出厂时间：</label>
          <el-date-picker
            v-model.trim="params.inspectionTime"
            type="date"
            size="small"
            value-format="yyyy-MM-dd"
            placeholder="选择日期">
          </el-date-picker>
        </div>
        <div class="filter">
          <label class="label">车牌号：</label>
          <el-input
            v-model.trim="params.gasCardnum"
            clearable
            class="filter-item"
            style="width: 200px;"
            size="small"
            placeholder="请输入车牌号"
            @keyup.enter.native="handleSearch"
          />
        </div>
        <div class="filter">
          <label class="label">液厂名称：</label>
          <el-input
            v-model.trim="params.gasCardnum"
            clearable
            class="filter-item"
            style="width: 200px;"
            size="small"
            placeholder="请输入液厂名称"
            @keyup.enter.native="handleSearch"
          />
        </div>
        <!-- <div class="filter">
          <label class="label">用户类别：</label>
          <el-select 
            v-model.trim="params.cardType"
            clearable 
            filterable 
            laceholder="请选择"
            size="small" 
            class="filter-item" 
            style="width: 200px;"
          >
            <el-option
              v-for="(item,index) in []"
              :key="index"
              :label="item.itemText"
              :value="item.itemValue"
            />
          </el-select>
        </div> -->
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
        data(){
          return {
            //参数控制
            params:{
              gasCardnum:'',
              cardLocation:'',
              cardType:'',
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
      align-items: flex-end;
      .buttons{
        display:flex;
        flex-flow:row nowrap;
        align-items: flex-end;
        margin:0 24px;
      }
      .filter{
        margin-left:24px;
      }
    }
</style>