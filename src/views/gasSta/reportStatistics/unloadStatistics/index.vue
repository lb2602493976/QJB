<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">卸车统计</h3>
    <SearchForm ref="searchForm"  @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>统计列表</span>
      </div>
      <Table v-loading="loading" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="日期" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gasCardnum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出厂时间" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车牌号" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="挂车号" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="液厂名称" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="损耗量" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出厂净重" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="卸车员" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出厂单价" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
</template>

<script>
import { searchApi,createApi,updateApi,deleteApi } from '@/api/gasCard'
import { searchApi as thirdPlatSearchApi} from '@/api/thirdPlatform' 
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
export default {
  data() {
    return {
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    // 格式化查询参数
    getFormatedSearchParams(){
      let searchForm = this.$refs['searchForm']
      let params = searchForm.getParams()
      const query = new URLSearchParams()
      for(let [key,val] of Object.entries(params)){
        if(val) query.append(key,val)
      }
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      query.append('tenantId', this.tenantId)
      return { query,params }
    },
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return searchApi(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    // 查询重置之前
    handleBeforeSearch(){
      this.currentPage = 1
    },
  },
  watch:{
      currentPage(newVal,oldVal){
        if(newVal!==oldVal){
          this.handleSearch()
        }
      },
      pageSize(val){
        if(this.currentPage===1) this.handleSearch()
        else this.currentPage = 1
      }
    },
  components:{
    SearchForm,
    Table,
  },
}
</script>
<style lang="scss" scoped>
  .app-container{
    margin:0;
    padding:0;
    background:transparent;
    .title{
      margin:0;
      padding:12px 20px;
      background:#FFF;
    }
    .main{
      padding:24px;
      margin:20px;
      background:#FFF;
      margin-bottom:0;
      .header{
        margin-bottom:12px;
        display:flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
</style>