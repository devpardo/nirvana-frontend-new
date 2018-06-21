<template lang="html">
   <div v-if="footerFlag && $route.meta.name !== 'Prize'" id="footer">
    <mt-tabbar v-model="footerSelected">
      <mt-tab-item id="tab1" @click.native="go('1')">
        <span class="img">
          <img v-if="footerSelected === 'tab1'" src="../../assets/images/footer-1-1.png" width="100%" height="100%">
          <img v-else src="../../assets/images/footer-1.png" width="100%" height="100%">
        </span>
        <p>最新</p>
      </mt-tab-item>
      <mt-tab-item id="tab2" @click.native="go('2')">
        <span class="img">
          <img v-if="footerSelected === 'tab2'" src="../../assets/images/footer-2-1.png" width="100%" height="100%">
          <img v-else src="../../assets/images/footer-2.png" width="100%" height="100%">
        </span>
        <p>游戏</p>
      </mt-tab-item>
      <mt-tab-item id="tab3" @click.native="go('3')">
        <span class="img relative">
          <img v-if="footerSelected === 'tab3'" src="../../assets/images/footer-3-1.png" width="100%" height="100%">
          <img v-else src="../../assets/images/footer-3.png" width="100%" height="100%">
          <span class="badge" v-if="getUserInfo && (hasQuests)"></span>
        </span>
        <p>福利</p>
      </mt-tab-item>
      <mt-tab-item id="tab4" @click.native="go('4')">
        <span class="img relative">
          <img v-if="footerSelected === 'tab4'" src="../../assets/images/footer-4-1.png" width="100%" height="100%">
          <img v-else src="../../assets/images/footer-4.png" width="100%" height="100%">
          <span class="badge" v-if="getUserInfo && (hasCoupons || hasRebates || hasNotifications)"></span>
        </span>
        <p>个人</p>
      </mt-tab-item>
    </mt-tabbar>
   </div>
</template>

<script>
  import { mapGetters } from "vuex"
export default {
    data () {
      return {
        count: null,
        router: this.$route,
        footerSelected: "tab1",
        footerFlag: true,
        coupons: [],
        platforms: []
      }
    },
    watch: {
      "$route.name": function () {
        let routeName = this.$route.name
        switch (routeName) {
          case "Rebates":
          case "LiveChat":
            this.footerFlag = false
            break
          default:
            this.footerFlag = true
        }
      }
    },
    computed: {
      ...mapGetters(["getUserInfo"]),
      rebates () {
        return this.platforms.reduce((rebates, platform) => {
          rebates.push(...platform.rebates)
          return rebates
        }, [])
      },
      hasCoupons () {
        return !!(this.count && this.count.coupons_count)
      },
      hasRebates () {
        return !!(this.count && this.count.unreceived_rebates_count)
      },
      hasQuests () {
        return !!(this.count && this.count.unreceived_quests_count)
      },
      hasNotifications () {
        return !!(this.count && this.count.unread_notifications_count)
      }
    },
    async mounted () {
      if (this.getUserInfo) {
        await this.getCoupons()
        await this.getPlatformRebates()

        const { data } = await this.api.counter()
        this.count = data
      }

      let tab = window.localStorage.getItem("footer")
      switch (tab) {
        case "tab1":
          this.footerSelected = "tab1"
          break
        case "tab2":
          this.footerSelected = "tab2"
          break
        case "tab3":
          this.footerSelected = "tab3"
          break
        case "tab4":
          this.footerSelected = "tab4"
          break
        default:
          this.footerSelected = "tab1"
      }
    },
    methods: {
      async getCoupons () {
        const { data } = await this.api.getCoupons()
        this.coupons = data.items
      },
      async getPlatformRebates () {
        const { data } = await this.api.getRebates()
        this.platforms = data.items
      },
      go (n) {
        switch (n) {
          case "1":
            this.footerSelected = "tab1"
            window.localStorage.setItem("footer", "tab1")
            this.$router.push("/")
            break
          case "2":
            this.footerSelected = "tab2"
            window.localStorage.setItem("footer", "tab2")
            this.$router.push("/vendors")
            break
          case "3":
            if (!this.getUserInfo) {
              this.$router.push("/setting/profile")
            } else {
              this.footerSelected = "tab3"
              window.localStorage.setItem("footer", "tab3")
              this.$router.push("/tasks")
            }
            break
          case "4":
            this.footerSelected = "tab4"
            window.localStorage.setItem("footer", "tab4")
            this.$router.push("/setting/profile")
            break
          default:
            this.footerSelected = "tab1"
            window.localStorage.setItem("footer", "tab1")
            this.$router.push("/")
        }
      }
    }
  }
</script>

<style lang="scss">
  #footer {
    .mint-tabbar {
      height: 1.2rem;
      .mint-tab-item-label {
        font-size: 0.3rem;
        .img {
          width: 20px;
          height: 20px;
          margin-bottom: 5px;
          & > img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";

  .relative {
    position: relative;
  }

  .badge {
    height: 0.4rem;
    width: 0.4rem;
    position: absolute;
    background-color: red;
    top: -0.133333rem;
    right: -0.266667rem;
    border-radius: 0.266667rem;
    text-align: center;
    font-style: unset;
    display: block;
    color: #fff;
    line-height: 0.4rem;
  }

  p {
    padding: 0px;
    margin: 0px;
  }
  .mint-tabbar {
    position: fixed;
    bottom: 0;
  }
  .fa {
    display: block;
    font-size: 20px;
    padding-top: 1px;
    padding-bottom: 7px;
  }
  .mint-tabbar > .mint-tab-item {
    font-weight: bold;
    color: rgba($color-white, 0.5);
    background-color: $color-blue9 !important;
  }
  .mint-tabbar > .mint-tab-item.is-selected {
    background-color: none;
    color: $color-yellow13;
  }
  .img {
    display: inline-block;
  }
</style>
