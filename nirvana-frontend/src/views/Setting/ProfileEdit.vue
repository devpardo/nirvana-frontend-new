<template lang="html">
  <div class="body" >
    <div id="body">
      <div class="block">
        <mt-cell title="我的头像" is-link to="/setting/profile/photo/edit"><span class="img"><img v-lazy="photo" width="100%" height="100%"></span></mt-cell>
        <mt-cell title="个性签名">
          <span class="sign-color" @click="sign.flag = true">点击编辑</span>
        </mt-cell>
        <verification-code v-if="sign.flag" :sign="sign" :profile="profile" :methods="method"></verification-code>
      </div>
      <div class="block">
        <mt-cell title="真实姓名" is-link @click.native="goInfoEdit(1)">
          <span v-if="realname">{{ realname }}</span>
        </mt-cell>
        <mt-cell title="性别" is-link @click.native="goInfoEdit(2)">
          <span v-if="gender">{{ gender }}</span>
        </mt-cell>
        <mt-cell title="出生日" is-link @click.native="goInfoEdit(3)">
          <span v-if="birthday">{{ birthday }}</span>
        </mt-cell>
      </div>
      <div class="block" id="scroll">
        <mt-field label="电子邮箱" placeholder="电子邮箱" type="email" v-model="profile.email" :disabled="!profile.email_confirmed_at || emailDisabled"><span class="confirm" @click="goEConfirm(0)" v-if="profile.email && profile.email_confirmed_at">验证邮箱</span><span v-if="dataFlag && !profile.email_confirmed_at" class="finished">已验证</span></mt-field>
        <mt-field label="手机号码" placeholder="手机号码" type="tel" v-model="profile.mobile" :disabled="!profile.mobile_confirmed_at"><span class="confirm" @click="goEConfirm(1)" v-if="profile.mobile && profile.mobile_confirmed_at">验证手机号</span><span v-if="dataFlag && !profile.mobile_confirmed_at" class="finished">已验证</span></mt-field>
        <mt-cell title="银行卡" is-link @click.native="goMyBanks()">
          <span>{{ bank_card_count || '0' }}</span>
        </mt-cell>
        <mt-cell title="登录密码" is-link to="/setting/change_password">
          <span>修改密码</span>
        </mt-cell>
      </div>
      <p class="sign-out" @click="logOut()"><span class="fa">{{ signOut }}</span><span>退出登录</span></p>
      <verification-code v-if="verification.show" :verification="verification" :profile="profile" :methods="method"></verification-code>
    </div>
  </div>
</template>

<script>
import cookie from "@/libs/cookie"
import VerificationCode from "@/components/Setting/VerificationCode.vue"
import { regularExpression } from "@/libs/utils.js"

