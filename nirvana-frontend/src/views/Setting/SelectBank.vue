<template lang="html">
  <div class="body">
    <p class="no-data" v-if="firstFetched && (!items || !items.length)">无相关银行数据</p>
    <infinite-scroll class="task-list" :fetchHandler="fetchData" :items="items" :loading="loading" :q="q" :totalFetched="totalFetched">
      <template scope="{item, index}">
        <p class="head-office" @click="getSelectd(item.id, item.name)">
          <span class="img dl"><img v-lazy="item.image_url" width="100%" height="100%"/></span>
          <span class="name dl">{{ item.name }}</span>
          <span class="fa fr" v-if="selected === item.id">{{ check }}</span>
        </p>
      </template>
    </infinite-scroll>
  </div>
</template>

<script>
import InfiniteScroll from "@/components/Shared/InfiniteScroll"
import infiniteScrollMixin from "@/components/Shared/mixins/infiniteScrollMixin"

export default {
  mixins: [infiniteScrollMixin],
  data () {
    return {
      // local data
      selected: 0,
      check: this.$fontawesome("check"),
      banks: [],
      actions: {}
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (localStorage.getItem("selectFromBanksId")) {
      this.selected = parseInt(localStorage.getItem("selectFromBanksId").split(",")[0])
    }
    this.fetchData()
  },
  methods: {
    fetchData () {
      this._fetchData(this.api.getBanks(this.q)).then(res => {
      })
    },
    getSelectd (id, name) {
      let arr = [id, name]
      this.$router.push({ name: "AddBank" })
      localStorage.setItem("selectFromBanksId", arr)
    }
  },
  components: { InfiniteScroll }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 0px;
}
.dl {
  display: inline-block;
}
.body {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.head-office {
  margin: 0 .3rem;
  padding: .5rem .3rem;
  background-color: $color-blue8;
  color: $color-white;
  font-size: $font-h4;
  border-bottom: $px solid $color-blue9;
  .img {
    width: 20px;
    height: 20px;
    img {
      border-radius: 50%;
      vertical-align: middle;
    }
  }
  .name {
    padding-left: 6px;
    width: 85%;
    word-break: break-all;
    vertical-align: middle;
  }
  .fr {
    color: $color-yellow13;
    padding-right: 8px;
  }
}
.no-bank {
  background-color: $color-grey4;
  color: $color-grey3;
  padding: 5px 10px;
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
