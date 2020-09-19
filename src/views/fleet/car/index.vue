<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <template v-if="['0','1'].includes(tenantType)">
        <el-button @click="$router.push('/tenant/partner')" type="text" icon="el-icon-back" ghost>返回</el-button>
        <el-divider direction="vertical"></el-divider>
      </template>
      <span>车队车辆</span>
    </h3>
    <SearchForm v-if="operationPermissions.includes(tenantType)" ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <SearchForm2 v-else ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>车辆列表</span>
        <div class="buttons" v-if="operationPermissions.includes(tenantType)">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="editVisible = true">新建</el-button>
          <el-button class="filter-item" size="small" type="primary" @click="handleExportTemp">导出模板</el-button>
          <el-button class="filter-item" size="small" type="primary" @click="$refs['file'].click()" :loading="uploadLoading">导入数据</el-button>
        </div>
      </div>
      <Table v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="车牌号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.carNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.carType }}</span>
          </template>
        </el-table-column>

        <el-table-column label="出厂日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.factoryDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="加入车队日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.joinDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车辆状态" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{ green:scope.row.status=='0' }">
              {{ scope.row.status|status }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="保险日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.insureDate }}</span>
          </template>
        </el-table-column>

        <el-table-column label="审核日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.verifyDate }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="operationPermissions.includes(tenantType)" label="操作" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="editButton(scope.row)" type="text">编辑</el-button>
            <el-button @click.native.stop="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <input @change="handleFileChange" ref="file" style="display:none;" type="file">
    <EditForm 
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      :colorTypes="colorTypes"
      @ok="handleEditConfirm"
    />
    <Details :visible.sync="detailsVisible" :colorTypes="colorTypes" :dataSource.sync="currentEditParams"/>
  </div>
</template>

<script>
import { searchCar,createCar,updateCar,deleteCar,exportTemp,uploadApi } from '@/api/car'
import { uploadExcelFile } from '@/api/upload'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import SearchForm2 from './components/SearchForm2'
import EditForm from './components/EditForm'
import Details from './components/Details'
import commonMixins from './mixins'
import download from '@/utils/download'
export default {
  mixins:[commonMixins],
  data() {
    return {
      uploadMimes:[
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      operationPermissions:['2'],  //租户类型
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      uploadLoading:false,
      colorTypes:[],
    }
  },
  computed:{
    ...mapGetters(['tenantType','deptId','deptList']),
  },
  created(){
    this.getDict('车牌颜色代码').then(res=>{
      this.colorTypes = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
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
      if(this.tenantType == 2){
        query.append('deptList', this.deptList)
      } 
      return { query,params }
    },
    // 查询
    handleSearch(){
      console.log(this.tenantId)
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return searchCar(query).then(response => {
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
      this.$confirm('此操作将删除车辆, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteCar(row.truckinfoId).then(response => {
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
      return createCar(params).then((res) => {
        this.editLoading = true
        if (res.data.data === 1) {
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
      return updateCar(params).then((res) => {
        if (res.data.data === 1) {
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
    //导出模板
    handleExportTemp(){
      return exportTemp().then( response =>{
        download(response.data,'车队车辆信息导入模板.xls')
      }).catch(e=>console.log(e))
    },
    //上传文件改变
    async handleFileChange(e){
      let file = e.target.files[0]
      if(!this.uploadMimes.includes(file.type)) return this.$message.error('只支持 .xls 与 .xlsx 为后缀名的excel文件')
      this.uploadLoading = true
      let url = await uploadExcelFile(file,this.uploadOpts).then(response=>{
        return response.data.url
      }).catch(()=>{
        this.uploadLoading = false
      })
      uploadApi({url,deptId:this.deptId}).then(response=>{
        if(response.data.data){
          this.$message.success('上传成功')
          this.handleSearch()
          e.target.value = ''
        }else{
          this.$message.error(response.data.msg)
        }
      }).finally(()=>{
        this.uploadLoading = false
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
    SearchForm2,
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