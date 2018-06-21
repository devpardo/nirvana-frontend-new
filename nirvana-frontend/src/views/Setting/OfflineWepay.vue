<template lang="html">
  <div class="body">
    <div class="wechat-pay">
      <p class="check_circle"><span class="fa">{{ check_circle }}</span>您的订单及二维码已生成如下：</p>
      <div class="bg-white">
        <div class="gray">转账金额：<span class="red">{{ billObj.payment_amount || '--' }}</span></div>
        <div class="gray">交易备注码：<span class="red">{{ billObj.bill_no && billObj.bill_no.slice(-4) || '--' }}</span></div>
        <p class="info red"><span class="fa">{{ exclamation_circle }}</span><span>请务必牢记您的【转账金额】和【交易备注码】，保存屏幕截图后前往微信使用扫一扫扫描截图中的二维码进行支付。</span></p>
      </div>
      <div class="img">
        <img v-lazy="billObj.payment_method && billObj.payment_method.aws_url" width="100%" height="100%" />
        <img v-if="type === 'wxpay'" src="../../assets/images/wechat-demo-1.png" width="100%" height="100%"/>
        <img v-else-if="type === 'alipay'" src="../../assets/images/alipay-demo.png" width="100%" height="100%">
      </div>
      <p class="info red"><span class="fa">{{ exclamation_circle }}</span><span>请自行将本页截图并扫描其中二维码，扫描成功后，会有支付页面。</span></p>
      <p class="info red"><span class="fa">{{ exclamation_circle }}</span><span>请按照上图所示填写【转账金额】与【交易备注码】后转账，系统将会在30秒内完成支付。</span></p>
      <p class="info gray"><span class="blue fa">{{ exclamation_circle }}</span><span>若30秒后尚未到账，请及时联系 <i class="blue">在线客服</i>。</span></p>
      <!--<button></button>-->
    </div>
    <div class="pop-mask" v-if="flag">
      <div class="pop-info gray">
        <p class="h1"><span v-if="type === 'wxpay'">微信扫码</span><span v-else-if="type === 'alipay'">支付宝扫码</span>成功率<span class="red">100%</span></p>
        <p class="h1">单笔<span class="red">10元 - 10000元</span></p>
        <p class="h1 padding-bottom">（本页面只支持<span class="green" v-if="type === 'wxpay'">微信扫码</span><span class="blue" v-else-if="type === 'alipay'">支付宝扫码</span>入款）</p>
        <p class="h3"><span class="red">注意：</span>每次付款请扫描最新入款二维码，保存的二维码请勿二次使用！</p>
        <p class="h3"><span class="red">特别提醒：</span>会员支付时，一定要备注页面提供的交易备注码，如无备注或备注错误，系统将无法为您即时入款，请各位会员配合。感谢您对亚太娱乐的支持！</p>
        <span class="button" @click="close">我知道了</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      check_circle: this.$fontawesome("check-circle"),
      exclamation_circle: this.$fontawesome("exclamation-circle"),
      billObj: {},
      type: this.$route.params.type || "",
      flag: true,
      disabled: false
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.getBill()
  },
  methods: {
    close () {
      this.flag = false
    },
    save () {
      this.disabled = true
      this.$toast({
        message: "屏幕截图成功，请自行前往微信扫描截图中的二维码",
        position: "middle",
        duration: 5000
      })
    },
    getBill () {
      let id = this.$route.params.billNo || ""
      if (!id) return
      this.api.getOrder(id).then((res) => {
        this.billObj = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

i {
  font-style: normal;
}
button:disabled {
  opacity: 0.5;
}
.wechat-pay {
  padding: 10px;
  padding-top: 0px;
  button {
    display: block;
    outline: none;
    width: 90%;
    margin: 15px auto;
    background-color: $color-blue1;
    color: $color-white;
    font-size: $font-h4;
    text-align: center;
    padding: 13px 10px;
    border-radius: 5px;
  }
  .info {
    span {
      display: inline-block;
      &:first-of-type {
        font-size: $font-h4;
        width: 5%;
      }
      &:last-of-type {
        vertical-align: top;
        font-size: $font-h5;
        font-weight: bold;
        width: 92%;
      }
    }
  }
  .check_circle {
    color: $color-blue2;
    font-size: $font-h4;
    font-weight: bold;
    .fa {
      padding-right: 5px;
    }
  }
  .bg-white {
    background-color: $color-white;
    padding: 5px 10px;
    border: $px solid $color-grey1;
    .gray {
      .red {
        font-size: $font-h;
        font-weight: bold;
        word-wrap: break-word;
        word-break: break-all;
      }
    }
  }
  .img {
    padding: 15px 0px;
    img {
      &:first-of-type {
        width: 160px;
        height: 160px;
        margin-right: 2%;
      }
      &:last-of-type {
        width: 175px;
        height: 202px;
      }
    }
  }
}
.pop-mask {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background: rgba(0, 0, 0, 0.5);
  .pop-info {
    p { padding: 0px; margin: 0px }
    .h1 {
      font-size: $font-h1;
      font-weight: bold;
      text-align: center;
    }
    .h3 {
      font-size: $font-h4;
      font-weight: bold;
    }
    .padding-bottom {
      padding-bottom: 5px;
    }
    background-color: $color-white;
    width: 96%;
    position: absolute;
    top: 25%;
    left: 2%;
    padding: 10px;
    border-radius: 6px;
    .button {
      display: block;
      margin: 15px auto;
      background-color: $color-blue1;
      color: $color-white;
      text-align: center;
      padding: 10px;
      width: 50%;
      border-radius: 20px;
    }
  }
}
.red {
  color: $color-red5;
}
.green {
  color: $color-green3;
}
.gray {
  color: $color-grey9;
}
.blue {
  color: $color-blue1;
}
</style>
