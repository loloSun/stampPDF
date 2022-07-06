import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import stampDemo from "./views/stampDemo/index.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',redirect:'/stampDemo'},
    {
      path: '/home',
      component:Home
    },
    {
      path: "/stampDemo",
      name: "stampDemo",
      component: stampDemo,
      meta: {
        title: "在线盖章"
      }
    },
    // {
    //   path: '/about',
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // },
  ]
})
