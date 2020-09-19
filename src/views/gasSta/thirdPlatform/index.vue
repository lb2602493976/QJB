<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">第三方平台管理</h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>平台列表</span>
        <div class="buttons">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="editVisible = true">新建</el-button>
        </div>
      </div>
      <Table v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="平台名称" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.thirdName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="挂牌优惠" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.preferential }}</span>
          </template>
        </el-table-column>

        <el-table-column label="真实优惠" width="200" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.realPreferential }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="setCouponsButton(scope.row)" type="text">设置优惠</el-button>
            <el-button @click.native.stop="editButton(scope.row)" type="text">编辑</el-button>
            <el-button @click.native.stop="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <EditForm 
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      @ok="handleEditConfirm"
    />
    <SetCoupon 
      :visible.sync="setCouponVisible"
      :confirmLoading.sync="setCouponLoading"
      :dataSource.sync="currentEditParams"
      @setCoupon="handleSetCoupon"
    />
  </div>
</template>

<script>
import { searchApi,createApi,updateApi,deleteApi } from '@/api/thirdPlatform'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import EditForm from './components/EditForm'
import SetCoupon from './components/SetCoupon'
export default {
  data() {
    return {
      editVisible: false, // 控制弹出框
      setCouponVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      setCouponLoading:false,
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  created(){
    this.getDict('三方平台').then(res=>{
      this.thirdPlatForms = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
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
      return searchApi(query).then(response => {
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
      this.$confirm('此操作将删除该第三方平台, 是否继续?', '提示', { type: 'warning' }).then(() => {
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
    //创建
    handleCreate(params){
      return createApi(params).then((res) => {
        this.editLoading = true
        if (res.data.data) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false
          this.handleSearch()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
      })
    },
    //编辑/更新
    handleUpdate(params){
      return updateApi(params).then((res) => {
        if (res.data.data) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false
          this.handleSearch()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
        return res
      })
    },
    //editForm确认按钮
    handleEditConfirm(params,isUpdate){
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let crtOrUpdate;
        this.editLoading = true
        if(isUpdate) crtOrUpdate = this.handleUpdate
        else crtOrUpdate = this.handleCreate
        crtOrUpdate(params).finally(()=>{
          this.editLoading = false
        })    
      })
    },
    //设置优惠
    handleSetCoupon(params,ref){
      this.$confirm('确认要设置该优惠吗？','提示').then(()=>{
        this.setCouponLoading = true
        return this.handleUpdate(params).then(response => {
            if(response.data.data) {
                this.setCouponVisible = false
            }else{
                this.$message.error(response.data.msg)
            }
        }).finally(()=>{
            this.setCouponLoading=false
        })
      })
    },
    //设置优惠按钮
    setCouponsButton(row){
      this.currentEditParams = { ...row }
      this.setCouponVisible = true
    },
    //表格行点击
    handleTableRowClick(row){
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
    EditForm,
    Table,
    SetCoupon,
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