<template lang="html">
  <div class="body" v-scroll="chatLines">
    <mt-loadmore :top-method="loadTop" @top-status-change="handleTopChange" ref="loadmore">
      <div v-for="message in chatLines" style="overflow: hidden" v-if="message.cate != 'cate_object'">
        <!--<mt-spinner type="fading-circle" v-if="isSendingMessage(message)" class="loading fl"></mt-spinner>-->
        <div class="message fl" v-if="!isSelf(message)">
          <span class="chat-date fl-bottom">{{ message.created_at | date('yyy-MM-dd HH:mm:ss') }}</span>
          <span class="chat-name">{{ message.sender && message.sender.nickname }}</span>
          <span class="img"><img v-lazy="message.sender && message.sender.aws_url" width="100%" height="100%"/></span>
          <p class="txt bg-fl">{{ message.content || '[]' }}<span class="arrow_left"></span></p>
        </div>
        <div class="message fr" v-else>
          <span class="chat-date fr-bottom fr">{{ message.created_at | date('yyy-MM-dd HH:mm:ss') }}</span>
          <span class="img fr clearfix"><img v-lazy="userAvatar" width="100%" height="100%"/></span>
          <p class="txt bg-fr fr">{{ message.content || '[]' }}<span class="arrow_right"></span></p>
        </div>
      </div>
      <div slot="top" class="mint-loadmore-top">
        <div v-if="!noMoreMessages">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">History loading...</span>
        </div>
        <span v-if="noMoreMessages">无更多历史记录</span>
      </div>
    </mt-loadmore>
    <div class="clearfix" id="scroll"></div>
    <!--<mt-spinner v-if="chatLoading" type="snake" class="load-position"></mt-spinner>-->
    <div class="clearfix chat-input fixed" id="input">
      <input type="text" class="dl" v-model="chatContent" @click="focus()"/>
      <mt-button class="dl send" @click="handleSentMessage" :disabled="!currentChat || !currentCustomer">发送</mt-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue"
import "@/libs/filters"
import { mapState } from "vuex"

