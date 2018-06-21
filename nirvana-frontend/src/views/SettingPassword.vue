<template lang="html">
  <div>
    <div class="head">
      <div>
        <span class="fa fl" @click='goBack()'>{{ left }}</span>
        <span>修改密码</span>
      </div>
    </div>
    <div class="body">
      <div class="main">
        <div class="fill-in">
          <input type="password" placeholder="新密码"/>
          <input type="password" placeholder="确认新密码"/>
        </div>
        <div>
          <p class="button" @click="reSet()">确认并重新登录</p>
          <!--<p class="forgot">联系客服支持<span class="fa">{{ externalLink }}</span></p>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      left: this.$fontawesome("angle-left"),
      externalLink: this.$fontawesome("external-link")
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  },
  methods: {
    reSet () {
      this.$router.push("/login")
    },
    goBack () {
      window.history.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/stylesheets/public';

.head {
  @include line-height(50px);
  padding: 0px 10px;
  background-color: $color-white;
  color: $color-black;
  text-align: center;
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
.button {
  width: 100%;
  margin: 10px auto;
  @include line-height(40px);
  background-color: $color-green;
  color: $color-white;
  text-align: center;
  border-radius: 5px;
  font-size: $font-h4;
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
  position: absolute;
  top: 70px;
  left: 10px;
  right: 10px;
  input {
    width: 100%;
    @include line-height(45px);
    margin-bottom: 10px;
    padding: 0px 5px;
    border: $px solid $color-grey;
    border-radius: 5px;
  }
}
</style>
