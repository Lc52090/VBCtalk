<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="about-container">
      <!-- 背景介绍 -->
      <div class="porjiect is-div">
        <p>背景介绍</p>
        <div class="line"></div>
        <p>Overview</p>
        <div class="content">
          <div class="left">
            <div class="text">国内知名的云计算产品和服务提供商，隶属于齐心集团（股票代码：002301）。公司拥有多项创新核心技术优势，是国内荣获工信部颁发的多方通信服务牌照的云计算服务商，先后获得“德勤高科技高成长中国50强”、“电子政务推荐品牌”、“视频会议软件全能之星”、“中国IT市场最具成长性产品”，并通过国家高新技术企业认证、双软认证、ISO9001认证、CMMI3认证、国家电网安全评测等。
              将自身的音视频技术优势与传统录播相结合，打造出全新一代的互动录播系统，除了满足录播、直播、点播等需求之外，还能在多个教室之间进行师生实时互动，赋予了传统录播更多的变化，同时也变标志着教育录播进入互动时代。</div>
          </div>
          <div class="right">
            <img
              src="../../assets/img/project.jpg"
              alt=""
            >
          </div>
        </div>
      </div>
      <!-- 理事会 -->
      <div class="board is-div">
        <p>理事会</p>
        <div class="line"></div>
        <p>Board of Directors</p>
        <ul>
          <li
            v-for="(item,index) in imgInfo"
            :key="index"
          >
            <img :src="item.headimg">
            <p>{{item.name}}</p>
            <p>{{item.job}}</p>
          </li>
        </ul>
      </div>
      <!-- 联系我们 -->
      <div class="telUs is-div">
        <p>联系我们</p>
        <div class="line"></div>
        <p>Contact Us</p>
        <div class="content">
          <div class="left">
            <p>总部地址</p>
            <p>深圳市南山区深圳湾科技生态园9栋B3座9楼</p>
            <p>邮编：518000</p>
            <p>电子邮件：bfa@boaoum.org</p>
            <p>全国统一服务热线</p>
            <p><a href="tel:400-1199-666">400-1199-666</a></p>
          </div>
          <div class="right">
            <baidu-map
              class="map"
              :center="{lng: 116.404, lat: 39.915}"
              :zoom="15"
              :scroll-wheel-zoom="true"
            >
            </baidu-map>
          </div>
        </div>
      </div>
      <!-- 大事记 -->
      <div class="greatEvent is-div">
        <p>大事记</p>
        <div class="line"></div>
        <p>Chronicle of Events</p>
        <div>
          <ul>
            <li
              v-for="(item,index) in years"
              :key="index"
              :class="[choose===index?'active':'']"
              @click="tabItem(index)"
            >{{item}}</li>
          </ul>
          <div>
            <el-timeline :reverse="false">
              <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
              >
                {{activity.content}}
                <div
                  class="content"
                  v-show="index!==2"
                >
                  <div class="img">
                    <img
                      src="../../assets/img/aboutus.jpg"
                      alt=""
                    >
                  </div>
                  <div class="text">
                    多方通信服务牌照的云计算服务商，先后获得“德勤高科技高成长中国50强”、“电子政务推荐品牌”、“视频会议软件全能之星”、“中国IT市场最具成长性产品”。
                    并通过国家高新技术企业认证、双软认证、ISO9001认证、CMMI3认证、国家电网安全评测等。
                  </div>
                </div>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import { BmlMarkerClusterer } from 'vue-baidu-map'
import Footer from '../footer/footer'
export default {
  data() {
    return {
      imgInfo: [
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        },
        {
          headimg: require('../../assets/img/theadimg.jpg'),
          name: '周大川',
          job: '经理'
        }
      ],
      activities: [
        {
          content: '1月'
        },
        {
          content: '5月'
        },
        {
          content: '未完待续'
        }
      ],
      years: ['2020年', '2019年', '2018年'],
      choose: 0
    }
  },
  components: { BmlMarkerClusterer, Footer },
  methods: {
    tabItem(index) {
      this.choose = index
    }
  }
}
</script>

