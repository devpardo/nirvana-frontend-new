<template lang="html">
  <div>
    <div class="games" v-if="vendors.length">
      <p class="g-title">游戏平台</p>
      <vendor :vendors="vendors"></vendor>
      <p class="load-more fa" v-if='dempVendors && (vendors.length !== dempVendors.length)' @click="vendorMethod.moreVendors()">{{ angleDoubleDown }}</p>
    </div>
    <data-loading :dataLoad="dataLoad"></data-loading>
  </div>
</template>

<script>
import Vendor from "@/components/Shared/Vendor.vue"
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  props: ["vendors", "dempVendors", "venuesLoading", "vendorMethod"],
  data () {
    return {
      dataLoad: {
        flag: this.venuesLoading,
        data: "游戏平台加载中"
      },
      angleDoubleDown: this.$fontawesome("angle-double-down")
    }
  },
  watch: {
    venuesLoading () {
      this.dataLoad.flag = this.venuesLoading
    }
  },
  components: { Vendor, DataLoading }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.games {
  background-color: $color-blue8;
  margin: 0 .3rem;
  padding: .5rem .3rem .1rem .3rem;
  margin-bottom: .3rem;
  .g-title {
    font-size: $font-h3;
    color: $color-white;
    font-weight: bold;
    padding-top: 5px;
    margin: 0px;
  }
}
.load-more {
  padding: .2rem;
  background-color: $color-yellow13;
  text-align: center;
  color: $color-blue9;
  border-radius: 1rem;
  font-weight: bold;
  font-size: $font-h2;
}
</style>
