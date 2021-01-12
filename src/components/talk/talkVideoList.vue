<template>
  <div>
    <ul
      class="talk-video"
      v-if="liveVideo"
    >
      <li
        v-for="(item,index) in liveVideo"
        :key="index"
        @click="TotalkVideo(item,index)"
      >
        <div
          class="talk-video-img"
          :style="{backgroundImage:'url('+item.pic1+')'}"
        >
        </div>
        <div class="talk-video-text">
          <p>{{item.title}}</p>
          <p>
            <span>{{titleText.category1_title}}-</span>
            <span>{{titleText.category2_title}}</span>
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
    <p
      class="h-loading"
      @click="load"
      v-if="this.$store.state.isActive"
    >加载更多</p>
    <p
      class="h-loading"
      v-else
    >没有更多了</p>
  </div>
</template>

<script>
import Qs from 'qs'
import bus from '../../Bus.js'
export default {
  props: ['liveVideo', 'titleText', 'params'],
  data() {
    return {
      videoList: [],
      loading: true,
      id: null
    }
  },
  methods: {
    TotalkVideo(item, index) {
      console.log(item)
      this.$router.push({ path: '/talkVideo', query: { id: item.id } })
    },
    // 点击加载更多
    async load() {
      if (this.liveVideo.length < 12) {
        this.$message.error('没有更多了')
        this.$store.state.isActive = false
        return
      }
      this.params.page++
      const { data: res } = await this.$http.post('api_luntan_live_video_list', Qs.stringify(this.params))
      console.log(res.data)
      this.addliveVideo = res.data
      if (this.addliveVideo.length) {
        this.$emit('changeliveVideo', this.addliveVideo)
        if (this.addliveVideo.length < 8) {
          this.$message.error('已经到底了')
          this.$store.state.isActive = false
        } else {
          this.page++
        }
      } else {
        this.$message.error('已经到底了')
        this.$store.state.isActive = false
      }
    }
  }
}
</script>

<style lang='less' scoped>
/* 视频切换部分 */
.talk-video {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  li {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
    border-radius: 5px;
    margin-bottom: 15px;
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
/* 加载更多按钮*/
.h-loading {
  width: 131px;
  height: 34px;
  border: solid 1px #84878c;
  letter-spacing: 3px;
  color: #84878c;
  line-height: 34px;
  text-align: center;
  cursor: pointer;
  margin: 60px auto;
}
</style>
