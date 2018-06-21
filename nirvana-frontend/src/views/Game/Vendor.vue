<template lang="html">
  <div class="body">
    <!--简介、封锁控制显示(数据与其它组件有交叉故这部分没提取出去)-->
    <p class="vendorImg"><img v-lazy="platInfo.banner_url" width="100%" height="100%"/></p>
    <div>
      <div class="vendor-info">
        <p><span>简介</span>{{ platInfo.desc || '暂无介绍' }}</p>
      </div>
      <div v-if="locked.transfer_locked_text" class="locked-txt">
        <p>{{ locked.transfer_locked_text }}</p>
      </div>
      <mt-cell :title="platFormTitle" :label="platFormMax"></mt-cell>
      <div :class="{ 'locked': locked.transfer_locked_at }">
        <p @click="transferIn()">
          <mt-cell title="转入" is-link>
            <span class="img" slot="icon"><img src="~assets/images/transferIn.png" width="100%" height="100%"></span>
          </mt-cell>
        </p>
        <p @click="transferOut()">
          <mt-cell title="转出" is-link>
            <span class="img" slot="icon"><img slot="icon" src="~assets/images/transferOut.png" width="100%" height="100%"></span>
          </mt-cell>
        </p>
      </div>
    </div>
    <!--推荐游戏-->
    <div class="games">
      <p class="g-title">推荐游戏 <span class="fa fr" @click="goGames()">{{ listTh }} 游戏列表</span></p>
      <game :gameList="hotGames" @handleUnlike="handleUnlike" @handleLike="handleLike"></game>
    </div>
    <p v-if="gamesLoading" class="loading"><mt-spinner type="fading-circle" class="load-position"></mt-spinner><span class="load-txt">推荐游戏加载中</span></p>
    <!--遮罩层-->
    <mask-layer v-if="vendorDataFlag" :maskLayer="maskLayer"></mask-layer>
    <!--转入转出-->
    <transfer :parameter='vendorCode' :transferFlag="transferFlag" :locked="locked" :fetchVendorWallet='fetchVendorWallet' v-if="transferFlag.sub || transferFlag.main"></transfer>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue"
import MaskLayer from "@/components/Shared/MaskLayer.vue"
import Transfer from "@/components/Shared/Transfer.vue"

export default {
  data () {
    return {
      listTh: this.$fontawesome("th"),
      vendorCode: this.$route.params.vendorCode,
      vendorName: localStorage.getItem("vendorName") || "",
      platInfo: "",
      platFormTitle: "",
      platFormMax: "",
      locked: {
        transfer_locked_at: "",
        transfer_locked_text: ""
      },
      maskLayer: {
        flag: false
      },
      transferFlag: {
        main: false,
        sub: false
      },
      vendorDataFlag: true,
      gamesLoading: true,
      hotGames: []
    }
  },
  watch: {
    "$store.state.user.email" () {
      if (this.$store.state.user.email) {
        this.fetchVendorWallet(this.$route.params.vendorCode)
      }
    }
  },
  components: { Game, MaskLayer, Transfer },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.platFormTitle = this.vendorName + "平台"
    this.platFormMax = this.vendorName + "钱包余额: 0"
    this.fetchVendorWallet(this.$route.params.vendorCode)
  },
  methods: {
    transferIn () {
      if (this.$store.state.user.email) {
        this.transferFlag.sub = true
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    },
    transferOut () {
      if (this.$store.state.user.email) {
        this.transferFlag.main = true
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    },
    handleLike (data, game) {
      this.api.postLike(data).then((res) => {
//        this.fetchVendorWallet(this.vendorCode)
        this.$set(game, "liked", true)
        this.$toast({
          message: "已加入收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleUnlike (data, game) {
      this.api.postUnlike(data).then((res) => {
//        this.fetchVendorWallet(this.vendorCode)
        this.$set(game, "liked", false)
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    goGames () {
      let code = this.vendorCode
      this.$router.push({name: "Games", params: { vendorCode: code }})
    },
    fetchVendorWallet (name) {
      this.api.getVendorWallet(name).then((res) => {
        let money = res.data.sub_wallet || 0
        this.platFormMax = res.data.name + "钱包余额: " + money
        this.hotGames = res.data.recommend_games
        this.platInfo = {
          banner_url: res.data.banner_url || "",
          desc: res.data.desc || ""
        }
        this.locked.transfer_locked_at = res.data.transfer_locked_at || ""
        this.locked.transfer_locked_text = res.data.transfer_locked_text || ""
        this.gamesLoading = false
        if (res.data.maintain_at) {
          this.vendorDataFlag = true
          this.maskLayer.flag = true
        } else {
          this.vendorDataFlag = false
        }
      }).catch((error) => {
        this.gamesLoading = false
        console.log(error)
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
.locked {
  position: relative;
  opacity: 0.6;
  &::after {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    content: '';
  }
}
.locked-txt {
  background-color: $color-white;
  padding: 10px;
  color: $color-yellow;
}
.vendorImg {
  width: 100%;
  height: 120px;
}
.img {
  display: inline-block;
  width: 20px;
  height: 20px;
}
.games {
  width: 100%;
  background-color: $color-blue8;
  margin-top: .3rem;
  padding: .5rem .3rem;
  .g-title {
    font-size: $font-h3-1;
    padding-top: 5px;
    margin: 0px;
    color: $color-white;
    .fa {
      line-height: 25px;
      color: rgba($color-white, .5);
    }
  }
}
.vendor-info {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  border-bottom: $px solid $color-blue9;
  p {
    background-color: $color-blue8;
    padding: .3rem;
    color: rgba($color-white, .5);
    border-radius: 5px;
    border: $px solid rgba($color-white, .5);
    position: relative;
    span {
      position: absolute;
      display: inline-block;
      background-color: $color-blue8;
      border-radius: 5px;
      color: rgba($color-white, .5);
      left: 10px;
      top: -8px;
    }
  }
}
.mint-cell {
  background-color: $color-blue8 !important;
  color: $color-white;
  padding: .1rem;
  border: $px solid $color-blue9;
  .mint-cell-title {
    color: $color-white;
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
