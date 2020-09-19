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
          <el-form
            :ref="formName"
            :model="params"
            :rules="rules"
            :size="size"
            :inline="true"
            style="text-align:left;"
            :label-position="'top'"
            @keyup.enter.native="handleConfirm"
          >
              <el-form-item label="司机姓名" prop="driverName" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.driverName" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="电话号码" prop="driverTel" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.driverTel" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="微信号" prop="driverWx" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.driverWx" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="身份证号" prop="idCard" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.idCard" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="从业资格证号" prop="qualificationCertificate" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.qualificationCertificate" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="驾驶证发证机关" prop="issuingOrganizations" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.issuingOrganizations" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="准驾车型" prop="driverType" :label-width="formLabelWidth">
                <el-select v-model.trim="params.driverType" clearable filterable placeholder="请选择" :style="{ width:`${formItemWidth}px` }">
                  <el-option
                    v-for="item in driverTypes"
                    :key="item.id"
                    :label="item.itemText"
                    :value="item.itemValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="驾驶车辆" prop="carIds" :label-width="formLabelWidth">
                <el-select v-model.trim="params.carIds" clearable filterable multiple placeholder="请选择" :style="{ width:`${formItemWidth}px` }">
                  <el-option
                    v-for="item in cars"
                    :key="item.carId"
                    :label="item.carNum"
                    :value="String(item.carId)"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="加入车队日期" prop="joinDriver" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.joinDriver"
                  :style="{ width:`${formItemWidth}px` }"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择加入车队日期"
                />
              </el-form-item>
              <el-form-item label="驾照获取日期" prop="driverDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.driverDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择驾照获取日期"
                />
              </el-form-item>
              <el-form-item label="驾照失效日期" prop="invalidDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.invalidDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择驾照失效日期"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status" :label-width="formLabelWidth">
                <el-radio-group :style="{ width:`${formItemWidth}px` }" v-model.trim="params.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">失效</el-radio>
                </el-radio-group>
              </el-form-item>
              <div style="width:100%">
                <el-form-item style="width:100%" label="描述" prop="remark" :label-width="formLabelWidth">
                  <el-input
                    style="width:100%"
                    v-model.trim="params.remark"
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="请输入"
                  />
                </el-form-item>
              </div>
          </el-form>
        </div>
        <div class="edit-footer end">
          <el-button :size="size" @click="handleClose">取消</el-button>
          <el-button :size="size" type="primary" :loading="confirmLd" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import { isvalidPhone,isvalidIdNum } from '@/utils/validate'
import { getTenant } from '@/utils/tenant'
import editFormMixins from '@/mixins/editForm'
export default {
  mixins: [ editFormMixins ],
  props:{
    driverTypes:{
      type:Array,
      default(){
        return []
      }
    },
    cars:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    const validatePhone = (_,value,callback) => {
      if(!isvalidPhone(value)) return callback(new Error('手机号不合法!'))
      return callback()
    }
    const validateIdNum = (_,value,callback) => {
      if(!isvalidIdNum(value)) return callback(new Error('身份证号不合法!'))
      return callback()
    }
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      formItemWidth:200,
      params: {
        driverName:'',
        driverTel:'',
        driverWx:'',
        idCard:'',
        driverType:'',
        joinDriver:'',
        driverDate:null,
        invalidDate:null,
        remark:'',
        carIds:[],
        status:'0',
      },
      rules: {
        driverName:[{ required:true,message:'司机姓名不能为空！' ,trigger:'blur'}],
        driverTel:[
          { required:true,message:'电话号码不能为空！',trigger:'blur' },
          { validator:validatePhone,trigger:'blur' }
        ],
        // idCard:[
        //   { required:true,message:'身份证号不能为空！',trigger:'blur' },
        //   { validator:validateIdNum,trigger:'blur' }
        // ],
        // driverWx:[{ required:true,message:'微信号不能为空！',trigger:'blur' }],
        // driverType:[{ required:true,message:'准驾车型不能为空！' ,trigger:''}],
        // joinDriver:[{ required:true,message:'加入车队日期不能为空！' ,trigger:''}],
        // driverDate:[{ required:true,message:'驾照获取日期不能为空！' ,trigger:''}],
        // invalidDate:[{ required:true,message:'驾照失效日期不能为空！' ,trigger:''}],
        carIds:[{ required:true,message:'驾驶车辆不能为空！' ,trigger:''}],
        status:[{ required:true,message:'状态不能为空！' ,trigger:'blur'}],
        // qualificationCertificate:[{ required:true,message:'从业资格证号不能为空！' ,trigger:'blur'}],
        // issuingOrganizations:[{ required:true,message:'驾驶证发证机关不能为空！' ,trigger:'blur'}],
      },
    }
  },
  computed: {
    title() {
      return this.isUpdate ? '编辑司机' : '新增司机'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    getFormattedParams(params){
      return {
        ...params,
        carIds:params.carIds.map(item => String(item))
      }
    },
    // 赋值到内部的内容
    formatBeforeSet(params) {
     return params
    },
  }
}
</script>
