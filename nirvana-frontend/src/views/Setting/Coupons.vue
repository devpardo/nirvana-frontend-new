<template lang="html">
  <div class="body">
    <div class="coupon-code">
      <p>兑换提示，关注亚太，享受积分兑换好礼.</p>
      <input v-model="code"/>
      <button :disabled="!code" @click="couponCode()">立即兑换</button>
    </div>
    <div v-if="coupons && coupons.length">
      <div class="list" v-for="item in coupons">
        <div class="coupon">
          <span class="dl"><img src="../../assets/images/coupon.png" width="100%" height="100%"></span>
          <span class="title dl">
            <p class="h5">{{ item.promotion_name || '无' }}</p>
            <p class="expired">过期时间: {{ item.expired_at | date('yyyy-MM-dd H:m:s') }}</p>
            <span class="expired">适用平台: </span>
            <span v-if="item.promotion_vendors && item.promotion_vendors.split(',').length">
              <span class="vendor-name" v-for="it in item.promotion_vendors.split(',')">{{ it || '无' }}</span>
            </span>
            <span class="vendor-name" v-else>全部</span>
          </span>
        </div>
        <p class="h6">{{ item.promotion_desc || '无' }}</p>
      </div>
    </div>
    <p v-else-if="!dataLoad.flag" class="no-data">您暂无优惠券</p>
    <data-loading v-if="dataLoad.flag" :dataLoad="dataLoad"></data-loading>
    <!--优惠规则-->
    <div class="questions">
      <div class="question">
        <p class="title"><span class="fa">{{ exclamation }}</span><span>优惠券用途？</span></p>
        <p class="content">增加您的游戏本金，让您玩的尽兴过瘾。</p>
        <p class="title"><span class="fa">{{ exclamation }}</span><span>优惠券获取？</span></p>
        <p class="content">[亚太大转盘]免费抽奖、福利中心活动及线下活动等。</p>
        <p class="title"><span class="fa">{{ exclamation }}</span><span>使用指南？</span></p>
        <p class="content">您在转账至平台时，转账金额下方会出现可以使用的[优惠券]选择并完成转账，奖金会连同本金同时添加至平台账户。</p>
      </div>
    </div>
  </div>
</template>

<script>
  import "@/libs/filters";
  import DataLoading from "@/components/Shared/DataLoading.vue";

  export default {
    data() {
      return {
        coupons: "",
        code: "",
        exclamation: this.$fontawesome("exclamation-circle"),
        dataLoad: {
          flag: true,
          data: "优惠券加载中"
        }
      };
    },
    components: { DataLoading },
    async mounted() {
      let sundry = { navigateTitle: false };
      await this.$store.dispatch("setNavigationTitle", sundry);
      if (!this.$store.getters.getUserInfo) return;
      await this.getCoupons();
    },
    methods: {
      async getCoupons() {
        try {
          this.dataLoad.flag = true;
          const { data } = await this.api.getCoupons();
          this.dataLoad.flag = false;
          if (data.items && data.items.length) {
            this.coupons = data.items;
            await this.api.markCouponsAsRead();
          }
        } catch (error) {
        } finally {
          this.dataLoad.flag = false;
        }
      },
      couponCode() {
        if (!this.code) {
          this.$toast({
            message: "优惠码不能为空",
            position: "middle",
            duration: 5000
          });
          return;
        }
        this.api.postCouponCode({ code: this.code }).then(() => {
          this.$toast({
            message: "领取优惠券成功",
            position: "middle",
            duration: 5000
          });
          this.getCoupons();
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  p {
    margin: 0px;
  }
  button:disabled {
    opacity: 0.5;
  }
  .questions {
    margin-top: 0.3rem;
    background-color: $color-blue8;
    color: rgba($color-white, 0.5);
    padding: 0.5rem 0.3rem;
    p {
      margin: 0px;
    }
    .question {
      letter-spacing: $px;
      text-align: justify;
    }
    .title {
      span {
        &:last-child {
          padding-left: 5px;
          display: inline-block;
          width: 96%;
          vertical-align: top;
          text-align: justify;
        }
      }
    }
    .content {
      padding: 5px 0px;
      padding-left: 17px;
      text-align: justify;
    }
  }
  .coupon-code {
    padding: 20px 10px;
    margin-bottom: 10px;
    background-color: $color-blue8;
    p {
      color: $color-white;
      text-align: center;
    }
    input {
      width: 80%;
      margin: 0.3rem auto;
      background-color: $color-blue9;
      padding: 10px;
      border-radius: 5px;
      border: $px solid rgba($color-blue, 0.2);
      color: $color-white;
      font-weight: bold;
      display: block;
      font-size: $font-h4;
    }
    button {
      display: block;
      margin-top: 10px;
      margin: 0 auto;
      padding: 0.2rem 1rem;
      background-color: $color-yellow13;
      color: $color-blue9;
      font-size: $font-h4;
      font-weight: bold;
      border: none;
      outline: none;
      border-radius: 2rem;
    }
  }
  .no-data {
    color: rgba($color-white, 0.5) !important;
  }
  .dl {
    display: inline-block;
  }
  .h6 {
    color: $color-grey2;
    border-top: $px solid $color-grey7;
    padding: 10px 20px;
  }
  .list {
    width: 100%;
    margin-bottom: 10px;
    background-color: $color-white;
  }
  .coupon {
    padding: 0px 20px;
    padding-top: 20px;
    padding-bottom: 5px;
    img {
      width: 72px;
      height: 72px;
    }
    .title {
      vertical-align: top;
      padding-left: 10px;
      width: 76%;
      .expired {
        color: $color-red1;
      }
      .vendor-name {
        margin-top: 5px;
        margin-right: 5px;
        color: $color-white;
        padding: 2px 10px;
        display: inline-block;
        border-radius: 5px;
        background-color: $color-red2;
      }
    }
    .h5 {
      color: $color-grey5;
      font-size: $font-h4;
      padding-bottom: 5px;
    }
  }
</style>
