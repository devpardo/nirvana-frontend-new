<template lang="html">
  <div>
    <section>
      <div class="popup-div">
       <span class="popup-close" @click="close()"><img src="./images/lottery/button_close.png" width="100%" height="100%"/></span>
        <div class="lottery body">
          <div class="container">
            <div class="text-title">
              <span> 最高可获得 </span>
              <img src="./images/lottery/888.png" alt="888"/>
              <span> 元现金红包 </span>
            </div>
            <div class="text-header">
              <span> 下次开抢<span class="weight">倒计时</span> </span>
            </div>
            <div class="timer">
              <div class="hours"> {{countDown.hour}} </div>
              <span> : </span>
              <div class="minutes"> {{countDown.minute}} </div>
              <span> : </span>
              <div class="seconds"> {{countDown.second}} </div>
            </div>
            <button class="btn" @click="get()" :class="{'is-getting': isGetting}" :disabled="isGetting || !canGet" v-if="canGet"></button>
          </div>
          <div class="footer">
            <div class="left-side">
              <p>抢红包时间：</p>
              <p>12:00、15:00</p>
              <p>18:00、21:00、24:00</p>
            </div>
            <div class="right-side">
              <p> 本活动解释权归亚太娱乐所有 </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: null,
      hongbao: null,
      isGetting: false
    }
  },
  computed: {
    canGet () {
      return this.state && this.state.hongbao > 0 && this.state.seconds === 0
    },
    countDown () {
      let second = "00"
      let minute = "00"
      let hour = "00"
      if (this.state && this.state.seconds > 0) {
        second = this.state.seconds % 60
        second = second < 10 ? `0${second}` : second
        minute = parseInt(this.state.seconds / 60) % 60
        minute = minute < 10 ? `0${minute}` : minute
        hour = parseInt(this.state.seconds / 60 / 60)
        hour = hour < 10 ? `0${hour}` : hour
      }
      return {hour, second, minute}
    }
  },
  methods: {
    close () {
      this.$router.push({ name: "Home" })
      this.$store.dispatch("setPrizeFlag", true)
    },
    get () {
      this.$store.dispatch("setRedPacket", null)
      this.isGetting = true
      this.api.postHongbao().then(res => {
        this.isGetting = false
        if (res.data.bonuses > 0) {
          this.$router.push({ name: "Winning" })
          this.$store.dispatch("setRedPacket", res.data)
          this.$store.dispatch("setPrizeFlag", false)
        } else {
          this.$router.push({ name: "Unfortunately" })
        }
      }).catch(() => {
        this.isGetting = false
      })

//      this.$router.push({ name: 'Winning' })
//      this.$store.dispatch('setPrizeFlag', false)
//      this.$router.push({ name: 'Unfortunately' })
    }
  },
  mounted () {
    this.api.getHongbaoTimer().then(res => {
      this.state = res.data
      if (this.state && this.state.seconds > 0) {
        let countDownInterval = setInterval(() => {
          this.state.seconds--
          if (this.state.seconds === 0) {
            clearInterval(countDownInterval)
            countDownInterval = null
          }
        }, 1000)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import 'sass/styles';

button:disabled {
  opacity: 0.5;
}
.popup-div {
  position: relative;
  .popup-close {
    position: absolute;
    z-index: 10;
    display: inline-block;
    top: 10px;
    right: 0px;
    width: 51px;
    height: 32px;
  }
}
</style>
