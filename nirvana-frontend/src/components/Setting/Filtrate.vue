<template lang="html">
  <div>
    <div class="filtrate">
      <h4>交易分类</h4>
      <div v-if="filtrates.balance_types && filtrates.balance_types.length > 0">
        <span v-for="item in filtrates.balance_types" @click="q.q_balance_type_eq = item" :class="{ 'active': q.q_balance_type_eq === item }">
          <i v-if="item === 'balance_deposit'">充值</i>
          <i v-else-if="item === 'balance_withdraw'">提款</i>
          <i v-else-if="item === 'balance_rebate'">返水</i>
          <i v-else-if="item === 'balance_bonus'">奖金</i>
          <i v-else-if="item === 'balance_transfer_main'">转出</i>
          <i v-else-if="item === 'balance_transfer_sub'">转入</i>
        </span>
      </div>
      <h4>交易状态</h4>
      <span v-for="item in jsonFiltrate" @click="q.q_status_eq = item" :class="{ 'active': q.q_status_eq === item }">
        <i v-if="item === 'status_created'">新建</i>
        <i v-else-if="item === 'status_processing'">处理中</i>
        <i v-else-if="item === 'status_completed'">已完成</i>
        <i v-else-if="item === 'status_failed'">失败</i>
        <i v-else-if="item === 'status_canceled'">取消</i>
        <i v-else-if="item === 'status_expired'">过期</i>
      </span>
      <div class="button">
        <button @click="goSearch()">查询</button><button @click="goSearch('clear')">清除</button>
      </div>
    </div>
    <div class="mask-layer" @click="close()"></div>
  </div>
</template>

<script>
export default {
  props: ["filtrate", "filtrates", "jsonFiltrate", "q"],
  methods: {
    close () {
      this.$store.dispatch("setBalanceHistoriesFiltrate", false)
    },
    goSearch (v) {
      this.q.page = 1
      if (v === "clear") {
        this.q.q_status_eq = ""
        this.q.q_balance_type_eq = ""
      }
      this.$store.dispatch("setBalanceHistoriesFiltrate", false)
      let key = `${new Date().getTime()}`
      this.$router.push({query: {...this.q, [key]: ""}})
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

i {
  font-style: normal;
}
h4 {
  margin: 0px;
  margin-bottom: 10px;
}
.active {
  color: $color-blue;
  border: $px solid $color-blue !important;
}
.filtrate {
  position: fixed;
  z-index: 20;
  background-color: $color-white;
  padding: 10px;
  padding-bottom: 0px;
  text-align: justify;
  span {
    padding: 5px 16px;
    width: 30%;
    margin-left: 8px;
    text-align: center;
    margin-bottom: 10px;
    border: $px solid $color-grey1;
    display: inline-block;
    border-radius: 5px;
  }
}
.button {
  border-top: $px solid $color-grey1;
  text-align: right;
  margin: 10px 0px;
  button {
    margin-top: 10px;
    padding: 5px 26px;
    border: $px solid $color-grey1;
    background-color: $color-white;
    letter-spacing: 5px;
    word-spacing: 5px;
    border-radius: 5px;
    &:first-child {
      margin-right: 10px;
    }
  }
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
}
</style>
