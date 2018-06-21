<template lang="html">
  <div v-if="count">
    <span class="unread-count red" v-if="count <= 999">{{ count }}</span>
    <span class="unread-count blue" v-else>999<span>+</span></span>
  </div>
</template>

<script>
export default {
  props: ["count"]
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.unread-count {
  display: inline-block;
  color: $color-white;
}
.blue {
  padding: 3px 8px;
  border-radius: 11px;
  background-color: $color-blue;
}
.red {
  padding: $px 7px;
  border-radius: 10px;
  background-color: $color-red;
}
</style>
