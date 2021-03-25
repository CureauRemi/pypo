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
  },
  {
    path: '/login',name: 'Connexion',  component: () => import('../views/Login.vue')
  },
  {
    path: '/signup',name: 'Inscription',  component: () => import('../views/Signin.vue')
  },
  // ADMIN PAGES
  {
    path: '/dashboard',name: 'Tableau de Bord',  component: () => import('../views/Dashboard.vue')
  },
  {
    path: '/patients',name: 'Liste des Patients',  component: () => import('../views/ListingPatients.vue')
  },
  {
    path: '/patients/:id',name: 'Détail du patient',  component: () => import('../views/DetailPatient.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
