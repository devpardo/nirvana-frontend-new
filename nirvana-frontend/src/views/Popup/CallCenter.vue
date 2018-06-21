<template>
    <div v-if="showCallCenter">
        <div class="mask-layer">
            <div class="modal">
                <div class="modal-container">
                    <div class="modal-content">
                        <div class="modal-header">
                            申请电话回拨成功
                        </div>
                        <div class="modal-body">
                            <p>请保持您绑定手机畅通，<br/> 客服将在3分钟内给您致电。</p>
                        </div>
                        <div class="modal-footer">
                            <button class="close" @click="$root.$emit('showCallCenter',false)">我知道了</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      name: "call-center",
      props: ["showCallCenter"],
      data () {
        return {
          test: "test"
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
                    padding: 20px 20px 10px 20px
                    text-align: center
                    border-top-left-radius: 10px
                    border-top-right-radius: 10px
                    font-size: 18pt
                .modal-body
                    background-color: #1e388b
                    padding: 10px 20px
                    text-align: center
                    border-bottom: 1px solid #394f96
                    p
                        color: #ffffff
                        font-weight: initial
                        line-height: 1.8em
                        font-size: 14pt
                .modal-footer
                    background-color: #1e388b
                    padding: 20px
                    border-bottom-left-radius: 10px
                    border-bottom-right-radius: 10px
                    text-align: center
                    button.close
                        background-color: transparent
                        color: #ffffff
                        border: none
                        font-weight: initial
                        font-size: 14pt
                        color: #fcd667


</style>
