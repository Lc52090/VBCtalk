<template>
  <div>
    <!-- 页头 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{mainList.title}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 点击视频图片展示直播页部分 -->
    <div class="v-ptip">
      <div class="v-container">
        <!-- 视频信息栏 -->
        <div class="v-main">
          <!--  头部基本信息 -->
          <div class="v-topnews">
            <div class="topnews-left">
              <!-- 头像 -->
              <div class="top-img">
                <img
                  :src="mainList.pic"
                  alt="loading"
                >
              </div>
              <!-- 文字 -->
              <div class="top-text">
                <div class="text-top">
                  <span>回放</span>
                  <span>{{mainList.title}}</span>
                  <span>2020-05-15 15:00-18:00</span>
                </div>
                <div class="text-bottom">
                  <span>主办方:唐秋勇学院</span>
                  <div class="border">
                    <span>+关注</span>
                    <span>153256</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="topnews-right">
              <span>
                <i><img
                    src="../../assets/img/video/人气.png"
                    alt=""
                  ></i>
                <span>837146</span>
              </span>
              <span>
                <i><img
                    src="../../assets/img/video/分享.png"
                    alt=""
                  ></i>
                <span>分享</span>
              </span>
              <span>
                <i><img
                    src="../../assets/img/video/举报.png"
                    alt=""
                  ></i>
                <span>举报</span>
              </span>
            </div>
          </div>
          <div class="v-video">
            <iframe
              :src="mainList.link"
              frameborder="0"
              height="645px"
              width="1177px"
            ></iframe>
          </div>
          <!-- 点赞和收藏 -->
          <div class="v-shoucang">
            <span>
              <i><img
                  src="../../assets/img/video/点赞.png"
                  alt=""
                ></i>
              <span>56524</span>
            </span>
            <span>
              <i><img
                  src="../../assets/img/video/收藏.png"
                  alt=""
                ></i>
              <span>9999</span>
            </span>
          </div>
        </div>
        <!-- 视频信息介内容 -->
        <div class="v-produce">
          <!--  tab切换 -->
          <ul>
            <li class="active">简介<span></span></li>
            <li>关于我们<span></span></li>
            <li>往期回顾<span></span></li>
          </ul>
          <!-- 文本内容及图片 -->
          <div class="v-text">
            <p>随着全国人民和医务工作者的共同努力，国内的疫情得到了有效的控制。</p>
            <p>但企业之前计划内的众多线下发布会（业绩发布会、新品发布会等等…），依然会在未来很长一段时间无法像疫情前一样正常的举办。于是，很多企业开始考虑用直播的形式，代替以往传统的线下发布会。
            </p>
            <p>本次直播课，我们将通过专业的角度及丰富的经验和大家分享，企业应该如何举办一场纯线上的发布会直播，事先需要做什么准备，效果可以做成什么样，又有哪些玩儿法和注意事项，等等…并通过近期一些非常具有代表性的案例逐一为您剖析！
            </p>

            <p>敬请期待！</p>
            <div class="v-img">
              <img
                src="../../assets/img/video/图层5.png"
                alt=""
              >
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
import Bus from '../../Bus.js'

export default {
  data() {
    return {
      mainList: []
    }
  },
  components: {
    Footer,
    Bus
  },
  created() {
    this.getMainList()
  },
  methods: {
    getMainList() {
      this.$http.post('api_banner_list').then(response => {
        const res = response.data
        console.log(res.data)
        this.mainList = res.data[0]
      })
    }
  }
}
</script>

