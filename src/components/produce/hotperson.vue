<template>
  <div>
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
          v-if="w_postInfo.w_headimgurl"
          :src="w_postInfo.w_headimgurl"
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
    <div class="hotform">
      <!-- 昵称 -->
      <div class="username">
        <span>昵称</span><input
          type="text"
          v-model="w_postInfo.w_nickname"
        >
      </div>
      <!--  性别 -->
      <div class="sex">
        <p>性别</p>
        <div>
          <el-radio
            v-model="w_postInfo.w_sex"
            label="1"
          >男</el-radio>
          <el-radio
            v-model="w_postInfo.w_sex"
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
            v-model="w_postInfo.w_hometown"
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
            v-model="w_postInfo.w_habitation"
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
        :model="w_postInfo"
        :rules="rules"
        ref="ruleForm"
      >
        <!-- 类型 -->
        <el-form-item
          label="类型"
          prop="company"
        >
          <el-select
            v-model="w_postInfo.w_type1"
            placeholder="请选择"
            style="margin-right:34px;width:286px"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <el-select
            v-model="w_postInfo.w_type2"
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
        <!-- 公司 -->
        <el-form-item
          label="公司"
          prop="w_company"
        >
          <el-input v-model="w_postInfo.w_company"></el-input>
        </el-form-item>
        <!-- 平台 -->
        <div class="pingtai">
          <el-form-item
            prop="company"
            label="平台1"
          >
            <el-select
              v-model="w_postInfo.w_pingtai"
              placeholder="请选择"
              style="margin:0 100px 0 -5px "
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
          <!-- 平台2 -->
          <el-form-item
            prop="company"
            label="粉丝量"
          >
            <el-input
              v-model="w_postInfo.w_fensi"
              type="text"
            ></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!-- 提交资源 -->
    <div class="postBtn">
      <el-button
        type="primary"
        @click="postUserInfo()"
      >提交资源</el-button>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import options from '../../options'

export default {
  props: ['t_postInfo'],
  data() {
    return {
      radio: '1',
      options: {},
      // 表单验证规则
      rules: {
        w_company: [{ required: true, message: '请输入公司名称', trigger: 'blur' }]
      },
      // 完善用户信息参数
      w_postInfo: {
        w_nickname: '', // 昵称
        w_sex: null, // 性别
        w_hometown: '', // 家乡
        w_habitation: '', // 居住地
        w_type1: '',
        w_type2: '',
        w_company: '',
        w_pingtai: '',
        w_fensi: '',
        w_headimgurl: ''
      }
    }
  },
  created() {
    this.options = options
  },
  methods: {
    // 头像上传
    handleAvatarSuccess(res, file) {
      this.w_postInfo.w_headimgurl = URL.createObjectURL(file.raw)
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
    // 点击提交完善用户信息
    async postUserInfo() {
      let params = Qs.stringify(Object.assign(this.t_postInfo, this.w_postInfo))
      console.log(this.w_postInfo)
      const { data: res } = await this.$http.post('api_commit_wanghongtuijian', params)
      if (!res.result) {
        return this.$message.error('请正确填写资料')
      }
      this.$message.success('提交成功')
    }
  }
}
</script>

<style lang='less'>
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
.hotform {
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
    margin-left: 11px;
    > .el-form-item {
      &:nth-of-type(2) {
        margin-left: 28px;
      }
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
  }
  /* 昵称 */
  .username {
    > input {
      padding-left: 20px;
      color: #606266;
      font-size: inherit;
      width: 904px;
      margin-left: 41px;
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
  .pingtai {
    display: flex;
    align-items: center;
  }
  .el-form-item__content {
    display: flex;
    align-items: center;
    margin-left: 0;
  }
  .el-form-item {
    display: flex;
    align-items: center;
    justify-content: start;
    margin-left: 40px;
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
</style>
