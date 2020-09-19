<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">防火巡查记录</h3>
    <SearchForm ref="searchForm" :search-loading="loading" @beforeSearch="handleBeforeSearch" @search="handleSearch" />
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>防火巡查列表</span>
        <div class="buttons">
          <el-button class="filter-item" size="small" type="primary" icon="el-icon-plus" @click="editVisible = true">新建</el-button>
        </div>
      </div>
<!--      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true">-->
      <Table ref="table" v-loading="loading" :page.sync="currentPage" :size.sync="pageSize" :has-page="true" @row-click="handleTableRowClick">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="巡查时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionTime}}</span>
          </template>
        </el-table-column>

        <el-table-column label="有无违章用火用电" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fireElectric ==='1' ? '有' : '无'}}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全出口疏散通道是否通畅" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.safetyExit ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="安全疏散标志、应急照明是否完好" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.safetyEvacuation ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="消防设施器材是否完好" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fireFidevice ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="常闭式防火门是否处于关闭状态" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fireDoor ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="防火卷帘下是否堆放物品影响使用" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fireCurtain ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="消防安全重点人员是否在位" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fireSafety ==='1' ? '是' : '否'   }}</span>
          </template>
        </el-table-column>

        <el-table-column label="巡检人签字" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.inspectionPersonnel }}</span>
          </template>
        </el-table-column>

        <el-table-column label="主管人员签字" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.executive }}</span>
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
      :data-source.sync="currentEditParams"
      :confirm-loading.sync="editLoading"
      @ok="handleEditConfirm"
    />
    <Details :visible.sync="detailsVisible" :data-source.sync="currentEditParams" />
  </div>
</template>

<script>
import { getFireList,addFire,deleteFire,updateFire } from '@/api/fire'
import { parseTime } from '@/utils/index'
import commonMixins from './mixins'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import EditForm from './components/EditForm'
import Details from './components/Details'
export default {
  components: {
    SearchForm,
    EditForm,
    Table,
    Details,
  },
  mixins: [commonMixins],
  data() {
    return {
      editVisible: false, // 控制弹出框
      detailsVisible: false,
      bMapPoiSelectorVisible: false,
      currentEditParams: null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
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
    parseTime,
    // 格式化查询参数
    getFormatedSearchParams() {
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
    handleSearch() {
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return getFireList(query).then(response => {
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
      this.$confirm('此操作将删除记录, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteFire({id:row.id}).then(response => {
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
      return addFire(params).then((res) => {
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
      return updateFire(params).then((res) => {
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
    editButton(row) {
      this.currentEditParams = { ...row }
      this.editVisible = true
    },
    // 查询重置之前
    handleBeforeSearch() {
      this.currentPage = 1
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
