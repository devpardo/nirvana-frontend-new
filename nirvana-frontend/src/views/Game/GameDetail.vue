<template lang="html">
  <div class="body">
    <div class="game-detail">
      <!--基本详情-->
      <span class="img dl">
        <img v-lazy="gameDetail.image_url" width="100%" height="100%" />
        <span class="txt txt-red" v-if="gameDetail.maintain_at && gameDetail.enabled"><span>正在维护</span></span>
        <span class="txt txt-yellow" v-if="gameDetail.maintain_at && !gameDetail.enabled"><span>已下架</span></span>
      </span>
      <div class="info dl">
        <p class="name"><span>{{ gameDetail.name || '无' }}</span></p>
        <p>{{ gameDetail.ename || '无' }}</p>
        <span class="tag" v-if="gameDetail.vendor">{{ gameDetail.vendor.name }}</span>
        <span class="tag" v-else>无</span>
        <p class="star">
          <star :starsData="gameDetail.star_rank"></star>
        </p>
      </div>
      <div class="action fr dl">
        <p class="action-heart" v-if="gameLike !== ''">
          <span class="fa color-red heart" @click="handleUnlike(gameDetail.gid)" v-if="gameLike">{{ heartFiled }}</span>
          <span class="fa color-red heart" @click="handleLike(gameDetail.gid)" v-else>{{ heart }}</span>
        </p>
        <button class="button" :class="{ 'opacity': gameDetail.maintain_at || !gameDetail.enabled }" @click="launch(gameDetail.gid)" :disabled="gameDetail.maintain_at || !gameDetail.enabled">开始游戏</button>
      </div>
    </div>
    <p class="locked" v-if="gameDetail.vendor && gameDetail.vendor.transfer_locked_text"><span class="fa">{{ info_circle }}</span><span>{{ gameDetail.vendor.transfer_locked_text }}</span></p>
    <div class="balance">
      <span class="amount">当场场馆余额:<span v-if="gameDetail.vendor">￥{{ gameDetail.vendor.sub_wallet || '0' }}</span><span v-else>获取中...</span></span>
      <button class="dl fr button in" @click="transferIn" :class="{ 'opacity': gameDetail.maintain_at || !gameDetail.enabled || (gameDetail.vendor && gameDetail.vendor.transfer_locked_at) }" :disabled="gameDetail.maintain_at || !gameDetail.enabled || (gameDetail.vendor && gameDetail.vendor.transfer_locked_at)">转入</button>
    </div>
    <!--游戏截图-->
    <div class="game-image" v-if="gameImages && gameImages.length > 0">
      <p class="title">游戏截图</p>
      <content-slide :contentList="gameImages"></content-slide>
    </div>
    <!--游戏介绍-->
    <div class="game-intro" v-if="gameDetail.desc">
      <p class="title">游戏介绍</p>
      <p class="brief">
        {{ gameDetail.desc }}
      </p>
    </div>
    <!--小编推荐-->
    <div class="game-recommend">
      <div class="game-intro game-recommended" v-if="gameDetail.recommended_desc">
        <span>小编推荐</span>
        <p class="recommended-desc">
          {{ gameDetail.recommended_desc }}
        </p>
      </div>
    </div>
    <!--转入转出-->
    <transfer :parameter='gameDetail.vendor.code' :vendorName='gameDetail.vendor.name' :transferFlag="transferFlag" :fetchSearchGameDetail="fetchSearchGameDetail" v-if="transferFlag.sub || transferFlag.main"></transfer>
    <mask-layer v-if="gameDataFlag"></mask-layer>
  </div>
</template>

<script>
import ContentSlide from "@/components/Shared/ContentSlide.vue"
import Star from "@/components/Game/Star.vue"
import MaskLayer from "@/components/Shared/MaskLayer.vue"
import Transfer from "@/components/Shared/Transfer.vue"

