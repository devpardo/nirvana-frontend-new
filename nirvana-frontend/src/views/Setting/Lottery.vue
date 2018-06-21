<template lang="html">
  <div class="body">
    <!--转盘-->
    <div class="lot-bg"></div>
    <lottery :datas="obs" class="lottery_js"></lottery>
    <p class="lot-count">您还有<span>{{ playTimes }}</span>次抽奖机会</p>

    <!--信息展示-->
    <p class="title">亚太大抽奖</p>
    <award v-if="awards.show" :awards="awards"></award>
    <div class="rule">
      <span class="field dl">活动规则:</span>
      <div class="dl rules">
        <ul>
          <li><span class="circle">1</span>每次抽奖需要消耗50亚太币。</li>
          <li><span class="circle">2</span>快速获取[亚太币]小技巧 请在[我的亚太币]中查看。</li>
        </ul>
      </div>
    </div>
    <div class="rule">
      <span class="field dl">奖励规则:</span>
      <div class="dl rules">
        <ul>
          <li><span class="circle">1</span>[现金]奖励由系统自动派发，请在主账户查收及交易记录中查询详情。</li>
          <li><span class="circle">2</span>[现金]奖励提款需要完成5倍投注流水（所有场馆通用，不限制游戏)。</li>
          <li><span class="circle">3</span>[亚太币]奖励请在[我的亚太币]中查收。</li>
          <li><span class="circle">4</span>[充值优惠]奖励以优惠券形式由系统自动派发至[我的优惠],您可以在游戏平台转账时选择并使用,如有疑问，请点击右上角[客服]按钮，24小时热情体贴的服务。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Lottery from "@/components/Setting/Lottery.vue"
import Award from "@/components/Setting/Award"
import { transitionRun } from "@/libs/utils.js"

export default {
  data () {
    return {
      tempPlayTime: 0,
      playTimes: 0,
      lock: "",
      lockCount: 0,
      getAwardsFlag: "",
      awards: {
        show: false,
        datas: ""
      },
      obs: {
        count: 0,
        endCount: "", // 决定在哪个区域停住
        copies: "",
        handleLottery: this.handleLottery,
        runFlag: false,
        noIntegral: false,
        awards: ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (this.$store.state.user.email) {
      this.fetchLotteries().then(() => {
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  components: { Lottery, Award },
  methods: {
    fetchLotteries () {
      return new Promise((resolve, reject) => {
        this.api.getLotteries().then((res) => {
          if (res.data && res.data.items.length > 0) {
            this.obs.awards = res.data.items
            this.obs.copies = 1 / res.data.items.length

            this.playTimes = res.data.play_times || 0
            if (res.data.play_times) {
              this.obs.noIntegral = true
            } else {
              this.obs.noIntegral = false
            }
          }
          resolve()
        }).catch((error) => {
          reject(error)
          console.log(error)
        })
      })
    },
    fetchAwards () {
      return new Promise((resolve, reject) => {
        this.getAwardsFlag = false
        this.api.postLotteries().then((res) => {
          if (res.data) {
            if (this.obs.awards && this.obs.awards.length > 0) {
              let len = this.obs.awards.length
              for (let a = 0; a < len; a++) {
                if (this.obs.awards[a].id === res.data.id) {
                  this.obs.endCount = a / this.obs.awards.length
                  break
                }
              }
              this.awards.datas = res.data.name
              this.tempPlayTime = res.data.play_times
              this.obs.count = this.obs.count + 2 // 此transform转的值一定要放在控制的后面，不然触发不了。
              this.getAwardsFlag = true
            }
          }
          resolve()
        }).catch((error) => {
          reject(error)
          console.log(error)
        })
      })
    },
    handleLottery () {
      this.lockCount ++ // 一把锁
      if (this.lockCount === 1) {
        this.lock = true // 点进来便会被锁住
      }
      let transitionRunEve = transitionRun()
      let obElement = document.getElementsByClassName("lottery_js")[0]
      if (transitionRunEve) {
        obElement.addEventListener(transitionRunEve, () => {
          if (this.getAwardsFlag) {
            this.lockCount = 0
            this.lock = false
            this.playTimes = this.tempPlayTime
            this.awards.show = true
          }
        })
      }
      if ((this.lockCount > 1) && this.lock) {
        return
      }
      if (!this.obs.awards) {
        this.$toast({
          message: "无奖品，不能转",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!this.obs.noIntegral) {
        this.$toast({
          message: "您的积分不足，不能参与抽奖",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (this.obs.awards) {
        if (this.playTimes === 0) {
          this.$toast({
            message: "您已无抽奖机会",
            position: "middle",
            duration: 5000
          })
          return
        } else {
          this.playTimes --
          this.obs.runFlag = true
          this.fetchAwards().then(() => {
          }).catch((error) => {
            console.log(error)
          })
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  background-color: $color-yellow6;
  .lot-bg {
    width: 100%;
    height: 222px;
    background: url("../../assets/images/lotbg.png");
    background-size: 100% 100%;
  }
  .lot-count {
    background-color: $color-yellow2;
    color: $color-white;
    padding: 5px 10px;
    width: 50%;
    border-radius: 15px;
    text-align: center;
    margin: 10px auto;
    span {
      padding: 0px 3px;
    }
  }
}
.title {
  margin: 0px auto;
  text-align: center;
  font-size: $font-h1;
  font-weight: bold;
}
ul, li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
li {
  padding-bottom: 5px;
}
.dl {
  display: inline-block;
}
.rule {
  padding: 10px;
  .rules {
    width: 80%;
    vertical-align: top;
    .circle {
      display: inline-block;
      width: 13px;
      height: 13px;
      line-height: 12px;
      text-align: center;
      border: $px solid $color-black;
      border-radius: 50%;
      margin-right: 5px;
      overflow: hidden;
      vertical-align: middle;
    }
  }
  .field {
    font-size: $font-h5-1;
    font-weight: bold;
    padding-right: 6px;
  }
}
</style>
