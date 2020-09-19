<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="800px"
      :title="title"
      :visible.sync="dialogVisible"
      :custom-class="'drawer-body'"
      @close="handleClose"
    >
      <div class="drawer-content">
        <div class="drawer-view">
          <el-row :gutter="40" type="flex" justify="space-between" class="row">
            <el-col>
              <el-divider content-position="left">
                <span style='color:rgba(0,0,0,0.65)'>销售数据</span>
              </el-divider>
              <el-row type="flex" justify="space-between" class="salesInfo row header">
                <el-col class="col">款项</el-col>
                <el-col class="col">金额（元）</el-col>
              </el-row>
              <el-row v-for="(item,index) of params.logPay" :key="index" type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">
                  {{ item.name }}
                </el-col>
                <el-col class="col">
                  <el-popover
                    v-if="item.logPayType"
                    placement="top"
                    title="支付明细"
                    width="400"
                    trigger="hover"
                  >
                      <span slot="reference">{{item.money}}</span>
                      <div class="pop-container">
                        <el-row type="flex" justify="space-between" align="center">
                          <el-col v-for="(payType,index) of item.logPayType" :key="index">
                            {{payTypesD.find(item=>item.itemValue==payType.payType).itemText}}
                          </el-col>
                        </el-row>
                        <el-row type="flex" justify="space-between" align="center">
                          <el-col v-for="(payType,index) of item.logPayType" :key="index">
                            {{Number(payType.payMoney)}}
                          </el-col>
                        </el-row>
                      </div>
                  </el-popover>
                  <span v-else>{{Number(item.money)}}</span>
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">合计</el-col>
                <el-col class="col">{{Number(totalAmount)}}</el-col>
              </el-row>
              <table style="margin-top:24px"></table>
              <el-divider content-position="left">
                <span style='color:rgba(0,0,0,0.65)'>预充值数据</span>
              </el-divider>
              <el-row type="flex" justify="space-between" class="salesInfo row header">
                <el-col class="col">款项</el-col>
                <el-col class="col">金额（元）</el-col>
              </el-row>
              <el-row v-for="(item,index) of params.logRecharge" :key="index+'l2'" type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">
                  {{ item.name }}
                </el-col>
                <el-col class="col">
                  {{ Number(item.money) }}
                </el-col>
              </el-row>
              <el-row type="flex" justify="space-between" class="salesInfo row">
                <el-col class="col">合计</el-col>
                <el-col class="col">{{Number(totalRecharge)}}</el-col>
              </el-row>
            </el-col>
            <el-col>
              <el-form
                :ref="formName"
                :model="params"
                :rules="rules"
                :size="size"
                style="text-align:left;"
                :label-position="'top'"
                @keyup.enter.native="handleConfirm"
              >
                  <el-form-item label="交班人" prop="includingPeople" :label-width="formLabelWidth">
                    <el-input v-model.trim="params.includingPeople" :disabled="isUpdate" type="text" placeholder="请输入"/>
                  </el-form-item>
                  <label class="label">加液机累计读数/kg</label>
                  <el-row :gutter="20" type="flex" justify="start" class="form row">
                    <el-col class="col">
                      <el-form-item v-for="(gun,index) of params.logGunReading" :key="index" :prop="`gun${gun.gunNum}`" :label-width="formLabelWidth" >
                        <label class="el-form-item__label">
                          <span class="requried">{{`枪 - ${gun.gunNum}`}}</span>
                        </label>
                        <el-input v-model.trim="params['logGunReading'][index].gunReading" :disabled="disabled" type="text" placeholder="请输入"/>
                      </el-form-item>
                    </el-col>
                    <el-col class="col">
                      <el-form-item label="气枪总读数/kg" prop="gasTotal" :label-width="formLabelWidth">
                        <el-input :value="gasTotal" :disabled="true" type="text" placeholder="请输入"/>
                      </el-form-item>
                      <el-form-item label="本班销售气量/kg" prop="salesVolume" :label-width="formLabelWidth">
                        <el-input :value="salesVolume" :disabled="true" type="text" placeholder="请输入"/>
                      </el-form-item>
                      <el-form-item label="储罐剂余量/kg" prop="surplus" :label-width="formLabelWidth">
                        <el-input v-model.trim="params.surplus" :disabled="disabled" type="text" placeholder="请输入"/>
                      </el-form-item>
                      <el-form-item label="备用金（元）" prop="pettyCash" :label-width="formLabelWidth">
                        <el-input v-model.trim="params.pettyCash" :disabled="disabled" type="text" placeholder="请输入"/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                    <el-input
                      :disabled="isUpdate"
                      v-model.trim="params.remark"
                      type="textarea"
                      :autosize="{ minRows: 6}"
                      placeholder="请输入"
                    />
                  </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </div>
        <div class="edit-footer end">
          <el-button :size="size" @click="dialogVisible = false">{{ disabled ? '关闭' : '取消' }}</el-button>
          <el-button v-show="!disabled" :size="size" type="primary" :loading="confirmLd" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import editFormMixins from '@/mixins/editForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [ editFormMixins ],
  props:{
    guns:{
      type:Array,
      default(){
        return []
      }
    },
    currentInfo:{
      type:Array,
      default(){
        return []
      }
    },
    prevInfo:{
      type:Object,
      default(){
        return {}
      }
    },
    payTypesD:{
      type:Array,
      default(){
        return []
      }
    },
    logRecharge:{
      type:Array,
      default(){
        return []
      }
    },
  },
  data() {
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      params: {},
      prevGasTotalOnUpdate:0,
      rules:{
        includingPeople:[{required:true,message:'交班人不能为空' ,}],
        surplus:[
          { required:true,message:'储罐剂余量不能为空',},
          { pattern:/^[0-9]+(\.[0-9]{0,2})?(\/[0-9]+(\.[0-9]{0,2}))*$/,message:'只支持输入数字类型，并保留两位小数' },
        ],
        pettyCash:[
          { required:true,message:'备用金不能为空',},
          { pattern:/^[0-9]+(\.[0-9]{0,2})?$/,message:'只支持输入数字类型，并保留两位小数' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '确认上次交班' : '确认本次交班'
    },
    gasTotal(){
      let list = this.params.logGunReading
      return list && list.reduce((res,item)=>{
        return res += Number(item.gunReading)
      },0).toFixed(2)
    },
    disabled(){
      return this.params && this.params.status === '1'
    },
    totalAmount(){
      if(this.params.logPay){
        return this.params.logPay.reduce((res,item)=>{
          return res + Number(item.money)
        },0).toFixed(2)
      }
      return 0
    },
    totalRecharge(){
      if(this.params.logRecharge){
        return this.params.logRecharge.reduce((res,item)=>{
          return res + Number(item.money)
        },0).toFixed(2)
      }
      return 0
    },
    salesVolume(){
      if(this.isUpdate){
        return (
          this.gasTotal && this.prevGasTotalOnUpdate 
            ?
          String(Number(this.gasTotal) - Number(this.prevGasTotalOnUpdate).toFixed(2))
            :
          0
        )
      }else{
        return (
          this.gasTotal
            ?
          (Number(this.gasTotal) - Number(this.prevInfo.gasTotal || 0)).toFixed(2)
            :
          (0 - Number(this.prevInfo.gasTotal || 0)).toFixed(2)
        )
      }
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    afterOpen(params){
      if(this.isUpdate) this.prevGasTotalOnUpdate = Number(params.salesVolume) + Number(params.gasTotal)
      let gunReadingValidator = (index,rule,_,callback) => {
        let value = params.logGunReading[index].gunReading
        if((/^\s*$/).test(value) || [undefined,null,''].includes(value)) return callback(new Error('枪读数不能为空'))
        if(!((/^[0-9]+(\.[0-9]{0,2})?$/).test(value))) return callback(new Error('只支持输入数字类型，并保留两位小数'))
        return callback()
      }
      let activeRules = params.logGunReading.reduce((res,item,index) => {
        return {
          ...res,
         [`gun${item.gunNum}`]:[
           { validator:(rule,val,callback)=>gunReadingValidator(index,rule,val,callback),trigger:['change','blur'] },
          ]
        }
      },{ ...this.rules })
      this.$set(this,'rules',activeRules)
      this.$nextTick(()=>{
        this.$refs[this.formName].clearValidate()
      })
    },
    getFormattedParams(params) {
      const { tenantId,gasTotal } = this
      return {
        ...params,
        tenantId,
        gasTotal,
        totalAmount:String(this.totalAmount),
        salesVolume:String(this.salesVolume),
        totalRecharge:String(this.totalRecharge),
      }
    },
    formatBeforeSet(params){
      if(!this.isUpdate){
        return {
          ...params,
          logGunReading:this.guns.map(item=>{
            return {
              gunNum:item.name,
              gunReading:'',
            }
          }),
          logRecharge:this.logRecharge,
          logPay:this.currentInfo,
          surplus:'',
          pettyCash:'',
        }
      }
      return {
        ...params,
        logGunReading:params.logGunReading.map(item=>{
          return {
            ...item,
            gunReading:Number(item.gunReading),
          }
        }),
        totalAmount:params.totalAmount?Number(params.totalAmount):0,
        salesVolume:params.salesVolume?Number(params.salesVolume):0,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .form.row{
    margin-top:24px;
  }
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
</style>
