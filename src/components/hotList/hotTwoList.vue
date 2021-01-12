<template>
  <!-- 红人榜二级分类图片 -->
  <div class="h-two-content">
    <div class="two-content">
      <!-- 左侧img -->
      <div class="two-l-img">
        <img
          :src="personList.xingxiang_image"
          alt=""
        >
      </div>
      <!-- 中间描述内容 -->
      <div class="two-m-text">
        <div class="two-t-main">
          <!-- 名次包裹层 -->
          <div class="t-t-m-left">
            <img
              src="../../assets/img/hotlist/形状1.png"
              alt=""
            >
            <span>{{personList.title}}</span>
            <span>ID:{{personList.id}}</span>
          </div>
        </div>
        <div class="two-m-main">
          <p>{{personList.jianjie}}</p>
        </div>
        <div class="two-b-main">
          <div class="t-b-m-img">
            <img
              :src="personList.head_image"
              alt=""
            >
            <img
              :src="personList.head_image"
              alt=""
            >
            <img
              :src="personList.head_image"
              alt=""
            >
          </div>
          <div class="t-b-m-span">
            <span>粉丝：</span><span>186395</span>
          </div>
        </div>
      </div>
      <!-- 右边操作 -->
      <div class="two-r-toupiao">
        <div class="t-r-content">
          <!-- 柱形图 -->
          <div class="t-r-c-top">
            <!-- 点赞 -->
            <div
              class="circle"
              @click="handleClickCount()"
            >
              <div class="top-round"></div>
              <el-progress :percentage="75"></el-progress>
              <span>{{personList.like_count}}</span>
            </div>
            <!--  点踩 -->
            <div
              class="circle"
              @click="handleClickMinus()"
            >
              <div class="top-round"></div>
              <el-progress :percentage="50"></el-progress>
              <span>{{personList.cai_count}}</span>
            </div>
          </div>

          <p>当前票数：<span>97265</span></p>
          <!-- 投票分享按钮 -->
          <div class="t-r-c-btns">
            <img
              src="../../assets/img/hotlist/toupiao.png"
              alt=""
            >
            投TA一票
          </div>
          <div class="t-r-c-btns">
            <img
              src="../../assets/img/hotlist/share.png"
              alt=""
            >
            为TA拉票
          </div>
        </div>
      </div>
    </div>
    <!-- 底部切换栏 -->
    <div class="t-tab">
      <!-- 文字切换部分 -->
      <ul class="tab-text">
        <li
          v-for="(item,index) in spanText"
          :key="index"
          :class="[index===choosed?'active':'']"
          @click="tabChoosed(index)"
        >
          <span></span>{{item}}
        </li>
      </ul>
      <!-- 视频切换部分 -->
      <ul class="tab-video">
        <li
          v-for="(item,index) in hongren_live[choosed]"
          :key="index"
          @click="toVideo(item)"
        >
          <div
            class="tab-video-img"
            :style="{backgroundImage:'url('+item.pic1+')'}"
          >
          </div>
          <div class="tab-video-text">
            <p>{{item.title}}</p>
            <p>
              <span>{{personList.hongren_category1_title}}-</span>
              <span>{{personList.hongren_category2_title}}</span>
            </p>
            <div class="zanorcai">
              <!--  点赞 -->
              <p>
                <span><img
                    src="../../assets/img/hotlist/god.png"
                    alt=""
                  ></span>
                <span>{{item.view_count}}</span>
              </p>
              <!-- 点踩 -->
              <p>
                <span><img
                    src="../../assets/img/hotlist/bad.png"
                    alt=""
                  ></span>

                <span>{{item.like_count}}</span>
              </p>
            </div>
            <hr>
            <p>{{item.date_format}}</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Qs from 'qs'
import bus from '../../Bus'
export default {
  data() {
    return {
      id: 1,
      // 红人详情
      personList: [],
      spanText: ['代表作', '即将直播', '往期直播'],
      choosed: 0,
      // 根据spanText切换时的index显示图片数据,
      hongren_live: [],
      rank: null
    }
  },
  mounted() {
    this.id = this.$route.query.id
    this.getHotPreson()
  },
  methods: {
    // 获取红人详情接
    async getHotPreson() {
      let params = Qs.stringify({
        id: this.id
      })
      const { data: res } = await this.$http.post('api_get_hongren', params)
      this.personList = res
      // 根据spanText切换时的index分别显示图片数据[代表作，即将直播，往期直播]的内容
      this.hongren_live.push(this.personList.hongren_live_video1)
      this.hongren_live.push(this.personList.hongren_live_video2)
      this.hongren_live.push(this.personList.hongren_live_video3)
    },
    // 获取赞和踩的百分比
    format(percentage) {
      return percentage === 100 ? '满' : `${percentage}%`
    },
    // tab切换文本
    tabChoosed(index) {
      this.choosed = index
    },
    // 赞
    DoPlus() {
      let params = Qs.stringify({
        hongren_id: this.id,
        type: 'zan',
        action: 'add'
      })
      return params
    },
    // 踩
    DoMinus() {
      let params = Qs.stringify({
        hongren_id: this.id,
        type: 'cai',
        action: 'add'
      })
      return params
    },
    // 点赞接口
    async handleClickCount() {
      const { data: res } = await this.$http.post('api_hongren_do_zan_or_cai', this.DoPlus())
      this.personList.like_count++
    },
    // 点踩接口
    async handleClickMinus() {
      const { data: res } = await this.$http.post('api_hongren_do_zan_or_cai', this.DoMinus())
      this.personList.cai_count++
    },
    // 点击跳转到红人视频页
    toVideo(item) {
      this.$router.push({ path: '/hotVideo', query: { id: item.id } })
    }
  }
}
</script>