export default {
  data () {
    return {
      gameDetail: "",
      gameLike: "",
      gameDataFlag: true,
      starO: this.$fontawesome("star-o"),
      starHalfO: this.$fontawesome("star-half-o"),
      star: this.$fontawesome("star"),
      heart: this.$fontawesome("heart-o"),
      heartFiled: this.$fontawesome("heart"),
      info_circle: this.$fontawesome("info-circle"),
      transferFlag: {
        main: false,
        sub: false
      },
      gameImages: ""
    }
  },
  components: { ContentSlide, Star, MaskLayer, Transfer },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchSearchGameDetail(this.$route.params.gid)
  },
  methods: {
    handleLike (gid) {
      this.api.postLike(gid).then((res) => {
        this.gameLike = true
        this.$toast({
          message: "已加入收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    handleUnlike (gid) {
      this.api.postUnlike(gid).then((res) => {
        this.gameLike = false
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    launch (gameId) {
      let toast = this.$toast({
        message: "正在加载游戏展厅...",
        position: "center"
      })
      this.api.postLaunch(gameId).then((res) => {
        toast.close()
        window.location.href = res.data.game_url
      }).catch((error) => {
        toast.close()
        console.log(error)
      })
    },
    fetchSearchGameDetail (gid) {
      this.api.getSearchGameDetail(gid).then((res) => {
        if (res.data) {
          this.gameDetail = res.data
          this.gameLike = res.data.liked
          this.gameDataFlag = false
          this.gameImages = res.data.images
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    // transfer
    transferIn () {
      if (this.$store.state.user.email) {
        if (!this.gameDetail.vendor) {
          this.$toast({
            message: "信息不全，无法启动转入",
            position: "middle",
            duration: 5000
          })
          return
        }
        this.transferFlag.sub = true
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 0px;
}
.opacity {
  opacity: 0.5;
}
.locked {
  padding: 10px;
  background-color: $color-white;
  span {
    &:first-of-type {
      color: $color-red;
      padding-right: 5px;
    }
  }
}
.game-detail {
 padding: .3rem;
 background-color: $color-blue9;
 .img {
   width: 120px;
   height: 120px;
   position: relative;
   .txt {
     display: inline-block;
     position: absolute;
     background-color: $color-white;
     font-size: $font-h1;
     z-index: 90;
     border-radius: 5px;
     transform: rotate(-45deg);
   }
   .txt-red {
     color: $color-red;
     padding: 0px 10px;
     left: 10%;
     top: 40%;
   }
   .txt-yellow {
     color: $color-yellow;
     padding: 0px 20px;
     left: 8%;
     top: 40%;
   }
   img {
     border-radius: 20px;
   }
 }
 .name {
   span {
     color: $color-white !important;
     &:first-child {
       font-size: $font-h4;
       padding-right: 5px;
     }
     &:last-child {
       color: $color-grey2;
     }
   }
 }
 .info {
   vertical-align: top;
   max-width: 42%;
   word-wrap: break-word;
   padding-left: 5px;
   p {
     color: rgba($color-white, .5);
   }
 }
 .tag {
   background-color: $color-yellow13;
   padding: $px 8px;
   color: $color-blue9;
   border-radius: 3px;
   transform: scale(0.7);
   display: inline-block;
   margin-left: -5px;
 }
 .star {
   transform: scale(0.7);
   margin-left: -15px;
   vertical-align: bottom;
   margin-top: 10px;
 }
 .action {
   vertical-align: top;
 }
 .dl {
   display: inline-block;
 }
 .action-heart {
   height: 90px;
   text-align: right;
   margin-right: 10px;
 }
 .color-red {
   color: $color-red;
 }
 .color-yellow {
   display: inline-block;
   color: $color-yellow1;
   padding-right: 5px;
 }
}
.button {
  display: inline-block;
  padding: .2rem .5rem; 
  border-radius: 2rem;
  color: $color-blue9;
  background-color: $color-yellow13;
  border: 0;
  font-weight: bold;
  font-size: $font-h5;
}
.in {
  position: absolute;
  top: 50%;
  margin-top: -13px;
  right: 10px;
}
.balance {
  position: relative;
  background-color: $color-blue8;
  border-bottom: $px solid $color-blue9;
  padding: .5rem .3rem;
  .amount {
    color: $color-yellow13;
    display: inline-block;
    max-width: 78%;
    word-wrap: break-word;
  }
}
.game-image {
  .title {font-weight: bold}
  background-color: $color-blue8;
  padding: .5rem .3rem;
  color: $color-white;
  padding-bottom: 0px;
  border-bottom: $px solid $color-blue9;
}
.game-recommend {
  background-color: $color-blue8;
  padding: .5rem .3rem;
}
.game-recommended {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  padding-bottom: 3rem;
  border-radius: 5px;
  border: $px solid rgba($color-white, .5);
  position: relative;
  span {
    position: absolute;
    display: inline-block;
    background-color: $color-blue8;
    border-radius: 5px;
    border: $px solid rgba($color-white, .5);
    padding: .05rem .3rem;
    font-size: $font-h5;
    color: rgba($color-white, .5);
    left: 10px;
    top: -11px;
  }
  .recommended-desc {
    text-indent: 1em;
    color: rgba($color-white, .5);
  }
}
.game-intro {
  background-color: $color-blue8;
  padding: .5rem .3rem;
  .title {
    font-weight: bold;
    color: $color-white;
  }
  .brief {
    padding-top: 5px;
    text-indent: 2em;
    color: rgba($color-white, .5);
  }
}
</style>
