<template lang="html">
  <div>
    <div class="privileges">
      <div class="fill-in">
        <div v-if="privileges && privileges[0] && privileges[0].text">
          <p v-for="item in privileges">{{ item.text }}</p>
        </div>
        <div v-else class="no-data">{{ privileges }}</div>
        <p class="ok" @click="closed()">确认</p>
        <!--<span class="close fa" @click="closed()">{{ close }}</span>-->
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
export default {
  props: ["obj"],
  computed: {
    privileges () {
      return this.$store.state.sundry.privileges
    }
  },
  methods: {
    closed () {
      this.obj.show = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.privileges {
  position: fixed;
  top: 15%;
  left: 15%;
  z-index: 100;
  padding: 10px;
  padding-bottom: 0px;
  background-color: $color-grey8;
  border-radius: 5px;
  min-width: 256px;
  min-height: 100px;
}
.fill-in {
  position: relative;
  text-align: center;
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
