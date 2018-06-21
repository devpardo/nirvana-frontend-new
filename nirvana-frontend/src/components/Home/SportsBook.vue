<template lang="html">
  <div class="sportsbook">
    <img src="/static/sportsbook.png" class="img-responsive" @click="goSportsbook" />
  </div>
</template>

<script>
export default {
  methods: {
    goSportsbook() {
      this.$router.push("/sportsbook")
    }
  }
}
</script>

<style lang="scss" scoped>
  .sportsbook {
    margin: 0 .3rem;
    margin-bottom: .3rem;
    // padding: .5rem .3rem;
    .img-responsive {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
</style>
