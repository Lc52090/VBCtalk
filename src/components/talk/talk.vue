<template>
  <div>
    <!-- 页头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'talk' }">主题论坛</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.fullPath === '/talkVideo'">论坛视频</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="t-list">
      <!-- 一级分类 -->
      <ul>
        <li
          v-for="(item,index) in categoryList"
          :key="index"
          :class="{'active': index === selected }"
          @click="chooseOnce(item,index)"
        ><span></span>{{item.title}}</li>
      </ul>
      <!-- 二级分类 -->
      <ul>
        <li
          v-for="(item,index) in children.child"
          :key="index"
          :class="[index === choosed? 'active':'']"
          @click="chooseTwice(item,index)"
        >
          {{item.title}}
        </li>
      </ul>
      <!-- 小标题 -->
      <div class="t-title">
        <div>
          <span>品牌 - {{titleText.category2_title}} 榜&nbsp;&nbsp;&nbsp;</span>
          <span v-if="this.$route.fullPath === '/hottwoList'">第{{item.rank}}名</span>
        </div>
        <div>
          <span
            v-for="(item,index) in spanText"
            :key="index"
            :class="[index===changed?'active':'']"
            @click="changeColor(item,index)"
          >{{item}}</span>
        </div>
      </div>
      <!-- 显示路由 -->
      <router-view
        :liveVideo="liveVideo"
        :titleText="titleText"
      ></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from '../footer/footer'
import Qs from 'qs'
export default {
  data() {
    return {
      // 论坛类别
      categoryList: [],
      selected: 0,
      choosed: 0,
      changed: 0,
      children: [],
      // 分类菜单id
      liveVideoList: {
        category1_id: 2,
        category2_id: 1,
        order: 1
      },
      // 传入子组件的值
      liveVideo: [],
      titleText: {
        category1_title: '',
        category2_title: ''
      },
      spanText: ['最新', '最火']
    }
  },
  components: {
    Footer
  },
  created() {
    this.getCategoryList()
    this.getTalkvideo()
  },
  methods: {
    getData(category1, category2, order) {
      let params = Qs.stringify({
        category1_id: category1,
        category2_id: category2,
        order: order
      })
      return params
    },
    // 获取论坛类别
    async getCategoryList() {
      const { data: res } = await this.$http.post('api_luntan_category_list')
      this.categoryList = res.data
      this.children = this.categoryList[this.selected]
      this.titleText.category1_title = this.children.title
      this.titleText.category2_title = this.children.child[this.choosed].title
    },
    // 初始化talkvideo界面
    async getTalkvideo() {
      let params = Qs.stringify(this.liveVideoList)
      const { data: res } = await this.$http.post('api_luntan_live_video_list', params)
      this.liveVideo = res.data
    },
    // 一级分类
    async chooseOnce(item, index) {
      this.selected = index
      this.liveVideoList.category1_id = item.id
      this.children = this.categoryList[this.selected]
      // 二级分类长度的active
      this.choosed = 0
      let params = this.getData(item.id, item.child[0].id, this.liveVideoList.order)
      // 点击切换时初始化显示第一栏
      const { data: res } = await this.$http.post('api_luntan_live_video_list', params)
      this.liveVideo = res.data
      this.titleText.category1_title = item.title
      this.titleText.category2_title = item.child[0].title
    },
    // 二级分类,点击二级菜单获取红人分类菜单列表
    async chooseTwice(item, index) {
      this.choosed = index
      this.liveVideoList.category2_id = item.id
      this.titleText.category2_title = item.title
      let params = this.getData(2, item.id, this.liveVideoList.order)
      const { data: res } = await this.$http.post('api_luntan_live_video_list', params)
      this.liveVideo = res.data
      // 点击跳转
      if (this.$route.fullPath !== '/talkVideoList') {
        this.$router.push('/talkVideoList')
        const { data: res } = await this.$http.post('api_luntan_live_video_list', params)
        this.liveVideo = res.data
      }
    },
    // 最新最热切换
    async changeColor(item, index) {
      this.changed = index
      this.liveVideoList.order = index + 1
    }
  }
}
</script>

<style lang='less' scoped>
.t-list {
  margin-bottom: 60px;
  width: 1225px;
  margin-left: 22px;
  > ul {
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    /* 一级分类 */
    &:nth-of-type(1) {
      width: 550px;
      margin-top: 34px;

      > li {
        color: #84878c;
        font-size: 20px;
        height: 44px;
        line-height: 40px;

        &.active {
          letter-spacing: 1px;
          color: #2a2a2a;
          font-size: 30px;
          position: relative;
          span {
            position: absolute;
            width: 38px;
            height: 4px;
            background-color: #2a58ad;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    /* 二级分类 */
    &:nth-of-type(2) {
      justify-content: space-around;
      background-color: #ffffff;
      border-radius: 10px;
      height: 49px;
      padding: 0 90px;
      display: flex;
      justify-content: space-between;
      li {
        color: #84878c;
        flex: 1;
        font-size: 20px;
        border-right: 2px solid #84878c;
        text-align: center;
        padding: 5px 0;
        &:last-of-type {
          border: none;
        }
        &.active {
          color: #2a58ad;
        }
      }
    }
  }
  .t-title {
    color: #2a2a2a;
    font-size: 16px;
    height: 16px;
    margin: 29px 0 39px 45px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    div {
      &:nth-of-type(2) {
        cursor: pointer;
        display: flex;
        width: 150px;
        justify-content: space-around;
        color: #84878c;
        span {
          &.active {
            color: #2a58ad;
          }
        }
      }
    }
  }
}
</style>
