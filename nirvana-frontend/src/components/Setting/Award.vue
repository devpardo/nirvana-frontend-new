<template lang="html">
  <div>
    <div class="privileges">
      <div class="fill-in">
        <div v-if="awards.datas">
          <span class="img"><img src="~assets/images/congra-image.png" width="100%" height="100%"/></span>
          <p class="text">{{ awards.datas }}</p>
          <p class="ok" @click="closed()">确认</p>
        </div>
        <div v-else class="no-data">无数据</div>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
export default {
  props: ["awards"],
  methods: {
    closed () {
      this.awards.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.privileges {
  position: fixed;
  top: 35%;
  left: 15%;
  z-index: 100;
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 0px;
  background-color: $color-grey8;
  border-radius: 5px;
  min-width: 256px;
  min-height: 80px;
}
.fill-in {
  position: relative;
  z-index: 2;
  text-align: center;
  .text {
    font-size: $font-h5-1;
    word-spacing: $px;
    letter-spacing: $px;
  }
  .img {
    position: absolute;
    top: -154px;
    z-index: 1;
    left: 0;
    max-width: 316px;
    max-height: 216px;
  }
  .ok {
    border-top: $px solid $color-grey1;
    height: 30px;
    line-height: 40px;
    font-size: $font-h4;
  }
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 99;
}
</style>
