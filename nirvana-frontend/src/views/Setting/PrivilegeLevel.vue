<template lang="html">
  <div class="body privilege-level">
    <p class="title layout"><span>会员等级</span><span>晋级条件</span><span>会员特权</span></p>
    <div>
      <p class="layout">
        <span class="yellow">Lv.1</span><span>月总流水≥500000</span>
        <span class="dl">
          <ul>
            <li>白银转盘</li>
            <li>更高返水</li>
            <li>VIP礼券</li>
            <li>优先提款</li>
            <li>生日礼金</li>
          </ul>
        </span>
      </p>
      <p class="layout">
        <span class="yellow">Lv.2</span><span>月总流水≥2000000</span>
        <span class="dl">
          <ul>
            <li>黄金转盘</li>
            <li>更高返水</li>
            <li>VIP礼券</li>
            <li>优先提款</li>
            <li>生日礼金</li>
            <li>节日礼物</li>
            <li>专属客服</li>
          </ul>
        </span>
      </p>
      <p class="layout">
        <span class="yellow">Lv.3</span><span>月总流水≥5000000</span>
        <span class="dl">
          <ul>
            <li>黄金转盘</li>
            <li>更高返水</li>
            <li>VIP礼券</li>
            <li>优先提款</li>
            <li>生日礼金</li>
            <li>节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
          </ul>
        </span>
      </p>
      <p class="layout">
        <span class="yellow">Lv.4</span><span>月总流水≥10000000</span>
        <span class="dl">
          <ul>
            <li>钻石转盘</li>
            <li>更高返水</li>
            <li>VIP礼券</li>
            <li>闪电提款</li>
            <li>生日礼金</li>
            <li>节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
          </ul>
        </span>
      </p>
      <p class="layout">
        <span class="yellow">Lv.5</span><span>月总流水≥50000000</span>
        <span class="dl">
          <ul>
            <li>钻石转盘</li>
            <li>更高返水</li>
            <li>VIP礼券</li>
            <li>闪电提款</li>
            <li>生日礼金</li>
            <li>节日礼物</li>
            <li>专属客服</li>
            <li>免费手机流量</li>
            <li>欧洲双人游</li>
          </ul>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

ul {
  text-align: left;
}
.dl {
  display: inline-block;
}
.red {
  color: $color-red;
}
.yellow {
  color: $color-yellow13 !important;
  font-weight: bold;
}
.privilege-level {
  background-color: $color-blue8;
  margin: 0 .3rem;
  p {
    margin: 0px;
  }
  .title {
    padding: .3rem 0;
    color: $color-yellow13 !important;
    font-weight: bold;
  }
  .layout {
    span {
      display: inline-block;
      vertical-align: middle;
      width: 26%;
      text-align: center;
      word-wrap: break-word;
      padding: 5px;
      color: $color-white;
      &:first-of-type {
        width: 20%;
        padding: 0px;
      }
      &:last-of-type {
        width: 42%;
        padding: 0px;
      }
    }
    border: $px solid rgba($color-white, .2);
  }
}
</style>
