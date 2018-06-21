<template lang="html">
  <div class="body">
    <div class="announcement" v-if="announcementList.length" v-for="item in announcementList">
      <div class="content"><span class="limit">{{ item.title || '无'}}</span><span class="date">{{ item.created_at || '无' }}</span><span class="more" v-if="item.content" @click="goAnnouncementDetail(item.id)"> 点击查看详情 >></span></div>
    </div>
    <p v-show="loding" class="loading"><mt-spinner type="fading-circle" class="load-position"></mt-spinner><span class="load-txt">加载中</span></p>
    <p class="no-data" v-if="responeData && !announcementList.length">无公告消息</p>
  </div>
</template>

<script>

export default {
  data () {
    return {
      announcementList: [],
      responeData: false,
      loding: false
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchAnnouncements()
  },
  methods: {
    fetchAnnouncements () {
      this.loding = true
      this.api.getAnnouncement().then((res) => {
        this.responeData = true
        this.loding = false
        this.announcementList = this.announcementList.concat(res.data.items)
      }).catch((error) => {
        this.loding = false
        console.log(error)
      })
    },
    goAnnouncementDetail (announcementId) {
      this.$router.push({ name: "AnnouncementDetail", params: {announcementId} })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.announcement {
  padding: 0 .3rem;
  margin: .3rem 0;
  .date {
    font-size: $font-h5;
    color: $color-grey2;
    padding-right: 10px;
  }
  .content {
    margin: 0 auto;
    margin-top: .3rem;
    background-color: $color-blue8;
    padding: .5rem .3rem;
    border-radius: 5px;
    font-size: $font-h4;
    .limit {
      width: 100%;
      color: $color-white;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      display: inline-block;
    }
  }
  .more {
    font-size: $font-h5;
    color: $color-yellow13;
    display: inline-block;
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
