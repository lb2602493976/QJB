<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">收入分类明细</h3>
    <SearchForm ref="searchForm"  @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>明细列表</span>
      </div>
      <Table show-summary v-loading="loading" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
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
        
        <el-table-column label="加气类型" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ 'LNG' }}</span>
          </template>
        </el-table-column>

        <el-table-column label="现金（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="pos机（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="会员卡（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.cardLocation }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现金优惠" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="货车帮" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信转付、其他（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信公户" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宝兑通" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="油饱饱" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宝兑通外会员" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="预存金额" align="center">
          <el-table-column label="现金" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公户转账" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="私户转账" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="pos常用" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="公户微信" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="微信" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="欠款" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="充值" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="实际入账" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="。" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="当前合计（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="现金合计（元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="日销液统计（KG）" width="160" align="center">
          <el-table-column label="会员卡加液（KG）" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="内用卡加液（KG）" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="合计加液（KG）" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ 1 }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="平均单价（KG/元）" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
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