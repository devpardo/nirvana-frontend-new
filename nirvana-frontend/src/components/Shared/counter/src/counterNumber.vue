<template>
  <div class="vmui-counter-number">
    <div :style="{height: height + 'px'}" v-if="!isNumber">
      <slot :number="number" :index="index"></slot>
    </div>
    <div class="wrap" :style="styles">
      <div :style="{height: height + 'px'}" v-for="fill,idx in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]" :key="idx">
        <slot :number="fill" :index="index"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "vmCounterNumber",
    props: {
      number: [Number, String],
      index: [Number],
      height: {
        type: [Number, String],
        default: 30
      },
      speed: {
        type: Number,
        default: 500
      },
      direction: {
        type: String,
        validator (value) {
          return ["up", "down"].indexOf(value) > -1
        },
        default: "up"
      },
      isPlus: [Boolean]
    },
    data () {
      return {
        timer: null,
        items: [],
        nowItemIndex: 1,
        styles: {
          transform: 0,
          transitionDuration: 0
        }
      }
    },
    computed: {
      itemsCount () {
        return this.items.length
      },
      isNumber () {
        return /[0-9]/.test(`${this.number}`)
      }
    },
    watch: {
      number (newVal, oldVal) {
        if (this.isNumber) {
          setTimeout(() => { this.goValue(newVal, oldVal) }, 100)
        } else {
          this.setTranslate(0, 0)
        }
      }
    },
    methods: {
      init (newVal, oldVal) {
        if (this.direction === "up") {
          this.setTranslate(0, -oldVal * this.height)
        } else {
          this.setTranslate(0, (-oldVal - 10) * this.height)
        }
      },
      setTranslate (speed, translate) {
        this.styles.transitionDuration = speed + "ms"
        this.styles.transform = "translate3d(0, " + translate + "px, 0)"
      },
      goValue (newVal, oldVal = 0) {
        this.init(newVal, oldVal)
        setTimeout(() => {
          if (this.direction === "up") {
            if (newVal > oldVal) {
              this.setTranslate(this.speed, -newVal * this.height)
            } else {
              this.setTranslate(this.speed, (-newVal - 10) * this.height)
            }
            setTimeout(() => { this.setTranslate(0, -newVal * this.height) }, this.speed + 100)
          } else {
            if (newVal < oldVal) {
              this.setTranslate(this.speed, (-newVal - 10) * this.height)
            } else {
              this.setTranslate(this.speed, -newVal * this.height)
            }
            setTimeout(() => { this.setTranslate(0, (-newVal - 10) * this.height) }, this.speed + 100)
          }
        }, 100)
      }
    },
    mounted () {
      this.init(this.number, this.number)
    }
  }
</script>

<style lang="scss" scoped>
  @import "styleMix";
  @include vmui-counter-number;
</style>
