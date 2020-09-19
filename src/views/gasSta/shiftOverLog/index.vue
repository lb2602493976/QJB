<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <el-button @click="$router.push('/gasSta/shiftOver')" type="text" icon="el-icon-back" ghost>返回</el-button>
      <el-divider direction="vertical"></el-divider>
      <span>交班日志</span>
    </h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>班次列表</span>
      </div>
      <Table v-loading="loading" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="交班人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.includingPeople }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="交班时间" width="180" align="center">
          <template slot-scope="scope">
            <span>{{ moment(scope.row.createTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          </template>
        </el-table-column>

        <el-table-column label="总销售额（元）" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.totalAmount) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备用金（元）" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.pettyCash) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="储罐剂余量/kg" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.surplus) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="气枪总读数/kg" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.gasTotal) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="本班销售气量/kg" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.salesVolume) }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="本班预充值（元）" align="center">
          <template slot-scope="scope">
            <span>{{ Number(scope.row.totalRecharge) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="showDetailsButton(scope.row)" type="text">查看详情</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <Details :payTypes="payTypes" :visible.sync="detailsVisible" :dataSource.sync="currentEditParams"/>
  </div>
</template>

<script>
import { getlogList } from '@/api/shiftOver'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import Details from './components/Details'
import moment from 'moment'
export default {
  data() {
    return {
      moment,
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      payTypes:[],
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  created(){
    this.getDict('支付方式').then(res=>{
      this.payTypes = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
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
      return getlogList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    //删除
    handleDelete(row){
      const that = this
      this.$confirm('此操作将删除记录, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteApi(row.id).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功'})
            that.handleSearch()
          } else {
            this.$message({type: 'error',message: response.data.msg})
          }
        })
      })
    },
    //表格行点击
    showDetailsButton(row){
      this.currentEditParams = { ...row }
      this.detailsVisible = true
    },
    // 编辑界面
    editButton(row){
      this.currentEditParams = { ...row }
      this.editVisible = true
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
    Details,
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