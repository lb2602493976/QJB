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
                  <span class="requried">器材名称</span>
                </label>
                <el-form-item prop="equipmentName" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.equipmentName" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">位置</span>
                </label>
                <el-form-item prop="place" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.place" placeholder="请输入" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">	型号规格</span>
                </label>
                <el-form-item prop="typeSpecification" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.typeSpecification" placeholder="请输入" style="width: 280px" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span class="requried">数量</span>
                </label>
                <el-form-item prop="amount" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.amount" placeholder="请输入" type="number" style="width: 280px"/>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">有效日期</span>
                </label>
                <el-form-item prop="effectiveDate" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.effectiveDate"
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
                  <span class="requried">检查结果是否正常</span>
                </label>
                <el-form-item prop="inspectionResult" :label-width="formLabelWidth">
                  <el-select v-model.trim="params.inspectionResult" placeholder="请选择" style="width: 280px">
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
                <el-form-item prop="inspectionPersonnel" :label-width="formLabelWidth">
                  <el-input v-model.trim="params.inspectionPersonnel" placeholder="请输入" />
                </el-form-item>
              </el-col>
            </el-row>

            <el-row :gutter="gutter" type="flex" justify="space-between" style="width:100%">
              <el-col>
                <label class="el-form-item__label">
                  <span  class="requried">巡查时间</span>
                </label>
                <el-form-item prop="inspectionDate" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model.trim="params.inspectionDate"
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
                  <span>备注</span>
                </label>
                <el-form-item prop="remark" :label-width="formLabelWidth">
                  <el-input
                    v-model.trim="params.remark"
                    type="textarea"
                    :autosize="{ minRows: 2}"
                    placeholder="请输入"
                    style="width: 280px"
                  />
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
          equipmentName: '',
          place: '',
          typeSpecification: '',
          amount: '',
          effectiveDate: '',
          inspectionResult: '',
          inspectionDate: '',
          inspectionPersonnel: '',
          remark: '',
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
          equipmentName: [{ required: true, message: '器材名称不能为空', trigger: 'blur' }],
          place: [{ required: true, message: '位置不能为空', trigger: 'blur' }],
          typeSpecification: [{ required: true, message: '型号规格不能为空', trigger: 'blur' }],
          amount: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
          effectiveDate: [{ required: true, message: '有效日期不能为空', trigger: 'blur' }],
          inspectionResult: [{ required: true, message: '检查结果不能为空', trigger: 'blur' }],
          inspectionDate: [{ required: true, message: '巡查日期不能为空', trigger: 'blur' }],
          inspectionPersonnel: [{ required: true, message: '巡查人不能为空', trigger: 'blur' }],
        }
      }
    },
    computed: {
      title() {
        return this.isUpdate ? '编辑消防器材巡查' : '新增消防器材巡查'
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
