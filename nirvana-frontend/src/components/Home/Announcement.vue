<template lang="html">
  <div>
    <div class="game-alert" v-if="announcementFlag && homeAnnouncement && homeAnnouncement.content" @click="goAnnouncementDetail(homeAnnouncement.id)">
      <span class="scroll" v-scroll>{{ homeAnnouncement.content }}</span>
      <span class="g-close fa" @click.stop="announcementClose()">{{ close }}</span>
    </div>
  </div>
</template>

<script>
import Vue from "vue"

export default {
  data () {
    return {
      close: this.$fontawesome("close"),
      homeAnnouncement: "",
      announcementFlag: false
    }
  },
  mounted () {
    if (!localStorage.getItem("announcementFlag")) {
      this.fetchHomeAnnouncement()
    }
  },
  directives: {
    scroll: {
      bind: (el) => {
        Vue.nextTick(() => {
          let scrollWidth = screen.width - 40
          let tempWidth = scrollWidth
          function getInterval () {
            el.widthIntervalTime = setInterval(() => {
              tempWidth = -1 + tempWidth
              if (tempWidth < -el.clientWidth) {
                el.style.left = scrollWidth + "px"
                tempWidth = scrollWidth
              } else {
                el.style.left = tempWidth + "px"
              }
            }, 20)
          }
          if (el.clientWidth > scrollWidth) {
            el.style.left = scrollWidth + "px"
            getInterval()
          }
        })
      },
      unbind: (el) => {
        if (el.widthIntervalTime) {
          window.clearInterval(el.widthIntervalTime)
        }
      }
    }
  },
  methods: {
    fetchHomeAnnouncement () {
      this.api.getHomeAnnouncement().then((res) => {
        this.announcementFlag = true
        this.homeAnnouncement = res.data.announcement
      }).catch((error) => {
        console.log(error)
      })
    },
    announcementClose () {
      if (!localStorage.getItem("announcementFlag")) {
        localStorage.setItem("announcementFlag", false)
      }
      this.announcementFlag = false
    },
    goAnnouncementDetail (announcementId) {
      this.$router.push({ name: "AnnouncementDetail", params: {announcementId} })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.game-alert {
  background-color: $color-yellow3;
  padding: 10px;
  width: 100%;
  min-height: 1rem;
  position: relative;
  .scroll {
    position: absolute;
    z-index: 0;
    display: inline-block;
    overflow: hidden;
    white-space: nowrap;
  }
  .g-close {
    color: $color-yellow4;
    font-size: $font-h2;
    vertical-align: top;
    float: right;
    position: relative;
    z-index: 1;
    padding: 0 5px;
    margin-right: -10px;
    background-color: $color-yellow3;
  }
}
</style>
