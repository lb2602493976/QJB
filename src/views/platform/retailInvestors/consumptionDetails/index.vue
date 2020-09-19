<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <el-button @click="$router.push('/retailInvestors/retailInvestorList')" icon="el-icon-back" type="text" ghost>返回</el-button>
      <el-divider direction="vertical"></el-divider>
      <span>散户消费明细</span>
    </h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>消费明细列表</span>
        <el-button @click="handleExport">导出</el-button>
      </div>
      <Table :height="500" v-loading="loading" @row-click="handleTableRowClick" ref="table">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="消费时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.time }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车牌号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.carNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="昵称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.nickname }}</span>
          </template>
        </el-table-column>

        <el-table-column label="消费气站" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="枪号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gasGun }}</span>
          </template>
        </el-table-column>

        <el-table-column label="挂牌价" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.curprice }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="气量" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sales }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="总金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.curMoney }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="单价优惠" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realDiscount }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="总优惠" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.totalDiscount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="实付金额" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.payAmount }}</span>
          </template>
        </el-table-column>

        <el-table-column label="流水号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.serialNumber }}</span>
          </template>
        </el-table-column>
      </Table>
    </div>
  </div>
</template>

<script>
import { fetchRetailInvestorDetails } from '@/api/retailInvestors'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
export default {
  data() {
    return {
      operationPermissions:['2'],  //租户类型
      currentPage: 1,
      pageSize: 10,
      loading: false,
    }
  },
  computed:{
    ...mapGetters(['tenantType']),
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      return fetchRetailInvestorDetails(this.$route.params.id).then(response => {
        this.loading = false
        let data = response.data.data
        table.complete({data})
        return data
      })
    },
    //导出
    handleExport(){

    },
    //表格行点击
    handleTableRowClick(row){
      this.currentEditParams = { ...row }
      this.detailsVisible = true
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
    .back{
      margin-left:24px;
      font-size:14px;
      color:rgba(0,0,0,0.45);
      margin-top:24px;
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