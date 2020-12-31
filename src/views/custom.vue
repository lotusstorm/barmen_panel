<template>
  <div class="main-container">
    <div class="filters">
      <a-select
          v-model="filtered"
          size="large"
          mode="multiple"
          placeholder="Please select"
          style="width: 500px"
      >
        <a-select-option v-for="(filter, index) in filters"
                         :value="filter.type"
                         :label="filter.label"
                         :key="index">
          {{ filter.label }}
        </a-select-option>
      </a-select>
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
                :is-admin="isAdmin"
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
      filtered: ['long'],
      filters: [
        {
          type: 'long',
          label: 'Лонг',
        },
        {
          type: 'shot',
          label: 'Шорт',
        },
        {
          type: 'simple',
          label: 'Рокс',
        },
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
      let arr = this.getCocktails && Object.entries(this.getCocktails).map(([key, item]) => ({key, ...item})) || []
      if (!this.isAdmin)
        arr = arr.filter(item => item.enable)
      return arr.filter(item => this.filtered.includes(item.type))
    },
    isAdmin() {
      return this.$route.name === 'admin'
    }
  },
  methods: {
    ...mapActions([
      'updateRating',
      'updateEnable',
      'updateCount',
    ]),
    async handleRatingUpdate(val, current) {
      await this.updateRating({ ...current, value: val})
    },
    async handleCounterUpdate(val, current) {
      await this.updateCount({ ...current, value: val})
    },
    async handleEnableUpdate(val, current) {
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
.main-container {
  display: flex;
  flex-direction: column;

  .filters {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 25px;
    position: fixed;
    width: 100%;
    background: #FFF;
    z-index: 99;
  }

  .content {
    padding-top: 70px;
  }
}
</style>
