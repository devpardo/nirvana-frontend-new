<template lang="html">
  <div class="body">
    <div class="detail" v-if="balanceDetail">
      <p class="clearfix">
        <span class="fl">交易号:</span><span class="fr">{{ balanceDetail.bill_no || '无' }}</span>
      </p>
      <p class="clearfix">
        <span class="fl">交易日期:</span><span class="fr">{{ balanceDetail.created_at | date('yyyy-MM-dd H:m:s')  || '无' }}</span>
      </p>
      <p class="clearfix">
        <span class="fl">交易状态:</span>
        <span class="fr" v-if="balanceDetail.status === 'status_created'">新建</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_checked'">检查通过</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_processing'">处理中</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_pended'">待支付，等待中</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_completed'">已完成</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_succeeful'">支付成功</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_failed'">失败</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_canceled'">取消</span>
        <span class="fr" v-else-if="balanceDetail.status === 'status_expired'">过期</span>
      </p>
      <p class="clearfix">
        <span class="fl">类型:</span>
        <span class="fr" v-if="balanceDetail.balance_type === 'balance_deposit'">充值</span>
        <span class="fr" v-else-if="balanceDetail.balance_type === 'balance_withdraw'">提款</span>
        <span class="fr" v-else-if="balanceDetail.balance_type === 'balance_rebate'">返水</span>
        <span class="fr" v-else-if="balanceDetail.balance_type === 'balance_bonus'">奖金</span>
        <span class="fr" v-else-if="balanceDetail.balance_type === 'balance_transfer_main'">转出</span>
        <span class="fr" v-else-if="balanceDetail.balance_type === 'balance_transfer_sub'">转入</span>
      </p>
      <p class="clearfix" v-if="balanceDetail.base_amount && parseFloat(balanceDetail.base_amount)">
        <span class="fl">金额:</span><span class="fr">{{ balanceDetail.base_amount || '无' }}</span>
      </p>
      <p class="clearfix" v-if="balanceDetail.total_amount && parseFloat(balanceDetail.promo_amount)">
        <span class="fl">优惠金额:</span><span class="fr">{{ balanceDetail.promo_amount || '无' }}</span>
      </p>
      <p class="clearfix" v-if="balanceDetail.total_amount && parseFloat(balanceDetail.total_amount)">
        <span class="fl">总金额:</span><span class="fr">{{ balanceDetail.total_amount || '无' }}</span>
      </p>
      <p class="clearfix" v-if="balanceDetail.order && balanceDetail.order.remark">
        <span class="fl">备注:</span><span class="fr">{{ balanceDetail.order.remark || '无' }}</span>
      </p>
      <div v-if="balanceDetail.manual_adjustment">
        <p class="clearfix">
          <span class="fl">信息描述:</span><span class="fr">{{ balanceDetail.manual_adjustment.label || '无' }}</span>
        </p>
      </div>
      <div v-if="balanceDetail.transfer">
        <p class="clearfix">
          <span class="fl">交易平台:</span><span class="fr">{{ balanceDetail.transfer.vendor_name || '无' }}</span>
        </p>
        <p class="clearfix" v-if="balanceDetail.transfer.promotion_name">
          <span class="fl">优惠名字:</span><span class="fr">{{ balanceDetail.transfer.promotion_name || '无' }}</span>
        </p>
        <div v-if="balanceDetail.transfer.adjustments">
          <h4>优惠附加信息</h4>
          <div v-for="item in balanceDetail.transfer.adjustments">
            <p class="clearfix">
              <span class="fl">优惠说明:</span><span class="fr">{{ item.label || '无' }}</span>
            </p>
            <p class="clearfix">
              <span class="fl">交易货币:</span><span class="fr">{{ item.adjustable.currency || '无' }}</span>
            </p>
          </div>
        </div>
        <div v-if="balanceDetail.transfer.wager">
          <h4>wager</h4>
          <p class="clearfix">
            <span class="fl">锁定时间:</span><span class="fr">{{ balanceDetail.transfer.wager.locked_at | date('yyyy-MM-dd H:m:s') || '无' }}</span>
          </p>
          <p class="clearfix">
            <span class="fl">已完成金额:</span><span class="fr">{{ balanceDetail.transfer.wager.wager_amount || '无' }}</span>
          </p>
          <p class="clearfix">
            <span class="fl">投注需求金额:</span><span class="fr">{{ balanceDetail.transfer.wager.wager_requirement || '无' }}</span>
          </p>
        </div>
      </div>
      <div v-if="balanceDetail.order && balanceDetail.order.footprints" class="balanceDetail">
        <h5>订单记录</h5>
        <task-tree :orders="balanceDetail.order.footprints" :status="balanceDetail.order.status"></task-tree>
      </div>
    </div>
  </div>
</template>

<script>
import "@/libs/filters"
import TaskTree from "@/components/Setting/TaskTree.vue"

export default {
  components: { TaskTree },
  data () {
    return {
      balanceDetail: ""
    }
  },
  computed: {
    balanceId () {
      return this.$route.params.balanceId
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchBalanceDetail()
  },
  methods: {
    fetchBalanceDetail () {
      this.api.getBalancehistory(this.balanceId).then((res) => {
        this.balanceDetail = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  background-color: $color-blue9;
}
.balanceDetail {
  border-top: $px solid $color-blue9;
  margin-top: 15px;
  padding-top: 20px;
  h5 {
    color: $color-white;
  }
}
.detail {
  background-color: $color-blue8;
  margin: 0 .3rem;
  padding: .3rem;
  .fr, fl {
    display: inline-block;
  }
  .fl {
    color: $color-white;
  }
  .fr {
    color: $color-yellow13;
    display: inline-block;
    max-width: 86%;
    word-wrap: break-word;
  }
  p {
    line-height: 1.2;
  }
}
</style>
