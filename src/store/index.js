import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseApp } from '@/plugins/firebase';
import lodash from 'lodash';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cocktails: null,
    ingredients: null,
  },
  getters: {
    getCocktails: ({ cocktails }) => cocktails,
    getIngredients: ({ ingredients }) => ingredients,
  },
  actions: {
    async updateRating(_, { key, value }) {
      try {
        await firebaseApp.database().ref('cocktails/' + key + '/rating').set(value)
      } catch (e) {
        console.error(e)
      }
    },
    async updateEnable(_, { key, value }) {
      try {
        await firebaseApp.database().ref('cocktails/' + key + '/enable').set(value)
      } catch (e) {
        console.error(e)
      }
    },
    async updateCount({ getters }, { key, value, ...params }) {
      try {

        const store = lodash.cloneDeep(getters.getIngredients)

        for (const item in params.structure) {
          if (store && store[item]) {
            store[item] = store[item] - params.structure[item] * (value - params.count)
          }
        }

        console.log(store, 'store')

        await firebaseApp.database().ref('cocktails/' + key + '/count').set(value)
        await firebaseApp.database().ref('store').set(store)
        console.log(key, value, params, 'updateCount')
      } catch (e) {
        console.error(e)
      }
    },
    loadCocktails({ commit }) {
      try {
        firebaseApp.database().ref('cocktails').on('value', snapshot => {
          const data = snapshot.val();
          commit('saveCocktails', data);
        });
      } catch (e) {
        console.error(e);
      }
    },
    loadIngredients({ commit }) {
      try {
        firebaseApp.database().ref('store').on('value', snapshot => {
          const data = snapshot.val();
          console.log(data, 'loadIngredients')
          commit('saveIngredients', data);
        });
      } catch (e) {
        console.error(e);
      }
    },
  },
  mutations: {
    saveCocktails(store, data) {
      store.cocktails = data
    },
    saveIngredients(store, data) {
      store.ingredients = data
    }
  },
})