<style lang='less' scoped>
/* 红人榜二级分类图片 */
.h-two-content {
  /* 排名介绍项 */
  .two-content {
    display: flex;
    width: 1175px;
    height: 414px;
    margin-left: 46px;
    background-color: #ffffff;
    justify-content: space-between;

    /* 左侧img */
    .two-l-img {
      height: 414px;
      width: 308px;

      img {
        height: 100%;
        width: 100%;
        display: block;
      }
    }

    /* 中间描述内容 */
    .two-m-text {
      width: 456px;

      .two-t-main {
        margin-top: 46px;
        display: flex;
        align-items: flex-end;
        flex-direction: row;

        /* 名次包裹层 */
        .t-t-m-left {
          display: flex;
          align-items: flex-end;

          img {
            width: 56px;
            height: 47px;
          }

          > span {
            &:nth-of-type(1) {
              color: #2a58ad;
              font-size: 25px;
              margin: 0 16px 0 14px;
            }

            &:nth-of-type(2) {
              color: #84878c;
              font-size: 15px;
            }
          }
        }
      }

      .two-m-main {
        width: 456px;
        height: 99px;
        font-size: 15px;
        color: #2a2a2a;
        margin-top: 35px;
        line-height: 21px;
      }

      //粉丝
      .two-b-main {
        display: flex;
        align-items: center;
        margin-top: 137px;
        .t-b-m-img {
          margin-right: 10px;
          img {
            width: 31px;
            height: 31px;
            border-radius: 50%;
            display: inline-block;
          }
        }
        .t-b-m-span span {
          display: inline-block;
          color: #84878c;
          font-size: 15px;
        }
      }
    }

    /* 右边操作 */
    .two-r-toupiao {
      width: 240px;
      margin-right: 23px;
      /* 柱形图 */
      .t-r-content {
        margin-top: 89px;

        /* 柱形图 */
        .t-r-c-top {
          > .circle {
            display: flex;
            align-items: center;
            .top-round {
              width: 37px;
              height: 37px;
              border-radius: 50%;
              cursor: pointer;
              background: url('../../assets/img/hotlist/投票.png') no-repeat;
              background-color: #de4343;
              background-position: center center;
            }
            .el-progress-bar__inner {
              &:nth-of-type(1) {
                background-color: #de4343 !important;
              }
            }
            .el-progress {
              width: 146px;
            }

            > span {
              color: #84878c;
              font-size: 15px;
            }

            &:nth-of-type(2) {
              margin-top: 16px;

              .top-round {
                background: url('../../assets/img/hotlist/分享.png') no-repeat;
                background-color: #2a58ad;
                background-position: center center;
              }

              .top-line {
                border: solid 1px #2a58ad;
              }
            }
          }
        }

        > p {
          margin-top: 90px;
          margin-bottom: 9px;
          color: #de4343;
          font-size: 14px;
          text-align: center;
        }

        /* 投票分享按钮 */
        .t-r-c-btns {
          width: 238px;
          height: 46px;
          background-color: #de4343;
          border-radius: 5px;
          letter-spacing: 4px;
          color: #ffffff;
          line-height: 43px;
          font-size: 20px;
          text-align: center;
          margin-top: 9px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;

          img {
            width: 27px;
            height: 27px;
          }

          &:nth-of-type(3) {
            background-color: #2a58ad;
          }
        }
      }
    }
  }

  /* 切换选项 */
  .t-tab {
    width: 1211px;
    margin: 47px 0 0 44px;

    /*  文字切换部分 */
    > .tab-text {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 38px;

      > li {
        letter-spacing: 1px;
        color: #84878c;
        font-size: 20px;
        margin: 0 65px;
        cursor: pointer;

        &.active {
          color: #2a2a2a;
          position: relative;
          font-size: 30px;

          > span {
            position: absolute;
            bottom: -12px;
            left: 50%;
            transform: translateX(-50%);
            width: 34px;
            height: 4px;
            background-color: #2a58ad;
          }
        }
      }
    }
    /* 视频切换部分 */
    .tab-video {
      display: flex;
      justify-content: space-between;
      li {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        background-color: #ffffff;
        border-radius: 5px;
        .tab-video-img {
          width: 290px;
          height: 155px;
          border-radius: 5px;
          background: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .tab-video-text {
          padding-left: 10px;
          padding-right: 14px;
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
              font-size: 11px;
              padding-bottom: 15px;
            }
          }
          /*  good和bad */
          > .zanorcai {
            display: flex;
            align-items: center;

            > p {
              cursor: pointer;

              &:nth-of-type(1) {
                padding: 8px 21px;
                padding-left: 0;
                display: flex;
                align-items: center;
              }

              &:nth-of-type(2) {
                display: flex;
                align-items: center;
              }

              span {
                &:nth-of-type(1) {
                  img {
                    width: 17px;
                    height: 15px;
                  }
                }

                &:nth-of-type(2) {
                  margin-left: 4px;
                  color: #84878c;
                  font-size: 12px;
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
