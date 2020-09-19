<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">气站对账</h3>
    <SearchForm ref="searchForm" :reConciliationRes="reConciliationRes" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>对账列表</span>
        <div class="buttons">
          <el-button 
            class="filter-item"
            size="small"
            type="primary"
            icon="el-icon-plus"
            @click="handleUpload"
            :loading="uploadLoading"
          >
            {{ uploadText }}
            {{ uploadProgress!=='' ? `\0\0（${uploadProgress}%）` : '' }}
          </el-button>
        </div>
      </div>
      <Table v-loading="loading" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="文件名称"  align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.fileName }}</span>
          </template>
        </el-table-column>

        <el-table-column sortable prop="b" label="文件上传时间" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.uploadTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="交易笔数" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contentNum }}</span>
          </template>
        </el-table-column>

        <el-table-column label="对账状态" width="160" align="center">
          <template slot-scope="scope">
            <span 
              class="status-box"
              :class="{
                statusBox:![null,undefined,''].includes(scope.row.checkStatus),
                green:scope.row.checkStatus == 1,
              }"
            >
              {{ scope.row.checkStatus | checkStatus }}
            </span>
          </template>
        </el-table-column>

        <el-table-column sortable prop="e" label="对账时间" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.checkTime }}</span>
          </template>
        </el-table-column>

        <el-table-column label="对账结果" width="160" align="center">
          <template slot-scope="scope">
            <span 
              :class="{
                statusBox:![null,undefined,''].includes(scope.row.checkResult),
                green:scope.row.checkResult == 1,
              }"
            >
              {{ scope.row.checkResult | checkResult }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="50" align="center">
          <template slot-scope="scope">
            <el-button v-if="scope.row.checkStatus==0" :disabled="analysing" @click.native.stop="detailsButton(scope.row)" type="text">对账</el-button>
            <el-button v-else @click.native.stop="detailsResButton(scope.row)" type="text">对账结果</el-button>
            <el-button v-show="scope.row.checkStatus==0" @click.native.stop="handleDelete(scope.row)" type="text">删除</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="analysing"
      width="400px"
      top="calc(50vh - 120px)"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @close="analysePercent = 0"
    >
      <div class="analysing-container">
        <el-progress style="margin:0 24px 24px 24px;width:100%;"  :text-inside="true" :stroke-width="20" :percentage="analysePercent"></el-progress>
        <p>正在分析结果，请勿刷新页面</p>
      </div>
    </el-dialog>
    <input @change="handleFileChange" ref="file" style="display:none;" type="file">
  </div>
</template>

<script>
import { searchApi,uploadApi,deleteApi,doApi } from '@/api/reconciliation'
import { uploadExcelFile } from '@/api/upload'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'

//状态字典
const reConciliationStatus = [
  { itemText:'未对账',itemValue:'0' },
  { itemText:'已对账',itemValue:'1' },
]
const reConciliationRes = [
  { itemText:'平衡',itemValue:'0' },
  { itemText:'不平',itemValue:'1' },
]
export default {
  filters:{
    checkStatus(val){
      if(!val) return ''
      return reConciliationStatus.find(item=>item.itemValue == val).itemText
    },
    checkResult(val){
      if(!val) return ''
      return reConciliationRes.find(item=>item.itemValue == val).itemText
    },
  },
  data() {
    let that = this
    return {
      uploadMimes:[
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ],
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      uploadLoading: false,
      analysing:false,
      reConciliationRes,
      reConciliationRes,
      uploadText:'上传',
      uploadProgress:'',
      analysePercent:0,
      uploadOpts:{
        onUploadProgress(e){
          that.uploadProgress = e.loaded / e.total * 100 
        },
      },
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
      this.$confirm('此操作将删除该对账记录, 是否继续?', '提示', { type: 'warning' }).then(() => {
        deleteApi(row.fileId).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功'})
            that.handleSearch()
          } else {
            this.$message({type: 'error',message: response.data.msg})
          }
        })
      })
    },
    //上传文件按钮
    handleUpload(){
      this.$refs['file'].click()
    },
    //上传文件改变
    async handleFileChange(e){
      let file = e.target.files[0]
      if(!this.uploadMimes.includes(file.type)) return this.$message.error('只支持 .xls 与 .xlsx 为后缀名的excel文件')
      this.uploadLoading = true
      this.uploadProgress = 0
      let url = await uploadExcelFile(file,this.uploadOpts).then(response=>{
        return response.data.url
      }).catch(()=>{
        this.uploadLoading = false
      }).finally(()=>{
        this.uploadProgress = ''
      })
      this.uploadText = '正在写入数据...'
      uploadApi(url).then(response=>{
        if(response.data.data){
          this.$message.success('上传成功')
          this.handleSearch()
          e.target.value = ''
        }else{
          this.$message.error(response.data.msg)
        }
      }).finally(()=>{
        this.uploadLoading = false
        this.uploadText = '上传'
      })
    },
    // 对账/明细
    detailsButton(row){
      this.analysing = true
      let timer = setInterval(()=>{
        this.analysePercent += Math.round(Math.random()*5)
        if(this.analysePercent>99) {
          this.analysePercent = 99
          clearInterval(timer)
        }
      },1000)
      doApi(row.fileId).then(response =>{
        if(response.data.data){
          clearInterval(timer)
          this.analysePercent = 100
          setTimeout(()=>{
            this.analysing = false
            this.$router.push(`/dealInfo/gasStaReconciliationDetails/${row.fileId}`)
          },500)
        }else{
          clearInterval(timer)
          this.$message.error(response.data.msg)
          this.analysing = false
          this.$nextTick(()=>{
            this.analysePercent = 0
          })
        }
      }).catch(()=>{
        clearInterval(timer)
        this.analysing = false
        this.$nextTick(()=>{
          this.analysePercent = 0
        })
      })
    },
    //对账结果按钮
    detailsResButton(row){
      this.$router.push(`/dealInfo/gasStaReconciliationDetails/${row.fileId}`)
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
    Table,
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
    .analysing-container{
      display:flex;
      flex-flow:column nowrap;
      align-items: center;
    }
  }
</style>