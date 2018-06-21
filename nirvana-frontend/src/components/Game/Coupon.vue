<template lang="html">
  <div>
    <div class="all">
      <p class="action">
        <span class="fl" @click="close()">取消</span>
        <span class="title">选择转账优惠</span>
        <span class="fr" @click="done()">完成</span>
      </p>
      <div class="rebates">
        <div v-if="favorableList.length">
          <p @click="select(v.id, v.able)" :class="{ 'opacity': !v.able }" v-for="(v, index) in favorableList" :key="v.id">
            <mt-cell :title="v.code">
              <span class="fa" :class="{ 'fa-show': show.currentSelect === v.id }">{{ check }}</span>
              <span v-if="!v.able">不适用于{{ preview.vendorName }}平台</span>
            </mt-cell>
          </p>
        </div>
        <mt-cell v-else title="您暂没有转账优惠"></mt-cell>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>
<script>
export default {
  props: ["show", "favorableList", "preview"],
  data () {
    return {
      check: this.$fontawesome("check"),
      showRebate: this.show
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    this.handle()
  },
  methods: {
    select (id, promotionVendors) {
      if (promotionVendors) {
        this.show.currentSelect = id
      } else {
        return
      }
    },
    close () {
      if (!this.preview.adjustments_amount) {
        this.show.currentSelect = ""
      }
      this.showRebate.rebate = false
    },
    done () {
      this.$emit("subDone")
      this.close()
    },
    handle () {
      if (this.favorableList.length) {
        this.favorableList.forEach((item, index) => {
          this.$set(this.favorableList[index], "able", true) // 全设置为可用
          if (this.favorableList[index].promotion_vendors) {
            let arr = this.favorableList[index].promotion_vendors.split(",")
            let flag = false
            let len = arr.length
            for (let i = 0; i < len; i++) {
              if (arr[i] === this.preview.vendorName) {
                flag = true
                break
              }
            }
            if (!flag) {
              this.$set(this.favorableList[index], "able", false)
            }
          }
        })
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
  &:last-child {
    // background-image: linear-gradient(180deg, #d9d9d9, #d9d9d9 50%, transparent 50%);
  }
}
.fa {
  display: inline-block;
  color: $color-red;
  display: none;
}
.opacity {
  opacity: 0.5;
}
.fa-show {
  display: inline-block;
}
.rebates {
  max-height: 300px;
  padding-bottom: 100px;
  overflow: scroll;
}
.all {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: $color-white;
  z-index: 90;
}
.action {
  margin: 0px;
  padding: 0px 10px;
  text-align: center;
  @include line-height(50px);
  border-bottom: $px solid $color-grey;
  span {
    &:first-child, &:last-child {
      color: $color-yellow1;
    }
  }
  .title {
    font-size: $font-h2;
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
