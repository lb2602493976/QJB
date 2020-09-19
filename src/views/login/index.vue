<template>
  <div
    v-if="isShow"
    v-loading="socialLoading"
    class="login-container"
    :element-loading-text="'现在进行'+currentPath+'第三方登录,请稍等'"
  >
    <div class="login-right">
      <div class="title-container">
        <h3 class="title">
          {{tenantName}}后台管理系统
        </h3>
      </div>
      <el-tabs v-model.trim="activeName" @tab-click="handleClick">
        <el-tab-pane name="loginForm">
          <span slot="label"><i slot="prefix" class=""><svg-icon icon-class="user" /></i> 用户名登录</span>
          <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="loginRules"
            class="login-form"
            label-position="left"
          >
            <el-form-item prop="username">
              <el-input
                v-model.trim="loginForm.username"
                placeholder="账号"
                name="username"
                type="text"
                autocomplete="off"
              >
                <i slot="prefix" class="">
                  <svg-icon icon-class="user1" />
                </i>
              </el-input>
            </el-form-item>

            <el-form-item prop="password">
              <el-input
                v-model.trim="loginForm.password"
                placeholder="密码"
                name="password"
                type="password"
              >
                <i slot="prefix" class="">
                  <svg-icon icon-class="密码" />
                </i>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-col :span="12" style="overflow:hidden">
                <el-form-item prop="captcha">
                  <el-input
                    v-model.trim="loginForm.code"
                    type="test"
                    auto-complete="off"
                    placeholder="请输入验证码"
                    style="width: 100%;"
                    @keyup.enter.native="handleLogin"
                  />
                </el-form-item>
              </el-col>

              <el-col class="line" :span="1">&nbsp;</el-col>
              <el-col :span="11">
                <el-form-item>
                  <img
                    style="width: 85%;height: 35px;float: right;"
                    class="pointer"
                    :src="src"
                    alt=""
                    @click="refreshCaptcha"
                  >
                </el-form-item>
              </el-col>
            </el-form-item>

            <el-button
              :loading="loading"
              type="primary"
              style="width:100%;"
              @click.native.prevent="handleLogin"
            >
              登录
            </el-button>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <div class="footer">
        <div class="other-login">
          <div class="other-way">
            <span>其他方式登录:</span>

            <span class="other-icon" @click="handleSocial('qq')">
              <svg aria-hidden="true" width="14" height="16" viewBox="0 0 448 512" focusable="false" class="fa-icon">
                <path
                  d="M433.8 420.4c-11.5 1.4-44.9-52.7-44.9-52.7 0 31.3-16.1 72.2-51.1 101.8 16.8 5.2 54.8 19.2 45.8 34.4-7.3 12.3-125.5 7.9-159.6 4-34.1 3.8-152.3 8.3-159.6-4-9-15.3 28.9-29.2 45.8-34.4-34.9-29.5-51.1-70.4-51.1-101.8 0 0-33.3 54.1-44.9 52.7-5.4-0.7-12.4-29.6 9.3-99.7 10.3-33 22-60.5 40.1-105.8-3.1-116.9 45.2-215 160.3-215 113.7 0 163.2 96.1 160.3 215 18.1 45.2 29.9 72.9 40.1 105.8 21.8 70.1 14.7 99.1 9.3 99.7z"
                />
              </svg>
            </span>

            <span class="other-icon" @click="handleSocial('weixin')">
              <!--<a href='http://localhost:8081/auth/gitee'>-->
              <svg
                t="1566549849419"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2078"
                width="19"
                height="20"
              ><path
                d="M401.135 660.548c-35.499 0-61.167-6.007-94.481-15.292l-96.666 48.606 27.853-82.466c-68.267-47.514-108.134-107.588-108.134-181.316 0-129.98 122.334-229.376 271.428-229.376 131.618 0 249.583 78.097 272.521 189.508-9.83-1.638-18.022-2.731-25.668-2.731-129.98 0-230.468 97.758-230.468 215.177 0 20.207 2.731 38.229 7.646 57.344-7.646 0.546-16.384 0.546-24.03 0.546z"
                fill="#0ABB07"
                p-id="2079"
              /><path
                d="M799.812 754.483l19.115 68.813-72.636-40.96c-27.853 6.007-54.613 14.199-82.466 14.199-128.341 0-229.376-87.927-229.376-196.608 0-109.227 101.035-197.154 229.376-197.154 121.242 0 230.468 87.927 230.468 197.154 0 60.621-40.96 115.234-94.481 154.556z"
                fill="#0ABB07"
                p-id="2080"
              /><path
                d="M589.551 511.454c-13.107 0-26.761 12.561-26.761 27.853 0 12.561 13.107 24.576 26.761 24.576 20.207 0 34.406-12.561 34.406-24.576 0-15.292-14.199-27.853-34.406-27.853z m-87.928-128.888c21.299 0 34.406-13.107 34.406-33.314 0-21.299-13.107-33.314-34.406-33.314-20.207 0-39.322 12.561-39.322 33.314 0 20.207 19.115 33.314 39.322 33.314z m-189.508-66.628c-20.207 0-40.96 12.561-40.96 33.314 0 20.207 21.299 33.314 40.96 33.314 19.115 0 34.406-13.107 34.406-33.314 0-21.299-15.292-33.314-34.406-33.314z m427.623 195.516c-14.199 0-26.761 12.561-26.761 27.853 0 12.561 12.561 24.576 26.761 24.576 19.115 0 33.314-12.561 33.314-24.576 0-15.292-14.746-27.853-33.314-27.853z"
                fill="#FFFFFF"
                p-id="2081"
              /></svg>
              <!--</a>-->
            </span>
          </div>
        </div>
        <div class="register">
          <el-button v-if="tenantType==='0'" @click="$router.push('/register')" type="text" ghost>注册账户</el-button>
        </div>
        <!-- 测试用域名选择模块 -->
        <DomainSelector v-if="env==='development'" style="width:110px;margin-left:12px;"/>
        <!-- 测试用域名选择模块 -->
      </div>
    </div>
    
  </div>
