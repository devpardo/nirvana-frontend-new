<template lang="html">
  <div class="button-bg" v-if="rebates && rebates.items.length">
    <span class="button-success" @click="setRebatesCompleted()" v-if="rebates.rebates_unreceived">一键领取</span>
    <span v-else class="button-fail">无返水可领取</span>
  </div>
</template>

<script>
export default {
  props: ["rebates", "method"],
  methods: {
    setRebatesCompleted () {
      this.api.postSetRebatesCompleted().then(() => {
        this.method.fetchRebates()
        this.$toast({
          message: "一键领取完毕",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.button-bg {
  background-color: rgba($color-white, .2);
  padding: .3rem;
  position: fixed;
  bottom: 0px;
  right: 0px;
  left: 0px;
  span {
    display: inline-block;
    width: 100%;
    padding: 10px 0px;
    border-radius: 5px;
    text-align: center;
  }
  .button-success {
    background-color: $color-yellow13;
    color: $color-blue9;
    font-weight: bold;
    font-size: $font-h4;
  }
  .button-fail {
    opacity: .5;
    background-color: $color-yellow13;
    color: $color-blue9;
    font-size: $font-h4;
  }
  .opacity {
    opacity: 0.3;
  }
}
</style>
