<template lang="html">
  <div>
    <div class="block" v-for="item in subWallets">
      <p>
        <span class="img"><img v-lazy="item.image_url" width="100%" height="100%"></span>
        <span class="title">{{ item.label || '？'}}平台</span>
        <span class="icon fa">{{ moreTh }}</span>
      </p>
      <p class="info">钱包余额:</p>
      <p class="money">￥{{ item.amount || '0'}}</p>
      <p class="locked" v-if="item.locked_text"><span class="fa">{{ info_circle }}</span><i>{{ item.locked_text }}</i></p>
      <p class="button" :class="{ 'opacity': item.locked_at }">
        <span @click="In(item, item.locked_at)">立即转入</span>
        <span @click="Out(item, item.locked_at)">立即转出</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      moreTh: this.$fontawesome("th"),
      info_circle: this.$fontawesome("info-circle")
    }
  },
  props: ["subWallets"],
  methods: {
    In (item, locked) {
      if (locked) {
        return
      }
      this.$emit("transferIn", item)
    },
    Out (item, locked) {
      if (locked) {
        return
      }
      this.$emit("transferOut", item)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  padding: 0;
  margin: 0;
}
.opacity {
  opacity: 0.3;
}
.locked {
  span {
    color: $color-red;
    padding-right: 5px;
  }
  i {
    font-style: normal;
  }
}
.block {
  background-color: $color-blue8;
  margin-top: .3rem;
  padding: .5rem .3rem;
  padding-bottom: 1.2rem;
  position: relative;
  min-height: 115px;
  .img {
    display: inline-block;
    width: 30px;
    height: 30px;
    & > img {
      border-radius: 3px;
    }
  }
  .icon {
    color: rgba($color-white, .5);
    float: right;
  }
  .title {
    position: absolute;
    padding-left: .3rem;
    color: $color-white;
    font-size: $font-h4;
  }
  .info {
    color: rgba($color-white, .5);
    padding-left: 1.1rem;
    margin-top: -10px;
  }
  .money {
    font-size: $font-h1;
    padding-left: 1.1rem;
    color: $color-yellow13;
    font-weight: bold;
  }
  .button {
    color: $color-yellow13;
    font-weight: bold;
    background-color: rgba($color-white, .2);
    position: absolute;
    bottom: 0px;
    left: 0px;
    right: 0px;
    width: 100%;
    span {
      width: 49%;
      @include line-height(1rem);
      display: inline-block;
      text-align: center;
      &:first-child {
        border-right: 1px solid $color-blue8;
      }
    }
  }
}
</style>
