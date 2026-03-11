import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index.js'

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};

const routes = [
  {
    path: '/',
    name: 'home',
    component: function () {
      return import('../views/HomeView.vue');
    },
  },
  {
    path: '/login',
    name: 'login',
    component: function () {
      return import('../components/Login.vue');
    },
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../components/Register.vue'),
    beforeEnter: ifNotAuthenticated,
  },
  {
    path: '/orders',
    name: 'orders',
    component: () => import('../views/OrdersView.vue'),
    beforeEnter: ifAuthenticated,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
