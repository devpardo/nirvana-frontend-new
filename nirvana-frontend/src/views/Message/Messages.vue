<template lang="html">
  <div class="body">
    <div class="message">
      <div class="cell-message" @click="toNot()">
        <span class="img"><img src="~assets/images/ico-msg.png" width="100%" height="100%"><span class="red-circle" v-if="unread_count"></span></span>
        <div class="content">
          <p><span class="title">通知信息</span><span class="date fr" v-if="messages[0]">{{ messages[0].created_at }}</span></p>
          <p class="info" v-if="messages[0]">
            <span class="preview">{{ messages[0].title }}</span>
            <badge class="fr" :count="unread_count"></badge>
          </p>
        </div>
      </div>
      <div class="cell-message" @click="toAnnounce()">
        <span class="img"><img src="~assets/images/ico-memo.png" width="100%" height="100%"></span>
        <div class="content">
          <p><span class="title">公告信息</span><span class="date fr" v-if="messages[1]">{{ messages[1].created_at }}</span></p>
          <p class="info" v-if="messages[1]">{{ messages[1].title }}</p>
        </div>
      </div>
    </div>

    <div class="server">
      <!-- <div class="cell-message" @click="toChat()"> -->
      <div class="cell-message" @click="openLiveChat()">
        <span class="img"><img src="~assets/images/cs-avatar.png" width="100%" height="100%"><span></span></span>
        <div class="content">
          <p><span class="title">客服咨询</span></p>
          <p class="info">
            客服咨询，解你烦忧
            <badge class="fr" :count="unreadMessageCount"></badge>
          </p>
        </div>
      </div>

      <div v-if="getUserInfo" class="cell-message" @click="$root.$emit('showCallCenter',true)">
        <span class="img"><img src="~assets/images/call-center.png" width="100%" height="100%"><span></span></span>
        <div class="content">
          <p><span class="title">电话回拨</span></p>
          <p class="info">
            客服将为您提供7*24小时电话服务
          </p>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapState, mapGetters } from "vuex"
import Badge from "@/components/Shared/Badge"

export default {
    data () {
      return {
        messages: [],
        unread_count: ""
      }
    },
    computed: {
      ...mapState({
        currentChat: state => state.chat.currentChat
      }),
      ...mapGetters(["getUserInfo"]),
      unreadMessageCount () {
        return (this.currentChat && this.currentChat.user_unread_count) || 0
      },
      email () {
        return this.$store.state.user.email
      }
    },
    watch: {
      email (n) {
        if (n) {
          this.fetchNotifications()
        }
      }
    },
    mounted () {
      let sundry = { navigateTitle: false }
      this.$store.dispatch("setNavigationTitle", sundry)
      this.fetchNotifications()
    },
    components: { Badge },
    methods: {
      // 通知
      toNot () {
        if (this.email) {
          if (!this.messages[0]) {
            this.$toast({
              message: "暂无任何通知消息",
              position: "middle",
              duration: 5000
            })
            return
          }
        }
        this.$router.push("/notifications")
      },
      fetchNotifications () {
        if (!this.email) return
        this.api
          .getNotifications({ per_page: 1, page: 1 })
          .then(res => {
            this.messages.push(res.data.items[0])
            this.unread_count = res.data.unread_count || 0
            this.$store.dispatch("setMessageCount", this.unread_count)
            localStorage.setItem("messageCount", this.unread_count)
            this.fetchAnnouncements()
          })
          .catch(error => {
            console.log(error)
          })
      },
      // 公告
      toAnnounce () {
        if (this.email) {
          if (!this.messages[1]) {
            this.$toast({
              message: "暂无任何公告消息",
              position: "middle",
              duration: 5000
            })
            return
          }
        }
        this.$router.push("/announcements")
      },
      fetchAnnouncements () {
        this.api
          .getAnnouncement({ per_page: 1, page: 1 })
          .then(res => {
            this.messages.push(res.data.items[0])
          })
          .catch(error => {
            console.log(error)
          })
      },
      toChat () {
        this.$router.push({ name: "ChatDetail", params: { chatId: 2 } })
      },
      openLiveChat () {
        console.log("openLiveChat")
        this.$router.push({ name: "LiveChat", params: { chatId: 2 } })
      },
      showCallCenter () {
        console.log("Call center")
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  p {
    padding: 0px;
    margin: 0px;
  }
  .message {
    margin: 0.3rem;
    background-color: $color-blue8;
  }
  .server {
    min-height: 6rem;
    background-color: $color-blue8;
    margin: 0 0.3rem;
  }
  .cell-message {
    height: 1.6rem;
    padding: 10px;
    border-bottom: $px solid $color-blue9;
    .img,
    .content {
      display: inline-block;
    }
    .img {
      position: relative;
      width: 40px;
      height: 40px;
      .red-circle {
        position: absolute;
        width: 8px;
        height: 8px;
        background-color: $color-red;
        border-radius: 50%;
        display: inline-block;
        top: 1px;
        right: 1px;
      }
      & > img {
        border-radius: 5px;
      }
    }
    .content {
      position: absolute;
      width: 78%;
      padding-left: 0.3rem;
    }
    .title {
      font-size: $font-h4;
      color: $color-white;
      font-weight: bold;
    }
    .date {
      color: $color-grey2;
    }
    .info {
      color: $color-grey2;
      width: 100%;
      .preview {
        width: 80%;
        display: inline-block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
