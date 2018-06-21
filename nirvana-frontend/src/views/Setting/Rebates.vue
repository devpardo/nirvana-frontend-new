<template lang="html">
  <div class="body">
    <rebate class="rebate" :rebates="rebates" :method="method"></rebate>
    <rebate-button :rebates="rebates" :method="method"></rebate-button>
  </div>
</template>

<script>
import Rebate from "@/components/Setting/Rebate"
import RebateButton from "@/components/Setting/RebateButton"

export default {
  data () {
    return {
      rebates: "",
      method: {
        fetchRebates: this.fetchRebates,
        serchRebates: this.serchRebates,
        loadingFlag: true,
        rebateItems: ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchRebates()
  },
  components: { Rebate, RebateButton },
  methods: {
    fetchRebates () {
      if (this.rebates) { this.rebates.length = 0 }
      this.method.loadingFlag = true
      this.api.getRebates().then((res) => {
        this.rebates = res.data || ""
        this.method.loadingFlag = false
      }).catch((error) => {
        this.method.loadingFlag = false
        console.log(error)
      })
    },
    serchRebates (q) {
      this.api.getSearchRebates(q).then((res) => {
        this.method.rebateItems.rebates = res.data.items || ""
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.rebate {
  padding: .5rem .3rem;
  margin-bottom: 2rem;
}
</style>
