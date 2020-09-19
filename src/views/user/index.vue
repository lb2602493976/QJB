<template>
  <div class="app-container">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="12">
        <el-card class="user-center">
          <div slot="header" class="clearfix">
            <span>关于我</span>
          </div>
          <div class="user-profile">
            <div class="box-center">
              <pan-thumb :image="avatar" :height="'100px'" :width="'100px'" :hoverable="false">
                <el-link type="primary" class="change-avatar" @click="openUpload(1)">更换头像</el-link>
              </pan-thumb>
            </div>
            <div class="box-center">
              <div class="user-name text-center">{{ user.username }}</div>
              <div class="user-role text-center text-muted">
                <span>{{ user.deptName ? user.deptName : '没有' }}</span> · <span>{{ user.roleName ? user.roleName : '没有' }}</span>
              </div>
            </div>
          </div>
          <div class="user-bio">
            <div class="user-education user-bio-section">
              <div class="user-bio-section-header"><el-icon class="el-icon-connection" /><span>第三方账号</span></div>
              <div class="user-bio-section-body">
                <div class="text-muted">
                  <template v-for="(l, index) in logo">
                    <div :key="index" class="logo-wrapper">
                      <img v-if="l.bind" :src="resolveLogo(l.img)" :class="{ 'radius': l.radius }" alt="" title="1" >
                      <img v-else :src="resolveLogo(l.img)" :class="{ 'radius': l.radius }" alt="" title="2" class="unbind" >
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-card class="user-center">
          <el-tabs v-model.trim="activeName" @tab-click="handleClick">
            <el-tab-pane label="个人信息" name="first">
              <div class="user" style="width: 100%">
                <el-form ref="form" :model="editInfo" label-width="80px">
                  <el-form-item label="姓名">
                    <el-input v-model.trim="editInfo.name" />
                  </el-form-item>
                  <el-form-item label="用户名">
                    <el-input v-model.trim="editInfo.username" />
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-upload
                      ref="avatar"
                      class="avatar-uploader"
                      :action="`${ baseUrl }/upload/uploadPic`"
                      :with-credentials="true" 
                      :on-success="handleUploadSuccess"
                      :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="editInfo.avatar" @click.stop="openUpload(2)" style="cursor:pointer;width:50px;height:50px;" :src="editInfo.avatar" class="avatar" alt="">
                      <i v-else @click.stop="openUpload(2)" style="cursor:pointer" class="el-icon-plus avatar-uploader-icon" />
                      <i slot="trigger" ref="uploadTrigger"></i>
                    </el-upload>
                  </el-form-item>
                  <el-form-item label="手机号">
                    <el-input v-model.trim="editInfo.phone" />
                  </el-form-item>
                  <el-form-item label="所属部门">
                    <el-input v-model.trim="editInfo.deptName" :disabled="true" />
                  </el-form-item>

                  <el-form-item>
                    <el-button @click="submitForm('form')" :loading="editLoading" style="float:right;" type="primary">提交</el-button>
                  </el-form-item>
                </el-form>
              </div>

            </el-tab-pane>

            <el-tab-pane label="修改密码" name="second">

              <div style="width: 100%">
                <el-form
                  ref="passForm"
                  :model="passForm"
                  status-icon
                  :rules="rules"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item label="原密码" prop="oldPass">
                    <el-input v-model.trim="passForm.oldPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="密码" prop="newPass">
                    <el-input v-model.trim="passForm.newPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model.trim="passForm.checkPass" type="password" autocomplete="off" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="updatePass('passForm')">修改</el-button>
                    <el-button @click="resetForm('passForm')">重置</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import {
  getToken
} from '@/utils/auth'
import PanThumb from '@/components/PanThumb'
import { getUserInfo, updatePass,editUserBySelf } from '@/api/user'
import { mapGetters } from 'vuex'
export default {
  name: 'Index',
  components: { PanThumb },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      }else if(!(/^[A-Z|a-z|0-9|_]{6,}$/).test(value)){
        callback(new Error('密码必须为6位以上的大小写字母、数字或下划线'))
      } else {
        if (this.passForm.checkPass !== '') {
          this.$refs.passForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passForm.newPass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      uploadBy:'',
      token:getToken(),
      baseUrl: process.env.BASE_API,
      editLoading:false,
      editInfo: {
        avatar: '',
        username: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        createTime: ''
      },
      user: {
        avatar: '',
        username: '',
        phone: 0,
        email: '',
        deptName: '',
        jobName: '',
        createTime: ''
      },
      activeName: 'first',
      passForm: {
        oldPass: '',
        newPass: '',
        checkPass: ''
      },
      rules: {
        oldPass: [{ required: true, message: '原密码不能为空', trigger: 'blur' }],
        newPass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      },
      isDisabled: false,
      codeLoading: false,
      time: 60,
      logo: [
        { img: 'gitee.png', name: 'gitee', bind: false, radius: true },
        { img: 'github.png', name: 'github', bind: false, radius: true },
        { img: 'tencent_cloud.png', name: 'tencent_cloud', bind: false, radius: true },
        { img: 'qq.png', name: 'qq', bind: false, radius: false },
        { img: 'dingtalk.png', name: 'dingtalk', bind: false, radius: true },
        { img: 'microsoft.png', name: 'microsoft', bind: false, radius: false }
      ]
    }
  },
  computed: {
    ...mapGetters(['userId']),
    avatar() {
      return this.user.avatar || require(`@/assets/avatar/c7c4ee7be3eb4e73a19887dc713505145.jpg`)
    }
  },
  created() {
    this.findUserInfo()
  },

  methods: {
    openUpload(type){
      this.uploadBy = type
      this.$refs['uploadTrigger'].click()
    },
    resolveLogo(logo) {
      return require(`@/assets/logo/${logo}`)
    },
    // 加载用户个人信息
    findUserInfo: function() {
      getUserInfo().then((res) => {
        this.user = res.data.data
        this.editInfo = { ...this.user }
      })
    },

    // 修改密码
    updatePass: function(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = new URLSearchParams()
          params.append('oldPass', this.passForm.oldPass)
          params.append('newPass', this.passForm.newPass)
          updatePass(params).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '操作成功'
              })
              this.activeName = 'second'
              this.$refs['passForm'].resetFields()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          })
        } else {
          return false
        }
      })
    },
    refresh() {
      this.ico = 'el-icon-loading'
      this.$refs.log.init()
      setTimeout(() => {
        this.ico = 'el-icon-refresh'
      }, 300)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.editLoading=true
          editUserBySelf({...this.editInfo,userId:this.userId}).then(response=>{
            if(response.data.data){
              this.$message.success('编辑成功')
              this.findUserInfo()
            }else{
              this.$message.error(response.data.msg)
            }
          }).finally(()=>{
            this.editLoading=false
          })
        }
      })
    },
    resetForm(formName) {
      if (this.$refs[formName] !== undefined) {
        this.$refs[formName].resetFields()
      }
    },
    handleClick(tab, event) {
      console.log(tab, event)
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      let allowTypes = ['image/jpg','image/jpeg','image/png','image/bmp']
      if (!allowTypes.includes(file.type)) {
        this.$message.error('不支持的图片格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return allowTypes.includes(file.type) && isLt2M
    },
    //上传文件成功
    handleUploadSuccess(response) {
      let url = response.url
      if(this.uploadBy === 1){
        editUserBySelf({...this.user,userId:this.userId,avatar:url}).then(response=>{
          if(response.data.data){
            this.findUserInfo()
          }
        })
      }else if(this.uploadBy === 2){
        this.editInfo.avatar = url
      }
    },
  }
}
</script>

