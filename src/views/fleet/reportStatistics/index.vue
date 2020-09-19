<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">陕西天地众力能源发展有限公司华州区分公司</h3>
    <SearchForm ref="searchForm" :search-loading="loading" @unitChange="handleUnitChange" @timeChange="handleTimeChange" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <div class="d1" style="font-size:20px;">{{ unit.label }}:{{ startTime }} 月液化天然气预收账款对账单</div>
      </div>
      <Table ref="table"   v-loading="loading" height="600px" :page.sync="currentPage" :size.sync="pageSize" :has-page="false">
        <el-table-column  :render-header="renderHeader" label="预收款上期余额">
          <el-table-column label="序号" width="60" fixed="left" align="center">
            <template slot-scope="scope">
              <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="加气时间" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.a }}</span>
              <span>{{ this.params.timeRange }}</span>
            </template>
          </el-table-column>

          <el-table-column label="加气量" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>

          <el-table-column label="单价" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>

          <el-table-column label="消费金额" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>

          <el-table-column label="预收款" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>
          <el-table-column label="当日开票金额" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>

          <el-table-column label="当日未开票金额" min-width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.a }}</span>
            </template>
          </el-table-column>
        </el-table-column>

      </Table>

    </div>
  </div>
</template>

<script>
import { searchApi, createApi, updateApi, deleteApi } from '@/api/gasCard'
import { searchApi as thirdPlatSearchApi } from '@/api/thirdPlatform'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
export default {
  data() {
    return {
      unit: '',
      startTime: '',
      detailsVisible: false,
      currentEditParams: null,
      currentPage: 1,
      pageSize: 30,
      loading: false
      // tableData:[
      //   {
      //     num:1,
      //     aeratedTime:'2020/7/23',
      //     addVolume:632.61,
      //     price:3.05,
      //     monetary:1929.46,
      //     advancesReceived:'',
      //     lastNotInvoiced:'',
      //     nowInvoiced:'',
      //     nowNotInvoiced:''
      //   },{
      //     num:2,
      //     aeratedTime:'2020/7/23',
      //     addVolume:632.61,
      //     price:3.05,
      //     monetary:1929.46,
      //     advancesReceived:'',
      //     lastNotInvoiced:'',
      //     nowInvoiced:'',
      //     nowNotInvoiced:''
      //   }
      // ]
    }
  },
  computed: {
    ...mapGetters(['tenantId'])
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
    // 表头
    renderHeader(h) {
      // 套娃
      return h('div', { style: { color: '#909399' }}, [h('a', { style: { float: 'left' }}, '预收款上期余额'), h('a', { style: { float: 'right' }}, '14906.11')])
    },
    // 获取加气单位输入
    handleUnitChange(val) {
      this.unit = val
      console.log('unit', this.unit)
    },
    // 获取业务发生时间和结束时间
    handleTimeChange(val) {
      this.startTime = val[0].slice(5, 7)
      console.log('startTime', this.startTime)
    },

    // 格式化查询参数
    getFormatedSearchParams() {
      const searchForm = this.$refs['searchForm']
      const params = searchForm.getParams()
      const query = new URLSearchParams()
      console.log('params', params)
      for (const [key, val] of Object.entries(params)) {
        if (val) query.append(key, val)
      }
      console.log('params', params)
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      query.append('tenantId', this.tenantId)
      return { query, params }
      console.log('parpms', params)
    },
    // 查询
    handleSearch() {
      this.loading = true
      const table = this.$refs['table']
      const { query } = this.getFormatedSearchParams()

      return searchApi(query).then(response => {
        this.loading = false
        const data = response.data.data.records
        const total = response.data.data.total
        table.complete({ data, total })
        console.log(query.get('gasCardnum'))
        console.log(query.get('timeRange[0]'))
        return data
      })
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
    //   text-align:center;
    }
    .main{
      padding:24px;
      margin:20px;
      background:#FFF;
      margin-bottom:0;
      .header,.footer{
        margin-bottom:12px;
        // display:flex;
        // justify-content: space-between;
        // align-items: center;
      }
      .d1{
        // div主轴居中
        display:flex;
        justify-content: center;
        align-items: center;
      }
      .d2{
        // div主轴两边对齐
        display:flex;
        justify-content: space-between;
        align-items: center;
      }
      .d3{

          display:flex;
        //   justify-content: space-around;
      }
      .s1{
        // span元素占页面开始距离对齐
          width:50%;
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
