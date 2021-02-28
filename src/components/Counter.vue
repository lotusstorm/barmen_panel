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
  computed: {
    currentCount: {
      get() {
        return this.counter
      },
      set(val) {
        this.$emit('click', val)
      },
    }
  },
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
