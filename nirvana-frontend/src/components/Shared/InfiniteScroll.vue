<template>
  <div class="infinit-scroll-wrap">
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <slot name="top"></slot>
      <div v-for="item,index in items" :key="index">
        <slot :item="item" :index="index"></slot>
      </div>
      <slot name="bottom"></slot>
      <p v-if="loading && !items.length" class="loading">
        <mt-spinner type="fading-circle" class="load-position"></mt-spinner>
        <span class="load-txt">加载中</span>
      </p>
      <!--<p v-else-if="!items.length" class="no-data">-->
        <!--无数据-->
      <!--</p>-->
    </div>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui"

export default {
  name: "InfiniteScroll",
  props: ["fetchHandler", "items", "loading", "totalFetched", "q"],
  methods: {
    loadMore () {
      if (!this.q.page || !this.items.length) return
      if (!this.totalFetched) {
        this.q.page = this.q.page + 1
        this.fetchHandler && this.fetchHandler()
      } else if (this.q.page > 1) {
        this.$toast({
          message: "无更多数据可加载",
          position: "middle",
          duration: 2000
        })
      }
    }
  },
  components: {
    InfiniteScroll
  }
}
</script>

<style>
.infinit-scroll-wrap {
  position: relative;
  height: 100%;
  overflow: scroll;
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
