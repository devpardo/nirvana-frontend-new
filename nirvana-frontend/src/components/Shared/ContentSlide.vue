<template lang="html">
  <div>
    <div class="g-list-outer" v-if="contentList">
      <div class="g-list-inner">
        <ul class="g-list">
          <li v-for="item in contentList">
            <span class="g-img">
              <img v-lazy="item.image_url" width="100%" height="100%"/>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["contentList", "vendorsList"],
  methods: {
    selectPlatform (n, name, ename) {
      n = n + 1
      this.$emit("getSelected", [n, name, ename])
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/stylesheets/public';

.g-list-outer {
  position: relative;
  overflow: hidden;
  min-height: 220px;
  margin-top: -5px;
}
.g-list-inner {
  position: absolute;
  left: 0;
  right: 10px;
  overflow-x: scroll;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
}
.g-list {
  list-style: none;
  margin-left: -10px;
  padding-left: 0;
  white-space: nowrap;
  li {
    margin: 0px;
    list-style: none;
    display: inline-block;
    width: 300px;
    height: 190px;
    vertical-align: top;
    border-radius: 5px;
    background-color: $color-white;
    margin-left: 10px;
    .g-img { display: block; width: 100%; height: 100%}
  }
}
</style>
