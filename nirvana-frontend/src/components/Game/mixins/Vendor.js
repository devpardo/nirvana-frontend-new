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
      vendors: [],
      hotGames: [],
      query: {
        fetchData: "",
        items: "",
        loading: "",
        q: {},
        totalFetched: ""
      },
      vendorMethod: {
        moreVendors: this.moreVendors
      }
    }
  },
  watch: {
    "$store.state.user.email" () {
      this.fetchVendor()
      this.fetchRecommends()
    }
  },
  mounted () {
    let sundry = { navigateTitle: true }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchVendor()
    this.fetchRecommends()
  },
  methods: {
    handleLike (data, game) {
      this.api.postLike(data).then(() => {
        // this.q.page = 1
        // this.items.length = 0
        // this.fetchRecommends()
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
      this.api.postUnlike(data).then(() => {
        // this.q.page = 1
        // this.items.length = 0
        // this.fetchRecommends()
        this.$set(game, "liked", false)
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    moreVendors () {
      this.vendors = this.dempVendors
    },
    fetchVendor () {
      this.api.getVendors().then((res) => {
        this.dempVendors = res.data.items
        this.vendors = res.data.items.slice(0, 4)
        this.venuesLoading = false
      }).catch((error) => {
        console.log(error)
        this.venuesLoading = false
      })
    },
    fetchRecommends () {
      this.gamesLoading = true
      this._fetchData(this.api.getRecommends({per_page: this.q.per_page, page: this.q.page})).then(res => {
        this.query.fetchData = this.fetchRecommends
        this.query.items = this.items
        this.query.loading = this.loading
        this.query.q = this.q
        this.query.totalFetched = this.totalFetched
        this.gamesLoading = false
      }).catch((error) => {
        this.gamesLoading = false
        console.log(error)
      })
    }
  }
}
