<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">消费流水</h3>
<!--    <el-button @click="$router.push('/platform/fleetAccount')" type="text" ghost>返回</el-button>-->
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="search" />
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
            @click="handleExportTemp"
          >
            导出
          </el-button>
        </div>
      </div>
      <br/>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label='平台消费流水' name="1">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-card shadow="hover">
                <span>累计消费额</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccountin.expenditure}}</h1>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <span>交易笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccountin.transactionCount}}</h1>
              </el-card>
            </el-col>
          </el-row>
          <br/>
          <Table ref="in" v-loading="loadingPT" :page.sync="currentPagePT" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPagePT-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="流水号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serialNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="车牌号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.carNum }}</span>
              </template>
            </el-table-column>

            <el-table-column label="司机姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.driverName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="所属车队" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fleetName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费气站" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stationName }}</span>
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
                <span>{{ scope.row.gasNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="总金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.allAmount }}</span>
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

            <el-table-column label="加气员" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.confirmName }}</span>
              </template>
            </el-table-column>
          </Table>
        </el-tab-pane>
        <el-tab-pane label="车队消费流水" name="2">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-card shadow="hover">
                <span>累计消费额</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccountout.expenditure}}</h1>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <span>交易笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccountout.transactionCount}}</h1>
              </el-card>
            </el-col>
          </el-row>
          <br/>
          <Table ref="out" v-loading="loadingCD" :page.sync="currentPageCD" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPageCD-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="流水号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serialNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="车牌号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.carNum }}</span>
              </template>
            </el-table-column>

            <el-table-column label="司机姓名" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.driverName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="所属车队" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.fleetName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费气站" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stationName }}</span>
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
                <span>{{ scope.row.gasNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="总金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.allAmount }}</span>
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

            <el-table-column label="加气员" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.confirmName }}</span>
              </template>
            </el-table-column>

          </Table>
        </el-tab-pane>
        <el-tab-pane label="散户消费流水" name="3">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-card shadow="hover">
                <span>累计消费额</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccounthk.expenditure}}</h1>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <span>交易笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccounthk.transactionCount}}</h1>
              </el-card>
            </el-col>
          </el-row>
          <br/>
          <Table ref="hk" v-loading="loadingSH" :page.sync="currentPageSH" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPageSH-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="流水号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.serialNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="车牌号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.carNum }}</span>
              </template>
            </el-table-column>

            <el-table-column label="昵称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.driverName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="消费气站" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.stationName }}</span>
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
                <span>{{ scope.row.gasNumber }}</span>
              </template>
            </el-table-column>

            <el-table-column label="总金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.allAmount }}</span>
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


            <el-table-column label="加气员" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.confirmName }}</span>
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
  import { getRechargeList,getRechargeCard,exportTemp } from '@/api/consumptionFlow'
  import Table from '@/components/Table'
  import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
  import Details from './components/Details'
  import download from '@/utils/download'
  import {mapGetters} from "vuex";
export default {
  components: {
    SearchForm,
    Table,
    EditForm,
    Details,
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  data() {
    return {
      activeName: '1',
      detailsVisible: false,
      currentEditParams: null,
      date:'',
      dataSource:'',
      currentPagePT: 1,
      currentPageCD: 1,
      currentPageSH: 1,
      pageSize: 10,
      loadingPT: false,
      loadingCD: false,
      loadingSH: false,
      editLoading: false,
      editVisible: false,
      value2: '',
      fleetList:this.$route.params.value,
      fleetAccountin:'',
      fleetAccountout:'',
      fleetAccounthk:'',
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
    currentPagePT(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchin()
      }
    },
    currentPageCD(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchout()
      }
    },
    currentPageSH(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchhk()
      }
    },
    pageSize(val) {
      if(this.activeName ==='1'){
        if (this.currentPagePT === 1){
          this.handleSearchin()
        } else{
          this.currentPagePT = 1
        }
      }else if(this.activeName ==='2'){
        if (this.currentPageCD === 1){
          this.handleSearchout()
        } else{
          this.currentPageCD = 1
        }
      }else if(this.activeName ==='3'){
        if (this.currentPageSH === 1){
          this.handleSearchhk()
        } else{
          this.currentPageSH = 1
        }
      }
    }
  },
  mounted() {
    this.fleetList = this.$route.params.value
    this.getFleetAccountInfoFlat()
    this.getFleetAccountOutFlat()
    this.getFleetAccountHkFlat()
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

      query.append('size', this.pageSize)
      query.append('payTenantId', this.fleetList.orgId)
      if(this.value2!=='' && this.value2!==null){
        query.append('startDate', this.value2[0])
        query.append('endDate', this.value2[1])
      }

      if(this.activeName ==='1'){
        query.append('current', this.currentPagePT)
      }else if(this.activeName ==='2'){
        query.append('current', this.currentPageCD)
      }else if(this.activeName ==='3'){
        query.append('current', this.currentPageSH)
      }

      // query.append('tenantType', '1')
      return { query, params }
    },
