<template>
  <div class="mask-layer" v-if="value">
    <div class="promo-modal">
      <span class="download-close hand" @click="onClose">
        <i class="close fa fa-lrg">{{ close }}</i>
      </span>

      <div class="tabs">
        <ul class="tabs-nav list-inline">
          <li v-for="(promo, index) of promos" :key="index" :prefix="promo.icon_url" :name="promo.title" @click="activeTabId = `promo-${index}`" :target="`promo-${index}`" :class="[activeTabId==`promo-${index}` ? 'active' : '']">
            <span>{{ promo.title }}</span>
          </li>
        </ul>

        <div class="tabs-content">
          <div class="tabs-content-tab" v-for="(promo, index) of promos" :key="index" :id="`promo-${index}`" :class="[activeTabId==`promo-${index}` ? 'active' : '']">
            <a :href="promo.link">
              <img :src="promo.image_url" alt="">
            </a>
          </div>
        </div>
      </div>

      <!-- <tabs @changed="onTabChanged" v-if="!loading">
        <tab v-for="(promo, index) of promos" :key="index" :prefix="promo.icon_url" :name="promo.title" :id="`promo-${index}`">
          <img :src="promo.image_url" alt="">
        </tab>
      </tabs> -->

    </div>
  </div>
</template>

<script>
  export default {
    name: "PromoModal",
    props: {
      value: {
        type: Boolean
      },
      promos: {
        type: Array
      }
    },
    data() {
      return {
        loading: false,
        close: this.$fontawesome("close"),
        activeTabId: "promo-0"
        // promos: [
        //   {
        //     title: "我要吃热偶是",
        //     link: "http://pc.mw006.net/?redirect=%2F%3Fredirect%3D%2Flogin",
        //     image_url:
        //       "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/3f8hJA4Ak28r8Q5WrQjsSW4kds19DCBN.png",
        //     icon_url:
        //       "https://nirvanaph.s3.ap-northeast-2.amazonaws.com/oDatRVq9YsRDvmxvtYzT9oDHCBq2sQGD.png"
        //   }
        // ]
        /* tabs: [
                        {
                          id: "promo-1",
                          name: "最新资讯",
                          image: {
                            active: "tab1.png",
                            inactive: "tab1-inactive.png"
                          },
                          content:
                            "<img src='/static/promotion-banner/modalbanner.png' class='img-responsive' />"
                        },
                        {
                          id: "promo-2",
                          name: "本月推荐",
                          image: {
                            active: "tab2.png",
                            inactive: "tab2-inactive.png"
                          },
                          content: "<h1>Tab 2</h1>"
                        },
                        {
                          id: "promo-3",
                          name: "综合频道",
                          image: {
                            active: "tab3.png",
                            inactive: "tab3-inactive.png"
                          },
                          content: "<h1>Tab 3</h1>"
                        }
                      ] */
      };
    },
    methods: {
      onClose() {
        this.$emit("input", false);
      },
      onTabChanged({ tab }) {
        this.activeTabId = tab.id;
      },
      openLiveChat () {
        this.$emit("input", false)
        console.log("openLiveChat")
        this.$router.push({ name: "LiveChat", params: { chatId: 2 } })
      }
    },
    async mounted() {
      this.loading = true;
      // const { data } = await this.api.getHomePopSuggests();
      // this.promos = data.map(promo => {
      //   promo.icon_url = `<span class='prefix'><img src='${
      //     promo.icon_url
      //   }'></span>`;
      //   return promo;
      // });
      this.loading = false;
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public";
  .img-responsive {
    max-width: 100%;
    height: auto;
    display: block;
  }
  .fa-lrg {
    font-size: 21px;
  }
  .mask-layer {
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 1000;
  }

  .promo-modal {
    margin: 0 auto;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #122250;
    // height: 680px;
    // width: 625px;
    width: 9rem;
    z-index: 100;
    border-radius: 5px;

    .tabs {
      .tabs-nav {
        position: absolute;
        width: 100%;
        overflow: auto;
        padding: 0;
        list-style-type: none;
        top: 0;
        padding: 10px;
        margin: 0 auto;
        background-color: #2a3862;
      }

      .list-inline {
        margin-left: 0;

        li {
          display: inline-block;
          margin: 0 3px;

          span {
            padding: 10px;
            background: $color-blue6;
            color: $color-yellow13;
            cursor: pointer;
          }
        }

        li.active {
          span {
            background: $color-yellow13;
            color: $color-blue6;
          }
        }
      }

      .tabs-content {
        width: 100%;
        height: auto;
        display: block;
        padding-top: 35px;

        .tabs-content-tab {
          display: none;
          img {
            width: 100%;
            height: auto;
          }
        }

        .tabs-content-tab.active {
          display: block;
        }

      }

    }

    .download-header {
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      /* background-color: #1A1E5F; */
      height: 40px;
      margin: 0 auto;
      /* padding: 10px 20px; */
      position: relative;
      .title {
        text-align: left;
        font-size: 15px;
        line-height: 25px;
        color: #fbd56f;
      }
      .download-close {
        position: absolute;
        right: -35px;
        top: -9px;
        font-size: 48px;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        color: hsl(0, 0%, 100%);
        font-family: Arial, Helvetica, sans-serif;
      }
    }
    .download-content {
      border-radius: 5px;
      /* padding: 20px; */
    }
  }

  .gradient {
    background-color: rgba(13, 15, 48, 0.6);
    /* IE9, iOS 3.2+ */
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHZpZXdCb3g9IjAgMCAxIDEiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPjxsaW5lYXJHcmFkaWVudCBpZD0idnNnZyIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIHgxPSIwJSIgeTE9IjEwMCUiIHgyPSIwJSIgeTI9IjAlIj48c3RvcCBzdG9wLWNvbG9yPSIjMDAwMDAwIiBzdG9wLW9wYWNpdHk9IjAuMiIgb2Zmc2V0PSIwIi8+PHN0b3Agc3RvcC1jb2xvcj0iIzFhMWU1ZiIgc3RvcC1vcGFjaXR5PSIxIiBvZmZzZXQ9IjEiLz48L2xpbmVhckdyYWRpZW50PjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9InVybCgjdnNnZykiIC8+PC9zdmc+);
    background-image: -webkit-gradient(
      linear,
      0% 100%,
      0% 0%,
      color-stop(0, rgba(0, 0, 0, 0.2)),
      color-stop(1, rgb(26, 30, 95))
    );
    /* Android 2.3 */
    background-image: -webkit-repeating-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
    /* IE10+ */
    background-image: repeating-linear-gradient(
      to top,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
    background-image: -ms-repeating-linear-gradient(
      bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgb(26, 30, 95) 100%
    );
  }

  span.download-close.hand {
    position: absolute;
    right: 0;
    top: -37px;
    font-size: 30px;
    color: hsl(0, 0%, 100%);
  }

  .download-icon {
    background-color: #2a3862;
    border-radius: 5px;
    margin: 15px;
    height: 160px;
    width: 160px;
    display: inline-block;
    vertical-align: middle;
    .content {
      margin: 14px;
    }
    p {
      color: #fff;
      font-size: 16px;
    }
  }
  li.tabs-component-tab.is-active {
    float: left;
    width: 33%;
    background: hsl(0, 100%, 50%);
    text-decoration: none;
  }

  .tabs-component-panel img{
    width: 100%;
    height: auto;
    display: block;
  }
</style>
