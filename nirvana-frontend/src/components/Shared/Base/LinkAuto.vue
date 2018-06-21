<template>
  <a :href="href" :target="target" ref="link">
    <slot></slot>
  </a>
</template>

<script>
export default {
  name: "LinkAuto",
  props: ["href", "target"],
  watch: {
    href: function (newVal) {
      if (newVal) {
        let a = window.document.createElement("a")
        a.target = "_blank"
        a.href = newVal
        let e = window.document.createEvent("MouseEvents", true, true)
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        a.dispatchEvent(e)
      }
    }
  }
}
</script>
