<template lang="html">
  <div v-if="flag">
    <div class="audio">
      <div class="audio-container">
        <p><span @click="close()" class="hand fr dl">+</span></p>
        <!--width="350" height="216" -->
        <video controls="controls" :poster=img>
          <source src="../../assets/images/audio/audio-2018.mp4" type="video/mp4">
          您的浏览器不支持 video 标签。
        </video>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      flag: true,
      img: require("../../assets/images/audio/cover.png")
    }
  },
  components: {
  },
  mounted () {
//    if (sessionStorage.getItem('AudioFlag') === 'false') {
//      this.flag = false
//    } else {
//      this.flag = true
//    }
  },
  methods: {
    close () {
      this.flag = false
//      sessionStorage.setItem('AudioFlag', 'false')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.audio {
  position: fixed;
  z-index: 50;
  top: 150px;
  left: 50%;
  margin-left: -175px;
  .audio-container {
    position: relative;
    video {
      width: 350px;
      height: 216px;
    }
  }
  p {
    position: absolute;
    left: 0px;
    left: 0px;
    top: -36px;
    width: 100%;
    padding: 0px 10px;
    z-index: 51;
    background-color: $color-grey5;
    height: 36px;
    line-height: 36x;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    span {
      font-size: 30px;
      color: $color-white;
      transform: rotate(45deg);
      font-weight: bold;
      line-height: 33px;
    }
  }
}
</style>
