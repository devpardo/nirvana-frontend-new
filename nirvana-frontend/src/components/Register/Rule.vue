<template lang="html">
  <div>
    <div class="rules" v-if="rules && rules.flag">
      <div class="scroll">
        <div class="block">
          <div class="content">
            <p class="title">账户条例</p>
            <p class="info">用户声明并承诺，用户在注册开户时所提供的资料，包括用户姓名、电邮地址、电话号码及ip地址，均真实、准确、完整。</p>
            <p class="info">用户必须符合法定年龄（用户其居住地区的法律年龄限制），在不违反的情况下方可使用本网站的服务。用户如违法当地法律问题，本公司将不承担因客户违反当地博彩法律所引致之任何责任。</p>
            <p class="info">用户所拥有的账户姓名必须与以下的身份证明一致:</p>
            <ul>
              <li>身份证上的姓名</li>
              <li>银行账户的姓名</li>
            </ul>
            <p class="info">用户拥有超过一个账户，包括同一姓名，同一邮件地址，同一家庭，同一住址，同一借记卡/信用卡，同一银行账户，同一电脑（大学，团体，网吧，图书馆，办公室等），被视为联合账户或可疑账户，本网站有权在不通知的情况下冻结或关闭相关账户，并不退还款项。</p>
            <p class="info">所有账户只限持有者一人使用，用户有责任确保用户的账户及密码隐私安全，如用户有意/无意透露或泄露账户资料导致被盗，或第三方以任何形式获得用户的账户及密码及进行游戏导致用户账户损失，所有损失及责任需由用户全部承担。</p>
            <p class="info">所有账户若出现资金有误，用户有义务通知本网站作账户调整及不可使用相关错误金额，任何情况下，相关错误金额被视为无效金额，若用户使用该笔金额进行投注，所有投注被视为无效，一律取消并返还於本网站。</p>
          </div>
        </div>
        <div class="block">
          <div class="content">
            <p class="title">提款条例</p>
            <p class="info">所有提款申请必须符合本网站的提款政策，如存款未达到全额投注，即无法通过提款审核，提款申请将会被驳回。</p>
            <p class="info">若有需要，用户必须提供个人资料如身份证副本、驾驶执照副本、银行交易记录截图、居民户口簿副本等资料。</p>
            <p class="info">用户被严禁使用他人或第三者银行账户或银行卡进行取款业务。</p>
            <p class="info">严禁客户用非真实ip地址登录游戏(vpn,远程主机等) 。</p>
            <p class="info">在没有申请优惠的情况下，提款需要存款的一倍流水。</p>
          </div>
        </div>
        <div class="block">
          <div class="content">
            <p class="title">存款条例</p>
            <p class="info">通过网银自助存款方式的会员，如果忘记填写附言，请及时联系在线客服。特别说明如果出现存款人姓名与游戏账户姓名不一致的情况，请配合提供网银电子回单，以便财务人员进行补单。</p>
            <p class="info">通过第三方支付进行存款的会员，如果出现掉单的情况，请及时联系在线客服，并提供订单号，存款金额，存款时间，以便我们尽快为您补单。</p>
          </div>
        </div>
        <div class="block">
          <div class="content">
            <p class="title">优惠条例</p>
            <p class="info">若要获得本网站所有的优惠红利或回赠，用户必须符合所有条例及附加条款，方可享有相关优惠。</p>
            <p class="info">用户涉及个人或团体以不正当的手法如下述，进行骗取或诈骗相关优惠奖金，本网站有权在不通知的情况下冻结或关闭相关账户，并不退还款项，用户将会被列入黑名单，并保留追究权利。</p>
            <p class="info">用户拥有超过一个账户，包括同一姓名、同一邮件地址、同一住址、同一借记卡/信用卡、同一银行账户、同一电脑（大学，团体，网吧，图书馆，办公室等），被视为联合账户或可疑账户。</p>
            <p class="info">亚太娱乐有权根据会员情况调整会员投注限额。</p>
            <p class="info">亚太线上娱乐拥有对优惠活动的最终解释及修改权。</p>
          </div>
        </div>
      </div>
    </div>
    <div class="pack-up" v-if="rules && rules.flag" @click="rules.flag = false">
      <p class="fa">{{ close }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["rules"],
    data() {
      return {
        pickerUp: this.$fontawesome("chevron-circle-up"),
        close: this.$fontawesome("times-circle")
      };
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public.scss";

  .rules {
    margin: 0.3rem;
    padding: 0.5rem 0.3rem;
    background-color: $color-blue8;
    overflow: scroll;
    position: fixed;
    height: 100%;
    z-index: 20;
    top: 0px;
    right: 0px;
    left: 0px;
    .block {
      padding: 10px 0px;
      border-bottom: $px solid $color-blue9;
      .title {
        font-size: $font-h4;
        color: $color-white;
        font-weight: bold;
        margin-top: 0.5rem;
      }
      .info {
        text-align: justify;
        color: rgba($color-white, 0.5);
        font-weight: bold;
      }
      li {
        color: $color-white;
        font-size: $font-h4;
        font-weight: bold;
      }
    }
  }
  .pack-up {
    background-color: rgba($color-white, 0.2);
    position: fixed;
    right: 0.3rem;
    bottom: 0.3rem;
    z-index: 30;
    padding: 0.5rem;
    border-radius: 1rem;
    color: $color-yellow13;
    p {
      text-align: center;
      padding: 0px;
      margin: 0px;
      &:first-child {
        font-size: $font-h;
      }
    }
  }
</style>
