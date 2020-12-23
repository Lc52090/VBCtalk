<template>
  <div>
    <!-- 页头 -->
    <div>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人推荐</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="p-container">
      <div class="content">
        <!--  个人资料 -->
        <div class="produce-person">
          <p>推荐人资料</p>
          <div class="line"></div>
          <!-- 表单控件 -->
          <div class="Ipt">
            <!-- 昵称 -->
            <div class="username">
              <span>昵称</span><input
                type="text"
                v-model="queryInfo.nickname"
              >
            </div>
            <!-- id -->
            <div><span class="loginId">ID</span><span>{{queryInfo.id}}</span></div>
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
          </div>
        </div>
        <!-- 分割线 -->
        <div class="crossLine"></div>
        <!-- 网红资料 -->
        <div class="hotperson">
          <p>网红资料</p>
          <div class="line"></div>
          <Hotperson :t_postInfo="t_postInfo"></Hotperson>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Qs from 'qs'
import options from '../../options'
import Hotperson from './hotperson.vue'
import Footer from '../footer/footer'
export default {
  components: {
    Hotperson,
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
      // 获取用户信息参数
      queryInfo: {},
      // 完善用户信息参数
      t_postInfo: {}
    }
  },
  created() {
    this.getUserinfo()
    this.options = options
  },
  methods: {
    // 获取用户信息
    async getUserinfo() {
      let userId = sessionStorage.getItem('user_id')
      if (!userId) {
        this.$router.push('/login')
        this.$message.warning('请先登录')
      }
      let params = Qs.stringify({
        id: userId
      })
      const { data: res } = await this.$http.post('api_get_user', params)
      this.queryInfo = res
      let { date, headimgurl, result, ...rest } = this.queryInfo
      let i = 0
      for (i in rest) {
        const arr = rest[i]
        if (i === 'id') {
          i = 'users_id'
        }
        i = `t_${i}`
        this.t_postInfo[i] = arr
      }
    }
  }
}
</script>

<style lang='less'>
.el-breadcrumb {
  cursor: pointer;
}
.p-container {
  width: 1178px;
  background-color: #ffffff;
  border-radius: 10px;
  margin: 60px 0 50px 46px;
  padding-bottom: 20px;
  /* 个人资料 */
  .produce-person {
    padding-bottom: 60px;
    > p {
      font-size: 20px;
      letter-spacing: 0px;
      color: #353535;
      padding: 32px 0 10px 52px;
    }
    > .line {
      width: 40px;
      height: 3px;
      background-color: #2a58ad;
      margin-left: 52px;
      margin-bottom: 46px;
    }
    /* 表单控件 */
    > .Ipt {
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
          width: 904px;
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
    }
  }
  /* 分割线 */
  .crossLine {
    width: 1069px;
    height: 3px;
    background-color: #c0cad2;
    margin-left: 55px;
    margin-bottom: 43px;
  }
  /* 网红资料 */
  .hotperson {
    > p {
      font-size: 20px;
      letter-spacing: 0px;
      color: #353535;
      padding: 32px 0 10px 52px;
    }
    > .line {
      width: 40px;
      height: 3px;
      background-color: #2a58ad;
      margin-left: 52px;
      margin-bottom: 10px;
    }
  }
  /* 提交数据按钮 */
  .postBtn {
    display: flex;
    height: 70px;
    align-items: center;
    justify-content: center;
    margin-left: 0;
    padding-bottom: 20px;
    button {
      width: 200px;
      height: 100%;
      text-align: center;
    }
  }
}
</style>
