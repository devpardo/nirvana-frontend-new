<template lang="html">
  <div>
    <div class="verification">
      <div class="v-header">
        <span v-if="sign && sign.flag">编辑个性签名</span>
        <span v-if="verification && verification.type === 1">手机验证</span>
        <span v-if="verification && verification.type === 0">邮箱验证</span>
        <span v-if="verification && verification.flag">验证成功</span>
        <span class="fa fr" @click="closed">{{ close }}</span>
      </div>
      <div class="v-content">
        <div class="v-textarea" v-if="sign && sign.flag">
          <textarea placeholder="个性签名" v-model="profile.desc">
          </textarea>
        </div>
        <div class="v-mobile" v-if="verification && verification.type === 1">
          <input placeholder="手机号" class="v-phone" v-if="profile" v-model="profile.mobile" disabled="disabled"/>
          <p>
            <input placeholder="验证码" class="v-code dl" v-model="codeData"/>
            <span class="v-button v-black dl" v-if="verification.code || verification.count < 60">{{ verification.count }}s后重新获取</span>
            <span class="v-button v-white dl" v-else @click="getCode()">获取验证码</span>
          </p>
          <p class="v-info">点击左侧按钮获取手机验证码</p>
        </div>
        <div class="v-mobile" v-if="verification && verification.type === 0">
          <input placeholder="电子邮箱" class="v-phone" v-if="profile" v-model="profile.email" disabled="disabled"/>
          <p>
            <input placeholder="验证码" class="v-code dl" v-model="codeData"/>
            <span class="v-button v-grey dl" v-if="verification.code">注意查收邮件</span>
            <span class="v-button v-white dl" @click="getCode()" v-else>获取验证码</span>
          </p>
          <p class="v-info">点击左侧按钮获取电子邮箱验证码</p>
        </div>
        <div class="verified" v-if="verification && verification.flag">
          <p><span class="fa">{{ checkCircle }}</span></p>
          <p>尊敬的用户，恭喜您已通过验证</p>
        </div>
      </div>
      <div class="v-footer" v-if="(verification && !verification.flag) || sign">
        <span class="v-confirm v-white v-spacing" v-if="sign && sign.flag" @click="signOk()">确认</span>
        <button class="v-confirm v-spacing" :class="[ verification.button ? 'v-grey' : 'v-white' ]" v-else @click="goConfirm()" :disabled="verification.button">进行验证</button>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>
<script>
export default {
  props: ["verification", "sign", "profile", "methods"],
  data () {
    return {
      close: this.$fontawesome("close"),
      checkCircle: this.$fontawesome("check-circle"),
      codeData: ""
    }
  },
  methods: {
    signOk () {
      this.methods.updateProfile()
      this.closed()
    },
    closed () {
      this.codeData = ""
      if (this.verification) {
        this.verification.code = false
        this.verification.show = false
        this.verification.flag = false
      }
      if (this.sign) {
        this.sign.flag = false
      }
    },
    getCode () {
      if (this.verification.type === 0) {
        this.methods.fetchEmailVerifyCode()
      } else if (this.verification.type === 1) {
        this.methods.fetchMobileVerifyCode()
      }
    },
    goConfirm () {
      if (this.verification.type === 0) {
        this.methods.emailCreate(this.codeData)
      } else if (this.verification.type === 1) {
        this.methods.mobileCreate(this.codeData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  margin: 0;
  padding: 0;
}
input, button {
  border: none;
}
input {
  font-size: $font-h4;
}
button {
  font-size: $font-h5-1;
}
input:-moz-placeholder { font-size: $font-h5-1 }
::-webkit-input-placeholder { font-size: $font-h5-1 }
.verification {
  width: 300px;
  min-height: 160px;
  border-radius: 5px;
  padding-bottom: 20px;
  background-color: $color-blue8;
  position: absolute;
  top: 15%;
  left: 50%;
  margin-left: -150px;
  z-index: 90;
  .v-grey {
    background-color: $color-grey3;
    color: $color-white;
  }
  .v-white {
    background-color: $color-grey6;
    border: $px solid $color-grey3;
    border-radius: 5px;
  }
  .v-header {
    padding: .3rem;
    width: 100%;
    border-top-left-radius:5px;
    border-top-right-radius:5px;
    text-align: center;
    color: $color-white;
    background-color: $color-blue9;
    font-size: $font-h4;
    .fa {
      vertical-align: middle;
      display: inline-block;
      font-size: $font-h2;
    }
  }
  .v-content {
    width: 100%;
    .dl {
      display: inline-block;
    }
    .v-textarea {
      min-height: 120px;
      padding: .3rem;
    }
    textarea {
      width: 100%;
      min-height: 120px;
      border: none;
      background-color: $color-blue9;
      color: $color-white;
      font-size: $font-h4;
      font-weight: bold;
      padding: .3rem;
      &::placeholder {
        color: rgba($color-white, .5);
      }
    }
    .v-mobile {
      padding: .3rem;
      margin-bottom: 20px;
    }
    .v-phone {
      padding: 0 .3rem;
      line-height: 1.2rem;
      background-color: $color-blue9;
      border: $px solid rgba($color-blue, .2);
      color: $color-white;
      font-weight: bold;
      width: 100%;
      border-radius: .1rem;
      margin-bottom: 10px;
    }
    .v-code {
      padding: 0 .3rem;
      height: 1.2rem;
      background-color: $color-blue9;
      border: $px solid rgba($color-blue, .2);
      width: 50%;
      border-radius: .1rem;
      margin-right: .3rem;
      color: $color-white;
      font-weight: bold;
    }
    .v-button {
      padding: 0 .3rem;
      line-height: 1.1rem;
      background-color: $color-yellow13;
      border: $px solid $color-yellow5;
      font-weight: bold;
      position: absolute;
      width: 42%;
      border-radius: .1rem;
      text-align: center;
    }
    .v-black {
      background-color: $color-grey7;
      opacity: 0.6;
    }
    .v-info {
      color: $color-grey2;
      padding-left: 5px;
      padding-top: 5px;
      display: inline-block;
    }
  }
  .v-footer {
    text-align: center;
    margin: 0 auto;
    .v-confirm {
      padding: .2rem 2rem;
      font-size: $font-h4;
      font-weight: bold;
      background-color: $color-yellow13;
      border: $px solid $color-yellow5;
      border-radius: 2rem !important;
      display: inline-block;
      word-spacing: 2px;
    }
    .v-spacing {
      letter-spacing: 2px;
      border-radius: 3px;
    }
  }
}
.verified {
  margin: 10px auto;
  margin-top: 40px;
  text-align: center;
  color: $color-green;
  .fa {
    font-size: $font-large;
  }
  p {
    &:first-child {
      margin-bottom: 10px;
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
  opacity: 0.5;
  z-index: 80;
}
</style>
