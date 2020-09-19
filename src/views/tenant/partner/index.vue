<template>
  <div class="app-container">
    <!-- 标题 -->
    <h3 class="title">合作伙伴</h3>
    <SearchForm ref="searchForm" @beforeSearch="handleBeforeSearch" @search="handleSearch" :searchLoading="loading"/>
    <div class="main">
      <!-- 主体头部 -->
      <div class="header">
        <span>伙伴列表</span>
        <div class="buttons">
          <el-button @click="handleOpenInviteCode('mine')">我的专属邀请码</el-button>
          <el-button @click="handleOpenInviteCode('input')">填写邀请码</el-button>
        </div>
      </div>
      <el-tabs @tab-click="handleTabClick" v-model.trim="activeName">
        <el-tab-pane v-if="tenantType!='0'" label="平台" name="0"/>
        <el-tab-pane v-if="tenantType!='1'" label="气站" name="1"/>
        <el-tab-pane v-if="tenantType!='2'" label="车队" name="2"/>
      </el-tabs>
      <Table v-if="activeName=='0'" v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="企业代码" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.enterpriseCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="平台名称" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="平台负责人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="平台域名" width="160" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.domainName}}.ucarline.com</span>
          </template>
        </el-table-column>

        <el-table-column label="平台状态" width="160" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{ green:scope.row.status==0 }">
              {{ scope.row.status|status }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="delAssociatedButton(scope.row)" type="text">解除关系</el-button>
            <el-button v-show="showSetCouponButton" @click.native.stop="setCouponsButton(scope.row)" type="text">设置优惠</el-button>
          </template>
        </el-table-column>
      </Table>
      <Table v-else-if="activeName=='1'" v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="企业代码" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.enterpriseCode }}</span>
          </template>
        </el-table-column>

        <el-table-column label="气站名称" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="气站位置" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.location }}</span>
          </template>
        </el-table-column>

        <el-table-column label="气站负责人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="气站域名" width="160" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.domainName}}.ucarline.com</span>
          </template>
        </el-table-column>

        <el-table-column label="气站状态" width="160" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{ green:scope.row.status==0 }">
              {{ scope.row.status|status }}
            </span>
          </template>
        </el-table-column>

        <el-table-column label="挂牌价（元/公斤）" min-width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.gasPrices }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="delAssociatedButton(scope.row)" type="text">解除关系</el-button>
            <el-button v-show="showSetCouponButton" @click.native.stop="setCouponsButton(scope.row)" type="text">设置优惠</el-button>
          </template>
        </el-table-column>
      </Table>
      <Table v-else-if="activeName=='2'" v-loading="loading" @row-click="handleTableRowClick" ref="table" :page.sync="currentPage" :size.sync="pageSize" :hasPage="true">
        <el-table-column label="序号" width="60" fixed="left" align="center">
          <template slot-scope="scope">
            <span>{{ (currentPage-1)*pageSize+scope.$index + 1 }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="企业代码/身份证号" width="150" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.enterpriseCode || scope.row.idCard }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车队名称" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.tenantName }}</span>
          </template>
        </el-table-column>

        <el-table-column label="车辆总数" width="160" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="fleetCarButton(scope.row)" type="text">{{ scope.row.carNum }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="司机总数" width="160" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="fleetDriverButton(scope.row)" type="text">{{ scope.row.driverNum }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="车队负责人" width="160" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.contacts }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="车队域名" width="160" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.domainName}}.ucarline.com</span>
          </template>
        </el-table-column>

        <el-table-column label="车队状态" width="160" align="center">
          <template slot-scope="scope">
            <span class="status-box" :class="{ green:scope.row.status==0 }">
              {{ scope.row.status|status }}
            </span>
          </template>
        </el-table-column>
        
        <el-table-column label="操作" fixed="right" min-width="150" align="center">
          <template slot-scope="scope">
            <el-button @click.native.stop="delAssociatedButton(scope.row)" type="text">解除关系</el-button>
            <el-button v-show="showSetCouponButton"  @click.native.stop="setCouponsButton(scope.row)" type="text">设置优惠</el-button>
          </template>
        </el-table-column>
      </Table>
    </div>
    <SetCoupon 
      :visible.sync="setCouponVisible"
      :confirmLoading.sync="setCouponLoading"
      :dataSource.sync="currentEditParams"
      @setCoupon="handleSetCoupon"
    />
    <GasStaDetails ref="details" v-if="currentEditParams && currentEditParams.tenantType=='1'" :visible.sync="detailsVisible" :dataSource.sync="currentEditParams"/>
    <FleetDetails ref="details" v-else-if="currentEditParams && currentEditParams.tenantType=='2'" :visible.sync="detailsVisible" :dataSource.sync="currentEditParams"/>
    <InviteCode @search="handleSearch" :activeName="inviteCodeName" :visible.sync="inviteCodeVisible"/>
  </div>
