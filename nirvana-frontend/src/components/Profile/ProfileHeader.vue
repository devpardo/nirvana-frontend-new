<template lang="html">
  <div>
    <div class="brief" v-if="email">
      <div class="introduce">
        <p class="img-outer" @click="goEdit()"><span class="fa setting">{{ cog }}</span><span class="img"><img v-lazy="photo" width="100%" height="100%"/></span></p>
        <div class="txt">
          <span class="name" v-text="userName"></span>
          <p class="sign id"><span>个性签名: </span><span v-if="desc">{{ desc }}</span><span v-else>该用户很懒，还没留下个性签名</span></p>
        </div>
      </div>
    </div>
    <div class="no-login" v-else>
      <p class="info">请先<span class="action" @click="actionGo(1)">登录</span>或<span class="action" @click="actionGo(2)">注册</span></p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["amount"],
  data () {
    return {
      amountLoading: false,
      userName: "",
      desc: "",
      photo: "",
      cog: this.$fontawesome("cog")
    }
  },
  watch: {
    "$store.state.user.email" () {
      if (this.$store.state.user.email) {
        this.fetchProfile()
      }
    }
  },
  mounted () {
    if (this.$store.state.user.email) {
      this.fetchProfile()
    }
  },
  computed: {
    email () {
      return this.$store.state.user.email
    }
  },
  methods: {
    goEdit () {
      this.$router.push("/setting/profile/edit")
    },
    actionGo (n) {
      if (n === 1) {
        this.$router.push("/login")
      } else if (n === 2) {
        this.$router.push("/join")
      }
    },
    fetchProfile () {
      this.amountLoading = true
      this.api.getProfile().then((res) => {
        this.amountLoading = false
        this.amount.amount = res.data.main_wallet
        this.userName = res.data.username
        this.desc = res.data.desc
        this.photo = res.data.aws_url
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.mint-cell {
  border-bottom: $px solid $color-grey;
}
.no-login {
  background-color: $color-blue9;
  width: 100%;
  height: 120px;
  text-align: center;
  color: $color-white;
  letter-spacing: $px;
  font-size: $font-h3;
  .info {
    @include line-height(120px)
  }
  .action {
    color: $color-yellow13;
    text-decoration: underline;
    padding: 0px 3px;
  }
}
.brief {
  color: $color-white;
  font-weight: bold;
  padding: 10px;
}
.introduce {
  padding-top: 10px;
  i {
    font-style: normal;
  }
  .img-outer, .txt {
    display: inline-block;
  }
  .img-outer {
    background-color: $color-blue8;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    text-align: center;
    position: relative;
    vertical-align: middle;
    .setting {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: $color-blue8;
      padding: 4px;
      border-radius: 50%;
      bottom: 6px;
      right: 5px;
    }
  }
  .img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    display: inline-block;
    margin: 5px;
    img {
      border-radius: 50%;
    }
  }
  .txt {
    vertical-align: middle;
    padding-left: 10px;
    line-height: 2;
    width: 68%;
    text-align: justify;
    .name {
      font-size: $font-h3-1;
    }
    .id {
      color: $color-red1;
    }
    .name {
      display: block;
    }
  }
}
p {
  padding: 0;
  margin: 0;
}
</style>
