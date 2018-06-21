<template lang="html">
  <div class="body" :class="{ hidden: search.flag }">
    <!--轮播图-->
    <swipe :suggests="suggests"></swipe>
    <!--紧急通告-->
    <announcement></announcement>
    <!--搜索-->
    <search placeholder="搜索游戏" @click.native="searchGames()"></search>
    <!--充值-->
    <payway></payway>
    <!--游戏平台-->
    <vendor-list :vendors="vendors" :dempVendors="dempVendors" :vendorMethod="{ moreVendors }" :venuesLoading="venuesLoading"></vendor-list>
    <!--推荐游戏-->
    <game-list :hotGames="hotGames" :dempHotGames="dempHotGames" :gamesFlag="gamesFlag" :gameMethod="{ handleUnlike, handleLike, moreGames }" :gamesLoading="gamesLoading"></game-list>
    <!--大奖池-->
    <pool-bonus></pool-bonus>

  </div>
</template>

<script>
import Search from "@/components/Shared/Search.vue"
import Swipe from "@/components/Home/Swipe.vue"
import Payway from "@/components/Home/Payway.vue"
import PoolBonus from "@/components/Home/PoolBonus.vue"
import Announcement from "@/components/Home/Announcement"
import HomeData from "@/components/Home/mixins/HomeData"

export default {
  mixins: [HomeData],
  data () {
    return {
      search: {
        flag: false
      },
      suggests: []
    }
  },
  components: { Search, Swipe, Payway, PoolBonus, Announcement },
  mounted () {
    // 搜索
    this.$store.dispatch("setSearchObj", this.search)
  },
  methods: {
    searchGames () {
      this.search.flag = true
      this.$store.dispatch("setSearchObj", this.search)
    }
  }
}
</script>

<style lang="scss">
// 引用的是mint-ui 必须重写样式的 但与其它页面不相冲突
.mint-swipe {
  .mint-swipe-indicators {
    right: 0px;
    left: inherit;
  }
  .mint-swipe-indicator.is-active {
    background-color: #fcd667;
    width: 20px;
    border-radius: 5px;
  }
  .mint-swipe-indicators {
    bottom: 6px;
    z-index: 13;
    margin-right: -30px;
  }
  .mint-swipe-indicator {
    width: 8px;
    height: 8px;
    opacity: 1;
    background-color: rgba(#fff, 0.5);
  }
}
.mint-search {
  .mint-searchbar {
    z-index: 0;
    background-color: inherit;
  }
  .mint-searchbar-core {
    padding-left: 5px;
  }
  .mint-searchbar-inner {
    height: 42px;
    padding: 0px 6px;
  }
  .mint-searchbar-inner .mintui-search {
    font-size: 16px;
  }
}
</style>
<style lang="scss" scoped>
.hidden {
  overflow: hidden;
  height: 100px;
}
</style>
