<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">气站端/车队充值确认</h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
<!--    <SearchForm ref="searchForm"  />-->
    <div class="main">
<!--      <el-tabs v-model.trim="activeName" @tab-click="handleClick">-->
      <el-tabs v-model.trim="activeName">
        <el-tab-pane label="充值审核" name="1">
          <Table ref="cz" v-loading="loadingIn" :page.sync="currentPagein" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPagein-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="申请方" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.payTenantName }}</span>
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

            <el-table-column label="审核结果" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status==='0'? '待确认' : scope.row.status==='1'? '审核通过' : '审核未通过' }}</span>
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
                <img :src="scope.row.photo" width="40" height="40" class="head_pic">
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

            <el-table-column label="操作" fixed="right" min-width="170" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click.native.stop="editButton(scope.row)" v-if="scope.row.status==='0'">审核</el-button>
              </template>
            </el-table-column>
          </Table>
        </el-tab-pane>
        <el-tab-pane label="还款审核" name="2">
          <Table ref="hk" v-loading="loadingHk" :page.sync="currentPagehk" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPagehk-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="申请时间" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.createTime }}</span>
              </template>
            </el-table-column>

            <el-table-column label="申请方" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.payTenantName }}</span>
              </template>
            </el-table-column>

            <el-table-column label="审核状态" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.status === '0' ? '待确认' : scope.row.status === '1' ? '审核通过' : '审核不通过'}}{{scope.row.reason}}</span>
              </template>
            </el-table-column>

            <el-table-column label="账户编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.accountNumber }}</span>
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
                <img :src="scope.row.photo" width="40" height="40" class="head_pic">
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

            <el-table-column label="操作" fixed="right" min-width="170" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click.native.stop="editButton(scope.row)" v-if="scope.row.status==='0'">审核</el-button>
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
    <Details :visible.sync="detailsVisible" :data-source.sync="currentEditParams" />
  </div>
</template>

<script>
  import { getInAccountList,addCarAccountList,getHkAccountList,addHkCarAccountList} from '@/api/gasCarAudit'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
import Details from './components/Details'
  import moment from 'moment'
export default {
  components: {
    SearchForm,
    Table,
    EditForm,
    Details,
  },
  data() {
    return {
      moment,
      activeName: '1',
      detailsVisible: false,
      currentEditParams: null,
      currentPagein: 1,
      currentPagehk: 1,
      pageSize: 10,
      loadingIn: false,
      loadingHk: false,
      editLoading: false,
      editVisible: false,
      params: {
        inspectionTime:''
      },
    }
  },
  watch: {
    currentPagein(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchCZ()
      }
    },
    currentPagehk(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.handleSearchHK()
      }
    },
    pageSize(val) {
      if(this.activeName ==='1'){
        if (this.currentPagein === 1){
          this.handleSearchCZ()
        } else{
          this.currentPagein = 1
        }
      }else if(this.activeName ==='2'){
        if (this.currentPagehk === 1){
          this.handleSearchHK()
        } else{
          this.currentPagehk = 1
        }
      }
    }
  },
  mounted() {
    this.handleSearchCZ()
    this.handleSearchHK()
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
      if(this.activeName ==='1'){
        query.append('current', this.currentPagein)
      }else if(this.activeName ==='2'){
        query.append('current', this.currentPagehk)
      }
      // query.append('tenantType', '1')
      return { query, params }
    },
    handleSearch(){
      if(this.activeName ==='1'){
        this.handleSearchCZ()
      }else if(this.activeName ==='2'){
        this.handleSearchHK()
      }
    },
    // 查询
    handleSearchCZ(){
      this.loading = true
      let table = this.$refs['cz']
      let { query } = this.getFormatedSearchParams()
      return getInAccountList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    handleSearchHK(){
      this.loading = true
      let table = this.$refs['hk']
      let { query } = this.getFormatedSearchParams()
      return getHkAccountList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    // 删除
    handleDelete(row) {
      const that = this
      this.$confirm('此操作将删除气站, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteTenant(row.id).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功' })
            this.handleSearchCZ()
            this.handleSearchHK()
          } else {
            this.$message({ type: 'error', message: response.data.msg })
          }
        })
      })
    },
    // 创建
    handleCreate(params) {
      if(this.activeName==='1'){
        return addCarAccountList(params).then((res) => {
          this.editLoading = true
          if (res.data.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.editVisible = false
            this.handleSearchCZ()
            this.handleSearchHK()
          } else {
            this.$message({ message: res.data.msg, type: 'error' })
          }
        })
      }else {
        return addHkCarAccountList(params).then((res) => {
          this.editLoading = true
          if (res.data.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.editVisible = false
            this.handleSearchCZ()
            this.handleSearchHK()
          } else {
            this.$message({ message: res.data.msg, type: 'error' })
          }
        })
      }

    },
    // 编辑/更新
    handleUpdate(params) {
      const pa ={
        id:params.id,
        reason:params.reason,
        status:params.status,
      }
      return addCarAccountList(pa).then((res) => {
        if (res.data.code === 200) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false
          this.handleSearchCZ()
          this.handleSearchHK()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
      })
    },
    // editForm确认按钮
    handleEditConfirm(params, isUpdate) {
      console.log(params,888888)
      const param = {
        ...params,
      }
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let crtOrUpdate
        this.editLoading = true
        crtOrUpdate = this.handleCreate
        crtOrUpdate(param).finally(() => {
          this.editLoading = false
        })
      })
    },
    // 表格行点击
    handleTableRowClick(row) {
      this.currentEditParams = {
        ...row ,
        sta:row.status,
        activeName:this.activeName
      }
      this.detailsVisible = true
    },
    // 编辑界面
    editButton(row){
      this.currentEditParams = {
        ...row ,
        sta:row.status,
        activeName:this.activeName
      }
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
    // handleClick(tab, event) {
    //   console.log(tab, event)
    // }
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
