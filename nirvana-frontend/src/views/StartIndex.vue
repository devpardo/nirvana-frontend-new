<template lang="html">
  <div class="start-page">
    <span class="img">
      <img src="../assets/images/logo-L.png" width="100%" height="100%"/>
    </span>
    <div class="main">
      <span class="fr skip" @click="skipLogin()">跳过登录</span>
      <p class="button" @click="login()"><span class="fa user">{{ user }}</span><span class="login">登录</span></p>
      <p class="register" @click="register()">新用户注册</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$fontawesome("user-circle-o")
    }
  },
  methods: {
    skipLogin () {
      this.$router.push({
        name: "Home",
        query: {
          r: "yes"
        }
      })
    },
    login () {
      this.$router.push("/login")
    },
    register () {
      this.$router.push("/join")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.start-page {
  overflow: hidden;
  background-color: $color-blue9;
  position: absolute;
  top: 0px;
  right: 0px;
  left: 0px;
  bottom: 0px;
  .img {
    display: inline-block;
    width: 54%;
    position: absolute;
    top: 40%;
    left: 50%;
    margin-left: -89px;
  }
  .user {
    color: $color-blue9;
    padding-right: 5px;
  }
  .login {
    font-size: $font-h4;
  }
  .button {
    margin: .3rem auto;
    @include line-height(1.2rem);
    background-color: $color-yellow13;
    color: $color-blue9;
    border-radius: 2rem;
    text-align: center;
    padding-left: 40px;
    font-weight: bold;
  }
  .main {
    position: absolute;
    bottom: 100px;
    left: 10px;
    right: 10px;
    .skip {
      position: relative;
      right: 10px;
      bottom: 20px;
      color: $color-white;
    }
    .register {
      text-align: center;
      font-size: $font-h4;
      color: $color-yellow13;
      font-weight: bold;
    }
  }
}
</style>
