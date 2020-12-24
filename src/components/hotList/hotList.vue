<template>
  <div>
    <!-- 页头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: 'hotoneList' }">红人榜</el-breadcrumb-item>
      <el-breadcrumb-item v-if="this.$route.fullPath === '/hottwoList'">红人详情</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 红人榜 -->
    <div class="h-list">
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
      <div class="h-title">
        <span>品牌 - {{twiceTitle}} 榜&nbsp;&nbsp;&nbsp;</span><span v-if="$route.fullPath !== '/hotoneList'">第{{rank}}名</span>
      </div>
      <router-view
        :hotList="hotList"
        :loadList="loadList"
        @itemClick="getItem"
      ></router-view>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import HotOneList from './hotOneList.vue'
import hotTwoList from './hotTwoList'
import hotVideo from './hotVideo'
import Footer from '../footer/footer'
import Qs from 'qs'
export default {
  data() {
    return {
      // 红人榜类别
      categoryList: [],
      selected: 0,
      choosed: 0,
      children: [],
      // 红人列表
      hotList: [],
      // 红人一级二级列表id
      loadList: {
        categoryOnecId: 4,
        categoryTwiceId: 14,
        pageSize: 8
      },
      // 一级子元素传入的参数item
      item: null,
      // 二级榜单title
      twiceTitle: null,
      rank: null
    }
  },
  created() {
    this.getCategoryList()
    this.getHotList()
  },
  methods: {
    // 获取红人分类菜单接口
    HotListParams(pagesize) {
      let data = Qs.stringify({
        category1_id: this.loadList.categoryOnecId,
        category2_id: this.loadList.categoryTwiceId
      })
      return data
    },
    // 获取红人列表接口，初始化红人列表
    async getHotList() {
      const { data: res } = await this.$http.post('api_hongren_list', this.HotListParams())
      this.hotList = res.data
    },
    // 获取红人榜类别接口
    async getCategoryList() {
      const { data: res } = await this.$http.post('api_hongren_category_list')
      this.categoryList = res.data
      // 初始化li内容
      this.children = this.categoryList[this.selected]
      this.twiceTitle = this.children.child[0].title
    },
    // 一级分类
    chooseOnce(item, index) {
      this.selected = index
      this.children = this.categoryList[this.selected]
      // 二级分类长度的active
      this.choosed = 0
      this.loadList.categoryOnecId = item.id
    },
    // 二级分类,点击二级菜单获取红人分类菜单列表
    async chooseTwice(item, index) {
      this.loadList.categoryTwiceId = item.id
      this.choosed = index
      const { data: res } = await this.$http.post('api_hongren_list', this.HotListParams(this.loadList.categoryOnecId, this.loadList.categoryTwiceId))
      this.hotList = res.data
      if (this.$route.fullPath !== '/hotoneList') {
        this.$router.push('/hotoneList')
      }
      this.twiceTitle = item.title
    },
    // 获取item
    getItem(data) {
      this.rank = data
    }
  },
  components: {
    HotOneList,
    hotTwoList,
    hotVideo,
    Footer
  }
}
</script>

<style lang='less' scoped>
.h-list {
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

    /*  二级分类 */
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

  .h-title {
    color: #2a2a2a;
    font-size: 16px;
    height: 16px;
    margin: 29px 0 39px 45px;
  }
}
</style>
