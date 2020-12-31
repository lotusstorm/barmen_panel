import Vue from 'vue'
import VueRouter from 'vue-router'
import custom from '@/views/custom'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: custom,
  },
  {
    path: '/admin',
    name: 'admin',
    component: custom,
  },
  {
    path: '*',
    redirect: { name: 'admin' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
