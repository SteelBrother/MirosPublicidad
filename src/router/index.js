import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DashboardView from '../views/admin/dashboardView.vue' // Import the component correctly
import AdminLayout from '@/views/admin/AdminLayout.vue'
import { useFirebaseAuth } from 'vuefire'
import { onAuthStateChanged } from 'firebase/auth'
import LoginView from '@/views/LoginView.vue'
import ProductView from '@/views/ProductView.vue'
import ProductListView from '@/views/ProductListView.vue'

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
      path: '/productos',  // La ruta de acceso para la vista de productos
      name: 'ProductList',
      component: ProductListView,
    },
    {
      path: '/product/:id',
      name: 'product',
      component: ProductView
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLayout,
      meta: { requiresAuth: true },
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
          path: 'categorias',
          name: 'category',
          component: () => import('../views/admin/AdminCategoriesView.vue')
        },
        {
          path: 'categorias/editar/:id', 
          name: 'edit-category', 
          component: () => import('../views/admin/AdminEditCategoryView.vue') // Asegúrate de que el componente esté en la ruta correcta
        },
        {
          path: 'configuracion',
          name: 'config',
          component: () => import('../views/admin/AdminConfigView.vue')
        },
        {
          path: 'productos/editar/:id',
          name: 'edit-product',
          component: () => import('../views/admin/EditProductView.vue')
        }
      ]
    }
  ]
})

// Guard de navegación
router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth) {
    // Comprobar que el usuario este autenticado
    try {
      await authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }
  } else {
    // No esta protegido, mostramos la vista
    next()
  }
})

function authenticateUser() {
  const auth = useFirebaseAuth();

  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe()
      if(user) {
        resolve(user)
      } else {
        reject()
      }
    })
  })
}

export default router
