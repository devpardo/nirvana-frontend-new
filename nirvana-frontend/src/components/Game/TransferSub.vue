<template lang="html">
  <div>
    <div class="all" id="scroll">
      <p class="action">
        <span class="fl" @click="close()">取消</span>
        <span class="title">转入</span>
        <span class="fr" @click="close()">完成</span>
      </p>
      <div class="money">
        <p class="account fl"><span class="fading-circle" v-if="show.amountLoading"><mt-spinner class="fading-circle" type="fading-circle"></mt-spinner></span><span v-else>{{ preview.main_wallet }}</span><span>主账户余额</span></p>
        <span class="arrow fa"><img src="~assets/images/ico-transfer.png" width="100%" height="100%"/></span>
        <p class="account fr"><span class="fading-circle" v-if="show.amountLoading"><mt-spinner class="fading-circle" type="fading-circle"></mt-spinner></span><span v-else>{{ preview.sub_wallet }}</span><span>{{ preview.vendorLabel }}场馆余额</span></p>
      </div>
      <div class="transfer clearfix">
        <p class="txt">
          <span>转账金额</span>
          <span class="info"><span class="fa">{{ infoCircle }}</span>当前场馆最低转账限额为1.00元。</span>
        </p>
        <div class="number">
          <span class="sign">￥</span>
          <input type="text" class="input" :value="show.subMoney" @input="changeV($event)" placeholder="0"/>
        </div>
        <div class="favorable" v-if="preview.adjustments_label">
          <p v-if="show.adjustmentLoading"><mt-spinner class="fading-circle" type="fading-circle"></mt-spinner></p>
          <div v-else>
            <p class="txt favorable-detail">{{ preview.adjustments_label }}</p>
            <p class="txt">总金额: <span class="compute-sum">{{ preview.adjustments_amount }}</span></p>
          </div>
        </div>
        <div @click="limit()" v-if="favorableList.length > 0">
          <mt-cell title="选择转账优惠" class="border-top" is-link>
            <span slot="icon" class="fa cell-icon color-red">{{ gift }}</span>
          </mt-cell>
        </div>
        <p v-else>
          <mt-cell title="无转账优惠" class="border-top">
            <span slot="icon" class="fa cell-icon color-red">{{ gift }}</span>
          </mt-cell>
        </p>
      </div>
      <mt-button type="danger" size="large" @click="sub()" :disabled="show.disabled || !parseFloat(show.subMoney)">确认转账</mt-button>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
import { positiveInteger } from "@/libs/utils.js"

export default {
  props: ["show", "transferFlag", "preview", "favorableList"],
  data () {
    return {
      change: this.$fontawesome("refresh"),
      gift: this.$fontawesome("gift"),
      infoCircle: this.$fontawesome("info-circle")
    }
  },
  methods: {
    changeV (event) {
      this.show.subMoney = event.target.value
      if (this.favorableList.length > 0) {
        if (this.show.currentSelect) {
          this.$emit("reset")
        } else {
          if (parseFloat(this.show.subMoney)) {
            this.show.disabled = false
          }
        }
      } else {
        if (parseFloat(this.show.subMoney)) {
          this.show.disabled = false
        }
      }
    },
    limit () {
      if (!this.show.subMoney || this.show.subMoney === "0") {
        this.$toast({
          message: "输入的转账金额不能为空或零",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!positiveInteger(parseFloat(this.show.subMoney))) {
        this.$toast({
          message: "请您输入整数，去掉小数点",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (parseFloat(this.preview.main_wallet) < parseFloat(this.show.subMoney)) {
        this.$toast({
          message: "输入金额大于主账户余额",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.show.rebate = true
    },
    close () {
      this.transferFlag.sub = false
    },
    sub () {
      this.$emit("transferSub")
    }
  }
}
// input
let u = navigator.userAgent
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 // android终端
if (isAndroid) {
  let beforeHeight = document.documentElement.clientHeight || document.body.clientHeight
  window.addEventListener("resize", function () {
    setTimeout(function () {
      let afterHeight = document.documentElement.clientHeight || document.body.clientHeight
      if ((beforeHeight - afterHeight) > 50) {
      } else {
        if (document.getElementById("scroll") && document.getElementById("scroll").style) {
          document.getElementById("scroll").style.bottom = 0 + "px"
        }
      }
    }, 200)
  })
  window.addEventListener("focusin", function () {
    if (document.getElementById("scroll") && document.getElementById("scroll").style) {
      document.getElementById("scroll").style.bottom = -50 + "px"
    }
  })
  window.addEventListener("focusout", function () {
    if (document.getElementById("scroll") && document.getElementById("scroll").style) {
      document.getElementById("scroll").style.bottom = 0 + "px"
    }
  })
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mint-cell {
  @include line-height(50px);
  border-bottom: $px solid $color-grey;
}
.coupon-limit {
  padding: 10px;
  span {
    color: $color-red;
  }
}
.all {
  background-color: $color-white;
  padding-bottom: 50px;
  // height: 460px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 60;
}
.money {
  padding: 10px 0px;
  width: 100%;
  position: relative;
  .account, .arrow {
    display: inline-block;
  }
  .arrow {
    vertical-align: middle;
    width: 20px;
    height: 16px;
    position: absolute;
    left: 45%;
    top: 32px;
  }
  .fr {
    padding-right: 15px;
  }
  .fl {
    padding-left: 15px;
  }
  .account {
    text-align: center;
    span {
      display: block;
      &:first-child {
        font-size: $font-h1;
        padding-bottom: 5px;
      }
      &:last-child {
        font-size: $font-h5;
        color: $color-grey2;
      }
    }
  }
}
.color-red {
  color: $color-red;
}
.cell-icon {
  font-size: $font-h1;
  vertical-align: bottom;
  line-height: 18px;
}
.input {
  display: inline-block;
  width: 92%;
  outline: none;
  border:none;
  font-size: $font-large;
}
.transfer {
  border-top: $px solid $color-grey4;
  .txt, .number {
    padding-left: 10px;
  }
  .txt {
    .info {
      color: $color-grey2;
    }
    .fa {
      padding-left: 8px;
      padding-right: 3px;
      color: $color-blue1;
    }
  }
  .number {
    .sign {
      font-size: $font-h1;
    }
  }
}
.mint-button--large {
  width: 96%;
  margin: 20px auto;
  font-size: $font-h4;
  @include line-height(40px);
  background-color: $color-blue1;
}
.action {
  margin: 0px;
  padding: 0px 10px;
  text-align: center;
  @include line-height(50px);
  border-bottom: $px solid $color-grey;
  span {
    &:first-child, &:last-child {
      color: $color-blue1;
    }
  }
  .title {
    font-size: $font-h2;
  }
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
}
.fading-circle {
  position: relative;
  left: 14%;
}
.favorable {
  margin-top: 10px;
  border-top: $px solid $color-grey4;
  .favorable-detail {
    color: $color-yellow;
  }
  .compute-sum {
    color: $color-red;
  }
}
</style>
