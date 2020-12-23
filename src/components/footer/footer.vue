<template>
  <div style="height:128px">
    <div class="bckColor">
      <div class="f-container">
        <div class="footer-text">
          <p>"网易公司版权所有 ©1997-2020 浙公网安备 33010802010186号 浙ICP备16011220号-11 增值电信业务经营许可证：浙B2-20160599
            网络文化经营许可证： 浙网文[2019]3904-370号 自营经营者信息 工业和信息化部备案管理系统网站"</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      onoff: true
    }
  }
}
</script>

<style lang='less' scoped>
.bckColor {
  width: 1518px;
  background-color: #c8d0d7;
  position: absolute;
  bottom: 0;
  .f-container {
    width: 967px;
    margin-left: 150px;
    .footer-text {
      padding: 46px 0 44px 0;
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
