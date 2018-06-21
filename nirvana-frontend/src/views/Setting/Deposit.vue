<template lang="html">
  <div class="body">
    <div v-if="payWayList.length">
      <div class="money" v-if="payWayList[payway].payment_type !== 'payment_offline' || currentItem.payment_type === 'payment_offline_bank' || currentItem.payment_type === 'payment_offline_wxpay' || currentItem.payment_type === 'payment_offline_alipay'">
        <p>充值金额</p>
        <div class="number">
          <span>￥</span>
          <input type="number" class="input" v-model="payment_amount" placeholder="请输入充值金额"/>
          <span class="promo-number" v-if="promoAmount">可获得{{promoAmount}}元返利红包。</span>
        </div>
        <p class="info"><span>主账户余额：</span><span>￥{{ profile.main_wallet || '0.0' }}</span></p>
        <p class="info"><span>每笔充值限额为：</span><span>￥{{ input_amount_min || '0.0' }}~￥{{ input_amount_max || '0.0' }}</span></p>
      </div>
      <div class="money">
        <p>请选择充值方式</p>
        <mt-tabbar v-model="payway">
          <mt-tab-item v-for="(item, index) in payWayList" :id="index" :key="index" @click.native="getOfflines(item)">
            <div @click="getLimitAmount(index)">
              <span class="img"><img slot="icon" v-lazy="item.image_url" width="30"  height="31"/></span>
              <span class="color">{{ item.name }}</span>
            </div>
          </mt-tab-item>
        </mt-tabbar>
        <mt-tab-container v-model="payway">
          <mt-tab-container-item v-for="(item, i) in payMethods" :id="i" :key="i">
            <mt-radio align="right" @click.native="getLimitAmount(i, $event)" v-model="payValue[i]" :options="item"></mt-radio>
            <div v-if="payBanks.length">
              <div v-for="bank in payBanks" v-if="bank.index === i && bank.childIndex === childIndex">
                <mt-radio class="banksRadio" align="right" v-model="bank.value" :options="bank.arr"></mt-radio>
              </div>
            </div>
            <div v-if="QRCode && QRCode.length && QRCodeFlag">
              <div class="transfer-bank" v-if="currentItem.payment_type === 'payment_offline_bank'">
                <p class="bank-title">您的银行帐号</p>
                <div class="input-bank">
                  <p><i>银行名称: </i><span><input v-model="bank.user_bank_name" placeholder="必填"/></span></p>
                  <p><i>银行卡号: </i><span><input v-model="bank.user_bank_no" placeholder="输入银行卡后四位(选填)"/></span></p>
                  <p><i>持卡人姓名: </i><span><input v-model="bank.realname" placeholder="必填"/></span></p>
                </div>
                <p class="fa">{{ arrow_down }}</p>
              </div>
              <div v-for="item in QRCode" v-show="item.flag && item.bank_no">
                <p class="bank-title">官方银行帐号</p>
                <div class="banks">
                  <p>持卡人姓名: <span>{{ item.bank_realname }}</span></p>
                  <p>银行名称:  <span>{{ item.bank_name }}</span></p>
                  <p>银行卡号: <span>{{ item.bank_no }}</span></p>
                </div>
              </div>
              <div class="QR-code" v-for="item in QRCode" v-show="item.flag && !item.bank_no && item.payment_type !== 'payment_offline_wxpay' && item.payment_type !== 'payment_offline_alipay'">
                <img v-lazy="item.image_url" width="100%"  height="100%"/>
              </div>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
        <mt-button :disabled="button" size="large" @click="handleDeposit()" v-if="!QRCodeFlag || currentItem.payment_type === 'payment_offline_bank' || currentItem.payment_type === 'payment_offline_wxpay' || currentItem.payment_type === 'payment_offline_alipay'">确认并提交</mt-button>
        <p class="confirm" v-if="QRCodeFlag">完成支付后，请联系在线客服进行额度添加。</p>
        <p class="confirm" v-else>充值金额将在5分钟内到账，请耐心等候。</p>
      </div>
    </div>
    <div v-else-if="!dataLoad.flag">
      <p class="no-data">您暂未有任何充值方式</p>
    </div>
    <data-loading :dataLoad="dataLoad"></data-loading>
  </div>
