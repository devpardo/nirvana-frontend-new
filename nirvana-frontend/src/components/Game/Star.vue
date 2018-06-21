<template lang="html">
  <span v-if="starsData">
    <span v-for="value in parseInt(starsData)">
      <span class="fa color-yellow" v-if="value">{{ star }}</span>
      <span class="fa color-yellow" v-if="(value+0.5) === parseFloat(starsData)">{{ starHalfO }}</span>
    </span>
    <span v-if="starsData && starsData !== '0'">({{ starsData }})</span>
    <span v-else-if="starsData === '0' || !starsData">暂无评分</span>
  </span>
  <span v-else>暂无评分</span>
</template>

<script>
export default {
  props: ["starsData"],
  data () {
    return {
      starO: this.$fontawesome("star-o"),
      starHalfO: this.$fontawesome("star-half-o"),
      star: this.$fontawesome("star")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.color-yellow {
  color: $color-yellow1;
}
</style>
