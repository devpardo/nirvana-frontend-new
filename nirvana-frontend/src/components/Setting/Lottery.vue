<template lang="html">
  <div>
    <section class="gb-wheel-container" id="container">
      <div class="gb-wheel-content" :class="{ 'gb-wheel-run': datas.runFlag }" :style="{ transform: 'rotate(' + (datas.count * 3600 - datas.endCount * 360)  + 'deg)' }">
        <ul class="gb-wheel-line">
          <li v-for="(item, index) in datas.awards" class="gb-wheel-litem" :style="{ transform: 'rotate(' + (index * datas.copies + datas.copies / 2) + 'turn)' }"></li>
        </ul>
        <div class="gb-wheel-list">
          <div class="gb-wheel-item" v-for="(v, ind) in datas.awards">
            <div class="gb-wheel-icontent" :style="{ transform: 'rotate(' + (ind * datas.copies) + 'turn)' }">
              <p class="gb-wheel-itext">
                {{ v.name }}
              </p>
              <p class="gb-wheel-iicon">
                <i><img v-lazy="v.aws_url" width="100%" height="100%"/></i>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="btn">
        <a href="javascript:;" class="gb-wheel-btn" @click="handleLottery()"></a>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["datas"],
  methods: {
    handleLottery () {
      this.datas.handleLottery()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  background-color: $color-yellow6;
}
.gb-wheel-container ul,
.gb-wheel-container li,
.gb-wheel-container p {
  margin: 0;
  padding: 0
}
.gb-wheel-container ul,
.gb-wheel-container li {
  list-style: none
}
.gb-wheel-container {
  margin: 0 auto;
  position: relative;
  width: 321px;
  height: 321px;
  border-radius: 50%;
  overflow: hidden;
  border: 5px solid $color-red6;
}
.gb-wheel-content {
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 2;
  width: 311px;
  height: 311px;
  border-radius: inherit;
  border: 6px solid $color-yellow7;
  background-color: $color-yellow8;
}
.gb-wheel-content:before {
  content: ' ';
  position: absolute;
  left: -$px;
  top: -$px;
  z-index: -1;
  width: 299px;
  height: 299px;
  border-radius: inherit;
  border: $px solid $color-red6;
}
.gb-wheel-list {
  position: absolute;
  left: 0;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 9999
}
.gb-wheel-line {
  position: absolute;
  left: 8px;
  top: 0;
  width: inherit;
  height: inherit;
  z-index: 95
}
.gb-wheel-litem {
  position: absolute;
  left: 140px;
  top: 0;
  width: $px;
  height: 150px;
  background-color: $color-yellow9;
  overflow: hidden;
  transform-origin: 50% 150px
}
.btn {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-color: $color-brown;
  z-index: 98;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -59px;
  margin-top: -59px;
}
.gb-wheel-btn {
  position: absolute;
  left: 50%;
  top: 42%;
  z-index: 98;
  width: 100px;
  height: 118px;
  margin-left: -50px;
  margin-top: -59px;
  background: url("../../assets/images/lotspin.png");
  background-size: 100% 100%;
}
.gb-wheel-run {
  transition: transform 6s ease-in-out
}
// list
.gb-wheel-item {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  color: $color-red6;
  font-weight: bold;
}
.gb-wheel-icontent {
  position: relative;
  display: block;
  padding-top: 15px;
  margin: 0 auto;
  text-align: center;
  transform-origin: 50% 153px
}
.gb-wheel-itext {
  font-weight: lighter
}
.gb-wheel-iicon {
  i {
    margin-top: 5px;
    width:30px;
    height: 30px;
    display: inline-block;
    /*background: url("../../assets/images/m-coin.png");*/
    /*background-size: 100% 100%;*/
  }
}
</style>
