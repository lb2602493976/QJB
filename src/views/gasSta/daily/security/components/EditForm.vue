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
                  <span class="requried">储罐液位表/mm</span>
                </label>
                <el-form-item prop="tankLevelGauge" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.tankLevelGauge" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">储罐后压表1/MPa</span>
                </label>
                <el-form-item prop="tankBackPressure1" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.tankBackPressure1" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">储罐后压表2/MPa</span>
                </label>
                <el-form-item prop="tankBackPressure2" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.tankBackPressure2" placeholder="请输入" type="number" style="width: 280px" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">1#泵前压力/MPa</span>
                </label>
                <el-form-item prop="pressureBeforePump1" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.pressureBeforePump1" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">1#泵后压力/MPa</span>
                </label>
                <el-form-item prop="pressureAfterPump1" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.pressureAfterPump1" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">2#泵前压力/MPa</span>
                </label>
                <el-form-item prop="pressureBeforePump2" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.pressureBeforePump2" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">2#泵后压力/MPa</span>
                </label>
                <el-form-item prop="pressureAfterPump2" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.pressureAfterPump2" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">仪表风压/MPa</span>
                </label>
                <el-form-item prop="airPressure" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.airPressure" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">泵撬是否正常</span>
                </label>
                <el-form-item prop="pumpSkid" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.pumpSkid" placeholder="请选择" style="width: 280px">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">发电机房/变压器是否正常</span>
                </label>
                <el-form-item prop="generatorRoom" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.generatorRoom" placeholder="请选择" style="width: 280px">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">空压机压力/MPa</span>
                </label>
                <el-form-item prop="airCompressorPressure" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.airCompressorPressure" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">监控设备是否正常</span>
                </label>
                <el-form-item prop="watchdog" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.watchdog" placeholder="请选择" style="width: 280px">
                    <el-option
                      v-for="item in options2"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">巡查人员</span>
                </label>
                <el-form-item prop="inspector" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.inspector" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">巡查时间</span>
                </label>
                <el-form-item prop="inspectTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.inspectTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
                    style="width: 280px"
                    placeholder="选择日期">
                  </el-date-picker>
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
          tankLevelGauge: '',
          tankBackPressure1: '',
          tankBackPressure2: '',
          pressureBeforePump1: '',
          pressureAfterPump1: '',
          pressureBeforePump2: '',
          pressureAfterPump2: '',
          airPressure: '',
          pumpSkid: '',
          generatorRoom: '',
          airCompressorPressure: '',
          watchdog: '',
          inspector: '',
          inspectTime: '',
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
          tankLevelGauge: [{ required: true, message: '储罐液位表/mm不能为空', trigger: 'blur' }],
          tankBackPressure1: [{ required: true, message: '储罐后压表1/MPa不能为空', trigger: 'blur' }],
          tankBackPressure2: [{ required: true, message: '储罐后压表2/MPa不能为空', trigger: 'blur' }],
          pressureBeforePump1: [{ required: true, message: '1#泵前压力/MPa不能为空', trigger: 'blur' }],
          pressureAfterPump1: [{ required: true, message: '1#泵后压力/MPa不能为空', trigger: 'blur' }],
          pressureBeforePump2: [{ required: true, message: '2#泵前压力/MPa不能为空', trigger: 'blur' }],
          pressureAfterPump2: [{ required: true, message: '2#泵后压力/MPa不能为空', trigger: 'blur' }],
          airPressure: [{ required: true, message: '仪表风压/MPa不能为空', trigger: 'blur' }],
          pumpSkid: [{ required: true, message: '泵撬是否正常不能为空', trigger: 'blur' }],
          generatorRoom: [{ required: true, message: '发电机房/变压器是否正常不能为空', trigger: 'blur' }],
          airCompressorPressure: [{ required: true, message: '空压机压力/MPa不能为空', trigger: 'blur' }],
          watchdog: [{ required: true, message: '监控设备是否正常不能为空', trigger: 'blur' }],
          inspector: [{ required: true, message: '巡检人不能为空', trigger: 'blur' }],
          inspectTime: [{ required: true, message: '巡检时间不能为空', trigger: 'blur' }],
        }
      }
    },
    computed: {
      title() {
        return this.isUpdate ? '编辑安全巡查记录' : '新增安全巡查记录'
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
