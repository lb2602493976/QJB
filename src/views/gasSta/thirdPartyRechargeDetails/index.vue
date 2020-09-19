<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <el-button @click="$router.push('/account/thirdPartyRecharge')" type="text" icon="el-icon-back" ghost>返回</el-button>
      <el-divider direction="vertical"></el-divider>
      <span>气站端第三方账户明细</span>
    </h3>
    <SearchForm ref="searchForm"  @search="hk" />
    <div class="main">
      <div class="header">
        <div>
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
          <el-select clearable placeholder="审核状态"  v-model="status" size="small" style="width: 330px;margin-left: 10px">
            <el-option label="待确认" value="0"/>
            <el-option label="审核通过" value="1"/>
            <el-option label="审核拒绝" value="2"/>
          </el-select>
        </div>

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
<!--        <el-tab-pane label='消费流水' name="1">-->
<!--          <el-row :gutter="24">-->
<!--            <el-col :span="12">-->
<!--              <el-card shadow="hover">-->
<!--                <span>累计消费额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountout.expenditure}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="12">-->
<!--              <el-card shadow="hover">-->
<!--                <span>交易笔数</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">{{fleetAccountout.transactionCount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <br/>-->
<!--          <Table ref="out" v-loading="loadingOut" :page.sync="currentPageOut" :size.sync="pageSize" :has-page="true">-->
<!--            &lt;!&ndash;      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">&ndash;&gt;-->
<!--            <el-table-column label="序号" width="60" fixed="left" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ (currentPageOut-1)*pageSize+scope.$index + 1 }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="流水号" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.serialNumber }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="消费时间" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.createTime }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="车牌号" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.carNum }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="司机姓名" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.driverName }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="所属车队" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.fleetName }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="消费气站" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.stationName }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="枪号" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.gasGun }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="挂牌价" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.curprice }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="气量" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.gasNumber }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="总金额" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.allAmount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="单价优惠" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.realDiscount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="总优惠" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.totalDiscount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="实付金额" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.payAmount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="加气员" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.confirmName }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="支付方式" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.payType }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="收银员" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.cashierName }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--          </Table>-->
<!--        </el-tab-pane>-->
        <el-tab-pane label="充值流水" name="2">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-card shadow="hover">
                <span>累计充值额</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">￥{{fleetAccountin.echargeAmrount}}</h1>
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card shadow="hover">
                <span>充值笔数</span>
                <br/>
                <br/>
                <h1 style="font-size: 1.5em;">{{fleetAccountin.rechargeCount}}</h1>
              </el-card>
            </el-col>
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>待审核充值额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountin.toBeConfirmedAmount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>审核拒绝充值额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountin.noConfirmedAmount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
          </el-row>
          <br/>
          <Table ref="in" v-loading="loadingIn" :page.sync="currentPageIn" :size.sync="pageSize" :has-page="true">
            <!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPageIn-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>


            <el-table-column label="申请时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
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
                <viewer>
                  <img :src="scope.row.photo" width="40" height="40" class="head_pic">
                </viewer>
              </template>
            </el-table-column>



            <el-table-column label="备注" align="center">
              <template slot-scope="scope">
                <el-tooltip placement="top" effect="light">
                  <div slot="content" style="font-size: 1.2em;">{{ scope.row.remark }}</div>
                  <p style="text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp: 1; -webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.remark }}</p>
                </el-tooltip>
              </template>
            </el-table-column>

          </Table>
        </el-tab-pane>
