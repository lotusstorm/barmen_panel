import Vue from 'vue'
import VueRouter from 'vue-router'
import client from '@/views/client'
import admin from '@/views/admin'

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: client,
  },
  {
    path: '/admin',
    name: 'admin',
    component: admin,
  },
  {
    path: '*',
    redirect: { name: 'client' }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
