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
              <el-form-item label="异常原因" prop="abnormalReason" :label-width="formLabelWidth">
                <el-select v-model.trim="params.abnormalReason" clearable filterable multiple placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in unbalancedList"
                    :key="item.a"
                    :label="item.itemText"
                    :value="String(item.itemValue)"
                  />
                </el-select>
              </el-form-item>
              <!-- <el-form-item v-if="params.a && params.a.includes('0')" label="原因描述" prop="c" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.c"
                  type="textarea"
                  :autosize="{ minRows:2}"
                  placeholder="请输入"
                />
              </el-form-item> -->
              <el-form-item label="描述及结果" prop="processingResults" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.processingResults"
                  type="textarea"
                  :autosize="{ minRows: 8}"
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
  props:{
    unbalancedList:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      params: {
        abnormalReason:[],
        processingResults:'',
      },
      rules:{
        abnormalReason:[{required:true,message:'异常原因不能为空！'}],
        processingResults:[{required:true,message:'描述与结果不能为空！'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return '异常处理'
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
        abnormalReason:params.abnormalReason.join(',')
      }
    },
  },
}
</script>
