<template lang="html">
  <div class="body">
    <div class="detail">
      {{ notifyDetail.content || '无' }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      notifyDetail: ""
    }
  },
  computed: {
    notificationId () {
      return this.$route.params.notificationId
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    this.fetchNotifyDetail()
  },
  methods: {
    handleNotifyRead () {
      this.api.postNotifyRead(this.notificationId).then((res) => {
      }).catch((error) => {
        console.log(error)
      })
    },
    fetchNotifyDetail () {
      this.api.getNotifyDetail(this.notificationId).then((res) => {
        this.notifyDetail = res.data
        this.handleNotifyRead()
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
  padding: .5rem .3rem;
  margin: .3rem;
  text-align: left;
  background-color: $color-blue8;
  border-radius: 5px;
  color: $color-white;
  font-size: $font-h4;
  min-height: 5rem;
}
</style>
