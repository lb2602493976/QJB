<template>
    <!-- 查询和其他操作 -->
  <div class="prev-info-container">
    <el-row type="flex" justify="space-between" class="row">
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">企业代码：</label>
        <span class="content">{{params.enterpriseCode}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">气站名称：</label>
        <span class="content">{{params.tenantName}}</span>
      </el-col>
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">当前气价：</label>
        <span class="content">{{params.gasPrices}}</span>
      </el-col>
    </el-row>
    <el-row type="flex" justify="space-between" class="row1">
      <el-col class="col">
        <label :style="{ width:`${ labelWidth }px`}" class="label">调整日期：</label>
        <el-date-picker
          v-model.trim="params.experimentDate"
          type="daterange"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
      </el-col>
      <el-col class="col" :span="10">
        <el-button
          :loading="searchLoading"
          size="small"
          icon="el-icon-search"
          @click="handleSearch"
        >
          查询
        </el-button>
        <el-button
          size="small"
          type="primary"
          @click="setPrice"
        >
          {{showBtnText}}
        </el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import { getGasoline } from '@/api/gasolinePrice'
    import searchFormMixins from '@/mixins/searchForm'
    export default {
        mixins:[ searchFormMixins ],
        data(){
          return {
            //参数控制
            params:{
              code:'',
              tenantName:'',
              gasPrices:''
            },
            labelWidth:80,
            listData:'',
            //用于重置参数为初始值
            initParams:null,
            showBtnText:'设置',
            price:'',
          }
        },
        created(){
            this.handleInitInfo();
            console.log(this.currentEditParams)
            // 初始化数据
            this.initParams = { ...this.params }
        },
        methods: {
            //外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
            getformatdParams(params){
                return params
            },
            handleInitInfo(){
              getGasoline({}).then(response => {
                this.params.tenantName = response.data.data.tenantName
                this.params.code = response.data.data.code
                this.params.enterpriseCode = response.data.data.enterpriseCode
                if(response.data.data.gasPrices!=='' && response.data.data.gasPrices!==undefined){
                  this.params.gasPrices = response.data.data.gasPrices
                  this.showBtnText='调整当前气价'
                }
              })
            },
            setPrice(){
              this.$parent.showModil();
              this.$parent.currentEditParams = {
                'tenantName':this.params.tenantName,
                'code':this.params.code,
                'enterpriseCode':this.params.enterpriseCode,
                'gasPrices':this.params.gasPrices
              }
            },
        },
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
    .row1{
      margin-top:20px;
      .col{
        /*display:flex;*/
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
