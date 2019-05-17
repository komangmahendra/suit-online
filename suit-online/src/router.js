import Vue from 'vue'
import Router from 'vue-router'
//import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

const router =  new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Login
    },
    {
      path: '/input-room',
      name: 'input-room',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "input-room" */ './views/InputRoom.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') == null) {
      next({ path: '/', });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
