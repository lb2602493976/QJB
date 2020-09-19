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
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">充值账户：</el-col>
          <el-col :span="contentSpan" class="content">{{params.orgId}}</el-col>
        </el-row>
        <el-row type="flex" justify="space-between" class="row">
          <el-col :span="labelSpan" class="label">充值方式：</el-col>
          <el-col :span="contentSpan" class="content">银行转账</el-col>
        </el-row>
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
            <el-form-item label="充值账户" prop="orgId" :label-width="formLabelWidth">
              <el-input v-model.trim="params.orgId" placeholder="请输入" type="number" min="0"/>
            </el-form-item>
            <el-form-item label="充值方式" prop="rechargeWay" :label-width="formLabelWidth">
              <el-select v-model.trim="params.rechargeWay" placeholder="请选择" style="width: 280px">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="充值金额" prop="amount" :label-width="formLabelWidth">
              <el-input v-model.trim="params.amount" placeholder="请输入" type="number" min="0"/>
            </el-form-item>
            <el-form-item label="交易流水号" prop="serialNumber" :label-width="formLabelWidth">
              <el-input v-model.trim="params.serialNumber" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="打款账户" prop="cashAccount" :label-width="formLabelWidth">
              <el-input v-model.trim="params.cashAccount" placeholder="请输入" />
<!--                <el-date-picker-->
<!--                  v-model.trim="params.cashAccount"-->
<!--                  style="width:100%"-->
<!--                  type="datetime"-->
<!--                  format="yyyy-MM-dd"-->
<!--                  value-format="yyyy-MM-dd"-->
<!--                  placeholder="选择出厂日期"-->
<!--                />-->
            </el-form-item>
            <el-form-item label="打款时间" prop="paymentTime" :label-width="formLabelWidth">
              <el-date-picker
                v-model.trim="params.paymentTime"
                style="width:100%"
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
              :headers="{'Authorization':'Bearer ' + token}" :with-credentials="true" :on-success="handleUploadSuccess"
              :limit="1"
              :on-exceed="()=>$message.error('文件数量超出上限！')"
              :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'">
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>
            <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
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
      options2: [{
        value: '1',
        label: '银行转账'
      },{
        value: '2',
        label: '欠款'
      }],
      params: {
        orgId:'',
        amount:'',
        rechargeWay:'1',
        serialNumber:'',
        cashAccount:'',
        paymentTime:'',
        photo:'',
        remark:'',
      },
      baseUrl: process.env.BASE_API,
      token: getToken(),
      rules: {
        amount:[{ validator: gasAmount, trigger: 'blur' }],
        serialNumber:[{ required:true,message:'交易流水号不能为空',trigger:'blur'}],
        cashAccount:[{ required:true,message:'打款账户不能为空',trigger:'blur'}],
        paymentTime:[{ required:true,message:'打款时间不能为空',trigger:'blur'}],
        photo:[{ required:true,message:'附件照片不能为空',trigger:'blur'}],
        remark:[{ required:true,message:'备注不能为空',trigger:'blur'}],
      }
    }
  },
  computed: {
    title() {
      return '充值申请'
      // return this.isUpdate ? '编辑车辆' : '新增车辆'
    },
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
        // parentTenantId: getTenant(),
        // tenantType: '2',
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
