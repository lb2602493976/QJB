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
              <el-form-item label="平台名称" prop="thirdName" :label-width="formLabelWidth">
                <el-input v-model.trim="params.thirdName" placeholder="请输入" />
              </el-form-item>
              <el-form-item v-if="!isUpdate" label="优惠值" prop="preferential" :label-width="formLabelWidth">
                <el-input v-model.trim="params.preferential" placeholder="请输入" />
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
import { mapGetters } from 'vuex'
import editFormMixins from '@/mixins/editForm'
export default {
  mixins: [ editFormMixins ],
  data() {
    const preferentialValidator = (rule,val,callback) => {
      let num = parseFloat(val)
      if(val && Number.isNaN(num)) return callback(new Error('优惠值只能为数字类型！'))
      if(val && num < 0) return callback(new Error('优惠值不能为负数！'))
      return callback()
    }
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      cardIds:[],
      params: {
        thirdName:'',
        preferential:'',
      },
      rules:{
        thirdName:[{ required:true,message:'平台名称不能为空！' }],
        preferential:[
          { required:true,message:'优惠值不能为空！' },
          { validator:preferentialValidator,trigger:'blur' },
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑第三方平台' : '新增第三方平台'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    getFormattedParams(params){
      const { tenantId } = this
      return {
        ...params,
        tenantId,
      }
    },
  },
}
</script>
