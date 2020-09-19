<template>
  <!-- 新增修改界面 -->
  <div>
    <el-form :ref="formName" :model="params" :rules="rules" :size="size" style="text-align:left;"
      :label-position="labelPosition" @keyup.enter.native="handleConfirm">
        <el-form-item label="用户名" prop="userName" :label-width="formLabelWidth">
          <el-input v-model.trim="params.userName" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="企业代码" prop="enterpriseCode" :label-width="formLabelWidth">
          <el-input v-model.trim="params.enterpriseCode" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="气站名称" prop="name" :label-width="formLabelWidth">
          <el-input v-model.trim="params.name" placeholder="请输入" />
        </el-form-item>
        <label class="el-form-item__label" 
          :style="{ 
              width:formLabelWidth,
              height:cusLabelHeight,
              lineHeight:cusLabelHeight,
              textAlign:labelPosition,
          }"
        >
          <span class="requried">气站位置</span>
        </label>
        <el-form-item prop="poi" :label-width="formLabelWidth" style="margin-bottom:4px;">
          <el-button type="text" style="font-size:14px;"
            @click="bMapPoiSelectorVisible = true">
            {{ params.poi | poi }}
          </el-button>
        </el-form-item>
        <el-form-item style="margin-top:20px;" prop="location" :label-width="formLabelWidth">
          <el-input v-model.trim="params.location" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="气站负责人" prop="contacts" :label-width="formLabelWidth">
          <el-input v-model.trim="params.contacts" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="气站域名" prop="domainName" :label-width="formLabelWidth">
          <el-input v-model.trim="params.domainName" placeholder="请输入">
            <template slot="prepend">https://</template>
            <template slot="append">.ucarline.com</template>
          </el-input>
        </el-form-item>
        <label class="el-form-item__label" 
          :style="{ 
              width:formLabelWidth,
              height:cusLabelHeight,
              lineHeight:cusLabelHeight,
              textAlign:labelPosition,
          }"
        >
          <span class="requried">手机号</span>
        </label>
        <el-form-item prop="contactsTel" :label-width="formLabelWidth">
          <el-input v-model.trim="params.contactsTel" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="手机验证码" prop="verifyCode" :label-width="formLabelWidth">
          <div class="verify-code-container">
            <el-input class="input" v-model.trim="params.verifyCode" placeholder="请输入" />
            <el-button @click="handleGetVerifyCode" :disabled="countDown!==0" :loading="verifyCodeLoading">
              获取验证码<span v-show="countDown!==0">（{{ countDown }}）</span>
            </el-button>
          </div>
        </el-form-item>
        <!-- <label class="el-form-item__label" 
          :style="{ 
              width:formLabelWidth,
              height:cusLabelHeight,
              lineHeight:cusLabelHeight,
              textAlign:labelPosition,
          }"
        >
          <span>微信号</span>
          <el-popover placement="top" trigger="hover" popper-class="popper">
            <div style="color:#FFF">多个号码使用英文 "," 分隔</div>
            <i slot="reference" class="el-icon-warning-outline" />
          </el-popover>
        </label>
        <el-form-item prop="contactsWx" :label-width="formLabelWidth">
          <el-input v-model.trim="params.contactsWx" placeholder="请输入" />
        </el-form-item>
        <label class="el-form-item__label" 
          :style="{ 
              width:formLabelWidth,
              height:cusLabelHeight,
              lineHeight:cusLabelHeight,
              textAlign:labelPosition,
          }"
        >
          <span>QQ号</span>
          <el-popover placement="top" trigger="hover" popper-class="popper">
            <div style="color:#FFF">多个号码使用英文 "," 分隔</div>
            <i slot="reference" class="el-icon-warning-outline" />
          </el-popover>
        </label>
        <el-form-item prop="contactsQq" :label-width="formLabelWidth">
          <el-input v-model.trim="params.contactsQq" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model.trim="params.email" placeholder="请输入"></el-input>
        </el-form-item> -->
        <label class="el-form-item__label" 
          :style="{ 
              width:formLabelWidth,
              height:cusLabelHeight,
              lineHeight:cusLabelHeight,
              textAlign:labelPosition,
          }"
        >
          <span>附件</span>
        </label>
        <el-form-item prop="certList" :label-width="formLabelWidth">
          <div class="enclosure"> 
            <ul v-show="params.certList && params.certList.length" class="list">
              <li v-for="(item,index) of params.certList" :key="index" class="item">
                <div class="main">
                  <div class="info">
                    <el-input :disabled="true" type="text" v-model.trim="item.certName" placeholder="附件名称"></el-input>
                    <!-- <el-input type="text" v-model.trim="item.certCode" placeholder="证件编码"></el-input> -->
                  </div>
                  <div class="picture">
                    <div 
                      v-for="(pic,picIndex) of item.certPc"
                      :key="picIndex"
                      style="position:relative"
                      @mouseenter="handlePicMouseEnter(index,picIndex)"
                      @mouseleave="handlePicMouseLeave(index,picIndex)"
                    >
                      <el-image
                        style="width:32px;height:32px;"
                        :src="pic" 
                        :preview-src-list="getPreViewList(index,picIndex)"
                      >
                      </el-image>
                      <el-button 
                        type="danger"
                        class="imgDelBtn"
                        :class="{ show:currentEnclosureIndex === index && currentPicIndex === picIndex}"
                        icon="el-icon-close"
                        @click="handleDeletePic(index,picIndex)"
                      ></el-button>
                    </div>
                    <el-button 
                      style="width:32px; height:32px;padding:0px;"
                      icon="el-icon-plus"
                      plain
                      @click="handleAddPic(index)"
                    ></el-button>
                  </div>
                </div>
                <!-- <el-button @click="handleDeleteEnclosure(index)" style="margin-right:8px;" type="danger" ghost icon="el-icon-delete"></el-button> -->
              </li>
            </ul>
            <!-- <el-button @click="handleAddEnclosure" plain style="width:100%;" icon="el-icon-plus">添加</el-button> -->
          </div>
        </el-form-item>
        <el-form-item label="描述" prop="remark" :label-width="formLabelWidth">
          <el-input v-model.trim="params.remark" type="textarea" :autosize="{ minRows: 2}" placeholder="请输入" />
        </el-form-item>
        <el-upload :action="`${ baseUrl }/upload/uploadPic`" list-type="picture-card"
          :with-credentials="true" :on-success="handleUploadSuccess"
          :accept="'.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'"
          style="display:none;"
        >
          <i ref="uploadTrigger" slot="default" class="el-icon-plus"></i>
        </el-upload>
    </el-form>
    <BMapPoiSelector :visible.sync="bMapPoiSelectorVisible" @select="handlePoiSelectConfirm" />
  </div>
