<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="760px"
      :title="title"
      :visible.sync="dialogVisible"
      :custom-class="'drawer-body'"
      @close="handleClose"
    >
      <div class="drawer-content">
        <el-tabs v-model.trim="activeName" style="margin:0 24px;">
          <el-tab-pane label="接车阶段" name="1"/>
          <el-tab-pane label="开始卸车" name="2"/>
          <el-tab-pane label="卸车阶段" name="3"/>
          <el-tab-pane label="卸车结束" name="4"/>
        </el-tabs>
        <div class="drawer-view">
          <el-form
            :ref="formName"
            :model="params"
            :rules="rules"
            :size="size"
            style="text-align:left;"
            :label-position="'top'"
            @keyup.enter.native="handleConfirm"
            :inline="true"
          >
              <div v-show="activeName==='1'">
                <el-form-item label="车牌号" prop="carNum" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.carNum" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="铅封号" prop="sealNo" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.sealNo" placeholder="请输入" />
                </el-form-item>
                
                <el-form-item label="接车人" prop="unloadingMan" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingMan" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="司机姓名" prop="driverName" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.driverName" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="司机电话" prop="driverTel" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.driverTel" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="押运员姓名" prop="mobilizationName" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.mobilizationName" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="押运员电话" prop="mobilizationTel" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.mobilizationTel" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="填表日期" prop="dateFilling" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.dateFilling"
                    :style="itemContentStyle"
                    type="date"
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择"
                  />
                </el-form-item>

                <el-form-item label="出厂时间" prop="factoryTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.factoryTime"
                    :style="itemContentStyle"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择"
                  />
                </el-form-item>

                <el-form-item label="进站时间" prop="stationTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.stationTime"
                    :style="itemContentStyle"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择"
                  />
                </el-form-item>

                <el-form-item label="出厂总重/Kg" prop="totalWeight" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.totalWeight" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="出厂净重/Kg" prop="netWeight" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.netWeight" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车负责人" prop="unloadingSupervisor" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingSupervisor" placeholder="请输入" />
                </el-form-item>
              </div>
              <div v-show="activeName==='2'">
                <el-form-item label="卸车前泵池温度/℃" prop="poolTemperature" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.poolTemperature" placeholder="请输入" />
                </el-form-item>
                <el-form-item label="开始卸车时间" prop="unloadingTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.unloadingTime"
                    :style="itemContentStyle"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择"
                  />
                </el-form-item>

                <el-form-item label="总重/Kg" prop="unloadingTotalWeight" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingTotalWeight" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车前储罐压力/MPa" prop="unloadingPressure" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingPressure" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车前储罐液位/m" prop="unloadingTankLevel" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingTankLevel" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车前储罐质量/Kg" prop="unloadingTankQuality" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingTankQuality" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车前槽车压力/MPa" prop="unloadingTankLorry" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingTankLorry" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车员" prop="unloadingMemberOns" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingMemberOns" placeholder="请输入" />
                </el-form-item>
              </div>
              <div v-show="activeName==='3'">
                <el-form-item label="卸车中泵池温度/℃" prop="poolTemperature2" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.poolTemperature2" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车中加气密度" prop="densityOfGasFillingInProgress" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.densityOfGasFillingInProgress" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车中加气温度/℃" prop="temperatureOfGasFillingInProgress" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.temperatureOfGasFillingInProgress" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车员" prop="unloadingMemberInp" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingMemberInp" placeholder="请输入" />
                </el-form-item>
              </div>
              <div v-show="activeName==='4'">
                <el-form-item label="卸车后泵池温度/℃" prop="poolTemperature3" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.poolTemperature3" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="车重/Kg" prop="carWeight" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.carWeight" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="净重/Kg" prop="unloadingNetWeight" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingNetWeight" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="损耗量/Kg" prop="wastage" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.wastage" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车后储罐压力/MPa" prop="afterPressure" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.afterPressure" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车后储罐液位/m" prop="afterTankLevel" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.afterTankLevel" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车后储罐质量/Kg" prop="afterTankQuality" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.afterTankQuality" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车后槽车压力/MPa" prop="afterTankLorry" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.afterTankLorry" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车结束时间" prop="unloadingEndtime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.unloadingEndtime"
                    :style="itemContentStyle"
                    type="datetime"
                    format="yyyy-MM-dd HH:mm:ss"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    placeholder="请选择"
                  />
                </el-form-item>

                <el-form-item label="卸车后加气密度（kg/m³）" prop="densityOfGasFilling" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.densityOfGasFilling" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车后加气温度/℃" prop="temperatureOfGasFilling" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.temperatureOfGasFilling" placeholder="请输入" />
                </el-form-item>

                <el-form-item label="卸车员" prop="unloadingMember" :label-width="formLabelWidth">
                  <el-input :style="itemContentStyle" v-model.trim="params.unloadingMember" placeholder="请输入" />
                </el-form-item>
                
                <el-row style="padding-right:20px;">
                  <el-form-item style="width:100%" label="卸车总结" prop="unloadingConclusion" :label-width="formLabelWidth">
                    <el-input
                      style="width:100%"
                      v-model.trim="params.unloadingConclusion"
                      type="textarea"
                      :autosize="{ minRows: 2}"
                      placeholder="请输入"
                    />
                  </el-form-item>
                </el-row>
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
import editFormMixins from '@/mixins/editForm'
import { mapGetters } from 'vuex'
import { validCarNum,isvalidPhone } from '@/utils/validate'
export default {
  mixins: [ editFormMixins ],
  data() {
    const carNumValidator = (_,value,callback) => {
      if(value && !validCarNum(value)) return callback(new Error('车牌号不合法'))
      return callback()
    }
    const phoneValidator = (_,value,callback) => {
      if(value && !isvalidPhone(value)) return callback(new Error('手机号不合法'))
      return callback()
    }
    return {
      itemContentStyle:{ width:'200px', },
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      activeName:'1',
      params: {
        carNum:'',
        sealNo:'',
        driverName:'',
        unloadingMan:'',
        driverTel:'',
        mobilizationName:'',
        mobilizationTel:'',
        dateFilling:null,
        factoryTime:null,
        stationTime:null,
        totalWeight:'',
        netWeight:'',
        unloadingSupervisor:'',
        unloadingMember:'',
        unloadingTotalWeight:'',
        carWeight:'',
        unloadingNetWeight:'',
        wastage:'',
        unloadingTime:null,
        unloadingPressure:'',
        unloadingTankLevel:'',
        unloadingTankQuality:'',
        unloadingTankLorry:'',
        afterPressure:'',
        afterTankLevel:'',
        afterTankQuality:'',
        afterTankLorry:'',
        poolTemperatureInProgress:'',
        poolTemperatureInProgress2:'',
        poolTemperatureInProgress3:'',
        densityOfGasFillingInProgress:'',
        temperatureOfGasFillingInProgress:'',
        poolTemperature:'',
        poolTemperature2:'',
        poolTemperature3:'',
        densityOfGasFilling:'',
        temperatureOfGasFilling:'',
        unloadingEndtime:null,
        unloadingConclusion:'',
      },
      rules:{
        carNum:[
          // { required:true,message:'车牌号不能为空' },
          { validator:carNumValidator,message:'车牌号不合法' }
        ],
        // sealNo:[{required:true,message:'铅封号不能为空'}],
        // driverName:[{required:true,message:'司机姓名不能为空！'}],
        driverTel:[
          // { required:true,message:'司机电话不能为空' },
          { validator:phoneValidator,message:'手机号不合法' },
        ],
        // mobilizationName:[{required:true,message:'押运员姓名不能为空'}],
        mobilizationTel:[
          // { required:true,message:'押运员电话不能为空' },
          { validator:phoneValidator,message:'手机号不合法' },
        ],
        // dateFilling:[{required:true,message:'填表日期不能为空'}],
        // factoryTime:[{required:true,message:'出厂时间不能为空'}],
        // stationTime:[{required:true,message:'进站时间不能为空'}],
        totalWeight:[
          // { required:true,message:'出厂总重不能为空' },
          { pattern:/^[0-9]{1,9}(\.[0-9]{0,2})?$/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        netWeight:[
          // { required:true,message:'出厂净重不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        // unloadingSupervisor:[{required:true,message:'卸车负责人不能为空'}],
        // unloadingMember:[{required:true,message:'卸车员不能为空'}],
        unloadingTotalWeight:[
          // { required:true,message:'总重不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        carWeight:[
          // { required:true,message:'车重不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        unloadingNetWeight:[
          // { required:true,message:'净重不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        wastage:[
          // { required:true,message:'损耗量不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        // unloadingTime:[{required:true,message:'开始卸车时间不能为空'}],
        // unloadingPressure:[{required:true,message:'卸车前储罐压力不能为空'}],
        // unloadingTankLevel:[{required:true,message:'卸车前储罐液位不能为空'}],
        unloadingTankQuality:[
          // { required:true,message:'卸车前储罐质量不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        unloadingTankLorry:[
          // {required:true,message:'卸车前槽车压力不能为空'},
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?(\/[0-9]{1,9}(\.[0-9]{0,2})?)*/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        // afterPressure:[{required:true,message:'卸车后储罐压力不能为空'}],
        // afterTankLevel:[{required:true,message:'卸车后储罐液位不能为空'}],
        afterTankQuality:[
          // { required:true,message:'卸车后储罐质量不能为空' },
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        afterTankLorry:[
          // {required:true,message:'卸车后槽车压力不能为空'},
          { pattern:/[0-9]{1,9}(\.[0-9]{0,2})?(\/[0-9]{1,9}(\.[0-9]{0,2})?)*/,message:'只能为最大9位数的整数且最多支持两位小数' },
        ],
        // poolTemperature:[{required:true,message:'卸车泵池温度1不能为空'}],
        // poolTemperature2:[{required:true,message:'卸车泵池温度2不能为空'}],
        // poolTemperature3:[{required:true,message:'卸车泵池温度3不能为空'}],
        // unloadingEndtime:[{required:true,message:'卸车结束时间不能为空'}],
        // unloadingConclusion:[{required:true,message:'卸车总结不能为空'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑记录' : '新增记录'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    getFormattedParams(params) {
      const { tenantId } = this
      return {
        ...params,
        tenantId,
      }
    }
  },
}
</script>
