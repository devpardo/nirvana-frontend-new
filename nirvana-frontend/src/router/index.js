import Vue from "vue"
import Router from "vue-router"
import ga from "vue-ga"

Vue.use(Router)

var router = new Router({
  mode: "history",
  routes: [
    // sign up & login
    { path: "/start_load", name: "StartLoad", meta: { name: "Start" }, component: (resolve) => { require(["@/views/StartLoad"], resolve) } },
    { path: "/start_index", name: "StartIndex", meta: { name: "Start" }, component: (resolve) => { require(["@/views/StartIndex"], resolve) } },
    { path: "/join", name: "Join", meta: { name: "Start" }, component: (resolve) => { require(["@/views/Register"], resolve) } },
    { path: "/login", name: "Login", meta: { name: "Start" }, component: (resolve) => { require(["@/views/Login"], resolve) } },
    { path: "/forget_password", name: "ForgetPassword", meta: { name: "Start" }, component: (resolve) => { require(["@/views/ForgetPassword"], resolve) } },
    { path: "/setting_password", name: "SettingPassword", meta: { name: "Start" }, component: (resolve) => { require(["@/views/SettingPassword"], resolve) } },
    // home
    { path: "/", component: (resolve) => { require(["@/views/Home"], resolve) }, name: "Home", meta: { name: "Home", title: "首页" } },
    // sportsbook 捕鱼
    { path: "/sportsbook", component: (resolve) => { require(["@/views/Sportsbook"], resolve) }, name: "Sportsbook", meta: { name: "Sportsbook", title: "体育" } },
    // fishing
    { path: "/fishing", component: (resolve) => { require(["@/views/Fishing"], resolve) }, name: "Fishing", meta: { name: "Fishing", title: "捕鱼" } },
    // game
    { path: "/vendors",
      component: (resolve) => { require(["@/components/Game"], resolve) },
      children: [
        { path: "", component: (resolve) => { require(["@/views/Game/Vendors"], resolve) }, name: "Vendors", meta: { name: "Game", title: "游戏" } },
        { path: ":vendorCode/games", component: (resolve) => { require(["@/views/Game/Games"], resolve) }, name: "Games", meta: { name: "GameModule", title: "平台" } },
        { path: ":vendorCode", component: (resolve) => { require(["@/views/Game/Vendor"], resolve) }, name: "Vendor", meta: { title: "平台" } },
        { path: "games/:gid", component: (resolve) => { require(["@/views/Game/GameDetail"], resolve) }, name: "GameDetail", meta: { requiresAuth: true, name: "GameModule", title: "游戏详情" } },
        { path: "launch/", component: (resolve) => { require(["@/views/Game/Launch"], resolve) }, name: "Launch", meta: { requiresAuth: true, name: "GameModule", title: "亚太游戏" } }
      ]
    },
    // setting
    { path: "/setting",
      component: (resolve) => { require(["@/components/Setting"], resolve) },
      meta: { name: "Setting" },
      children: [
        { path: "profile", component: (resolve) => { require(["@/views/Setting/Profile"], resolve) }, name: "Profile", meta: { name: "Profile", title: "个人账户" } },
        { path: "profile/edit", component: (resolve) => { require(["@/views/Setting/ProfileEdit"], resolve) }, name: "ProfileEdit", meta: { requiresAuth: true, name: "SettingModule", title: "个人账户" } },
        { path: "profile/photo/edit", component: (resolve) => { require(["@/views/Setting/PhotoEdit"], resolve) }, name: "PhotoEdit", meta: { requiresAuth: true, title: "设置我的头像" } },
        { path: "change_password", component: (resolve) => { require(["@/views/Setting/ChangePassword"], resolve) }, name: "ChangePassword", meta: { requiresAuth: true, name: "SettingModule", title: "修改密码" } },
        { path: "add_bank", component: (resolve) => { require(["@/views/Setting/AddBank"], resolve) }, name: "AddBank", meta: { requiresAuth: true, name: "SettingModule", title: "添加银行卡" } },
        { path: "select_bank", component: (resolve) => { require(["@/views/Setting/SelectBank"], resolve) }, name: "SelectBank", meta: { requiresAuth: true, title: "选择银行" } },
        { path: "Banks", component: (resolve) => { require(["@/views/Setting/Banks"], resolve) }, name: "Banks", meta: { requiresAuth: true, title: "我的银行卡" } },
        { path: "deposit", component: (resolve) => { require(["@/views/Setting/Deposit"], resolve) }, name: "Deposit", meta: { requiresAuth: true, name: "SettingModule", title: "充值" } },
        { path: "offline_wepay/:billNo/:type", component: (resolve) => { require(["@/views/Setting/OfflineWepay"], resolve) }, name: "OfflineWepay", meta: { requiresAuth: true, name: "SettingModule", title: "微信扫码通道" } },
        { path: "offline_wepay/:billNo/:type", component: (resolve) => { require(["@/views/Setting/OfflineWepay"], resolve) }, name: "OfflineAlipay", meta: { requiresAuth: true, name: "SettingModule", title: "支付宝扫码通道" } },
        { path: "withdraw", component: (resolve) => { require(["@/views/Setting/Withdraw"], resolve) }, name: "Withdraw", meta: { requiresAuth: true, name: "SettingModule", title: "提款" } },
        { path: "balance_histories", component: (resolve) => { require(["@/views/Setting/BalanceHistories"], resolve) }, name: "BalanceHistories", meta: { requiresAuth: true, name: "SettingModule", title: "交易记录" } },
        { path: "balance_histories/:balanceId", component: (resolve) => { require(["@/views/Setting/BalanceHistory"], resolve) }, name: "BalanceHistory", meta: { requiresAuth: true, title: "交易详情" } },
        { path: "likes", component: (resolve) => { require(["@/views/Setting/Likes"], resolve) }, name: "Likes", meta: { requiresAuth: true, name: "SettingModule", title: "我的收藏" } },
        // { path: 'gateway/:url/:params', component: (resolve) => { require(['@/views/Setting/Gateway'], resolve) }, name: 'Gateway', meta: { requiresAuth: true, name: 'SettingModule', title: '网关' } },
        { path: "balance", component: (resolve) => { require(["@/views/Setting/Balance"], resolve) }, name: "Balance", meta: { requiresAuth: true, name: "BalanceModule", title: "账户余额" } },
        { path: "promotions", component: (resolve) => { require(["@/views/Setting/Promotions"], resolve) }, name: "Promotions", meta: { title: "优惠活动" } },
        { path: "promotion_detail", component: (resolve) => { require(["@/views/Setting/PromotionDetail"], resolve) }, name: "PromotionDetail", meta: { title: "活动详情" } },
        { path: "points", component: (resolve) => { require(["@/views/Setting/Points"], resolve) }, name: "Points", meta: { requiresAuth: true, title: "我的亚太币" } },
        { path: "lottery", component: (resolve) => { require(["@/views/Setting/Lottery"], resolve) }, name: "Lottery", meta: { requiresAuth: true, title: "亚太大转盘" } },
        { path: "member_vip", component: (resolve) => { require(["@/views/Setting/MemberVip"], resolve) }, name: "MemberVip", meta: { requiresAuth: true, title: "会员特权中心" } },
        { path: "privilege_level", component: (resolve) => { require(["@/views/Setting/PrivilegeLevel"], resolve) }, name: "PrivilegeLevel", meta: { requiresAuth: true, title: "等级特权" } },
        { path: "rebates", component: (resolve) => { require(["@/views/Setting/Rebates"], resolve) }, name: "Rebates", meta: { requiresAuth: true, title: "我的返水" } },
        { path: "rebate_rule", component: (resolve) => { require(["@/views/Setting/RebateRule"], resolve) }, name: "RebateRule", meta: { requiresAuth: true, title: "返水规则" } },
        { path: "profile_info_edit", component: (resolve) => { require(["@/views/Setting/ProfileInfoEdit"], resolve) }, name: "ProfileInfoEdit", meta: { requiresAuth: true, title: "信息编辑" } },
        { path: "coupons", component: (resolve) => { require(["@/views/Setting/Coupons"], resolve) }, name: "Coupons", meta: { requiresAuth: true, title: "我的优惠券" } }
      ]
    },
    // task
    { path: "/tasks", component: (resolve) => { require(["@/views/Task/Tasks"], resolve) }, name: "Tasks", meta: { name: "Task", title: "福利" } },
    // chat & notification
    { path: "/messages", component: (resolve) => { require(["@/views/Message/Messages"], resolve) }, name: "Messages", meta: { name: "Message", title: "消息中心" } },
    { path: "/notifications", component: (resolve) => { require(["@/views/Message/Notifications"], resolve) }, name: "Notifications", meta: { requiresAuth: true, title: "通知消息" } },
    { path: "/announcements", component: (resolve) => { require(["@/views/Message/Announcements"], resolve) }, name: "Announcements", meta: { requiresAuth: true, title: "公告消息" } },
    // options query: {type, typeId}
    { path: "/chat", component: (resolve) => { require(["@/views/Message/ChatDetail"], resolve) }, name: "ChatDetail", meta: { requiresAuth: true, name: "Message", title: "聊天界面" } },
    { path: "/livechat", component: (resolve) => { require(["@/views/Message/LiveChat"], resolve) }, name: "LiveChat", meta: { name: "Message", title: "聊天界面" } },
    { path: "/notifications/:notificationId", component: (resolve) => { require(["@/views/Message/NotificationDetail"], resolve) }, name: "NotificationDetail", meta: { requiresAuth: true, title: "通知详情" } },
    { path: "/announcements/:announcementId", component: (resolve) => { require(["@/views/Message/AnnouncementDetail"], resolve) }, name: "AnnouncementDetail", meta: { requiresAuth: true, title: "公告详情" } },
    // topic
    { path: "/topics", component: (resolve) => { require(["@/views/Topic/Topics"], resolve) }, name: "Topics", meta: { title: "主题" } },
    { path: "/topics/:topicId", component: (resolve) => { require(["@/views/Topic/TopicDetail"], resolve) }, name: "TopicDetail" },
    // popup
    { path: "/prize", component: (resolve) => { require(["@/views/Popup/Index"], resolve) }, name: "Prize", meta: { requiresAuth: true, name: "Prize" } },
    { path: "/winning", component: (resolve) => { require(["@/views/Popup/Winning"], resolve) }, name: "Winning", meta: { name: "Prize" } },
    { path: "/unfortunately", component: (resolve) => { require(["@/views/Popup/Unfortunately"], resolve) }, name: "Unfortunately", meta: { name: "Prize" } },
    // 404
    { path: "*", component: (resolve) => { require(["@/views/NotFound"], resolve) }, name: "NotFound", meta: { name: "Start" } }
  ]
})

// add google analytics
if (process.env.NODE_ENV === "production") {
  ga(router, "UA-104405506-2")
} else {
  ga(router, "UA-XXX")
}

export default router
