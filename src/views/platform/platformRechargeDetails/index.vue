<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <el-button @click="$router.push('/dealInfo/accountRecharge')" type="text" icon="el-icon-back" ghost>返回</el-button>
      <el-divider direction="vertical"></el-divider>
      <span>账户明细</span>
    </h3>
<!--    <h3 class="title">账户明细3</h3>-->
<!--    <el-page-header style="margin-left: 30px" @back="$router.push('/dealInfo/accountRecharge')" content="账户明细">-->
<!--    </el-page-header>-->
<!--    <el-button @click="$router.push('/platform/fleetAccount')" type="text" ghost>返回</el-button>-->
    <SearchForm ref="searchForm" :search-loading="loading" @beforeSearch="handleBeforeSearch" @search="search" />
    <div class="main">
      <div class="header">
        <el-date-picker
          v-model="value2"
          type="daterange"
          align="right"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
        </el-date-picker>
        <!--            <span>车队账户统计</span>-->
        <div class="buttons">
          <el-button
            class="filter-item"
            type="primary"
            size="small"
            @click="search"
          >
            查询
          </el-button>
          <el-button
            class="filter-item"
            size="small"
            @click="handleSearch"
          >
            导出
          </el-button>
        </div>
      </div>
      <br/>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label='消费流水' name="first">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-card shadow="hover">
                <span>累计消费额</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountout.expenditure}}</h1>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <span>交易笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountout.transactionCount}}</h1>
              </el-card>
            </el-col>
          </el-row>
          <br/>
          <Table ref="table1" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="车队编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="企业代码" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>

            <el-table-column label="车队名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="账户余额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.transactionCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="累计消费额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="交易笔数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.toBeConfirmedAmount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="累计充值额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.toBeConfirmedAmount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="充值笔数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.toBeConfirmedAmount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="待确认充值金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.toBeConfirmedAmount }}</span>
              </template>
            </el-table-column>
          </Table>
        </el-tab-pane>
        <el-tab-pane label="充值流水" name="second">
          <el-row :gutter="24">
            <el-col :span="6">
              <el-card shadow="hover">
                <span>累计充值额</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountin.echargeAmrount}}</h1>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <span>充值笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountin.rechargeCount}}</h1>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <span>待审核充值额</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountin.toBeConfirmedAmount}}</h1>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card shadow="hover">
                <span>审核拒绝充值额</span>
                <br/>
                <br/>
                <h1 style="font-size: 6rem;">{{fleetAccountin.noConfirmedAmount}}</h1>
              </el-card>
            </el-col>
          </el-row>
          <br/>
          <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status==='0'? '待确认' : scope.row.status==='1'? '审核通过' : '审核未通过'}}{{scope.row.reason}}</span>
              </template>
            </el-table-column>

            <el-table-column label="充值金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="充值方式" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeWay }}</span>
              </template>
            </el-table-column>

            <el-table-column label="交易流水号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serialNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="打款账户" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.cashAccount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="打款/预计还款时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeWayValue ==='owe' ? scope.row.paymentTime!==null?moment(scope.row.paymentTime).format('YYYY-MM-DD'):'-' : scope.row.paymentTime !== null ?  scope.row.paymentTime: '-'  }}</span>
              </template>
            </el-table-column>

            <el-table-column label="附件照片" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.photo }}</span>
              </template>
            </el-table-column>

            <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.remark }}</span>
              </template>
            </el-table-column>

          </Table>
        </el-tab-pane>
      </el-tabs>
    </div>
    <EditForm
      ref="child"
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      @ok="handleEditConfirm"
    />
<!--    <Details :visible.sync="detailsVisible" :data-source.sync="currentEditParams" />-->
  </div>
</template>

<script>
  import { getRechargeList,getRechargeCard,getConsumptionList,getConsumptionCard } from '@/api/carAccount'
  import Table from '@/components/Table'
  import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
  import Details from './components/Details'
