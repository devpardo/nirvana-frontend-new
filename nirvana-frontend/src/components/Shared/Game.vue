<template lang="html">
  <div id="games" :class="{ 'scroll-height': query }">
    <infinite-scroll v-if="query" :fetchHandler="query.fetchData" :items="query.items" :loading="query.loading" :q="query.q" :totalFetched="query.totalFetched">
      <template scope="{item}">
        <div class="venues" :class="{'opacity-number': item.maintain_at || !item.enabled}">
          <span class="img dl" @click="goDetail(item.gid)">
            <img v-lazy="item.image_url" width="100%" height="100%"/>
          </span>
          <div class="content dl" :class="{ 'p-top': !item.tag_list.length }">
            <p><span class="h1 padding-r">{{ item.name || '无名' }}</span><span class="perform bg-color-yellow">{{ item.vendor_name || '无' }}</span><span v-if="!item.liked" class="fa color-red heart" @click="handleLike(item.gid, item)">{{ heart }}</span><span v-if="item.liked" class="fa color-red heart" @click="handleUnlike(item.gid, item)">{{ heartFiled }}</span></p>
            <p class="h3 line-height" @click="goDetail(item.gid)">
              <star :starsData="item.star_rank"></star>
            </p>
            <p class="h3 info" :class="{ 'p-top': !item.tag_list.length }">{{ item.recommended_desc || '暂无描述' }}</p>
            <p class="tag" v-if="item.tag_list.length"><span class="yellow" v-for="tag in item.tag_list">{{ tag }}</span></p>
          </div>
          <span plain class="button dl" @click="open(item.gid)">开始</span>
          <div :class="{'opacity': item.maintain_at}" v-if="item.maintain_at && item.enabled"></div>
          <div :class="{'opacity-sold-out': !item.enabled}" v-if="!item.enabled && item.maintain_at"></div>
        </div>
      </template>
    </infinite-scroll>
    <div v-else-if="games && games.length">
      <div class="venues" :class="{'opacity-number': item.maintain_at || !item.enabled}" v-for="item in games">
        <span class="img dl" @click="goDetail(item.gid)">
          <img v-lazy="item.image_url" width="100%" height="100%"/>
        </span>
        <div class="content dl" :class="{ 'p-top': !item.tag_list.length }">
          <p><span class="h1 padding-r">{{ item.name || '无名' }}</span><span class="perform bg-color-yellow">{{ item.vendor_name || '无' }}</span><span v-if="!item.liked" class="fa color-red heart" @click="handleLike(item.gid, item)">{{ heart }}</span><span v-if="item.liked" class="fa color-red heart" @click="handleUnlike(item.gid, item)">{{ heartFiled }}</span></p>
          <p class="h3 line-height" @click="goDetail(item.gid)">
            <star :starsData="item.star_rank"></star>
          </p>
          <p class="h3 info" :class="{ 'p-top': !item.tag_list.length }">{{ item.recommended_desc || '暂无描述' }}</p>
          <p class="tag" v-if="item.tag_list.length"><span class="yellow" v-for="tag in item.tag_list">{{ tag }}</span></p>
        </div>
        <span plain class="button dl" @click="open(item.gid)">开始</span>
        <div :class="{'opacity': item.maintain_at}" v-if="item.maintain_at && item.enabled"></div>
        <div :class="{'opacity-sold-out': !item.enabled}" v-if="!item.enabled && item.maintain_at"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Star from "@/components/Game/Star.vue"
import InfiniteScroll from "@/components/Shared/InfiniteScroll"

