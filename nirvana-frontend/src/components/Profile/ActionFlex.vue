<template lang="html">
  <div>
    <div class="profile">
      <mt-cell title="我的账户" is-link to="/setting/balance">
        <span class="profile-account">余额: <span v-if="!$store.state.user.email">-</span><span v-else-if="amount && amount.amount !== ''">{{ amount.amount }}</span><mt-spinner v-else class="fading-circle" type="fading-circle"></mt-spinner></span>
      </mt-cell>
      <div class="block-flex container-flex">
        <router-link to="/setting/deposit">
          <p class="item-flex">
            <span><img src="~assets/images/withdraw.png" width="100%" height="100%"/></span>
            <span class="padding-left">充值</span>
          </p>
        </router-link>
        <router-link to="/setting/withdraw">
          <p class="item-flex">
            <span><img src="~assets/images/deposit.png" width="100%" height="100%"/></span>
            <span class="padding-left">提款</span>
          </p>
        </router-link>
        <router-link to="/setting/balance_histories">
          <p class="item-flex">
            <span><img src="~assets/images/record.png" width="100%" height="100%"/></span>
            <span class="padding-left">交易记录</span>
          </p>
        </router-link>
        <router-link to="/setting/balance">
          <p class="item-flex">
            <span><img src="~assets/images/account.png" width="100%" height="100%"/></span>
            <span class="padding-left">查看账户</span>
          </p>
        </router-link>
      </div>
    </div>
    <div class="profile">
      <mt-cell title="我的活动">
      </mt-cell>
      <div class="block-flex container-flex">
        <router-link to="/setting/likes">
          <p class="item-flex">
            <span><img src="~assets/images/myFavourite.png" width="100%" height="100%"/></span>
            <span class="padding-left">我的收藏</span>
          </p>
        </router-link>
        <router-link to="/setting/lottery">
          <p class="item-flex">
            <span><img src="~assets/images/roulette.png" width="100%" height="100%"/></span>
            <span class="padding-left">每日抽奖</span>
          </p>
        </router-link>
        <router-link to="/setting/points">
          <p class="item-flex">
            <span><img src="~assets/images/my-coin.png" width="100%" height="100%"/></span>
            <span class="padding-left">我的亚太币</span>
          </p>
        </router-link>
        <router-link to="/setting/rebates">
          <p class="item-flex relative">
            <span><img src="~assets/images/rebate.png" width="100%" height="100%"/></span>
            <span class="font-white">我的返水</span>
            <span class="item-badge" v-if="getUserInfo && hasRebates">!</span>
          </p>
        </router-link>
      </div>
      <div class="block-flex container-flex">
        <router-link to="/setting/member_vip">
          <p class="item-flex">
            <span><img src="~assets/images/member.png" width="100%" height="100%"/></span>
            <span class="font-white">VIP特权</span>
          </p>
        </router-link>
        <router-link to="/setting/coupons">
          <p class="item-flex relative">
            <span><img src="~assets/images/coupon-icon.png" width="100%" height="100%"/></span>
            <span class="font-white">我的优惠</span>
            <span class="item-badge" v-if="getUserInfo && hasCoupons">!</span>
          </p>
        </router-link>
        <p class="item-flex">
          <span></span>
          <span></span>
        </p>
        <p class="item-flex">
          <span></span>
          <span></span>
        </p>
        <i></i>
      </div>
      <!--<div class="block-flex container-flex">-->
        <!--to="/setting/member_vip"-->
        <!--<router-link to="">-->
          <!--<p class="item-flex">-->
            <!--<span><img src="~assets/images/member.png" width="100%" height="100%"/></span>-->
            <!--<span>会员中心</span>-->
          <!--</p>-->
        <!--</router-link>-->
        <!--to="/setting/promotions"-->
        <!--<router-link to="">-->
          <!--<p class="item-flex">-->
            <!--<span><img src="~assets/images/promotion.png" width="100%" height="100%"/></span>-->
            <!--<span>优惠活动</span>-->
          <!--</p>-->
        <!--</router-link>-->
        <!--<router-link to="/setting/points">-->
          <!--<p class="item-flex">-->
            <!--<span><img src="~assets/images/my-coin.png" width="100%" height="100%"/></span>-->
            <!--<span>我的亚太币</span>-->
          <!--</p>-->
        <!--</router-link>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  export default {
    props: ["amount"],
    data() {
      return {
        count: null
      };
    },
    computed: {
      ...mapGetters(["getUserInfo"]),
      rebates() {
        return this.platforms.reduce((rebates, platform) => {
          rebates.push(...platform.rebates);
          return rebates;
        }, []);
      },
      hasCoupons() {
        // return !!(this.count && this.count.coupons_count)
        return !!(this.count && this.count.unread_coupons_count);
      },
      hasRebates() {
        return !!(this.count && this.count.unreceived_rebates_count);
      }
    },
    methods: {
      async getCoupons() {
        const { data } = await this.api.getCoupons();
        this.coupons = data.items;
      },
      async getPlatformRebates() {
        const { data } = await this.api.getRebates();
        this.platforms = data.items;
      }
    },
    async mounted() {
      // await Promise.all([this.getCoupons(), this.getPlatformRebates()])
      // await this.getCoupons()
      // await this.getPlatformRebates()
      const { data } = await this.api.counter();
      this.count = data;
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .font-white {
    color: #fff;
  }

  .item-badge {
    position: absolute;
    top: -8px;
    right: 0;
    background: red;
    border-radius: 50%;
    height: 16px;
    min-width: 16px;
    line-height: 8px;
    color: white;
    text-align: center;

    &.disabled {
      background: #222;
    }
  }

  .disabled-grayscale {
    filter: grayscale(1);
  }

  .relative {
    position: relative;
  }

  .mint-cell {
    background-color: $color-blue8;
    color: $color-white;
    font-weight: bold;
  }
  .block-flex {
    background-color: $color-blue8;
    padding: 0.3rem;
    .padding-left {
      position: relative;
      left: 5px;
      color: $color-white;
    }
    p {
      margin: 0px;
      padding: 0px;
      display: inline-block;
      span {
        display: block;
        &:first-child {
          width: 30px;
          height: 30px;
          position: relative;
          left: 20%;
        }
        &:last-child {
          padding-top: 5px;
          text-align: center;
        }
      }
    }
  }
  p {
    padding: 0;
    margin: 0;
  }
  .profile {
    margin: 0.3rem;
    .mint-tabbar > .mint-tab-item {
      background-color: $color-white !important;
    }
    .mint-tabbar {
      position: inherit;
      border-bottom: $px solid #efefef;
    }
  }
  .profile-account {
    display: inline-block;
  }
  .fading-circle {
    display: inline-block;
    vertical-align: middle;
  }
</style>
