<template>
  <div>
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
                  :src="hotMainList.hongren_head_image"
                  alt="loading"
                >
              </div>
              <!-- 文字 -->
              <div class="top-text">
                <div class="text-top">
                  <span>回放</span>
                  <span>{{hotMainList.title}}</span>
                  <span>2020-05-15 15:00-18:00</span>
                </div>
                <div class="text-bottom">
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
                <span>{{hotMainList.view_count}}</span>
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
              :src="hotMainList.video_url"
              frameborder="0"
              height="645px"
              width="1177px"
            ></iframe>
          </div>
          <!-- 点赞和收藏 -->
          <div class="v-shoucang">
            <span @click="handleClickCount">
              <i><img
                  src="../../assets/img/video/点赞.png"
                  alt=""
                ></i>
              <span>{{hotMainList.like_count}}</span>
            </span>
            <span
              @click="handleClickFavorite"
              :class="[onoffFavorate?'el-icon-star-off':'el-icon-star-on']"
            >
              <span>{{hotMainList.favorite_count}}</span>
            </span>
          </div>
        </div>
        <!-- 视频信息介内容 -->
        <div class="v-produce">
          <!--  tab切换 -->
          <ul>
            <li
              v-for="(item,index) in spanText"
              :key="index"
              :class="[index===selected?'active':'']"
              @click="tabText(item,index)"
            >
              <span></span>{{item}}
            </li>
          </ul>
          <!-- 文本内容及图片 -->
          <div class="v-text">
            <!-- 简介 -->
            <div v-if="selected===0">
              <p>{{hotMainList.jianjie}}</p>
              <div class="v-img">
                <img
                  :src="hotMainList.pic1"
                  alt=""
                >
              </div>
            </div>
            <!-- 关于我们 -->
            <div v-if="selected===1">
              {{hotMainList.about_us}}
            </div>
            <!-- 往期回顾 -->
            <div
              v-if="selected===2"
              class="talk-video"
            >
              <ul>
                <li
                  v-for="(item,index) in hotMainList.hongren_live_video_array"
                  :key="index"
                  @click="changeVideo(item,index)"
                >
                  <div
                    class="talk-video-img"
                    :style="{backgroundImage:'url('+item.pic1+')'}"
                  >
                  </div>
                  <div class="talk-video-text">
                    <p>{{item.title}}</p>
                    <p>
                      <span>{{item.category1}}-</span>
                      <span>{{item.category2}}</span>
                    </p>
                    <p>
                      <span>{{item.view_count}}</span>
                      <span>{{item.like_count}}</span>
                    </p>
                    <hr>
                    <div class="talk-video-text-bottom">
                      <div>
                        <img
                          :src="item.head_image"
                          alt=""
                        >
                        <span>{{item.title}}</span>
                      </div>
                      <p>{{item.date_format}}</p>
                    </div>
                  </div>
                </li>
              </ul>
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
import bus from '../../Bus.js'
import Qs from 'qs'

