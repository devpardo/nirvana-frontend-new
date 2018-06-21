<template lang="html">
  <div class="games">
    <p class="g-title">支持充值方式<span class="go-withdraw hand" @click="goWithdraw()">快捷提款通道</span></p>
    <div class="block-flex container-flex home-flex">
      <p class="item-flex" @click="goPay()">
        <span><img src="~assets/images/home-wepay-white.png" width="100%" height="100%"/></span>
      </p>
      <p class="item-flex" @click="goPay()">
        <span><img src="~assets/images/home-alipay-white.png" width="100%" height="100%"/></span>
      </p>
      <p class="item-flex" @click="goPay()">
        <span><img src="~assets/images/home-onlinepay-white.png" width="100%" height="100%"/></span>
      </p>
      <p class="item-flex" @click="goPay()">
        <span><img src="~assets/images/home-offlinepay-white.png" width="100%" height="100%"/></span>
      </p>
    </div>
    <div class="game-record">
      <p><span class="clock-color fa">{{ clock }}</span><span class="g-info">平均充值时间</span>< <i>2</i>分钟</p>
      <p><span class="clock-1-color fa">{{ clock }}</span><span class="g-info">平均提款时间</span>< <i>5</i>分钟</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clock: this.$fontawesome("clock-o")
    }
  },
  methods: {
    goPay () {
      this.$router.push("/setting/deposit")
    },
    goWithdraw () {
      this.$router.push("/setting/withdraw")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.games {
  background-color: $color-blue8;
  margin: 0 .3rem;
  margin-bottom: .3rem;
  padding: .5rem .3rem;
  .g-title {
    font-size: $font-h3;
    color: $color-white;
    font-weight: bold;
    margin: 0px;
  }
  .go-withdraw {
    padding: .2rem .8rem;
    background-color: $color-yellow13;
    float: right;
    font-size: .3rem;
    color: $color-blue9;
    border-radius: 1rem;
  }
}
.home-flex {
  margin: .3rem 0;
}
.block-flex {
  p {
    width: 25%;
    height: 2rem;
    margin: 0px;
    padding: 4px;
    display: inline-block;
    color: $color-white;
    font-weight: bold;
    line-height: 2rem;
    span {
      img {
        border-radius: .1rem;
      }
    }
  }
}
.game-record {
  color: $color-white;
  .clock-color {
    color: #0b7db1;
  }
  .clock-1-color,  .chart-color{
    color: #e78419;
  }
  .clock-color .clock-1-color,  .chart-color {
    display: inline-block;
  }
  p {
    display: inline-block;
    margin: 0px;
    padding-right: .5rem;
  }
  .g-info {
    display: inline-block;
    padding: 0px 5px;
  }
  i {
    color: $color-yellow13;
    font-size: $font-h2;
    font-weight: bold;
  }
  .g-small {
    color: $color-red;
  }
}
</style>
