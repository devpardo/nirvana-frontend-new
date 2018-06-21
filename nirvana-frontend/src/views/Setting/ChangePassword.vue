<template lang="html">
  <div class="body">
    <div class="main">
      <div class="fill-in">
        <input type="password" v-model="passwordForm.current_password" placeholder="旧密码"/>
        <span :class="{ 'alert-icon': expression.password }"><input type="password" v-model="passwordForm.password" placeholder="新密码(字数在6~12之间)"/></span>
        <input type="password" v-model="re_password" placeholder="确认新密码(字数在6~12之间)"/>
      </div>
      <div>
        <p class="button" @click="handleUpdatePassword()">确认并重新登录</p>
      </div>
    </div>
  </div>
</template>

<script>
import { regularExpression } from "@/libs/utils.js"

export default {
  data () {
    return {
      left: this.$fontawesome("angle-left"),
      re_password: "",
      expression: {
        password: false
      },
      passwordForm: {
        current_password: "",
        password: ""
      }
    }
  },
  watch: {
    "passwordForm.password": function (n) {
      if (n) {
        if (!regularExpression("password", n)) {
          this.expression.password = true
        } else {
          this.expression.password = false
        }
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
    handleUpdatePassword () {
      if (!this.passwordForm.current_password.trim()) {
        this.$toast({
          message: "请输入旧密码",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (!this.passwordForm.password.trim() || !this.re_password.trim()) {
        this.$toast({
          message: "请设置新密码",
          position: "middle",
          duration: 5000
        })
        return
      }
      if (this.re_password.trim() && this.re_password !== this.passwordForm.password) {
        this.$toast({
          message: "确认密码与设置密码不一样",
          position: "middle",
          duration: 5000
        })
        return
      }
      this.api.updatePassword(this.passwordForm).then(() => {
        this.$toast({
          message: "修改密码成功",
          position: "middle",
          duration: 5000
        })
        this.$store.dispatch("removeUserInfo")
        this.$router.push("/login")
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '../../assets/stylesheets/public';

.alert-icon {
  input {
    border: $px solid $color-red !important;
    position: relative;
  }
}
.button {
  width: 100%;
  margin: 10px auto;
  @include line-height(46px);
  background-color: $color-blue2;
  color: $color-white;
  text-align: center;
  border-radius: 5px;
  font-size: $font-h4;
}
.main {
  padding: 20px 10px;
  input {
    width: 100%;
    @include line-height(45px);
    margin-bottom: 10px;
    padding: 0px 5px;
    border: $px solid $color-grey1;
    border-radius: 5px;
  }
}
</style>
