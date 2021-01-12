<template>
  <!-- 红人榜一级分类图片加载部分 -->
  <div class="h-bang">
    <ul>
      <!-- 图片及介绍 -->
      <li
        v-for="(item) in hotList"
        :key="item.id"
        @click="postArgId(item)"
      >
        <div
          class="h-t-img"
          :style="{backgroundImage:'url('+item.xingxiang_image+')'}"
        >
          <!-- 介绍部分 -->
          <div class="h-b-produce">
            <p>
              <span>{{item.title}}</span>
              <span>ID:{{item.id}}</span>
            </p>
            <p>
              {{item.jianjie}}
            </p>
            <div>
              <!--  点赞 -->
              <p @click="handleClickCount(item)">
                <span><img
                    src="../../assets/img/hotlist/god.png"
                    alt=""
                  ></span>
                <span>{{item.like_count}}</span>
              </p>
              <!-- 点踩 -->
              <p @click="handleClickMinus(item)">
                <span><img
                    src="../../assets/img/hotlist/bad.png"
                    alt=""
                  ></span>

                <span>{{item.cai_count}}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- 票数 -->
        <p class="h-t-math">
          <span>当前票数：</span>
          <span>97265</span>
        </p>
        <!-- 投票按钮 -->
        <div class="h-t-btn">
          投TA一票
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
import bus from '../../Bus'
export default {
  props: {
    hotList: {
      type: Array,
      default() {
        return []
      }
    },
    loadList: {
      type: Object
    }
  },
  data() {
    return {
      id: null,
      addhotList: [],
      page: 2
    }
  },
  methods: {
    // 获取红人分类菜单接口
    HotListParams(page) {
      let data = Qs.stringify({
        category1_id: this.loadList.categoryOnecId,
        category2_id: this.loadList.categoryTwiceId,
        limit: this.loadList.pageSize,
        page: page
      })
      return data
    },
    // 点击加载更多
    async load() {
      this.addhotList = []
      const { data: res } = await this.$http.post('api_hongren_list', this.HotListParams(this.page))
      this.addhotList = res.data
      if (this.addhotList.length) {
        this.$emit('changeHotList', this.addhotList)
        if (this.addhotList.length < 8) {
          this.$message.error('已经到底了')
          this.$store.state.isActive = false
        } else {
          this.page++
        }
      } else {
        this.$message.error('已经到底了')
        this.$store.state.isActive = false
      }
    },
    // 点击跳转并传递参数
    postArgId(item) {
      this.$router.push({ path: '/hottwoList', query: { id: item.id } })
      this.$store.state.rank = item.rank
      sessionStorage.setItem('rank', item.rank)
    }
  }
}
</script>

<style lang='less' scoped>
/* 红人榜一级分类图片加载部分 */
.h-bang {
  margin-left: 46px;

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 1177px;
    justify-content: space-between;

    li {
      width: 240px;
      height: 500px;
      margin-bottom: 65px;

      /* 图片部分 */
      .h-t-img {
        position: relative;
        width: 100%;
        height: 412px;
        border: 2px solid #fcd671;
        border-radius: 10px;
        background: no-repeat;
        background-size: 240px 275px;

        /*  介绍部分 */
        .h-b-produce {
          position: absolute;
          top: 285px;
          left: 16px;

          > p {
            &:nth-of-type(1) {
              margin-bottom: 12px;

              span {
                &:nth-of-type(1) {
                  color: #2a58ad;
                  font-size: 20px;
                  margin-right: 14px;
                }

                &:nth-of-type(2) {
                  color: #84878c;
                  font-size: 15px;
                  overflow: hidden;
                }
              }
            }

            &:nth-of-type(2) {
              height: 54px;
              width: 195px;
              line-height: 18px;
              color: #2a2a2a;
              font-size: 12px;
              display: -webkit-box;
              overflow: hidden;
              text-overflow: ellipsis;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }

          /*  good和bad */
          > div {
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

      /* 票数 */
      .h-t-math {
        color: #de4343;
        font-size: 14px;
        margin: 15px 0 8px 0;
        text-align: center;
      }

      /* 投票按钮 */
      .h-t-btn {
        width: 238px;
        height: 46px;
        background-color: #de4343;
        border-radius: 5px;
        line-height: 46px;
        text-align: center;
        color: #ffffff;
        font-size: 20px;
        cursor: pointer;
        position: relative;

        &::before {
          content: '';
          display: inline-block;
          width: 27px;
          height: 27px;
          background: url('../../assets/img/hotlist/toupiao.png') no-repeat;
          background-size: cover;
          position: absolute;
          top: 50%;
          left: 40px;
          transform: translateY(-50%);
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
    margin: auto;
  }
}
</style>
