<template>
  <div class="vmui-counter" :style="{height: height + 'px'}">
    <vm-counter-number v-for="num,index in calcNumbers" :key="calcNumbersCount-index" :number="num" :index="index" :height="height" :speed="speed + delayEach * index" :direction="direction" :is-plus="isPlus">
      <template scope="{number, index}">
        <slot :number="number" :index="index">{{number}}</slot>
      </template>
    </vm-counter-number>
  </div>
</template>

<script>
  import CounterNumber from "./counterNumber.vue"
  export default {
    name: "vmCounter",
    props: {
      number: [Number, String],
      height: {
        type: [Number, String],
        default: 30
      },
      speed: {
        type: Number,
        default: 300 // ms
      },
      delayEach: {
        type: Number,
        default: 120 // ms
      },
      fixCount: [Number, String],
      fixStr: {
        type: [String, Number],
        default: "0"
      }
    },
    data () {
      return {
        direction: "up"
      }
    },
    computed: {
      calcNumbers () {
        if (this.fixCount) {
          return (Array(this.fixCount).join(this.fixStr) + this.number).slice(-this.fixCount)
        }
        return `${this.number}`.split("")
      },
      calcNumbersCount () {
        return this.calcNumbers.length
      },
      isPlus () {
        return this.number >= 0
      }
    },
    watch: {
      number (newVal, oldVal) {
        if (newVal >= 0) {
          this.direction = newVal > oldVal ? "up" : "down"
        } else {
          this.direction = newVal > oldVal ? "down" : "up"
        }
      }
    },
    components: {
      [CounterNumber.name]: CounterNumber
    }
  }
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include vmui-counter;
</style>
