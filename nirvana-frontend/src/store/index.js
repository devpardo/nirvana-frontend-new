import Vue from "vue"
import Vuex from "vuex"

import user from "./modules/user"
import sundry from "./modules/sundry"
import chat from "./modules/chat"

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    sundry,
    chat
  }
})

export default store
