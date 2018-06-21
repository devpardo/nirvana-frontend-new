<template lang="html">
  <div class="fishing-page">
    <a href="#" class="fishing-btn" @click="goPlay">
      <img src="/static/fishing-button.png">
    </a>
  </div>
</template>

<script>
export default {
  methods: {
    goPlay() {
      console.log("Play Game");
    }
  }
}
</script>

<style lang="scss" scoped>
  .fishing-page {
    background-image: url('/static/fishing-bg.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
    background-color:#0b0e31;
    height: 100%;
    .fishing-btn {
      position: absolute;
      bottom: 10%;
      left: 50%;
      transform: translateX(-50%);
      img{
        height: 6vh;
      }
    }
  }
</style>
