<template>
  <div class="counter-root">
    <a-icon class="caret"
            type="caret-up"
            @click="currentCount++"/>
    <span class="counter-value">{{ currentCount }}</span>
    <a-icon class="caret"
            type="caret-down"
            @click="currentCount--"/>
  </div>
</template>

<script>
export default {
  name: "Counter",
  model: {
    prop: 'counter',
    event: 'click',
  },
  props: {
    counter: {
      type: Number,
      default: 0,
    }
  },
  // data() {
  //   return {
  //     currentCount: this.counter,
  //   }
  // },
  computed: {
    // increaseCounter() {
    //   return this.lodash.debounce(this.handleIncrease, 1500)
    // },
    // decreaseCounter() {
    //   return this.lodash.debounce(this.handleIncrease, 1500)
    // }
    currentCount: {
      get() {
        return this.counter
      },
      set(val) {
        this.$emit('click', val)
      },
    }
  },
  methods: {
    handleClick() {

    }
    // handleIncrease() {
    //   this.$emit('click', this.currentCount)
    // },
    // handleDecrease() {
    //   if (this.counter > 0)
    //     this.$emit('click', this.currentCount)
    // },
  }
}
</script>

<style lang="scss" scoped>
  .counter-root {
    display: flex;
    flex-direction: column;
    align-items: center;

    .caret {
      font-size: 20px;
      cursor: pointer;

      &:hover {
        color: red;
      }
    }

    .counter-value {
      font-size: 24px;
      font-weight: 600;
    }
  }
</style>
