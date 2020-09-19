<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="470px"
      :title="title"
      :visible.sync="dialogVisible"
      :custom-class="'drawer-body'"
      @close="handleClose"
    >
      <div class="drawer-content">
        <h2 style="border-bottom: 1px solid #1890FF;margin-left: 0em;font-size: 0.8em;color: #1890FF">申请信息</h2>
        <br/>
        <div class="drawer-view">
          <el-form
            :ref="formName"
            :model="params"
            :rules="rules"
            :size="size"
            style="text-align:left;"
            :label-position="'top'"
            @keyup.enter.native="handleConfirm"
          >
            <el-form-item label="充值对象" :label-width="formLabelWidth">
              <el-input v-model.trim="params.name" readonly  style="width: 280px"></el-input>
            </el-form-item>

            <el-form-item label="" :label-width="formLabelWidth">
              <el-radio-group v-model.trim="params.online" :rules="rules.status" @change="changeValue">
                <el-radio label="1">线上</el-radio>
                <el-radio label="2">线下</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="充值方式" prop="rechargeWay" :label-width="formLabelWidth">
              <el-select v-model.trim="params.rechargeWay" placeholder="请选择" style="width: 280px">
                <el-option
                  v-for="item in options2"
                  :key="item.itemValue"
                  :label="item.itemText"
                  :value="item.itemValue"
                  :disabled="item.itemValue==='owe'"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="充值金额" prop="amount" :label-width="formLabelWidth">
              <el-input v-model.trim="params.amount" placeholder="请输入" type="number" min="0"  style="width: 280px">
                <template slot="append">元</template>
              </el-input>
            </el-form-item>

            <template v-if="params.online==='1'">
              <template v-if="params.rechargeWay!=='owe'">

                <el-form-item label="交易流水号" prop="serialNumber" :label-width="formLabelWidth" style="width: 280px">
                  <el-input v-model.trim="params.serialNumber" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="打款账户" prop="cashAccount" :label-width="formLabelWidth"  style="width: 280px">
                  <el-input v-model.trim="params.cashAccount" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="打款时间" prop="paymentTime" :label-width="formLabelWidth"  style="width: 280px">
                  <el-date-picker
                    v-model.trim="params.paymentTime"
                    style="width: 280px"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  />
                </el-form-item>

                <el-form-item label="附件照片" prop="photo" :label-width="formLabelWidth">
                  <el-upload
                    ref="clear"
                    :action="`${ baseUrl }/upload/uploadPic`"
                    list-type="picture-card"
                    :with-credentials="true" :on-success="handleUploadSuccess"
                    :limit="1"
                    :on-exceed="()=>$message.error('文件数量超出上限！')"
                    :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'">
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </template>
              <template v-else>
                <el-form-item label="预计还款时间" prop="paymentTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.paymentTime"
                    style="width: 280px"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                  />
                </el-form-item>
              </template>
            </template>

            <template v-else>
              <template>

                <!--                <el-form-item label="交易流水号" prop="serialNumber" :label-width="formLabelWidth" style="width: 280px">-->
                <!--                  <el-input v-model.trim="params.serialNumber" placeholder="请输入" />-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="打款账户" prop="cashAccount" :label-width="formLabelWidth"  style="width: 280px">-->
                <!--                  <el-input v-model.trim="params.cashAccount" placeholder="请输入" />-->
                <!--                </el-form-item>-->

                <!--                <el-form-item label="打款时间" prop="paymentTime" :label-width="formLabelWidth"  style="width: 280px">-->
                <!--                  <el-date-picker-->
                <!--                    v-model.trim="params.paymentTime"-->
                <!--                    style="width: 280px"-->
                <!--                    type="datetime"-->
                <!--                    format="yyyy-MM-dd HH:mm:ss"-->
                <!--                    value-format="yyyy-MM-dd HH:mm:ss"-->
                <!--                    placeholder="选择日期"-->
                <!--                  />-->
                <!--                </el-form-item>-->

                <el-form-item label="附件照片"  :label-width="formLabelWidth">
                  <el-upload
                    ref="clear"
                    :action="`${ baseUrl }/upload/uploadPic`"
                    list-type="picture-card"
                    :with-credentials="true" :on-success="handleUploadSuccess"
                    :limit="1"
                    :on-exceed="()=>$message.error('文件数量超出上限！')"
                    :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'">
                    <i slot="default" class="el-icon-plus"></i>
                  </el-upload>
                </el-form-item>
              </template>
            </template>



            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
              <el-input
                v-model.trim="params.remark"
                style="width: 280px"
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="请输入"
              />
            </el-form-item>
            <br/>

            <h2 style="border-bottom: 1px solid #1890FF;margin-left: -1em;color: #1890FF;font-size: 0.8em">充值信息</h2>
            <br/>
            <template v-for="(item,index) in params.cardRechargeRecords">
              <el-row :gutter="20">
                <el-col :span="11">
                  <el-form-item :prop="'cardRechargeRecords.' + index +'.cardId'" :label-width="formLabelWidth" :rules="rules.cardId">
                    <el-select v-model.trim="item.cardId" placeholder="请选择气卡" >
                      <el-option
                        v-for="item in cardList"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="11">
                  <el-form-item :prop="'cardRechargeRecords.' + index +'.amount'" :label-width="formLabelWidth" :rules="rules.amount">
                    <el-input v-model.trim="item.amount" placeholder="请输入金额" type="number" min="0">
                      <template slot="append">元</template>
                    </el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-button type="danger" icon="el-icon-delete" circle @click="deleteCard(index)" v-if="params.cardRechargeRecords.length>1"></el-button>
                </el-col>
              </el-row>
            </template>
          </el-form>
          <el-button  @click="add" style="width: 100%">添加</el-button>
        </div>
