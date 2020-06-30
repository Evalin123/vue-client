import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import About from './views/About.vue'
import Register from './views/Register.vue'
import Login from './views/Login.vue'
import Page404 from './views/404.vue'
import EditUser from './views/EditUser'
import ShowInfo from './views/ShowInfo'
import AddPost from './views/AddPost'
import EditPost from './views/EditPost'
import PostList from './views/PostList'

Vue.use(Router)

const router = new Router({
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
      path : '/login',
      name :'login',
      component : Login
    },
    {
      path : '/edit',
      name :'edit',
      component : EditUser
    },
    {
      path : '/showinfo',
      name :'showinfo',
      component : ShowInfo
    },
    {
      path : '/addpost',
      name :'addpost',
      component : AddPost
    },
    {
      path : '/editpost/:id',
      name :'edit',
      component : EditPost
    },
    {
      path : '/postlist',
      name :'postlist',
      component : PostList
    },
    {
      path : '*',
      name :'404',
      component : Page404
    },
  ]
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.jwtToken ? true : false
  if(to.path == '/login' || to.path == '/register') {
    next();
  }
  else {
    if(isLogin) {
      next();
    }
    else {
      next('/login');
    }
  }
})

export default router;
