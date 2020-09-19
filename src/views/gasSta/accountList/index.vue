<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">气站端平台账户</h3>
    <SearchForm ref="searchForm" :search-loading="loading" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
    <div class="main">
<!--      <el-tabs v-model.trim="activeName" @tab-click="handleClick">-->
<!--        <el-tab-pane label="消费流水" name="first">-->
          <div class="header">
            <span>平台账户统计</span>
            <div class="buttons">
              <el-button
                class="filter-item"
                size="small"
                @click="handleExportTemp"
              >
                导出
              </el-button>
            </div>
          </div>
<!--          <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true">-->
      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="平台编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
              </template>
            </el-table-column>

            <el-table-column label="平台名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>


            <el-table-column label="账户余额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.amount }}</span>
              </template>
            </el-table-column>


            <el-table-column label="交易笔数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.transactionCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="充值笔数" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.rechargeCount }}</span>
              </template>
            </el-table-column>

            <el-table-column label="待确认充值金额" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.toBeConfirmedAmount }}</span>
              </template>
            </el-table-column>


            <!--                <el-table-column label="操作" fixed="right" min-width="170" align="center">-->
<!--                  <template slot-scope="scope">-->
<!--                    <el-button type="text" @click.native.stop="editButton(scope.row)">充值</el-button>-->
<!--&lt;!&ndash;                    <el-button type="text" @click.native.stop="editButton(scope.row)">充值流水</el-button>&ndash;&gt;-->
<!--&lt;!&ndash;                    <el-button type="text" @click.native.stop="handleDelete(scope.row)">消费流水</el-button>&ndash;&gt;-->
<!--                  </template>-->
<!--                </el-table-column>-->
          </Table>
    </div>
    <EditForm
      ref="child"
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      @ok="handleEditConfirm"
    />
  </div>
</template>

<script>
  import { getPlatformCarAccountList,exportTemp } from '@/api/accountAccount'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
import Details from './components/Details'
  import {mapGetters} from "vuex";
  import request from "axios";
  import download from '@/utils/download'
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
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      editVisible: false,
    }
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
  computed:{
    ...mapGetters(['tenantId']),
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
      // query.append('tenantType', '1')
      return { query, params }
    },
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return getPlatformCarAccountList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    // 导出
    handleExprot(){
      const { tenantId } = this
      console.log(request)
      console.log(`http://192.168.31.136:9528${process.env.BASE_API}/account/export/exportAllAccountFlat?tenantId=${tenantId}`)


      // window.open(url)


      // return request({
      //   url: `${process.env.BASE_API}/account/export/exportAllAccountFlat`,
      //   method: 'get',
      //   tenantId,
      //   headers:{
      //     'Content-Type':'multipart/form-data',
      //   },
      // })
      // const parms ={
      //   tenantId
      // }
      // getExprot(parms).then(response => {
      // })
    },
    // 删除
    handleDelete(row) {
      const that = this
      this.$confirm('此操作将删除气站, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteTenant(row.id).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功' })
            that.handleSearch()
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

          this.handleSearch()
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
          this.handleSearch()
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
      // this.detailsVisible = true
      this.$router.push({name:'accountDetail',params:{value:this.currentEditParams}})
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
    // // 充值流水
    // goRechargeFlow(row) {
    //   this.$router.push({ path: '/tenant/rechargeFlow' })
    // },
    // // 消费流水
    // goConsumptionFlow(row) {
    //   this.$router.push({ path: '/tenant/consumptionFlow' })
    // },
    // 查询重置之前
    handleBeforeSearch() {
      this.currentPage = 1
    },
    //导出
    handleExportTemp(){
      const searchForm = this.$refs['searchForm']
      const value = searchForm.getParams()
      var parms ={
        tenantId:this.tenantId,
        name:value.name,
        enterpriseCode:value.enterpriseCode
      }
      return exportTemp(parms).then( response =>{
        download(response.data,'平台账户统计.xlsx')
      }).catch(e=>console.log(e))
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
