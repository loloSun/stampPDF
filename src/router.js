import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Activity from './views/Activity.vue'
import Find from './views/Find.vue'
import Newest from './views/Newest.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/home'},
    {
      path: '/home',
      component:Home
    },
    // {
    //   path: '/about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
    {
      path:'/find',
      component:Find
    },
    {
      path:'/activity',
      component:Activity
    },
    {
      path:'/newest',
      component:Newest
    }
  ]
})
