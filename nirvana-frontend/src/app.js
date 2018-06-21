import Vue from "vue"
import { sync } from "vuex-router-sync"

import App from "@/components/App"
import router from "./router"
import store from "./store"
import "@/libs/prototype/Array"
import "@/components/common.js"
import api from "./store/api.js"
import Bugsnag from "bugsnag-js"
import * as storage from "./libs/storage"
import { Tabs, Tab } from "vue-tabs-component"

if (process.env.NODE_ENV === "production") {
  Bugsnag.apiKey = "7454024ad4403a9312895f6ec94ea3eb"
} else {
  Bugsnag.apiKey = "xxxx"
}

sync(store, router)
// 触发 install
Vue.use(api, { store })

Vue.component("tabs", Tabs)
Vue.component("tab", Tab)

// When handling the refresh, vuex is cleared but the user is already logged in
if (localStorage.getItem("user")) {
  store.dispatch("setUserInfo", JSON.parse(localStorage.getItem("user")))
}
if (localStorage.getItem("channel_code")) {
  store.dispatch("setChannelCode", localStorage.getItem("channel_code"))
}
// Log in the middle, the page needs to log in, without the login situation directly jump login
router.beforeEach((to, from, next) => {
  if (to.query && to.query.utm_source) {
    // store.dispatch("setChannelCode", to.query.utm_source)
    // localStorage.setItem("channel_code", to.query.utm_source)
    const { utm_source } = to.query
    storage.set("channel_code", utm_source)
    Vue.prototype.api.channelVisitHistory(utm_source)
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user.email) {
      next()
    } else {
      store.dispatch("setQuicklyLogin", { quicklyLogin: true })
      next(from)
      // next({
      //   path: '/start_index',
      //   query: { redirect: to.fullPath }
      // })
    }
  } else {
    if (to.name === "Login" && store.state.user.email) {
      next(false)
    } else if (to.name === "StartLoad" && store.state.user.email) {
      next({
        path: "/home",
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  }
})

const app = new Vue({
  router,
  store,
  ...App
})

export { app, router, store }
