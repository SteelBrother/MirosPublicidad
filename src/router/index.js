import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/admin/dashboardView.vue' // Import the component correctly
import AdminLayout from '@/views/admin/AdminLayout.vue'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      children: [
        {
          path: 'productos',
          name: 'products',
          component: () => import('../views/admin/ProductsView.vue')
        },
        {
          path: 'productos/nuevo',
          name: 'new-product',
          component: () => import('../views/admin/NewProductView.vue')
        },
        {
          path: 'configuracion',
          name: 'config',
          component: () => import('../views/admin/AdminConfigView.vue')
        }
      ]
    }
  ]
})

export default router
