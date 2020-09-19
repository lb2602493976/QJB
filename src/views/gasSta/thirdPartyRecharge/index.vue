<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">气站端/第三方充值</h3>
    <SearchForm ref="searchForm" :search-loading="loading" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
    <div class="main">
      <div class="header">
        <span>第三方账户统计</span>
        <div class="buttons">
          <el-button
            class="filter-item"
            size="small"
            @click="handleExprot"
          >
            导出
          </el-button>
        </div>
      </div>
      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
<!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" >-->
            <el-table-column label="序号" width="60" fixed="left" align="center">
              <template slot-scope="scope">
                <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
              </template>
            </el-table-column>

<!--            <el-table-column label="账户id" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.orgId }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

            <el-table-column label="平台名称" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.name }}</span>
              </template>
            </el-table-column>

            <el-table-column label="编号" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.code }}</span>
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

<!--            <el-table-column label="欠款余额" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.oweBalance }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

<!--            <el-table-column label="是否欠款" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                <span>{{ scope.row.ifOwe === '0' ? '未欠款' : '欠款' }}</span>-->
<!--              </template>-->
<!--            </el-table-column>-->

            <el-table-column label="操作" fixed="right" min-width="170" align="center">
              <template slot-scope="scope">
                <el-button type="text" @click.native.stop="editButton(scope.row)">充值</el-button>
              </template>
            </el-table-column>
          </Table>
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
  import { getCarAccountList,addCarAccountList,addHKCarAccountList,exportTemp} from '@/api/thirdPartyRecharge'
  import Table from '@/components/Table'
  import SearchForm from './components/SearchForm'
  import EditForm from './components/EditForm'
  import Details from './components/Details'
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
      return getCarAccountList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    // 创建
    handleCreate(params) {
      console.log(params)
      var parm;
      // if(params.ifOwe==='0'){
        parm = {
          orgId:params.orgId,
          amount:params.amount,
          cardRechargeRecords:params.cardRechargeRecords,
          rechargeType:params.online,
          rechargeWay:params.rechargeWay,
          serialNumber:params.serialNumber,
          cashAccount:params.cashAccount,
          paymentTime:params.paymentTime,
          photo:params.photo,
          remark:params.remark,
        }
        return addCarAccountList(parm).then((res) => {
          this.editLoading = true
          if (res.data.code === 200) {
            this.$message({ message: '操作成功', type: 'success' })
            this.editVisible = false
            this.handleSearch()
          } else {
            this.$message({ message: res.data.msg, type: 'error' })
          }
        })
      // }
      // else {
      //   parm = {
      //     orgId:params.orgId,
      //     amount:params.amount,
      //     rechargeType:params.online,
      //     rechargeWay:params.rechargeWay,
      //     serialNumber:params.serialNumber,
      //     cashAccount:params.cashAccount,
      //     paymentTime:params.paymentTime,
      //     photo:params.photo,
      //     remark:params.remark,
      //   }
      //   return addHKCarAccountList(parm).then((res) => {
      //     this.editLoading = true
      //     if (res.data.code === 200) {
      //       this.$message({ message: '操作成功', type: 'success' })
      //       this.editVisible = false
      //       this.handleSearch()
      //     } else {
      //       this.$message({ message: res.data.msg, type: 'error' })
      //     }
      //   })
      // }


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
    handleEditConfirm(params) {

      const param = {
        ...params,
        rechargeType:params.online
      }

      if(params.ifOwe==='1'){
        const num = params.cardRechargeRecords.reduce(function(prev, cur) {
          return Number(cur.amount) + prev;
        }, 0);

        if (num>Number(params.amount)){
          this.$message.error('充值金额超过总金额');
          return
        }
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
      this.currentEditParams = { ...row }
      // this.detailsVisible = true
      this.$router.push({name:'thirdPartyRechargeDetails',params:{value:this.currentEditParams}})
    },
    // 编辑界面
    editButton(row){
      // this.currentEditParams = { ...row }
      this.currentEditParams = {
        orgId:row.orgId,
        name:row.name,
        ifOwe:row.ifOwe
      }

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
      const searchForm = this.$refs['searchForm']
      const value = searchForm.getParams()
      var parms ={
        tenantId:this.tenantId,
        name:value.name,
        enterpriseCode:value.enterpriseCode
      }
      return exportTemp(parms).then( response =>{
        download(response.data,'车队账户统计.xlsx')
      }).catch(e=>console.log(e))
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
