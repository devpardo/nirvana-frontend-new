<template lang="html">
  <div class="fishing">
    <img src="/static/fishing.jpg" class="img-responsive" @click="goFishing" />
  </div>
</template>

<script>
export default {
  methods: {
    goFishing() {
      this.$router.push("/fishing")
    }
  }
}
</script>

<style lang="scss" scoped>
  .fishing {
    margin: 0 .3rem;
    margin-bottom: .3rem;
    .img-responsive {
      max-width: 100%;
      height: auto;
      display: block;
    }
  }
</style>
