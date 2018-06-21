<template lang="html">
  <div>
    <div class="games" v-if="hotGames.length || (query && query.items.length)">
      <p class="g-title" :class="{ 'border-bottom': query }">推荐游戏</p>
      <game :gameList="hotGames" :query='query' @handleUnlike="gameMethod.handleUnlike" @handleLike="gameMethod.handleLike"></game>
      <p class="load-more fa" v-if='gamesFlag && gamesFlag.moreFlag' @click="more()">{{ angleDoubleDown }}</p>
    </div>
    <data-loading v-if="gamesLoading" :dataLoad="dataLoad"></data-loading>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue"
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  props: ["likes", "hotGames", "gamesFlag", "dempHotGames", "gamesLoading", "gameMethod", "query"],
  data () {
    return {
      angleDoubleDown: this.$fontawesome("angle-double-down"),
      moreFlag: true,
      dataLoad: {
        flag: this.gamesLoading || false,
        data: "推荐游戏加载中"
      }
    }
  },
  watch: {
    gamesLoading () {
      this.dataLoad.flag = this.gamesLoading
    }
  },
  components: { Game, DataLoading },
  methods: {
    more () {
      this.gamesFlag.moreFlag = false
      if (this.gameMethod.moreGames) { this.gameMethod.moreGames() }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.games {
  background-color: $color-blue8;
  margin: 0 .3rem;
  margin-bottom: .3rem;
  padding: .5rem .3rem .1rem .3rem;
  .g-title {
    font-size: $font-h3;
    color: $color-white;
    font-weight: bold;
    padding-top: 5px;
    margin: 0px;
  }
}
.border-bottom {
  padding-bottom: 5px;
}
.load-more {
  text-align: center;
  color: $color-blue9;
  padding: .2rem;
  background-color: $color-yellow13;
  border-radius: 2rem;
  font-weight: bold;
}
</style>