export default {
  data () {
    return {
      topStatus: "",
      onlineCustomers: [],
      currentCustomer: null,
      userAvatar: this.$store.state.user.aws_url,
      chatContent: "",
      chatLines: [],
      query: {
        page: 0,
        per_page: 10
      },
      chatLinePaginateMeta: null
    }
  },
  computed: {
    ...mapState({
      currentChat: state => state.chat.currentChat,
      cable: state => state.chat.cable
    }),
    noMoreMessages () {
      return this.chatLinePaginateMeta && (this.chatLinePaginateMeta.total_pages === this.query.page || this.chatLinePaginateMeta.total_pages === 0)
    },
    chatLoading: function () {
      return !this.noMoreMessages
    }
  },
  watch: {
    onlineCustomers (newVal) {
      this.updateChatAdmin()
    },
    currentChat (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.updateChatAdmin()
        this.fetchNexPageChatLine()
        this.$store.dispatch("makeAllChatMessageRead")
      }
    }
  },
  methods: {
    fetchChat () {
      this.api.getOwnChat().then(res => {
        this.currentChat = res.data
        this.fetchNexPageChatLine()
      })
    },
    fetchOnlineAdmins () {
      this.api.getOnlineCustomers().then((res) => {
        this.onlineCustomers = res.data.customers
      })
    },
    fetchNexPageChatLine () {
      this.query.page += 1
      this.api.getChatLines(this.currentChat.id, this.query).then(res => {
        this.chatLinePaginateMeta = res.data.paginate_meta
        this.chatLines = res.data.chat_lines.reverse().concatUniq(this.chatLines, "id")
        this.$refs.loadmore.onTopLoaded()
        this.$nextTick(() => {
          this.focus()
        })

        // 建立消息订阅
        if (this.query.page === 1) {
          var that = this
          let query = this.$route.query
          this.ory = this.cable.subscriptions.create({ channel: "ChatLinesChannel", chat_id: that.currentChat.id }, {
            connected () {
              if (query && query.type) {
                setTimeout(() => {
                  this.sendMessage(JSON.stringify({type: query.type, typeId: query.typeId}), "cate_object")
                }, 1000)
              }
            },
            received (data) {
              that.chatLines.push(data)
              this.mark_chat_line_read(data)
            },
            sendMessage (message, cate = "cate_text") {
              this.perform("send_message", {message, cate, chat_id: that.currentChat.id, receiver_id: that.currentChat.user_id})
            },
            mark_chat_line_read (data) {
              this.perform("mark_chat_line_read", { chat_line_id: data.id })
            }
          })
        }
      })
    },
    handleSentMessage () {
      if (this.chatContent.match(/^\s*$/)) {
        this.$toast({
          message: "不能发送空白消息",
          position: "middle",
          duration: 5000
        })
        return
      } else {
        this.ory && this.ory.sendMessage(this.chatContent)
        this.chatContent = ""
      }
    },
    handleTopChange (status) {
      this.topStatus = status
    },
    isSelf (message) {
      return message.sender_id === this.currentChat.user.id
    },
    loadTop () {
      if (this.noMoreMessages) {
        this.$refs.loadmore.onTopLoaded()
        return
      }
      this.fetchNexPageChatLine()
    },
    focus () {
      document.getElementById("scroll").scrollIntoView(true)
    },
    updateChatAdmin () {
      if (this.currentChat && this.onlineCustomers.length) {
        let exist = false
        this.onlineCustomers.forEach(customer => {
          if (customer.id === this.currentChat.admin_id) {
            this.currentCustomer = customer
            exist = true
          }
        })
        if (!exist) {
          let randomIndex = parseInt(Math.random() * this.onlineCustomers.length)
          let currentCustomer = this.onlineCustomers[randomIndex]
          this.api.updateChatInfo({admin_id: currentCustomer.id}).then(res => {
            this.currentCustomer = currentCustomer
          })
        }
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
    if (this.currentChat) {
      this.fetchNexPageChatLine()
      this.$store.dispatch("makeAllChatMessageRead")
    }
    this.fetchOnlineAdmins()
  },
  beforeDestroy () {
    this.cable.subscriptions.remove(this.ory)
  },
  directives: {
    scroll: {
      componentUpdated: function (el) {
        Vue.nextTick(function () {
          // el 对应上面的scroll绑定的el
          if ((el.scrollHeight - el.scrollTop - el.clientHeight) < 300) {
            document.getElementById("scroll").scrollIntoView(true)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.dl {
  display: inline-block;
}
.body {
  padding: 10px;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 50px;
  position: absolute;
  padding-bottom: 52px;
  overflow: scroll;
}
.loading {
  display: inline-block;
  position: relative;
  top: 50px;
}
.message {
  margin: 10px;
  text-align: justify;
  .img {
    display: inline-block;
    width: 40px;
    height: 40px;
    vertical-align: top;
  }
  .bg-fl {
    background-color: $color-white;
  }
  .bg-fr {
    background-color: $color-yellow1;
    right: 5px;
  }
  .txt {
    margin: 0 10px;
    position: relative;
    display: inline-block;
    padding: 10px;
    max-width: 255px;
    font-size: $font-h4;
    padding: 10px;
    border-radius: 5px;
    line-height: 1.2em;
    word-wrap: break-word;
  }
}
.arrow_left {
  position: absolute;
  top: 10%;
  left: -7px;
  width: 0;
  height: 0;
  border-width: 8px 8px 8px 0;
  border-style: solid;
  border-color: transparent $color-white transparent transparent;
}
.arrow_right {
  position: absolute;
  top: 10%;
  right: -7px;
  width: 0;
  height: 0;
  border-width: 8px 0 8px 8px;
  border-style: solid;
  border-color: transparent transparent transparent $color-yellow1;
}
.chat-input {
  height: 50px;
  padding: 5px 10px;
  input {
    border: $px solid $color-grey;
    outline: none;
    width: 82%;
    height: 100%;
  }
  .send {
    padding: 8px;
    background-color: $color-yellow1;
    color: $color-white;
    border-radius: 5px;
    letter-spacing: 3px;
    font-size: $font-h4;
    height: initial;
    border: none;
  }
}
.fixed {
  position: fixed;
  bottom: 54px;
  right: 0;
  left: 0;
  z-index: 100;
  background-color: $color-white;
}
.load-position {
  display: block;
  position: relative;
  left: 45%;
}
.chat-date {
  background-color: $color-grey1;
  color: $color-white;
  display: block;
  max-width: 200px;
  padding: 2px 5px;
  text-align: center;
  border-radius: 3px;
}
.fl-bottom { margin-bottom: 5px; }
.fr-bottom { margin-bottom: 10px; }
.chat-name {
  display: block;
  text-align: left;
  padding: 5px;
  padding-top: 0px;
}
</style>
