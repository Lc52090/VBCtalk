<template>
  <div class="container">
    <div class="content">
      <img
        src="../../assets/img/vbc.jpg"
        alt=""
      >
      <p>VBC全球视商发展论坛</p>
    </div>
    <el-menu
      background-color="#2a58ad"
      text-color="#ffffff"
      active-text-color="#ffffff"
      :router="true"
    >
      <!-- 导航一 -->
      <!-- 导航首页 -->
      <el-menu-item index="/main">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <!-- 红人榜 -->
      <el-menu-item index="/hotlist">
        <i class="el-icon-s-data"></i>
        <span slot="title">红人榜</span>
      </el-menu-item>
      <!-- 主题论坛 -->
      <el-menu-item index="/talk">
        <i class="el-icon-copy-document"></i>
        <span slot="title">主题论坛</span>
      </el-menu-item>
      <!-- 会员注册 -->
      <el-menu-item index="/userinfo">
        <i class="el-icon-edit"></i>
        <span slot="title">会员注册</span>
      </el-menu-item>
      <!-- 关于我们 -->
      <el-menu-item index="/aboutus">
        <i class="el-icon-warning-outline"></i>
        <span slot="title">关于我们</span>
      </el-menu-item>
      <!-- 个人中心 -->
      <el-menu-item index="/produce">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <!-- 退出登录 -->
      <el-menu-item
        index="/login"
        @click="clearInfo"
      >
        <i class="el-icon-s-platform"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  methods: {
    // 退出登录
    clearInfo() {
      sessionStorage.removeItem('user_id')
      this.$message.success('退出成功')
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  .content {
    display: flex;
    flex-direction: column;
    padding-top: 50px;
    margin-left: 84px;
    > img {
      width: 93px;
      height: 25px;
      display: block;
      margin-bottom: 23px;
    }
    > p {
      width: 293px;
      height: 30px;
      color: #fff;
      font-size: 29px;
      line-height: 30px;
    }
  }
  .el-menu {
    height: 100%;
    margin-top: 40px;
  }
  .el-menu-item {
    height: 97px;
    display: flex;
    align-items: center;
    &:nth-of-type(6) {
      margin-top: 200px;
    }
    i {
      color: #ffffff;
      margin-left: 65px;
    }
  }
  .el-menu[data-v-e4ee0652] {
    border-right: 1px solid rgb(42, 88, 173);
  }
}
</style>
