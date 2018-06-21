<template lang="html">
  <div>
    <div class="head">
      <div>
        <span class="fa fl" @click='goBack()'>{{ left }}</span>
        <span>找回密码</span>
      </div>
    </div>
    <div class="body">
      <div class="main">
        <div class="select-style">
          <p class="style dl" @click="byEmail()">
            <span :class="[active ? 'active-email-img' : 'unable-email-img']"></span>
            <span :class="[active ? 'active-info' : 'unable-info']">通过注册邮箱找回</span>
          </p>
          <p class="style dl fr" @click="byPhone()">
            <span :class="[!active ? 'active-phone-img' : 'unable-phone-img']"></span>
            <span :class="[!active ? 'active-info' : 'unable-info']">通过注册手机找回</span>
          </p>
        </div>
        <div class="fill-in" v-if="active">
          <p class="info">请输入您无法登录的账号注册邮箱。</p>
          <input type="email" placeholder="注册的电子邮箱" v-model="email.email"/>
          <div>
            <input class="dl code-txt" type="text" placeholder="验证码" v-model="email.code"/>
            <input v-if="emailCodeFlag" class="dl get-code" type="button" value="获取验证码" @click="sendEmailResetCode()"/>
            <span v-else class="code-seconds">{{ count.email }}秒后重新获取</span>
          </div>
        </div>
        <div class="fill-in" v-if="!active">
          <p class="info">请输入您无法登录的账号注册手机号码。</p>
          <input type="number" placeholder="注册的手机号码" v-model="mobile.mobile"/>
          <div>
            <input class="dl code-txt" type="text" placeholder="验证码" v-model="mobile.code"/>
            <input v-if="mobileCodeFlag" class="dl get-code" type="button" value="获取验证码" @click="sendMobileResetCode()"/>
            <span v-else class="code-seconds">{{ count.mobile }}秒后重新获取</span>
          </div>
        </div>
        <div v-if="email.code || mobile.code">
          <input type="password" placeholder="新密码(字数在6~12之间)" v-model="password.password"/>
          <input type="password" placeholder="确认新密码(字数在6~12之间)" v-model="password.rePassword"/>
        </div>
        <div>
          <p class="button" @click="send()">提交信息</p>
          <!--<p class="forgot">联系客服支持<span class="fa">{{ externalLink }}</span></p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { regularExpression } from "@/libs/utils.js"