<!--        <div class="drawer-view" v-else>-->
<!--          <el-form-->
<!--            :ref="formName"-->
<!--            :model="params"-->
<!--            :rules="rules"-->
<!--            :size="size"-->
<!--            style="text-align:left;"-->
<!--            :label-position="'top'"-->
<!--            @keyup.enter.native="handleConfirm"-->
<!--          >-->

<!--            <el-form-item label="充值账户" :label-width="formLabelWidth">-->
<!--              <el-input v-model.trim="params.orgId" readonly style="width: 280px"></el-input>-->
<!--            </el-form-item>-->

<!--            <el-form-item label="充值方式" prop="rechargeWay" :label-width="formLabelWidth">-->
<!--              <el-select v-model.trim="params.rechargeWay" placeholder="请选择" style="width: 280px">-->
<!--                <el-option-->
<!--                  v-for="item in options2"-->
<!--                  :key="item.value"-->
<!--                  :label="item.label"-->
<!--                  :value="item.value">-->
<!--                </el-option>-->
<!--              </el-select>-->
<!--            </el-form-item>-->

<!--              <el-form-item label="充值金额" prop="amount" :label-width="formLabelWidth">-->
<!--                <el-input v-model.trim="params.amount" placeholder="请输入" type="number" min="0" style="width: 280px">-->
<!--                  <template slot="append">元</template>-->
<!--                </el-input>-->
<!--              </el-form-item>-->

