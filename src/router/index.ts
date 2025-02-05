// import Vue from 'vue';
// import VueRouter, { RouteConfig } from 'vue-router';
// import Home from '../views/Home';

// Vue.use(VueRouter);

// const routes: Array<RouteConfig> = [
//   {
//     path: '',
//     redirect: 'home'
//   },
//   {
//     path: '/home',
//     name: 'home',
//     component: Home
//   },
// ];

// const router = new VueRouter({
//   mode: 'history',
//   base: process.env.BASE_URL,
//   routes
// });

// export default router


import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home';

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
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router
