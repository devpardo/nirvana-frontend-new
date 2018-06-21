import VendorList from "@/components/Shared/VendorList.vue"
import GameList from "@/components/Shared/GameList.vue"

export default {
  components: { VendorList, GameList },
  data () {
    return {
      venuesLoading: true,
      gamesLoading: true,
      angleDoubleDown: this.$fontawesome("angle-double-down"),
      likes: [],
      dempVendors: [],
      dempHotGames: [],
      vendors: [],
      hotGames: [],
      gamesFlag: {
        moreFlag: true
      }
    }
  },
  watch: {
    "$store.state.user.email" () {
      this.fetchEntrance().then(() => {
        if (this.$store.state.user.email) {
          this.handleLikes()
        }
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    let sundry = { navigateTitle: true }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchEntrance().then(() => {
      if (this.$store.state.user.email) {
        this.handleLikes()
      }
    })
  },
  methods: {
    handleLikes (sign) {
      if (sign === 1) {
        this.fetchEntrance().then(() => {
          if (this.$store.state.user.email) {
            this.handleLikes()
          }
        }).catch((error) => {
          console.log(error)
        })
      }
      this.api.getLikeGames().then((res) => {
        this.likes = res.data.items
        if (this.likes.length && this.dempHotGames.length) {
          let lengthL = this.likes.length
          for (let i = 0; i < lengthL; i++) {
            let lengthH = this.dempHotGames.length
            for (let j = 0; j < lengthH; j++) {
              if (this.dempHotGames[j].id === this.likes[i].id) {
                this.dempHotGames.splice(j, 1)
                break
              }
            }
          }
          this.dempHotGames = this.likes.concat(this.dempHotGames)
          if (!this.gamesFlag.moreFlag) {
            this.hotGames = this.dempHotGames
          } else {
            this.hotGames = this.dempHotGames.slice(0, 4)
          }
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    handleLike (data) {
      this.api.postLike(data).then((res) => {
        this.handleLikes()
        this.$toast({
          message: "已加入收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleUnlike (data) {
      this.api.postUnlike(data).then((res) => {
        this.handleLikes(1)
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    // 注意: 因为在子组件里试图要改变父组件里的数据，总报错不让直接修改父组件数据内容，故如此调用
    moreVendors () {
      this.vendors = this.dempVendors
    },
    moreGames () {
      this.hotGames = this.dempHotGames
    },
    fetchEntrance () {
      return new Promise((resolve, reject) => {
        this.api.getEntrance().then((res) => {
          if (res.data.length) {
            let ob = {}
            res.data.forEach((item) => {
              ob[item.category] = item.items
            })
            this.suggests = ob.suggests
            this.dempVendors = ob.vendors
            this.vendors = ob.vendors.slice(0, 4)
            this.dempHotGames = ob.recommended_games
            if (!this.gamesFlag.moreFlag) {
              this.hotGames = this.dempHotGames
            } else {
              this.hotGames = this.dempHotGames.slice(0, 4)
            }
          }
          this.venuesLoading = false
          this.gamesLoading = false
          resolve()
        })
      }).catch((error) => {
        this.venuesLoading = false
        this.gamesLoading = false
        console.log(error)
      })
    }
  }
}