<!--              <template v-if="params.rechargeWay==='1' ">-->
<!--                <el-form-item label="交易流水号" prop="serialNumber" :label-width="formLabelWidth">-->
<!--                  <el-input v-model.trim="params.serialNumber" placeholder="请输入" style="width: 280px"/>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="打款账户" prop="cashAccount" :label-width="formLabelWidth">-->
<!--                  <el-input v-model.trim="params.cashAccount" placeholder="请输入" style="width: 280px"/>-->
<!--                </el-form-item>-->
<!--                <el-form-item label="打款时间" prop="paymentTime" :label-width="formLabelWidth">-->
<!--                  <el-date-picker-->
<!--                    v-model.trim="params.paymentTime"-->
<!--                    style="width: 280px"-->
<!--                    type="datetime"-->
<!--                    format="yyyy-MM-dd HH:mm:ss"-->
<!--                    value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                    placeholder="选择日期"-->
<!--                  />-->
<!--                </el-form-item>-->
<!--                <el-form-item label="附件照片" prop="photo" :label-width="formLabelWidth">-->
<!--                  <el-upload-->
<!--                    ref="clear"-->
<!--                    :action="`${ baseUrl }/upload/uploadPic`"-->
<!--                    list-type="picture-card"-->
<!--                    :with-credentials="true" :on-success="handleUploadSuccess"-->
<!--                    :limit="1"-->
<!--                    :on-exceed="()=>$message.error('文件数量超出上限！')"-->
<!--                    :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'">-->
<!--                    <i slot="default" class="el-icon-plus"></i>-->
<!--                  </el-upload>-->
<!--                </el-form-item>-->
<!--              </template>-->
<!--              <template v-if="params.rechargeWay==='2'">-->
<!--                <el-form-item label="预计还款时间" prop="paymentTime" :label-width="formLabelWidth">-->
<!--                  <el-date-picker-->
<!--                    v-model.trim="params.paymentTime"-->
<!--                    style="width: 280px"-->
<!--                    type="datetime"-->
<!--                    format="yyyy-MM-dd HH:mm:ss"-->
<!--                    value-format="yyyy-MM-dd HH:mm:ss"-->
<!--                    placeholder="选择日期"-->
<!--                  />-->
<!--                </el-form-item>-->
<!--              </template>-->
<!--              <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">-->
<!--                  <el-input-->
<!--                    v-model.trim="params.remark"-->
<!--                    style="width: 280px"-->
<!--                    type="textarea"-->
<!--                    :autosize="{ minRows: 2}"-->
<!--                    placeholder="请输入"-->
<!--                  />-->
<!--                </el-form-item>-->
<!--          </el-form>-->
<!--        </div>-->
        <div class="edit-footer end">
          <el-button :size="size" @click="dialogVisible = false">取消</el-button>
          <el-button :size="size" type="primary" :loading="confirmLd" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import { validCarNum } from '@/utils/validate'