export default {
  data() {
    return {
      hotMainList: [],
      id: null,
      spanText: ['简介', '关于我们', '往期回顾'],
      selected: 0,
      userId: '',
      // 收藏成功后停止收藏
      onoffFavorate: true,
      favorateList: {}
    }
  },
  components: {
    Footer,
    bus
  },
  created() {
    this.gethotMainList()
    this.getfavoriteList()
    console.log(this.id)
  },
  methods: {
    // 获取红人视频详情
    gethotMainList() {
      let params = Qs.stringify({ id: this.$route.query.id })
      this.$http.post('api_get_hongren_video', params).then(response => {
        const res = response.data
        this.hotMainList = res
      })
    },
    // 点解文本切换selected
    tabText(item, index) {
      this.selected = index
    },
    // 赞
    DoPlus() {
      let params = Qs.stringify({
        hongren_live_video_id: this.$route.query.id,
        action: 'add'
      })
      return params
    },
    // 收藏
    DoCollet() {
      this.userId = sessionStorage.getItem('user_id')
      let params = Qs.stringify({
        users_id: this.userId, // 用户id
        live_video_id: this.$route.query.id // 红人视频id
      })
      return params
    },
    // 点赞接口
    async handleClickCount() {
      const { data: res } = await this.$http.post('api_hongren_video_do_zan', this.DoPlus())
      this.hotMainList.like_count++
    },
    // 获取收藏列表
    async getfavoriteList() {
      if (!sessionStorage.getItem('user_id')) {
        return this.$message.error('还没有登录')
      }
      let params = Qs.stringify({
        id: sessionStorage.getItem('user_id')
      })
      const { data: res } = await this.$http.post('api_users_favorite_list', params)
      this.favorateList = res.data
      console.log(this.favorateList)
      for (let i = 0; i < this.favorateList.length; i++) {
        console.log(this.favorateList[i].id.indexOf(this.$route.query.id))
        if (this.favorateList[i].id.indexOf(this.$route.query.id) !== -1) {
          this.onoffFavorate = false
          return
        }
      }
    },
    // 收藏
    async handleClickFavorite() {
      if (!sessionStorage.getItem('user_id')) {
        return this.$message.error('请先登录')
      }
      if (!this.onoffFavorate) {
        return this.$message.warning('已经收藏过本视频')
      }
      const { data: res } = await this.$http.post('api_hongren_live_video_do_favorite', this.DoCollet())
      this.$message.success('收藏成功')
      this.hotMainList.favorite_count++
      this.onoffFavorate = false
    },
    // 点击往期回顾视频切换视频
    async changeVideo(item, index) {
      let params = Qs.stringify({ id: item.id })
      const { data: res } = await this.$http.post('api_get_hongren_video', params)
      this.hotMainList = res
    }
  }
}
</script>

<style lang='less' scoped>
/* 点击视频图片展示直播页部分 */
.v-ptip {
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
        &::before {
          font-size: 32px;
          color: #2a58ad;
        }

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
    > ul {
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

    /* 切换内容及图片 */
    > .v-text {
      margin: 0 0 29px 22px;
      padding-top: 37px;
      padding-bottom: 29px;
      background-color: #ffffff;
      > div {
        margin-left: 50px;
      }
      /* 简介切换 */
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
        margin-top: 29px;
        width: 100%;
        img {
          width: 100%;
          display: block;
        }
      }
      /* 往期回顾切换 */
      .talk-video {
        ul {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          li {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            background-color: #ffffff;
            border-radius: 5px;
            margin-right: 30px;
            border: 1px #cccccc solid;
            margin-top: 10px;
            .talk-video-img {
              width: 290px;
              height: 155px;
              border-radius: 5px;
              background: no-repeat;
              background-size: cover;
              background-position: center;
            }
            .talk-video-text {
              padding-left: 10px;
              padding-right: 14px;
              width: 290px;
              > p {
                &:nth-of-type(1) {
                  margin-top: 8px;
                  color: #2a2a2a;
                  font-size: 19px;
                  letter-spacing: 1px;
                }
                &:nth-of-type(2) {
                  color: #84878c;
                  opacity: 0.9;
                  font-size: 10px;
                  margin-bottom: 12px;
                  margin-top: 3px;
                }
                &:nth-of-type(3) {
                  color: #84878c;
                  opacity: 0.9;
                  font-size: 10px;
                  margin-bottom: 9px;
                  span {
                    margin-right: 16px;
                    margin-left: 20px;
                  }
                }
              }
              > .talk-video-text-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 10px 0;
                > div {
                  display: flex;
                  align-items: center;
                  > img {
                    width: 26px;
                    height: 26px;
                    display: inline-block;
                    border-radius: 50%;
                    margin-right: 5px;
                  }
                }
                > p {
                  color: #84878c;
                  opacity: 0.9;
                  font-size: 11px;
                  letter-spacing: 1px;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
