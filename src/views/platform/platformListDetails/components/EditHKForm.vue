<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="400px"
      :title="title"
      :visible.sync="dialogVisible"
      :custom-class="'drawer-body'"
      @close="handleClose"
    >
      <div class="drawer-content">
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
            <el-form-item label="还款账户" :label-width="formLabelWidth">
              <el-input v-model.trim="params.orgId" readonly/>
            </el-form-item>
            <el-form-item label="还款对象" :label-width="formLabelWidth">
              <el-input v-model.trim="params.orgId" readonly/>
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
            <el-form-item label="还款金额" prop="amount" :label-width="formLabelWidth">
              <el-input v-model.trim="params.amount" placeholder="请输入" type="number" min="0"/>
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

            <!--            <el-form-item label="交易流水号" prop="serialNumber" :label-width="formLabelWidth">-->
            <!--              <el-input v-model.trim="params.serialNumber" placeholder="请输入" />-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="打款账户" prop="cashAccount" :label-width="formLabelWidth">-->
            <!--              <el-input v-model.trim="params.cashAccount" placeholder="请输入" />-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="打款时间" prop="paymentTime" :label-width="formLabelWidth">-->
            <!--              <el-date-picker-->
            <!--                v-model.trim="params.paymentTime"-->
            <!--                style="width:100%"-->
            <!--                type="datetime"-->
            <!--                format="yyyy-MM-dd HH:mm:ss"-->
            <!--                value-format="yyyy-MM-dd HH:mm:ss"-->
            <!--                placeholder="选择日期"-->
            <!--              />-->
            <!--            </el-form-item>-->
            <!--            <el-form-item label="附件照片" prop="photo" :label-width="formLabelWidth">-->
            <!--            <el-upload-->
            <!--              ref="clear"-->
            <!--              :action="`${ baseUrl }/upload/uploadPic`"-->
            <!--              list-type="picture-card"-->
            <!--              :with-credentials="true"-->
            <!--              :on-success="handleUploadSuccess"-->
            <!--              :limit="1"-->
            <!--              :on-exceed="()=>$message.error('文件数量超出上限！')"-->
            <!--              :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'">-->
            <!--              <i slot="default" class="el-icon-plus"></i>-->
            <!--            </el-upload>-->
            <!--          </el-form-item>-->
            <el-form-item label="备注"  :label-width="formLabelWidth">
              <el-input
                v-model.trim="params.remark"
                type="textarea"
                :autosize="{ minRows: 2}"
                placeholder="请输入"
              />
            </el-form-item>
          </el-form>
        </div>
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
  import { queryDictItemByDictName } from '@/api/carAccount'
  import {
    getToken
  } from '@/utils/auth'
  import { getTenant } from '@/utils/tenant'
  import editFormMixins from '@/mixins/editForm'
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
        params: {
          orgId:'',
          online:'1',
          amount:'',
          oweBalance:'',
          rechargeWay:'',
          serialNumber:'',
          cashAccount:'',
          paymentTime:'',
          photo:'',
          remark:'',
        },
        options2: [],
        baseUrl: process.env.BASE_API,
        token: getToken(),
        rules: {
          orgId:[{ required:true,message:'还款账户不能为空',trigger:'blur'}],
          amount:[{ validator: gasAmount, trigger: 'blur' }],
          serialNumber:[{ required:true,message:'交易流水号不能为空',trigger:'blur'}],
          cashAccount:[{ required:true,message:'打款账户不能为空',trigger:'blur'}],
          paymentTime:[{ required:true,message:'打款时间不能为空',trigger:'blur'}],
          rechargeWay:[{ required:true,message:'充值方式不能为空',trigger:'blur'}],
          photo:[{ required:true,message:'附件照片不能为空',trigger:'blur'}],
          remark:[{ required:true,message:'备注不能为空',trigger:'blur'}],
        }
      }
    },
    computed: {
      title() {
        return '还款申请'
      },
      // isUpdate(){
      //   return !!(this.params && this.params.truckinfoId)
      // },
    },
    mounted() {
      this.initParams = { ...this.params }
    },
    methods: {
      afterOpen(parms){
        this.params={
          orgId:parms.orgId,
          online:'1',
          amount:'',
          oweBalance:'',
          rechargeWay:'',
          serialNumber:'',
          cashAccount:'',
          paymentTime:'',
          photo:'',
          remark:'',
        }
        this.getPay();
      },
      // 外部最终获取到的内容
      getFormattedParams(params) {``
        return {
          ...params,
        }
      },
      // 赋值到内部的内容
      formatBeforeSet(params) {
        return params
      },
      //上传文件成功
      handleUploadSuccess(response) {
        this.params.photo = response.url
      },
      changeValue(){
        this.params.rechargeWay='';
        this.options2 = []
        this.getPay()
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
