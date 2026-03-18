import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import BaseLayout from '@/layouts/BaseLayout.vue';
import { useUserStore } from '@/stores/user';
import { useContentStore } from '@/stores/content';

const Login = () => import('@/views/Login.vue');
const Registro = () => import('@/views/Registro.vue');
const Camara = () => import('@/views/Camara.vue');
const Seccion = () => import('@/views/Seccion.vue');

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/seccion'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/registro',
    name: 'Registro',
    component: Registro,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/camara',
    name: 'Camara',
    component: Camara,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/seccion',
    name: 'Seccion',  
    component: BaseLayout,
    meta: {
      requiresAuth: true
    },  
    children: [
      { 
        path: ':name',
        name: 'SeccionContenidos',
        component: Seccion,
      },
    ],  
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const userStore = useUserStore();
  const contentStore = useContentStore();
  const isAuthenticated = !!userStore.token;
  if(to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else if(isAuthenticated && !to.meta.requiresAuth) {
    next('/'+contentStore.home.url);
  }else {
    next();
  }
});


export default router
