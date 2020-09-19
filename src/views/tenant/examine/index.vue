<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">租户审核</h3>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>审核列表</span>
      </div>
      <el-tabs @tab-click="handleSearch" v-model.trim="activeName">
        <el-tab-pane label="等待审核" name="0"/>
        <el-tab-pane label="审核通过" name="1"/>
        <el-tab-pane label="审核拒绝" name="2"/>
      </el-tabs>
      <Table v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>

        <el-table-column label="用户名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="租户类型" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantType && tenantTypes.find(item => scope.row.tenantType == item.itemValue).itemText }}</span>
          </template>
        </el-table-column>

        <el-table-column label="名称"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantName  }}</span>
          </template>
        </el-table-column>

        <el-table-column label="企业代码/身份证号"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.enterpriseCode || scope.row.idCard }}</span>
          </template>
        </el-table-column>

        <el-table-column label="域名" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.domainName}}.ucarline.com</span>
          </template>
        </el-table-column>

        <el-table-column label="负责人" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>

        <el-table-column label="手机号码" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contactsTel }}</span>
          </template>
        </el-table-column>
        
        <el-table-column v-if="activeName==='1'" label="平台状态" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{ green:scope.row.status==='0' }">
              {{ scope.row.status|status }}
            </span>
          </template>
        </el-table-column> 

        <!-- <el-table-column label="微信号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contactsWx }}</span>
          </template>
        </el-table-column>

        <el-table-column label="QQ号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contactsQq }}</span>
          </template>
        </el-table-column> -->

        <el-table-column v-if="activeName != '2'"  label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="passButton(scope.row)" type="text">
              {{activeName==='0' ? '审核' : '编辑'}}
            </el-button>
            <el-button v-show="activeName == '1'" @click.native.stop="resetPwdButton(scope.row)" type="text">
              重置密码
            </el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <GasStaEditForm 
      v-if="currentEditParams && currentEditParams.tenantType=='1'"
      @ok="handleEditConfirm" 
      :confirmLoaidng="editLoading"
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
    />
    <FleetEditForm
      v-else-if="currentEditParams && currentEditParams.tenantType=='2'"
      @ok="handleEditConfirm"
      :confirmLoaidng="editLoading"
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
    />
  </div>
</template>

<script>
import { restPass, } from '@/api/user'
import { fetchList,updateTenant,sendMsgAtFinish } from '@/api/tenant'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import GasStaEditForm from './components/GasStaEditForm'
import FleetEditForm from './components/FleetEditForm'
import commonMixins from './mixins'
export default {
  mixins:[commonMixins],
  data() {
    return {
      activeName:'0',
      editVisible: false, // 控制弹出框
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      tenantTypes:[],
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  created(){
    this.getDict('租户类型').then(res=>{
      this.tenantTypes = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    // 格式化查询参数
    getFormatedSearchParams(){
      const query = new URLSearchParams()
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      query.append('auditStatus', this.activeName)
      return { query }
    },
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return fetchList(query).then(response => {
        this.loading = false
        let data = response.data.data.records
        let total = response.data.data.total
        table.complete({data,total})
        return data
      })
    },
    //GasStaEditForm确认按钮
    handleEditConfirm(params){
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        updateTenant(params).then(response=>{
          if(response.data.data){
            this.$message.success('操作成功')
            this.editVisible = false
            this.handleSearch()
            sendMsgAtFinish(params)
          }else{
            this.$message.success('操作失败'+response.data.msg)
          }
        }).finally(()=>{
          this.editLoading = false
        })    
      })
    },
    //重置密码按钮
    resetPwdButton(row){
      this.$confirm('确认要重置该租户的管理员密码吗？', '提示', {
        type:'warning',
      }).then(() => {
        restPass(row.userId).then(response => {
          if (response.data.data) {
            this.$message({
              type: 'success',
              message: '重置密码成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            })
          }
        })   
      })
    },
    //表格行点击
    handleTableRowClick(row){
      this.currentEditParams = { ...row }
      this.$nextTick(()=>{
        this.editVisible = true
      })
    },
    //审核按钮
    passButton(row){
      this.currentEditParams = { ...row }
      this.$nextTick(()=>{
        this.editVisible = true
      })
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
    Table,
    GasStaEditForm,
    FleetEditForm,
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