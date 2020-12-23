<template>
  <div v-if="queryInfo">
    <!-- 页头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'register' }">会员注册</el-breadcrumb-item>
      <el-breadcrumb-item>完善个人信息</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 用户信息 -->
    <div class="form">
      <!-- 头像上传 -->
      <div class="headimg">
        <el-upload
          class="avatar-uploader"
          action="http://h5.cshtm.com/project2020/202005/vbcluntan/ci/index.php/api/api_commit_userinfo"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="queryInfo.headimgurl"
            :src="queryInfo.headimgurl"
            class="avatar"
          >
          <img
            v-else
            src="../../assets/img/register.jpg"
            alt=""
          >
          <p>
            <span>VBC论坛会员</span>
            <span>修改</span>
          </p>
        </el-upload>
      </div>
      <!-- 表单控件 -->
      <div class="Ipt">
        <!-- id -->
        <div><span class="loginId">ID</span><span>{{queryInfo.id}}</span></div>
        <!-- 昵称 -->
        <div class="username">
          <span>昵称</span><input
            type="text"
            v-model="queryInfo.nickname"
          >
        </div>
        <!--  性别 -->
        <div class="sex">
          <p>性别</p>
          <div>
            <el-radio
              v-model="radio"
              label="1"
            >男</el-radio>
            <el-radio
              v-model="radio"
              label="2"
            >女</el-radio>
          </div>
        </div>
        <!-- 家乡现居 -->
        <div class="homeAddress">
          <!-- 家乡 -->
          <div class="home">
            <p>家乡</p>
            <el-select
              v-model="queryInfo.hometown"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <!-- 现居 -->
          <div class="address">
            <p>现居</p>
            <el-select
              v-model="queryInfo.habitation"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <!-- 表单控件 -->
        <el-form
          :model="queryInfo"
          :rules="rules"
          ref="ruleForm"
          label-width="95px"
        >
          <!-- 公司 -->
          <el-form-item
            label="公司"
            prop="company"
          >
            <el-input v-model="queryInfo.company"></el-input>
          </el-form-item>
          <!-- 行业 -->
          <el-form-item
            label="行业"
            prop="name"
          >
            <el-select
              v-model="queryInfo.hangye"
              placeholder="请选择"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 职务 -->
        <div class="job">
          <p>职务</p>
          <div>
            <input
              type="text"
              v-model="queryInfo.zhiwu"
            >
          </div>
        </div>
        <!-- 简介 -->
        <div class="produce">
          <p>简介</p>
          <div>
            <input
              type="text"
              maxlength="100"
              v-model="queryInfo.jianjie"
            >
          </div>
        </div>
        <!-- 点击修改提交按钮 -->
        <div class="btnwrap">
          <button @click="postUserInfo()">提交</button>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Qs from 'qs'
import options from '../../options'
import Footer from '../footer/footer'
export default {
  components: {
    Footer
  },
  data() {
    return {
      radio: '1',
      options: {},
      // 表单验证规则
      rules: {
        company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
      },
      // 职务
      job: '',
      // 简介
      produce: '',
      // 获取用户信息参数
      queryInfo: {},
      // 完善用户信息参数
      postInfo: {
        id: null, // 用户ID
        nickname: '', // 昵称
        sex: null, // 性别
        hometown: '', // 家乡
        habitation: '', // 居住地
        company: '',
        hangye: '',
        zhiwu: '',
        jianjie: '',
        imgbase64: '' // 头像base64图片
      }
    }
  },
  created() {
    this.getUserinfo()
    this.options = options
  },
  methods: {
    // 头像上传
    handleAvatarSuccess(res, file) {
      this.queryInfo.headimgurl = URL.createObjectURL(file.raw)
      this.postInfo.imgbase64 = URL.createObjectURL(file.raw)
    },
    // 头像上传验证
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 获取用户信息
    async getUserinfo() {
      let userId = sessionStorage.getItem('user_id')
      if (!userId) {
        this.$router.push('/login')
        this.$message.warning('请登录')
      }
      let params = Qs.stringify({
        id: userId
      })
      const { data: res } = await this.$http.post('api_get_user', params)
      this.queryInfo = res
    },
    // 完善用户信息提交
    async postUserInfo() {
      let params = Qs.stringify(this.postInfo)
      const { data: res } = await this.$http.post('api_commit_userinfo', params)
    }
  }
}
</script>

<style lang='less'>
.form {
  width: 1178px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 60px 0 50px 46px;
  /* 头像上传 */
  .headimg {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .avatar-uploader {
      margin: 24px 0 18px 0;
      .el-upload {
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .avatar {
        width: 138px;
        height: 138px;
        display: block;
        border-radius: 50%;
      }
      &.el-upload:hover {
        border-color: #409eff;
      }
      p {
        cursor: pointer;
        margin: 0 auto;
        span {
          letter-spacing: 2px;
          color: #353535;
          font-size: 16px;
          &:nth-of-type(2) {
            color: #2a58ad;
            margin-left: 30px;
          }
        }
      }
    }
  }
  /* 表单控件 */
  .Ipt {
    padding-bottom: 30px;
    input {
      height: 53px;
      background-color: #eaeef1;
      border-radius: 3px;
      border: solid 1px #b8bfc4;
      margin-left: 30px;
    }
    /* form表单控件 */
    .is-error {
      border-color: none;
    }
    > .el-form {
      > .el-form-item {
        > .el-form-item__label {
          font-size: 16px;
        }
        > .el-form-item__content {
          > .el-input {
            width: 904px;
          }
        }
      }
    }
    /* ID */
    > div {
      display: flex;
      margin: 21.5px 0 21.5px 52px;
      align-items: center;
      font-size: 16px;
      letter-spacing: 2px;
      color: #7b8388;
      height: 55px;
      > .loginId {
        font-size: 16px;
        letter-spacing: 15px;
        color: #7b8388;
        margin-right: 30px;
        &:nth-of-type(2) {
          letter-spacing: 1px;
          color: #353535;
        }
      }
    }
    /* 昵称 */
    .username {
      input {
        padding-left: 20px;
        margin-left: 40px;
        color: #606266;
        font-size: inherit;
      }
    }
    /* sex */
    .sex {
      > p {
        margin-right: 40px;
      }
    }
    /* 家乡现居 */
    .homeAddress {
      > div {
        display: flex;
        margin-right: 102px;
        align-items: center;
        p {
          margin-right: 10px;
        }
      }
    }
    /* 职务 */
    .job {
      display: flex;
      align-items: center;
      p {
        margin-right: 8px;
      }
      > div {
        width: 904px;
        input {
          width: 100%;
          padding-left: 15px;
        }
      }
    }
    /* 简介 */
    .produce {
      display: flex;
      align-items: center;
      p {
        margin-right: 8px;
      }
      > div {
        width: 904px;
        input {
          width: 100%;
          display: block;
          padding-left: 10px;
          position: relative;
          &::after {
            content: '';
            display: block;
            position: absolute;
            right: 0;
            top: 0;
            width: 15px;
            height: 54px;
          }
        }
      }
    }
    /* 提交按钮 */
    .btnwrap {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 0;
      button {
        cursor: pointer;
        width: 200px;
        height: 55px;
        background-color: #2a58ad;
        color: #fff;
        font-size: 20px;
        line-height: 60px;
        text-align: center;
        outline: none;
        border: none;
        border-radius: 5px;
      }
    }
  }
}
</style>
