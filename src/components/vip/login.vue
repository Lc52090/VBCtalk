<template>
  <div class="login">
    <div class="card">
      <div class="content">
        <!-- 用户名登录 -->
        <div>
          <el-input
            placeholder="请输入ID/手机号/用户名"
            prefix-icon="el-icon-user-solid"
            v-model="mobile"
            clearable
          >
          </el-input>
        </div>
        <!-- 输入密码 -->
        <div>
          <el-input
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            v-model="password"
            type="password"
            clearable
            :show-password='true'
          >
          </el-input>
        </div>
        <!-- 点击登录 -->
        <div>
          <el-button
            type="primary"
            @click="login()"
          >点击登录</el-button>
        </div>
        <!-- 登录下面的功能 -->
        <div>
          <div class="left">
            <el-checkbox v-model="checked">下次自动登录</el-checkbox>
          </div>
          <div class="right">
            <span>忘记密码 |</span>
            <span @click="$router.push('/register')">注册</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
export default {
  data() {
    return {
      mobile: '',
      password: '',
      checked: false
    }
  },
  methods: {
    async login() {
      let params = Qs.stringify({
        mobile: this.mobile,
        password: this.password
      })
      const { data: res } = await this.$http.post('api_users_login', params)
      if (!res.result && res.code === 101) {
        return this.$message.warning('账号或密码错误')
      } else if (!res.result && res.code === 100) {
        return this.$message.warning('帐号密码不能为空')
      }
      console.log(res)
      this.$message.success('登陆成功')
      sessionStorage.setItem('user_id', res.users_id)
      this.$router.push('/userinfo')
    }
  }
}
</script>

<style lang='less'>
.login {
  width: 1520px;
  height: 100%;
  background: url('../../assets/img/login.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  > .card {
    width: 673px;
    height: 371px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      width: 560px;
      > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 0;
        .el-input__inner {
          width: 557px;
          height: 60px;
          border-radius: 5px;
        }
        .el-button {
          width: 557px;
          height: 60px;
          border-radius: 5px;
        }
        .el-checkbox {
          letter-spacing: 2px;
          color: #ffffff;
          font-size: 15px;
        }
        .el-checkbox__input.is-checked + .el-checkbox__label {
          color: #ffffff;
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: space-around;
          span {
            cursor: pointer;
            font-size: 15px;
            color: #ffffff;
            letter-spacing: 2px;
          }
        }
      }
    }
  }
}
</style>
