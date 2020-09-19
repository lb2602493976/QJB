<template>
    <!-- 查询和其他操作 -->
    <div style="background:#FFF;margin:24px 20px;padding:0 24px 24px 0;">
      <div class="filter-container">
        <div class="filters">
          <div class="filter">
            <label class="label">车队：</label>
            <el-select 
              class="filter-item"
              style="width: 200px;"
              size="small"
              v-model.trim="params.tenantId"
              clearable
              placeholder="请选择"
              @change="handleFleetChange"
            >
              <el-option
                v-for="(item,index) in fleets"
                :key="index"
                :label="item.tenantName"
                :value="String(item.tenantId)">
              </el-option>
            </el-select>
          </div>
        </div>
        <el-row v-show="params.tenantId" type="flex" justify="start" align="center" class="row">
          <span v-if="fleet.natureType=='0'" class="col">身份证号：{{ fleet.idCard }}</span>
          <span v-else-if="fleet.natureType=='1'" class="col">企业代码：{{ fleet.enterpriseCode }}</span>
          <span class="col">车辆总数：{{ fleet.carNum }}</span>
        </el-row>
      </div>
    </div>
</template>
<script>
    import { getAllTenants,getTenantById } from '@/api/tenant'
    import { mapGetters } from 'vuex'
    import searchFormMixins from '@/mixins/searchForm'
    export default {
        mixins:[ searchFormMixins ],
        data(){
          let tenantId = this.$route.query.tenantId
          return {
            fleets:[],
            //参数控制
            params:{
              tenantId,
            },
            fleet:{},
            //用于重置参数为初始值
            initParams:null,
          }
        },
        computed:{
          ...mapGetters(['tenantId']),
        },
        created(){
            // 初始化数据
            this.initParams = { ...this.params }
        },
        mounted(){
          this.handleInitInfo(this.tenantId)
          if(this.params.tenantId) this.handleSearchFleet(this.params.tenantId)
        },
        methods: {
            //车队选项变化
            handleFleetChange(tenantId){
              if(tenantId) this.handleSearchFleet(tenantId)
              this.handleSearch()
            },
            //查询车队详情
            handleSearchFleet(tenantId){
              getTenantById(tenantId).then(response => {
                this.fleet = response.data.data
              })
            },
            //初始化选项信息
            handleInitInfo(tenantId){
              getAllTenants({ tenantId,tenantType:'2' }).then(response => {
                this.fleets = response.data.data
              })
            },
            //外部最终获取的内容 这里为定义  获取请使用 mixins中的 getParams方法获取
            getformatdParams(params){
                return params
            },
        },
    }
</script>
<style lang="scss" scoped>
    .filter-container{
      padding:0;
      background:#FFF;
      display:flex;
      justify-content: space-between;
      align-items: center;
      .buttons{
        margin-right:24px;
      }
      .filter{
        margin-left:24px;
      }
    }
    .row{
      padding:0 24px;
      background:#FFF;
      .col{
        font-size:14px;
        color:rgba(0,0,0,0.65);
        &:not(:first-child){
          margin-left:24px;
        }
      }
    }
</style>