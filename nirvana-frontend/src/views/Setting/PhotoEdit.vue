<template lang="html">
  <div class="body">
    <div class="img">
      <img v-lazy="image" width="100%" height="100%" v-if="image" />
    </div>
    <div class="button">
      <mt-button size="large">
        从本地上传<input type="file" @change="fileSelected($event)" accept='image/*' class="file"/>
      </mt-button>
      <mt-button size="large">
        拍一张照片<input type="file" @change="fileSelected($event)" accept='image/*' capture="camera" class="file"/>
      </mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      image: "",
      file: ""
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.fetchProfile()
  },
  methods: {
    fetchProfile () {
      this.api.getProfile().then((res) => {
        this.image = res.data.aws_url
      }).catch((error) => {
        console.log(error)
      })
    },
    fileSelected (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) return
      if (files.length === 1) {
        this.file = files[0]
        this.uploadAvatar()
      } else {
        this.$toast({
          message: "请上传一张头像",
          position: "middle",
          duration: 5000
        })
        return
      }
    },
    uploadAvatar () {
      if (!this.file) {
        this.$toast({
          message: "上传文件为空",
          position: "middle",
          duration: 5000
        })
        return
      }
      let toast = this.$toast({
        message: "图片上传中...",
        position: "center"
      })
      const config = { headers: { "Content-Type": "multipart/form-data" } }
      let fd = new FormData()
      fd.append("file", this.file)
      this.api.postUploadAvatar(fd, config).then(() => {
        this.fetchProfile()
        toast.close()
        this.$toast({
          message: "上传图片成功",
          position: "middle",
          duration: 5000
        })
      }).catch((error) => {
        toast.close()
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.img {
  width: 100%;
  height: 375px;
}
.button {
  margin: 20px auto;
}
.file {
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  position: absolute;
  width: 100%;
  opacity: 0;
  z-index: 2;
}
.mint-button--large {
  position: relative;
  width: 82%;
  margin: 20px auto;
  font-size: $font-h3;
  background-color: $color-white;
}
</style>
