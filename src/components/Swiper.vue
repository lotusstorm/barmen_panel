<template>
  <swiper class="swiper" :options="options">
    <swiper-slide v-for="(item, index) of params"
                  :key="index">
      <slot name="slide"
            :params="item"/>
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
export default {
  props: {
    params: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    }
  },
}
</script>

<style lang="scss" scoped>
.swiper {
  height: 960px;
  max-width: 1600px;
  margin: 0 auto;

  .swiper-slide {
    height: auto;
    max-width: 500px !important;
  }
}
</style>
