<template lang="html">
  <div class="content">
    <table v-if="orders && orders.length > 0">
      <tr v-for="item in orders">
        <td>
          <span v-if="item.after.status === 'status_failed'" class="circle failure end"></span>
          <span v-else class="circle" :class="{ 'success end': status === item.after.status }"></span>
          <span class="bl" v-if="item.after.status === 'status_created'">订单已提交，正在等待受理</span>
          <span class="bl" v-else-if="item.after.status === 'status_pended'">订单已接受，正在审核</span>
          <span class="bl" v-else-if="item.after.status === 'status_checked'">订单审核通过，正在出款操作</span>
          <span class="bl" v-else-if="item.after.status === 'status_processing'">正在出款</span>
          <span class="bl" v-else-if="item.after.status === 'status_completed'">出款成功，感谢您的耐心等候</span>
          <span class="bl" v-else-if="item.after.status === 'status_succeeful'">支付成功，感谢您的耐心等候</span>
          <span class="bl" v-else-if="item.after.status === 'status_canceled'">您已取消订单</span>
          <span class="bl" v-else-if="item.after.status === 'status_expired'">您的订单已过期</span>
          <span class="bl" v-else-if="item.after.status === 'status_failed'">出款失败</span>
          <span class="bl">{{ item.created_at | date }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import "@/libs/filters"

export default {
  props: ["orders", "status"]
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.bl {
  display: block;
}
.content {
  padding-bottom: 10px;
  color: rgba($color-white, .5);
}
table {
  border-left: $px solid $color-blue9;
  padding: 0px 10px;
  margin: 0px 10px;
  width: 100%;
  td {
    width: 100%;
    position: relative;
    padding: 10px;
  }
}
.circle {
  position: absolute;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background-color: $color-blue9;
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
  background: radial-gradient($color-yellow13 30%, rgba($color-yellow13, .5) 50%);
}
.failure {
  background: radial-gradient($color-red 30%, $color-red3 40%);
}
</style>
