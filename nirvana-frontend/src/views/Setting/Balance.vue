<template lang="html">
  <div class="body">
    <!--基本信息-->
    <div class="balance">
      <p>账户余额(元)</p>
      <p class="money"><mt-spinner type="triple-bounce" v-if="!profileAmopunt"></mt-spinner><span v-else>{{ profileAmopunt }}</span></p>
      <p>平均充值到账时间< 2分钟 / 平均提现到账时间< 5分钟</p>
    </div>
    <!--基本操作-->
    <div>
      <p>
        <mt-cell title="充值" is-link to="/setting/deposit">
          <span class="img" slot="icon"><img slot="icon" src="~assets/images/withdraw.png" width="100%" height="100%"></span>
        </mt-cell>
      </p>
      <p>
        <mt-cell title="提款" is-link to="/setting/withdraw">
          <span class="img" slot="icon"><img slot="icon" src="~assets/images/deposit.png" width="100%" height="100%"></span>
        </mt-cell>
      </p>
    </div>
    <!--平台列表-->
    <block-list :subWallets="subWallets" @transferIn="transferIn" @transferOut="transferOut"></block-list>
    <p v-if="loading" class="loading"><mt-spinner type="fading-circle" class="load-position"></mt-spinner><span class="load-txt">加载中</span></p>
     <!--转入转出-->
    <transfer :parameter='transferParameter.vendorCode' :vendorName="transferParameter.vendorName" :transferFlag="transferFlag" :resetAccount='resetAccount' v-if="transferFlag.sub || transferFlag.main"></transfer>

  </div>
</template>

<script>
import BlockList from "@/components/Setting/BlockList.vue";
import Transfer from "@/components/Shared/Transfer.vue";

export default {
  data() {
    return {
      profileAmopunt: "",
      subWallets: [],
      temObj: "",
      loading: true,
      transferParameter: {
        vendorName: "",
        vendorCode: ""
      },
      transferFlag: {
        main: false,
        sub: false
      }
    };
  },
  components: { BlockList, Transfer },
  mounted() {
    let sundry = { navigateTitle: false };
    this.$store.dispatch("setNavigationTitle", sundry);

    this.fetchProfileAmount();
  },
  methods: {
    fetchProfileAmount() {
      this.api
        .getProfileAmount()
        .then(async res => {
          this.profileAmopunt = res.data.main_wallet.amount;
          this.subWallets = await Promise.all(
            res.data.sub_wallets.map(async subWallet => {
              try {
                const { data } = await this.api.getVendorAmount(subWallet.code);
                console.log(data);
                subWallet.amount = data.amount || 0;
              } catch (e) {
                console.log(e);
              } finally {
                subWallet.amount = subWallet.amount || 0;
              }

              return subWallet;
            })
          );
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error);
        });
    },
    // transfer
    transferIn(item) {
      this.transferParameter.vendorName = item.label;
      if (this.$store.state.user.email) {
        this.transferParameter.vendorCode = item.code;
        // 放在这里是为了不刷新页面便可请求组件里需要的接口调用
        this.temObj = item;
        this.transferFlag.sub = true;
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true });
      }
    },
    transferOut(item) {
      this.transferParameter.vendorName = item.label;
      if (this.$store.state.user.email) {
        this.transferParameter.vendorCode = item.code;
        // 放在这里是为了不刷新页面便可请求组件里需要的接口调用
        this.temObj = item;
        this.transferFlag.main = true;
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true });
      }
    },
    resetAccount(obj) {
      this.profileAmopunt = obj.main_wallet || 0;
      if (this.temObj) {
        this.temObj.amount = obj.sub_wallet;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/stylesheets/public";

p {
  padding: 0;
  margin: 0;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.balance {
  width: 100%;
  padding: 0.5rem 0.3rem;
  min-height: 167px;
  position: relative;
  background-color: $color-blue9;
  p {
    &:first-child {
      color: $color-white;
    }
    &:last-child {
      width: 100%;
      @include line-height(36px);
      background-color: rgba($color-white, 0.1);
      color: $color-white;
      padding: 0px 0.3rem;
      position: absolute;
      bottom: 0px;
      left: 0px;
      right: 0px;
    }
  }
  .money {
    color: $color-white;
    font-size: $font-largest;
    font-weight: bold;
    word-wrap: break-word;
  }
}
.loading {
  text-align: center;
}
.load-position {
  margin: 0 auto;
  display: inline-block;
  left: -5px;
  top: 5px;
  position: relative;
}
.load-txt {
  position: relative;
  top: -5px;
}
p > .mint-cell {
  background-color: $color-blue8 !important;
  color: $color-white;
  padding: 0.1rem 0.3rem;
}
</style>
