<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">
      <el-button @click="$router.push('/dealInfo/gasStaReconciliation')" type="text" icon="el-icon-back" ghost>返回</el-button>
      <el-divider direction="vertical"></el-divider>
      <span>对账明细</span>
    </h3>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>明细列表</span>
        <div v-loading="loading" class="info">
          <span>对账文件：{{ params.fileName }}</span>
          <span>文件上传时间：{{ moment(params.uploadTime).format('YYYY-MM-DD HH:mm:ss') }}</span>
          <span>对账数据：{{ params.contentNum }} 条</span>
          <span>对账结果：{{ params.checkResult|checkResult }}</span>
          <span>异常数据：{{ params.abnormalNum }} 条 </span>
          <span>重复数据：{{ params.repeatNum }} 条 </span>
        </div>
      </div>
      <div class="tips">注意：此对账明细，以对账文件流水为准</div>
      <Table v-loading="loading" ref="table" height="calc(100% - 60px);" >
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column width="220" label="交易时间" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tradingTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="流水号" align="center">
          <el-table-column width="200" label="对账文件" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('4') ? '#C03639' : '' }">
                {{ scope.row.serialNum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column width="200" label="平台账户" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('4') ? '#C03639' : '' }">
                {{ scope.row.serialNum2 }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="卡号" align="center">
          <el-table-column width="300" label="对账文件" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('1') ? '#C03639' : '' }">
                {{ scope.row.cardNum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column width="300" label="平台账户" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('1') ? '#C03639' : '' }">
                {{ scope.row.cardNum2 }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="枪号" align="center">
          <el-table-column label="对账文件" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('2') ? '#C03639' : '' }">
                {{ scope.row.gasNum }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="平台账户" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('2') ? '#C03639' : '' }">
                {{ scope.row.gasNum2 }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column label="金额/元" align="center">
          <el-table-column width="150" label="对账文件" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('3') ? '#C03639' : '' }">
                {{ scope.row.money }}
              </span>
            </template>
          </el-table-column>
          <el-table-column width="150" label="平台账户" align="center">
            <template slot-scope="scope">
              <span :style="{ color:scope.row.checkResult.split(',').includes('3') ? '#C03639' : '' }">
                {{ scope.row.money2 }}
              </span>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column width="220" label="公司名" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.companyName }}</span>
          </template>
        </el-table-column>

        <el-table-column width="220" label="车牌号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.carNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="单价/元" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.unitPrice }}</span>
          </template>
        </el-table-column>

        <el-table-column label="气量/kg" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tolerance }}</span>
          </template>
        </el-table-column>

        <el-table-column label="班组号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.teamNo }}</span>
          </template>
        </el-table-column>

        <el-table-column label="员工号" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.employeeNum }}</span>
          </template>
        </el-table-column>

        <el-table-column
          min-width="150"
          label="对账结果"
          sortable 
          prop="checkResult"
          align="center"
          :sort-method="(a,b)=>a==='0' ? -1 : 0"
        >
          <template slot-scope="scope">
            <ul>
              <li v-for="(item,index) of scope.row.checkResult.split(',')" :key="index">
                {{ resList.find(res => res.itemValue === item).itemText}}
              </li>
            </ul>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button 
              v-if="!['0','5'].includes(scope.row.checkResult) && !scope.row.processingStatus" 
              @click.native.stop="handleAbnormalButton(scope.row)" 
              type="text"
            >
              处理
            </el-button>
            <el-button 
              v-else-if="scope.row.processingStatus"
              @click.native.stop="handleShorResButton(scope.row)" 
              type="text"
            >
              处理结果
            </el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <EditForm 
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      :unbalancedList="unbalancedList"
      @ok="handleEditConfirm"
    />
    <Details
      :visible.sync="detailsVisible"
      :dataSource.sync="currentEditParams"
      :unbalancedList="unbalancedList"
    />
  </div>
</template>

<script>
import { getResApi,handleResApi } from '@/api/reconciliation'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import EditForm from './components/EditForm'
import Details from './components/Details'
import moment from 'moment'
const reConciliationRes = [
  { itemText:'平衡',itemValue:'0' },
  { itemText:'不平',itemValue:'1' },
]
export default {
  filters:{
    checkResult(val){
      if(!val) return ''
      return reConciliationRes.find(item=>item.itemValue === val ).itemText
    }
  },
  data() {
    return {
      detailsVisible:false,
      editVisible: false, // 控制弹出框
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      params:{},
      reConciliationRes,
      resList:[],
      unbalancedList:[],
      moment,
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
  },
  mounted() {
    this.getDict('不平衡原因').then(res=>{
      this.unbalancedList = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
    this.getDict('对账结果').then(res=>{
      this.resList = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
    this.handleSearch()
  },
  methods: {
    // 格式化查询参数
    getFormatedSearchParams(){
      const query = new URLSearchParams()
      query.append('current', this.currentPage)
      query.append('size', this.pageSize)
      query.append('tenantId', this.tenantId)
      return { query }
    },
    // 查询
    handleSearch(){
      console.log(this.tenantId)
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return getResApi(this.$route.params.id).then(response => {
        this.loading = false
        let data = response.data.data
        let total = response.data.data
        this.params = data.file
        table.complete({data:data.findFileDetail})
        return data
      })
    },
    //编辑/更新
    handleRes(params){
      return handleResApi(params).then((res) => {
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
        this.editLoading = true
        this.handleRes(params).finally(()=>{
          this.editLoading = false
        })    
      })
    },
    // 处理异常按钮
    handleAbnormalButton(row){
      this.currentEditParams = { ...row }
      this.editVisible = true
      this.detailsVisible = false
    },
    //处理结果按钮
    handleShorResButton(row){
      this.currentEditParams = { ...row }
      this.detailsVisible = true
      this.editVisible = false
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
    EditForm,
    Table,
    Details,
  },
}
</script>
<style lang="scss" scoped>
  @import '@/styles/variables.scss';
  .app-container{
    margin:0;
    padding:0;
    background:transparent;
    height:calc(100vh - 85px);
    overflow:auto;
    .title{
      margin:0;
      padding:12px 20px;
      background:#FFF;
    }
    .main{
      height:calc(100% - 80px);
      padding:24px;
      margin:20px;
      background:#FFF;
      margin-bottom:0;
      display:flex;
      flex-flow:column nowrap;
      .header{
        margin-bottom:12px;
        display:flex;
        justify-content: space-between;
        align-items: center;
        .info{
          font-size:12px;
          font-weight:normal;
          color:rgba(0,0,0,0.85);
          &>span:not(:first-child){
            margin-left:24px;
          }
        }
      }
      .tips{
        font-size:12px;
        color:$red;
        margin-bottom:8px;
      }
    }
  }
</style>