<style lang='less'>
.about-container {
  width: 1178px;
  margin-left: 46px;
  > .is-div {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 44px;
    > p {
      letter-spacing: 0px;
      text-align: center;
      margin-bottom: 12px;
      &:first-of-type {
        font-size: 25px;
        color: #353535;
      }
      &:last-of-type {
        color: #a3a6a9;
        font-size: 12px;
        margin-top: 9px;
      }
    }
    > .line {
      width: 1135px;
      height: 1px;
      background-color: #c8cdd1;
      position: relative;
      &::before {
        content: '';
        width: 57px;
        height: 3px;
        background-color: #2a58ad;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
      }
    }
  }
  /* 背景介绍 */
  .porjiect {
    > .content {
      display: flex;
      justify-content: space-around;
      background-color: #ffffff;
      border-radius: 10px;
      width: 1178px;
      height: 310px;
      .left {
        .text {
          width: 621px;
          height: 226px;
          font-size: 15px;
          color: #353535;
          line-height: 30px;
          margin-top: 38px;
        }
      }
      .right {
        height: 249px;
        margin-top: 32px;
        img {
          height: 100%;
          display: block;
        }
      }
    }
  }
  /* 理事会 */
  .board {
    > ul {
      display: flex;
      width: 100%;
      justify-content: space-around;
      > li {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 103px;
          height: 103px;
          border-radius: 50%;
        }
        p {
          &:first-of-type {
            margin: 13px 0 9px 0;
            color: #353535;
            font-size: 16px;
          }
          &:last-of-type {
            color: #84878c;
            font-size: 13px;
          }
        }
      }
    }
  }
  /* 联系我们 */
  .telUs {
    > .content {
      width: 1178px;
      height: 293px;
      display: flex;
      background-color: #ffffff;
      border-radius: 10px;
      justify-content: space-between;
      align-items: center;
      > .left {
        display: flex;
        flex-direction: column;
        p {
          color: #353535;
          font-size: 15px;
          padding-left: 40px;
          &:nth-of-type(1) {
            font-size: 25px;
            padding: 0 0 29px 40px;
          }
          &:nth-of-type(3) {
            padding: 13px 0 30px 40px;
          }
          &:nth-of-type(5) {
            font-size: 25px;
            padding: 37px 0 15px 40px;
          }
          &:nth-of-type(6) {
            font-size: 25px;
            > a {
              color: #2a58ad;
            }
          }
        }
      }
      > .right {
        width: 496px;
        height: 241px;
        margin-right: 42px;
        .map {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  /* 大事记 */
  .greatEvent {
    > div {
      width: 1178px;
      height: 650px;
      background-color: #ffffff;
      border-radius: 10px;
      display: flex;
      > ul {
        width: 130px;
        border-right: 1px solid #c8cdd1;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        margin-right: 30px;
        li {
          width: 100%;
          height: 53px;
          color: #84878c;
          font-size: 18px;
          border-bottom: 1px solid #c8cdd1;
          text-align: center;
          line-height: 53px;
          border-top-left-radius: 10px;
          &.active {
            background-color: #2a58ad;
            color: #fefefe;
          }
        }
      }
      .el-timeline {
        font-size: 25px;
        color: #2a58ad;
        height: 570px;
        margin-top: 24px;
        > li {
          color: #84878c;
          font-size: 15px;

          > .el-timeline-item__node {
            background-color: #2a58ad;
          }
          > .el-timeline-item__wrapper {
            .el-timeline-item__content {
              color: #2a58ad;
              font-size: 25px;
              > div {
                display: flex;
                margin-top: 18px;
                .img {
                  width: 366px;
                  height: 216px;
                  margin-right: 30px;
                  img {
                    height: 100%;
                    display: block;
                  }
                }
                .text {
                  color: #353535;
                  font-size: 15px;
                  line-height: 30px;
                  width: 563px;
                }
              }
            }
          }
          &:last-of-type {
            .el-timeline-item__node {
              background-color: #84878c;
            }
            > .el-timeline-item__wrapper {
              .el-timeline-item__content {
                color: #84878c;
                font-size: 15px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