export default {
  props: ["gameList", "query"],
  data () {
    return {
      heart: this.$fontawesome("heart-o"),
      heartFiled: this.$fontawesome("heart"),
      imgListStars: "",
      likesStars: "",
      vendorImgListStars: ""
    }
  },
  computed: {
    games () {
      return this.gameList
    }
  },
  components: { Star, InfiniteScroll },
  methods: {
    goDetail (gid) {
      this.$router.push({ name: "GameDetail", params: {gid} })
    },
    handleLike (id, game) {
      if (this.$store.state.user.email) {
        this.$emit("handleLike", id, game)
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    },
    handleUnlike (id, game) {
      if (this.$store.state.user.email) {
        this.$emit("handleUnlike", id, game)
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    },
    open (id) {
      if (this.$store.state.user.email) {
        let toast = this.$toast({
          message: "正在加载游戏展厅...",
          position: "center"
        })
        this.api.postLaunch(id).then((res) => {
          toast.close()
          window.location.href = res.data.game_url
        }).catch((error) => {
          toast.close()
          console.log(error)
        })
      } else {
        this.$store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

$venues-h: 80px;
p {
  padding: 0;
  margin: 0;
}
.dl {
  display: inline-block;
}
#games .p-top {
  padding-top: 8px;
}
.perform {
  padding: $px 8px;
  border-radius: 3px;
  color: $color-blue9;
  transform: scale(0.7);
  display: inline-block;
}
.bg-color-red {
  background-color: $color-red;
}
.bg-color-yellow {
  background-color: $color-yellow13;
}
.bg-color-blue{
  background-color: $color-blue1
}
.color-red {
  color: $color-red;
}
.tag {
  padding-top: 3px;
  font-size: .2rem;
  .grey {
    background-color: $color-grey2;
    color: $color-white;
  }
  .yellow {
    background-color: $color-yellow13;
    font-weight: bold;
    color: $color-blue9;
  }
  span {
    padding: 1px 10px;
    margin-right: 5px;
    border-radius: 8px;
  }
}
.opacity {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  &:before {
    color: $color-red;
    content: '正在维护';
    width: inherit;
    height: inherit;
    position: absolute;
    font-size: $font-h1;
    font-weight: bold;
    top: 40%;
    left: 75%;
    transform: rotate(-45deg);
  }
}
.opacity-number {
  opacity: 0.5;
}
.opacity-sold-out {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  &:before {
    color: $color-yellow;
    content: '已下架';
    width: inherit;
    height: inherit;
    position: absolute;
    font-size: $font-h1;
    font-weight: bold;
    top: 40%;
    left: 75%;
    transform: rotate(-45deg);
  }
}
.venues {
  margin: .3rem 0;
  padding: .2rem;
  background-color: rgba($color-white, .1);
  position: relative;
  .button {
    padding: .1rem .3rem;
    font-weight: bold;
    color: $color-blue9;
    background-color: $color-yellow13;
    border-radius: 3px;
    font-size: $font-h5;
    float: right;
    display: inline-block;
    position: relative;
    top: 28px;
  }
  .content {
    padding: 0px 6px;
    vertical-align: top;
    width: 58%;
    .heart {
      margin-left: 20px;
    }
    .bottom {
      padding-bottom: 7px;
    }
    .h1 {
      font-size: $font-h4;
      color: $color-white;
      font-weight: bold;
    }
    .h2 {
      font-size: $font-h5-1;
    }
    .h3 {
      color: $color-grey3;
    }
    .line-height {
      padding: 2px 0px;
    }
    .padding-r {
      padding-right: 5px;
    }
    .info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .button {
      .red {
        background-color: $color-red;
        color: $color-white;
      }
      .blue {
        background-color: $color-blue;
        color: $color-white;
      }
      .yellow {
        background-color: $color-yellow13;
        font-weight: bold;
        color: $color-blue9;
      }
      span {
        padding: 1.1px 10px;
        margin-right: 5px;
        border-radius: 2px;
      }
    }
  }
  .img {
    & > img{
      border-radius: 5px;
    }
    width: $venues-h;
    height: $venues-h;
  }
}
.scroll-height {
  height: 500px;
  -webkit-overflow-scrolling: touch;
}
</style>
