<template lang="html">
  <div class="body">
    <mt-field placeholder="真实姓名(仅能修改一次)" v-if="showFlag === '1'" :class="{ 'opacity': realNameFlag }" v-model="profile.realname" :readonly="realNameFlag"></mt-field>
    <div v-else-if="showFlag === '2'">
      <mt-radio
        v-model="profile.gender"
        :options="['男', '女']">
      </mt-radio>
    </div>
    <mt-field v-else-if="showFlag === '3'" type="date" :placeholder="birthPlaceHolder" :class="{ 'opacity': birthdayFlag }" v-model="profile.birthday" :readonly="birthdayFlag"></mt-field>
  </div>
</template>

<script>
export default {
  data () {
    return {
      showFlag: "",
      realNameFlag: false,
      birthdayFlag: false,
      birthPlaceHolder: "出生日(仅能修改一次)",
      profile: {
        realname: "",
        birthday: "",
        gender: "男"
      }
    }
  },
  beforeDestroy () {
    // 离开时 消除头顶操作
    if (localStorage.getItem("profileInfo")) {
      localStorage.removeItem("profileInfo")
    }
  },
  watch: {
    "$store.state.sundry.profileInfoEditDone": function (n) {
      if (n) {
        this.updateProfileInfo()
      }
    },
    "profile.birthday": function (n) {
      if (n) {
        this.birthPlaceHolder = ""
      }
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    if (localStorage.getItem("profileInfo")) {
      this.showFlag = localStorage.getItem("profileInfo")
    }
    this.fetchProfile()
  },
  methods: {
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.profile.realname = res.data.realname
        if (res.data.realname) {
          this.realNameFlag = true
        }
        this.profile.birthday = res.data.birthday
        if (res.data.birthday) {
          this.birthdayFlag = true
        }
        this.profile.gender = res.data.gender ? "女" : "男"
      }).catch((error) => {
        console.log(error)
      })
    },
    updateProfileInfo () {
      let ob = ""
      if (this.showFlag === "1") {
        if (this.realNameFlag) {
          this.$toast({
            message: "不能再修改",
            position: "middle",
            duration: 5000
          })
          this.$store.dispatch("setProfileInfoEditDone", false)
          return
        } else {
          if (!this.profile.realname) {
            this.$toast({
              message: "不能为空",
              position: "middle",
              duration: 5000
            })
            return
          }
          ob = {
            realname: this.profile.realname
          }
        }
      }
      if (this.showFlag === "3") {
        if (this.birthdayFlag) {
          this.$toast({
            message: "不能再修改",
            position: "middle",
            duration: 5000
          })
          this.$store.dispatch("setProfileInfoEditDone", false)
          return
        } else {
          if (!this.profile.birthday) {
            this.$toast({
              message: "不能为空",
              position: "middle",
              duration: 5000
            })
            return
          }
          ob = {
            birthday: this.profile.birthday
          }
        }
      }
      if (this.showFlag === "2") {
        let gender = ""
        if (this.profile.gender === "男") {
          gender = 0
        } else if (this.profile.gender === "女") {
          gender = 1
        }
        ob = {
          gender: gender
        }
      }
      this.api.updateProfile(ob).then(() => {
        this.$toast({
          message: "修改成功",
          position: "middle",
          duration: 5000
        })
        this.fetchProfile()
        this.$store.dispatch("setProfileInfoEditDone", false)
      }).catch((error) => {
        this.$store.dispatch("setProfileInfoEditDone", false)
        this.$toast({
          message: "信息保存失败",
          position: "middle",
          duration: 5000
        })
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.opacity {
  opacity: 0.6;
}
</style>
