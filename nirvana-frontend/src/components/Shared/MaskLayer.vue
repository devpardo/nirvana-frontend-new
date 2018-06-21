<template lang="html">
  <div class="mask-layer">
    <p class="txt position-vendor" v-if="maskLayer && maskLayer.flag"><span>正在维护</span></p>
    <p class="loading" v-else><mt-spinner type="fading-circle" class="load-position"></mt-spinner></p>
  </div>
</template>

<script>
export default {
  props: ["maskLayer"]
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mask-layer {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.6;
  z-index: 80;
  .position {
    left: 3%;
    top: 6%;;
    transform: rotate(-45deg);
  }
  .position-vendor {
    left: 35%;
    top: -3%;
  }
  .txt {
    position: absolute;
    color: $color-red;
    background-color: $color-white;
    font-size: $font-h1;
    padding: 0px 20px;
    z-index: 90;
    border-radius: 5px;
  }
  .loading {
    text-align: center;
    position: absolute;
    left: 50%;
    top: 40%;
  }
  .load-position {
    margin: 0 auto;
    display: inline-block;
    left: -5px;
    top: 5px;
    position: relative;
  }
}
</style>
