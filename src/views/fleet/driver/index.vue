<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <template v-if="['0','1'].includes(tenantType)">
        <el-button @click="$router.push('/tenant/partner')" type="text" icon="el-icon-back" ghost>返回</el-button>
        <el-divider direction="vertical"></el-divider>
      </template>
      <span>车队司机</span>
    </h3>
    <SearchForm v-if="operationPermissions.includes(tenantType)" ref="searchForm" :driverTypes="driverTypes" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <SearchForm2 v-else ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>司机列表</span>
        <div class="buttons" v-if="operationPermissions.includes(tenantType)">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="editVisible = true">新建</el-button>
        </div>
      </div>
      <Table v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="司机姓名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.driverName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="电话号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.driverTel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="身份证号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.idCard }}</span>
          </template>
        </el-table-column>

        <el-table-column label="微信号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.driverWx }}</span>
          </template>
        </el-table-column>

        <el-table-column label="准驾车型" align="center">
          <template slot-scope="scope">
            <span :class="{ green:scope.row.status==0 }">
              {{ scope.row.driverType && driverTypes.find(item => item.itemValue == scope.row.driverType).itemText  }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="驾驶车辆" align="center">
          <template slot-scope="scope">
            <span>
              {{
                scope.row.carIds.map(id => {
                  let item = cars.find(item => item.carId == id)
                  return item && item.carNum
                }).join(',')
              }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{green:!!(scope.row.status ==0)}">
              {{ scope.row.status | status }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="加入车队日期" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.joinDriver }}</span>
          </template>
        </el-table-column>

        <el-table-column label="备注" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.remark }}</span>
          </template>
        </el-table-column>

        <el-table-column v-if="operationPermissions.includes(tenantType)" label="操作" fixed="right" min-width="150" align="center">
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
      :driverTypes="driverTypes"
      :cars="cars"
      @ok="handleEditConfirm"
    />
    <Details
      :visible.sync="detailsVisible"
      :dataSource.sync="currentEditParams"
      :driverTypes="driverTypes"
      :cars="cars"
    />
  </div>
</template>

<script>
import { searchDriver,createDriver,updateDriver,deleteDriver } from '@/api/driver'
import { getAllCars } from '@/api/car'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import SearchForm2 from './components/SearchForm2'
import EditForm from './components/EditForm'
import Details from './components/Details'
export default {
  filters:{
    status(val){
      return ['正常','停用'][val]
    },
  },
  data() {
    return {
      operationPermissions:['2'],  //租户类型
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      driverTypes:[],
      cars:[],
    }
  },
  computed:{
    ...mapGetters(['tenantType']),
  },
  created(){
    this.getDict('准驾车型').then(res=>{
      this.driverTypes = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
    getAllCars().then(response => {
      console.log()
      this.cars = response.data.data
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
      return { query,params }
    },
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return searchDriver(query).then(response => {
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
      this.$confirm('此操作将删除司机信息, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteDriver(row.id).then(response => {
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
      return createDriver(params).then((res) => {
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
    //编辑/更新
    handleUpdate(params){
      return updateDriver(params).then((res) => {
        if (res.data.code === 200) {
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
        if(isUpdate) crtOrUpdate=this.handleUpdate
        else crtOrUpdate=this.handleCreate
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
