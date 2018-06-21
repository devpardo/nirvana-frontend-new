<template lang="html">
  <div>
    <div class="head">
      <div>
        <span class="fa fl" @click='goBack()'>{{ left }}</span>
        <span>创建一个亚太账号</span>
      </div>
    </div>
    <!--注册-->
    <div class="register">
      <!--<div class="img">
        <img src="../assets/images/logo-L.png" width="100%" height="100%"/>
      </div>-->
      <div class="main" id="scroll">
        <div class="fill-in" id="register">

          <nirvana-input v-model="registerForm.name" :valid="isNameInLimit && !errors.username" placeholder="用户名(字数在7~12之间)" label="名称" :error-message="nameErrorMessage" @blur="isUnique('name')"/>
          <nirvana-input v-model="registerForm.email" :valid="validations.email && !errors.email" type="email" placeholder="电子邮箱" label="电子邮件" :error-message="emailErrorMessage" @blur="isUnique('email')"/>
          <nirvana-input v-model="registerForm.password" :valid="isPasswordInLimit" type="password" :placeholder="passwordPlaceholder" label="密码" :error-message="passwordErrorMessage"/>
          <nirvana-input v-model="registerForm.confirmPassword" :valid="isPasswordSame && isPasswordInLimit" type="password" :placeholder="confirmPasswordPlaceholder" label="确认密码" :error-message="confirmPasswordErrorMessage"/>
          <nirvana-input v-model="registerForm.mobile" :valid="validations.mobile && !errors.mobile" placeholder="常用手机号" label="手机号码" :error-message="mobileErrorMessage" @blur="isUnique('mobile')"/>

          <div class="phone-code">
             <input type="text" class="dl" placeholder="手机验证码" v-model="registerForm.code"/><button class="dl" :disabled="disabled" @click="getPhoneCode()"><span v-if="disabled">剩余{{ baseCount }} 秒</span><span v-else>获取验证码</span></button>
          </div>
          <span class="code"></span>
          <input type="text" placeholder="微信号（可获得更多优惠信息，建议填写。）" v-model="registerForm.wechat"/>
          <input type="text" placeholder="邀请码（可不填。）" v-model="channel_code" :disabled="!!channelCode"/>
        </div>
        <div>
          <p class="sign" @click="rules.flag = true"><span>提交注册即视为已阅读并同意</span><span class="rule">《亚太娱乐服务与隐私协议》</span></p>
          <p class="button" @click="goRegister()">提交注册信息</p>
          <p class="forgot" @click="login()">已拥有亚太账号？返回登录。</p>
        </div>
      </div>
      <!--规则-->
      <rule :rules="rules" v-if="rules.flag"></rule>
    </div>
  </div>
</template>

