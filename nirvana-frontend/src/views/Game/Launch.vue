<template lang="html">
  <div>
    <iframe :src="gameUrl" width="100%" height="100%" target="_self"></iframe>
  </div>
</template>

<script>
export default {
  computed: {
    gameUrl () {
      return this.$route.query.gameUrl
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  }
}
</script>

<style lang="scss" scoped>
</style>
