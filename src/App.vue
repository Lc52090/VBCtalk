<template>
  <div id="app">
    <el-container>
      <el-aside width="400px">
        <!-- 左侧导航菜单 -->
        <Nav></Nav>
      </el-aside>
      <el-container>
        <el-header v-if="this.$route.fullPath!=='/login'">

          <Head></Head>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Nav from './components/nav/nav'
import Head from './components/head/head'
export default {
  data() {
    return {}
  },
  components: {
    Nav,
    Head
  }
}
</script>

<style lang="less">
body {
  background-color: #eaeef1;
}
#app {
  height: 100%;
  width: 100%;
}
.el-header {
  color: #333;
  text-align: center;
}

.el-aside {
  color: #333;
  text-align: center;
  height: auto;
  line-height: 200px;
  background-color: #2a58ad;
  >.el-container{
    display: flex;
    flex-direction: column;
  }
}

.el-main {
  color: #333;
  width: 1243px;
  padding: 0 !important;
  overflow: inherit !important;
  position: relative;
}

body > .el-container {
  margin-bottom: 40px;
  height: 100%;
}
</style>
