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
                :description="params.description"
                @updateRating="handleRatingUpdate($event, params)"
                @countUpdate="handleCounterUpdate($event, params)"/>
        </template>
      </custom-swiper>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex"
import Card from '@/components/Card'
import CustomSwiper from '@/components/Swiper'

export default {
  name: 'client',
  data() {
    return {
      filters: [
        {
          type: '',
          label: '',
        }
      ],
      swiperOption: {
        // autoHeight: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        breakpoints: {
          // when window width is >= 320px
          640: {
            slidesPerView: 1,
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
      return this.getCocktails && Object.entries(this.getCocktails).map(([key, item]) => ({key, ...item})).filter(item => item.enable) || []
    }
  },
  methods: {
    ...mapActions([
      'updateRating',
      'updateCount',
      'loadIngredients',
    ]),
    async handleRatingUpdate(val, current) {
      console.log(val, current, 'handleRatingUpdate')
      await this.updateRating({ key: current.key, value: val})
    },
    async handleCounterUpdate(val, current) {
      console.log(val, current, 'handleCounterUpdate')
      await this.updateCount({ key: current.key, value: val})
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
