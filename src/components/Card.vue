<template>
  <div class="card-root">
    <div class="header">
      <span class="title">{{ title }}</span>
      <div class="actions">
        <div class="action">
          {{ rating }}
          <a-icon class="icon"
                  theme="filled"
                  type="star"/>
        </div>
        <div class="action">
          {{ maxCount }}
          <a-icon class="icon"
                  theme="filled"
                  type="fire"/>
        </div>
      </div>
    </div>
    <div class="content">
      <span class="description">{{ description }}</span>
      <counter v-if="isAdmin"
               v-model="counter"
               class="counter-outer"/>
      <div class="wrapper">
        <div class="preview-container">
          <a-switch v-if="isAdmin"
                    :checked="enable"
                    class="switcher"
                    @change="onChange"/>
          <img v-if="preview"
               :alt="title"
               :src="preview"
               class="image"/>
          <span v-else>НЕТ ФОТО</span>
        </div>
        <div class="wrapper">
          <template v-if="structure">
            <span class="title">Состав:</span>
            <div class="structures">
              <span v-for="(value, key, index) in structure"
                    :key="index"
                    class="structure">
                {{ structureMap[key] }} - {{ value }} мл
              </span>
            </div>
          </template>
          <template v-if="recipe && isAdmin">
            <span class="title">Рецепт:</span>
            <div class="recipe">
              <div class="description">{{ recipe }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
    <div class="footer">
      <template v-if="isAdmin">
        <span class="title">Оценка:</span>
        <a-rate v-model="curRating"
                :count="7"/>
      </template>
    </div>
  </div>
</template>

<script>
import Counter from "@/components/Counter";
import {mapGetters} from "vuex";

const structureMap = {
  silver_tequila: 'Серебряная текила',
  sambuca: 'Самбука',
  coffee_liqueur: 'Кофейный ликер',
  absinthe: 'Абсент',
  irish_cream: 'Айриш крим',
  vodka: 'Водка',
  liqueur_blue_curacao: 'Ликер Блю Кюрасао',
  grenadine: 'Гренадин',
  orange_juice: 'Апельсиновый сок',
  orange: 'Апельсин',
  banana: 'Банан',
  ice: 'Лед',
  tabasco: 'Табаско',
  sprite: 'Спрайт',
  pineapple: 'Ананас',
  low_fat_cream: 'Нежирные сливки',
  sugar_syrup: 'Сахарный сироп',
  lemon_juice: 'Лимонный сок',
  lemon_zest: 'Лимонная цедра',
  crushed_ice: 'Дробленный лед',
  pineapple_juice: 'Ананасовый сок',
  energetic: 'Энергетик',
  milk: 'Молоко',
  heavy_cream: 'Жирные сливки',
  pomegranate_juice: 'Гранатовый сок',
  lemon: 'Лимон',
}

export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    },
    recipe: {
      type: String,
      default: ''
    },
    structure: {
      type: Object,
      default: null
    },
    preview: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
    count: {
      type: Number,
      default: 0,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    enable: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      structureMap,
      curRating: this.rating,
      ratings: [],
    }
  },
  computed: {
    ...mapGetters([
      'getIngredients',
    ]),
    counter: {
      get() {
        return this.count
      },
      set(val) {
        // this.count > 0
        if (val >= 0)
          this.$emit('countUpdate', val)
      }
    },
    updateRatings() {
      return this.lodash.debounce(this.addNewRating, 1500)
    },
    maxCount() {
      const store = []

      for (const key in this.structure) {
        if (this.getIngredients && this.getIngredients[key] !== undefined) {
          store.push(Math.floor(this.getIngredients[key] / this.structure[key]))
        }
      }

      return this.lodash.min(store) || 0
    }
  },
  methods: {
    addNewRating() {
      this.ratings.push(this.curRating)
      let rating = this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length
      if (rating > 10)
        rating = 10

      this.$emit('updateRating', Math.floor(rating))
    },
    onChange(checked) {
      console.log(`a-switch to ${checked}`);
      this.$emit('switchEnable', checked)
    },
  },
  created() {
    this.ratings.push(this.curRating)
  },
  watch: {
    curRating: {
      handler() {
        this.updateRatings()
      },
    }
  },
  components: {
    Counter,
  },
}
</script>

<style lang="scss" scoped>

$main-padding: 10px 28px;

.card-root {
  width: 100%;
  border-radius: 15px;
  transition: all 0.3s;
  border: 1px solid silver;

  &:hover {
    box-shadow: 0 0 15px rgba(#000, 0.2);
  }

  .header {
    display: flex;
    flex-flow: row;
    padding: $main-padding;
    border-bottom: 1px solid silver;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: 600;
      max-width: 70%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-right: 15px;
    }

    .actions {
      display: flex;
      flex-flow: row;

      .action {
        display: flex;
        flex-flow: row;
        align-items: center;
        font-size: 18px;

        &:not(:last-child) {
          margin-right: 10px;
        }

        .icon {
          margin-left: 5px;
          color: red;
        }
      }
    }
  }

  .content {
    display: flex;
    padding: $main-padding;
    position: relative;
    flex-direction: column;

    .counter-outer {
      position: absolute;
      padding: 5px;
      right: 0;
      top: 0;
    }

    .description {
      margin-bottom: 10px;
    }

    .wrapper {
      display: flex;
      flex-flow: row;

      .preview-container {
        width: 50%;
        height: 200px;
        display: flex;
        justify-content: center;
        overflow: hidden;
        align-items: center;
        background: #FFF;
        position: relative;

        .image {
          height: 100%;
        }

        .switcher {
          position: absolute;
        }
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        width: 50%;
        margin-left: 20px;

        .title {
          font-weight: 600;
          font-size: 14px;
        }

        .structures {
          display: flex;
          flex-direction: column;
          margin-bottom: auto;

          .structure {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            line-height: 95%;
          }
        }

        .recipe {
          display: flex;
          flex-direction: column;

          .description {
            overflow-y: auto;
            max-height: 70px;
          }
        }
      }
    }
  }

  .footer {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: $main-padding;

    .title {
      font-weight: 500;
      font-size: 16px;
    }
  }
}
</style>
