<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="1000px"
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
              <el-form-item label="车牌号码" prop="carNum" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.carNum" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="车型" prop="carType" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.carType" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="出厂日期" prop="factoryDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.factoryDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="datetime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择出厂日期"
                />
              </el-form-item>
              <el-form-item label="加入车队日期" prop="joinDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.joinDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="datetime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择加入车队日期"
                />
              </el-form-item>
              <el-form-item label="保险日期" prop="insureDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.insureDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="datetime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择保险日期"
                />
              </el-form-item>
              <el-form-item label="审核日期" prop="verifyDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.verifyDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="datetime"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择审核日期"
                />
              </el-form-item>
              <el-form-item label="车牌颜色代码" prop="colorCode" :label-width="formLabelWidth">
                <el-select v-model.trim="params.colorCode" clearable filterable placeholder="请选择" :style="{ width:`${formItemWidth}px` }">
                  <el-option
                    v-for="item in colorTypes"
                    :key="item.id"
                    :label="item.itemText"
                    :value="item.itemValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="车辆所有人" prop="owner" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.owner" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="使用性质" prop="useCharacter" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.useCharacter" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="车辆类型" prop="vehicleType" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.vehicleType" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="车辆识别代号" prop="vin" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.vin" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="发证机关" prop="issuingOrganizations" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.issuingOrganizations" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="注册日期" prop="registerDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.registerDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择"
                />
              </el-form-item>
              <el-form-item label="发证日期" prop="issueDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.issueDate"
                  :style="{ width:`${formItemWidth}px` }"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="请选择"
                />
              </el-form-item>
              <el-form-item label="车辆能源类型" prop="vehicleEnergyType" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.vehicleEnergyType" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="核定载质量/t" prop="vehicleTonnage" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.vehicleTonnage" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="吨位/t" prop="grossMass" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.grossMass" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="道路运输证号" prop="certificateNum" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.certificateNum" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="挂车牌照号" prop="plateNum" :label-width="formLabelWidth">
                <el-input :style="{ width:`${formItemWidth}px` }" v-model.trim="params.plateNum" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="车辆状态" prop="status" :label-width="formLabelWidth">
                <el-radio-group :style="{ width:`${formItemWidth}px` }" v-model.trim="params.status">
                  <el-radio label="0">正常</el-radio>
                  <el-radio label="1">停用</el-radio>
                </el-radio-group>
              </el-form-item>
              <div style="width:840px;">
                <el-form-item style="width:100%;" label="备注" prop="remark" :label-width="formLabelWidth">
                  <el-input
                    style="width:100%;"
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
          <el-button :size="size" @click="dialogVisible = false">取消</el-button>
          <el-button :size="size" type="primary" :loading="confirmLd" @click="handleConfirm">确定</el-button>
        </div>
      </div>
    </el-drawer>
  </div>

</template>

<script>
import { validCarNum } from '@/utils/validate'
import { getTenant } from '@/utils/tenant'
import editFormMixins from '@/mixins/editForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [ editFormMixins ],
  props:{
    colorTypes:{
      type:Array,
      default(){
        return []
      },
    },
  },
  data() {
    const validateCarNum = (_,value,callback) => {
      if(!validCarNum(value)) return callback(new Error('车牌号不合法'))
      else return callback()
    }
    return {
      fleets:[],
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      formItemWidth:200,
      gutter: 50,
      params: {
        carNum:null,
        carType:null,
        factoryDate:null,
        joinDate:null,
        insureDate:null,
        verifyDate:null,
        colorCode:null,
        owner:null,
        useCharacter:null,
        vehicleType:null,
        vin:null,
        issuingOrganizations:null,
        registerDate:null,
        issueDate:null,
        vehicleEnergyType:null,
        vehicleTonnage:null,
        grossMass:null,
        certificateNum:null,
        plateNum:null,
        remark:null,
        status:'0',
      },
      rules: {
        carNum:[
          { required:true,message:'车牌号不能为空',trigger:'blur'},
          { validator:validateCarNum ,trigger:'blur'},
        ],
        // carType:[{ required:true,message:'车型不能为空',trigger:'blur'}],
        // factoryDate:[{ required:true,message:'出厂日期不能为空',trigger:'blur'}],
        // joinDate:[{ required:true,message:'加入车队日期不能为空',trigger:'blur'}],
        // insureDate:[{ required:true,message:'保险日期不能为空',trigger:'blur'}],
        // verifyDate:[{ required:true,message:'审核日期不能为空',trigger:'blur'}],
        // colorCode:[{ required:true,message:'车牌颜色代码不能为空',trigger:'blur'}],
        // owner:[{ required:true,message:'车辆所有人不能为空',trigger:'blur'}],
        // useCharacter:[{ required:true,message:'使用性质不能为空',trigger:'blur'}],
        // vehicleType:[{ required:true,message:'车辆类型不能为空',trigger:'blur'}],
        // vin:[{ required:true,message:'车辆识别代号不能为空',trigger:'blur'}],
        // issuingOrganizations:[{ required:true,message:'发证机关不能为空',trigger:'blur'}],
        // registerDate:[{ required:true,message:'注册日期不能为空',trigger:'blur'}],
        // issueDate:[{ required:true,message:'发证日期不能为空',trigger:'blur'}],
        // vehicleEnergyType:[{ required:true,message:'车辆能源类型不能为空',trigger:'blur'}],
        vehicleTonnage:[
          // { required:true,message:'核定载质量不能为空',trigger:'blur'},
          { pattern:/^-?[0-9]+\.?[0-9]+$/,message:'核定载质量只能为数字类型',trigger:'blur'},
        ],
        grossMass:[
          // { required:true,message:'吨位不能为空',trigger:'blur'},
          { pattern:/^-?[0-9]+\.?[0-9]+$/,message:'吨位只能为数字类型',trigger:'blur'},
        ],
        // certificateNum:[{ required:true,message:'道路运输证号不能为空',trigger:'blur'}],
        // plateNum:[{ required:true,message:'挂车牌照号不能为空',trigger:'blur'}],
        status:[{required:true,message:'车辆状态不能为空'}],
      }
    }
  },
  computed: {
    ...mapGetters(['deptId']),
    title() {
      return this.isUpdate ? '编辑车辆' : '新增车辆'
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
        parentTenantId: getTenant(),
        tenantType: '2',
        deptId:this.deptId,
      }
    },
    // 赋值到内部的内容
    formatBeforeSet(params) {
     return params
    },
  }
}
</script>
