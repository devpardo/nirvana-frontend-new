<template>
  <div class="body" style="height: 100%;padding-bottom:0">
    <iframe id="show-iframe" width="100%" height="100%" frameborder=0 name="showHere" scrolling=auto :src="url"></iframe>
  </div>
</template>
<style>

</style>
<script>
  // import VueFrame from 'vue-frame'
  export default{
    data () {
      return {
        loading: false,
        base_url: "https://szzero.livechatvalue.com/chat/chatClient/chatbox.jsp?companyID=941750&configID=57299&jid=7182627055&s=1"
      }
    },
    computed: {
      url () {
        let { username } = this.$store.state.user
        let info = encodeURIComponent(`userId=123&name=${username}&memo=`)
        // console.log(`${this.base_url}&info=${info}`)
        return `${this.base_url}&info=${info}`
      }
    }
    // components: { VueFrame }
  }
</script>
