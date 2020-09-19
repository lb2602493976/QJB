<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="460px"
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
              <el-form-item label="单位名称" prop="companyName" :label-width="formLabelWidth">
                <el-input v-model.trim="params.companyName" placeholder="请输入" />
              </el-form-item>

              <el-form-item label="演习参加人员" prop="participants" :label-width="formLabelWidth">
                <el-input v-model.trim="params.participants" placeholder="请输入" />
              </el-form-item>

              <el-form-item label="演习时间" prop="time" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.time"
                  style="width:100%"
                  type="datetimerange"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </el-form-item>

              <el-form-item label="演习内容及步骤" prop="exerciseContent" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.exerciseContent"
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="演习效果评价及完善措施" prop="exerciseEffect" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.exerciseEffect"
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="加气站长" prop="lpgStations" :label-width="formLabelWidth">
                <el-input v-model.trim="params.lpgStations" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="公司安全部门" prop="securityDept" :label-width="formLabelWidth">
                <el-input v-model.trim="params.securityDept" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="公司经理" prop="companyManager" :label-width="formLabelWidth">
                <el-input v-model.trim="params.companyManager" placeholder="请输入" />
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
        companyName:'',
        participants:'',
        time:'',
        exerciseContent:'',
        exerciseEffect:'',
        lpgStations:'',
        securityDept:'',
        companyManager:'',
      },
      rules:{
        // companyName:[{required:true,message:'单位名称不能为空！'}],
        // participants:[{required:true,message:'演习参加人员不能为空！'}],
        // time:[{required:true,message:'演习时间不能为空！'}],
        // exerciseContent:[{required:true,message:'演习内容及步骤不能为空！'}],
        // exerciseEffect:[{required:true,message:'演习效果评价及完善措施不能为空！'}],
        // lpgStations:[{required:true,message:'加气站长不能为空！'}],
        // securityDept:[{required:true,message:'公司安全部门不能为空！'}],
        // companyManager:[{required:true,message:'公司经理不能为空！'}],
      },
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑记录' : '新增记录'
    },
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    //外部最终获取到的内容
    getFormattedParams(params) {
      const { tenantId } = this
      return {
        ...params,
        startTime:params.time[0],
        endTime:params.time[1],
        tenantId,
      }
    },
    //赋值到内部的内容
    formatBeforeSet(params){
      return {
        ...params,
        time:[params.startTime || '',params.endTime || ''],
      }
    },
  },
}
</script>