export default {
  components: {
    SearchForm,
    Table,
    EditForm,
    Details,
  },
  data() {
    return {
      activeName: 'first',
      detailsVisible: false,
      currentEditParams: null,
      date:'',
      dataSource:'',
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      editVisible: false,
      value2: '',
      fleetList:this.$route.params.value,
      fleetAccountin:'',
      fleetAccountout:'',
      pickerOptions: {
        shortcuts: [{
          text: '本日',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '本月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        },{
          text: '本年',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  watch: {
    currentPage(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchin()
        this.handleSearchout()
      }
    },
    pageSize(val) {
      if (this.currentPage === 1){
        this.handleSearchin()
        this.handleSearchout()
      }
      else this.currentPage = 1
    }
  },
  mounted() {
    this.fleetList = this.$route.params.value
    this.getFleetAccountInfoFlat()
    this.getFleetAccountOutFlat()
        // this.handleSearch()
  },
  methods: {
    // 格式化查询参数
    getFormatedSearchParams() {
      const searchForm = this.$refs['searchForm']
      console.log(searchForm,'searchForm')
      const params = searchForm.getParams()
      const query = new URLSearchParams()
      for (const [key, val] of Object.entries(params)) {
        if (val) query.append(key, val)
      }
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      query.append('payTenantId', this.fleetList.orgId)
      if(this.value2!=='' && this.value2!==null){
        query.append('startDate', this.value2[0])
        query.append('endDate', this.value2[1])
      }

      // query.append('tenantType', '1')
      return { query, params }
    },
// 查询所有
    search(){
      // this.handleSearch()
      this.getFleetAccountInfoFlat()
      this.getFleetAccountOutFlat()
    },
    // 查询
    handleSearchin(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return getRechargeList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchout(){
      this.loading = true
      let table = this.$refs['table1']
      let { query } = this.getFormatedSearchParams()
      return getConsumptionList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },

    getFleetAccountInfoFlat() {
      const _this = this
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          orgId:this.fleetList.orgId,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          orgId:this.fleetList.orgId,
        }
      }

      getRechargeCard(parms).then(response => {
        this.fleetAccountin = response.data.data
        this.$nextTick(()=>{
          this.handleSearchin()
        })
      })
    },
    getFleetAccountOutFlat() {
      const _this = this
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          orgId:this.fleetList.orgId,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          orgId:this.fleetList.orgId,
        }
      }

      getConsumptionCard(parms).then(response => {
        this.fleetAccountout = response.data.data
        this.$nextTick(()=>{
          this.handleSearchout()
        })
      })
    },
    // 删除
    handleDelete(row) {
      const that = this
      this.$confirm('此操作将删除气站, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteTenant(row.id).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功' })
            that.handleSearchin()
            that.handleSearchout()
          } else {
            this.$message({ type: 'error', message: response.data.msg })
          }
        })
      })
    },
    // 创建
    handleCreate(params) {
      return addCarAccountList(params).then((res) => {
        this.editLoading = true
        if (res.data.code === 200) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false

          this.handleSearchin()
          this.handleSearchout()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
      })
    },
    // 编辑/更新
    handleUpdate(params) {
      return updateTenant(params).then((res) => {
        if (res.data.code === 200) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false
          this.handleSearchin()
          this.handleSearchout()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
      })
    },
    // editForm确认按钮
    handleEditConfirm(params, isUpdate) {
      const param = {
        ...params,
        // tenantId: this.$refs.searchForm.parentTenantId,
        // orgId: this.$refs.searchForm.orgId,
      }
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let crtOrUpdate
        this.editLoading = true
        if (isUpdate) crtOrUpdate = this.handleUpdate
        else crtOrUpdate = this.handleCreate
        crtOrUpdate(param).finally(() => {
          this.editLoading = false
        })
      })
    },
    // 表格行点击
    handleTableRowClick(row) {
      this.currentEditParams = { ...row }
      this.detailsVisible = true
    },
    // 编辑界面
    editButton(row){
      this.currentEditParams = { ...row }
      console.log()
      if(this.$refs['child'].$refs['clear']!==undefined){
        this.$refs['child'].$refs['clear'].clearFiles()
      }
      // console.log(this.$re)
      this.editVisible = true
    },
    // 查询重置之前
    handleBeforeSearch() {
      this.currentPage = 1
    },
    // tabs标签页
    handleClick(tab, event) {
      console.log(this.activeName)
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .app-container{
    margin:0;
    padding:0;
    background:transparent;
    height:calc(100vh - 85px);
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
