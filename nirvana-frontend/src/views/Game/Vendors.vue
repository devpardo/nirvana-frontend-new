<template lang="html">
  <div class="body">
    <!--游戏平台-->
    <vendor-list class="m-top" :vendors="vendors" :dempVendors="dempVendors" :vendorMethod="vendorMethod" :venuesLoading="venuesLoading"></vendor-list>
    <!--推荐游戏-->
    <game-list :hotGames="hotGames" :gamesLoading="gamesLoading" :gameMethod="{ handleUnlike, handleLike }" :query="query"></game-list>
  </div>
</template>

<script>
import infiniteScrollMixin from "@/components/Shared/mixins/infiniteScrollMixin"
import Vendor from "@/components/Game/mixins/Vendor"

export default {
  mixins: [Vendor, infiniteScrollMixin],
  data () {
    return {
      angleDoubleDown: this.$fontawesome("angle-double-down")
    }
  }
}
</script>

<style lang="scss" scoped>
.m-top {
  margin-top: -10px
}
</style>
