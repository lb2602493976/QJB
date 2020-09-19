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
              <el-form-item label="时间" prop="meetingDate" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.meetingDate"
                  style="width:100%"
                  type="date"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  placeholder="选择会议时间"
                />
              </el-form-item>
              <el-form-item label="地点" prop="meetingPlace" :label-width="formLabelWidth">
                <el-input v-model.trim="params.meetingPlace" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="主持人" prop="host" :label-width="formLabelWidth">
                <el-input v-model.trim="params.host" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="参加人" prop="participants" :label-width="formLabelWidth">
                <el-input v-model.trim="params.participants" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="会议内容" prop="meetingContent" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.meetingContent"
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
        meetingDate:'',
        meetingPlace:'',
        host:'',
        participants:'',
        meetingContent:'',
      },
      rules:{
        // meetingDate:[{required:true,message:'时间不能为空！'}],
        // meetingPlace:[{required:true,message:'地点不能为空！'}],
        // host:[{required:true,message:'主持人不能为空！'}],
        // participants:[{required:true,message:'参加人不能为空！'}],
        // meetingContent:[{required:true,message:'会议内容不能为空！'}],
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
    getFormattedParams(params) {
      const { tenantId } = this
      return {
        ...params,
        tenantId,
      }
    }
  },
}
</script>
