import * as types from "../mutation-types"
import ActionCable from "actioncable"
import { getToken } from "@/store/api"
export default {
  state: {
    cable: null,
    chatChannel: null,
    currentChat: null
  },
  actions: {
    wsLink ({commit, dispatch}) {
      // let webSocketProtocol = process.env.NODE_ENV === 'production' ? 'wss' : 'ws'
      const cable = ActionCable.createConsumer(`${process.env.CABLE_ROOT}/cable?token=${getToken()}`)
      commit(types.SET_CABLE, cable)
      dispatch("subscriptChat")
    },
    subscriptChat ({commit, state}) {
      state.chatChannel = state.cable.subscriptions.create({ channel: "ChatsChannel" }, {
        received (data) {
          commit(types.SET_CHAT, data)
        },
        mark_chat_lines_read () {
          if (state.currentChat) {
            this.perform("mark_chat_lines_read", { chat_id: state.currentChat.id })
          }
        }
      })
    },
    makeAllChatMessageRead ({state}) {
      state.chatChannel && state.chatChannel.mark_chat_lines_read()
    },
    closeCable ({state}) {
      state.cable && state.cable.subscriptions.remove(state.chatChannel)
      state.cable && state.cable.disconnect()
      state.chatChannel = null
      state.cable = null
      state.currentChat = null
    }
  },
  mutations: {
    [types.SET_CABLE] (state, cable) {
      state.cable = cable
    },
    [types.SET_CHAT] (state, chat) {
      state.currentChat = chat
    }
  }
}