<style lang='less' scoped>
/* 点击视频图片展示直播页部分 */
.v-ptip {
  height: 2340px;

  /* 视频信息栏 */
  .v-main {
    width: 1225px;
    height: 809px;
    background-color: #ffffff;
    border-radius: 10px;
    margin-left: 22px;
    margin-top: 20px;

    /* 头部基本信息 */
    .v-topnews {
      margin-left: 29px;
      padding-top: 27px;
      display: flex;
      justify-content: space-between;

      /* 左侧信息 */
      .topnews-left {
        display: flex;

        /* 头像 */
        .top-img {
          width: 62px;
          height: 62px;
          margin-right: 10px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        /* 文字 */
        .top-text {
          .text-top {
            display: flex;
            align-items: center;
            margin-bottom: 10px;

            span {
              display: inline-block;
              margin-right: 11px;

              &:nth-of-type(1) {
                text-align: center;
                font-size: 15px;
                color: #ffffff;
                letter-spacing: 1px;
                width: 61px;
                height: 24px;
                line-height: 24px;
                background-color: #22a6e4;
                border-radius: 3px;
              }

              &:nth-of-type(2) {
                height: 32px;
                font-size: 33px;
                line-height: 33px;
                letter-spacing: 2px;
                color: #2a2a2a;
              }

              &:nth-of-type(3) {
                color: #84878c;
                letter-spacing: 1px;
                font-size: 15px;
                align-self: flex-end;
              }
            }
          }

          .text-bottom {
            display: flex;
            align-items: center;

            > span {
              display: inline-block;
              letter-spacing: 1px;
              color: #84878c;
              font-size: 15px;
              margin-right: 10px;
            }

            .border {
              display: flex;
              cursor: pointer;

              span {
                display: inline-block;
                font-size: 12px;
                height: 22px;
                line-height: 19px;
                letter-spacing: 1px;
                text-align: center;
                border: solid 2px #de4343;

                &:nth-of-type(1) {
                  background-color: #de4343;
                  width: 52px;
                  color: #ffffff;
                  border-right: none;
                  border-top-left-radius: 3px;
                  border-bottom-left-radius: 3px;
                }

                &:nth-of-type(2) {
                  color: #84878c;
                  border-left: none;
                  border-top-right-radius: 3px;
                  border-bottom-right-radius: 3px;
                }
              }
            }
          }
        }
      }

      /* 右侧信息 */
      .topnews-right {
        align-self: flex-end;
        letter-spacing: 1px;
        color: #84878c;
        margin-right: 27px;
        cursor: pointer;
        display: flex;

        > span {
          margin-left: 14px;
          display: flex;
          align-items: center;

          img {
            width: 21px;
            height: 18px;
            display: inline-block;
            margin-right: 7px;
          }
        }
      }
    }

    /*视频基本信息*/
    .v-video {
      margin-top: 7px;
      margin-left: 24px;
      width: 1177px;
      height: 645px;
      background-color: #2a58ad;
      border-radius: 3px;

      img {
        width: 100%;
      }
    }

    /* 点赞和收藏 */
    .v-shoucang {
      display: flex;
      align-items: center;
      margin: 16px 0 0 35px;

      > span {
        cursor: pointer;
        margin-right: 31px;
        display: flex;
        align-items: center;

        img {
          width: 27px;
          height: 27px;
          display: inline-block;
        }

        > span {
          letter-spacing: 1px;
          color: #84878c;
          opacity: 0.9;
          margin-left: 8px;
        }
      }
    }
  }

  /* 视频信息介内容 */
  .v-produce {
    width: 1225px;

    /* tab切换 */
    ul {
      width: 400px;
      display: flex;
      justify-content: space-around;
      margin: auto;
      cursor: pointer;

      li {
        letter-spacing: 1px;
        color: #84878c;
        font-size: 20px;
        line-height: 64px;

        &.active {
          color: #2a2a2a;
          letter-spacing: 2px;
          font-size: 30px;
          position: relative;

          > span {
            display: inline-block;
            position: absolute;
            bottom: 4px;
            left: 50%;
            transform: translateX(-50%);
            height: 4px;
            width: 34px;
            background-color: #2a58ad;
          }
        }
      }
    }

    /* 文本内容及图片 */
    > .v-text {
      width: 1225px;
      height: 1420px;
      margin: 0 0 29px 22px;
      padding-top: 37px;
      padding-bottom: 29px;
      background-color: #ffffff;
      > p {
        margin-left: 52px;
        letter-spacing: 1px;
        color: #484a4e;
        line-height: 23px;
        font-size: 14px;
        padding-right: 20px;

        &:last-of-type {
          margin-top: 25px;
        }
      }

      .v-img {
        margin-left: 52px;
      }
    }
  }
}
</style>
