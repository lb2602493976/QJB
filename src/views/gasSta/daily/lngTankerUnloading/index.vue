<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">LNG槽车卸液记录</h3>
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

        <el-table-column label="接车阶段" width="160" align="center">
          <el-table-column label="车牌号" width="150" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.carNum }}</span>
            </template>
          </el-table-column>

          <el-table-column label="铅封号" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.sealNo }}</span>
            </template>
          </el-table-column>

          <el-table-column label="接车人" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingMan }}</span>
            </template>
          </el-table-column>

          <el-table-column label="司机" width="160" align="center">
            <el-table-column label="姓名" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.driverName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.driverTel }}</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="押运员" width="160" align="center">
            <el-table-column label="姓名" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.mobilizationName }}</span>
              </template>
            </el-table-column>
            <el-table-column label="联系电话" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.mobilizationTel }}</span>
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column label="填表日期" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.dateFilling }}</span>
            </template>
          </el-table-column>

          <el-table-column label="出厂时间" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.factoryTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="进站时间" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.stationTime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="出厂总重/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.totalWeight }}</span>
            </template>
          </el-table-column>

          <el-table-column label="出厂净重/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.netWeight }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车负责人" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingSupervisor }}</span>
            </template>
          </el-table-column>

        </el-table-column>

        <el-table-column label="开始卸车" align="center">
          <el-table-column label="卸车前泵池温度/℃" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.poolTemperature }}</span>
            </template>
          </el-table-column>

          <el-table-column label="开始卸车时间" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingTime }}</span>
            </template>
          </el-table-column>
          
          <el-table-column label="总重/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingTotalWeight }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐压力/MPa" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingPressure }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐液位/m" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingTankLevel }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐质量/kg" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingTankQuality }}</span>
            </template>
          </el-table-column>

          <el-table-column label="槽车压力/MPa" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingTankLorry }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车员" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingMemberOns }}</span>
            </template>
          </el-table-column>

        </el-table-column>

        <el-table-column label="卸车中" align="center">
          <el-table-column label="卸车中泵池温度/℃" width="160" align="center">
              <template slot-scope="scope">
                <span>{{ scope.row.poolTemperature2 }}</span>
              </template>
          </el-table-column>
            
          <el-table-column label="卸车中加气密度（kg/m³）" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.densityOfGasFillingInProgress }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车中加气温度/℃" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.temperatureOfGasFillingInProgress }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车员" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingMemberInp }}</span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="卸车后" width="160" align="center">
          <el-table-column label="卸车后泵池温度/℃" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.poolTemperature3 }}</span>
            </template>
          </el-table-column>

          <el-table-column label="车重/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.carWeight }}</span>
            </template>
          </el-table-column>

          <el-table-column label="净重/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingNetWeight }}</span>
            </template>
          </el-table-column>

          <el-table-column label="损耗量/kg" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.wastage }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐压力/MPa" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.afterPressure }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐液位/m" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.afterTankLevel }}</span>
            </template>
          </el-table-column>

          <el-table-column label="储罐质量/kg" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.afterTankQuality }}</span>
            </template>
          </el-table-column>

          <el-table-column label="槽车压力/MPa" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.afterTankLorry }}</span>
            </template>
          </el-table-column>

          

          <el-table-column label="卸车后加气密度（kg/m³）" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.densityOfGasFilling }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车后加气温度/℃" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.temperatureOfGasFilling }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车结束时间" width="160" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingEndtime }}</span>
            </template>
          </el-table-column>

          <el-table-column label="卸车员" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.unloadingMember }}</span>
            </template>
          </el-table-column>
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
import { searchRecord,createRecord,updateRecord,deleteRecord } from '@/api/lngTankerUnloading'
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
      let newParams = { ...params }
      delete newParams.tenantId
      if(Object.values(newParams).every(item=>!item)) return this.$message.error('请填写信息') 
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