<template lang="html">
  <div>
    <div class="login">
      <form class="fill-in">
        <input type="text" v-model="loginForm.login" placeholder="用户名或电子邮箱"/>
        <input type="password" v-model="loginForm.password" placeholder="密码"/>
        <span class="close fa" @click="closed()">{{ close }}</span>
      </form>
      <div>
        <p class="button" @click="goLogin()">立即登录</p>
        <p class="forgot" @click="quickRegister()">还没有亚太账号？</p>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
import cookie from "@/libs/cookie"

export default {
  data () {
    return {
      close: this.$fontawesome("close"),
      loginForm: {
        login: "",
        password: "",
        grant_type: "password"
      }
    }
  },
  methods: {
    closed () {
      this.$store.dispatch("setQuicklyLogin", { "quicklyLogin": false })
    },
    quickRegister () {
      this.closed()
      this.$router.push("/join")
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
      this.api.loginUser(this.loginForm).then((res) => {
        cookie.set("accessToken", res.data.access_token, { path: "/" })
        this.api.getProfile().then((res) => {
          let user = res.data
          localStorage.setItem("user", JSON.stringify(user))
          this.$store.dispatch("setUserInfo", user)
          this.$store.dispatch("setQuicklyLogin", { "quicklyLogin": false })
          this.$toast({
            message: "登录成功",
            position: "middle",
            duration: 5000
          })
          // history.go(0)
        })
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.login {
  position: fixed;
  top: 20%;
  left: 50%;
  width: 9rem;
  transform: translateX(-50%);
  z-index: 100;
  padding: .5rem .3rem;
  padding-top: 1.2rem;
  background-color: $color-blue8;
  border-radius: 5px;
  .button {
    width: 100%;
    margin: .3rem auto;
    @include line-height(1.2rem);
    background-color: $color-yellow13;
    color: $color-blue8;
    font-weight: bold;
    text-align: center;
    border-radius: 2rem;
    font-size: $font-h4;
  }
  .forgot {
    text-align: center;
    color: $color-yellow13;
    font-weight: bold;
    font-size: $font-h4;
  }
}
.fill-in {
  position: relative;
  .close {
    position: absolute;
    display: inline-block;
    width: 40px;
    border-radius: 50%;
    font-size: $font-h2;
    text-align: center;
    @include line-height(40px);
    color: $color-white;
    top: -42px;
    right: -11px;
  }
  input {
    width: 100%;
    @include line-height(1.2rem);
    margin-bottom: .3rem;
    padding: 0 .3rem;
    border: $px solid rgba($color-blue, .2);
    border-radius: .1rem;
    background-color: $color-blue9;
    color: $color-white;
    font-size: $font-h4;
    font-weight: bold;
    line-height: .8rem;
    &::placeholder {
      color: rgba($color-white, .5);
    }
  }
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 99;
}
</style>
