<template lang="html">
  <div class="body">
    <mt-navbar v-model="selected">
      <mt-tab-item id='1'>全部</mt-tab-item>
      <mt-tab-item id='2'>老虎机</mt-tab-item>
      <mt-tab-item id='3'>真人游戏</mt-tab-item>
      <mt-tab-item id='4'>捕鱼</mt-tab-item>
      <mt-tab-item id='5'>其它</mt-tab-item>
    </mt-navbar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected" class="home-container">
      <mt-tab-container-item id='1'>
      </mt-tab-container-item>
      <mt-tab-container-item id='2'>
        tab2
      </mt-tab-container-item>
      <mt-tab-container-item id='3'>
        tab3
      </mt-tab-container-item>
      <mt-tab-container-item id='4'>
        tab4
      </mt-tab-container-item>
      <mt-tab-container-item id='5'>
        tab5
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: "1",
      games: []
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
