<template lang="html">
  <div class="body">
    <cell></cell>
  </div>
</template>

<script>
import Cell from "@/components/Task/Cell"

export default {
  mounted () {
    let sundry = { navigateTitle: true }
    this.$store.dispatch("setNavigationTitle", sundry)
  },
  components: { Cell }
}
</script>

<style lang="scss" scoped>
</style>
