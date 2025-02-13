import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home/Home';
import UserStats from '../views/UserStats/UserStats';
import DeviceStats from '../views/DeviceStats/DeviceStats';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '',
    redirect: 'home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/stats',
    name: 'user-stats',
    component: UserStats
  },
  {
    path: '/device-stats',
    name: 'device-stats',
    component: DeviceStats
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;