export default {
  data () {
    return {
      signOut: this.$fontawesome("sign-out"),
      dataFlag: false,
      emailDisabled: false,
      photo: "",
      bank_card_count: "",
      gender: "",
      birthday: "",
      realname: "",
      method: {
        fetchMobileVerifyCode: this.fetchMobileVerifyCode,
        fetchEmailVerifyCode: this.fetchEmailVerifyCode,
        mobileCreate: this.mobileCreate,
        emailCreate: this.emailCreate,
        updateProfile: this.updateProfile
      },
      sign: {
        flag: false,
        content: ""
      },
      verification: {
        show: false,
        type: 0, // 0 邮箱验证; 1 手机验证
        code: false,
        count: 60,
        button: false,
        flag: false // 验证成功或失败
      },
      profile: {
        mobile: "",
        mobile_confirmed_at: "",
        email: "",
        email_confirmed_at: "",
        desc: "",
        zGender: ""
      }
    }
  },
  methods: {
    goInfoEdit (n) {
      // 1:真实姓名 2:性别 3:出生日期
      if (n === 1) {
        if (this.realname) {
          this.$toast({
            message: "真实姓名仅能编辑一次,不能再修改",
            position: "middle",
            duration: 5000
          })
          return
        }
      }
      if (n === 3) {
        if (this.birthday) {
          this.$toast({
            message: "生日仅能编辑一次,不能再修改",
            position: "middle",
            duration: 5000
          })
          return
        }
      }
      localStorage.setItem("profileInfo", n)
      this.$router.push("/setting/profile_info_edit")
    },
    goMyBanks () {
      this.$router.push({ name: "Banks" })
      localStorage.setItem("banks", 2) // 1表示来自提款 2表示来自个人中心
    },
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.profile.mobile = res.data.mobile
        this.profile.email = res.data.email
        if (this.profile.email) { this.emailDisabled = true }
        this.profile.mobile_confirmed_at = res.data.mobile_confirmed_at === ("" || null)
        this.profile.email_confirmed_at = res.data.email_confirmed_at === ("" || null)
        this.profile.desc = res.data.desc
        this.bank_card_count = res.data.bank_card_count
        this.photo = res.data.aws_url
        this.gender = (res.data.gender !== null) && (res.data.gender ? "女" : "男") // 0: 男 / 1: 女
        this.birthday = res.data.birthday
        this.realname = res.data.realname
        this.dataFlag = true
      }).catch((error) => {
        console.log(error)
      })
    },
    updateProfile () {
      if (!this.profile.desc) {
        this.$toast({
          message: "不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      let ob = {
        desc: this.profile.desc
      }
      this.api.updateProfile(ob).then(() => {
      }).catch((error) => {
        this.$toast({
          message: "信息保存失败",
          position: "middle",
          duration: 5000
        })
        console.log(error)
      })
    },
    logOut () {
      let token = cookie.get("accessToken")
      this.api.logOut(token).then(() => {
        this.$store.dispatch("removeUserInfo")
        cookie.remove("accessToken")
        this.$router.push("/start_index")
        this.$toast({
          message: "已退出",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    goEConfirm (type) {
      if (type === 0) {
        if (!regularExpression("email", this.profile.email)) {
          this.$toast({
            message: "邮箱格式不对",
            position: "middle",
            duration: 5000
          })
          return
        }
      }
      if (type === 1) {
        if (!regularExpression("mobile", this.profile.mobile)) {
          this.$toast({
            message: "手机格式不对",
            position: "middle",
            duration: 5000
          })
          return
        }
      }
      this.verification.button = false
      this.verification.type = type
      this.verification.show = true
    },
    fetchMobileVerifyCode () {
      this.verification.code = true
      let time = setInterval(() => {
        this.verification.count--
        if (this.verification.count === 0) {
          this.verification.code = false
          this.verification.count = 60
          window.clearInterval(time)
        }
      }, 1000)
      this.api.postMobileVerifyCode(this.profile.mobile).then(() => {
        this.$toast({
          message: "已发送验证码，请注意查收",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        window.clearInterval(time)
        console.log(error)
      })
    },
    fetchEmailVerifyCode () {
      this.api.postEmailVerifyCode(this.profile.email).then(() => {
        this.verification.code = true
        this.$toast({
          message: "已发送验证码，请注意查收",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    mobileCreate (data) {
      if (!this.profile.mobile || !data) {
        this.$toast({
          message: "手机号或验证码不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      // this.verification.button = true
      this.api.mobileCreate(this.profile.mobile, data).then(() => {
        this.fetchProfile()
        this.$toast({
          message: "手机绑定成功",
          position: "middle",
          duration: 5000
        })
        this.verification.flag = true
        this.verification.type = -1
      }).catch((error) => {
        console.log(error)
      })
    },
    emailCreate (data) {
      if (!this.profile.email || !data) {
        this.$toast({
          message: "邮箱地址或验证码不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      // this.verification.button = true
      this.api.emailCreate(this.profile.email, data).then(() => {
        this.fetchProfile()
        this.$toast({
          message: "邮箱绑定成功",
          position: "middle",
          duration: 5000
        })
        this.verification.flag = true
        this.verification.type = -1
      }).catch((error) => {
        console.log(error)
      })
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchProfile()
  },
  components: { VerificationCode }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 0px;
  padding: 0px;
}
.block {
  margin: .3rem;
  .mint-cell {
    background-color: $color-blue8;
    border: $px solid $color-blue8;
    color: $color-white;
  }
}
.img {
  width: 64px;
  height: 64px;
  padding: .3rem;
  & > img {
    border-radius: 50%;
  }
}
.mint-radiolist {
  display: inherit;
}
.sign-out {
  margin: 0 .3rem;
  @include line-height(1.2rem);
  background-color: $color-blue9;
  border: $px solid $color-yellow13;
  border-radius: 2rem;
  margin-top: 10px;
  color: $color-yellow13;
  font-weight: bold;
  text-align: center;
  .fa {
    padding-right: 5px;
    font-size: $font-h2;
    vertical-align: middle;
  }
}
.sign-color {
  color: $color-yellow13;
}
.confirm {
  color: $color-yellow1;
}
.finished {
  color: $color-grey3;
}
</style>
