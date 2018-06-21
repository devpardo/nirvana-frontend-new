<template lang="html">
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in suggests" @click.native="goUrl(item.link)" :key="0">
        <img v-lazy="item.image_url" width="100%" height="100%"/>
        <p class="info"><span>{{ item.name }}</span></p>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
export default {
  props: ["suggests"],
  methods: {
    goUrl (url) {
      window.location.href = url
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mint-swipe-indicators {
  position: absolute;
  bottom: 0px;
  z-index: 13;
}
.mint-swipe {
  height: 150px;
  position: relative;
  .info {
    position: absolute;
    margin: 0px;
    bottom: 0px;
    left: 0px;
    right: 0px;
    background-color:rgba(0,0,0,0.5);
    z-index: 12;
    @include line-height(30px);
    padding: 0 10px;
    color: $color-white;
    span {
      margin-right: 10px;
    }
  }
}
</style>
