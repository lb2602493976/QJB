<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">安全生产会议记录</h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>记录列表</span>
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
        
        <el-table-column label="时间" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.meetingDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="地点" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.meetingPlace }}</span>
          </template>
        </el-table-column>

        <el-table-column label="主持人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.host }}</span>
          </template>
        </el-table-column>

        <el-table-column label="参加人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.participants }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
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
    <Details :visible.sync="detailsVisible" :dataSource.sync="currentEditParams"/>
  </div>
</template>

<script>
import { searchRecord,createRecord,updateRecord,deleteRecord } from '@/api/safetyProd'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import EditForm from './components/EditForm'
import Details from './components/Details'
export default {
  data() {
    return {
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
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
      console.log(this.tenantId)
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return searchRecord(query).then(response => {
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
      this.$confirm('此操作将删除记录, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteRecord(row.id).then(response => {
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
      return createRecord(params).then((res) => {
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
      return updateRecord(params).then((res) => {
        if (res.data.data) {
          this.$message({ message: '操作成功', type: 'success' })
          this.editVisible = false
          this.handleSearch()
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
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
    Details,
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