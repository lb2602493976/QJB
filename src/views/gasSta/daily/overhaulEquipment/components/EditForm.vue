<template>
  <!-- 新增修改界面 -->
  <div>
    <el-drawer
      size="740px"
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
            :inline="true"
            style="text-align:left;"
            :label-position="'top'"
            @keyup.enter.native="handleConfirm"
          >
            <div>
              <el-form-item label="接报人" prop="criminalPeople" :label-width="formLabelWidth">
                <el-input :style="itemContentStyle" v-model.trim="params.criminalPeople" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="故障部件" prop="faultyParts" :label-width="formLabelWidth">
                <el-input :style="itemContentStyle" v-model.trim="params.faultyParts" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="报（检）修时间" prop="repairTime" :label-width="formLabelWidth">
                <el-date-picker
                  v-model.trim="params.repairTime"
                  :style="itemContentStyle"
                  type="datetime"
                  format="yyyy-MM-dd HH:mm:ss"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  placeholder="选择日期"
                  @change="handleTimeChange"
                />
              </el-form-item>
            </div>
            <div style="width:100%">
              <el-form-item style="width:64%" label="故障原因" prop="faultCause" :label-width="formLabelWidth">
                <el-input
                  style="width:100%"
                  v-model.trim="params.faultCause"
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="故障部件图片" prop="faultyPic" :label-width="formLabelWidth">
                <div class="upload-container">
                  <el-image
                    v-if="params.faultyPic"
                    style="width: 50px; height: 50px;cursor:pointer;"
                    :src="params.faultyPic"
                    @click.native="handleUpload('faultyPic')"
                  />
                  <el-button
                    v-else
                    class="add-upload-button"
                    type="text"
                    icon="el-icon-plus"
                    @click.native="handleUpload('faultyPic')"
                  />
                </div>
              </el-form-item>
            </div>
            <div style="width:100%">
              <el-form-item style="width:64%" label="检修结果" prop="faultResults" :label-width="formLabelWidth">
                <el-input
                  v-model.trim="params.faultResults"
                  type="textarea"
                  :autosize="{ minRows: 2}"
                  placeholder="请输入"
                />
              </el-form-item>
              <el-form-item label="检修结果图片" prop="resultPic" :label-width="formLabelWidth">
                <div class="upload-container">
                  <el-image
                    v-if="params.resultPic"
                    style="width: 50px; height: 50px;cursor:pointer;"
                    :src="params.resultPic"
                    @click.native="handleUpload('resultPic')"
                  />
                  <el-button
                    v-else
                    class="add-upload-button"
                    type="text"
                    icon="el-icon-plus"
                    @click.native="handleUpload('resultPic')"
                  />
                </div>
              </el-form-item>
            </div>
            
            
            <el-form-item label="检修人员" prop="maintenancePeople" :label-width="formLabelWidth">
              <el-input :style="itemContentStyle" v-model.trim="params.maintenancePeople" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="检修时间" prop="maintenanceTime" :label-width="formLabelWidth">
              <el-date-picker
                :style="itemContentStyle"
                v-model.trim="params.maintenanceTime"
                style="width:100%"
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="选择检修时间"
                @change="handleTimeChange"
              />
            </el-form-item>
          </el-form>
          <el-upload
            :action="`${ baseUrl }/upload/uploadPic`"
            list-type="picture-card"
            :with-credentials="true"
            :on-success="handleUploadSuccess"
            :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'"
            style="display:none;"
          >
            <i ref="uploadTrigger" slot="default" class="el-icon-plus" />
          </el-upload>
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
import moment from 'moment'
export default {
  mixins: [editFormMixins],
  data() {
    const timeValidator = (rule, value, callback) => {
      const start = moment(this.params.repairTime).startOf('date'); const end = moment(this.params.maintenanceTime)
      if (start && end && start > end) return callback(new Error('"检修时间" 不能小于 "报（检）修时间" '))
      callback()
    }
    return {
      size: 'small',
      formLabelWidth: '80px',
      formName: 'form',
      initParams: null,
      gutter: 50,
      uploadKey: '',
      baseUrl: process.env.BASE_API,
      itemContentStyle:{
        width:'200px',
      },
      params: {
        repairTime: '',
        criminalPeople: '',
        faultCause: '',
        faultResults: '',
        maintenancePeople: '',
        maintenanceTime: '',
        faultyParts: '',
        faultyPic: '',
        resultPic: ''
      },
      rules: {
        repairTime: [
          // {required:true,message:'报（检）修时间不能为空！'},
          { validator: timeValidator, trigger: '' }
        ],
        // criminalPeople:[{required:true,message:'接报人不能为空！'}],
        // faultCause:[{required:true,message:'故障原因不能为空！'}],
        // faultResults:[{required:true,message:'原因及检修结果不能为空！'}],
        // maintenancePeople:[{required:true,message:'检修人员不能为空！'}],
        maintenanceTime: [
          // {required:true,message:'检修时间不能为空！'},
          { validator: timeValidator, trigger: '' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['tenantId']),
    title() {
      return this.isUpdate ? '编辑记录' : '新增记录'
    }
  },
  mounted() {
    this.initParams = { ...this.params }
  },
  methods: {
    getFormattedParams(params) {
      const { tenantId } = this
      return {
        ...params,
        tenantId
      }
    },
    handleTimeChange() {
      this.$refs[this.formName].validateField('repairTime')
      this.$refs[this.formName].validateField('maintenanceTime')
    },
    handleUpload(key) {
      this.uploadKey = key
      this.$refs['uploadTrigger'].click()
    },
    handleUploadSuccess(res) {
      this.params[this.uploadKey] = res.url
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-container{
  display: flex;
  justify-content: flex-start;
  align-items:center;
}
  .add-upload-button{
    margin:0;
    padding:0;
    display:flex;
    justify-content: center;
    align-items:center;
    width:50px;
    height:50px;
    font-size:24px;
    border:1px solid #DDD;
    color:#DDD;
  }
</style>
