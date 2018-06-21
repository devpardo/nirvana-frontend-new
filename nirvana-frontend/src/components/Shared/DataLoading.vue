<template lang="html">
  <div>
    <p v-if="dataLoad.flag" class="loading"><mt-spinner type="fading-circle" class="load-position"></mt-spinner><span class="load-txt">{{ dataLoad.data }}</span></p>
  </div>
</template>

<script>
export default {
  props: ["dataLoad"]
}
</script>

<style lang="scss" scoped>
.loading {
  text-align: center;
}
.load-position {
  margin: 0 auto;
  display: inline-block;
  left: -5px;
  top: 5px;
  position: relative;
}
.load-txt {
  position: relative;
  top: -5px;
}
</style>
