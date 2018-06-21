<template lang="html">
  <div v-if="$route.meta.name !== 'Prize'">
    <div class="head" :class="{'bg-blue': bgColor, 'bg-white': !bgColor, 'head-top': prizeFlag}">
      <div v-if="!navigateTitle">
        <span class="fa fl" @click='goBack()'>{{ left }}</span>
        <span class="title" :class="{ 'title-position': !messageFlag }">{{ title }}</span>
        <span class="action fr" v-if="manager" @click="manageMyBanks()">管理</span>
        <span class="action fr" v-if="profileInfoFlag" @click="doneProfileInfo()">完成</span>
        <span class="action fr" v-if="balanceHistoryFlag" @click="filtrate()">筛选</span>
        <span class="action fr" v-if="!manager && !profileInfoFlag && !balanceHistoryFlag && !deleteBank && !messageFlag && !rebateRules" @click="goMessage()">客服</span>
        <!--<span class="action-delete fr" v-if="deleteBank" @click="deleteMyBanks()">删除</span>-->
        <span class="action fr" v-if="rebateRules" @click="getRebateRules()">规则</span>
      </div>
      <div v-if="navigateTitle">

        <template v-if="showDownloadUrl">
          <a href="#" v-if="isIOS" @click="openIOSDownload()" class="dl-btn"> <img src="~assets/images/dl-icon.png"> 下载APP</a>
          <a class="dl-btn" v-else href="https://s3.ap-northeast-2.amazonaws.com/yt8/x65586-adr-v127.apk" download="mr.apk"> <img src="~assets/images/dl-icon.png"> 下载APP</a>
        </template>

        <span class="fa message fr" :class="[ unreadMessageCount >= 99 ? 'three-letter' : 'two-letter' ]" @click="goMessage()">
          {{ headRight }}
          <span v-if="unreadMessageCount">
            <span class="message-count" :class="{ 'one-letter': unreadMessageCount < 10 }" v-if="unreadMessageCount < 99">{{ unreadMessageCount }}</span>
            <span class="message-count" v-else>99+</span>
          </span>
        </span>

        <span class="fa promo-trigger fr" @click="debug()">{{ promoTrigger }}</span>

        <span class="title" :class="{ 'title-position': !messageFlag }">{{ title }}</span>
      </div>
      <span class="img" v-if="imgShow"><img src="~assets/images/manwin-logo.png" width="100%" height="100%"/></span>
    </div>
    <quick-login v-if="quicklyLogin"></quick-login>
    <search-list v-if="searchObj.flag" :search="searchObj"></search-list>
    <!--<audio-player></audio-player>-->
  </div>
</template>

<script>
  import QuickLogin from "@/components/Shared/QuickLogin.vue"
  import SearchList from "@/components/Shared/SearchList.vue"
  import AudioPlayer from "@/components/Shared/AudioPlayer.vue"

const getUserAgent = () => {
    var u = navigator.userAgent,
      app = navigator.appVersion
    return {
      // 绉诲姩缁堢娴忚鍣ㄧ増鏈俊鎭�
      trident: u.indexOf("Trident") > -1, // IE鍐呮牳
      presto: u.indexOf("Presto") > -1, // opera鍐呮牳
      webKit: u.indexOf("AppleWebKit") > -1, // 鑻规灉銆佽胺姝屽唴鏍�
      gecko: u.indexOf("Gecko") > -1 && u.indexOf("KHTML") == -1, // 鐏嫄鍐呮牳
      mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 鏄惁涓虹Щ鍔ㄧ粓绔�
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios缁堢
      android: u.indexOf("Android") > -1 || u.indexOf("Linux") > -1, // android缁堢鎴栬€卽c娴忚鍣�
      iPhone: u.indexOf("iPhone") > -1, // 鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
      iPad: u.indexOf("iPad") > -1, // 鏄惁iPad
      webApp: u.indexOf("Safari") == -1, // 鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
      isBaiduApp: u.toLowerCase().indexOf("baiduboxapp") != -1 // 鏄惁鎵嬫満鐧惧害
    }
}

