<template lang="html">
  <div>
    <div class="action-sheet" v-if="actions.length">
      <div class="list" v-for="(item, index) in actions" :key="item.id">
        <span class="img"><img src="~assets/images/payment-online.png" width="100%" height="100%"/></span>
        <p class="card">
          <span v-if="item.bank">{{ item.bank.name || '无' }}</span>
          <span class="info">{{ item.no | substring }}</span>
        </p>
        <span class="delete fr" @click="deleteBank(item.id)" v-if="deleteFlag"><i class="row"></i></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["actions", "select", "methods"],
  data () {
    return {
      check: this.$fontawesome("check"),
      plus: this.$fontawesome("plus")
    }
  },
  computed: {
    deleteFlag () {
      return this.$store.state.sundry.deleteBanksFlag
    }
  },
  filters: {
    substring (value) {
      if (value && value.length > 0) {
        let len = value.length
        return "**** **** **** " + value.substr(len - 4, 4)
      } else {
        return "**** **** **** ****"
      }
    }
  },
  methods: {
    deleteBank (id) {
      this.$messagebox.confirm("您确定要移除此卡吗？删除后将无法恢复?", "确认删除").then(action => {
        this.methods.deleteBank(id)
      }).catch(function (error) { // 解决 它内部使用promise时 抓住异常
        console.log(error)
      })
    },
    close () {
      this.select.show = false
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
  padding:10px;
  font-size: $font-h4;
  .delete {
    border: $px solid $color-red;
    border-radius: 50%;
    width: 25px;
    height: 25px;
    top: 15px;
    margin-right: 10px;
    display: inline-block;
    position: relative;
    .row {
      display: inline-block;
      position: absolute;
      font-style: normal;
      width: 10px;
      height: $px;
      top: 46%;
      left: 25%;
      background-color: $color-red;
    }
  }
  .card {
    display: inline-block;
    width: 80%;
    vertical-align: top;
    span {
      display: block;
    }
    .info {
      font-size: $font-h2;
      padding-top: 15px;
    }
  }
  .list {
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    background: linear-gradient(to bottom, $color-grey12, $color-grey13);
    border-bottom: $px solid $color-grey;
    .img {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      position: relative;
      top: 1px;
    }
  }
}
</style>
