<template lang="html">
  <div>
    <transfer-sub v-if="transferFlag.sub" :show="transfer" :transferFlag="transferFlag" :favorableList="favorableList" :preview="preview" @transferSub="transferSub" @reset="ResetTransfer"></transfer-sub>
    <transfer-main v-if="transferFlag.main" :show="transfer" :transferFlag="transferFlag" :preview="preview" @transferMain="transferMain"></transfer-main>
    <coupon v-if="transfer.rebate" :show="transfer" :favorableList="favorableList" :preview="preview" @subDone="subDone"></coupon>
  </div>
</template>

<script>
import TransferMain from "@/components/Game/TransferMain.vue"
import TransferSub from "@/components/Game/TransferSub.vue"
import Coupon from "@/components/Game/Coupon.vue"
import { positiveInteger } from "@/libs/utils.js"

export default {
  // parameter为传过来的api需要的参数(适用于全部) locked是平台详情传过来的禁止转账 后三个参数为转入转出后或重新渲染某部分数据时各页面需要调的函数且参数不一样
  props: ["transferFlag", "parameter", "locked", "vendorName", "fetchVendorWallet", "fetchSearchGameDetail", "resetAccount"],
  data () {
    return {
      favorableList: [],
      preview: {
        base_amount: "",
        main_wallet: 0,
        sub_wallet: 0,
        adjustments_label: "",
        vendorName: this.parameter,
        adjustments_amount: "",
        vendorLabel: this.vendorName
      },
      transfer: {
        rebate: false, // 优惠
        disabled: true, // 转入按钮
        mainDisabled: true, // 转出按钮
        amountLoading: false, // 加载主账户与场馆余额
        adjustmentLoading: false, // 计算时, 加载优惠
        currentSelect: 0,
        subMoney: 0
      }
    }
  },
  components: { TransferMain, TransferSub, Coupon },
  mounted () {
    if (this.transferFlag.sub) {
      this.loadTransfer()
      this.getCoupons()
    } else if (this.transferFlag.main) {
      this.loadTransfer()
    }
  },
  methods: {
    ResetTransfer () {
      this.transfer.disabled = true
      this.api.postResetTransferAdjustment(this.parameter).then((res) => {
        this.transfer.disabled = false
        // set code 空
        this.preview.adjustments_label = ""
        this.transfer.currentSelect = 0
      }).catch((error) => {
        console.log(error)
      })
    },
    subDone () {
      this.transfer.adjustmentLoading = true
      if (!this.transfer.currentSelect) {
        this.ResetTransfer()
        return
      }
      this.transfer.disabled = true
      let ob = {
        users_coupon_id: this.transfer.currentSelect,
        base_amount: this.transfer.subMoney
      }
      this.api.postApplyPromoCode(this.parameter, ob).then((res) => {
        this.loadTransfer()
        this.transfer.disabled = false
      }).catch((error) => {
        this.transfer.disabled = true
        // set code 空
        this.preview.adjustments_label = ""
        this.transfer.currentSelect = 0
        if (parseFloat(this.transfer.subMoney)) {
          this.transfer.disabled = false
        }
        console.log(error)
      })
    },
    getCoupons () {
      this.favorableList.length = 0
      this.api.getCoupons().then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          this.favorableList = res.data.items
          let ob = { id: 0, promotion_name: "无", code: "无" }
          this.favorableList.unshift(ob)
          this.transfer.currentSelect = 0
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    loadTransfer () {
      this.transfer.amountLoading = true
      return new Promise((resolve, reject) => {
        this.api.getLoadTransfer(this.parameter).then((res) => {
          if (res.data) {
            this.transfer.subMoney = this.preview.base_amount = res.data.base_amount || ""
            this.preview.main_wallet = res.data.main_wallet || 0
            this.preview.sub_wallet = res.data.sub_wallet || 0
            if (this.resetAccount) {
              this.resetAccount(res.data)
            }
            if (res.data.adjustments) { this.preview.adjustments_label = res.data.adjustments.adjustments_label || "无" }
            this.preview.adjustments_amount = res.data.total_amount || "无"
            if (res.data.base_amount) {
              this.transfer.disabled = false
            }
            // code 存在
            if (res.data.users_coupon_id) {
              this.transfer.currentSelect = res.data.users_coupon_id
              this.transfer.disabled = false
            }
          }
          this.transfer.amountLoading = false
          this.transfer.adjustmentLoading = false
          resolve()
        }).catch((error) => {
          reject()
          console.log(error)
        })
      })
    },
    transferSub () {
      if (this.locked && this.locked.transfer_locked_at) { return }
      if (!positiveInteger(parseFloat(this.transfer.subMoney))) {
        this.$toast({
          message: "请您输入整数，去掉小数点",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (parseFloat(this.transfer.subMoney) > parseFloat(this.preview.main_wallet)) {
        this.$toast({
          message: "输入金额大于主账户余额",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (parseFloat(this.transfer.subMoney) < 1) {
        this.$toast({
          message: "输入金额不能小于1元",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.transfer.disabled = true
      let toast = this.$toast({
        message: "转入中...",
        position: "center"
      })
      let sub = {}
      if (this.favorableList.length > 0) {
        sub = {
          users_coupon_id: this.transfer.currentSelect,
          base_amount: this.transfer.subMoney
        }
      } else {
        sub = {
          base_amount: this.transfer.subMoney
        }
      }
      this.api.postTransferSub(this.parameter, sub).then(() => {
        this.loadTransfer().then(() => {
          toast.close()
          // set code 空
          this.preview.adjustments_label = ""
          this.transfer.currentSelect = ""
          this.$toast({
            message: "转入成功",
            position: "middle",
            duration: 5000
          })
        })
        if (this.fetchVendorWallet) { // 平台详情
          this.fetchVendorWallet(this.parameter)
        }
        if (this.fetchSearchGameDetail) { // 游戏详情
          this.fetchSearchGameDetail(this.$route.params.gid)
        }
        this.getCoupons()
      }).catch((error) => {
        toast.close()
        console.log(error)
      })
    },
    transferMain (data) {
      if (this.locked && this.locked.transfer_locked_at) { return }
      if (!data || data === "0") {
        this.$toast({
          message: "输入金额不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!positiveInteger(data)) {
        this.$toast({
          message: "请您输入整数，去掉小数点",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (data > parseFloat(this.preview.sub_wallet)) {
        this.$toast({
          message: "转出金额大于场馆余额",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (data < 1) {
        this.$toast({
          message: "输入金额不能小于1元",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.transfer.mainDisabled = true
      let toast = this.$toast({
        message: "转出中...",
        position: "center"
      })
      let main = {
        base_amount: data
      }
      this.api.postTransferMain(this.parameter, main).then(() => {
        toast.close()
        this.loadTransfer()
        this.$toast({
          message: "转出成功",
          position: "middle",
          duration: 5000
        })
        if (this.fetchVendorWallet) {
          this.fetchVendorWallet(this.parameter)
        }
      }).catch((error) => {
        toast.close()
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
