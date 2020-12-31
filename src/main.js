import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { firebaseApp } from '@/plugins/firebase'
import '@/plugins/antd'
import '@/plugins/swiper'
import '@/plugins/lodash'

Vue.prototype.$firebase = firebaseApp;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  async created() {
    await this.$store.dispatch('loadCocktails');
    await this.$store.dispatch('loadIngredients');
  }
}).$mount('#app');
