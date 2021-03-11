import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/', name: 'Accueil', component: () => import('../views/Home.vue')
  },
  {
    path: '/settings',name: 'Réglages',  component: () => import('../views/Settings.vue')
  },
  {
    path: '/planning',name: 'Planning',  component: () => import('../views/Planning.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
