<template lang="html">
  <div>
    <div class="games" v-if="homeRecords">
      <div class="g-total">
        <div class="g-pool">
          <p class="p-top">
            <span class="number dl">￥</span>
            <vm-counter :number="baseAmount" :delay-each="100" height="48" class="number dl">
              <template scope="{number, index}">
                <span class="number-space">{{ number }}</span>
                <span class="dot" v-if="index === 6">.</span>
              </template>
            </vm-counter>
          </p>
          <!--<p class="p-top1" v-else>￥999999999999999<span class="super">+</span></p>-->
        </div>
        <p class="g-inline"><span class="fa font-size">{{ users }} 在线人数:</span><span>{{ homeRecords.onlines || '566886'}}</span></p>
      </div>
      <div class="g-list">
        <div class="carousel" v-if="homeRecords.items && homeRecords.items.length" v-carousel>
          <p v-for="item in homeRecords.items" class="li">
            <span class="img"><img src="~assets/images/pool-icon.png" width="100%" height="100%"/></span>
            <span class="info-left">
              <p>恭喜玩家<span class="yellow">{{ item.username || '无名氏' }}</span>:</p>
              <p>在游戏<span class="yellow">{{ item.game || '无名' }}</span>中赢得<span class="yellow">{{ item.amount || '1000' }}</span>元大奖！</p>
            </span>
          </p>
        </div>
      </div>
    </div>
    <data-loading :dataLoad="dataLoad"></data-loading>
  </div>
</template>

<script>
import DataLoading from "@/components/Shared/DataLoading.vue"
import Vue from "vue"
import "@/components/Shared/counter"

export default {
  data () {
    return {
      baseAmount: 0,
      intervalTime: "",
      maxAmount: 988888888,
      base: 510612620,
      animatedNumber: 0,
      users: this.$fontawesome("users"),
      homeRecords: "",
      dataLoad: {
        flag: true,
        data: "亚太总彩池加载中"
      }
    }
  },
  components: { DataLoading },
  mounted () {
    this.baseAmount = this.base
    this.intervalTime = setInterval(() => {
      var temp = this.baseAmount
      temp = temp + Math.ceil(Math.random() * 100)
      if (temp >= this.maxAmount) {
        temp = this.base
      }
      this.baseAmount = temp
    }, 3000)
    this.getHomeRecords()
  },
  beforeDestroy () {
    window.clearInterval(this.intervalTime)
  },
  directives: {
    carousel: {
      bind: (el) => {
        Vue.nextTick(() => {
          // el 对应上面的scroll绑定的el el.scrollHeight - el.scrollTop - el.clientHeight
          let scrollTop = el.clientHeight - 200 // 200为父亲高度
          let tempTop = 0
          function getInterval () {
            el.intervalTime = setInterval(() => {
              tempTop = -1 + tempTop
              if (-tempTop > scrollTop) {
                el.style.top = 0 + "px"
                tempTop = 0
              } else {
                el.style.top = tempTop + "px"
              }
            }, 50)
          }
          getInterval()

          el.addEventListener("touchstart", () => {
            window.clearInterval(el.intervalTime)
            el.intervalTime = null
          })
          el.addEventListener("touchend", () => {
            if (el.intervalTime !== null) {
              return
            }
            getInterval()
          })
        })
      },
      unbind: (el) => {
        window.clearInterval(el.intervalTime)
      }
    }
  },
  methods: {
    getHomeRecords () {
      this.api.getHomeRecords().then((res) => {
        this.homeRecords = res.data
        this.dataLoad.flag = false
      }).catch((error) => {
        this.dataLoad.flag = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.dl {
  display: inline-block;
  vertical-align: top;
}
.games {
  background-color: $color-blue8;
  margin: 0 .3rem;
  padding: .5rem .3rem;
  margin-bottom: .3rem;
}
.g-total {
  .g-inline {
    .font-size {
      font-size: $font-h5;
    }
    color: $color-white;
    font-weight: bold;
    span {
      padding-right: 5px;
    }
  }
}
.g-list {
  height: 200px;
  overflow: hidden;
  position: relative;
  .carousel {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    .img {
      display: inline-block;
      width: 40px;
      height: 32px;
      vertical-align: middle;
    }
    .info-left {
      display: inline-block;
      padding-left: 10px;
      width: 85%;
      vertical-align: middle;
      color: $color-white;
      .red {
        color: $color-red7;
        padding: 0px 3px;
      }
      .yellow {
        color: $color-yellow13;
      }
    }
  }
  .li {
    text-align: left;
    margin: 0px;
    color: $color-grey5;
    font-weight: bold;
  }
}
.g-pool {
  width: 100%;
  height: 200px;
  background: url("../../assets/images/jackpot-title.png") no-repeat;
  background-size: 100% 100%;
  margin: 0 auto;
  border-radius: 5px;
  text-align: center;
  position: relative;
  .super {
    vertical-align: super;
  }
  .p-top {
    padding-top: 122px;
    .number {
      font-size: $font-large;
    }
    .dot {
      margin-left: -7px;
    }
    .number-space {
      padding-right: 3px;
    }
  }
  .p-top1 {
    padding-top: 120px;
  }
  p {
    margin: 0px;
    font-size: $font-h;
    color: $color-yellow10;
    font-weight: bold;
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
</style>