</template>

<script>
import { fetchList, updateTenant, delAssociated,setTenantCoupon } from '@/api/tenant'
import commonMixins from './mixins'
import Table from '@/components/Table'
import SearchForm from './components/SearchForm'
import FleetDetails from './components/FleetDetails'
import GasStaDetails from './components/GasStaDetails'
import SetCoupon from './components/SetCoupon'
import InviteCode from './components/InviteCode'
import { mapGetters } from 'vuex'
export default {
  mixins:[commonMixins],
  data() {
    return {
      editVisible: false, // 控制弹出框
      detailsVisible:false,
      setCouponVisible:false,
      inviteCodeVisible:false,
      currentEditParams:null,
      activeName:'',
      inviteCodeName:'',
      currentPage: 1,
      pageSize: 10,
      loading: false,
      setCouponLoading:false,
    }
  },
  computed:{
    ...mapGetters(['tenantId','tenantType']),
    //是否显示设置优惠按钮
    showSetCouponButton(){
      if(this.tenantType == '0') return ['2'].includes(this.activeName)
      if(this.tenantType == '1') return ['0','2'].includes(this.activeName)
      if(this.tenantType == '2') return false
      return false
    },
  },
  created(){
    if(this.tenantType == '0') this.activeName = '1'
    if(this.tenantType == '1') this.activeName = '0'
    if(this.tenantType == '2') this.activeName = '1'
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
      query.append('tenantType', this.activeName)
      query.append('auditStatus', '1')
      query.append('status', '0')
      return { query,params }
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
    //解除关系
    delAssociatedButton(row){
      const that = this
      this.$confirm('此操作将解除与此租户的关系, 是否继续?', '提示', { type: 'warning' }).then(() => {
        delAssociated(row.associatedId).then(response => {
          if (response.data.code === 200) {
            this.$message({ type: 'success', message: '操作成功'})
            that.handleSearch()
          } else {
            this.$message({type: 'error',message: response.data.msg})
          }
        })
      })
    },
    //设置优惠
    handleSetCoupon(params,ref){
      this.$confirm('确认要设置该优惠吗？','提示').then(()=>{
        this.setCouponLoading = true
        return setTenantCoupon(params).then(response => {
            if(response.data.data == 1) {
                this.$message.success('操作成功！')
                this.setCouponVisible = false
                this.handleSearch()
            }else{
                this.$message.error(response.data.msg)
            }
        }).finally(()=>{
            this.setCouponLoading=false
        })
      })
    },
    //表格行点击
    handleTableRowClick(row){
      this.currentEditParams = { ...row }
      this.$nextTick(()=>{
        this.detailsVisible = true
      })
    },
    //设置优惠按钮
    setCouponsButton(row){
      this.currentEditParams = { ...row }
      this.setCouponVisible = true
    },
    //车队车辆按钮
    fleetCarButton({tenantId}){
      this.$router.push({
        path:'/fleetInfo/carInfo',
        query:{
          tenantId,
        },
      })
    },
    //车队司机按钮
    fleetDriverButton({tenantId}){
      this.$router.push({
        path:'/fleetInfo/driverInfo',
        query:{
          tenantId,
        },
      })
    },
    //邀请码按钮
    handleOpenInviteCode(name){
      this.inviteCodeName = name;
      this.$nextTick(()=>{
        this.inviteCodeVisible = true
      })
    },
    //标签切换
    handleTabClick(){
      this.currentEditParams = null
      this.detailsVisible = false
      this.handleSearch()
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
    FleetDetails,
    GasStaDetails,
    InviteCode,
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
    .el-button{
      margin:0;
    }
  }
</style>