export default {
    data () {
      return {
        imgShow: false,
        left: this.$fontawesome("angle-left"),
        headRight: this.$fontawesome("commenting-o"),
        promoTrigger: this.$fontawesome("clone"),
        bgColor: true,
        manager: false,
        deleteBank: false,
        profileInfoFlag: false,
        balanceHistoryFlag: false,
        messageFlag: false,
        rebateRules: false,
        isIOS: false,
        isMobile: false,
        showDownloadUrl: true
      }
    },
    watch: {
      "$route.meta.name": function () {
        let metaName = this.$route.meta.name
        switch (metaName) {
          case "Message":
            this.messageFlag = true
            break
          default:
            this.messageFlag = false
        }
      },
      "$route.name": function () {
        let routeName = this.$route.name
        switch (routeName) {
          case "PhotoEdit":
          case "Messages":
          case "Notifications":
          case "ChatDetail":
          case "NotificationDetail":
          case "Orders":
          case "OrderDetail":
          case "Withdraw":
          case "Deposit":
          case "SelectBank":
          case "ChangePassword":
          case "Announcements":
          case "AnnouncementDetail":
          case "GameDetail":
          case "ProfileInfoEdit":
          case "BalanceHistories":
          case "BalanceHistory":
          case "OfflineWepay":
          case "OfflineAlipay":
            this.bgColor = false
            this.manager = false
            this.deleteBank = false
            this.rebateRules = false
            break
          case "AddBank":
            this.bgColor = false
            this.manager = true
            this.deleteBank = false
            this.rebateRules = false
            break
          case "Banks":
            this.bgColor = false
            this.deleteBank = true
            this.manager = false
            this.rebateRules = false
            break
          case "Rebates":
            this.rebateRules = true
            this.bgColor = true
            this.deleteBank = false
            this.manager = false
            break
          default:
            this.bgColor = true
            this.manager = false
            this.deleteBank = false
            this.rebateRules = false
        }
      },
      email (newVal, oldVal) {
        if (newVal && !oldVal) {
          this.fetchChat()
        }
      }
    },
    mounted () {
      if (this.$store.state.user.email) {
        this.$store.dispatch("setQuicklyLogin", false)
        this.fetchChat()
      }

      if (window.location.host === "m.ytai2.com") {
        this.showDownloadUrl = false
      }

      console.log("Test " + this.hideDownloadUrl)
      console.log(window.location.host)

      const agent = getUserAgent()
      this.isIOS = agent.ios
      this.isMobile = agent.mobile
    },
    components: { QuickLogin, SearchList, AudioPlayer },
    computed: {
      prizeFlag: function () {
        return this.$store.state.sundry.prizeFlag
      },
      unreadMessageCount () {
        return (
          this.$store.state.chat.currentChat &&
          this.$store.state.chat.currentChat.user_unread_count
        )
      },
      email () {
        return this.$store.state.user.email
      },
      title: function () {
        let name = this.$route.name
        if (name === "Home") {
          this.imgShow = true
          return ""
        } else {
          this.imgShow = false
          if (name === "ChatDetail") {
            return "亚太客服"
          }
          localStorage.removeItem("balanceHistoriesFiltrate")
          this.balanceHistoryFlag = false
          if (name === "BalanceHistories") {
            this.balanceHistoryFlag = true
          }
          if (name === "Vendor" || name === "Games") {
            return (
              (localStorage.getItem("vendorName") || "") + this.$route.meta.title
            )
          } else if (name === "ProfileInfoEdit") {
            let data = localStorage.getItem("profileInfo")
            if (data) {
              this.profileInfoFlag = true
              if (data === "1") {
                return "真实姓名"
              } else if (data === "2") {
                return "性别"
              } else if (data === "3") {
                return "出生日期"
              }
            }
          } else {
            if (!localStorage.getItem("profileInfo")) {
              this.profileInfoFlag = false
            }
            return this.$route.meta.title
          }
        }
      },
      navigateTitle: function () {
        return this.$store.state.sundry.navigateTitle
      },
      quicklyLogin: function () {
        return this.$store.state.sundry.quicklyLogin
      },
      searchObj: function () {
        return this.$store.state.sundry.searchObj
      }
    },
    methods: {
      fetchChat () {
        this.api.getOwnChat().then(res => {
          this.$store.commit("SET_CHAT", res.data)
        })
      },
      debug() {
        this.$store.commit("SET_MODAL", {
          key: "promo",
          value: true
        })
        console.log("clicked");
      },
      filtrate () {
        let flag = this.$store.state.sundry.balanceHistoriesFiltrate
        if (flag) {
          this.$store.dispatch("setBalanceHistoriesFiltrate", false)
        } else {
          this.$store.dispatch("setBalanceHistoriesFiltrate", true)
        }
      },
      doneProfileInfo () {
        this.$store.dispatch("setProfileInfoEditDone", true)
      },
      deleteMyBanks () {
        let flag = this.$store.state.sundry.deleteBanksFlag
        if (flag) {
          this.$store.dispatch("setDeleteBanksFlag", false)
        } else {
          this.$store.dispatch("setDeleteBanksFlag", true)
        }
      },
      getRebateRules () {
        this.$router.push({ name: "RebateRule" })
      },
      manageMyBanks () {
        this.$router.push("/setting/banks")
      },
      goBack () {
        if (this.$route.name === "ProfileInfoEdit") {
          if (localStorage.getItem("profileInfo")) {
            localStorage.removeItem("profileInfo")
            this.profileInfoFlag = false
          }
        }
        if (this.$route.name === "BalanceHistory") {
          if (Object.keys(this.$route.query).length <= 0) {
            this.$router.push({ name: "Withdraw" })
          } else {
            this.$router.push({
              name: "BalanceHistories",
              query: this.$route.query
            })
          }
        } else if (
          this.$route.name === "BalanceHistories" ||
          this.$route.name === "Withdraw" ||
          this.$route.name === "ProfileEdit"
        ) {
          this.$router.push({ name: "Profile" })
        } else if (this.$route.name === "Banks") {
          let from = localStorage.getItem("banks") // 1表示来自提款 2表示来自个人中心
          if (from) {
            if (parseInt(from) === 2) {
              this.$router.push({ name: "ProfileEdit" })
            } else {
              window.history.go(-1)
            }
          }
        } else {
          window.history.go(-1)
        }
      },
      goMessage () {
        if (this.$route.name === "BalanceHistory") {
          this.$router.push({
            name: "ChatDetail",
            query: {
              type: "BalanceHistory",
              typeId: this.$route.params.balanceId
            }
          })
        } else if (this.$route.name === "NotificationDetail") {
          this.$router.push({
            name: "ChatDetail",
            query: {
              type: "Notification",
              typeId: this.$route.params.notificationId
            }
          })
        } else {
          this.$router.push("/messages")
        }
      },
      check () {
        const agent = getUserAgent()
        this.isIOS = agent.ios
        this.isMobile = agent.mobile

        if (this.isIOS && agent.mobile) {
          this.$root.$emit("download", agent)
        } else if (agent.android && agent.mobile) {
          console.log("Android")
        } else {
          window.location.href = "http://www.yt8.com"
        }
      },
      openIOSDownload () {
        const agent = getUserAgent()
        this.$root.$emit("download", agent)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .head {
    @include line-height(1.2rem);
    padding: 0px 10px;
    text-align: center;
    position: fixed;
    width: 100%;
    z-index: 300;
    .title {
      font-size: $font-h3;
      font-weight: bold;
    }
    .title-position {
      position: relative;
    }
    .img {
      display: inline-block;
      width: 120px;
      position: relative;
      top: 1px;
    }
    .fl,
    .fr {
      line-height: inherit;
    }
    .fl {
      font-size: $font-h;
    }
    .message {
      position: relative;
      font-size: 20px;
    }
  }
  .head-top {
  }
  .action {
    font-size: $font-h4;
  }
  .action-delete {
    font-size: $font-h4;
    color: $color-red;
  }
  .bg-red {
    background-color: $color-red;
    color: $color-white;
  }
  .bg-white {
    background-color: $color-blue9;
    color: $color-white;
  }
  .bg-black {
    background-color: $color-black0;
    color: $color-blue8;
  }
  .bg-blue {
    background-color: $color-blue9;
    color: $color-yellow13;
  }
  .message-count {
    position: absolute;
    font-size: 14px;
    color: white;
    top: 5px;
    left: 12px;
    background: $color-yellow1;
    display: inline-block;
    padding: 0px 6px;
    border-radius: 10px;
    line-height: initial;
  }
  .one-letter {
    padding: 0px 8px;
  }
  .two-letter {
    right: 5px;
  }
  .three-letter {
    right: 15px;
  }

  .promo-trigger {
    line-height: inherit;
    padding: 0 10px;
    margin-right: 5px;
    font-size: 20px;
  }

  .dl-btn {
    color: $color-yellow13;
    float: left;

    img {
      vertical-align: middle;
      height: 1em;
    }
  }
</style>