<!--        <el-tab-pane label="还款流水" name="3">-->
<!--          <el-row :gutter="24">-->
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>累计还款额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountHK.rePayAmount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>还款笔数</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">{{fleetAccountHK.rePayCount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>待审核还款额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountHK.rePayToBeConfirmedAmount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--            <el-col :span="6">-->
<!--              <el-card shadow="hover">-->
<!--                <span>审核拒绝还款额</span>-->
<!--                <br/>-->
<!--                <br/>-->
<!--                <h1 style="font-size: 1.5em;">￥{{fleetAccountHK.rePayNoConfirmedAmount}}</h1>-->
<!--              </el-card>-->
<!--            </el-col>-->
<!--          </el-row>-->
<!--          <br/>-->
<!--          <Table ref="hk" v-loading="loadingHk" :page.sync="currentPageHk" :size.sync="pageSize" :has-page="true">-->
<!--            <el-table-column label="序号" width="60" fixed="left" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ (currentPageHk-1)*pageSize+scope.$index + 1 }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="还款时间" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.createTime }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="还款金额" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.amount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="还款方式" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.rechargeWay==='1'? '银行转账': scope.row.rechargeWay==='2'? '欠款': '' }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="交易流水号" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.serialNumber }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="打款账户" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.cashAccount }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="打款时间" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.paymentTime }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="附件照片" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <viewer>-->
<!--                  <img :src="scope.row.photo" width="40" height="40" class="head_pic">-->
<!--                </viewer>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="审核状态" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.status==='0'? '待确认' : scope.row.status==='1'? '审核通过' : '审核未通过'}}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="备注" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <el-tooltip placement="top" effect="light">-->
<!--                  <div slot="content" style="font-size: 1.2em;">{{ scope.row.remark }}</div>-->
<!--                  <p style="text-overflow: ellipsis;overflow: hidden;-webkit-line-clamp: 1; -webkit-box-orient: vertical;display: -webkit-box;">{{ scope.row.remark }}</p>-->
<!--                </el-tooltip>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--          </Table>-->
<!--        </el-tab-pane>-->
      </el-tabs>
    </div>
    <EditForm
      ref="child"
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      @ok="handleEditConfirm"
    />
    <EditHKForm
      ref="child"
      :visible.sync="editHkVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editHKLoading"
      @ok="handleEditHkConfirm"
    />
<!--    <Details :visible.sync="detailsVisible" :data-source.sync="currentEditParams" />-->
  </div>
</template>

<script>
  import { getRechargeList,getRechargeCard,getConsumptionList,getConsumptionCard,getHkList,getHkCard,addHKAccountList,exportInTemp } from '@/api/thirdPartyRecharge'
  import Table from '@/components/Table'
  import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
  import Details from './components/Details'
  import EditHKForm from './components/EditHKForm'
  import download from '@/utils/download'
  import {mapGetters} from "vuex";
export default {
  components: {
    SearchForm,
    Table,
    EditForm,
    EditHKForm,
    Details,
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  data() {
    return {
      activeName: '2',
      detailsVisible: false,
      currentEditParams: null,
      date:'',
      dataSource:'',
      currentPageOut: 1,
      currentPageIn: 1,
      currentPageHk: 1,
      pageSize: 10,
      loadingIn: false,
      loadingOut: false,
      loadingHk: false,
      editLoading: false,
      editHKLoading: false,
      editVisible: false,
      editHkVisible: false,
      value2: '',
      status: '',
      fleetList:this.$route.params.value,
      fleetAccountin:'',
      fleetAccountout:'',
      fleetAccountHK:'',
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
    currentPageIn(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchin()
      }
    },
    currentPageOut(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchout()
      }
    },
    currentPageHk(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchHK()
      }
    },
    pageSize(val) {
      if(this.activeName ==='1'){
        if (this.currentPageOut === 1){
          this.handleSearchout()
        } else{
          this.currentPageOut = 1
        }
      }else if(this.activeName ==='2'){
        if (this.currentPageIn === 1){
          this.handleSearchin()
        } else{
          this.currentPageIn = 1
        }
      }else if(this.activeName ==='3'){
        if (this.currentPageHk === 1){
          this.handleSearchHK()
        } else{
          this.currentPageHk = 1
        }
      }
    }
  },
  mounted() {
    if(this.$route.params.value===undefined){
      this.$router.push('/account/thirdPartyRecharge')
    }else {
      this.fleetList = this.$route.params.value
      this.getFleetAccountInfoFlat()
    }
    // this.fleetList = this.$route.params.value
    // this.getFleetAccountInfoFlat()
    // this.getFleetAccountOutFlat()
    // this.getFleetAccountHKFlat()
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
      query.append('size', this.pageSize)
      query.append('status',this.status)
      query.append('payTenantId', this.fleetList.orgId)
      if(this.value2!=='' && this.value2!==null){
        query.append('startDate', this.value2[0])
        query.append('endDate', this.value2[1])
      }
      if(this.activeName ==='1'){
        query.append('current', this.currentPageOut)
      }else if(this.activeName ==='2'){
        query.append('current', this.currentPageIn)
      }else if(this.activeName ==='3'){
        query.append('current', this.currentPageHk)
      }


      // query.append('tenantType', '1')
      return { query, params }
    },
    // 还款
    hk(){
      this.currentEditParams ={
        orgId:this.fleetList.orgId
      }
      this.editHkVisible = true
    },
