import * as types from "../mutation-types"
import Vue from "vue"

const state = {
  navigateTitle: true,
  deleteBanksFlag: false,
  quicklyLogin: false,
  profileInfoEditDone: false,
  balanceHistoriesFiltrate: false,
  prizeFlag: false, // 抽奖
  channelCode: "", // 邀请码
  messageCount: "", // 消息个数
  searchObj: {},
  tasksObj: {},
  privileges: [],
  redPacket: null,
  modal: {
    promo: false
  }
}

const mutations = {
  SET_MODAL: (state, { key, value }) => {
    state.modal[key] = value
  },
  [types.SET_NAVIGATION_TITLE] (state, sundry) {
    state.navigateTitle = sundry.navigateTitle
  },
  [types.SET_QUICKLY_LOGIN] (state, sundry) {
    state.quicklyLogin = sundry.quicklyLogin
  },
  [types.SET_SEARCH_OBJ] (state, sundry) {
    state.searchObj = sundry
  },
  [types.SET_TASKS_OBJ] (state, sundry) {
    state.tasksObj = sundry
  },
  [types.SET_TASK_DETAIL] (state, sundry) {
    Vue.set(state.tasksObj, sundry.id, sundry.ob)
  },
  [types.PRIVILEGES] (state, sundry) {
    state.privileges = sundry
  },
  [types.DELETE_BANKS_FLAG] (state, sundry) {
    state.deleteBanksFlag = sundry
  },
  [types.PROFILE_INFO_EDIT_DONE] (state, sundry) {
    state.profileInfoEditDone = sundry
  },
  [types.BALANCE_HISTORIES_FILTRATE] (state, sundry) {
    state.balanceHistoriesFiltrate = sundry
  },
  [types.CHANNEL_CODE] (state, sundry) {
    state.channelCode = sundry
  },
  [types.MESSAGE_COUNT] (state, sundry) {
    state.messageCount = sundry
  },
  [types.PRIZE_FLAG] (state, sundry) {
    state.prizeFlag = sundry
  },
  [types.RED_PACKET] (state, redPacket) {
    state.redPacket = redPacket
  }
}

const actions = {
  setNavigationTitle ({commit}, sundry) {
    commit(types.SET_NAVIGATION_TITLE, sundry)
  },
  setQuicklyLogin ({commit}, sundry) {
    commit(types.SET_QUICKLY_LOGIN, sundry)
  },
  setSearchObj ({commit}, sundry) {
    commit(types.SET_SEARCH_OBJ, sundry)
  },
  setTasksObj ({commit}, sundry) {
    commit(types.SET_TASKS_OBJ, sundry)
  },
  setTaskDetail ({commit}, sundry) {
    commit(types.SET_TASK_DETAIL, sundry)
  },
  setPrivileges ({commit}, sundry) {
    commit(types.PRIVILEGES, sundry)
  },
  setDeleteBanksFlag ({commit}, sundry) {
    commit(types.DELETE_BANKS_FLAG, sundry)
  },
  setProfileInfoEditDone ({commit}, sundry) {
    commit(types.PROFILE_INFO_EDIT_DONE, sundry)
  },
  setBalanceHistoriesFiltrate ({commit}, sundry) {
    commit(types.BALANCE_HISTORIES_FILTRATE, sundry)
  },
  setChannelCode ({commit}, sundry) {
    commit(types.CHANNEL_CODE, sundry)
  },
  setMessageCount ({commit}, sundry) {
    commit(types.MESSAGE_COUNT, sundry)
  },
  setPrizeFlag ({commit}, sundry) {
    commit(types.PRIZE_FLAG, sundry)
  },
  setRedPacket ({commit}, sundry) {
    commit(types.RED_PACKET, sundry)
  }
}

const getters = {
  modal: (state) => key => state.modal[key],
  getNavigationTitle (state) {
    return state.navigateTitle
  },
  getQuicklyLogin (state) {
    return state.quicklyLogin
  },
  getSearchObj (state) {
    return state.searchObj
  },
  getTasksObj (state) {
    return state.tasksObj
  },
  getPrivileges () {
    return state.privileges
  },
  getDeleteBanksFlag () {
    return state.deleteBanksFlag
  },
  getProfileInfoEditDone () {
    return state.profileInfoEditDone
  },
  getBalanceHistoriesFiltrate () {
    return state.balanceHistoriesFiltrate
  },
  getChannelCode () {
    return state.channelCode
  },
  getMessageCount () {
    return state.messageCount
  },
  getPrizeFlag () {
    return state.prizeFlag
  }
}

export default { state, getters, actions, mutations }
