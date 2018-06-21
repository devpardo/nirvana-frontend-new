import * as types from "../mutation-types"
import * as storage from "../../libs/storage"
const state = {
  email: "",
  username: "",
  uid: "",
  aws_url: ""
}

const mutations = {
  [types.SET_USER_INFO](state, user) {
    state.email = user.email
    state.uid = user.uid
    state.username = user.username
    state.aws_url = user.aws_url
  },
  [types.REMOVE_USER_INFO](state) {
    state.email = ""
  }
}

const actions = {
  setUserInfo({ commit, dispatch, state }, user) {
    commit(types.SET_USER_INFO, user)
    // console.log(user)
    if (state.uid) {
      dispatch("wsLink")
    }
  },
  removeUserInfo({ commit, dispatch }) {
    // 搜索历史数据不能放cookie里，因为字数限制终究还是太小，不够放入历史数据，会出现数据不再更新的情况，
    // 改用localStorage(应该在5M左右), 在清空数据时，得考虑到历史数据不能删除，故如此一个一个删除
    dispatch("setPrizeFlag", false)
    var storage = window.localStorage
    for (let i = 0, len = storage.length; i < len; i++) {
      let key = storage.key(i)
      if (key !== "searchHistory") {
        localStorage.removeItem(key)
      }
    }
    sessionStorage.clear()
    commit(types.REMOVE_USER_INFO)
    dispatch("closeCable")
  }
}

const getters = {
  getUserInfo(state) {
    return state.email
  },
  channelCode: () => storage.get("channel_code")
}

export default { state, getters, actions, mutations }
