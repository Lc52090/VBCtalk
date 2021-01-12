<template>
  <div class="temp">
    <!-- 上部分 -->
    <div class="container">
      <div class="main">
        <el-carousel
          trigger="click"
          height="535px"
          :autoplay="true"
        >
          <el-carousel-item
            v-for="item in mainList"
            :key="item.id"
          ><a
              :href="item.link"
              target="_blank"
            >
              <img
                :src="item.pic"
                alt=""
              >
            </a>
          </el-carousel-item>
        </el-carousel>
        <!-- <div
          class="m-left"
          @click="tabVideo"
        >
          <div class="m-l-produce">
            <div class="m-l-top"></div>
            <p></p>
          </div>
        </div> -->
        <div class="m-right">
          <h1>HR的未来新角色</h1>
          <div class="m-r-container">
            <ul>
              <li>我用一万行备忘录做了个动画</li>
              <li>11款神级软件，让你的电脑
                体验提升8800%</li>
              <li>20层楼垂直过山车全景体验
                第一人称视角</li>
              <li>玩转win键，你也是电脑高手</li>
              <li>11款神级软件，让你的电脑
                体验提升8800%</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="input-wrap">
        <div class="m-input">
          <input
            type="text"
            placeholder="搜索视频"
            @input="searchBox()"
            v-model="query"
          >
          <button @click="searchPost()"></button>
          <!-- 输出框输入内容匹配的标题 -->
          <div
            class="m-text"
            v-if="isActive"
          >
            <div
              v-for="(item,index) in queryinfo"
              :key="index"
              @click="handleChoose(item,index)"
            >{{item.title}}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 鸣谢部分 -->
    <div class="bckColor">
      <div class="f-container">
        <div
          class="icon-hide"
          v-show="onoff"
          ref="iconHide"
        >
          <div class="f-tip">
            <p>合作伙伴</p>
          </div>
          <ul>
            <li><img
                src="../../assets/img/抖音.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/快手.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/腾讯.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/抖音.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/快手.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/腾讯.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/抖音.png"
                alt=""
              ></li>
            <li><img
                src="../../assets/img/快手.png"
                alt=""
              ></li>
          </ul>
        </div>
        <div class="footer-text">
          <p>"网易公司版权所有 ©1997-2020 浙公网安备 33010802010186号 浙ICP备16011220号-11 增值电信业务经营许可证：浙B2-20160599
            网络文化经营许可证： 浙网文[2019]3904-370号 自营经营者信息 工业和信息化部备案管理系统网站"</p>
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
      onoff: true,
      mainList: [],
      // 搜索框value内容
      query: '',
      // 搜索块搜索的匹配内容
      queryinfo: [],
      // 搜索框点击内容的下标
      index: null,
      isActive: false
    }
  },
  created() {
    this.getMainList()
  },
  methods: {
    // 获取轮播图图片
    async getMainList() {
      this.$http.post('api_banner_list').then(response => {
        const res = response.data
        this.mainList = res.data
      })
    },
    // 输入框输入事件
    searchBox() {
      // 防抖
      setTimeout(async () => {
        const { data: res } = await this.$http.post('api_search_video', Qs.stringify({ keyword: this.query }))
        this.queryinfo = res.data
        this.isActive = true
      }, 1000)
    },
    // 输入框选中事件
    handleChoose(item, index) {
      this.index = index
      this.query = item.title
      this.isActive = false
      this.$route.query.id = item.id
    },
    // 搜索关键字
    searchPost() {
      if (!this.queryinfo.length) {
        this.$message.error('没有找到该内容')
        return
      }
      if (this.queryinfo[this.index].video_type === '1') {
        this.$router.push({ path: '/talkVideo', query: { id: this.queryinfo[this.index].id } })
      } else if (this.queryinfo[this.index].video_type === '2') {
        this.$router.push({ path: '/hotVideo', query: { id: this.queryinfo[this.index].id } })
      }
    }
  }
}
</script>

<style lang='less' scoped>
.container {
  width: 100%;
  margin-left: 13px;
  .main {
    display: flex;
    .el-carousel--horizontal {
      width: 933px;
      height: 535px;
      img {
        width: 100%;
        height: 100%;
        display: block;
      }
    }
    .m-right {
      width: 310px;
      height: 534px;
      background-color: #fdfdfd;
      h1 {
        height: 90px;
        font-size: 25px;
        text-align: center;
        line-height: 90px;
        letter-spacing: 1px;
        color: #ffffff;
        background-color: #2a58ad;
        padding: 0;
      }
      .m-r-container {
        > ul {
          width: 220px;
          margin: auto;
          > li {
            letter-spacing: 1px;
            color: #353535;
            height: 87px;
            line-height: 25px;
            font-size: 16px;
            border-bottom: 2px solid #cbd6df;
            display: flex;
            align-items: center;
            &:last-of-type {
              border: none;
            }
          }
        }
      }
    }
  }
  .input-wrap {
    .m-input {
      margin: auto;
      width: 1112px;
      height: 44px;
      background-color: #fdfdfd;
      border-radius: 3px;
      border: solid 2px #2a58ad;
      margin-top: 57px;
      margin-left: 65px;
      position: relative;
      input {
        width: 100%;
        height: 100%;
        padding-left: 15px;
        display: block;
      }
      button {
        outline: none;
        border: none;
        position: absolute;
        background-color: #2a58ad;
        background: url('../../assets/img/search.png') no-repeat;
        background-position: center center;
        width: 82px;
        height: 41px;
        background-color: #2a58ad;
        right: -2px;
        top: -1px;
      }
    }
    .m-text {
      z-index: 99;
      position: absolute;
      top: 44px;
      left: 0;
      background-color: #ffffff;
      margin: auto;
      width: 1112px;
      font-size: 20px;
      color: rgba(0, 0, 0, 0.6);
      display: flex;
      justify-content: space-around;
      flex-direction: column;
      div {
        border-bottom: 2px solid #eee;
        padding-left: 10px;
        &:hover {
          background-color: #eee;
        }
      }
    }
  }
}
.bckColor {
  width: 1518px;
  height: 260px;
  background-color: #c8d0d7;
  position: absolute;
  bottom: 0;
  .f-container {
    width: 967px;
    margin-left: 150px;
    .icon-hide {
      .f-tip {
        text-align: center;
        height: 66px;

        p {
          height: 20px;
          font-size: 20px;
          line-height: 66px;
          letter-spacing: 1px;
          color: #313247;
        }
      }

      ul {
        display: flex;
        justify-content: space-between;
        padding: 0 30px 37px 30px;
        border-bottom: 1px solid #9d9ea0;

        li {
          width: 66px;
          height: 27px;

          img {
            height: 100%;
            display: block;
          }
        }
      }
    }

    .footer-text {
      padding-top: 46px;
      text-align: center;

      p {
        line-height: 25px;
        font-size: 12px;
        letter-spacing: 1px;
        color: #6a6a6a;
      }
    }
  }
}
</style>
