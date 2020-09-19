<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="440px"
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
              <el-form-item label="班次名称" prop="shiftName" :label-width="formLabelWidth">
                <el-input style="width:100%;" v-model.trim="params.shiftName" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="班次时间" prop="shiftTime" :label-width="formLabelWidth">
                <el-time-picker
                  is-range
                  style="width:100%;"
                  v-model.trim="params.shiftTime"
                  range-separator="至"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  format="HH:mm:ss"
                  value-format="HH:mm:ss"
                  placeholder="选择时间范围"
                >
                </el-time-picker>
              </el-form-item>
              
              <el-form-item label="启用状态" prop="status" :label-width="formLabelWidth">
                <el-radio-group v-model.trim="params.status">
                  <el-radio label="0">启用</el-radio>
                  <el-radio label="1">禁用</el-radio>
                </el-radio-group>
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
import editFormMixins from '@/mixins/editForm'
import { mapGetters } from 'vuex'
export default {
  mixins: [ editFormMixins ],
  data() {
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      params: {
        shiftName:'',
        shiftTime:'',
        status:'0',
        remark:'',
        shiftStartTime:'',
        shiftEndTime:'',
      },
      rules:{
        shiftName:[{required:true,message:'班次名称不能为空！'}],
        shiftTime:[{required:true,message:'班次时间不能为空！'}],
        status:[{required:true,message:'启用状态不能为空！'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑班次' : '新增班次'
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
        shiftStartTime:params.shiftTime[0],
        shiftEndTime:params.shiftTime[1],
        tenantId,
      }
    },
    formatBeforeSet(params){
      return {
        ...params,
        shiftTime:[params.shiftStartTime,params.shiftEndTime],
      }
    },
  },
}
</script>
