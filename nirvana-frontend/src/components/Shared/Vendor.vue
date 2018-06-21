<template lang="html">
  <div v-if="vendors && vendors.length" id="venues">
    <div class="venues" :class="{'opacity': item.maintain_at}" v-for="item in vendors" @click="handle(item.name, item.code, item.maintain_at)">
      <span class="img dl">
        <img v-lazy="item.image_url" width="100%" height="100%"/>
      </span>
      <div class="content dl" :class="{ 'p-top': !item.tag_list.length }">
        <p><span class="h1">{{ item.name }}平台</span></p>
        <p class="h2"><span>Jackpot奖池:</span><span>￥{{ item.records || '0' }}</span></p>
        <p class="h3 info bottom" :class="{ 'p-top': !item.tag_list.length }">{{ item.desc || '暂无描述' }}</p>
        <p class="button" v-if="item.tag_list.length"><span class="yellow" v-for="tag in item.tag_list">{{ tag }}</span></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["vendors"],
  methods: {
    handle (name, code, flag) {
      if (flag) {
        return
      }
      this.$router.push({name: "Vendor", params: { vendorCode: code }})
      localStorage.setItem("vendorName", name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

$venues-h: 80px;
.dl {
  display: inline-block;
}
#venues .p-top {
  padding-top: .3rem;
}
.opacity {
  opacity: 0.5;
  position: relative;
  &:before {
    color: $color-yellow13;
    content: '平台维护中';
    width: inherit;
    height: inherit;
    position: absolute;
    font-size: $font-h1;
    font-weight: bold;
    top: 36%;
    left: 60%;
  }
}
.venues {
  background-color: rgba($color-white, .1);
  margin: .3rem 0;
  p {
    padding: 0;
    margin: 0;
  }
  .content {
    padding: .2rem;
    vertical-align: top;
    width: 76%;
    width: calc(100% - 85px);
    .bottom {
      padding-bottom: 7px;
    }
    .h1 {
      font-size: $font-h4;
      color: $color-white;
      font-weight: bold;
    }
    .h2 {
      color: $color-yellow13;
      font-size: $font-h5;
      font-weight: bold;
      span {
        padding-right: 5px;
      }
    }
    .h3 {
      color: $color-grey3;
    }
    .info {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
    .button {
      // transform: scale(0.8);
      // margin-left: -30px;
      font-size: .2rem;
      .red {
        background-color: $color-red;
        color: $color-white;
      }
      .blue {
        background-color: $color-blue1;
        color: $color-white;
      }
      .yellow {
        background-color: $color-yellow13;
        color: $color-blue9;
        font-weight: bold;
      }
      .grey {
        background-color: $color-grey2;
        color: $color-white;
        margin-bottom: 5px;
        display: inline-block;
      }
      span {
        padding: 1px 10px;
        margin-right: 5px;
        border-radius: 8px;
      }
    }
  }
  .img {
    padding: .2rem;
    & > img{
      border-radius: 5px;
    }
    width: 2rem;
    height: 2rem;
  }
}
</style>
