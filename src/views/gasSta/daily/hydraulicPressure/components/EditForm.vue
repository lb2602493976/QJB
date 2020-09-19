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

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">试验日期</span>
                </label>
                <el-form-item prop="experimentDate" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.experimentDate"
                    value-format="yyyy-MM-dd"
                    style="width: 280px"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">试验设备</span>
                </label>
                <el-form-item prop="experimentDevice" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.experimentDevice" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">软管名称</span>
                </label>
                <el-form-item prop="hoseName" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.hoseName" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">型号类别</span>
                </label>
                <el-form-item prop="type" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.type" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	生产厂家</span>
                </label>
                <el-form-item prop="manufacturer" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.manufacturer" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">出厂日期</span>
                </label>
                <el-form-item prop="productionDate" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.productionDate"
                    value-format="yyyy-MM-dd"
                    style="width: 280px"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">启用日期</span>
                </label>
                <el-form-item prop="startUsingDate" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.startUsingDate"
                    value-format="yyyy-MM-dd"
                    style="width: 280px"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	环境温度(℃)</span>
                </label>
                <el-form-item prop="environmentTemperature" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.environmentTemperature" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	工作压力（MPg)</span>
                </label>
                <el-form-item prop="workPressure" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.workPressure" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	试验压力（MPg)</span>
                </label>
                <el-form-item prop="testPressure" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.testPressure" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	保压时间(min)</span>
                </label>
                <el-form-item prop="pressurizeMin" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.pressurizeMin" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	检查实况</span>
                </label>
                <el-form-item prop="inspection" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.inspection" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	试验结论意见</span>
                </label>
                <el-form-item prop="experimentVerdict" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.experimentVerdict"  type="textarea" :autosize="{ minRows: 2}" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">试验人签字</span>
                </label>
                <el-form-item prop="experimenter" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.experimenter" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

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
  import editFormMixins from '@/mixins/editForm'
  export default {
    components: {
    },
    mixins: [editFormMixins],
    data() {
      return {
        size: 'small',
        formLabelWidth: '80px',
        formName: 'form',
        initParams: null,
        gutter: 50,
        params: {
          experimentDate: '',
          experimentDevice: '',
          hoseName: '',
          type: '',
          manufacturer: '',
          productionDate: '',
          startUsingDate: '',
          environmentTemperature: '',
          workPressure: '',
          testPressure: '',
          pressurizeMin: '',
          inspection: '',
          experimentVerdict: '',
          experimenter: '',
        },
        options1: [{
          value: '1',
          label: '有'
        }, {
          value: '0',
          label: '无'
        }],
        options2: [{
          value: '1',
          label: '是'
        }, {
          value: '0',
          label: '否'
        }],
        rules: {
          experimentDate: [{ required: true, message: '试验日期不能为空', trigger: 'blur' }],
          experimentDevice: [{ required: true, message: '试验设备不能为空', trigger: 'blur' }],
          hoseName: [{ required: true, message: '软管名称不能为空', trigger: 'blur' }],
          type: [{ required: true, message: '型号类别不能为空', trigger: 'blur' }],
          manufacturer: [{ required: true, message: '生产厂家不能为空', trigger: 'blur' }],
          productionDate: [{ required: true, message: '出厂日期不能为空', trigger: 'blur' }],
          startUsingDate: [{ required: true, message: '启用日期不能为空', trigger: 'blur' }],
          environmentTemperature: [{ required: true, message: '环境温度不能为空', trigger: 'blur' }],
          workPressure: [{ required: true, message: '工作压力（MPg)不能为空', trigger: 'blur' }],
          testPressure: [{ required: true, message: '试验压力（MPg)不能为空', trigger: 'blur' }],
          pressurizeMin: [{ required: true, message: '保压时间不能为空', trigger: 'blur' }],
          inspection: [{ required: true, message: '检查实况不能为空', trigger: 'blur' }],
          experimentVerdict: [{ required: true, message: '试验结论意见不能为空', trigger: 'blur' }],
          experimenter: [{ required: true, message: '试验人签字不能为空', trigger: 'blur' }],
        }
      }
    },
    computed: {
      title() {
        return this.isUpdate ? '编辑槽车卸液软管定期耐压（水压）试验记录' : '新增槽车卸液软管定期耐压（水压）试验记录'
        // return '充值申请'
      },
      isUpdate() {
        return !!(this.params && this.params.id)
      }
    },
    mounted() {
      this.initParams = { ...this.params }
      if (this.isUpdate) {
        this.params = this.dataSource
      }
    },
    methods: {
      // 外部最终获取到的内容
      getFormattedParams(params) {
        return {
          ...params,
        }
      },
    }
  }
</script>
