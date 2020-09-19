<template>
  <div class="app-container">
    <!-- 标题 -->
    <el-row type="flex" justify="space-between" class="title">
      <h3>收银交班</h3>
      <el-button @click="$router.push('/gasSta/shiftOverLog')" type="text" ghost>查看交班日志</el-button>
    </el-row>
    <div class="prev-info-container">
      <el-divider content-position="left">上一次交班记录</el-divider>
      <table></table>
      <el-row style="width:1200px;" type="flex" justify="space-between" class="row">
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">交班时间：</label>
          <span class="content">{{prevInfo.createTime && moment(prevInfo.createTime).format('YYYY-MM-DD HH:mm:ss')}}</span>
        </el-col>
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">交班人：</label>
          <span class="content">{{prevInfo.includingPeople}}</span>
        </el-col>
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">销售额合计：</label>
          <span class="content">{{prevInfo.totalAmount &&'￥'+ Number(prevInfo.totalAmount)}}</span>
        </el-col>
      </el-row>
      <el-row style="width:1200px;" type="flex" justify="space-between" class="row">
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">气枪总读数：</label>
          <span class="content">{{prevInfo.gasTotal && Number(prevInfo.gasTotal)+'kg'}}</span>
        </el-col>
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">储罐剂余量：</label>
          <span class="content">{{prevInfo.surplus && Number(prevInfo.surplus)+'kg'}}</span>
        </el-col>
        <el-col class="col">
          <label :style="{ width:`${ labelWidth }px`}" class="label">备用金：</label>
          <span class="content">{{prevInfo.pettyCash && '￥'+Number(prevInfo.pettyCash)}}</span>
        </el-col>
      </el-row>
      <el-row class="row" type="flex" justify="end">
        <el-button type="primary" size="small" @click="confirmPrevShiftButton">确认交班数据</el-button>
      </el-row>
    </div>
    <div class="main">
      <!-- 主体头部 -->
      <el-divider content-position="left">本班销售记录</el-divider>
      <el-row :gutter="20" type="flex" justify="center" class="data-container">
        <el-col>
          <el-row type="flex" justify="space-between" class="salesInfo row header">
            <el-col class="col">款项</el-col>
            <el-col class="col">金额（元）</el-col>
          </el-row>
          <el-row v-for="(item,index) of listLeft" :key="index" type="flex" justify="space-between" class="salesInfo row">
            <el-col class="col">
              {{ item.name }}
            </el-col>
            <el-col class="col">
              {{Number(item.money)}}
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" justify="space-between" class="salesInfo row header">
            <el-col :span="4" class="col">款项</el-col>
            <el-col :span="4" v-for="(item,index) of payTypesD" :key="index" class="col">{{item.itemText}}（元）</el-col>
            <el-col :span="4" class="col">合计（元）</el-col>
          </el-row>
          <template v-for="(item,index) of listRight" >
            <el-row type="flex" :key="index" justify="space-between" class="paytype salesInfo row">
              <el-col :span="4" class="col">{{ item.name }}</el-col>
              <el-col :span="4" v-for="(item2,index2) of payTypesD" :key="index2+'payType'" class="col">
                {{ item.logPayType.find(payType=>payType.payType == item2.itemValue).payMoney || 0 }}
              </el-col>
              <el-col :span="4" class="col">{{ Number(item.money) }}</el-col>
            </el-row>
          </template>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end" align="center" class="total">合计：{{Number(totalAmount)}}</el-row>
      <el-divider content-position="left">本班预充值记录</el-divider>
      <el-row :gutter="20" type="flex" justify="center" class="data-container">
        <el-col>
          <el-row type="flex" justify="space-between" class="salesInfo row header">
            <el-col class="col">款项</el-col>
            <el-col class="col">金额（元）</el-col>
          </el-row>
          <el-row v-for="(item,index) of listLeft2" :key="index" type="flex" justify="space-between" class="salesInfo row">
            <el-col class="col">
              {{ item.name }}
            </el-col>
            <el-col class="col">
              {{Number(item.money)}}
            </el-col>
          </el-row>
        </el-col>
        <el-col>
          <el-row type="flex" justify="space-between" class="salesInfo row header">
            <el-col class="col">款项</el-col>
            <el-col class="col">合计（元）</el-col>
          </el-row>
          <el-row v-for="(item,index) of listRight2" :key="index" type="flex" justify="space-between" class="salesInfo row">
            <el-col class="col">
              {{ item.name }}
            </el-col>
            <el-col class="col">
              {{Number(item.money)}}
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row type="flex" justify="end" align="center" class="total">合计：{{Number(totalRecharge)}}</el-row>
      <el-row style="margin-top:24px;" type="flex" justify="end">
        <el-button type="primary" size="small" @click="confirmShiftOverButton">交班</el-button>
      </el-row>
    </div>
    <EditForm 
      :visible.sync="editVisible"
      :dataSource.sync="currentEditParams"
      :confirmLoading.sync="editLoading"
      :payTypesD="payTypesD"
      :currentInfo="currentInfo"
      :logRecharge="logRecharge"
      :guns="guns"
      :prevInfo="prevInfo"
      @ok="handleEditConfirm"
    />
  </div>
</template>

