<template lang="html">
  <div class="all">
    <div class="promotions">
      <!--<span class="img"><img src="~assets/images/demo/banner-demo1.png" width="100%" height="100%"></span>-->
      <p class="title">亚太与您 一生粽情</p>
      <p class="info">为了回馈广大亚太用户，值端午佳节之际，我为了回馈广大亚太用户，值端午佳节之际，我</p>
      <span class="valid yellow">长期优惠</span>
      <div class="announcement">
        <p><span class="field">活动时间:</span><span class="p-right">5月30日</span><span class="p-right">05:00</span><span class="p-right">-</span><span class="p-right">12:00</span></p>
        <p><span class="field">活动场馆:</span><span>PT/MG/PNG/AG/DG</span></p>
        <p><span class="field dl">活动内容:</span><span class="dl state">我们将会按照玩家活动日内在PT经典老虎机和电动吃角子老虎机游戏所产生的负盈利值来进行返赠,满足红利的相关流水倍数后即可提款</span></p>
      </div>
      <div class="rule">
        <span class="field dl">活动规则:</span>
        <div class="dl rules">
          <ul>
            <li><span class="circle">1</span>此活动不与老虎机首存共享，若领取首存优惠进行投注则不符合参加此活动条件。</li>
            <li><span class="circle">2</span>此活动不与老虎机首存共享，若领取首存优惠进行投注则不符合参加此活动条件。</li>
          </ul>
          <p class="clause">
            <span class="fa">{{ chain }}</span>
            <a class="link">协议与条款</a>
          </p>
        </div>
      </div>
      <p class="button">进入游戏中心</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chain: this.$fontawesome("chain")
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.all {
  padding: 10px;
  border: $px solid $color-grey;
  border-radius: 5px;
  padding-bottom: 50px;
}
p {
  padding: 0px;
  margin: 0px;
}
ul, li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
li {
  padding-bottom: 5px;
}
.announcement {
  border-top: $px solid $color-grey;
  border-bottom: $px solid $color-grey;
  margin-top: 10px;
  padding: 10px;
  padding-bottom: 30px;
  .state {
    color: $color-grey2;
    width: 78%;
    vertical-align: top;
  }
}
.field {
  font-size: $font-h4;
  padding-right: 10px;
}
.p-right {
  padding-right: 5px;
}
.dl {
  display: inline-block;
}
.promotions {
  background-color: $color-white;
  position: relative;
  padding-bottom: 10px;
  border-radius: 5px;
  position: relative;
  margin-bottom: 10px;
  .valid {
    position: absolute;
    z-index: 20;
    display: inline-block;
    top: 10px;
    right: 10px;
    padding: 0px 15px;
    @include line-height(20px);
    text-align: center;
    color: $color-white;
    border-radius: 2px;
  }
  .yellow { background-color: $color-yellow1; }
  .red { background-color: $color-red5; }
  .blue { background-color: $color-blue1; }
  .img {
    width: 100%;
    height: 100px;
  }
  .title {
    font-size: $font-h2;
    padding: 10px;
  }
  .info {
    padding: 0px 10px;
    font-size: $font-h5;
    color: $color-grey2;
  }
}
.clause {
  padding-top: 5px;
  color: $color-blue1;
  .link {
    color: $color-blue1;
    text-decoration: underline;
    text-decoration-color: $color-blue1;
  }
}
.rule {
  padding: 10px;
  border: $px solid $color-grey;
  .rules {
    width: 76%;
    vertical-align: top;
    color: $color-grey2;
    .circle {
      display: inline-block;
      width: 13px;
      height: 13px;
      line-height: 12px;
      text-align: center;
      border: $px solid $color-grey2;
      border-radius: 50%;
      margin-right: 5px;
      overflow: hidden;
    }
  }
}
.button {
  width: 96%;
  margin: 20px auto;
  @include line-height(40px);
  background-color: $color-red;
  color: $color-white;
  text-align: center;
  border-radius: 5px;
}
</style>