<style lang="scss" scoped>

  .user-center{
    height: 440px;
  }
  .box-center {
    margin: 0 auto;
    display: table;
  }

  .text-muted {
    color: #777;
  }

  .user-profile {
    .user-name {
      font-weight: bold;
    }

    .box-center {
      padding-top: 10px;
    }

    .user-role {
      padding-top: 10px;
      font-weight: 400;
      font-size: 14px;
    }

    .box-social {
      padding-top: 30px;

      .el-table {
        border-top: 1px solid #dfe6ec;
      }
    }

    .user-follow {
      padding-top: 20px;
    }
  }

  .user-bio {
    margin-top: 20px;
    color: #606266;

    span {
      padding-left: 4px;
    }
    .logo-wrapper {
      display: inline-block;
      margin: 10px 0;
      img {
        width: 1.4rem;
        display: inline-block;
        margin: 0 .6rem;
        cursor: pointer;
        &.unbind {
          -webkit-filter: grayscale(100%);
          -moz-filter: grayscale(100%);
          -o-filter: grayscale(100%);
          filter: grayscale(100%);
        }
        &.radius {
          border-radius: 50%;
        }
      }
    }
    .user-bio-section {
      font-size: 14px;
      padding: 15px 0;

      .user-bio-section-header {
        border-bottom: 1px solid #dfe6ec;
        padding-bottom: 10px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
  }
</style>
