<template lang="html">
  <div>
    <div v-if="rebates.items && rebates.items.length">
      <div class="rebates" v-for="items in rebates.items">
        <p class="title p-right">
          <span class="h3">{{ items.vendor_name || '--'}}平台</span>
          <span>当日流水额: {{ items.compute_amount || '0.0' }}</span>
          <rebate-search :rebates="rebates" :method="method" :rebateItems="items" :vendor_id="items.vendor_id"></rebate-search>
        </p>
        <div class="bg-color" v-for="item in items.rebates">
          <div class="cell">
            <p class="date">
              <span>{{ item.rebate_at | day }}</span>
              <span>{{ item.rebate_at | date }}</span>
            </p>
            <p class="amount"><span class="p-right">产生流水数:</span><span>￥{{ item.compute_amount || '--' }}</span></p>
            <p class="bet_amount">
              <span class="align"><span class="p-right">可领返水</span><span class="blue">￥{{ item.real_payment_amount || '--'}}</span></span>
              <span class="rebate rebate-success dl fr" @click="receivedRebate(item)" v-if="item.status === 'status_approved'">立即领取</span>
              <span class="rebate rebate-fail dl fr" v-if="item.status === 'status_completed'">返水已领</span>
            </p>
          </div>
        </div>
        <p class="no-data" v-if="!items.rebates.length">查询为空</p>
      </div>
    </div>
    <loading v-if="method.loadingFlag"></loading>
    <p v-if="(rebates.items && !rebates.items.length) && !method.loadingFlag" class="no-data">暂无返水奖励</p>
  </div>
</template>

<script>
import Loading from "@/components/Shared/Loading.vue"
import RebateSearch from "@/components/Setting/RebateSearch"

export default {
  props: ["rebates", "method"],
  data () {
    return {
    }
  },
  components: { Loading, RebateSearch },
  methods: {
    receivedRebate (obItem) {
      this.api.postReceiveRebate(obItem.id).then((res) => {
        Object.assign(obItem, res.data)
        this.$toast({
          message: "领取完毕",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  filters: {
    date (v) {
      if (!v) return "--"
      let arr = v.split("-")
      if (arr.length === 3) {
        return arr[0] + "-" + arr[1]
      } else {
        return "--"
      }
    },
    day (v) {
      if (!v) return "--"
      let arr = v.split("-")
      if (arr.length === 3) {
        return arr[2]
      } else {
        return "--"
      }
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
.dl {
  display: inline-block;
}
.blue {
  color: $color-blue1;
}
.bg-color {
  background-color: $color-white;
}
.p-right {
  padding-right: 5px;
}
.rebates {
  margin-bottom: 10px;
  color: $color-grey9;
  background-color: $color-blue8;
  padding: .3rem;
  span {
    display: inline-block;
  }
  .title {
    padding: 8px 2px;
    position: relative;
    border-bottom: $px solid $color-blue9;
    margin-bottom: 10px;
    color: $color-white;
    .h3 {
      font-size: $font-h4;
      color: $color-yellow13;
      font-weight: bold;
    }
  }
  .cell {
    border-radius: 5px;
    border-left: 5px solid $color-blue1;
    position: relative;
    margin-bottom: 5px;
    .date {
      position: absolute;
      background-color: $color-grey8;
      padding: 10px;
      left: 10px;
      top: 10px;
      text-align: center;
      span {
        display: block;
        &:first-of-type {
          color: $color-red;
          font-size: $font-h3;
        }
      }
    }
    p {
      padding: 10px 5px ;
    }
    .amount, .bet_amount {
      padding-left: 85px;
    }
    .amount {
      border-bottom: $px solid $color-grey;
      word-wrap: break-word;
      word-break: break-all;
    }
    .bet_amount {
      .align {
        vertical-align: middle; padding-bottom: 10px; position: relative; top: 5px;
        word-wrap: break-word;
        word-break: break-all;
        width: 62%;
      }
    }
  }
}
.rebate {
  vertical-align: middle;
  padding-top: 10px;
}
.rebate-fail {
  padding: 5px 15px;
  border: $px solid $color-grey2;
  border-radius: 5px;
  color: $color-grey2;
}
.rebate-success {
  padding: 5px 15px;
  border: $px solid $color-blue1;
  border-radius: 5px;
  color: $color-blue1;
}
</style>
