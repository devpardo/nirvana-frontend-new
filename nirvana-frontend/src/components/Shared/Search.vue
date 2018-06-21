<template lang="html">
  <div>
    <div class="input" :class="{ 'z-index': searchData }">
      <input class="search" :placeholder="placeholder" v-model="searchData.value" v-if="searchData" v-focus="focusFlag">
      <input class="search" :placeholder="placeholder" v-model="search.value" v-else-if="search">
      <input class="search" :placeholder="placeholder" v-else>
      <span class="fa">{{ searchIco }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["placeholder", "searchData", "search"],
  data () {
    return {
      searchIco: this.$fontawesome("search"),
      focusFlag: true
    }
  },
  directives: {
    focus: {
      inserted: function (el, {value}) {
        if (value) {
          el.focus()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.input {
  position: relative;
  margin: .3rem;
  .fa {
    display: inline-block;
    position: absolute;
    font-size: .5rem;
    top: .24rem;
    left: .4rem;
    color: $color-grey2;
  }
}
.z-index {
  z-index: 360;
}
.search {
  padding: 0 .3rem;
  padding-left: 1rem;
  width: 100%;
  @include line-height(1rem);
  font-size: $font-h4;
  background-color: $color-white;
  border: 0;
  outline: none;
  border-radius: 2rem;
}
</style>
