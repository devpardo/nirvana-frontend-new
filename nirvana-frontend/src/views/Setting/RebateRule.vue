<template lang="html">
  <div class="body">
    <!--返水-->
    <div class="questions">
      <div class="question">
        <p class="title"><span class="fa">{{ exclamation }}</span><span>什么是返水？</span></p>
        <p class="content">[亚太]回馈用户的活动奖金，您的正常游戏投注(有效流水)都将被系统记录，并按照返水比例计算奖金并返还。</p>
      </div>
    </div>
    <table>
      <tbody>
        <tr><th>场馆</th><th>等级</th><th>返水</th></tr>
        <tr><td rowspan="4" class="name">DG</td><td class="red">Lv.0</td><td>0.4%</td></tr>
        <tr><td class="red">Lv.1</td><td>0.5%</td></tr>
        <tr><td class="red">Lv.2</td><td>0.6%</td></tr>
        <tr><td class="red">Lv.3</td><td>0.6%</td></tr>
        <tr><td rowspan="4" class="name">AG</td><td class="red">Lv.0</td><td>0.4%</td></tr>
        <tr><td class="red">Lv.1</td><td>0.5%</td></tr>
        <tr><td class="red">Lv.2</td><td>0.6%</td></tr>
        <tr><td class="red">Lv.3</td><td>0.6%</td></tr>
        <tr><td rowspan="4" class="name">kuma</td><td class="red">Lv.0</td><td>0.6%</td></tr>
        <tr><td class="red">Lv.1</td><td>0.8%</td></tr>
        <tr><td class="red">Lv.2</td><td>1.0%</td></tr>
        <tr><td class="red">Lv.3</td><td>1.2%</td></tr>
        <tr><td rowspan="4" class="name">DT</td><td class="red">Lv.0</td><td>0.6%</td></tr>
        <tr><td class="red">Lv.1</td><td>0.8%</td></tr>
        <tr><td class="red">Lv.2</td><td>1.0%</td></tr>
        <tr><td class="red">Lv.3</td><td>1.2%</td></tr>
        <tr><td rowspan="4" class="name">PNG</td><td class="red">Lv.0</td><td>1.0%</td></tr>
        <tr><td class="red">Lv.1</td><td>1.2%</td></tr>
        <tr><td class="red">Lv.2</td><td>1.4%</td></tr>
        <tr><td class="red">Lv.3</td><td>1.5%</td></tr>
        <tr><td rowspan="4" class="name">MG</td><td class="red">Lv.0</td><td>1.0%</td></tr>
        <tr><td class="red">Lv.1</td><td>1.2%</td></tr>
        <tr><td class="red">Lv.2</td><td>1.4%</td></tr>
        <tr><td class="red">Lv.3</td><td>1.5%</td></tr>
        <tr><td rowspan="4" class="name">PT</td><td class="red">Lv.0</td><td>0.8%</td></tr>
        <tr><td class="red">Lv.1</td><td>1.0%</td></tr>
        <tr><td class="red">Lv.2</td><td>1.2%</td></tr>
        <tr><td class="red">Lv.3</td><td>1.2%</td></tr>
      </tbody>
    </table>
    <div class="rule">
      <h3>LV4、LV5巅峰级玩家返水享受私人订制服务</h3>
      <div class="field">返水详细内容:</div>
      <div class="rules">
        <ul>
          <li><span class="circle">1</span>当天的游戏投注由系统自动统计并在次日生成您的返水奖金，请在[我的返水]查看和领取。</li>
          <li><span class="circle">2</span>领取的返水奖金会自动添加至您的主账户，您可以在[交易记录]中查询详情。</li>
          <li><span class="circle">3</span>[亚太]返水奖金可以直接提款，无需投注任何游戏。</li>
          <li><span class="circle">4</span>使用优惠获得的资金游戏时，返水计算会扣除[提款要求需要的流水]。例：转账PT场馆时，选择100%首存优惠券，您需要完成提款要求的[本金+奖金]X18倍流水，之后游戏产生的流水会正常计算为有效流水参与返水优惠。</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      exclamation: this.$fontawesome("exclamation-circle")
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

ul, li {
  list-style: none;
  padding: 0px;
  margin: 0px;
}
li {
  padding-bottom: 5px;
}
table {
  border-collapse: collapse;
}

table, th, td {
  border: $px solid rgba(0, 0, 0, 0.1);
}
.questions {
  margin: .3rem;
  background-color: $color-blue8;
  color: rgba($color-white, .5);
  p {
    margin: 0px;
  }
  .question {
    padding: .3rem;
    letter-spacing: $px;
    text-align: justify;
  }
  .title {
    span {
      &:last-child {
        padding-left: 5px;
        display: inline-block;
        width: 96%;
        vertical-align: top;
        text-align: justify;
      }
    }
  }
  .content {
    padding: 5px 0px;
    padding-left: 17px;
    text-align: justify;
  }
}
.rule {
  padding: .3rem;
  background: $color-blue8;
  margin: .3rem;
  color: rgba($color-white, .5);
  .rules {
    .circle {
      display: inline-block;
      width: 13px;
      height: 13px;
      line-height: 12px;
      text-align: center;
      border: $px solid $color-black;
      border-radius: 50%;
      margin-right: 5px;
      overflow: hidden;
      vertical-align: middle;
    }
  }
  .field {
    font-size: $font-h5-1;
    font-weight: bold;
    padding-right: 6px;
    padding-bottom: 10px;
  }
}
table {
  background-color: $color-blue8;
  width: 94%;
  margin: 0 .3rem;
  .name {
    font-size: $font-h4;
    color: $color-white;
  }
  .red {
    color: $color-yellow13;
  }
  tr {
    width: 100%;
  }
  td {
    text-align: center;
    vertical-align: middle;
    padding: 10px 0px;
    color: rgba($color-white, .5);
  }
  th {
    width: 33%;
    padding: 10px 0px;
    color: $color-white;
  }
}
</style>
