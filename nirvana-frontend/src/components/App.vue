<template lang="html">
  <div id="app">
    <download :download.sync="download" :user-agent="userAgent"></download>
    <call-center :show-call-center="showCallCenter"></call-center>
    <!--<prize class="app-prize"></prize>-->
    <div v-if="email" class="app-wrap">
      <app-head></app-head>
      <router-view :class="{ 'app-wrap-top': prizeFlag }"></router-view>
      <app-foot></app-foot>
    </div>
    <div v-else class="app-wrap">
      <app-head v-if="skipLogin"></app-head>
      <router-view :class="{ 'app-wrap-top': prizeFlag }"></router-view>
      <app-foot v-if="skipLogin"></app-foot>
    </div>
    <promo-modal v-if="promos.length" :value="promoModalValue" @input="onClosePromoModal" :promos="promos"></promo-modal>
  </div>
</template>

<script>
  import AppHead from "@/components/Shared/Header.vue";
  import AppFoot from "@/components/Shared/Footer.vue";
  import Prize from "@/components/Shared/Prize";
  import base from "@/components/base";
  import CallCenter from "@/views/Popup/CallCenter";
  import { mapGetters } from "vuex";
  import Download from "@/components/Shared/Download";
  import PromoModal from "@/components/Home/PromoModal.vue";
  export default {
    mixins: [base],
    data() {
      return {
        skipLogin: false,
        showCallCenter: false,
        download: false,
        userAgent: null,
        modal: {
          promo: true
        },
        promos: []
      };
    },
    components: { AppHead, AppFoot, Prize, CallCenter, Download, PromoModal },
    computed: {
      ...mapGetters(["auth"]),
      email: function() {
        return this.$store.state.user.email;
      },
      prizeFlag: function() {
        return this.$store.state.sundry.prizeFlag;
      },
      promoModalValue() {
        return this.$store.getters.modal("promo");
      }
    },
    watch: {
      "$route.name": function(newName) {
        switch (newName) {
          case "StartLoad":
          case "StartIndex":
          case "Join":
          case "Login":
          case "ForgetPassword":
          case "SettingPassword":
          case "NotFound":
            this.skipLogin = false;
            this.$store &&
              this.$store.dispatch("setQuicklyLogin", { quicklyLogin: false });
            break;
          default:
            this.skipLogin = true;
        }
      },
      $route: "openPromoModal"
    },
    methods: {
      async onShowCallCenter(event) {
        this.showCallCenter = event;
        await this.api.requestCallback();
      },

      async onClickDownload(agent) {
        this.userAgent = agent;
        this.download = true;
      },
      onClosePromoModal(value) {
        this.$store.commit("SET_MODAL", {
          key: "promo",
          value
        });
      },
      openPromoModal() {
        if (this.$route.name === "Home") {
          console.log("das");
          this.$store.commit("SET_MODAL", {
            key: "promo",
            value: true
          });
        }
      }
    },
    async mounted() {
      this.$root.$on("showCallCenter", this.onShowCallCenter);

      this.$root.$on("download", this.onClickDownload);
      const { data } = await this.api.getHomePopSuggests();

      this.promos = data.map(promo => {
        promo.icon_url = `<span class='prefix'><img src='${
          promo.icon_url
        }'></span>`;
        return promo;
      });

      if (!this.promos.length) {
        return;
      }

      console.log(this.$route.name);

      this.openPromoModal()

      // if (!localStorage.getItem("promo")) {
      //   this.$store.commit("SET_MODAL", {
      //     key: "promo",
      //     value: true
      //   });
      //   localStorage.setItem("promo", true);
      // } else {
      //   this.$store.commit("SET_MODAL", {
      //     key: "promo",
      //     value: false
      //   });
      // }
    }
  };

  if (/Android/gi.test(navigator.userAgent)) {
    window.addEventListener("resize", function() {
      if (
        document.activeElement.tagName === "INPUT" ||
        document.activeElement.tagName === "TEXTAREA"
      ) {
        window.setTimeout(function() {
          // document.activeElement.scrollIntoViewIfNeeded()
          document.activeElement.scrollIntoView(true);
        }, 300);
      }
    });
  }
</script>

<style lang="scss">
  @import "../assets/stylesheets/FontAwesome/font-awesome.min.css";
  @import "../assets/stylesheets/base";
  .app-wrap {
    height: 100%;
  }
  .app-prize {
    position: fixed;
    z-index: 99;
    top: 0px;
    left: 0px;
    right: 0px;
  }
  .app-wrap-top {
    height: 100%;
    box-sizing: border-box;
  }
  img[lazy="loading"] {
    background: url("../assets/images/img-loading.gif") no-repeat;
    background-size: 30px 30px;
    background-position: center center;
  }
  img[lazy="error"] {
    background: url("../assets/images/img-error.png") no-repeat;
    background-size: 80px 80px;
    background-position: center center;
  }
</style>
