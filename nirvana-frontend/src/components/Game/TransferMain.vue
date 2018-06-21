<template lang="html">
  <div>
    <div class="all" id="scroll">
      <p class="action">
        <span class="fl" @click="close()">取消</span>
        <span class="title">转出</span>
        <span class="fr" @click="close()">完成</span>
      </p>
      <div class="money">
        <p class="account fl"><span class="fading-circle" v-if="show.amountLoading"><mt-spinner class="fading-circle" type="fading-circle"></mt-spinner></span><span v-else>{{ preview.sub_wallet }}</span><span>{{ preview.vendorLabel }}场馆余额</span></p>
        <span class="arrow"><img src="~assets/images/ico-transfer.png" width="100%" height="100%"/></span>
        <p class="account fr"><span class="fading-circle" v-if="show.amountLoading"><mt-spinner class="fading-circle" type="fading-circle"></mt-spinner></span><span v-else>{{ preview.main_wallet }}</span><span>主账户余额</span></p>
      </div>
      <div class="transfer clearfix">
        <p class="txt">
          <span>转账金额</span>
          <span class="info"><span class="fa">{{ infoCircle }}</span>当前场馆最低转账限额为1.00元。</span>
        </p>
        <div class="number">
          <span class="sign">￥</span>
          <input type="number" class="input" v-model.number="preview.base_amount" placeholder="0"/>
        </div>
      </div>
      <mt-button type="danger" size="large" @click="main()" :disabled="show.mainDisabled">确认转账</mt-button>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
export default {
  props: ["show", "transferFlag", "preview"],
  data () {
    return {
      change: this.$fontawesome("refresh"),
      infoCircle: this.$fontawesome("info-circle")
    }
  },
  watch: {
    "preview.base_amount": function (n) {
      if (!n || n === "0") {
        this.show.mainDisabled = true
      } else {
        this.show.mainDisabled = false
      }
    }
  },
  methods: {
    close () {
      this.transferFlag.main = false
    },
    main () {
      this.$emit("transferMain", this.preview.base_amount)
    }
  }
}
// input
let u = navigator.userAgent
let isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1 // android终端
if (isAndroid) {
  let beforeHeight = document.documentElement.clientHeight || document.body.clientHeight
  window.addEventListener("resize", function () {
    let afterHeight = document.documentElement.clientHeight || document.body.clientHeight
    if ((beforeHeight - afterHeight) > 50) {
    } else {
      if (document.getElementById("scroll") && document.getElementById("scroll").style) {
        document.getElementById("scroll").style.top = "initial"
      }
    }
  })
  window.addEventListener("focusin", function () {
    if (document.getElementById("scroll") && document.getElementById("scroll").style) {
      document.getElementById("scroll").style.top = -50 + "px"
    }
  })
  window.addEventListener("focusout", function () {
    if (document.getElementById("scroll") && document.getElementById("scroll").style) {
      document.getElementById("scroll").style.top = "initial"
    }
  })
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.all {
  background-color: $color-white;
  padding-bottom: 50px;
  // height: 338px;
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
.input {
  display: inline-block;
  width: 92%;
  outline: none;
  border:none;
  font-size: $font-large;
}
.transfer {
  border-top: $px solid $color-grey4;
  border-bottom: $px solid $color-grey4;
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
  @include line-height(40px);
  margin: 20px auto;
  font-size: $font-h4;
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
.fading-circle {
  position: relative;
  left: 14%;
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
</style>
