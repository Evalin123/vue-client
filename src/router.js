import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import Page404 from './views/404.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component : About
    },
    {
      path : '/register',
      name :'register',
      component : Register
    },
    {
      path : '*',
      name :'404',
      component : Page404
    },
  ]
})