<script>
  import { regularExpression } from "@/libs/utils.js";
  import Rule from "@/components/Register/Rule.vue";
  import cookie from "@/libs/cookie";
  import NirvanaInput from "@/components/Shared/NirvanaInput.vue";
  import { mapGetters } from "vuex";
  import { debounce } from "../libs/utils";
  export default {
    name: "Register",
    components: { Rule, NirvanaInput },
    data() {
      return {
        disabled: false,
        baseCount: 60,
        left: this.$fontawesome("angle-left"),
        plusSquare: this.$fontawesome("plus-square-o"),
        refresh: this.$fontawesome("refresh"),
        imgUrl: process.env.API_ROOT + "/v1/users/captcha",
        channel_code: "",
        limits: {
          name: {
            min: 7,
            max: 12
          },
          password: {
            min: 6,
            max: 12
          }
        },
        triggered: {
          email: false,
          name: false,
          password: false,
          mobile: false,
          confirmPassword: false
        },
        registerForm: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          mobile: "",
          code: "",
          wechat: ""
        },
        rules: {
          flag: false
        },
        unique: {
          username: {
            message: ""
          },
          email: {
            message: ""
          },
          mobile: {
            message: ""
          }
        },
        errors: {
          username: false,
          email: false,
          mobile: false
        }
      };
    },
    computed: {
      ...mapGetters(["channelCode"]),
      mobileErrorMessage() {
        return this.unique.mobile.message || "必须是数字和11个字符长";
      },
      emailErrorMessage() {
        return this.unique.email.message || "无效的电子邮件格式";
      },
      passwordErrorMessage() {
        return `密码长度不得小于${this.limits.password.min}个字符或大于${
          this.limits.password.max
        }个字符。`;
      },
      confirmPasswordErrorMessage() {
        return !this.isPasswordInLimit
          ? this.passwordErrorMessage
          : !this.isPasswordSame ? "确认密码必须与密码相一致" : "密码无效";
      },
      nameErrorMessage() {
        return (
          this.unique.username.message ||
          `名称必须是${this.limits.name.min}-${this.limits.name.max}个字符长`
        );
      },
      passwordPlaceholder() {
        return `确认密码(字数在${this.limits.password.min}~${
          this.limits.password.max
        }之间)`;
      },
      confirmPasswordPlaceholder() {
        return `确认密码(字数在${this.limits.password.min}~${
          this.limits.password.max
        }之间)`;
      },
      hasPassword() {
        return this.registerForm.password && this.registerForm.confirmPassword;
      },
      isPasswordInLimit() {
        return this.isInRange("password");
      },
      isPasswordSame() {
        return (
          this.hasPassword &&
          this.registerForm.password === this.registerForm.confirmPassword
        );
      },
      isPasswordValid() {
        return this.isPasswordSame && this.isPasswordInLimit;
      },
      isNameInLimit() {
        return this.registerForm.name && this.isInRange("name");
      },
      validations() {
        const fields = ["email", "mobile"];
        const results = fields.reduce((validations, field) => {
          validations[field] = regularExpression(field, this.registerForm[field]);
          return validations;
        }, {});
        return results;
      },
      isValid() {
        return (
          Object.keys(this.validations).every(key => this.validations[key]) &&
          this.isPasswordValid
        );
      }
    },

    mounted() {
      // if (localStorage.getItem("channel_code")) {
      //   this.channel_code = localStorage.getItem("channel_code")
      // }
      this.channel_code = this.channelCode;
    },

    methods: {
      async hasErrorMessage(type) {
        console.log("ERROR", type, this.unique.username.message);
        return !!this.unique[type].message;
      },
      async isUnique(type) {
        const field = type === "name" ? "username" : type;
        this.errors[field] = false
        this.unique[field].message = "";
        try {
          const value = this.registerForm[type];
          const { msg, message } = await this.api
            .checkUser(field, value)
            .then(res => res.data);
        } catch (error) {
          const { response } = error;
          console.log(response);
          if (response) {
            this.errors[field] = true
            const message = response.data.message;
            console.log(message);
            this.unique[field].message = await message;
          }
        }
      },
      isInRange(field) {
        const length = this.registerForm[field].toString().length;

        const { min, max } = this.limits[field];

        return length >= min && length <= max;
      },
      goBack() {
        window.history.go(-1);
      },
      login() {
        this.$router.push("/login");
      },
      refreshCode() {
        this.imgUrl = `${
          process.env.API_ROOT
        }/v1/users/captcha?rnd=${Math.random()}`;
      },
      getPhoneCode() {
        if (!this.registerForm.mobile) {
          this.$toast({
            message: "手机号不能为空",
            position: "middle",
            duration: 5000
          });
          return;
        }
        this.disabled = true;
        let time = setInterval(() => {
          this.baseCount = this.baseCount - 1;
          if (this.baseCount <= 0) {
            window.clearInterval(time);
            this.baseCount = 60;
            this.disabled = false;
          }
        }, 1000);
        this.api.mobileCaptcha({ mobile: this.registerForm.mobile }).then(() => {
          this.$toast({
            message: "验证码已发送，请注意查收",
            position: "middle",
            duration: 5000
          });
        });
      },
      async goRegister() {
        if (this.registerForm.name === "" || this.registerForm.email === "") {
          this.$toast({
            message: "用户名或邮箱不能为空",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.registerForm.mobile) {
          this.$toast({
            message: "手机号不能为空",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.registerForm.code) {
          this.$toast({
            message: "手机验证码不能为空",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.isNameInLimit) {
          this.$toast({
            message: "用户名字数不符合规则",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.validations.email) {
          this.$toast({
            message: "邮箱格式不对",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.validations.mobile) {
          this.$toast({
            message: "手机号格式不对",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.isPasswordSame) {
          this.$toast({
            message: "密码不能为空且设置的两次密码必须一样",
            position: "middle",
            duration: 5000
          });
          return;
        }
        if (!this.isPasswordInLimit) {
          this.$toast({
            message: "密码字数不符合规则",
            position: "middle",
            duration: 5000
          });
          return;
        }
        let form = {
          email: this.registerForm.email.replace(/\s/g, ""),
          password: this.registerForm.password.replace(/\s/g, ""),
          username: this.registerForm.name.replace(/\s/g, ""),
          channel_code: this.channel_code,
          mobile: this.registerForm.mobile.replace(/\s/g, ""),
          code: this.registerForm.code.replace(/\s/g, ""),
          wechat: this.registerForm.wechat.replace(/\s/g, "")
        };
        try {
          const { data: { access_token } = {} } = await this.api.registeredUser(
            form
          );
          cookie.set("accessToken", access_token, { path: "/" });

          const { data: user } = await this.api.getProfile();
          localStorage.setItem("user", JSON.stringify(user));
          await this.$store.dispatch("setUserInfo", user);
          this.$toast({
            message: "注册成功",
            position: "middle",
            duration: 5000
          });
          let messageCount = user.unread_count;
          await this.$store.dispatch("setMessageCount", messageCount);
          localStorage.setItem("messageCount", messageCount);
          this.$router.push("/");

          localStorage.removeItem("channel_code");
        } catch (error) {
          console.log(error);
          this.refreshCode();
        }
      }
    }
  };
</script>

<style lang='scss' scoped>
  @import "../assets/stylesheets/public.scss";
  .text-red {
    color: $color-red !important;
  }
  .text-center {
    text-align: center;
  }
  .alert-icon {
    input {
      border: $px solid $color-red !important;
      position: relative;
    }
  }
  .head {
    @include line-height(1.2rem);
    padding: 0px 10px;
    background-color: $color-blue9;
    text-align: center;
    color: $color-white;
    font-size: $font-h3;
    font-weight: bold;
    position: fixed;
    width: 100%;
    z-index: 30;
    .fl,
    .fr {
      line-height: inherit;
    }
    .fl {
      font-size: $font-h;
    }
  }
  .register {
    overflow: hidden;
    background-color: $color-blue9;
    .img {
      width: 201px;
      height: 71px;
      margin: 10px auto;
      margin-top: 70px;
    }
    .button {
      width: 100%;
      margin: 0.3rem auto;
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
    .sign {
      text-align: center;
      color: $color-grey2;
      .rule {
        color: $color-blue1;
      }
      span {
        &:last-child {
          color: $color-blue1;
          text-decoration: underline;
        }
        &:last-child {
          padding-left: 3px;
          position: relative;
          top: $px;
        }
      }
    }
    .main {
      margin: 0.3rem;
      margin-top: 2rem;
      padding: 0.5rem 0.3rem;
      background-color: $color-blue8;
      input {
        width: 100%;
        @include line-height(1.2rem);
        margin-bottom: 0.3rem;
        padding: 0px 5px;
        border-radius: 0.1rem;
        border: $px solid rgba($color-blue, 0.2);
        background-color: $color-blue9;
        color: $color-white;
        font-weight: bold;
        font-size: $font-h4;
        line-height: 0.8rem;
        padding-left: 0.3rem;
        &::placeholder {
          font-size: $font-h4;
          color: rgba($color-white, 0.3);
        }
      }
      .phone-code {
        input {
          width: 60%;
        }
        button {
          margin-left: 0.3rem;
          background-color: $color-yellow13;
          padding: 0.25rem 0;
          width: 3.1rem;
          border: $px solid $color-yellow5;
          border-radius: 0.1rem;
          font-size: $font-h4;
          font-weight: bold;
          &:disabled {
            color: $color-black;
          }
        }
      }
      .code {
        height: $px;
        width: 100%;
        background-color: $color-blue9;
        display: block;
        margin-bottom: 15px;
      }
      .captcha-image {
        width: 200px;
        height: 70px;
        margin-bottom: 10px;
        vertical-align: middle;
      }
      .fa {
        padding-right: 5px;
      }
      .code-change {
        vertical-align: middle;
        padding-left: 20px;
        cursor: pointer;
        font-size: $font-h3-1;
        color: $color-blue2;
      }
    }
  }
</style>
