<template lang="html">
  <div class="body">
    <div class="detail">
      <pre>{{ announcementDetail.content || '无' }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      announcementDetail: ""
    }
  },
  computed: {
    announcementId () {
      return this.$route.params.announcementId
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    this.fetchAnnouncementDetail()
  },
  methods: {
    fetchAnnouncementDetail () {
      this.api.getAnnouncementDetail(this.announcementId).then((res) => {
        this.announcementDetail = res.data
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.detail {
  min-height: 10rem;
  padding: .3rem;
  margin: .3rem .3rem;
  text-align: left;
  background-color: $color-blue8;
  border-radius: 5px;
  color: $color-white;
  font-size: $font-h4;
  pre {
    white-space:pre-wrap;
    word-wrap: break-word;
  }
}
</style>