</template>

<script>
  import { sendSms } from '@/api/user'
  import {
    getToken
  } from '@/utils/auth'
  import {
    isvalidPhone,
    validEmail,
  } from '@/utils/validate'
  import {
    getTenant
  } from '@/utils/tenant'
  import BMapPoiSelector from '@/components/BMapPoiSelector'
  export default {
    filters: {
      poi(poi) {
        if (!poi) return '请选择'
        else return `纬度:${poi.lat},经度:${poi.lng}`
      }
    },
    components: {
      BMapPoiSelector,
    },
    data() {
      const checkPhone = (_, val, callback) => {
        if (isvalidPhone(val)) return callback();
        else return callback(new Error('手机号格式不合法'))
      }
      const poiValidator = (_, val, callback) => {
        if (!this.params.poi) return callback(new Error('经纬度不能为空'))
        else return callback();
      }
      const emailValidator = (_, val, callback) => {
        if (!val || validEmail(val)) return callback()
        else return callback(new Error('邮箱格式不合法'))
      }
      return {
        currentEnclosureIndex:-1,
        currentPicIndex:-1,
        verifyCodeLoading:false,
        bMapPoiSelectorVisible: false,
        token: getToken(),
        baseUrl: process.env.BASE_API,
        size: 'small',
        labelPosition:'right',
        formLabelWidth: '96px',
        cusLabelHeight:'32px',
        formName: 'form',
        initParams: null,
        gutter: 0,
        countDown:0,
        params: {
          userName:'',
          enterpriseCode: '',
          name: '',
          location: '',
          poi: null,
          contacts: '',
          contactsTel: '',
          contactsWx: '',
          domainName: '',
          trueLocation: '',
          email:'',
          certList:[
            { certName:'营业执照照片',certCode: '',certPc: [], },
            { certName:'充装许可证照片',certCode: '',certPc: [], },
            { certName:'燃气经营许可证照片',certCode: '',certPc: [], },
          ],
          remark: '',
        },
        rules: {
          userName: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }, {
            pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,12}$/,
            message: '以字母开头，长度在4-12之间， 只能包含字母、数字和下划线'
          }],
          enterpriseCode: [{
            required: true,
            message: '企业代码不能为空',
            trigger: 'blur'
          }],
          name: [{
            required: true,
            message: '气站名称不能为空',
            trigger: 'blur'
          }],
          location: [{
            required: true,
            message: '地址不能为空',
            trigger: ''
          }],
          poi: [{
            validator: poiValidator,
            trigger: ''
          }],
          contacts: [{
            required: true,
            message: '气站负责人不能为空',
            trigger: 'blur'
          }],
          contactsTel: [{
            required: true,
            message: '手机号不能为空',
            trigger: 'blur'
          }, {
            validator: checkPhone,
            trigger: 'blur'
          }],
          verifyCode:[{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }],
          contactsWx: [{
            pattern: /^([a-zA-Z][a-zA-Z\d_-]{5,19}\,?)+$/,
            message:'微信号格式不合法',
            trigger: 'blur'
          }],
          contactsQq: [{
            pattern: /^([1-9]{1}[0-9]{4,11}\,?)+$/,
            message:'QQ号格式不合法',
            trigger: 'blur'
          }],
          email: [{
            validator:emailValidator,
            trigger: 'blur'
          },],
          domainName: [{
            required: true,
            message: '气站域名不能为空',
            trigger: 'blur'
          },
          {
            pattern: /^[0-9|A-Z|a-z|_]{3,15}$/,
            message: '只能输入3-15位数字大小写英文字母和下划线',
            trigger: 'blur'
          },],
        }
      }
    },
    methods: {
      //获取验证码
      handleGetVerifyCode(){
        this.$refs[this.formName].validateField('contactsTel', err => {
          if(err) return;
          this.verifyCodeLoading = true
          sendSms(this.params.contactsTel).then(response=>{
            if(response.data.data){
              this.$message.success('发送成功')
              this.countDown = 60
              let timer = setInterval(()=>{
                if(!this.countDown) return clearInterval(timer)
                this.countDown--;
              },1000)
            }
          }).finally(()=>{
            this.verifyCodeLoading = false
          })
        })
      },
      // PoiSelect确认按钮
      handlePoiSelectConfirm(poi) {
        this.params.poi = {
          ...poi.point
        }
        this.params.location = poi.address
        this.params.trueLocation = poi.province + poi.city + poi.district + poi.street
        this.bMapPoiSelectorVisible = false
        this.$refs[this.formName].validateField('poi')
      },
      //图片鼠标进入
      handlePicMouseEnter(index,picIndex){
        this.currentEnclosureIndex = index
        this.currentPicIndex = picIndex
      },
      //图片鼠标进入
      handlePicMouseLeave(index,picIndex){
        this.currentEnclosureIndex = -1
        this.currentPicIndex = -1
      },
      //删除图片
      handleDeletePic(index,picIndex){
        let newList = [...this.params.certList[index].certPc]
        newList.splice(picIndex,1)
        this.$set(this.params.certList[index],'certPc',newList)
      },
      //删除附件
      handleDeleteEnclosure(index){
        this.params.certList.splice(index,1)
      },
      //添加附件
      handleAddEnclosure(){
        this.$set(this.params,'certList',[...this.params.certList,{ certName:'',certCode: '',certPc:[], }])
      },
      //添加一张图片
      handleAddPic(index){
        this.currentEnclosureIndex = index
        let list = this.params.certList
        this.$refs['uploadTrigger'].click()
      },
      //获取预览列表
      getPreViewList(index,picIndex){
        let list = [...this.params.certList[index].certPc]
        let slice = list.splice(picIndex)
        return [ ...slice,...list ]
      },
      // 外部最终获取到的内容
      getParams() {
        let params = this.params
        return {
          ...params,
          parentTenantId: getTenant(),
          tenantType: '1',
          lat: String(params.poi.lat),
          lng: String(params.poi.lng),
          certList:params.certList.map(item => {
            return {
              ...item,
              certPc:item.certPc.join(','),
            }
          })
        }
      },
      //上传文件成功
      handleUploadSuccess(response) {
        this.params.certList[this.currentEnclosureIndex].certPc.push(response.url)
      },
    }
  }

