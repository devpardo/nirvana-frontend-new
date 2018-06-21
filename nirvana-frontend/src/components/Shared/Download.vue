<template>
  <div v-if="download">
    <div class="mask-layer">
      <div class="modal">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
              安装完成
              <div class="close-btn" @click="$emit('update:download',false)"></div>
            </div>
            <div class="modal-body">
              <p class="note">请提示：如果您无法正常打开软件，请根据以下引导，进行如下操作[设置]＞[通用]＞[描述文件与设备管理]＞信任证书！</p>
              <img class="tut" src="../../assets/images/yt-tut.gif" alt="">
            </div>
            <div class="modal-footer">
              <a class="dl-btn-ios" :href="downloadLink" download="app.plist">立即信任</a>
              <!-- <a class="dl-btn-ios" href="javascript:void(0)" @click="configure">PREF</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "download",
    props: ["download", "userAgent"],
    data () {
      return {
        downloadLink:
          "http://applivery.com/yatai",
        prefURL: "prefs:root=General&path=ManagedConfigurationList"
      }
    },
    methods: {
      configure () {
        window.location = this.prefURL
      // window.open(this.prefURL);
      // setTimeout(function() {
      //   window.location = "http://itunes.com/apps/yourappname";
      // }, 25);

      // If "custom-uri://" is registered the app will launch immediately and your
      // timer won't fire. If it's not set, you'll get an ugly "Cannot Open Page"
      // dialogue prior to the App Store application launching
      // location.href = "#";
      // window.location.replace(this.prefURL);
      // const test = window.open();
      // test.location = this.prefURL;
      // setTimeout(() => test.close(), 500);
      }
    }
  }
</script>

<style lang="sass" scoped>
.mask-layer
    background-color: rgba(0, 0, 0, 0.6)
    position: fixed
    top: 0
    bottom: 0
    right: 0
    left: 0
    z-index: 999

    .modal
        display: table
        height: 100%
        width: 100%
        .modal-container
            display: table-cell
            vertical-align: middle
            .modal-content
                display: block
                width: 330px
                margin: 0 auto
                .modal-header
                    background-color: #1e388b
                    color: #fcd667
                    padding: 5px 5px 3px 5px
                    text-align: center
                    border-top-left-radius: 10px
                    border-top-right-radius: 10px
                    font-size: 14pt
                    position: relative
                    .close-btn
                      background: url('../../assets/images/close-btn.png')
                      background-size: cover
                      position: absolute
                      top: 5px
                      right: 5px
                      border: 0
                      height: 20px
                      width: 20px
                      z-index: 9999999

                .modal-body
                    background-color: #1e388b
                    text-align: center
                    border-bottom: 1px solid #394f96
                    p.note
                        background: #e3e3e3
                        color: #f00
                        font-weight: initial
                        line-height: 1.8em
                        font-size: 8pt
                        margin: 0
                        padding: 10px
                    img.tut
                        display: block
                        width: 100%

                .modal-footer
                    background-color: #1e388b
                    padding: 10px
                    border-bottom-left-radius: 10px
                    border-bottom-right-radius: 10px
                    text-align: center

                    a.dl-btn-ios
                        background-color: #fcd667
                        border: none
                        font-weight: initial
                        font-size: 14pt
                        color: #1e388b
                        border-radius: 5px
                        padding: 10px 20px
</style>
