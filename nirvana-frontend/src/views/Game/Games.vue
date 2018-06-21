<template lang="html">
  <div class="body" :class="{ hidden: search.flag }">
    <search placeholder="搜索游戏名称" :search="search"></search>
    <navbar :search="search"></navbar>
  </div>
</template>

<script>
import Navbar from "@/components/Game/Navbar.vue"
import Search from "@/components/Shared/Search.vue"

export default {
  data () {
    return {
      search: {
        value: ""
      }
    }
  },
  components: { Navbar, Search },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    // 搜索
    this.$store.dispatch("setSearchObj", this.search)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.hidden {
  overflow: hidden;
  height: 100px;
}
</style>
