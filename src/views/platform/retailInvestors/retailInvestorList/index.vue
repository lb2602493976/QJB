<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">散户列表</h3>
    <SearchForm ref="searchForm" :search-loading="loading" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>散户列表</span>
      </div>
      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.mobile }}</span>
          </template>
        </el-table-column>

        <el-table-column label="司机姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车牌号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.carNum }}</span>
          </template>
        </el-table-column>

      </Table>
    </div>
  </div>
</template>

<script>
import { fetchRetailInvestorList } from '@/api/retailInvestors'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
export default {
  data() {
    return {
      operationPermissions: ['2'], // 租户类型
      currentPage: 1,
      pageSize: 10,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['tenantType'])
  },
  watch: {
    currentPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearch()
      }
    },
    pageSize(val) {
      if (this.currentPage === 1) this.handleSearch()
      else this.currentPage = 1
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    // 格式化查询参数
    getFormatedSearchParams() {
      const searchForm = this.$refs['searchForm']
      const params = searchForm.getParams()
      const query = new URLSearchParams()
      for (const [key, val] of Object.entries(params)) {
        if (val) query.append(key, val)
      }
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      return { query, params }
    },
    // 查询
    handleSearch() {
      this.loading = true
      const table = this.$refs['table']
      const { query } = this.getFormatedSearchParams()
      return fetchRetailInvestorList(query).then(response => {
        this.loading = false
        const data = response.data.data.records
        const total = response.data.data.total
        table.complete({ data, total })
        return data
      })
    },
    // 表格行点击
    handleTableRowClick(row) {
      this.$router.push(`/retailInvestors/consumptionDetails/${row.id}`)
    },
    // 查询重置之前
    handleBeforeSearch() {
      this.currentPage = 1
    }
  },
  components: {
    SearchForm,
    Table
  }
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