// 查询所有
    search(){
      if(this.activeName ==='1'){
        this.getFleetAccountOutFlat()
      }else if(this.activeName ==='2'){
        this.getFleetAccountInfoFlat()
      }else if(this.activeName ==='3'){
        this.getFleetAccountHKFlat()
      }
    },
    // tabs标签页
    handleClick() {
      if(this.activeName ==='1'){
        this.getFleetAccountOutFlat()
      }else if(this.activeName ==='2'){
        this.getFleetAccountInfoFlat()
      }else if(this.activeName ==='3'){
        this.getFleetAccountHKFlat()
      }
    },
    // 查询
    handleSearchin(){
      this.loadingIn = true
      let table = this.$refs['in']
      let { query } = this.getFormatedSearchParams()
      return getRechargeList(query).then(response => {
        this.loadingIn = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchout(){
      this.loadingOut = true
      let table = this.$refs['out']
      let { query } = this.getFormatedSearchParams()
      return getConsumptionList(query).then(response => {
        this.loadingOut = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchHK(){
      this.loadingHk = true
      let table = this.$refs['hk']
      let { query } = this.getFormatedSearchParams()
      return getHkList(query).then(response => {
        this.loadingHk = false
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
          status:this.status,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          status:this.status,
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
          status:this.status,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          status:this.status,
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
    getFleetAccountHKFlat() {
      const _this = this
      let parms = {};
      if(this.value2!=='' && this.value2!==null){
        parms = {
          orgId:this.fleetList.orgId,
          status:this.status,
          startDate:this.value2[0],
          endDate:this.value2[1],
        }
      }else {
        parms = {
          status:this.status,
          orgId:this.fleetList.orgId,
        }
      }

      getHkCard(parms).then(response => {
        this.fleetAccountHK = response.data.data
        this.$nextTick(()=>{
          this.handleSearchHK()
        })
      })
    },
    // editForm确认按钮
    handleEditConfirm(params, isUpdate) {
      const param = {
        ...params,
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

    //创建
    handleEditHkConfirm(params){
      console.log(params)
      // params.amount=params.
      return addHKAccountList(params).then((res) => {
        this.editHKLoading = true
        if (res.data.data) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editHKLoading = false
          this.editHkVisible = false
          this.handleSearchHK()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
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
      if(this.$refs['child'].$refs['clear']!==undefined){
        this.$refs['child'].$refs['clear'].clearFiles()
      }
      this.editVisible = true
    },
    // 查询重置之前
    handleBeforeSearch() {
      this.currentPage = 1
    },
    //导出
    handleExportTemp(){
      let parms = {};
      if(this.activeName==='1'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            orgId:this.fleetList.orgId,
            tenantId:this.tenantId,
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            orgId:this.fleetList.orgId,
            tenantId:this.tenantId,
            startDate:'',
            endDate:'',
          }
        }
        return exportOutTemp(parms).then( response =>{
          download(response.data,'消费流水统计.xlsx')
        }).catch(e=>console.log(e))
      }else if(this.activeName==='2'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            orgId:this.fleetList.orgId,
            status:this.status,
            tenantId:this.tenantId,
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            orgId:this.fleetList.orgId,
            status:this.status,
            tenantId:this.tenantId,
            startDate:'',
            endDate:'',
          }
        }
        return exportInTemp(parms).then( response =>{
          download(response.data,'充值流水统计.xlsx')
        }).catch(e=>console.log(e))
      }else if(this.activeName==='3'){
        if(this.value2!=='' && this.value2!==null){
          parms = {
            orgId:this.fleetList.orgId,
            status:this.status,
            tenantId:this.tenantId,
            startDate:this.value2[0],
            endDate:this.value2[1],
          }
        }else {
          parms = {
            orgId:this.fleetList.orgId,
            status:this.status,
            tenantId:this.tenantId,
            startDate:'',
            endDate:'',
          }
        }
        return exportHkTemp(parms).then( response =>{
          download(response.data,'还款流水统计.xlsx')
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
