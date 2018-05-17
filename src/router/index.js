import Vue from 'vue'
import Router from 'vue-router'

import { auth } from '../firebase'
import Login from '@/components/Login'
import Home from '@/components/Home'
import SignUp from '@/components/SignUp'

Vue.use(Router);

let router = new Router({
  routes: [
    {
        path: '*',
        redirect: '/home',
        meta: { requiresAuth: true }
    },
    /*{
        path: '/',
        redirect: '/home',
        meta: { requiresAuth: true }
    },*/
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
});

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  auth.onAuthStateChanged((user) => {
      if(user) {
          if (requiresAuth) {
              next();
          }
          else { // don't let logged in user view login/sign-up page
              next('home');
          }
      } else {
          if (requiresAuth) {
              next('login');
          }
          else {
              next();
          }
      }
  });
});

export default router
