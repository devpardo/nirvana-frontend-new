<template lang="html">
  <div>
    <div class="prize" v-if="prizeFlag" @click="go()">
      <span class="img" @click.stop="close()"><img src="../../views/Popup/images/mobile_close.png" width="100%" height="100%"/></span>
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    "$route.meta.name": function () {
      let routeName = this.$route.meta.name
      switch (routeName) {
        case "Prize": case "Start":
          this.$store.dispatch("setPrizeFlag", false)
          break
        default:
          if (sessionStorage.getItem("prizeFlag") && (sessionStorage.getItem("prizeFlag") === "false")) return
          this.$store.dispatch("setPrizeFlag", true)
      }
    }
  },
  computed: {
    prizeFlag: function () {
      return this.$store.state.sundry.prizeFlag
    },
    email: function () {
      return this.$store.state.user.email
    }
  },
  methods: {
    go () {
      this.$router.push({ name: "Prize" })
      if (this.email) {
        this.$store.dispatch("setPrizeFlag", false)
      }
    },
    close () {
      this.$store.dispatch("setPrizeFlag", false)
      sessionStorage.setItem("prizeFlag", "false")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.prize {
  width: 100%;
  height: 42px;
  background: url("../../views/Popup/images/m_banner_01.png") no-repeat;
  background-size: 100% 100%;
  position: relative;
  .img {
    position: absolute;
    top: 16%;
    right: 2%;
    width: 29px;
    height: 29px;
    display: inline-block;
  }
}
</style>
