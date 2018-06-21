<template lang="html">
  <div class="ruler">
    <p><span class="title">特权规则</span></p>
    <div class="txt">
      <p><span class="fa">{{ circle }}</span>会员特权是什么？</p>
      <p>为了回馈用户的厚爱，[亚太娱乐]根据您整月的总流水（所有游戏投注之和），判定您的VIP等级并提供VIP特权奖励。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ circle }}</span>会员特权有什么？</p>
      <p>更高的返水比例、专属生日彩金、大额奖金转盘抽奖、众多高端的节日贺礼、优先闪电提款等众多优厚待遇。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ circle }}</span>会员特权如何获得？</p>
      <p>晋级系统会在本月最后一天，自动统计您的当月总流水，并在下月一号提升您的VIP等级，请在[会员中心]查看并使用您的会员特权。</p>
    </div>
    <div class="txt">
      <p><span class="fa">{{ circle }}</span>会员特权注意事项：</p>
      <p>若会员跳级升级，则按照最高等级享受特权。例：LV0级会员当月总流水300万，则直接晋级为LV2并只享受LV2特权。</p>
      <p>VIP晋级系统只根据当月流水数据进行判定，下次晋级系统审核时将不再重复计算已经统计的月份投注额。</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      circle: this.$fontawesome("exclamation-circle")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.ruler {
  background-color: $color-blue8;
  padding: .3rem;
  margin-bottom: 2rem;
  .title {
    font-size: $font-h4;
    color: $color-white;
    &:before {
      content: '';
      display: inline-block;
      width: 2px;
      height: 12px;
      background-color: $color-yellow13;
      margin-right: .3rem;
      position: relative;
      top: 1px;
    }
  }
  .txt {
    color: rgba($color-white, .5);
    .fa {
      padding-right: 5px;
    }
  }
}
</style>
