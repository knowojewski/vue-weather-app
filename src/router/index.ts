import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Weather from '../views/Weather.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Weather',
    component: Weather
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '*',
    redirect: '/login'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // console.log(to, from, next());
  next();
  if(localStorage.getItem('token')) {
    if(to.name === 'Login' || to.name === 'Register') {
      next('/');
    }
  } else {
    if(to.name === 'Weather') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
