<template lang="html">
  <div>
    <div class="action-sheet">
      <p class="action">
        <span class="fl" @click="selectCancle()">取消</span>
        <span class="title">选择银行卡</span>
        <span class="fr" @click="done()">完成</span>
      </p>
      <div class="scroll">
        <p class="list" v-for="(item, index) in actions" :key="item.id" @click="selected(item.id, index, item.bank.name, item.no)">
          <span><img src="~assets/images/payment-online.png" width="100%" height="100%"/></span>
          <span class="limit-name">{{ item.bank.name }}</span>
          <span class="fa fr" v-if="currentSelect.select === index">{{ check }}</span>
        </p>
        <p class="add" @click="addCard()">
          <span><img src="~assets/images/payment-online.png" width="100%" height="100%"/></span>
          <span class="new-card">添加绑定新的银行卡</span>
          <span class="fa fr">{{ plus }}</span>
        </p>
      </div>
    </div>
    <div class="mask-layer"></div>
  </div>
</template>

<script>
export default {
  props: ["actions", "select"],
  data () {
    return {
      check: this.$fontawesome("check"),
      plus: this.$fontawesome("plus"),
      dempData: [],
      currentSelect: this.select
    }
  },
  methods: {
    selected (id, index, name, cardNo) {
      this.dempData.push(id)
      this.currentSelect.select = index
      this.dempData.push(name)
      this.dempData.push(cardNo)
    },
    close () {
      this.select.show = false
    },
    selectCancle () {
      this.currentSelect.select = 0
      this.close()
    },
    done () {
      this.$emit("handle", this.dempData)
      this.close()
    },
    addCard () {
      this.$emit("addCard")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

p {
  padding: 0px;
  margin: 0px;
}
.action-sheet {
  position: fixed;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: $color-white;
  padding:0 10px;
  padding-bottom: 100px;
  font-size: $font-h4;
  .scroll {
    max-height: 300px;
    overflow: scroll;
  }
  .list {
    padding: 10px 0px;
    border-bottom: $px solid $color-grey;
    .fr {
      color: $color-blue1;
      position: relative;
      top: 8px;
      padding-right: 8px;
    }
    span {
      &:first-child {
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 5px;
        position: relative;
        top: 5px
      }
    }
  }
}
.action {
  text-align: center;
  @include line-height(50px);
  border-bottom: $px solid $color-grey;
  span {
    &:first-child, &:last-child {
      color: $color-blue1;
    }
  }
  .title {
    font-size: $font-h2;
  }
}
.add {
  @include line-height(57px);
  .new-card {
    color: $color-blue1;
  }
  span {
    &:first-child {
      display: inline-block;
      width: 24px;
      height: 19px;
      margin-right: 5px;
      position: relative;
      top: 4px
    }
    &:last-child {
      color: $color-blue1;
      position: relative;
      top: 18px;
      padding-right: 8px;
    }
  }
}
.limit-name {
  width: 80%;
  display: inline-block;
  vertical-align: middle;
}
.mask-layer {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  opacity: 0.5;
  z-index: 10;
}
</style>
