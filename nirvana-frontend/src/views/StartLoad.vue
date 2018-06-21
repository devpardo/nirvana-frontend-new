<template lang="html">
  <div>
    <div class="bg">
      <span class="timer">{{ timer }}</span>
      <span class="img">
        <img src="~assets/images/manwin-logo.svg" width="100%" height="100%"/>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timer: 5
    }
  },
  mounted () {
    let time = setInterval(() => {
      this.timer--
      if (this.timer === 0) {
        this.$router.push("/start_index")
        window.clearInterval(time)
      }
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.bg {
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: $color-red;
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  .timer {
    position: absolute;
    top:20px;
    right: 20px;
    display: inline-block;
    border: $px solid $color-white;
    @include line-height(20px);
    text-align: center;
    width: 20px;
    border-radius: 50%;
    color: $color-white;
  }
  .img {
    display: inline-block;
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -25px;
    margin-left: -25px;
  }
}
</style>