import { getAppointCurrentList } from '@/api/until'
import {
  getToken
} from '@/utils/auth'
import { getTenant } from '@/utils/tenant'
import editFormMixins from '@/mixins/editForm'
import { queryDictItemByDictName } from '@/api/carAccount'
export default {
  mixins: [ editFormMixins ],
  data() {
    var gasAmount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('充值金额不能为空'));
      }else if(value<0){
        return callback(new Error('充值金额不能为负数'));
      }else if(value>99999999.99){
        return callback(new Error('充值金额超过了系统限制的金额'));
      }else {
        callback();
      }
    };
    return {
      fleets:[],
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      labelSpan:6,
      contentSpan:18,
      title:'气卡充值申请',
      params: {
        orgId:'',
        online:'1',
        amount:'',
        rechargeWay:'',
        serialNumber:'',
        cashAccount:'',
        paymentTime:'',
        photo:'',
        remark:'',
        cardRechargeRecords:[
          {
            amount:'',
            cardId:'',
          }
        ],
      },
      baseUrl: process.env.BASE_API,
      token: getToken(),
      cardList:[],
      options2: [],
      rules: {
        amount:[{ validator: gasAmount, trigger: 'blur' }],
        serialNumber:[{ required:true,message:'交易流水号不能为空',trigger:'blur'}],
        cashAccount:[{ required:true,message:'打款账户不能为空',trigger:'blur'}],
        paymentTime:[{ required:true,message:'时间不能为空',trigger:'blur'}],
        rechargeWay:[{ required:true,message:'充值方式不能为空',trigger:'blur'}],
        cardId:[{ required:true,message:'卡号不能为空',trigger:'blur'}],
        photo:[{ required:true,message:'附件照片不能为空',trigger:'blur'}],
        // remark:[{ required:true,message:'备注不能为空',trigger:'blur'}],
      },
      // moreNotifyOjbectRules: {
      //   moreNotifyOjbectName: [{ required: true, message: '卡号不能为空', trigger: 'blur' }],
      //   moreNotifyOjbectEmail: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }]
      // }
    }
  },
  computed: {
    isUpdate(){
      return !!(this.params && this.params.truckinfoId)
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    // 外部最终获取到的内容
    getFormattedParams(params) {
      return {
        ...params,
      }
    },
    afterOpen(params){
      this.cardList = [];
      this.params= {
        orgId:params.orgId,
        ifOwe:params.ifOwe,
        name:params.name,
        tenantType:params.tenantType,
        online:'1',
        amount:'',
        rechargeWay:'',
        serialNumber:'',
        cashAccount:'',
        paymentTime:'',
        photo:'',
        remark:'',
        cardRechargeRecords:[
          {
            amount:'',
            cardId:'',
          }
        ]
      }
      this.getValue();
      this.getPay();
      // let gunReadingValidator = (index,rule,_,callback) => {
      //   let value = this.cardRechargeRecords.cardId[index].gunReading
      //   if((/^\s*$/).test(value) || [undefined,null,''].includes(value)) return callback(new Error('枪读数不能为空'))
      //   return callback()
      // }
      // let activeRules = this.cardRechargeRecords.cardId.reduce((res,item,index) => {
      //   return {
      //     ...res,
      //     [cardId]:[
      //       { validator:(rule,val,callback)=>gunReadingValidator(index,rule,val,callback),trigger:['change','blur'] },
      //     ]
      //   }
      // },{ ...this.rules })
      // this.$set(this,'rules',activeRules)
      // this.$nextTick(()=>{
      //   this.$refs[this.formName].clearValidate()
      // })
    },
    getPay(){
      if(this.params.online==='1'){
        queryDictItemByDictName('线上充值类型').then(res => {
          this.options2 = res.data.data
          // resolve(res)
        }).catch(err => {
          console.log(err)
        })
      }else {
        queryDictItemByDictName('线下充值类型').then(res => {
          this.options2 = res.data.data
          // resolve(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    changeValue(){
      this.params.rechargeWay='';
      this.options2 = []
      this.getPay()
    },
    getValue(){
      this.cardList = [];
      const params ={
        orgId:this.params.orgId
      }
      getAppointCurrentList(params).then((res) => {
        if (res.data.code === 200) {
          res.data.data.map((item)=>{
            this.cardList.push({
              value: item.id,
              label: item.gasCardnum
            })
          })
        } else {
          this.$message({ message: res.data.msg, type: 'error' })
        }
      })
    },
    getValueCard(value){
      // console.log(value)
      // console.log(this.params.cardRechargeRecords);
      // if(this.params.cardRechargeRecords.length>1){
      //   this.params.cardRechargeRecords.map((item)=>{
      //     console.log(typeof item.cardId)
      //     console.log(typeof value)
      //     if(item.cardId===value){
      //       this.$message.warning('此卡已选择');
      //     }
      //   })
      // }
    },
    // 赋值到内部的内容
    formatBeforeSet(params) {
     return params
    },
    //上传文件成功
    handleUploadSuccess(response) {
      this.params.photo = response.url
    },
    add(){
      // console.log(this.params)
      this.params.cardRechargeRecords.push({
        amount:'',
        cardId:'',
      })
    },
    deleteCard(index){
      console.log(index)
      if(this.params.cardRechargeRecords.length>1){
        this.params.cardRechargeRecords.splice(index,1)
      }
    },
  }
}
</script>
<style lang="scss" scoped>
  .max{
    height:100%;
  }
  .row{
    &:not(:first-child){
      margin-top:12px;
    }
    .label{
      font-size:14px;
      font-weight:bold;
    }
    .content{
      font-size:14px;
      color:rgba(0,0,0,0.65);
      font-weight:normal;
      text-align:left;
      padding-left:8px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

</style>
