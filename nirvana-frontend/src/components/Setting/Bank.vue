<template lang="html">
  <div>
    <div class="action-sheet">
      <p class="list" v-for="item in actions" :key="item.id" @click="selected(item.id, item.index, item.name)">
        <span><img src="~assets/images/payment-online.png" width="100%" height="100%"/></span>
        <span class="limit-name">{{ item.name }}</span>
        <span class="fa fr" v-if="currentSelect.select === item.index">{{ check }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["actions", "select"],
  data () {
    return {
      check: this.$fontawesome("check"),
      plus: this.$fontawesome("plus"),
      currentSelect: this.select
    }
  },
  mounted () {
    if (localStorage.getItem("selectFromBanksId")) {
      this.currentSelect.select = parseInt(localStorage.getItem("selectFromBanksId").split(",")[1])
    }
  },
  methods: {
    selected (id, index, name) {
      this.currentSelect.select = index
      this.$emit("handle", [id, index, name])
    },
    close () {
      this.select.show = false
    },
    addCard () {
      this.$emit("addCard")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  padding: 0px;
  margin: 0px;
}
.action-sheet {
  background-color: $color-white;
  padding:0 10px;
  font-size: $font-h4;
  .list {
    padding: 10px 0px;
    border-bottom: $px solid $color-grey;
    .fr {
      color: $color-blue1;
      position: relative;
      top: 8px;
      padding-right: 8px;
    }
    span {
      &:first-child {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        position: relative;
        top: 5px
      }
    }
  }
}
.limit-name {
  width: 80%;
  display: inline-block;
  vertical-align: middle;
}
</style>
