<template>
  <div class="nirvana-input" :class="errorClasses">
    <div v-if="label" class="label">{{label}}</div>
    <input :type="type" :placeholder="placeholder" :value="value" @input="onInput" @blur="onBlur" class="input" />
    <transition name="bounce">
      <div v-if="hasError" class="message">
        {{errorMessage}}
      </div>
    </transition>

  </div>
</template>

<script>
  export default {
    name: "NirvanaInput",
    props: {
      label: {
        type: String
      },
      value: {
        type: [String, Number]
      },
      type: {
        type: String,
        default: "text"
      },
      placeholder: {
        type: String,
        default: ""
      },
      valid: {
        type: Boolean,
        default: true
      },
      errorMessage: {
        type: String,
        default () {
          return `${this.label || "Input"} is invalid`
        }
      }
    },
    data () {
      return {
        triggered: false
      }
    },
    computed: {
      hasError () {
        return this.triggered && !this.valid
      },
      errorClasses () {
        return { error: this.hasError }
      }
    },
    methods: {
      onBlur () {
        this.triggered = true
        this.$emit("blur", this.triggered)
      },
      onInput (event) {
        this.$emit("input", event.target.value)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../assets/stylesheets/public.scss";

  .bounce-enter-active {
    animation: bounce-in 0.5s;
  }
  .bounce-leave-active {
    animation: bounce-in 0.5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.5);
    }
    100% {
      transform: scale(1);
    }
  }
  .nirvana-input {
    .input {
      width: 100%;
      @include line-height(1.2rem);
      margin-bottom: 0.3rem;
      padding: 0px 5px;
      border-radius: 0.1rem;
      border: $px solid rgba($color-blue, 0.2);
      background-color: $color-blue9;
      color: $color-white;
      font-weight: bold;
      font-size: $font-h4;
      line-height: 0.8rem;
      padding-left: 0.3rem;
      &::placeholder {
        font-size: $font-h4;
        color: rgba($color-white, 0.3);
      }
    }

    .label {
      color: #fff !important;
      font-weight: bold;
      border-left: 3px yellow solid;
      padding-left: 10px;
      margin-bottom: 8px;
    }

    .message {
      text-align: center;
      color: $color-red;
      padding-bottom: 10px;
      font-weight: bold;
    }

    &.error {
      .input {
        border: $px solid $color-red !important;
        position: relative;
      }
    }
  }
</style>
