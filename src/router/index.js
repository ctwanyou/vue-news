import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'

import Layout from '@/views/Layout/index.vue'
import NewAdmin from '@/views/NewAdmin/index.vue'
import addNews from '@/views/NewAdmin/component/addNews.vue'
import editNews from '@/views/NewAdmin/component/editNews.vue'
import editCategory from '@/views/NewAdmin/component/editCategory.vue'
import test from '@/views/test/index.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout
    },
    {
      path: '/Login',
      component: Login
    },
    {
      path:'/test/',
      component:test
    },
    {
      name:'newadmin',
      path: '/NewAdmin',
      component: NewAdmin,
      children: [
        {
          path: '/NewAdmin/AddNews',
          component: addNews
        },
        {
          path: '/NewAdmin/EditNews',
          component: editNews
        },
        {
          path:'/NewAdmin/EditCategory',
          component:editCategory
        }
      ]

    }

  ]
})

export default router
