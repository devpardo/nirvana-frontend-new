<template lang="html">
  <div class="body" id="bank">
    <p class="alert">只可添加储蓄卡。</p>
    <div class="money">
      <mt-field placeholder="持卡人姓名" v-model="realname" :disabled="realnameFlag" class="border-bottom"></mt-field>
      <mt-field placeholder="银行卡号" v-model="bankNo" class="border-bottom"></mt-field>
      <div class="introduce border-bottom" @click="getCards()">
        <p class="info">银行名称:</p>
        <p class="txt"><span class="name">{{ bankName }}</span></p>
        <p class="fa fr">{{ arrowIcon }}</p>
      </div>
      <mt-field placeholder="银行支行" v-model="desc"></mt-field>
      <mt-button size="large" :disabled="(button || !realname) && !bankNo && !selected" @click="addBankCard()">确认并提交</mt-button>
    </div>
  </div>
</template>
<script>
import { regularExpression } from "@/libs/utils.js"

export default {
  data () {
    return {
      button: false,
      realname: "",
      reminder: "",
      realnameFlag: false,
      bankNo: "",
      bankName: "请点击选择",
      arrowIcon: this.$fontawesome("angle-right"),
      selected: "",
      desc: ""
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchProfile()
    if (localStorage.getItem("selectFromBanksId")) {
      this.bankName = localStorage.getItem("selectFromBanksId").split(",")[1]
    }
    if (sessionStorage.getItem("realname")) {
      this.realname = sessionStorage.getItem("realname")
    }
    if (sessionStorage.getItem("bankNo")) {
      this.bankNo = sessionStorage.getItem("bankNo")
    }
    if (sessionStorage.getItem("desc")) {
      this.desc = sessionStorage.getItem("desc")
    }
  },
  methods: {
    fetchProfile () {
      this.amountLoading = true
      this.api.getProfile().then((res) => {
        this.realname = res.data.realname
        if (res.data.realname) {
          this.realnameFlag = true
        } else {
          this.button = true
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getCards () {
      sessionStorage.setItem("realname", this.realname)
      sessionStorage.setItem("bankNo", this.bankNo)
      sessionStorage.setItem("desc", this.desc)
      this.$router.push({ name: "SelectBank" })
    },
    addBankCard () {
      if (localStorage.getItem("selectFromBanksId")) {
        this.selected = localStorage.getItem("selectFromBanksId").split(",")[0]
      }
      if (!this.selected) {
        this.$toast({
          message: "请选择银行",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!this.realname) {
        this.$toast({
          message: "开户姓名不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!this.bankNo) {
        this.$toast({
          message: "银行卡号不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!regularExpression("bank", this.bankNo)) {
        this.$toast({
          message: "银行卡号格式错误",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.button = true
      let ob = {
        no: this.bankNo,
        realname: this.realname,
        bank_id: this.selected,
        desc: this.desc,
        is_primary: true
      }
      this.api.postBankCards(ob).then(() => {
        this.button = true
        localStorage.removeItem("selectFromBanksId")
        let from = localStorage.getItem("banks") // 1表示来自提款 2表示来自个人中心
        if (from) {
          if (parseInt(from) === 1) {
            this.$router.push({ name: "Withdraw" })
          } else if (parseInt(from) === 2) {
            this.$router.push({ name: "Banks" })
          }
        }
        this.$toast({
          message: "添加银行卡成功",
          position: "middle",
          duration: 5000
        })
        sessionStorage.clear()
      }).catch((error) => {
        this.button = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/stylesheets/public';
  #bank {
    .mint-cell-wrapper {
      background-color: $color-blue9 !important;
      border: 2px solid $color-blue9 !important;
      .mint-cell-value > input {
        background-color: $color-blue9 !important;
        color: $color-white;
        font-weight: bold;
      }
    }
  }
</style>
<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  padding: 0px;
  margin: 0px;
}
.border-bottom {
}
.dl {
  display: inline-block;
}
.drop-down-bank {
  padding: 10px;
  border-top: $px solid $color-grey;
  font-size: $font-h4;
  .bank-title {
    padding-left: 10px;
  }
  .bank-name {
    background-color: $color-blue;

  }
}
.alert {
  color: $color-red;
  background-color: $color-yellow13;
  @include line-height(20px);
  width: 100%;
  padding: 0 .3rem;
}
.introduce {
  padding: .3rem;
  i {
    font-style: normal;
  }
  .info {
    color: $color-white;
    font-weight: bold;
  }
  .info, .txt, .fa {
    display: inline-block;
    font-size: $font-h4;
  }
  .fr {
    margin-top: 4%;
    color: $color-grey2;
  }
  .txt {
    width: 75%;
    text-align: right;
    padding: 10px;
    .name {
      color: $color-blue1;
    }
  }
}
.money {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  margin: .3rem;
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
