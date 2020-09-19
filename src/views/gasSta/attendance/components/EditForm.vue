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
              <el-form-item label="气卡卡号" prop="gasCardnum" :label-width="formLabelWidth">
                <el-input v-model.trim="params.gasCardnum" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="用户类别" prop="cardType" :label-width="formLabelWidth">
                <el-select v-model.trim="params.cardType" @change="handleCardTypeChange" clearable filterable placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="(item,index) in cardTypes"
                    :key="index"
                    :label="item.itemText"
                    :value="item.itemValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-if="params.cardType && params.cardType!=3" label="用户名称" prop="cardId" :label-width="formLabelWidth">
                <el-select v-model.trim="params.cardId" clearable filterable placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in cardIds"
                    :key="item.tenantId"
                    :label="item.tenantName"
                    :value="String(item.tenantId)"
                  />
                </el-select>
              </el-form-item>
              <el-form-item v-else-if="params.cardType" label="用户名称" prop="cardId" :label-width="formLabelWidth">
                <el-select v-model.trim="params.cardId" clearable filterable placeholder="请选择" style="width:100%">
                  <el-option
                    v-for="item in thirdPlatForms"
                    :key="item.id"
                    :label="item.thirdName"
                    :value="String(item.id)"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="气卡位置" prop="cardLocation" :label-width="formLabelWidth">
                <el-input v-model.trim="params.cardLocation" placeholder="请输入" />
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
import { getAllTenants } from '@/api/tenant'
import { mapGetters } from 'vuex'
import editFormMixins from '@/mixins/editForm'
export default {
  mixins: [ editFormMixins ],
  props:{
    cardTypes:{
      type:Array,
      default(){
        return []
      },
    },
    thirdPlatForms:{
      type:Array,
      default(){
          return []
      },
    },
  },
  data() {
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      cardIds:[],
      params: {
        gasCardnum:'',
        cardType:'',
        cardId:'',
        cardLocation:'',
        remark:'',
      },
      rules:{
        gasCardnum:[{required:true,message:'气卡卡号不能为空！'}],
        cardType:[{required:true,message:'用户类别不能为空！'}],
        cardId:[{required:true,message:'用户名称不能为空！'}],
        cardLocation:[{required:true,message:'气卡位置不能为空！'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑气卡' : '新增气卡'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    afterOpen({cardType:tenantType}){
      const { tenantId } = this
      this.handleGetTenants({tenantId,tenantType})
    },
    handleGetTenants({tenantId,tenantType}){
      getAllTenants({tenantId,tenantType}).then(response => {
        this.cardIds = response.data.data
      })
    },
    handleCardTypeChange(tenantType) {
      const { tenantId } = this
      this.params.cardId = ''
      this.handleGetTenants({tenantId,tenantType})
    },
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