</template>

<script>
import { formatData, getUrlKey } from '@/utils/webUtils'
import { isvalidPhone } from '@/utils/validate'
import { getImgCode } from '@/api/login'
import { sendSms } from '@/api/user'
import beforeEnterMixins from '@/mixins/checkDomainBeforeEnter'

//测试用域名选择模块
import DomainSelector from '@/views/DomainSelector'
const env = process.env.NODE_ENV
//测试用域名选择模块

export default {

  //测试用域名选择模块
  components:{ DomainSelector,},
  //测试用域名选择模块

  name: 'Login',
  mixins:[beforeEnterMixins],
  data() {
    const validatePassword = (rule, value, callback) => {
      if (value.length < 2) {
        callback(new Error('密码不能少于6位'))
      } else {
        callback()
      }
    }
    // 验证手机号格式
    const validPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号'))
      } else if (!isvalidPhone(value)) {
        callback(new Error('请输入正确的11位手机号码'))
      } else {
        callback()
      }
    }
    return {
      env,
      tenantList: [],
      tenantId:'',
      tenantName:'',
      tenantType:'',
      loginForm: {
        username: '',
        password: '',
        code: '',
        token: '',
        key: ''
      },
      src: '',
      loginRules: {
        username: [{ required: true, message:'请输入用户名',trigger: 'blur' }],
        password: [{ required: true,message:'请输入密码', trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      showDialog: false,
      redirect: undefined,
      token: '',
      isShow: true,
      activeName: 'loginForm',
      isDisabled: false,
      codeLoading: false,
      time: 60,
      socialLoading: false,
      currentPath: '',
      active: ''
    }
  },
  created() {
    this.refreshCaptcha()
    this.socialLogin()
  },
  mounted(){
    console.log(this.tenantName)
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    // 用户名 密码登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('LoginByUsername', {...this.loginForm }).then((response) => {
            if(response.data.data){
              this.$router.push({ path: this.redirect || '/' })
            }else{
              this.$message.error(response.data.msg)
            }
            this.loading = false
          }).catch(e => {
            this.loading = false
            this.refreshCaptcha()
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    refreshCaptcha: function() {
      getImgCode().then(res => {
        console.log(res)
        this.src = res.data.data.img
        this.loginForm.key = res.data.data.key
      })
    },
    // 社交登录
    socialLogin() {
      const _this = this
      _this.loginForm.token = getUrlKey('token')
      if (this.loginForm.token != null && this.loginForm.token !== '') {
        _this.isShow = false
        this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
          this.loading = false
          this.$router.push({ path: this.redirect || '/' })
        }).catch(() => {
          this.loading = false
          this.refreshCaptcha()
        })
      }
    },
    handleClick(tab, event) {
      this.$refs[tab.paneName].resetFields()
    },
    handleSocial(path) {
      return this.$message.warning('该功能正在升级')
      this.currentPath = path
      this.socialLoading = true
      window.location.href = 'http://localhost:8081/auth/' + path
    },
    setTenantInfo({tenantName,tenantId}){
      this.tenantName = tenantName
      this.$store.commit('SET_TENANTID',tenantId)
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url('../../assets/63048029b07252112f0033e8e3c52865.jpg');
    background-size: cover;
    .footer{
      margin-top:3vh;
      display:flex;
      justify-content: space-between;
      align-items: center;
    }
    .login-right {
      width: 30%;
      padding: 50px;
      border-radius: 6px;
      background: #ffffff;

      .title {
        margin: 0 auto 30px auto;
        text-align: center;
        color: #505458;
      }

      .login-form {
        height: 50%;
      }

      .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        color: #454545;
      }

      .other-login {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        flex-grow:1;
      }

      .other-icon {
        cursor: pointer;
        margin-left: 5px;
        fill: rgba(0, 0, 0, .2);
      }

      .other-icon:hover {
        fill: rebeccapurple;
      }

      .other-login .other-way {
        font-size: 14px;
        color: #515a6e;
        width: calc(100% - 56px)
      }

      .register {
        float: right;
        color: #1ab2ff;
        font-size: 14px;
        cursor: pointer;
        text-align: right;
      }

      .login-select {
        margin-left: 100px;
        margin-bottom: 13px;

        input {
          color: #333;
          font-size: 14px;
          font-weight: 400;
          border: none;
        }
      }
    }

  }
</style>
