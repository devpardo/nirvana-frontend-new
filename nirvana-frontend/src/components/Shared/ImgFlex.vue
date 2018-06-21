<template lang="html">
  <div class="container-flex" v-if="imgList">
    <div class="item-flex" v-for="item in imgList">
      <p class="img-flex">
        <span class="g-heart fa">{{ iconHeart }}</span>
        <img class="g-cover" src="~assets/images/demo/game-demo1.png" width="100%" height="100%"/>
        <span><img class="g-logo" src="~assets/images/demo/logo-demo1.svg" width="100%" height="100%"/></span></p>
         <!--<img :src="item.image_url" width="100%" height="100%"/>-->
      <div class="txt-flex">
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      iconHeart: this.$fontawesome("heart")
    }
  },
  props: ["imgList"]
}
</script>

<style lang="scss" scoped>
.container-flex {
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -moz-box; /* 老版本语法: Firefox (buggy) */
  display: -ms-flexbox; /* 混合版本语法: IE 10 */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-wrap: wrap;
  align-items: flex-start;
  -webkit-box-pack: justify;
  -webkit-justify-content: space-between;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding-right: 10px;
}
.item-flex {
  width: 112px;
  -webkit-flex: 0 1 auto;
  -moz-flex: 0 1 auto;
  -webkit-flex: 0 1 auto;
  flex: 0 1 auto;
  .img-flex {
    width: 112px;
    border-radius: 10px;
    background-color: #b8bbbf;
    height: 112px;
    position: relative;
    margin: 0px;
    margin-top: 10px;
    margin-bottom: 7px;
    .g-cover { border-radius: 5px; }
    .g-logo {
      display: block;
      position: absolute;
      z-index: 2;
      bottom: 0;
      left: 0;
      right: 0;
      height: 20px;
    }
    .g-heart {
      display: inline-block;
      position: absolute;
      top: 5px;
      right: 10px;
      color: red;
      font-size: 15px;
    }
  }
  .txt-flex {
    margin-top: -5px;
    width: 112px;
    padding: 0px 2px;
    span {
      display: block;
    }
  }
}
</style>
