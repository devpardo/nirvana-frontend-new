<template>
  <iframe
    v-if="loaded"
    :src="iframe.src"
    :style="iframe.style"
    :height="iframe.style.height"
    :width="iframe.style.width"
    type="web"
    frameborder="0"
  ></iframe>
</template>

<script>
import Vue from "vue"

export default {
  name: "SportsBook",
  data() {
    return {
      loaded: false,
      iframe: {
        src: null,
        style: null,
        wrapperStyle: null
      }
    }
  },
  async mounted() {
    console.log("Running");
    // let editor = this.$refs.editor;
    this.iframe.style = {
      position: "absolute",
      width: 100 + "%",
      height: 100 + "%",
      top: 44 + "px"
    }
    this.loaded = true;

    await this.fetchUrl();
  },
  methods: {
    async fetchUrl() {
      const res = await this.api.launchSportsBook();
      // console.log(res.data.launch_url);
      this.iframe.src = res.data.launch_url
    }
  }
}

</script>

<style>

</style>
