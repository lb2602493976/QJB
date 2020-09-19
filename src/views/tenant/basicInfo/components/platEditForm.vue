<template>
  <!-- 新增修改界面 -->
  <div>
    <el-form :ref="formName" :model="params" :rules="rules" :size="size" style="text-align:left;width:600px;clear:both"
      :label-position="labelPosition" @keyup.enter.native="handleConfirm">
          <el-form-item label="企业代码" prop="enterpriseCode" :label-width="formLabelWidth">
            <el-input v-model.trim="params.enterpriseCode" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="平台名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model.trim="params.name" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="平台负责人" prop="contacts" :label-width="formLabelWidth">
            <el-input v-model.trim="params.contacts" placeholder="请输入" />
          </el-form-item>
          <label class="el-form-item__label" 
            :style="{ 
                width:formLabelWidth,
                height:cusLabelHeight,
                lineHeight:cusLabelHeight,
                textAlign:labelPosition,
            }"
          >
            <span class="requried">手机号</span>
            <el-popover placement="top" trigger="hover" popper-class="popper">
              <div style="color:#FFF">多个号码使用英文 "," 分隔</div>
              <i slot="reference" class="el-icon-warning-outline" />
            </el-popover>
          </label>
          <el-form-item prop="contactsTel" :label-width="formLabelWidth">
            <el-input v-model.trim="params.contactsTel" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="平台域名" prop="domainName" :label-width="formLabelWidth">
            <el-input v-model.trim="params.domainName" placeholder="请输入">
              <template slot="prepend">https://</template>
              <template slot="append">.ucarline.com</template>
            </el-input>
          </el-form-item>
          <!-- <label class="el-form-item__label" 
            :style="{ 
                width:formLabelWidth,
                height:cusLabelHeight,
                lineHeight:cusLabelHeight,
                textAlign:labelPosition,
            }"
          >
            <span>微信号</span>
            <el-popover placement="top" trigger="hover" popper-class="popper">
              <div style="color:#FFF">多个号码使用英文 "," 分隔</div>
              <i slot="reference" class="el-icon-warning-outline" />
            </el-popover>
          </label>
          <el-form-item prop="contactsWx" :label-width="formLabelWidth">
            <el-input v-model.trim="params.contactsWx" placeholder="请输入" />
          </el-form-item>
          <label class="el-form-item__label" 
            :style="{ 
                width:formLabelWidth,
                height:cusLabelHeight,
                lineHeight:cusLabelHeight,
                textAlign:labelPosition,
            }"
          >
            <span>QQ号</span>
            <el-popover placement="top" trigger="hover" popper-class="popper">
              <div style="color:#FFF">多个号码使用英文 "," 分隔</div>
              <i slot="reference" class="el-icon-warning-outline" />
            </el-popover>
          </label>
          <el-form-item prop="contactsQq" :label-width="formLabelWidth">
            <el-input v-model.trim="params.contactsQq" placeholder="请输入" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model.trim="params.email" placeholder="请输入"></el-input>
          </el-form-item> -->
          <el-form-item label="描述" prop="remark" :label-width="formLabelWidth">
            <el-input v-model.trim="params.remark" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入" />
          </el-form-item>
    </el-form>
    <BMapPoiSelector :visible.sync="bMapPoiSelectorVisible" @select="handlePoiSelectConfirm" />
  </div>
</template>

<script>
  import {
    isvalidPhone,
    validEmail,
  } from '@/utils/validate'
  import {
    getTenant
  } from '@/utils/tenant'
  import BMapPoiSelector from '@/components/BMapPoiSelector'
  export default {
    filters: {
      poi(poi) {
        if (!poi) return '请选择'
        else return `纬度:${poi.lat},经度:${poi.lng}`
      }
    },
    components: {
      BMapPoiSelector,
    },
    props:{
      dataSource:{
        type:Object,
        default(){
          return {}
        },
      },
    },
    mounted(){
        this.params = this.formatBeforeSet({...this.dataSource})
    },
    watch:{
       dataSource(val){
           this.params = this.formatBeforeSet({...val})
       }, 
    },
    data() {
      const checkPhone = (_, val, callback) => {
        if (isvalidPhone(val)) return callback();
        else return callback(new Error('手机号格式不合法'))
      }
      const poiValidator = (_, val, callback) => {
        if (!this.params.poi) return callback(new Error('经纬度不能为空'))
        else return callback();
      }
      const emailValidator = (_, val, callback) => {
        if (!val || validEmail(val)) return callback()
        else return callback(new Error('邮箱格式不合法'))
      }
      return {
        verifyCodeLoading:false,
        bMapPoiSelectorVisible: false,
        size: 'small',
        labelPosition:'right',
        formLabelWidth: '96px',
        cusLabelHeight:'32px',
        formName: 'form',
        initParams: null,
        gutter: 0,
        params: {
          userName:'',
          enterpriseCode: '',
          name: '',
          location: '',
          poi: null,
          contacts: '',
          contactsTel: '',
          contactsWx: '',
          domainName: '',
          trueLocation: '',
          email:'',
          remark: ''
        },
        rules: {
          userName: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          enterpriseCode: [{
            required: true,
            message: '企业代码不能为空',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '气站名称不能为空',
            trigger: 'blur'
          }],
          location: [{
            required: true,
            message: '地址不能为空',
            trigger: ''
          }],
          poi: [{
            validator: poiValidator,
            trigger: ''
          }],
          contacts: [{
            required: true,
            message: '气站负责人不能为空',
            trigger: 'blur'
          }],
          contactsTel: [{
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          }, {
            validator: checkPhone,
            trigger: 'blur'
          }],
          verifyCode:[{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }],
          contactsWx: [{
            pattern: /^([a-zA-Z][a-zA-Z\d_-]{5,19}\,?)+$/,
            message:'微信号格式不合法',
            trigger: 'blur'
          }],
          contactsQq: [{
            pattern: /^([1-9]{1}[0-9]{4,11}\,?)+$/,
            message:'QQ号格式不合法',
            trigger: 'blur'
          }],
          email: [{
            validator:emailValidator,
            trigger: 'blur'
          },],
          domainName: [{
            required: true,
            message: '气站域名不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9|A-Z|a-z|_]{1,15}$/,
            message: '只能输入15位数字大小写英文字母和下划线',
            trigger: 'blur'
          },],
        }
      }
    },
    methods: {
      //获取验证码
      handleGetVerifyCode(){
        this.$refs[this.formName].validateField('contactsTel', err => {
          if(err) return;
          this.verifyCodeLoading = true
          setTimeout(()=>{
            this.verifyCodeLoading = false
          },2000)
        })
      },
      // 外部最终获取到的内容
      getParams() {
        let params = this.params
        return {
          ...params,
          parentTenantId: getTenant(),
          tenantType: '0',
          id:params.tenantId,
        }
      },
      //赋值前
      formatBeforeSet(params){
        let newParams = {
          ...params,
          name:params.tenantName,
        }
        delete newParams.createTime
        delete newParams.startTime
        delete newParams.endTime
        return newParams
      },
      // PoiSelect确认按钮
      handlePoiSelectConfirm(poi) {
        this.params.poi = {
          ...poi.point
        }
        this.params.location = poi.address
        this.params.trueLocation = poi.province + poi.city + poi.district + poi.street
        this.bMapPoiSelectorVisible = false
        this.$refs[this.formName].validateField('poi')
      }
    }
  }

</script>
<style lang="scss" scoped>
  .row{
    margin-top:12px;
  }
  .verify-code-container{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .input{
      flex-grow:1;
      margin-right:12px;
    }
  }
</style>