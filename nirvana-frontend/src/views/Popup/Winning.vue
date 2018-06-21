<template lang="html">
  <div>
    <section>
      <div class="popup-div">
        <div class="right-side">
          <button class="btn-footer" @click="back()"></button>
        </div>
        <div class="winning body">
          <div class="container" v-if="redPacket">
            <div class="winning-amount">
                <span class="money">￥</span>{{ redPacket.bonuses || '请稍等...' }}
            </div>
            <!--<button class="btn-claim"></button>-->
          </div>
          <div class="footer">
            <div class="left-side">
              <p> 使用提示： </p>
              <p> 1、不限场馆，5倍流水，即可提款。 </p>
              <p> 2、此活动不与其它优惠活动共享。 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    redPacket () {
      return this.$store.state.sundry.redPacket
    }
  },
  watch: {
    redPacket: {
      handler (newVal) {
        if (!newVal) {
          this.$router.back()
        }
      },
      immediate: true
    }
  },
  methods: {
    back () {
      this.$router.push({ name: "Prize" })
    }
  },
  mounted () {
//    this.api.postHongbao().then(res => {
//      this.hongbao = res.data
//    })
  }
}
</script>

<style lang="scss" scoped>
@import 'sass/styles';
</style>
