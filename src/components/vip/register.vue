<template>
  <div class="container">
    <!-- 页头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>会员注册</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="block">
      <p>欢迎注册</p>
      <div class="content">
        <div class="main">
          <!-- 手机号码校验 -->
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="mobile">
              <el-input
                v-model="ruleForm.mobile"
                prefix-icon="el-icon-mobile-phone"
                placeholder="请输入手机号码"
                clearable
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 滑块 -->
          <div class="slider">
            <el-slider
              v-model="fulloff"
              :show-tooltip="false"
              @change="changefull"
              v-on:click.stop
            ></el-slider>
          </div>
          <!-- 动态密码 -->
          <div class="changePassword">
            <el-input
              placeholder="请输入动态密码"
              prefix-icon="el-icon-lock"
            >
            </el-input>
            <button
              class="auth_text auth_text_blue"
              v-show="sendAuthCode"
              @click="getAuthCode"
            >获取验证码</button>
          </div>
          <!-- 设置密码 -->
          <div class="changePassword">
            <el-input
              placeholder="设置密码(6-30字符)"
              prefix-icon="el-icon-lock"
              type="password"
              v-model="ruleForm.password"
              clearable
              :show-password='true'
            >
            </el-input>
          </div>
          <div
            class="registerNow"
            @click="getRegister()"
          >
            <button class="btn">立即注册</button>
          </div>
          <div class="title">
            <div class="left">
              <el-checkbox v-model="checked">我已阅读并接受 用户协议 和 隐私政策</el-checkbox>
            </div>
            <div class="right" @click="$router.push('login')">
              <p>已有账号,</p>
              <p>马上登陆></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../footer/footer'
import Qs from 'qs'
export default {
  data() {
    // 验证手机的规则
    let checkMobile = (rule, value, callback) => {
      const regMobile = /^1[345789]\d{9}$/
      if (regMobile.test(value)) {
        // 合法的手机号
        return callback()
      }
      callback(new Error('请输入正确的手机号'))
    }
    // 数据
    return {
      // 数据
      ruleForm: {
        mobile: null,
        password: ''
      },
      //  校验规则
      rules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' },
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },
      fulloff: 6,
      checked: true,
      // 倒计时
      sendAuthCode: true,
      auth_time: 0
    }
  },
  components: {
    Footer
  },
  methods: {
    // 滑块的状态
    changefull() {
      if (this.fulloff >= 100) {
        this.$message.success('验证码已发送')
      }
      this.fulloff = 6
    },
    // 点击立即注册
    async getRegister() {
      if (this.checked) {
        let params = Qs.stringify(this.ruleForm)
        console.log(params)
        const { data: res } = await this.$http.post('api_users_register', params)
        console.log(res)
        if (!res.result) {
          return this.$message.error('注册失败')
        }
        this.$message.success('注册成功')
        this.$router.push('/login')
      } else {
        this.$message.error('请先阅读并接受用户协议和隐私政策')
      }
    },
    // 验证码验证
    getAuthCode() {
      // 获取手机号码
      const verification = this.ruleForm.mobile
      const url = ''
      // 调用接口发送验证码，成功后开启进入倒计时
      this.$http.post(url).then(
        function(response) {
          console.log(response)
          this.$message.success('发送成功')
          this.sendAuthCode = false
        },
        function(error) {
          console.log('请求失败', error)
        }
      )
      // 设置倒计时秒
      this.auth_time = 60
      let authTimetimer = setInterval(() => {
        this.auth_time--
        if (this.auth_time <= 0) {
          this.sendAuthCode = true
          clearInterval(authTimetimer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang='less'>
.container {
  .block {
    width: 1010px;
    height: 598px;
    background-color: #ffffff;
    border-radius: 10px;
    margin: 60px 0 0 128px;
    > p {
      height: 92px;
      background-color: #2a58ad;
      font-size: 30px;
      text-align: center;
      line-height: 92px;
      letter-spacing: 3px;
      color: #ffffff;
    }
    > .content {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 47px;
      .main {
        display: flex;
        flex-direction: column;
        .el-form-item {
          margin-bottom: 0;
        }
        .el-input {
          width: 557px;
          height: 60px;
          background-color: #eaeef1;
          border-radius: 5px;
          .el-input__prefix {
            left: 25px;
            color: #9ba9ea;
            font-size: 18px;
          }
          .el-input__inner {
            height: 60px;
            background-color: #eaeef1;
            padding-left: 70px;
            font-size: 18px;
            color: #000000;
          }
        }
        // 滑块
        .slider {
          > .el-slider {
            height: 60px;
            > .el-slider__runway {
              height: 60px;
              margin: 20px 0;
              > .el-slider__bar {
                height: 60px;
              }
              > .el-slider__button-wrapper {
                height: 60px;
                width: 67px;
                top: 0;
                left: 0;
                > .el-tooltip {
                  width: 100%;
                  height: 100%;
                  border-radius: 5px;
                  background: url('../../assets/img/drag.jpg') no-repeat;
                  background-size: cover;
                  &:hover {
                    transform: none;
                    border: none;
                  }
                }
                &:hover {
                  border: none;
                }
              }
            }
          }
        }
        // 动态密码
        .changePassword {
          width: 557px;
          height: 60px;
          background-color: #eaeef1;
          border-radius: 5px;
          margin-top: 38px;
          position: relative;
          > button {
            position: absolute;
            top: 50%;
            right: 12px;
            transform: translateY(-50%);
            border: none;
            outline: none;
            cursor: pointer;
            width: 148px;
            height: 45px;
            background-color: #a4adb3;
            border-radius: 3px;
            text-align: center;
            font-size: 18px;
            letter-spacing: 2px;
            color: #ffffff;
            border-radius: 3px;
          }
          .el-input__suffix {
            right: 40px;
            font-size: 30px;
          }
          &:nth-of-type(3) {
            margin-top: 20px;
          }
        }
        //立即注册
        .registerNow {
          border-radius: 5px;
          margin-top: 20px;
          > button {
            border: none;
            outline: none;
            background-color: #2a58ad;
            border-radius: 5px;
            width: 557px;
            height: 60px;
            font-size: 25px;
            letter-spacing: 5px;
            color: #ffffff;
          }
        }
        // box最下面细节
        .title {
          width: 557px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .left {
            .el-checkbox {
              display: flex;
              align-items: center;
            }
          }
          .right {
            cursor: pointer;
            display: flex;
            letter-spacing: 2px;
            color: #7b8388;
            font-size: 15px;
            p {
              &:nth-of-type(2) {
                color: #2a58ad;
              }
            }
          }
        }
      }
    }
  }
}
</style>