</template>

<script>
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  data () {
    return {
      arrow_down: this.$fontawesome("arrow-down"),
      button: false,
      payment_amount: "",
      payWayList: "",
      payMethods: [],
      payBanks: [],
      payValue: [],
      childIndex: 0,
      payway: 0,
      QRCode: "",
      QRCodeFlag: false,
      httpWay: "",
      profile: "",
      input_amount_max: "",
      input_amount_min: "",
      currentItem: "",
      dataLoad: {
        flag: true,
        data: "数据加载中"
      },
      bank: {
        realname: "",
        user_bank_no: "",
        user_bank_name: ""
      }
    }
  },
  computed: {
    promoAmount () {
      let val = this.currentItem && this.payment_amount && this.currentItem.promo_rate && (this.payment_amount * this.currentItem.promo_rate).toFixed(2)
      return (val && val > 0) ? val : 0
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (this.$store.state.user.email) {
      this.getPayWay()
      this.fetchProfile()
    }
  },
  components: { DataLoading },
  methods: {
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.profile = res.data
      }).catch((error) => {
        console.log(error)
      })
    },
    setQRCode (arr, i) {
      if (arr && arr.length) {
        arr.forEach((item, index) => {
          if (index === i) {
            item.flag = true
          } else {
            item.flag = false
          }
        })
      }
    },
    getIndex (arr, value) {
      let index = -1
      for (let n = 0; n < arr.length; n++) {
        if (arr[n].name === value) {
          index = n
          break
        }
      }
      return index
    },
    getOfflines (item) {
      if (item.payment_type === "payment_offline") {
        let arr = []
        item.payment_methods.forEach(function (v, index) {
          let tmpQRCodeFlag = ""
          if (index === 0) {
            tmpQRCodeFlag = true
          } else {
            tmpQRCodeFlag = false
          }
          v.flag = tmpQRCodeFlag
          arr.push(v)
        })
        this.QRCode = arr
      }
    },
    getLimitAmount (i, eve) {
      if (eve) {
        if (eve.srcElement.value) {
          let name = eve.srcElement.value
          let arrs = this.payWayList[i].payment_methods
          let index = this.getIndex(arrs, name)
          if (index !== -1) {
            this.setQRCode(this.QRCode, index)
            this.childIndex = index
            this.currentItem = arrs[index]
            this.input_amount_max = this.currentItem.input_amount_max
            this.input_amount_min = this.currentItem.input_amount_min
          }
        }
      } else {
        if (this.payWayList[i].payment_type === "payment_offline") { // payment_type
          this.QRCodeFlag = true
        } else {
          this.QRCodeFlag = false
        }
        let ob = this.payWayList[i].payment_methods[0]
        this.currentItem = ob
        if (this.payValue[i]) {
          let index = this.getIndex(this.payWayList[i].payment_methods, this.payValue[i])
          if (index !== -1) {
            this.childIndex = index
            this.setQRCode(this.QRCode, index)
          }
        }
        this.input_amount_max = ob.input_amount_max
        this.input_amount_min = ob.input_amount_min
      }
    },
    getPayWay () {
      this.api.getProfile().then((res) => {
        this.payWayList = res.data.payment_method_categories
        // according min-ui handle logic
        let _this = this
        this.payWayList.forEach(function (items, index) {
          let arr = []
          if (index === 0) {
            if (items.payment_type === "payment_offline") { // payment_type
              _this.QRCodeFlag = true
            }
            _this.getOfflines(items)
          }
          items.payment_methods.forEach(function (item, i) {
            let banksOb = {}
            if (i === 0) {
              _this.payValue[index] = item.name
              if (index === 0) {
                _this.currentItem = item
                _this.input_amount_max = item.input_amount_max
                _this.input_amount_min = item.input_amount_min
              }
            }
            if (items.payment_type === "payment_online") {
              if (item.banks && item.banks.length) {
                let bankTem = []
                item.banks.forEach((v) => {
                  bankTem.push(v.name)
                })
                banksOb = {
                  arr: bankTem,
                  index: index,
                  childIndex: i,
                  value: item.banks[0].name // 网银支付之银行选择初始化
                }
                _this.payBanks.push(banksOb)
              }
            }
            arr.push(item.name)
          })
          _this.payMethods.push(arr)
        })
        this.dataLoad.flag = false
      }).catch((error) => {
        this.dataLoad.flag = false
        console.log(error)
      })
    },
    getBanksId (name, arr) {
      let len = arr.length
      let flag = false
      let i = 0
      for (i; i < len; i++) {
        if (arr[i].name === name) {
          flag = true
          break
        }
      }
      if (flag) {
        return arr[i].id
      } else {
        return -1
      }
    },
    handleDeposit () {
      if (!this.payment_amount) {
        this.$toast({
          message: "请输入充值金额",
          position: "middle",
          duration: 5000
        })
        return false
      }
      if (this.payWayList === "" || !this.payWayList.length) {
        this.$toast({
          message: "您目前的账户层级不能拥有任何充值方式",
          position: "middle",
          duration: 5000
        })
        return false
      }
      if ((parseFloat(this.payment_amount) > parseFloat(this.input_amount_max)) || (parseFloat(this.payment_amount) < parseFloat(this.input_amount_min))) {
        this.$toast({
          message: "输入金额不符合充值限额",
          position: "middle",
          duration: 5000
        })
        return false
      }
      let offlineBank = false
      if (this.currentItem.payment_type === "payment_offline_bank") { offlineBank = true }
      if (offlineBank) {
        if (!this.bank.realname || !this.bank.user_bank_name) {
          this.$toast({
            message: "请完善【您的银行帐号】必填信息",
            position: "middle",
            duration: 5000
          })
          return false
        }
        if (this.bank.user_bank_no && this.bank.user_bank_no.length !== 4) {
          this.$toast({
            message: "若要输入银行卡号，请输入【银行卡号后四位】",
            position: "middle",
            duration: 5000
          })
          return false
        }
      }
      this.$messagebox.confirm("确定充值?").then(action => {
        let toast = this.$toast({
          message: "去往充值路途中...",
          position: "middle"
        })
        this.button = true
        let ob = {
          payment_amount: "",
          payment_method_id: ""
        }
        ob.payment_amount = this.payment_amount
        let items = this.payWayList[this.payway].payment_methods
        let index = -1
        let bankId = -1
        let _this = this
        if (items && items.length) {
          for (let n = 0; n < items.length; n++) {
            if (items[n].name === _this.payValue[_this.payway]) {
              index = n
              break
            }
          }
          if (items[0].banks && items[0].banks.length) {
            this.payBanks.forEach((v) => {
              if (v.index === this.payway && index === v.childIndex) {
                bankId = this.getBanksId(v.value, items[v.childIndex].banks)
                return
              }
            })
          }
        } else {
          this.$toast({
            message: "提交数据出错，请刷新重试",
            position: "middle",
            duration: 5000
          })
          return
        }
        if (bankId !== -1) {
          ob.payment_method_id = bankId
        } else if (index !== -1) {
          ob.payment_method_id = items[index].id
        }
        // this.httpWay = items[index].http_method_type
        if (offlineBank) {
          ob.realname = this.bank.realname
          ob.user_bank_no = this.bank.user_bank_no
          ob.user_bank_name = this.bank.user_bank_name
        }
        this.api.deposit(ob).then((res) => {
          // let billNo = res.data.bill_no
          // let method = res.data.payment_method
          this.button = false
          this.payment_amount = ""
          if (offlineBank) {
            this.$toast({
              message: "您的银行账号信息提交成功！相关客服会做后续处理",
              position: "middle",
              duration: 5000
            })
          } else if (this.currentItem.payment_type === "payment_offline_wxpay" || this.currentItem.payment_type === "payment_offline_alipay") {
            if (res.data.id) {
              let type = ""
              if (this.currentItem.payment_type === "payment_offline_alipay") {
                type = "alipay"
                this.$router.push({ name: "OfflineAlipay", params: { billNo: res.data.id, type: type } })
              } else {
                type = "wxpay"
                this.$router.push({ name: "OfflineWepay", params: { billNo: res.data.id, type: type } })
              }
            } else {
              this.$toast({
                message: "获取微信支付账单失败，请重试或联系客服",
                position: "middle",
                duration: 5000
              })
            }
          } else {
            window.location.href = `${process.env.PAYMENT_ROOT}/payments/gateway/${res.data.payment_method}/${res.data.bill_no}`
          }
          // this.api.payments(method, billNo).then((res) => {
          //   // FIXME
          //   // let url = res.data.gateway_url
          //   // let params = res.data.pay_params
          //   // if (this.httpWay === 'http_method_get') {
          //   //   let str = ''
          //   //   for (let k in params) {
          //   //     str = str + k + '=' + params[k] + '&'
          //   //   }
          //   //   window.location.href = url + '?' + str
          //   // } else {
          //   //   this.$router.push({ name: 'Gateway', params: { url, params } })
          //   // }
          //   toast.close()
          //   this.button = false
          // }).catch((error) => {
          //   this.button = false
          //   toast.close()
          //   console.log(error)
          // })
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
  padding: 0;
  margin: 0;
}
.money {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  margin: .3rem;
  p {
    color: $color-white;
    font-weight: bold;
  }
  .info {
    color: rgba($color-white, .5);
  }
  .banksRadio {
    width: 96%;
    margin: 5px auto;
    border: $px solid $color-grey1;
    box-shadow: 0px 0px $px 0px $color-grey3;
  }
  .bank-title {
    font-weight: bold;
    text-align: center;
  }
  .transfer-bank {
    .fa {
      text-align: center;
      padding: 10px 0px;
      font-size: $font-h2;
      color: $color-grey2;
    }
    .input-bank {
      background-color: $color-white;
      width: 96%;
      box-shadow: 0px 1px 3px 0px $color-grey2;
      margin: 10px auto;
      padding: 10px;
      padding-top: 20px;
      p {
        padding-bottom: 15px;
        color: $color-grey5;
        font-size: $font-h4;
        i {
          font-style: normal;
          display: inline-block;
          width: 25%;
          text-align: right;
          margin-right: 5px;
        }
        span {
          display: inline-block;
          width: 73%;
          vertical-align: top;
          word-wrap: break-word;
          text-align: justify;
          color: $color-grey5;
          font-weight: bold;
          border-bottom: $px solid $color-grey;
          padding-bottom: 5px;
          padding-left: 5px;
          input {
            width: 100%;
            border: none;
            outline: none;
            font-size: $font-h4;
          }
        }
      }
    }
  }
}
.banks {
  background-color: $color-white;
  width: 96%;
  box-shadow: 0px 1px 3px 0px $color-grey2;
  margin: 10px auto;
  padding: 0px 10px;
  p {
    padding: 15px 0px;
    border-bottom: $px solid $color-grey8;
    color: $color-grey5;
    font-size: $font-h4;
    span {
      display: inline-block;
      width: 73%;
      vertical-align: top;
      word-wrap: break-word;
      text-align: right;
    }
  }
}
.number {
  position: relative;
  margin: .1rem 0;
  span {
    font-size: $font-h2;
    color: $color-white;
  }
  .promo-number {
    position: absolute;
    right: 25px;
    bottom: 5px;
    color: $color-yellow13;
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
.QR-code {
  width: 200px;
  height: 200px;
  margin: 10px auto;
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
.confirm {
  text-align: center;
  color: $color-red;
}
.money {
  .mint-tabbar {
    background-color: $color-blue8 !important;
  }
  .mint-tabbar > .mint-tab-item {
    background-color: $color-blue8 !important;
    border: 2px solid $color-blue8;
    width: 25%;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    border: 2px solid $color-yellow13;
  }
  .mint-tab-item {
    flex: inherit;
  }
  .img {
    position: relative;
    top: -8px;
  }
  .img, .clolor { display: block}
  .color {
    color: #fff !important;
    padding: 0px 10px;
    display: inline-block;
  }
  .mint-tabbar {
    position: inherit;
    // background-image: inherit;
    padding-top: 10px;
    background-color: $color-white;
    flex-wrap: wrap;
  }
  .mint-tab-item {
    border: $px solid $color-white;
    padding: 10px 0px;
    padding-top: 15px;
    margin: 10px 0px;
  }
}
</style>
