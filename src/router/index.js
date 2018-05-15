import Vue from 'vue'
import Router from 'vue-router'

import { auth } from '../firebase'
import Login from '@/components/Login'
import Index from '@/components/notes/Index'
import SignUp from '@/components/SignUp'

Vue.use(Router)

let router = new Router({
  routes: [
    {
        path: '*',
        redirect: '/login'
    },
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/sign-up',
        name: 'SignUp',
        component: SignUp
    },
    {
        path: '/',
        name: 'Index',
        component: Index,
        // meta: {
        //     requiresAuth: true
        // }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = auth.currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('login')
  else if (!requiresAuth && currentUser) next('index')
  else next()
})

export default router
