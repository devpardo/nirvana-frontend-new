<template lang="html">
  <div>
    <div class="search">
      <div class="select" @click="changeFlag()">{{ selectValue }}</div>
      <div class="options" v-if="searchFlag">
         <p v-for="(item, index) in searchs" @click="selectV(item, index)" :class="{ 'blue': currentSelected === index }">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["method", "vendor_id", "rebateItems"],
  data () {
    return {
      selectValue: "当前",
      searchs: ["当前", "近3天", "近7天", "近一月"],
      currentSelected: 0,
      searchFlag: false,
      q: {
        q_rebate_at_gteq: "",
        q_vendor_id_eq: ""
      }
    }
  },
  watch: {
    "rebateItems": function (n) {
      this.method.rebateItems = n
    }
  },
  methods: {
    changeFlag () {
      this.searchFlag = !this.searchFlag
    },
    selectV (value, index) {
      this.currentSelected = index
      this.selectValue = value
      this.changeFlag()
      if (value === "近3天") {
        this.computedDate(3)
      } else if (value === "近7天") {
        this.computedDate(7)
      } else if (value === "当前") {
        this.computedDate(1)
      } else if (value === "近一月") {
        this.computedDate(30)
//        delete this.q.q_created_at_gt
//        this.q.q_vendor_id_eq = this.vendor_id
      }
      this.method.serchRebates(this.q)
    },
    computedDate (day) {
      let nowDate = new Date()
      nowDate.setHours(23, 59, 59, 999)
      let beforeDate = new Date(nowDate.getTime() - 1000 * 60 * 60 * 24 * day)
      this.q.q_rebate_at_gteq = beforeDate.getFullYear() + "-" + (beforeDate.getMonth() + 1) + "-" + beforeDate.getDate()
      this.q.q_vendor_id_eq = this.vendor_id
      this.method.rebateItems = this.rebateItems
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 0px;
  padding: 0px;
}
.blue {
  color: $color-blue1;
}
.search {
  position: absolute;
  right: 0px;
  top: 6px;
  font-size: $font-h5;
  .select {
    color: $color-blue1;
    padding: 5px 15px;
    text-align: right;
    &:after {
      content: '';
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-bottom: 5px solid $color-blue1;
      position: absolute;
      top: 12px;
      right: 0px;
      transform: rotate(180deg);
    }
  }
  .options {
    background-color: $color-white;
    position: relative;
    border-radius: 5px;
    box-shadow: 0px 0px 5px $color-grey3;
    z-index: 1;
    p {
      padding: 15px 50px;
      border-bottom: $px solid $color-grey;
    }
    border-bottom: none;
  }
}
</style>
