<template lang="html">
  <div class="privilege">
    <p><span class="title">我的特权</span></p>
    <div class="blocks" v-if="level">
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-3.png"/></p>
        <div class="txt">
          <p class="h3">高额返水</p>
          <p class="h4">没有最多只有更多</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-5.png"/></p>
        <div class="txt">
          <p class="h3">VIP 礼券</p>
          <p class="h4">好货总是在少数人手里</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-10.png"/></p>
        <div class="txt">
          <p class="h3">生日礼金</p>
          <p class="h4">您的生日我们从不缺席</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 1 && parseFloat(level) < 2">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-1.png"/></p>
        <div class="txt">
          <p class="h3">白银转盘</p>
          <p class="h4">VIP 专属豪华转盘抽奖</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2  && parseFloat(level) < 3">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-4.png"/></p>
        <div class="txt">
          <p class="h3">黄金转盘</p>
          <p class="h4">尊贵 VIP 奢华转盘抽奖</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 3">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-9.png"/></p>
        <div class="txt">
          <p class="h3">钻石转盘</p>
          <p class="h4">至尊 VIP 巅峰转盘抽奖</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 5">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-2.png"/></p>
        <div class="txt">
          <p class="h3">欧洲双人游</p>
          <p class="h4">整理好心情随时出发</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-7.png"/></p>
        <div class="txt">
          <p class="h3">节日礼品</p>
          <p class="h4">线上线下共贺佳节</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 3">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-8.png"/></p>
        <div class="txt">
          <p class="h3">手机流量代充</p>
          <p class="h4">随时随地畅玩不断档</p>
        </div>
      </div>
      <div class="item" v-if="parseFloat(level) >= 2">
        <p class="img"><img width="100%" height="100%" src="~assets/images/level-6.png"/></p>
        <div class="txt">
          <p class="h3">24小时专属客服</p>
          <p class="h4">贴心的为您解决每一件事</p>
        </div>
      </div>
    </div>
    <p v-else class="no-data">您暂时未有任何特权</p>
  </div>
</template>

<script>
export default {
  props: ["level"]
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  padding: 0px;
  margin: 0px;
}
.privilege {
  background-color: $color-blue8;
  padding: 10px;
  padding-bottom: 20px;
  .no-data {
    color: rgba($color-white, .5) !important;
  }
  .title {
    font-size: $font-h4;
    color: $color-white;
    &:before {
      content: '';
      display: inline-block;
      width: 3px;
      height: 12px;
      background-color: $color-yellow13;
      margin-right: .3rem;
      position: relative;
      top: 1px;
    }
  }
}
.blocks {
  margin-top: 5px;
  .item {
    width: 31%;
    padding: 10px 0px;
    text-align: center;
    border: $px solid $color-grey;
    display: inline-block;
    margin-top: 10px;
    margin-left: 5px;
    vertical-align: top;
  }
  .img {
    width: 42px;
    height: 42px;
    display: block;
    margin: 10px auto;
  }
  .txt {
    padding: 0px 2px;
  }
  .h3 {
    font-size: $font-h5-1;
  }
  .h4 {
    color: $color-grey2;
    padding-bottom: 5px;
  }
}
</style>
