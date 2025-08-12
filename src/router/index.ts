import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  // 映射关系: path -> component
  // 路由懒加载: 只有在访问该路由时才会加载对应的组件
  // 这种方式可以减少初始加载时的资源大小，提高应用性能
  // 通过 import() 动态导入组件
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/main',
      component: () => import('../views/main/Main.vue')
    },
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFound.vue')
    }
  ]
})
//导航守卫
export default router
