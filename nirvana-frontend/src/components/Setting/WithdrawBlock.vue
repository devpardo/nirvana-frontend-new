<template lang="html">
  <div class="all">
    <div class="block" v-for="item in withdrawals" @click="goDetail(item.bill_no)">
      <div class="base-info">
        <div :class="{ 'dl block-right': item.status === 'status_created' }">
          <p>
            <span>订单状态:</span>
            <span v-if="item.status === 'status_created'">订单已提交，正在等待受理...</span>
            <span v-else-if="item.status === 'status_pended'">订单已接受，正在审核...</span>
            <span v-else-if="item.status === 'status_checked'">订单审核通过，正在出款操作...</span>
            <span v-else-if="item.status === 'status_processing'">正在出款...</span>
            <span v-else-if="item.status === 'status_completed'">出款成功，请核实...</span>
            <span v-else-if="item.status === 'status_failed'">出款失败，点击详情查看问题</span>
          </p>
          <p><span>金额:</span><span class="blue">{{ item.payment_amount }}</span></p>
          <p class="grey">订单编号: {{ item.bill_no || '无' }}</p>
        </div>
        <span class="dl cancle" v-if="item.status === 'status_created'" @click.stop="cancelOrder(item.id)">取消</span>
      </div>
      <task-tree :orders="item.status_footprints" :status="item.status"></task-tree>
    </div>
  </div>
</template>

<script>
import TaskTree from "@/components/Setting/TaskTree.vue"

export default {
  components: { TaskTree },
  props: ["withdrawals", "methods"],
  methods: {
    goDetail (balanceId) {
      this.$router.push({ name: "BalanceHistory", params: {balanceId} })
    },
    cancelOrder (id) {
      this.$messagebox.confirm("您确定要取消此订单?", "确认取消").then(action => {
        this.api.postCancelOrder(id).then(() => {
          this.methods.fetchWithdrawals()
          this.methods.fetchProfile()
          this.$toast({
            message: "成功取消订单",
            position: "middle",
            duration: 5000
          })
        }).catch((error) => {
          console.log(error)
        })
      }).catch(function (error) { // 解决 它内部使用promise时 抓住异常
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.dl {
  display: inline-block;
}
.block-right {
  width: 80%;
}
.cancle {
  background: $color-yellow;
  padding: 6px 12px;
  border-radius: 5px;
  color: $color-white;
  vertical-align: top;
  margin-top: 10px;
  letter-spacing: 2px;
  word-spacing: 2px;
}
.all {
  padding: 10px;
  width: 100%;
  p {
    padding: 0px;
    margin: 0px;
  }
  .info {
    border-top: $px solid $color-grey2;
    position: relative;
    margin-top: 20px;
    margin-bottom: 15px;
    span {
      position: absolute;
      left: 40%;
      bottom: -7px;
      color: $color-brown;
      font-size: $font-h3-1;
      font-style: italic;
      background-color: $color-grey8;
      padding: 0px 5px;
    }
  }
}
table {
  border-left: $px solid $color-grey1;
  padding: 0px 10px;
  margin: 0px 10px;
  width: 100%;
  td {
    width: 100%;
    border-bottom: $px solid $color-grey1;
    position: relative;
    padding: 10px;
  }
}
.circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: $color-grey1;
  left: -18px;
  top: 12px;
}
.end {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  left: -20px;
}
.success {
  background: radial-gradient($color-green3 30%, $color-green2 50%);
}
.failure {
  background: radial-gradient($color-red 30%, $color-red3 40%);
}
.block {
  width: 100%;
  background-color: $color-white;
  padding: 0px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  .base-info {
    padding-top: 10px;
    padding-bottom: 5px;
    border-bottom: $px solid $color-grey1;
    margin-bottom: 10px;
    p {
      line-height: 1.5em;
    }
  }
  .content {
    padding-bottom: 10px;
    color: $color-grey10;
  }
}
.blue {
  color: $color-blue2;
  padding: 0px 5px;
}
.grey {
  color: $color-grey5;
}
.info-status {
  padding: 10px 0px;
  i {
    color: $color-red6
  }
}
</style>
