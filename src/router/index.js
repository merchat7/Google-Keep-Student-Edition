import Vue from 'vue'
import Router from 'vue-router'

import { auth } from '../firebase'
import Login from '@/components/Login'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'

Vue.use(Router)

let router = new Router({
  routes: [
    {
        path: '*',
        redirect: '/login',
        meta: { requiresAuth: false }
    },
    {
        path: '/',
        redirect: '/login',
        meta: { requiresAuth: false }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { requiresAuth: false }
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp,
        meta: { requiresAuth: false }
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log(requiresAuth);
  console.log(currentUser);
  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
