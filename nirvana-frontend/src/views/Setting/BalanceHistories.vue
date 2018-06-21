<template lang="html">
  <div class="body">
    <filtrate v-show="filtrate.flag" :filtrate="filtrate" :filtrates="filtrates" :jsonFiltrate="jsonFiltrate" :q="q" @getBalances="fetchData"></filtrate>
    <infinite-scroll :fetchHandler="fetchData" :items="items" :loading="loading" :q="q" :totalFetched="totalFetched">
      <template scope="{item}">
        <div class="cell-order" @click="go(item.bill_no)">
          <p><span class="pay">{{ item.label || '无' }}</span><span class="fr date">{{ item.created_at | date('yyyy-MM-dd') || '无' }}</span></p>
          <p><span class="order">交易号:<i>{{ item.bill_no || '无' }}</i></span><span class="amount fr">{{ item.total_amount || '无' }}</span></p>
        </div>
      </template>
      <template slot="bottom">
        <p class="no-data" v-if="firstFetched && !items.length">查询数据为空</p>
      </template>
    </infinite-scroll>
  </div>
</template>

<script>
import "@/libs/filters"
import Filtrate from "@/components/Setting/Filtrate.vue"
import InfiniteScroll from "@/components/Shared/InfiniteScroll"
import infiniteScrollMixin from "@/components/Shared/mixins/infiniteScrollMixin"
import query from "@/components/Shared/mixins/query"

export default {
  mixins: [infiniteScrollMixin, query],
  data () {
    return {
      filtrate: {
        flag: false
      },
      q: {
        per_page: 10,
        page: 1,
        q_status_eq: "",
        q_balance_type_eq: ""
      },
      filtrates: {},
      jsonFiltrate: ["status_created", "status_processing", "status_completed", "status_failed", "status_canceled", "status_expired"]
    }
  },
  watch: {
    "$store.state.sundry.balanceHistoriesFiltrate": function (n) {
      this.filtrate.flag = n
    },
    "$route": function () {
      this.fetchData()
    }
  },
  components: { Filtrate, InfiniteScroll },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (this.$store.state.user.email) {
      if (Object.keys(this.$route.query).length > 0) {
        this.q.page = 1 // 重置为1
      }
      this.fetchData()
      this.fetchBalanceTypes()
    }
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getBalanceHistories(this.q)).then(res => {
        this.unread_count = res.data.unread_count
      })
    },
    // 因为 mint-ui 的限制性，故此只能如此调用
    go (balanceId) {
      this.$router.push({ name: "BalanceHistory", params: {balanceId}, query: this.q })
    },
    fetchBalanceTypes () {
      this.api.getBalanceTypes().then((res) => {
        this.filtrates = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

 p {
   padding: 0;
   margin: 0;
 }
.color-white {
  background-color: $color-white;
  padding-bottom: 100px;
}
 .body {
   background-color: $color-blue9;
   position: absolute;
   top: 0;
   bottom: 0px;
   left: 0;
   right: 0;
 }
.search-data {
  border: $px solid $color-grey1;
  background-color: $color-blue2;
  color: $color-white;
  padding: 5px 30px;
  border-radius: 5px;
  font-size: $font-h4;
}
.cell-order {
  background-color: $color-blue8;
  padding: .3rem;
  margin: .1rem .3rem;
  p {
    &:first-child {
      padding-bottom: 3px;
    }
  }
  .date {
    color: $color-white;
  }
  i {
    font-style: normal;
    padding-left: 3px;
  }
  .order, .pay {
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .order {
    width: 88%;
    color: $color-white;
  }
  .amount {
    color: $color-yellow13;
    font-weight: bold;
    font-size: $font-h4;
  }
  .pay {
    width: 78%;
    font-weight: bold;
    color: $color-yellow13;
  }
}
.filter-data {
  margin-top: 10px;
  padding: 10px;
  border-bottom: $px solid $color-grey1;
  .item-flex {
    span {
      &:first-of-type {
        font-size: $font-h5-1;
      }
    }
    input {
      padding: 6px 10px;
      border: $px solid $color-grey1;
      margin-bottom: 10px;
    }
    select {
      margin-bottom: 10px;
      padding: 5px 30px;
      text-align: center;
      border: $px solid $color-grey1;
    }
  }
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
