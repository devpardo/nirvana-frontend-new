<template lang="html">
  <div class="body">
    <p>正在转向中，请稍候...</p>
    <div>
      如果系统长时间无响应,请<a class="color" href="javascript:document.getElementById('payform').submit();">单击此处</a>提交本页面
    </div>
    <form id="payform" name="payform" :action="url" method="post">
      <input type="hidden" v-for="(val, key, index) in params" :key="index" :name="key" :value="val">
    </form>
  </div>
</template>

<script>
export default {
  computed: {
    params () {
      return this.$route.params.params
    },
    url () {
      return this.$route.params.url
    }
  },
  mounted () {
    let sundry = { navigateTitle: false }
    this.$store.dispatch("setNavigationTitle", sundry)

    document.getElementById("payform").submit()
  }
}
</script>

<style lang="scss" scoped>
.color {
  color: blue;
}
</style>
