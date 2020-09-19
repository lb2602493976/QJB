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
                  <span class="requried">有无违章用火用电</span>
                </label>
                <el-form-item prop="fireElectric" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.fireElectric" placeholder="请选择">
                    <el-option
                      v-for="item in options1"
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
                  <span class="requried">安全出口疏散通道是否通畅</span>
                </label>
                <el-form-item prop="safetyExit" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.safetyExit" placeholder="请选择">
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
                  <span class="requried">安全疏散标志、应急照明是否完好</span>
                </label>
                <el-form-item prop="safetyEvacuation" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.safetyEvacuation" placeholder="请选择">
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
                  <span class="requried">消防设施器材是否完好</span>
                </label>
                <el-form-item prop="fireFidevice" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.fireFidevice" placeholder="请选择">
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
                  <span class="requried">常闭式防火门是否处于关闭状态</span>
                </label>
                <el-form-item prop="fireDoor" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.fireDoor" placeholder="请选择">
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
                  <span class="requried">防火卷帘下是否堆放物品影响使用</span>
                </label>
                <el-form-item prop="fireCurtain" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.fireCurtain" placeholder="请选择">
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
                  <span class="requried">消防安全重点人员是否在位</span>
                </label>
                <el-form-item prop="fireSafety" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.fireSafety" placeholder="请选择">
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
                  <span>巡查人员</span>
                </label>
                <el-form-item prop="inspectionPersonnel" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.inspectionPersonnel" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span>主管人员</span>
                </label>
                <el-form-item prop="executive" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.executive" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span>巡查时间</span>
                </label>
                <el-form-item prop="inspectionTime" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.inspectionTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="datetime"
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
        fireElectric: '',
        safetyExit: '',
        safetyEvacuation: '',
        fireFidevice: '',
        fireDoor: '',
        fireCurtain: '',
        fireSafety: '',
        inspectionPersonnel: '',
        executive: '',
        inspectionTime: '',
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
        fireElectric: [{ required: true, message: '有无违章用火用电不能为空', trigger: 'blur' }],
        safetyExit: [{ required: true, message: '安全出口疏散通道是否通畅不能为空', trigger: 'blur' }],
        safetyEvacuation: [{ required: true, message: '安全疏散标志、应急照明是否完好不能为空', trigger: 'blur' }],
        fireFidevice: [{ required: true, message: '消防设施器材是否完好不能为空', trigger: 'blur' }],
        fireDoor: [{ required: true, message: '常闭式防火门是否处于关闭状态不能为空', trigger: 'blur' }],
        fireCurtain: [{ required: true, message: '防火卷帘下是否堆放物品影响使用不能为空', trigger: 'blur' }],
        fireSafety: [{ required: true, message: '消防安全重点人员是否在位不能为空', trigger: 'blur' }],
      }
    }
  },
  computed: {
    title() {
      return this.isUpdate ? '编辑防火巡查记录' : '新增防火巡查记录'
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
