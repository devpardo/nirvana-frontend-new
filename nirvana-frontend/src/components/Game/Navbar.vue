<template lang="html">
  <div>
    <p v-if="loading" class="loading"><mt-spinner type="fading-circle" class="load-position"></mt-spinner><span class="load-txt">加载中</span></p>
    <div v-if="games.length">
      <mt-navbar v-model="selected">
        <mt-tab-item :id=index v-for="(item, index) in gamesLabel" :key=index>{{ item }}</mt-tab-item>
      </mt-navbar>
      <!-- tab-container -->
      <mt-tab-container v-model="selected" class="home-container">
        <mt-tab-container-item :id=index v-for="(item, index) in games" :key=index>
          <div class="games p-bottom">
            <game :gameList="item.games" @handleUnlike="handleUnlike" @handleLike="handleLike"></game>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div class="no-data" v-else-if="!loading">
      查询数据为空
    </div>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue"

export default {
  props: ["search"],
  data () {
    return {
      selected: 0,
      loading: true,
      q: {
        q_name_cont: this.search.value
      },
      games: [],
      gamesLabel: []
    }
  },
  computed: {
    vendorCode () {
      return this.$route.params.vendorCode
    }
  },
  watch: {
    "search.value": function (n) {
      this.q.q_name_cont = n
      this.fetchGames()
    }
  },
  components: { Game },
  mounted () {
    this.fetchGames()
  },
  methods: {
    fetchGames () {
      let name = this.vendorCode
      this.api.getGames(this.q, name).then((res) => {
        this.games = res.data.items
        if (this.games.length) {
          this.gamesLabel.length = 0 // 先清空
          this.games.forEach((e) => {
            this.gamesLabel.push(e.label)
          })
        }
        this.loading = false
      }).catch((error) => {
        this.loading = false
        console.log(error)
      })
    },
    handleLike (data, game) {
      this.api.postLike(data).then((res) => {
//        this.fetchGames()
        this.$set(game, "liked", true)
        this.$toast({
          message: "已加入收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleUnlike (data, game) {
      this.api.postUnlike(data).then((res) => {
//        this.fetchGames()
        this.$set(game, "liked", false)
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.games {
  width: 100%;
  background-color: $color-blue8;
  margin-top: 3px;
  padding: .3rem;
  padding-bottom: 10px;
  border-bottom: $px solid $color-grey1;
}
.p-bottom {
  padding-bottom: 80px;
}
.loading {
  text-align: center;
}
.load-position {
  margin: 0 auto;
  display: inline-block;
  left: -5px;
  top: 5px;
  position: relative;
}
.load-txt {
  position: relative;
  top: -5px;
}
</style>
