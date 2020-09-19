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
      <div>
        <div class="drawer-content">
          <el-row type="flex" justify="space-between" class="row">
            <el-col :span="labelSpan" class="label">企业代码：</el-col>
            <el-col :span="contentSpan" class="content">{{params.enterpriseCode}}</el-col>
          </el-row>
          <el-row type="flex" justify="space-between" class="row">
            <el-col :span="labelSpan" class="label">气站名称：</el-col>
            <el-col :span="contentSpan" class="content">{{params.tenantName}}</el-col>
          </el-row>
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
              <el-form-item label="当前气价" prop="gasPrices" :label-width="formLabelWidth">
                <el-input v-model.trim="params.gasPrices" placeholder="请输入" type="number" min="0"/>
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
    var gasPrices = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('气价不能为空'));
      }else if(value<0){
        return callback(new Error('气价不能为负数'));
      }else {
        callback();
      }
    };
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      labelSpan:6,
      contentSpan:18,
      params: {
        gasPrices:'',
        remark:'',
      },
      rules:{
        gasPrices:[
          { validator: gasPrices, trigger: 'blur' }
        ],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return '调整气价'
      // return this.isUpdate ? '编辑班次' : '新增班次'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    getFormattedParams(params) {
      return {
        ...params,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
  .max{
    height:100%;
  }
  .row{
    &:not(:first-child){
      margin-top:12px;
    }
    .label{
      font-size:14px;
      font-weight:bold;
    }
    .content{
      font-size:14px;
      color:rgba(0,0,0,0.65);
      font-weight:normal;
      text-align:left;
      padding-left:8px;
    }
  }

</style>
