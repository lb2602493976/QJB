<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">出库库存明细</h3>
    <SearchForm ref="searchForm"  @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>明细列表</span>
      </div>
      <Table height="600px" v-loading="loading" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="班次时间" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班次负责人" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="枪号" min-width="160" align="center">
          <template slot-scope="scope">
            <ul class="gunList">
              <li class="gunItem" v-for="(item,index) of logGuns" :key="`gunName`+index">
                <span class="text-nowrap">{{item.gunName}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="接班读数" min-width="160" align="center">
          <template slot-scope="scope">
            <ul class="gunList">
              <li class="gunItem" v-for="(item,index) of logGuns" :key="`gunName`+index">
                <span class="text-nowrap">{{item.a}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="交班读数" min-width="160" align="center">
          <template slot-scope="scope">
            <ul class="gunList">
              <li class="gunItem" v-for="(item,index) of logGuns" :key="`gunName`+index">
                <span class="text-nowrap">{{item.b}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="本期读数" min-width="160" align="center">
          <template slot-scope="scope">
            <ul class="gunList">
              <li class="gunItem" v-for="(item,index) of logGuns" :key="`gunName`+index">
                <span class="text-nowrap">{{item.c}}</span>
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="计量数" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="进液" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="接班量" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="交班量" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="售气量" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="损耗（+为损，-为盈）" min-width="200px" align="center">
          <template slot-scope="scope">
            <span>{{ '1-1' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" min-width="200px" align="center">
          <template slot-scope="scope">
            <pre>{{ '1-1' }}</pre>
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
      logGuns:[
        {gunName:'L1',a:'513651351.54',b:'651515135.56',c:'48484486.45'},
        {gunName:'L2',a:'513651351.54',b:'651515135.56',c:'48484486.45'},
        {gunName:'L3',a:'513651351.54',b:'651515135.56',c:'48484486.45'},
        {gunName:'L4',a:'513651351.54',b:'651515135.56',c:'48484486.45'},
      ],
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
    .gunList{
      display:flex;
      flex-flow:column nowrap;
      justify-content: flex-start;
      align-items: stretch;
      .gunItem{
        flex-grow:1;
        display:table;
        &:not(:first-child){
          border-top:1px solid #DDD;
        }
        padding:8px 0;
        span{
          display:table-cell;
          text-align:center;
          vertical-align: middle;
        }
      }
    }
  }
</style>