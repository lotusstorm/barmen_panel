<template>
  <div class="main-container">
    <div class="filters">
      <a-button></a-button>
    </div>

    <div class="content">
      <custom-swiper :options="swiperOption"
                     :params="cocktails">
        <template slot="slide"
                  slot-scope="{ params }">
          <card :title="params.title"
                :structure="params.structure"
                :preview="params.preview"
                :rating="params.rating"
                :count="params.count"
                :recipe="params.recipe"
                :description="params.description"
                :enable="params.enable"
                :is-admin="true"
                @updateRating="handleRatingUpdate($event, params)"
                @switchEnable="handleEnableUpdate($event, params)"
                @countUpdate="handleCounterUpdate($event, params)"/>
        </template>
      </custom-swiper>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import Card from '@/components/Card'
import CustomSwiper from '@/components/Swiper'

export default {
  name: 'admin',
  data() {
    return {
      filters: [
        {
          type: '',
          label: '',
        }
      ],
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          // when window width is >= 320px
          640: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 5,
          },
          // when window width is >= 480px
          1024: {
            slidesPerView: 2,
            slidesPerColumn: 2,
            spaceBetween: 20,
          },
          // when window width is >= 640px
          1360: {
            slidesPerView: 3,
            slidesPerColumn: 2,
            spaceBetween: 30,
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters([
      'getCocktails',
    ]),
    cocktails() {
      return this.getCocktails && Object.entries(this.getCocktails).map(([key, item]) => ({key, ...item})) || []
    }
  },
  methods: {
    ...mapActions([
      'updateRating',
      'updateEnable',
      'updateCount',
    ]),
    async handleRatingUpdate(val, current) {
      console.log(val, current, 'handleRatingUpdate')
      await this.updateRating({ ...current, value: val})
    },
    async handleCounterUpdate(val, current) {
      console.log(val, current, 'handleCounterUpdate')
      await this.updateCount({ ...current, value: val})
    },
    async handleEnableUpdate(val, current) {
      console.log(val, current, 'handleEnableUpdate')
      await this.updateEnable({ ...current, value: val})
    },
  },
  components: {
    Card,
    CustomSwiper,
  }
}
</script>

<style lang="scss" scoped>
//.main-container {
//  max-width: 1660px;
//  margin: 0 auto;
//  display: flex;
//  flex-direction: column;
//
//  .filters {
//
//  }
//
//  .content {
//    display: flex;
//    flex-flow: row wrap;
//    justify-content: space-between;
//  }
//}
</style>