</script>
<style lang="scss" scoped>
  .row{
    margin-top:12px;
  }
  .verify-code-container{
    display:flex;
    justify-content: space-between;
    align-items: center;
    .input{
      flex-grow:1;
      margin-right:12px;
    }
  }
  .enclosure{
    border:1px dashed rgba(0,0,0,0.45);
    .list{
      border-bottom:1px dashed rgba(0,0,0,0.45);
      padding:8px 0;
      .item{
        display:flex;
        justify-content: space-between;
        align-items: stretch;
        &:not(:first-child){
          margin-top:12px;
        }
        &:not(:last-child){
          padding-bottom:12px;
          border-bottom:1px dashed rgba(0,0,0,0.45);
        }
        .main{
          flex-grow:1;
          .info{
            display:flex;
            justify-content: space-between;
            align-items: center;
            padding:0 8px;
            &>*:not(:first-child){
              margin-left:8px;
            }
          }
        }
        .picture{
          padding:0 8px 8px 0;
          display:flex;
          flex-flow:row wrap;
          align-content:center;
          align-items: center;
          *{
            line-height:1;
          }
          &>*{
            margin-left:8px;
            margin-top:8px
          }
          .imgDelBtn{
            &.show{
              display:block;
            }
            padding:0;
            margin:0;
            font-size:10px;
            border-radius:50%;
            position:absolute;
            top: -5px;
            right:-5px;
            display:none;
          }
        }
      }
    }
  }
</style>