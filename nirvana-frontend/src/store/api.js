import Vue from "vue";
import axios from "axios";
import router from "@/router";
import cookie from "../libs/cookie";

let store = null;
const api = axios.create({
  baseURL: process.env.API_ROOT,
  // baseURL: "http://api.manwin5.com",
  timeout: 20000,
  headers: {
    "Na-Api-Platform": "Wap",
    "Na-Api-Id": "a9b0f5a803a83d9b5faaee5b9ba0b3175c6f925c1a59199e8cdc119f3fb1275a",
    "Na-Api-Key": "5d43b13f353434326b5546ead381b79890e1d781ece3a4f1847f21634e7760e8",
    "Content-Type": "application/json",
    Accept: "application/json"
  }
});

export const getToken = () => {
  return cookie.get("accessToken");
};

const tokenHeader = () => {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`
  };
};

// Add a request interceptor
api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    Object.assign(config.headers, tokenHeader());
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Do something with response data
    if (response.data.message) {
      console.log(response.data.message);
    }
    return response;
  },
  function (error) {
    // Do something with response error
    if (error && error.response) {
      if (error.response.data && error.response.data.message) {
        console.log(error.response.data.message);
      }
      // 返回状态码处理
      let messages = "";
      let vue = new Vue();
      if (error.response.status === 403 || error.response.status === 401) {
        if (error.response.data) {
          messages = error.response.data.message || error.response.data.error;
        }
        if (!messages) {
          messages = "需要验证或本次连接已过期";
        }
        vue.$toast({
          message: messages,
          position: "middle",
          duration: 5000
        });
        store.dispatch("removeUserInfo");
        console.log("Bryan");
        const publicRoutes = ["Home", "Profile"];
        if (publicRoutes.includes(router.currentRoute.name)) return;
        // if(router.currentRoute.name === "Home" && router.currentRoute.query && router.currentRoute.query.r === "yes") return

        // f(router.currentRoute.name === "Home" && router.currentRoute.query && router.currentRoute.query.r === "yes") return
        // if(router.currentRoute.name === "Home") return
        router.push("/start_index");
      } else {
        messages = error.response.data.message || error.response.data.error;
        if (!messages) {
          messages = "系统错误";
        }
        vue.$toast({
          message: messages,
          position: "middle",
          duration: 5000
        });
      }
    }
    return Promise.reject(error);
  }
);

let httpApi = {
  getHomePopSuggests: () => api.get("/v1/home/popup_suggests"),
  getVendorAmount: vendorCode => api.get(`/v1/vendors/${vendorCode}/amount`),
  checkUser: (key = "email", value) =>
    api.get("/v1/users/check_user", {
      params: {
        [key]: value
      }
    }),
  getCaptcha: () => api.get("/v1/users/captcha"),
  registeredUser: data => api.post("/v1/users", data),
  mobileCaptcha: data => api.post("/v1/users/send_mobile_captcha", data),
  loginUser: data => api.post("/oauth2/token", data),
  logOut: () => api.post("/oauth2/revoke"),
  getProfile: () => api.get("/v1/setting/profile"),
  updateProfile: data => api.put("/v1/setting/profile", data),
  updatePassword: data => api.put("/v1/setting/profile/update_password", data),
  postMobileVerifyCode: mobile =>
    api.post("/v1/setting/profile/send_mobile_verify_code", {
      mobile
    }),
  postEmailVerifyCode: email =>
    api.post("/v1/setting/profile/send_email_verify_code", {
      email
    }),
  mobileCreate: (mobile, code) =>
    api.post("/v1/setting/profile/mobile_create", {
      mobile,
      code
    }),
  emailCreate: (email, code) =>
    api.post("/v1/setting/profile/email_create", {
      email,
      code
    }),
  deposit: data => api.post("/v1/setting/orders/deposit", data),
  getBankCards: () => api.get("/v1/setting/bank_cards"),
  postBankCards: data => api.post("/v1/setting/bank_cards", data),
  withdraw: data => api.post("/v1/setting/orders/withdraw", data),
  payments: (method, billNo) =>
    api.get(`/v1/payments/gateway/${method}/${billNo}`),
  // getOrders: (params) => api.get('/v1/setting/orders', {params}),
  getOrder: orderId => api.get(`/v1/setting/orders/${orderId}`),
  getNotifications: params => api.get("/v1/setting/notifications", {
    params
  }),
  postNotifyRead: notificationId =>
    api.post(`/v1/setting/notifications/${notificationId}/read`),
  postChat: notificationId =>
    api.post(`/v1/setting/notifications/${notificationId}/chat`),
  getNotifyDetail: notificationId =>
    api.get(`/v1/setting/notifications/${notificationId}`),
  deleteNotify: notificationId =>
    api.delete(`/v1/setting/notifications/${notificationId}`),
  postReadAll: () => api.post("/v1/setting/notifications/read_all"),
  // chat
  getOwnChat: () => api.get("/v1/setting/chat"),
  updateChatInfo: data => api.put("/v1/setting/chat", data),
  getChatLines: (chatId, params) =>
    api.get("/v1/setting/chat/chat_lines", {
      params
    }),
  // postChatsReadAll: () => api.post('/v1/setting/chats/read_all'),
  // getChats: (params) => api.get('/v1/setting/chats', {params}),
  // postChatsRead: (chatId) => api.post(`/v1/setting/chats/${chatId}/read`),
  // getChatsList: (chatId, params) => api.get(`/v1/setting/chats/${chatId}/fetch`, {params}),
  // postSendContent: (chatId, content) => api.post(`/v1/setting/chats/${chatId}/sent`, { content }),
  // deleteChats: (chatId) => api.delete(`/v1/setting/chats/${chatId}`),
  getEntrance: () => api.get("/v1/home/entrance/"),
  getVendors: () => api.get("/v1/vendors/"),
  getRecommends: params => api.get("v1/games/recommends", {
    params
  }),
  getGames: (params, vendorName) =>
    api.get(`/v1/vendors/${vendorName}/games`, {
      params
    }),
  postTransfer: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer`, data),
  postTransferMain: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer_main`, data),
  postTransferSub: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/transfer_sub`, data),
  postApplyPromoCode: (vendorName, data) =>
    api.post(`/v1/vendors/${vendorName}/apply_promo_code`, data),
  getLoadTransfer: vendorName =>
    api.get(`/v1/vendors/${vendorName}/load_transfer`),
  postResetTransferAdjustment: vendorName =>
    api.post(`/v1/vendors/${vendorName}/reset_transfer_adjustment`),
  getVendorWallet: vendorName => api.get(`/v1/vendors/${vendorName}/`),
  postLike: gameId => api.post(`/v1/games/${gameId}/like`),
  postUnlike: gameId => api.post(`/v1/games/${gameId}/unlike`),
  postLaunch: gameId => api.post(`/v1/games/${gameId}/launch`),
  getTasks: () => api.get("/v1/quests/"),
  getTask: (questId, params) => api.get(`/v1/quests/${questId}`, {
    params
  }),
  postTaskMakeProcess: (questId, data) =>
    api.post(`/v1/quests/${questId}/make_process`, data),
  postTaskMakeReceived: (questId, data) =>
    api.post(`/v1/quests/${questId}/make_received`, data),
  getSearchGames: params => api.get("/v1/games/", {
    params
  }),
  getSearchGameDetail: gid => api.get(`/v1/games/${gid}/`),
  getHomeAnnouncement: () => api.get("/v1/home/announcement/"),
  getAnnouncement: () => api.get("/v1/announcements/"),
  getProfileAmount: () => api.get("/v1/setting/profile/amount/"),
  getCoupons: () => api.get("/v1/setting/profile/coupons"),
  getAnnouncementDetail: announcementId =>
    api.get(`/v1/announcements/${announcementId}/`),
  getPoints: params => api.get("/v1/setting/points", {
    params
  }),
  getBalanceHistories: params =>
    api.get("/v1/setting/balance_histories", {
      params
    }),
  getBalancehistory: billNo =>
    api.get(`/v1/setting/balance_histories/${billNo}`),
  getBanks: params => api.get("/v1/setting/banks", {
    params
  }),
  deleteBank: bankCardId => api.delete(`/v1/setting/bank_cards/${bankCardId}/`),
  getLikeGames: () => api.get("/v1/setting/profile/like_games"),
  getHomeRecords: () => api.get("/v1/home/records/"),
  getTopVisited: () => api.get("/v1/home/top_visited_games/"),
  getWithdrawals: () => api.get("/v1/setting/profile/withdrawals"),
  getLotteries: () => api.get("/v1/lotteries/"),
  getBalanceTypes: () => api.get("/v1/setting/balance_histories/balance_types"),
  postLotteries: () => api.post("/v1/lotteries/play"),
  postUploadAvatar: (data, config) =>
    api.post("/v1/setting/profile/update_avatar", data, config),
  sendMobileResetCode: data =>
    api.post("/v1/users/send_mobile_reset_code", data),
  resetPasswordViaMobile: data =>
    api.post("/v1/users/reset_password_via_mobile", data),
  sendEmailResetCode: data => api.post("/v1/users/send_email_reset_code", data),
  resetPasswordViaEmail: data =>
    api.post("/v1/users/reset_password_via_email", data),
  getRebates: () => api.get("/v1/setting/rebates"),
  getSearchRebates: params => api.get("/v1/setting/rebates/search", {
    params
  }),
  postReceiveRebate: rebateId =>
    api.post(`/v1/setting/rebates/${rebateId}/received`),
  postSetRebatesCompleted: data =>
    api.post("/v1/setting/rebates/multi_set_completed", data),
  getVipIntro: () => api.get("/v1/setting/profile/vip_intr"),
  postCancelOrder: orderId => api.post(`/v1/setting/orders/${orderId}/cancel`),
  // leancloud sign
  // leancloudSignature: (data) => api.post('/v1/third/leancloud/signature', data),
  getOnlineCustomers: () => api.get("/v1/setting/profile/online_customers"),
  channelVisitHistory: code => api.post("/v1/channel_visit_history", {
    code
  }),
  postCouponCode: data => api.post("v1/setting/profile/set_coupon", data), // 兑换优惠券
  postHongbao: () => api.post("v1/lotteries/hongbao"), // 抽红包
  getHongbaoTimer: () => api.get("v1/lotteries/hongbao_state"), // 抽红包时间
  requestCallback: () => api.post("/v1/setting/profile/request_callback"),
  counter: () => api.get("/v1/setting/profile/counter")
};

httpApi.install = function (Vue, options) {
  if (options.store) {
    store = options.store;
  }
  Vue.prototype.api = httpApi;
  Vue.prototype.apiInstance = api;
};

export default httpApi;
