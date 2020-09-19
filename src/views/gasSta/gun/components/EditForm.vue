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
              <el-form-item label="气枪名称" prop="name" :label-width="formLabelWidth">
                <el-input v-model.trim="params.name" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="燃气类型" prop="fuelGasType" :label-width="formLabelWidth">
                <el-input v-model.trim="params.fuelGasType" placeholder="请输入" />
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
        name:'',
        fuelGasType:'',
        status:'0',
        remark:'',
      },
      rules:{
        name:[{required:true,message:'气枪名称不能为空！'}],
        fuelGasType:[{required:true,message:'燃气类型不能为空！'}],
        status:[{required:true,message:'启用状态不能为空！'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑气枪' : '新增气枪'
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
    },
  },
}
</script>
