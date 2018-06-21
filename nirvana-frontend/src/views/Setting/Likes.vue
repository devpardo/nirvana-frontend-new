<template lang="html">
  <div class="body">
    <div v-if="likes && likes.length">
      <p class="g-title">我的收藏</p>
      <game :gameList="likes" @handleUnlike="handleUnlike"></game>
    </div>
    <p v-if="!dataLoad.flag && (!likes || !likes.length)" class="no-data">
      暂无收藏
    </p>
    <data-loading :dataLoad="dataLoad"></data-loading>
    <div class="questions">
      <div class="question">
        <p class="title"><span class="fa">{{ exclamation }}</span><span>关于收藏:</span></p>
        <p class="content">帮助用户最快速方便的查找到您喜爱的游戏。</p>
        <p class="title"><span class="fa">{{ exclamation }}</span><span>使用说明:</span></p>
        <p class="content">点击游戏名后方的[♡]心形按钮，点亮后该游戏就会出现在[我的收藏]中，您可以随时点亮或熄灭以管理您喜欢的游戏。</p>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "@/components/Shared/Game.vue"
import DataLoading from "@/components/Shared/DataLoading.vue"

export default {
  data () {
    return {
      dataLoad: {
        flag: true,
        data: "我的收藏加载中"
      },
      exclamation: this.$fontawesome("exclamation-circle"),
      likes: []
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    this.handleLike()
  },
  components: { Game, DataLoading },
  methods: {
    handleLike () {
      this.api.getLikeGames().then((res) => {
        this.likes = res.data.items
        this.dataLoad.flag = false
      }).catch((error) => {
        this.dataLoad.flag = false
        console.log(error)
      })
    },
    handleUnlike (data) {
      this.api.postUnlike(data).then((res) => {
        this.handleLike()
        this.$toast({
          message: "已去除此条收藏",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.body {
  background-color: $color-blue9;
  padding-left: 10px;
  padding-right: 10px;
  .g-title {
    font-size: $font-h3;
    padding-top: 5px;
    margin: 0px;
    margin-top: 10px;
  }
}
.questions {
  margin-top: .3rem;
  background-color: $color-blue8;
  color: rgba($color-white, .5);
  p {
    margin: 0px;
  }
  .question {
    padding: 10px;
    letter-spacing: $px;
    text-align: justify;
  }
  .title {
    span {
      &:last-child {
        padding-left: 5px;
        display: inline-block;
        width: 96%;
        vertical-align: top;
        text-align: justify;
      }
    }
  }
  .content {
    padding: 5px 0px;
    padding-left: 17px;
    text-align: justify;
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
