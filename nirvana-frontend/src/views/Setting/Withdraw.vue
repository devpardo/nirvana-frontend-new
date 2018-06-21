<template lang="html">
  <div class="body">
    <div class="money">
      <!--基本数据-->
      <div class="introduce" @click="cardsShow()">
        <p class="info">储蓄卡:</p>
        <p class="txt"><span class="name"><i class="fa">{{ bankIcon }}</i>{{ selectedName || '无' }}</span><span class="id">{{ selectedNo }}</span></p>
        <p class="fa fr">{{ arrowIcon }}</p>
      </div>
      <div class="balance">
        <p>提款金额</p>
        <div class="number">
          <span>￥</span>
          <input type="number" class="input" v-model="payment_amount" placeholder="请输入提款金额"/>
        </div>
        <div class="notice">
          <p><span>主账户余额：</span><span>￥{{ profile.main_wallet || '0.0' }}</span></p>
        </div>
        <div class="state">
          <p><span class="fa">{{ infoCircle }}</span>每笔提款金额需大于或者等于<i class="blue">￥100</i></p>
          <p><span class="fa">{{ infoCircle }}</span>每天可提款<i class="blue">{{ profile.maximum_daily_withdraw_times || '0' }}</i>次，提款总额度为<i class="blue">￥{{ profile.maximum_daily_withdraw_amount || '0.0' }}</i></p>
          <p> 您今天已提款<i class="blue">{{ profile.already_daily_withdraw_times || '0' }}</i>次，共计<i class="blue">￥{{ profile.already_daily_withdraw_amount || '0.0' }}</i></p>
        </div>
        <mt-button size="large" :disabled="button" @click="withdraw()">确认并提交</mt-button>
      </div>
    </div>
    <!--提现列表-->
    <withdraw-block v-if="withdrawals.length" :withdrawals="withdrawals" :methods="{ fetchWithdrawals, fetchProfile }"></withdraw-block>
    <!--加载-->
    <data-loading :dataLoad="dataLoad"></data-loading>
    <!--我的银行卡-->
    <action-sheet v-if="selected.show" :show='selected.show' :actions="actions" :select="selected" @handle="getSelectd" @addCard="addCard"></action-sheet>
  </div>
</template>

<script>
import ActionSheet from "@/components/Setting/ActionSheet.vue"
import WithdrawBlock from "@/components/Setting/WithdrawBlock.vue"
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  components: { ActionSheet, WithdrawBlock, DataLoading },
  data () {
    return {
      button: false,
      realname: "",
      payment_amount: "",
      bankIcon: this.$fontawesome("bank"),
      arrowIcon: this.$fontawesome("angle-right"),
      infoCircle: this.$fontawesome("info-circle"),
      selected: { select: 0, show: false, id: "" },
      selectedName: "",
      selectedNo: "",
      actions: [],
      profile: "",
      withdrawals: [],
      dataLoad: {
        flag: true,
        data: ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (this.$store.state.user.email) {
      this.fetchProfile()
      this.getCards()
      this.fetchWithdrawals()
    }
  },
  methods: {
    fetchWithdrawals () {
      this.dataLoad.flag = true
      this.api.getWithdrawals().then((res) => {
        this.withdrawals = res.data && res.data.items
        this.dataLoad.flag = false
      }).catch((error) => {
        this.dataLoad.flag = false
        console.log(error)
      })
    },
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.profile = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    addCard () {
      this.$router.push({ name: "AddBank" })
      localStorage.setItem("banks", 1) // 1表示来自提款 2表示来自个人中心
    },
    getSelectd (data) {
      this.selected.id = data[0]
      this.selectedName = data[1]
      this.selectedNo = data[2]
    },
    getCards () {
      this.api.getBankCards().then((res) => {
        if (res.data.items.length) {
          this.actions = res.data.items
          this.selectedName = res.data.items[0].bank && res.data.items[0].bank.name
          this.selected.id = res.data.items[0].id
          this.realname = res.data.items[0].user && res.data.items[0].user.realname
          this.selectedNo = res.data.items[0].no
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    cardsShow () {
      this.selected.show = true
    },
    withdraw () {
      if (!this.payment_amount) {
        this.$toast({
          message: "请输入充值金额",
          position: "middle",
          duration: 5000
        })
        return false
      } else if (this.payment_amount < 100) {
        this.$toast({
          message: "输入金额最小为100",
          position: "middle",
          duration: 5000
        })
        return false
      }
      if (!this.selected.id) {
        this.$toast({
          message: "请选择储蓄卡",
          position: "middle",
          duration: 5000
        })
        return false
      }
      if ((parseFloat(this.payment_amount)) > (parseFloat(this.profile.maximum_daily_withdraw_amount) - parseFloat(this.profile.already_daily_withdraw_amount))) {
        this.$toast({
          message: "输入金额不符合充值限额",
          position: "middle",
          duration: 5000
        })
        return false
      }
      this.$messagebox.confirm("确认提现?").then(action => {
        this.button = true
        let toast = this.$toast({
          message: "提现中...",
          position: "middle"
        })
        let obj = {
          payment_amount: this.payment_amount,
          payment_method_id: "1",
          bank_card_id: this.selected.id,
          realname: this.realname,
          desc: ""
        }
        this.api.withdraw(obj).then(() => {
          this.button = false
          toast.close()
          this.fetchWithdrawals()
          this.fetchProfile()
          this.$toast({
            message: "提现处理开始,请耐心等候",
            position: "middle",
            duration: 5000
          })
        }).catch((error) => {
          this.button = false
          toast.close()
          console.log(error)
        })
      })
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
.introduce {
  background-color: $color-blue9;
  padding: .3rem;
  min-height: 1.5rem;
  i {
    font-style: normal;
  }
  .info, .txt, .fa {
    display: inline-block;
    color: $color-white;
  }
  .fr {
    margin-top: 4%;
    color: $color-white;
  }
  .txt {
    vertical-align: top;
    padding-left: 10px;
    width: 82%;
    word-wrap: break-word;
    .name {
      color: $color-yellow13;
      font-weight: bold;
    }
    .id {
      font-size: $font-h3;
    }
    .name, .id {
      display: block;
    }
  }
}
.balance {
  margin: .3rem 0;
  p {
    color: $color-white;
    font-weight: bold;
  }
  .notice, .state{
    color: rgba($color-white, .5) !important;
    font-weight: bold;
    padding: 10px 0px;
  }
  .notice {
    border-bottom: $px solid $color-blue9;
  }
  .state {
    p {
      &:last-of-type {
        padding-left: 15px;
      }
    }
    .fa {
      color: $color-blue1;
      padding-right: 5px;
    }
    .blue {
      color: $color-blue1;
      font-style: normal;
    }
  }
}
.money {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  margin: .3rem;
}
.number {
  span {
    font-size: $font-h2;
    color: $color-white;
  }
}
.input {
  display: inline-block;
  width: 90%;
  outline: none;
  border: $px solid rgba($color-blue, .2);
  font-size: $font-h;
  background-color: $color-blue9;
  height: 1.2rem;
  padding: 0 .3rem;
  line-height: .8rem;
  color: $color-yellow13;
  font-weight: bold;
  &::placeholder {
    color: rgba($color-white, .5);
    font-size: $font-h4;
  }
}
.confirm {
  text-align: center;
  color: $color-grey2;
}
.mint-button--large {
  margin: .3rem auto;
  background-color: $color-yellow13;
  font-size: $font-h4;
  color: $color-blue8;
  @include line-height(1.2rem);
  border-radius: 2rem;
  font-weight: bold;
}
</style>