<script>
import { getGunsByTenantId,getPayTypeByTenantId,getlogList2,updatePrevLog,getLogData,doShiftOver } from '@/api/shiftOver'
import { mapGetters } from 'vuex'
import Table from '@/components/Table'
import EditForm from './components/EditForm'
import moment from 'moment'
export default {
  data() {
    return {
      currentEditParams:{},
      params:{},
      moment,
      labelWidth:80,
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      currentEditParams:null,
      currentPage: 1,
      pageSize: 10,
      loading: false,
      editLoading: false,
      guns:[],
      payTypesD:[],
      prevInfo:{},
      currentInfo:[],
      logRecharge:[],
      currentIndex:-1,
      reconiliationStatus:-1,
    }
  },
  computed:{
    ...mapGetters(['tenantId']),
    listLeft(){
      return this.currentInfo.filter(item=>item.type==='0')
    },
    listRight(){
      return this.currentInfo.filter(item=>item.type==='1')
    },
    listLeft2(){
      return this.logRecharge.filter(item=>item.type==='0')
    },
    listRight2(){
      return this.logRecharge.filter(item=>item.type==='1')
    },
    totalAmount(){
      if(this.isUpdate){
        return Number(this.prevInfo.totalAmount)
      }else{
        return this.currentInfo.reduce((res,item)=>{
          return res+Number(item.money)
        },0)
      }
    },
    totalRecharge(){
      if(this.isUpdate){
        return Number(this.prevInfo.totalRecharge)
      }else{
        return this.logRecharge.reduce((res,item)=>{
          return res+Number(item.money)
        },0)
      }
    }
  },
  created(){
    this.getDict('支付方式').then(res=>{
      this.payTypesD = this.dicts.sort((a,b)=>a.itemValue - b.itemValue)
    })
    getGunsByTenantId(this.tenantId).then( response => {
      this.guns = response.data.data.selGun
      this.reconiliationStatus = response.data.data.findCheckStatus
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
      query.append('tenantId', this.tenantId)
      query.append('status','1')
      return { query }
    },
    // 查询
    handleSearch(){
      this.loading = true
      let table = this.$refs['table']
      let { query } = this.getFormatedSearchParams()
      return Promise.all([
        getlogList2(this.tenantId).then(({data:{data}})=>data),
        getLogData(this.tenantId).then(({data:{data}})=>data)
      ]).then(([prevInfo,currentInfo])=>{
        this.prevInfo = prevInfo || {}
        this.currentInfo = currentInfo.selBaseOrder
        this.logRecharge = currentInfo.logRecharge
      }).finally(()=>{
        this.loading = false
      })
    },
    //确认上次交班信息按钮
    confirmPrevShiftButton(){
      this.currentEditParams = { ...this.prevInfo,id:this.prevInfo.id || -1  }
      this.$nextTick(()=>{
        this.editVisible = true
      })
    },
    //本次交班按钮
    confirmShiftOverButton(){
      if(this.prevInfo.status!=='1') return this.$message.error('不能进行交班操作，还未确认上次交班数据')
      if(this.reconiliationStatus>0) return this.$message.error('不能进行交班操作，存在未对账的数据')
      this.currentEditParams = { }
      this.editVisible = true
    },
    //更改上次交班信息
    handleConfirmPrevInfo(params){
      return updatePrevLog(params).then(response=>{
        if(response.data.data){
          this.$message.success('修改成功')
          this.editVisible = false
          this.handleSearch()
        }else{
          this.$message.error(response.data.msg)
        }
      })
    },
    //交班
    handleShiftOver(params){
      return doShiftOver(params).then(response=>{
        if(response.data.data){
          this.$message.success('交班成功')
          this.editVisible = false
          this.handleSearch()
        }else{
          this.$message.error(response.data.msg)
        }
      })
    },
    //editForm确认按钮
    handleEditConfirm(params,isCfm){
      this.$confirm('确认提交吗？', '提示', {}).then(() => {
        let cfmOrShift;
        this.editLoading = true
        if(isCfm) cfmOrShift = this.handleConfirmPrevInfo
        else cfmOrShift = this.handleShiftOver
        cfmOrShift(params).finally(()=>{
          this.editLoading = false
        })    
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
    EditForm,
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
      &>h3{
        display:flex;
        justify-content: center;
        align-items: center;
      }
    }
    .pay-type-container{
      padding:12px;
      font-size:14px;
      line-height:1.5;
      color:rgba(0,0,0,0.65);
    }
    .prev-info-container{
      margin:24px;
      padding:12px 24px 24px 24px;
      background:#FFF;
      .row{
        margin-top:20px;
        .col{
          display:flex;
          justify-content: flex-start;
          align-items: stretch;
          .label{
            text-align:right;
            font-weight:bold;
            display: inline-block;
          }
          .content{
            font-size:14px;
            color:rgba(0,0,0,0.65);
          }
        }
      }
    }
    .main{
      padding:24px;
      margin:20px;
      background:#FFF;
      margin-bottom:0;
      .header{
        display:flex;
        justify-content: space-between;
        align-items: center;
      }
      .data-container{
        .salesInfo.row{
          border-bottom:1px solid #DDD;
          &.header{
            border:1px solid #DDD;
            background:#FAFAFA;
          }
          .col{
            text-align:center;
            font-size:14px;
            color:rgba(0,0,0,0.65);
            line-height:3.8;
          }
        }
      } 
      .total{
        color:rgba(0,0,0,0.65);
        font-weight:bold;
        font-size:16px;
        margin-top:24px;
      }
    }
  }
</style>