// 查询所有
    search(){
      // this.handleSearch()
      if(this.activeName ==='1'){
        this.getFleetAccountInfoFlat()
      }else if(this.activeName ==='2'){
        this.getFleetAccountOutFlat()
      }else if(this.activeName ==='3'){
        this.getFleetAccountHkFlat()
      }
    },
    // 查询
    handleSearchin(){
      this.loadingPT = true
      let table = this.$refs['in']
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'0',
          current:this.currentPage,
          size:this.pageSize,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'0',
          current:this.currentPage,
          size:this.pageSize,
        }
      }
      return getRechargeList(parms).then(response => {
        this.loadingPT = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchout(){
      this.loadingCD = true
      let table = this.$refs['out']
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'2',
          current:this.currentPage,
          size:this.pageSize,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'2',
          current:this.currentPage,
          size:this.pageSize,
        }
      }
      return getRechargeList(parms).then(response => {
        this.loadingCD = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchhk(){
      this.loadingSH = true
      let table = this.$refs['hk']
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'3',
          current:this.currentPage,
          size:this.pageSize,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'3',
          current:this.currentPage,
          size:this.pageSize,
        }
      }
      return getRechargeList(parms).then(response => {
        this.loadingSH = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },

    getFleetAccountInfoFlat() {
      const _this = this
      let parms = {};
      if(_this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'0',
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'0',
        }
      }

      getRechargeCard(parms).then(response => {
        if(response.data.code===200){
          if(response.data.data){
            this.fleetAccountin = response.data.data
          }
          this.$nextTick(()=>{
            this.handleSearchin()
          })
        }
      })
    },
    getFleetAccountOutFlat() {
      const _this = this
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'2',
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'2',
        }
      }

      getRechargeCard(parms).then(response => {
        if(response.data.code===200){
          if(response.data.data){
            this.fleetAccountout = response.data.data
          }
          this.$nextTick(()=>{
            this.handleSearchout()
          })
        }

      })
    },
    getFleetAccountHkFlat() {
      const _this = this
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          accountType:'3',
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          accountType:'3',
        }
      }

      getRechargeCard(parms).then(response => {
        if(response.data.code===200){
          if(response.data.data){
            this.fleetAccounthk = response.data.data
          }
          this.$nextTick(()=>{
            this.handleSearchhk()
          })
        }
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
    },
    handleExportTemp(){
      let parms = {};
      if(this.activeName==='1'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            tenantId:this.tenantId,
            accountType:'0',
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            tenantId:this.tenantId,
            accountType:'0',
            startDate:'',
            endDate:'',
          }
        }
        return exportTemp(parms).then( response =>{
          download(response.data,'平台消费流水.xlsx')
        }).catch(e=>console.log(e))
      }else if(this.activeName==='2'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            tenantId:this.tenantId,
            accountType:'2',
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            tenantId:this.tenantId,
            accountType:'2',
            startDate:'',
            endDate:'',
          }
        }
        return exportTemp(parms).then( response =>{
          download(response.data,'车队消费流水.xlsx')
        }).catch(e=>console.log(e))
      }else if(this.activeName==='3'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            tenantId:this.tenantId,
            accountType:'3',
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            tenantId:this.tenantId,
            accountType:'3',
            startDate:'',
            endDate:'',
          }
        }
        return exportTemp(parms).then( response =>{
          download(response.data,'散户消费流水.xlsx')
        }).catch(e=>console.log(e))
      }

    },
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