export default {
  data () {
    return {
      active: true,
      left: this.$fontawesome("angle-left"),
      externalLink: this.$fontawesome("external-link"),
      emailCodeFlag: true,
      mobileCodeFlag: true,
      count: {
        email: 60,
        mobile: 60
      },
      profile: "",
      password: {
        password: "",
        rePassword: ""
      },
      email: {
        email: "",
        code: "",
        password: ""
      },
      mobile: {
        mobile: "",
        code: "",
        password: ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    byEmail () {
      this.active = true
    },
    byPhone () {
      this.active = false
    },
    send () {
      if (this.active) {
        this.resetPasswordViaEmail()
      } else {
        this.resetPasswordViaMobile()
      }
    },
    sendMobileResetCode () {
      if (!regularExpression("mobile", this.mobile.mobile)) {
        this.$toast({
          message: "手机格式不对",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.api.sendMobileResetCode({ "mobile": this.mobile.mobile }).then((res) => {
        this.mobileCodeFlag = false
        let mobileTime = setInterval(() => {
          this.count.mobile --
          if (this.count.mobile === 0) {
            this.mobileCodeFlag = true
            this.count.mobile = 60
            window.clearInterval(mobileTime)
          }
        }, 1000)
        this.$toast({
          message: "已发送验证码，请注意接收",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    testPassword () {
      if (this.password.password !== this.password.rePassword) {
        this.$toast({
          message: "两次密码不一致",
          position: "middle",
          duration: 5000
        })
        return false
      }
      if (!regularExpression("password", this.password.password)) {
        this.$toast({
          message: "设置密码不符合要求",
          position: "middle",
          duration: 5000
        })
        return false
      }
      return true
    },
    resetPasswordViaMobile () {
      if (this.mobile.mobile === "" || this.mobile.code === "" || this.password.password === "") {
        this.$toast({
          message: "必填字段不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (this.testPassword()) {
        this.mobile.password = this.password.password
      } else {
        return
      }
      this.api.resetPasswordViaMobile(this.mobile).then((res) => {
        this.$toast({
          message: "修改密码成功",
          position: "middle",
          duration: 5000
        })
        this.$router.push("/login")
      }).catch((error) => {
        console.log(error)
      })
    },
    sendEmailResetCode () {
      if (!regularExpression("email", this.email.email)) {
        this.$toast({
          message: "邮箱格式不对",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.api.sendEmailResetCode({ "email": this.email.email }).then((res) => {
        this.emailCodeFlag = false
        let emailTime = setInterval(() => {
          this.count.email --
          if (this.count.email === 0) {
            this.emailCodeFlag = true
            this.count.email = 60
            window.clearInterval(emailTime)
          }
        }, 1000)
        this.$toast({
          message: "已发送验证码，请注意接收",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        console.log(error)
      })
    },
    resetPasswordViaEmail () {
      if (this.email.email === "" || this.email.code === "" || this.password.password === "") {
        this.$toast({
          message: "必填字段不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (this.testPassword()) {
        this.email.password = this.password.password
      } else {
        return
      }
      this.api.resetPasswordViaEmail(this.email).then((res) => {
        this.$toast({
          message: "修改密码成功",
          position: "middle",
          duration: 5000
        })
        this.$router.push("/login")
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.head {
  @include line-height(1.2rem);
  padding: 0px 10px;
  background-color: $color-blue9;
  font-size: $font-h3;
  font-weight: bold;
  text-align: center;
  color: $color-white;
  position: fixed;
  width: 100%;
  z-index: 30;
  .fl, .fr {
    line-height: inherit;
  }
  .fl {
    font-size: $font-h;
  }
}
.mint-header .re-button {
  overflow: visible;
}
.button {
  width: 100%;
  margin: .3rem auto;
  @include line-height(1.2rem);
  background-color: $color-yellow13;
  color: $color-blue9;
  text-align: center;
  border-radius: 2rem;
  font-size: $font-h4;
  font-weight: bold;
}
.forgot {
  text-align: center;
  color: $color-blue1;
  .fa {
    position: relative;
    top: 2px;
    left: 2px;
  }
}
.main {
  top: 20%;
  background-color: $color-blue8;
  margin: 0 .3rem;
  margin-top: 1rem;
  padding: .5rem .3rem;
  .info {
    color: $color-grey2;
    font-size: $font-h4;
    text-align: left;
    margin: 0px;
    padding-bottom: 5px;
    .resend {
      font-size: $font-h5;
      color: $color-blue1;
    }
  }
  .dl {
    display: inline-block;
  }
  .code-txt {
    width: 60%;
  }
  .code-seconds {
    padding: 12px 10px;
    border: $px solid $color-grey3;
    background: $color-grey1;
    color: $color-grey2;
    border-radius: 5px;
    font-size: $font-h5-1;
    width: 36%;
  }
  .get-code {
    width: 3.1rem;
    padding: .2rem 0;
    margin-left: .3rem;
    border: $px solid $color-grey3;
    font-size: $font-h5;
  }
  input {
    width: 100%;
    @include line-height(1.2rem);
    margin-bottom: .3rem;
    padding: 0px 5px;
    border-radius: .1rem;
    border: $px solid rgba($color-blue, .2);
    background-color: $color-blue9;
    color: $color-white;
    font-weight: bold;
    font-size: $font-h4;
    line-height: .8rem;
    padding-left: .3rem;
    &::placeholder {
      font-size: $font-h4;
      color: rgba($color-white, .3);
    }
  }
}
.select-style {
  padding: 0px 40px;
  .style {
    width: 100px;
    padding-bottom: 10px;
    span {
      &:first-child {
        width: 40px;
        height: 40px;
        display: block;
        margin: 0 auto;
      }
      &:last-child {
        display: block;
        text-align: center;
        padding-top: 5px;
      }
    }
    .unable-email-img {
      background: url("../assets/images/method-mail-unable.png") no-repeat;
      background-size: 100%;
    }
    .unable-phone-img {
      background: url("../assets/images/method-phone-unable.png") no-repeat;
      background-size: 100%;
    }
    .unable-info {
      color: $color-grey2;
    }
    .active-phone-img {
      background: url("../assets/images/method-phone-active.png") no-repeat;
      background-size: 100%;
    }
    .active-email-img {
      background: url("../assets/images/method-mail-active.png") no-repeat;
      background-size: 100%;
    }
    .active-info {
      color: $color-yellow1;
    }
  }
}
</style>
