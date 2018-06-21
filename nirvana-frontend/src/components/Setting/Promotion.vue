<template lang="html">
  <div class="all">
    <!--<div class="promotions">-->
      <!--<span class="img"><img src="~assets/images/demo/banner-demo1.png" width="100%" height="100%"></span>-->
      <!--<p class="title">亚太与您 一生粽情</p>-->
      <!--<p class="info">为了回馈广大亚太用户，值端午佳节之际，我为了回馈广大亚太用户，值端午佳节之际，我</p>-->
      <!--<p class="detail" @click="handle()"><span>点击查看详情</span><span class="fa">{{ externalLink }}</span></p>-->
      <!--<span class="valid yellow">长期优惠</span>-->
    <!--</div>-->
    <!--<div class="promotions">-->
      <!--<span class="img"><img src="~assets/images/demo/banner-demo1.png" width="100%" height="100%"></span>-->
      <!--<p class="title">亚太与您 一生粽情</p>-->
      <!--<p class="info">为了回馈广大亚太用户，值端午佳节之际，我为了回馈广大亚太用户，值端午佳节之际，我</p>-->
      <!--<p class="detail" @click="handle()"><span>点击查看详情</span><span class="fa">{{ externalLink }}</span></p>-->
      <!--<span class="valid red">限时优惠</span>-->
    <!--</div>-->
    <!--<div class="promotions">-->
      <!--<span class="img"><img src="~assets/images/demo/banner-demo1.png" width="100%" height="100%"></span>-->
      <!--<p class="title">亚太与您 一生粽情</p>-->
      <!--<p class="info">为了回馈广大亚太用户，值端午佳节之际，我为了回馈广大亚太用户，值端午佳节之际，我</p>-->
      <!--<p class="detail" @click="handle()"><span>点击查看详情</span><span class="fa">{{ externalLink }}</span></p>-->
      <!--<span class="valid blue">每月优惠</span>-->
    <!--</div>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      externalLink: this.$fontawesome("external-link")
    }
  },
  methods: {
    handle () {
      this.$emit("goDetail")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.all {
  padding: 10px;
}
p {
  padding: 0px;
  margin: 0px;
}
.promotions {
  background-color: $color-white;
  position: relative;
  padding-bottom: 40px;
  border: $px solid $color-grey;
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
  .detail {
    color: $color-blue1;
    position: absolute;
    right: 20px;
    bottom: 10px;
    .fa {
      position: relative;
      left: 3px;
      top: 1px;
    }
  }
}
</style>
