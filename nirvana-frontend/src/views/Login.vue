<template lang="html">
  <div>
    <div class="head">
      <div>
        <span class="fa fl" @click='goBack()'>{{ left }}</span>
        <span>登录</span>
      </div>
    </div>
    <div class="login" id="login">
      <div class="img">
        <img src="../assets/images/logo-L.png" width="100%" height="100%"/>
      </div>
      <div class="main" id="scroll">
        <form class="fill-in">
          <input type="text" v-model="loginForm.login" placeholder="用户名/电子邮箱/手机号"/>
          <input type="password" v-model="loginForm.password" placeholder="密码"/>
        </form>
        <div>
          <p class="button" @click="goLogin()">立即登录</p>
          <p class="forgot" @click="forgetPassword()">忘记密码？</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cookie from "@/libs/cookie"

export default {
  data () {
    return {
      left: this.$fontawesome("angle-left"),
      loginForm: {
        login: "",
        password: "",
        grant_type: "password"
      }
    }
  },
  methods: {
    goBack () {
      window.history.go(-1)
    },
    forgetPassword () {
      this.$router.push("/forget_password")
    },
    goLogin () {
      try {
        localStorage.setItem("test", "test")
      } catch (e) {
        alert("您正处于无痕浏览模式，无法传递数据，请更换浏览模式再登录，谢谢！")
        return
      }
      localStorage.removeItem("test")
      if (this.loginForm.login === "" || this.loginForm.password === "") {
        this.$toast({
          message: "用户名或密码不能为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      window.localStorage.clear() // clear the date when skip login
      this.loginForm.login = this.loginForm.login.replace(/\s/g, "")
      this.loginForm.password = this.loginForm.password.replace(/\s/g, "")
      this.api.loginUser(this.loginForm).then((res) => {
        cookie.set("accessToken", res.data.access_token, { path: "/" })
        this.api.getProfile().then((res) => {
          let user = res.data
          localStorage.setItem("user", JSON.stringify(user))
          this.$store.dispatch("setUserInfo", user)
          this.$toast({
            message: "登录成功",
            position: "middle",
            duration: 5000
          })
          let messageCount = res.data.unread_count
          this.$store.dispatch("setMessageCount", messageCount)
          localStorage.setItem("messageCount", messageCount)
          if (user && user.reset_password_sent_at) {
            this.$router.push("/setting/change_password")
          } else {
            this.$router.push("/")
          }
        })
      }
      ).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
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
  top: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  z-index: 30;
  .fl, .fr {
    line-height: inherit;
  }
  .fl {
    font-size: $font-h;
  }
}
.login {
  background-color: $color-blue9;
  .img {
    width: 54%;
    margin: 10px auto;
    margin-top: 3rem;
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
    color: $color-yellow13;
    font-weight: bold;
    font-size: $font-h4;
  }
  .main {
    background-color: $color-blue8;
    padding: .5rem .3rem;
    margin: 35% .3rem 0 .3rem;
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
}
</style>
